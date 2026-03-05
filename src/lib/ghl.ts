/**
 * Server-only: send a lead to GoHighLevel (GHL) CRM.
 * Uses the Lead Connector API. Credentials must be passed in; never expose GHL_API_KEY to the client.
 * @see src/components/highlevel.md
 */

export interface GHLLeadPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  marketingConsent?: boolean;
}

export interface GHLEnv {
  GHL_API_KEY?: string;
  GHL_LOCATION_ID?: string;
}

const GHL_CONTACTS_URL = 'https://services.leadconnectorhq.com/contacts/';
const GHL_API_VERSION = '2021-07-28';

export async function sendLeadToGHL(
  data: GHLLeadPayload,
  env: GHLEnv
): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = env.GHL_API_KEY;
  const locationId = env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    console.warn('GHL: GHL_API_KEY or GHL_LOCATION_ID not set; skipping send.');
    return { ok: false, error: 'GHL not configured' };
  }

  const payload = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    message: data.address ?? undefined,
    locationId,
    tags: ['Website Lead', 'Deck Masters'],
    source: 'Deck Masters Website',
  };

  try {
    const response = await fetch(GHL_CONTACTS_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Version: GHL_API_VERSION,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('GHL API Error:', response.status, errorData);
      return { ok: false, error: `GHL API error: ${response.status}` };
    }

    return { ok: true };
  } catch (err) {
    console.error('GHL send error:', err);
    return { ok: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}
