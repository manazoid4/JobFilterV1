import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';

export async function POST(request: Request) {
  const lead = await request.json().catch(() => ({}));
  const score = scoreLead(lead);
  const result = {
    ok: true,
    score,
    model: process.env.GEMINI_API_KEY ? 'gemini-ready' : 'rules-fallback',
    reasons: [
      'urgency weighted first',
      'estimated value weighted second',
      'data completeness checked',
    ],
  };

  const supabase = getSupabaseServiceClient();
  if (supabase && typeof lead.id === 'string') {
    await supabase.from('ai_scores').insert({
      lead_id: lead.id,
      score,
      model: result.model,
      reasons: result.reasons,
      payload: lead,
    });
  }

  return Response.json(result);
}

function scoreLead(lead: Record<string, unknown>) {
  const urgency = String(lead.urgency ?? '').toLowerCase();
  const value = Number(String(lead.estimatedValue ?? '').replace(/[^0-9.]/g, '')) || 0;
  const completeness = ['title', 'trade', 'location', 'postcodeOutward', 'source', 'contactSignal']
    .filter((key) => Boolean(lead[key])).length;

  const urgencyScore = urgency.includes('today') || urgency.includes('high') ? 35 : urgency.includes('week') ? 24 : 12;
  const valueScore = value >= 100000 ? 35 : value >= 25000 ? 26 : value >= 5000 ? 18 : 8;
  const completenessScore = Math.round((completeness / 6) * 30);

  return Math.min(100, urgencyScore + valueScore + completenessScore);
}
