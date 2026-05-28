import type { Lead } from '../../leadEngine/types';
import { supabase } from '../lib/supabase';

export async function persistLeads(leads: Lead[]) {
  if (!supabase || leads.length === 0) {
    return { stored: false, count: 0, provider: supabase ? 'supabase' : 'none' };
  }

  const rows = leads.map(toLeadRow);
  const { error } = await supabase
    .from('leads')
    .upsert(rows, { onConflict: 'id' });

  if (error) {
    console.warn('[leads:persist] Supabase upsert failed:', error.message);
    return { stored: false, count: 0, provider: 'supabase', error: error.message };
  }

  return { stored: true, count: rows.length, provider: 'supabase' };
}

function toLeadRow(lead: Lead) {
  return {
    id: lead.id,
    title: lead.title,
    trade: String(lead.trade),
    location: lead.location,
    postcode_outward: lead.postcodeOutward,
    estimated_value: lead.estimatedValue,
    urgency: lead.urgency,
    source: lead.source,
    source_confidence: Math.round(Number(lead.sourceConfidence ?? 0)),
    contact_signal: lead.contactSignal,
    status: lead.status ?? 'new',
    score: Math.round(Number(lead.score ?? 0)),
    fusion_key: lead.fusionKey ?? null,
    source_url: lead.sourceUrl ?? null,
    buyer_name: lead.buyerName ?? null,
    published_at: toIsoOrNull(lead.publishedAt),
    deadline_at: toIsoOrNull(lead.deadlineAt),
    quality_label: lead.qualityLabel ?? null,
    ghost_risk: lead.ghostRisk ?? lead.leadReadiness ?? null,
    signal_class: lead.signalClass ?? null,
    signal_stack: lead.signalStack ?? [],
    evidence_badges: lead.evidenceBadges ?? [],
    score_reasons: lead.scoreReasons ?? [],
    recommended_action: lead.recommendedAction ?? null,
    contact_path: lead.contactPath ?? null,
    opportunity_atoms: lead.opportunityAtoms ?? [],
    why_this_is_a_job: lead.whyThisIsAJob ?? null,
    is_commercial: Boolean(lead.isCommercial),
    payload: {
      signalStack: lead.signalStack ?? [],
      evidenceBadges: lead.evidenceBadges ?? [],
      scoreReasons: lead.scoreReasons ?? [],
      cpvCodes: lead.cpvCodes ?? [],
      distanceMiles: lead.distanceMiles ?? null,
      description: lead.description ?? '',
    },
    updated_at: new Date().toISOString(),
  };
}

function toIsoOrNull(value?: string) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}
