/**
 * POST /api/leads/whatsapp
 * Send a lead summary to the specified WhatsApp number.
 * Requires: paid subscription or owner access.
 *
 * Request body: { lead: LeadObject, phone_number: string }
 *
 * Env vars required for delivery:
 *   TWILIO_ACCOUNT_SID   — Twilio account SID (ACxxxxxxxx)
 *   TWILIO_AUTH_TOKEN    — Twilio auth token
 *   TWILIO_WHATSAPP_FROM — Twilio WhatsApp sender (e.g. whatsapp:+14155238886)
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

async function sendViaTwilio(to: string, body: string): Promise<{ ok: boolean; sid?: string; error?: string }> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;

  if (!accountSid || !authToken || !from) {
    return { ok: false, error: 'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM not set' };
  }

  const toWhatsApp = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  const credentials = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

  const params = new URLSearchParams({ From: from, To: toWhatsApp, Body: body });

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    return { ok: false, error: `Twilio error ${res.status}: ${text.slice(0, 200)}` };
  }

  const json = await res.json().catch(() => ({}));
  return { ok: true, sid: json.sid };
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

  // Check Twilio config — return 503 with clear setup docs if missing
  const hasTwilio =
    !!process.env.TWILIO_ACCOUNT_SID &&
    !!process.env.TWILIO_AUTH_TOKEN &&
    !!process.env.TWILIO_WHATSAPP_FROM;

  if (!hasTwilio) {
    return Response.json(
      {
        ok: false,
        error: 'WhatsApp delivery not configured on this server.',
        setup: {
          required_env_vars: {
            TWILIO_ACCOUNT_SID: 'Your Twilio Account SID (starts with AC)',
            TWILIO_AUTH_TOKEN: 'Your Twilio Auth Token',
            TWILIO_WHATSAPP_FROM: 'WhatsApp sender e.g. whatsapp:+14155238886 (Twilio sandbox or approved number)',
          },
          docs: 'https://www.twilio.com/docs/whatsapp/quickstart',
          message_preview: message,
        },
      },
      { status: 503 }
    );
  }

  const result = await sendViaTwilio(phone_number, message);
  if (!result.ok) {
    return Response.json({ ok: false, error: result.error }, { status: 502 });
  }

  return Response.json({ ok: true, sid: result.sid });
}
