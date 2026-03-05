import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { env } from 'cloudflare:workers';
import { sendLeadToGHL } from '../lib/ghl';

const getEnv = () => {
  const e = env as Record<string, string | undefined>;
  return {
    GHL_API_KEY: e?.GHL_API_KEY ?? process.env.GHL_API_KEY,
    GHL_LOCATION_ID: e?.GHL_LOCATION_ID ?? process.env.GHL_LOCATION_ID,
  };
};

export const server = {
  submitLead: defineAction({
    input: z.object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Please enter a valid email address"),
      phone: z.string().min(10, "Phone number must be at least 10 digits"),
      address: z.string().min(1, "Address is required"),
      consent: z.boolean().refine(v => v === true, "You must agree to the terms"),
      marketingConsent: z.boolean().optional(),
      turnstileToken: z.string().min(1, "Security check failed")
    }),
    handler: async (input) => {
      // 1. Verify Turnstile token with Cloudflare
      const secretKey = (env as Record<string, string | undefined>)?.TURNSTILE_SECRET_KEY ?? process.env.TURNSTILE_SECRET_KEY;

      if (!secretKey) {
        console.warn('TURNSTILE_SECRET_KEY not configured');
      }

      const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: secretKey,
          response: input.turnstileToken,
        }),
      });

      const verifyData = await verifyResponse.json() as { success: boolean };

      if (!verifyData.success) {
        throw new Error('Turnstile verification failed');
      }

      // 2. Send to GoHighLevel
      const nameParts = input.name.trim().split(/\s+/);
      const firstName = nameParts[0] ?? '';
      const lastName = nameParts.slice(1).join(' ') ?? '';

      const ghlResult = await sendLeadToGHL(
        {
          firstName,
          lastName,
          email: input.email,
          phone: input.phone,
          address: input.address,
          marketingConsent: input.marketingConsent ?? false,
        },
        getEnv()
      );

      if (!ghlResult.ok) {
        console.error('GHL send failed:', ghlResult.error);
        throw new Error('Could not submit lead. Please try again.');
      }

      return {
        success: true,
        message: 'Estimate request received! We will contact you within 1 hour.',
        firstName,
      };
    }
  })
};
