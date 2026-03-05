import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

// Must be false: POST-only routes cannot be pre-rendered as static files.
// With output: 'static' (Astro 6's unified static/hybrid mode), setting this
// tells the Cloudflare Worker to execute this handler at the edge on each request.
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  // Verify request method
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const data = await request.json();
    const turnstileToken = data['cf-turnstile-response'];

    if (!turnstileToken) {
      return new Response(
        JSON.stringify({ success: false, error: 'Turnstile token missing' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify Turnstile token with Cloudflare
    const secretKey = (env as any)?.TURNSTILE_SECRET_KEY || process.env.TURNSTILE_SECRET_KEY;

    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: secretKey,
        response: turnstileToken,
      }),
    });

    const verifyData = await verifyResponse.json() as { success: boolean };

    if (!verifyData.success) {
      return new Response(
        JSON.stringify({ success: false, error: 'Turnstile verification failed' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // TODO: Store lead data in Cloudflare D1 or send to external service
    // For now, just log it
    console.log('Lead received:', {
      name: data.firstName + ' ' + data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Lead submitted successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
