import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { sendLeadToGHL } from '../../lib/ghl';

export const prerender = false;

function validateBody(data: unknown): { ok: true; data: { name: string; email: string; phone: string; address: string; consent: boolean; marketingConsent: boolean; turnstileToken: string } } | { ok: false; error: string } {
  if (!data || typeof data !== 'object') {
    return { ok: false, error: 'Invalid request body' };
  }
  const o = data as Record<string, unknown>;
  const name = typeof o.name === 'string' ? o.name.trim() : '';
  const email = typeof o.email === 'string' ? o.email.trim() : '';
  const phone = typeof o.phone === 'string' ? o.phone.trim() : '';
  const address = typeof o.address === 'string' ? o.address.trim() : '';
  const consent = o.consent === true;
  const marketingConsent = o.marketingConsent === true;
  const turnstileToken = typeof o.turnstileToken === 'string' ? o.turnstileToken.trim() : '';

  if (name.length < 2) return { ok: false, error: 'Name must be at least 2 characters' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Please enter a valid email address' };
  if (phone.length < 10) return { ok: false, error: 'Phone number must be at least 10 digits' };
  if (address.length < 1) return { ok: false, error: 'Address is required' };
  if (!consent) return { ok: false, error: 'You must agree to the terms' };
  if (!turnstileToken) return { ok: false, error: 'Security check failed' };

  return { ok: true, data: { name, email, phone, address, consent, marketingConsent, turnstileToken } };
}

export const POST: APIRoute = async ({ request }) => {
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await request.json();
    const validated = validateBody(body);
    if (!validated.ok) {
      return new Response(
        JSON.stringify({ success: false, error: validated.error }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const { name, email, phone, address, marketingConsent, turnstileToken } = validated.data;

    const secretKey = (env as Record<string, string | undefined>)?.TURNSTILE_SECRET_KEY ?? process.env.TURNSTILE_SECRET_KEY;
    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: secretKey, response: turnstileToken }),
    });
    const verifyData = (await verifyResponse.json()) as { success: boolean };
    if (!verifyData.success) {
      return new Response(
        JSON.stringify({ success: false, error: 'Turnstile verification failed' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const nameParts = name.split(/\s+/);
    const firstName = nameParts[0] ?? '';
    const lastName = nameParts.slice(1).join(' ') ?? '';

    const ghlEnv = {
      GHL_API_KEY: (env as Record<string, string | undefined>)?.GHL_API_KEY ?? process.env.GHL_API_KEY,
      GHL_LOCATION_ID: (env as Record<string, string | undefined>)?.GHL_LOCATION_ID ?? process.env.GHL_LOCATION_ID,
    };
    const ghlResult = await sendLeadToGHL(
      { firstName, lastName, email, phone, address, marketingConsent },
      ghlEnv
    );

    if (!ghlResult.ok) {
      console.error('GHL send failed:', ghlResult.error);
      return new Response(
        JSON.stringify({ success: false, error: 'Could not submit lead. Please try again.' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Estimate request received! We will contact you within 1 hour.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Quote API error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
