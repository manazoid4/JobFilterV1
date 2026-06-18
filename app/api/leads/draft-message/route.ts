/**
 * POST /api/leads/draft-message
 * AI-drafted first WhatsApp/email message to a lead's buyer/contact.
 * Requires: paid subscription or owner access.
 *
 * Request body: { lead: LeadObject, tone?: 'quote' | 'introduce' }
 *
 * Guardrails:
 *  - On-demand only, never auto-sent — caller must explicitly send the returned draft.
 *  - 6s hard timeout, falls back to the existing deterministic WhatsApp template.
 *  - Prompt forbids inventing buyer name/phone/price — only uses supplied fields.
 *  - Draft length capped; no links/markup beyond plain text.
 */

import { createAuthServerClient } from '../../../../src/lib/supabase/auth-server';
import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';
import { isOwnerEmail } from '../../../../server/lib/ownerAccess';
import { callClaudeJSON, aiEnabled } from '../../../../leadEngine/aiClient';

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

function clean(s: unknown, max = 300): string {
  return String(s ?? '').replace(/[<>\x00-\x08\x0B\x0C\x0E-\x1F]/g, '').trim().slice(0, max);
}

function fallbackDraft(title: string, trade: string, value: string): string {
  return [
    `Hi, I'm a ${trade || 'trade'} professional and saw your job: ${title}.`,
    value ? `Happy to give a free quote — budget noted at ${value}.` : `Happy to give a free quote.`,
    `Let me know a good time to call or send photos.`,
  ].join(' ');
}

export async function POST(request: Request) {
  const access = await resolveIsPaid();
  if (!access.ok) {
    return Response.json({ ok: false, error: access.error ?? 'Paid subscription required' }, { status: access.userId ? 403 : 401 });
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
  const tone = body.tone === 'introduce' ? 'introduce' : 'quote';

  const title = clean(lead.title);
  const description = clean(lead.description, 500);
  const trade = clean(lead.trade, 40);
  const value = clean(lead.estimatedValue, 40);
  const urgency = clean(lead.urgency, 20);

  const fallback = fallbackDraft(title, trade, value);
  if (!aiEnabled() || !title) {
    return Response.json({ ok: true, ai: false, draft: fallback });
  }

  const prompt = `Draft a short first WhatsApp message from a UK tradesperson to a potential customer/buyer about a job lead. Use ONLY the facts given — never invent a name, phone number, price, or address.

Job title: ${title}
Trade: ${trade}
Description: ${description}
Estimated value: ${value}
Urgency: ${urgency}
Goal: ${tone === 'introduce' ? 'introduce services and ask to discuss' : 'offer a free quote and ask for next step'}

Rules: max 350 characters, plain text only, friendly and professional UK tone, end with a clear question (call/photos/time).

Return JSON: { "draft": "<the message>" }`;

  const ai = await callClaudeJSON<{ draft: string }>(prompt);
  if (!ai?.draft) {
    return Response.json({ ok: true, ai: false, draft: fallback });
  }

  return Response.json({ ok: true, ai: true, draft: clean(ai.draft, 400) });
}
