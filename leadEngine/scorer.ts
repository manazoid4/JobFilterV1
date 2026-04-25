import type { Lead } from './types.ts';
import { regionSimilarity } from './postcode.ts';

/**
 * Score each lead 0–100.
 *
 * Factors:
 *  - source confidence        (0–30)
 *  - urgency                  (0–25)
 *  - region match             (0–20)
 *  - contact signal           (0–15)
 *  - value bracket            (0–10)
 */
export function scoreLead(lead: Lead, userRegion: string): number {
  return scoreLeadBreakdown(lead, userRegion).score;
}

export function scoreLeadBreakdown(lead: Lead, userRegion: string): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // Source confidence (max 30)
  const sourcePts = Math.round((lead.sourceConfidence / 100) * 30);
  score += sourcePts;
  reasons.push(`Source confidence ${lead.sourceConfidence}% (+${sourcePts})`);

  // Urgency (max 25)
  if (lead.urgency === 'high') {
    score += 25;
    reasons.push('Urgent timeline (+25)');
  }
  if (lead.urgency === 'medium') {
    score += 15;
    reasons.push('Medium urgency (+15)');
  }
  if (lead.urgency === 'low') {
    score += 5;
    reasons.push('Lower urgency (+5)');
  }

  // Region match (max 20)
  const sim = regionSimilarity(lead.location, userRegion);
  const regionPts = Math.round(sim * 20);
  score += regionPts;
  reasons.push(`Region fit ${(sim * 100).toFixed(0)}% (+${regionPts})`);

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

  // Value bracket (max 10) — sweet spot £5k–£200k
  const raw = parseValueToMidpoint(lead.estimatedValue);
  if (raw >= 5_000 && raw <= 200_000) {
    score += 10;
    reasons.push('Estimated value in sweet spot (+10)');
  } else if (raw >= 1_000 && raw < 5_000) {
    score += 5;
    reasons.push('Estimated value acceptable (+5)');
  } else if (raw > 200_000) {
    score += 3;
    reasons.push('Large contract, likely competitive (+3)');
  } else {
    reasons.push('Low/unknown value (+0)');
  }

  return { score: Math.min(score, 100), reasons };
}

function parseValueToMidpoint(val: string): number {
  if (!val || val === 'POA') return 0;
  const nums = val.replace(/[£,]/g, '').match(/[\d.]+[kKmM]?/g) ?? [];
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
