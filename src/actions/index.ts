import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { env } from 'cloudflare:workers';

export const server = {
  submitLead: defineAction({
    input: z.object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Please enter a valid email address"),
      phone: z.string().min(10, "Phone number must be at least 10 digits"),
      address: z.string().min(1, "Address is required"),
      consent: z.boolean().refine(v => v === true, "You must agree to the terms"),
      marketingConsent: z.boolean().refine(v => v === true, "You must consent to marketing"),
      turnstileToken: z.string().min(1, "Security check failed")
    }),
    handler: async (input) => {
      // 1. Verify Turnstile token with Cloudflare
      const secretKey = (env as any)?.TURNSTILE_SECRET_KEY || process.env.TURNSTILE_SECRET_KEY;

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

      // 2. Logic to send to GHL (Placeholder for now)
      // In a real scenario, this would be a POST to a GoHighLevel webhook
      console.log('Action: Lead received and verified:', {
        name: input.name,
        email: input.email,
        phone: input.phone,
        address: input.address
      });

      // Split name for GHL compatibility
      const nameParts = input.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Return success message
      return {
        success: true,
        message: 'Estimate request received! We will contact you within 1 hour.',
        firstName
      };
    }
  })
};
