/**
 * POST /api/leads/explain
 * AI plain-English lead summary + jargon translation.
 * Requires: paid subscription or owner access.
 *
 * Request body: { lead: LeadObject }
 *
 * Guardrails:
 *  - Claude call is on-demand only (never inside the bulk scan path).
 *  - 6s hard timeout (aiClient), falls back to deterministic template on any failure.
 *  - Prompt instructs the model to use ONLY the supplied fields — no invented facts/contacts.
 *  - Output capped and HTML/control-char stripped before returning.
 */

import { createAuthServerClient } from '../../../../src/lib/supabase/auth-server';
import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';
import { isOwnerEmail } from '../../../../server/lib/ownerAccess';
import { callClaudeJSON, aiEnabled } from '../../../../leadEngine/aiClient';
import { whyThisIsAJob, extractOpportunityAtoms } from '../../../../leadEngine/opportunityAtoms';
import type { OpportunityAtom } from '../../../../leadEngine/types';

const FULL_ACCESS_TEST_MODE = process.env.FULL_ACCESS_TEST_MODE === 'true';
const MAX_FIELD_LEN = 300;

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

function clean(s: unknown, max = MAX_FIELD_LEN): string {
  return String(s ?? '').replace(/[<>\x00-\x08\x0B\x0C\x0E-\x1F]/g, '').trim().slice(0, max);
}

interface ExplainResult {
  summary: string;
  plainDescription: string;
  extraAtoms?: Array<Pick<OpportunityAtom, 'trade' | 'atomType' | 'evidenceText' | 'confidence' | 'estimatedValueImpact' | 'urgencyImpact'>>;
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

  const title = clean(lead.title);
  const description = clean(lead.description, 600);
  const trade = clean(lead.trade, 40);
  const value = clean(lead.estimatedValue, 40);
  const source = clean(lead.source, 60);

  // Deterministic fallback — always available, no network call.
  // Note: caller-supplied lead objects rarely carry sourceUrl, so extractOpportunityAtoms()
  // (which requires it) usually returns []. Fall back to the lead's own title before the generic line.
  const atoms = extractOpportunityAtoms(lead as any);
  const fallback: ExplainResult = {
    summary: whyThisIsAJob(atoms) || (title ? `${trade || 'Trade'} job: ${title}.` : `${trade || 'Trade'} opportunity from ${source || 'a verified source'}.`),
    plainDescription: description || title,
  };

  if (!aiEnabled() || !description) {
    return Response.json({ ok: true, ai: false, ...fallback });
  }

  const prompt = `You are summarising a UK trade job lead for a tradesperson. Use ONLY the facts given below — never invent a name, phone number, address, or detail not present.

Title: ${title}
Trade: ${trade}
Estimated value: ${value}
Source: ${source}
Raw description: ${description}

Also classify the job into 0-3 opportunity atoms from this fixed list ONLY (skip if none clearly apply, never invent an atom without a quoted evidence phrase from the raw description):
extension | loft_dormer | roof_works | solar_ev | ashp_hvac | glazing_windows_doors | drainage_groundworks | tree_fencing_landscaping | hmo_fire_alarm_eicr | commercial_fit_out

Return JSON: { "summary": "<one plain-English sentence, max 160 chars, explaining why this is a real job worth chasing>", "plainDescription": "<the raw description rewritten in plain English, no council/legal jargon, max 280 chars>", "extraAtoms": [ { "trade": "...", "atomType": "...", "evidenceText": "<exact short quote from raw description>", "confidence": 0.0, "estimatedValueImpact": 0, "urgencyImpact": 0 } ] }`;

  const ai = await callClaudeJSON<ExplainResult>(prompt);
  if (!ai?.summary || !ai?.plainDescription) {
    return Response.json({ ok: true, ai: false, ...fallback });
  }

  // Guardrail: drop any atom without evidence text actually present in the source description.
  const extraAtoms = (ai.extraAtoms ?? [])
    .filter(a => a?.evidenceText && description.toLowerCase().includes(String(a.evidenceText).toLowerCase().slice(0, 30)))
    .slice(0, 3)
    .map(a => ({
      trade: clean(a.trade, 30),
      atomType: clean(a.atomType, 40),
      evidenceText: clean(a.evidenceText, 180),
      confidence: Math.max(0, Math.min(1, Number(a.confidence) || 0)),
      estimatedValueImpact: Math.max(0, Math.min(500_000, Number(a.estimatedValueImpact) || 0)),
      urgencyImpact: Math.max(0, Math.min(10, Number(a.urgencyImpact) || 0)),
    }));

  return Response.json({
    ok: true,
    ai: true,
    summary: clean(ai.summary, 200),
    plainDescription: clean(ai.plainDescription, 320),
    extraAtoms,
  });
}
