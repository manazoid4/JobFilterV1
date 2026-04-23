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
  let score = 0;

  // Source confidence (max 30)
  score += Math.round((lead.sourceConfidence / 100) * 30);

  // Urgency (max 25)
  if (lead.urgency === 'high')   score += 25;
  if (lead.urgency === 'medium') score += 15;
  if (lead.urgency === 'low')    score += 5;

  // Region match (max 20)
  const sim = regionSimilarity(lead.location, userRegion);
  score += Math.round(sim * 20);

  // Contact signal (max 15)
  if (lead.contactSignal === 'strong') score += 15;
  if (lead.contactSignal === 'weak')   score += 8;

  // Value bracket (max 10) — sweet spot £5k–£200k
  const raw = parseValueToMidpoint(lead.estimatedValue);
  if (raw >= 5_000 && raw <= 200_000)   score += 10;
  else if (raw >= 1_000 && raw < 5_000) score += 5;
  else if (raw > 200_000)               score += 3;

  return Math.min(score, 100);
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
