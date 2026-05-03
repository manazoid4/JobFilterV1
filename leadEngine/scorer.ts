import type { Lead } from './types';
import { regionSimilarity } from './postcode';

/**
 * Score each lead 0â€“100.
 *
 * Factors:
 *  - source confidence        (0â€“20)
 *  - urgency                  (0â€“20)
 *  - proximity                (0â€“30)
 *  - contact signal           (0â€“15)
 *  - value bracket            (0â€“25)
 */
export function scoreLead(lead: Lead, userRegion: string): number {
  return scoreLeadBreakdown(lead, userRegion).score;
}

export function scoreLeadBreakdown(lead: Lead, userRegion: string, userOutward = ''): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // Source confidence (max 20)
  const sourcePts = Math.round((lead.sourceConfidence / 100) * 20);
  score += sourcePts;
  reasons.push(`Source confidence ${lead.sourceConfidence}% (+${sourcePts})`);

  // Urgency (max 20)
  if (lead.urgency === 'high') {
    score += 20;
    reasons.push('Urgent timeline (+20)');
  }
  if (lead.urgency === 'medium') {
    score += 12;
    reasons.push('Medium urgency (+12)');
  }
  if (lead.urgency === 'low') {
    score += 4;
    reasons.push('Lower urgency (+4)');
  }

  // Proximity (max 30)
  const exactOutward = Boolean(userOutward && lead.postcodeOutward && lead.postcodeOutward.toUpperCase() === userOutward.toUpperCase());
  const sim = exactOutward ? 1 : regionSimilarity(`${lead.location} ${lead.postcodeOutward}`, userRegion);
  const proximityPts = Math.round(sim * 30);
  score += proximityPts;
  reasons.push(`Proximity fit ${(sim * 100).toFixed(0)}% (+${proximityPts})`);

  // Contact signal (max 15)
  if (lead.contactSignal === 'strong') {
    score += 15;
    reasons.push('Strong contact signal (+15)');
  }
  if (lead.contactSignal === 'weak') {
    score += 8;
    reasons.push('Weak contact signal (+8)');
  }
  if (lead.contactSignal === 'none') {
    reasons.push('No contact signal (+0)');
  }

  // Value bracket (max 25) — one paid lead must be worth chasing.
  const raw = parseValueToMidpoint(lead.estimatedValue);
  if (raw >= 5_000 && raw <= 150_000) {
    score += 25;
    reasons.push('Estimated value in pay-worthy range (+25)');
  } else if (raw >= 2_000 && raw < 5_000) {
    score += 15;
    reasons.push('Estimated value acceptable (+15)');
  } else if (raw >= 1_000) {
    score += 5;
    reasons.push('Small job value (+5)');
  } else if (raw > 150_000) {
    score += 10;
    reasons.push('Large contract, likely competitive (+10)');
  } else {
    reasons.push('Low/unknown value (+0)');
  }

  // High Intent Keywords (max 10 bonus)
  const highIntentKeywords = ['emergency', 'leak', 'repair', 'broken', 'failed', 'urgent', 'burst', 'failure'];
  const text = `${lead.title} ${lead.scoreReasons?.join(' ') ?? ''}`.toLowerCase();
  const matched = highIntentKeywords.filter(k => text.includes(k));
  if (matched.length > 0) {
    const bonus = Math.min(matched.length * 5, 10);
    score += bonus;
    reasons.push(`High intent keywords: ${matched.join(', ')} (+${bonus})`);
  }

  return { score: Math.min(score, 100), reasons };
  }

function parseValueToMidpoint(val: string): number {
  if (!val || val === 'POA') return 0;
  const nums = val.replace(/[Â£,]/g, '').match(/[\d.]+[kKmM]?/g) ?? [];
  const parse = (s: string): number => {
    const n = parseFloat(s);
    if (s.endsWith('M') || s.endsWith('m')) return n * 1_000_000;
    if (s.endsWith('K') || s.endsWith('k')) return n * 1_000;
    return n;
  };
  const values = nums.map(parse).filter(n => n > 0);
  if (!values.length) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

