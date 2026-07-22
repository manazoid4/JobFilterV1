/**
 * POST /api/leads/whatsapp
 * Send a lead summary to the specified WhatsApp number.
 * Requires: paid subscription or owner access.
 *
 * Request body: { lead: LeadObject }. The recipient is always the authenticated
 * user's verified profile number; arbitrary client-supplied recipients are ignored.
 *
 * Env vars required for delivery:
 *   WHATSAPP_PHONE_NUMBER_ID — Meta WhatsApp Cloud API phone number ID
 *   WHATSAPP_ACCESS_TOKEN    — Meta permanent access token
 */

import { createAuthServerClient } from '../../../../src/lib/supabase/auth-server';
import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';
import { isOwnerEmail } from '../../../../server/lib/ownerAccess';

const FULL_ACCESS_TEST_MODE = process.env.FULL_ACCESS_TEST_MODE === 'true';

type Access = { ok: boolean; userId: string | null; phone?: string; whatsappConsented?: boolean; error?: string };

async function resolveIsPaid(): Promise<Access> {
  if (FULL_ACCESS_TEST_MODE) return { ok: true, userId: 'test', phone: process.env.WHATSAPP_TO, whatsappConsented: true };

  try {
    const authClient = await createAuthServerClient();
    const { data, error } = await authClient.auth.getUser();
    if (error || !data.user) return { ok: false, userId: null, error: 'Unauthenticated' };

    const email = data.user.email ?? '';
    const admin = getSupabaseServiceClient();
    if (!admin) return { ok: false, userId: null, error: 'Supabase service not configured' };

    const [{ data: sub }, { data: profile }] = await Promise.all([
      admin.from('subscriptions').select('active, status').eq('user_id', data.user.id).order('created_at', { ascending: false }).limit(1).maybeSingle(),
      admin.from('profiles').select('phone, whatsapp_opt_in_at, whatsapp_opt_out_at').eq('id', data.user.id).maybeSingle(),
    ]);
    const optedInAt = profile?.whatsapp_opt_in_at ? Date.parse(profile.whatsapp_opt_in_at) : 0;
    const optedOutAt = profile?.whatsapp_opt_out_at ? Date.parse(profile.whatsapp_opt_out_at) : 0;
    const access = { phone: profile?.phone ?? '', whatsappConsented: optedInAt > 0 && optedInAt > optedOutAt };

    if (isOwnerEmail(email) || sub?.active || sub?.status === 'active') return { ok: true, userId: data.user.id, ...access };
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

async function sendViaMeta(to: string, lead: Record<string, unknown>): Promise<{ ok: boolean; sid?: string; error?: string }> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;
  const languageCode = process.env.WHATSAPP_TEMPLATE_LANGUAGE_CODE || 'en_GB';

  if (!phoneNumberId || !accessToken || !templateName) {
    return { ok: false, error: 'Meta WhatsApp credentials and approved template are not configured' };
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
      type: 'template',
      template: {
        name: templateName,
        language: { code: languageCode },
        components: [{
          type: 'body',
          parameters: [
            { type: 'text', text: String(lead.decision ?? lead.qualityLabel ?? 'WATCH').slice(0, 30) },
            { type: 'text', text: String(lead.title ?? 'New opportunity').slice(0, 200) },
            { type: 'text', text: String(lead.location ?? lead.postcodeOutward ?? 'Your area').slice(0, 100) },
            { type: 'text', text: String(lead.estimatedValue ?? 'Value to verify').slice(0, 60) },
          ],
        }],
      },
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

  const lead = body.lead as Record<string, unknown> | undefined;
  if (!lead || typeof lead !== 'object') {
    return Response.json({ ok: false, error: 'lead object required in request body' }, { status: 422 });
  }

  const message = buildWhatsAppMessage(lead);
  if (!access.phone || !/^\+?[0-9\s\-().]{7,20}$/.test(access.phone)) {
    return Response.json({ ok: false, error: 'Add a valid WhatsApp number to your account first' }, { status: 409 });
  }
  if (!access.whatsappConsented) {
    return Response.json({ ok: false, error: 'Explicit WhatsApp opt-in is required' }, { status: 409 });
  }

  // Check Meta WhatsApp Cloud API config — return 503 with clear setup docs if missing
  const hasMeta =
    !!process.env.WHATSAPP_PHONE_NUMBER_ID &&
    !!process.env.WHATSAPP_ACCESS_TOKEN &&
    !!process.env.WHATSAPP_TEMPLATE_NAME;

  if (!hasMeta) {
    return Response.json(
      {
        ok: false,
        error: 'WhatsApp delivery not configured on this server.',
        setup: {
          required_env_vars: {
            WHATSAPP_PHONE_NUMBER_ID: 'Phone Number ID from Meta WhatsApp Cloud API setup',
            WHATSAPP_ACCESS_TOKEN: 'Permanent access token from Meta system user',
            WHATSAPP_TEMPLATE_NAME: 'Approved Meta template with four body parameters',
          },
          docs: 'https://developers.facebook.com/docs/whatsapp/cloud-api/get-started',
          message_preview: message,
        },
      },
      { status: 503 }
    );
  }

  const result = await sendViaMeta(access.phone, lead);
  if (!result.ok) {
    return Response.json({ ok: false, error: result.error }, { status: 502 });
  }

  return Response.json({ ok: true, sid: result.sid });
}
