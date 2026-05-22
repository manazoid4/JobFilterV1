import type { Lead } from './types';
import { regionSimilarity } from './postcode';

const HIGH_INTENT_KEYWORDS = [
  'emergency', 'leak', 'repair', 'broken', 'failed', 'urgent', 'burst', 'failure',
  'approved', 'commencement', 'building control', 'licence renewal', 'hmo',
  'void', 'retrofit', 'grant approved', 'deadline', 'auction', 'possession',
];

const SOURCE_CLASS_BONUS: Record<string, number> = {
  BuildingControl: 10,
  PlanAPI: 8,
  PlanNexus: 8,
  PlanWire: 8,
  PlanningData: 7,
  ContractsFinder: 7,
  FTS: 7,
  PublicContractsScotland: 7,
  EPC: 6,
  HMOLicensing: 6,
  RetrofitSchemes: 6,
  LandRegistry: 4,
  CompaniesHouse: 3,
  AuctionProperty: 3,
  DirectorySignal: -8,
  PortalTrendIntelligence: -4,
};

/**
 * Score each lead 0–100.
 *
 * Factors:
 *  - source confidence        (0–20)
 *  - urgency                  (0–20)
 *  - proximity                (0–30)
 *  - contact signal           (0–15)
 *  - value bracket            (0–25)
 */
export function scoreLead(lead: Lead, userRegion: string): number {
  return scoreLeadBreakdown(lead, userRegion).score;
}

export function scoreLeadBreakdown(lead: Lead, userRegion: string, userOutward = '', _userTrade?: string): {
  score: number;
  reasons: string[];
  qualityLabel: NonNullable<Lead['qualityLabel']>;
  leadReadiness: NonNullable<Lead['leadReadiness']>;
  recommendedAction: string;
  evidenceBadges: string[];
} {
  let score = 0;
  const reasons: string[] = [];

  // Source confidence (max 20)
  const sourcePts = Math.round((lead.sourceConfidence / 100) * 20);
  score += sourcePts;
  reasons.push(`Source confidence ${lead.sourceConfidence}% (+${sourcePts})`);

  const sourceClassBonus = SOURCE_CLASS_BONUS[lead.source] ?? 0;
  if (sourceClassBonus !== 0) {
    score += sourceClassBonus;
    reasons.push(`Source class ${lead.source} (${sourceClassBonus > 0 ? '+' : ''}${sourceClassBonus})`);
  }

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
  const text = `${lead.title} ${lead.scoreReasons?.join(' ') ?? ''}`.toLowerCase();
  const matched = HIGH_INTENT_KEYWORDS.filter(k => text.includes(k));
  if (matched.length > 0) {
    const bonus = Math.min(matched.length * 5, 10);
    score += bonus;
    reasons.push(`High intent keywords: ${matched.join(', ')} (+${bonus})`);
  }

  score = Math.min(Math.max(score, 0), 100);

  const qualityLabel: NonNullable<Lead['qualityLabel']> = score >= 90
    ? 'GOLD'
    : score >= 75
      ? 'SILVER'
      : score >= 60
        ? 'BRONZE'
        : score >= 40
          ? 'CHECK'
          : 'SKIP';

  const source = String(lead.source ?? '').toLowerCase();
  const directoryFallback = lead.source === 'DirectorySignal';
  const leadReadiness: NonNullable<Lead['leadReadiness']> = score >= 65
    && lead.sourceConfidence >= 60
    && lead.contactSignal !== 'none'
    && !directoryFallback
    ? 'READY'
    : score < 40
      || (directoryFallback && lead.sourceConfidence < 50)
      || (lead.urgency === 'low' && lead.contactSignal === 'none')
        ? 'WASTE'
        : 'MAYBE';

  const recommendedAction = leadReadiness === 'READY'
    ? 'Call within 24 hours'
    : leadReadiness === 'MAYBE'
      ? 'Verify by phone before quoting'
      : 'Do not spend site-visit time yet';

  const evidenceBadges: string[] = [];
  if (source.includes('planning')) evidenceBadges.push('Planning Verified');
  if (source.includes('contracts') || source === 'fts' || source === 'pcs' || source.includes('publiccontractsscotland') || source.includes('sell2wales')) {
    evidenceBadges.push('Tender Live');
  }
  const isFresh = lead.publishedAt && Date.now() - new Date(lead.publishedAt).getTime() <= 7 * 86_400_000;
  if (isFresh) evidenceBadges.push('Fresh');
  if (source.includes('companies')) evidenceBadges.push('Company Verified');
  if (source.includes('land')) evidenceBadges.push('New Owner');
  if (lead.estimatedValue && lead.estimatedValue !== 'POA') evidenceBadges.push('Budget Band');
  evidenceBadges.push('Exclusive');

  return { score, reasons, qualityLabel, leadReadiness, recommendedAction, evidenceBadges };
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
