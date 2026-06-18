/**
 * POST /api/leads/whatsapp
 * Send a lead summary to the specified WhatsApp number.
 * Requires: paid subscription or owner access.
 *
 * Request body: { lead: LeadObject, phone_number: string }
 *
 * Env vars required for delivery:
 *   WHATSAPP_PHONE_NUMBER_ID — Meta WhatsApp Cloud API phone number ID
 *   WHATSAPP_ACCESS_TOKEN    — Meta permanent access token
 */

import { createAuthServerClient } from '../../../../src/lib/supabase/auth-server';
import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';
import { isOwnerEmail } from '../../../../server/lib/ownerAccess';

const FULL_ACCESS_TEST_MODE = process.env.FULL_ACCESS_TEST_MODE === 'true';

async function resolveIsPaid(): Promise<{ ok: boolean; userId: string | null; error?: string }> {
  if (FULL_ACCESS_TEST_MODE) return { ok: true, userId: 'test' };

  try {
    const authClient = await createAuthServerClient();
    const { data, error } = await authClient.auth.getUser();
    if (error || !data.user) return { ok: false, userId: null, error: 'Unauthenticated' };

    const email = data.user.email ?? '';
    if (isOwnerEmail(email)) return { ok: true, userId: data.user.id };

    const admin = getSupabaseServiceClient();
    if (!admin) return { ok: false, userId: null, error: 'Supabase service not configured' };

    const { data: sub } = await admin
      .from('subscriptions')
      .select('active, status')
      .eq('user_id', data.user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (sub?.active || sub?.status === 'active') return { ok: true, userId: data.user.id };
    return { ok: false, userId: data.user.id, error: 'Paid subscription required' };
  } catch {
    return { ok: false, userId: null, error: 'Auth check failed' };
  }
}

function buildWhatsAppMessage(lead: Record<string, unknown>): string {
  const title = String(lead.title ?? 'Lead');
  const trade = String(lead.trade ?? '').toUpperCase();
  const location = String(lead.location ?? lead.postcodeOutward ?? '');
  const value = String(lead.estimatedValue ?? '');
  const urgency = String(lead.urgency ?? '').toUpperCase();
  const contactSignal = String(lead.contactSignal ?? '');
  const score = Number(lead.score ?? 0);

  const lines = [
    `*JOBFILTER LEAD*`,
    ``,
    `*${title}*`,
    `Trade: ${trade}`,
    `Location: ${location}`,
  ];

  if (value && value !== 'Unlock exact value') lines.push(`Value: ${value}`);
  if (urgency && urgency !== 'MEDIUM') lines.push(`Urgency: ${urgency}`);
  if (contactSignal && contactSignal !== 'none') lines.push(`Contact signal: ${contactSignal}`);
  if (score > 0) lines.push(`Score: ${score}/100`);

  lines.push(``, `_Sent via JobFilter Intelligence_`);
  return lines.join('\n');
}

function toE164UK(phone: string) {
  const digits = phone.replace(/[^\d+]/g, '');
  if (digits.startsWith('+')) return digits;
  if (digits.startsWith('0')) return `+44${digits.slice(1)}`;
  return `+44${digits}`;
}

async function sendViaMeta(to: string, body: string): Promise<{ ok: boolean; sid?: string; error?: string }> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!phoneNumberId || !accessToken) {
    return { ok: false, error: 'WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_ACCESS_TOKEN not set' };
  }

  const res = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: toE164UK(to),
      type: 'text',
      text: { body },
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    return { ok: false, error: `Meta API error ${res.status}: ${text.slice(0, 200)}` };
  }

  const json = await res.json().catch(() => ({}));
  return { ok: true, sid: json.messages?.[0]?.id };
}

export async function POST(request: Request) {
  const access = await resolveIsPaid();
  if (!access.ok) {
    return Response.json(
      { ok: false, error: access.error ?? 'Paid subscription required' },
      { status: access.userId ? 403 : 401 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const phone_number = String(body.phone_number ?? '').trim();
  if (!phone_number || !/^\+?[0-9\s\-().]{7,20}$/.test(phone_number)) {
    return Response.json(
      { ok: false, error: 'phone_number must be a valid international number (e.g. +447700900000)' },
      { status: 422 }
    );
  }

  const lead = body.lead as Record<string, unknown> | undefined;
  if (!lead || typeof lead !== 'object') {
    return Response.json({ ok: false, error: 'lead object required in request body' }, { status: 422 });
  }

  const message = buildWhatsAppMessage(lead);

  // Check Meta WhatsApp Cloud API config — return 503 with clear setup docs if missing
  const hasMeta =
    !!process.env.WHATSAPP_PHONE_NUMBER_ID &&
    !!process.env.WHATSAPP_ACCESS_TOKEN;

  if (!hasMeta) {
    return Response.json(
      {
        ok: false,
        error: 'WhatsApp delivery not configured on this server.',
        setup: {
          required_env_vars: {
            WHATSAPP_PHONE_NUMBER_ID: 'Phone Number ID from Meta WhatsApp Cloud API setup',
            WHATSAPP_ACCESS_TOKEN: 'Permanent access token from Meta system user',
          },
          docs: 'https://developers.facebook.com/docs/whatsapp/cloud-api/get-started',
          message_preview: message,
        },
      },
      { status: 503 }
    );
  }

  const result = await sendViaMeta(phone_number, message);
  if (!result.ok) {
    return Response.json({ ok: false, error: result.error }, { status: 502 });
  }

  return Response.json({ ok: true, sid: result.sid });
}
