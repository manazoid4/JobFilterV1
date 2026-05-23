import type { Lead, TradeKey } from './types.js';
import { regionSimilarity } from './postcode.js';
import { getScoreBonus } from './sourceConfig.js';

const TRADE_KEYWORDS: Record<string, { high: string[]; medium: string[]; low: string[] }> = {
  plumbing: {
    high: ['boiler', 'bathroom', 'plumb', 'heating', 'radiator', 'hot water', 'central heating', 'gas safe', 'unvented', 'pressurised'],
    medium: ['kitchen', 'wet room', 'shower', 'pipe', 'drain', 'sanitary', 'water supply', 'mechanical services'],
    low: ['rewire', 'solar panel', 'roof', 'extension', 'landscap', 'paint', 'carpentry', 'joinery'],
  },
  electrical: {
    high: ['rewire', 'electrical', 'wiring', 'ev charger', 'electric vehicle', 'solar', 'consumer unit', 'fuse board', 'lighting', 'fire alarm'],
    medium: ['kitchen', 'bathroom', 'smart home', 'data cabling', 'security system', 'cctv', 'access control'],
    low: ['boiler', 'plumb', 'roof', 'flat roof', 'tiling', 'landscap', 'paint', 'decorat'],
  },
  roofing: {
    high: ['roof', 'roofing', 'flat roof', 'velux', 'slate', 'tile roof', 'gutter', 'fascia', 'soffit', 'cladding', 'felt roof'],
    medium: ['loft', 'chimney', 'lead work', 'flashings', 'ridge tile', 'dormer', 'loft conversion'],
    low: ['rewire', 'boiler', 'plumb', 'kitchen', 'bathroom', 'landscap', 'paint', 'ev charger'],
  },
  building: {
    high: ['extension', 'new build', 'loft conversion', 'garage', 'structural', 'building work', 'construction', 'refurbishment', 'renovation'],
    medium: ['kitchen', 'bathroom', 'basement', 'conversion', 'knock through', 'steel beam', 'foundation'],
    low: ['boiler', 'rewire', 'ev charger', 'gutter', 'fascia', 'landscap', 'paint', 'decorat'],
  },
  carpentry: {
    high: ['carpentry', 'joinery', 'staircase', 'bespoke', 'fitted wardrob', 'kitchen fitting', 'door hanging', 'skirting', 'architrave', 'wood floor'],
    medium: ['loft', 'stud partition', 'door', 'window', 'decking', 'fencing', 'shelving', 'cabinet'],
    low: ['boiler', 'rewire', 'electrical', 'roof', 'flat roof', 'plumb', 'landscap', 'paint'],
  },
  painting: {
    high: ['paint', 'decorat', 'plaster', 'render', 'wallpaper', 'exterior paint', 'interior paint', 'magnolia', 'emulsion', 'gloss'],
    medium: ['refurbishment', 'renovation', 'kitchen', 'bathroom', 'ceiling', 'skimming', 'coving'],
    low: ['boiler', 'rewire', 'electrical', 'roof', 'flat roof', 'plumb', 'ev charger', 'landscap'],
  },
  hvac: {
    high: ['heat pump', 'air conditioning', 'ventilation', 'hvac', 'mechanical', 'ductwork', 'extractor', 'mvhr', 'air source', 'ground source'],
    medium: ['boiler', 'heating', 'radiator', 'bathroom', 'kitchen', 'commercial', 'refrigeration'],
    low: ['rewire', 'electrical', 'roof', 'flat roof', 'paint', 'decorat', 'landscap', 'carpentry'],
  },
  landscaping: {
    high: ['landscape', 'grounds', 'garden', 'paving', 'decking', 'fencing', 'turf', 'retaining wall', 'patio', 'driveway', 'groundwork'],
    medium: ['tree', 'hedge', 'irrigation', 'shed', 'gazebo', 'pergola', 'planting', 'boundary'],
    low: ['boiler', 'rewire', 'electrical', 'roof', 'flat roof', 'plumb', 'kitchen', 'bathroom'],
  },
};

const HIGH_INTENT_KEYWORDS = [
  'emergency', 'leak', 'repair', 'broken', 'failed', 'urgent', 'burst', 'failure',
  'approved', 'commencement', 'building control', 'licence renewal', 'hmo',
  'void', 'retrofit', 'grant approved', 'deadline', 'auction', 'possession',
];


export function scoreLead(lead: Lead, userRegion: string, userTrade?: TradeKey): number {
  return scoreLeadBreakdown(lead, userRegion, '', userTrade).score;
}

export function scoreLeadBreakdown(lead: Lead, userRegion: string, userOutward = '', userTrade?: TradeKey): { score: number; reasons: string[]; qualityLabel: Lead['qualityLabel']; ghostRisk: Lead['ghostRisk']; leadReadiness: Lead['leadReadiness']; recommendedAction: string; evidenceBadges: string[] } {
  let score = 0;
  const reasons: string[] = [];

  const sourcePts = Math.round((lead.sourceConfidence / 100) * 20);
  score += sourcePts;
  reasons.push(`Source confidence ${lead.sourceConfidence}% (+${sourcePts})`);

  const sourceClassBonus = getScoreBonus(lead.source);
  if (sourceClassBonus !== 0) {
    score += sourceClassBonus;
    reasons.push(`Source class ${lead.source} (${sourceClassBonus > 0 ? '+' : ''}${sourceClassBonus})`);
  }

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

  const exactOutward = Boolean(userOutward && lead.postcodeOutward && lead.postcodeOutward.toUpperCase() === userOutward.toUpperCase());
  const sim = exactOutward ? 1 : regionSimilarity(`${lead.location} ${lead.postcodeOutward}`, userRegion);
  const proximityPts = Math.round(sim * 30);
  score += proximityPts;
  reasons.push(`Proximity fit ${(sim * 100).toFixed(0)}% (+${proximityPts})`);

  if (lead.contactSignal === 'strong') {
    score += 15;
    reasons.push('Strong contact signal (+15)');
  }
  if (lead.contactSignal === 'weak') {
    score += 8;
    reasons.push('Weak contact signal (+8)');
  }
  if (lead.contactSignal === 'none') {
    score -= 12;
    reasons.push('No contact signal (-12)');
  }

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

  if (userTrade && TRADE_KEYWORDS[userTrade]) {
    const text = `${lead.title} ${lead.description ?? ''} ${lead.scoreReasons?.join(' ') ?? ''}`.toLowerCase();
    const tradeKw = TRADE_KEYWORDS[userTrade];
    const highHits = tradeKw.high.filter(k => text.includes(k));
    const medHits = tradeKw.medium.filter(k => text.includes(k));
    const lowHits = tradeKw.low.filter(k => text.includes(k));

    if (highHits.length > 0) {
      const bonus = Math.min(highHits.length * 6, 18);
      score += bonus;
      reasons.push(`Trade match: ${highHits.join(', ')} (+${bonus})`);
    }
    if (medHits.length > 0) {
      const bonus = Math.min(medHits.length * 3, 9);
      score += bonus;
      reasons.push(`Related: ${medHits.join(', ')} (+${bonus})`);
    }
    if (lowHits.length > 0) {
      const penalty = Math.min(lowHits.length * 3, 8);
      score -= penalty;
      reasons.push(`Not your trade: ${lowHits.join(', ')} (-${penalty})`);
    }
  }

  const text = `${lead.title} ${lead.scoreReasons?.join(' ') ?? ''}`.toLowerCase();
  const matched = HIGH_INTENT_KEYWORDS.filter(k => text.includes(k));
  if (matched.length > 0) {
    const bonus = Math.min(matched.length * 5, 10);
    score += bonus;
    reasons.push(`High intent keywords: ${matched.join(', ')} (+${bonus})`);
  }

  if (lead.isCommercial) {
    const commercialBonus = (userTrade === 'hvac' || userTrade === 'building' || userTrade === 'electrical') ? 5 : 2;
    score += commercialBonus;
    reasons.push(`Commercial project (+${commercialBonus})`);
  }

  // Freshness decay — older leads lose score
  const publishedMs = lead.publishedAt ? new Date(lead.publishedAt).getTime() : 0;
  if (publishedMs > 0) {
    const ageDays = (Date.now() - publishedMs) / 86_400_000;
    if (ageDays <= 3) {
      score += 5;
      reasons.push(`Fresh lead ${Math.round(ageDays)}d old (+5)`);
    } else if (ageDays <= 7) {
      reasons.push(`Lead ${Math.round(ageDays)}d old — still fresh (+0)`);
    } else if (ageDays <= 14) {
      const penalty = Math.round((ageDays - 7) * 1.5);
      score -= penalty;
      reasons.push(`Stale lead ${Math.round(ageDays)}d old (-${penalty})`);
    } else if (ageDays <= 30) {
      const penalty = Math.round(10 + (ageDays - 14) * 0.8);
      score -= penalty;
      reasons.push(`Old lead ${Math.round(ageDays)}d old (-${penalty})`);
    } else {
      const penalty = Math.min(25, 20 + Math.round((ageDays - 30) * 0.3));
      score -= penalty;
      reasons.push(`Very old lead ${Math.round(ageDays)}d old (-${penalty})`);
    }
  }

  const finalScore = Math.min(Math.max(score, 0), 100);

  // Quality label
  let qualityLabel: Lead['qualityLabel'];
  if (finalScore >= 90) qualityLabel = 'GOLD';
  else if (finalScore >= 75) qualityLabel = 'SILVER';
  else if (finalScore >= 60) qualityLabel = 'BRONZE';
  else if (finalScore >= 40) qualityLabel = 'CHECK';
  else qualityLabel = 'SKIP';

  // Ghost risk
  const sourceLower = (lead.source ?? '').toLowerCase();
  const isDirectorySource = sourceLower.includes('directory');
  let ghostRisk: Lead['ghostRisk'];
  if (
    finalScore >= 65 &&
    lead.sourceConfidence >= 60 &&
    lead.contactSignal !== 'none' &&
    !isDirectorySource
  ) {
    ghostRisk = 'READY';
  } else if (
    finalScore < 40 ||
    (isDirectorySource && lead.sourceConfidence < 50) ||
    (lead.urgency === 'low' && lead.contactSignal === 'none')
  ) {
    ghostRisk = 'WASTE';
  } else {
    ghostRisk = 'MAYBE';
  }

  // Recommended action
  const recommendedAction =
    ghostRisk === 'READY' ? 'Call within 24 hours' :
    ghostRisk === 'WASTE' ? 'Do not spend site-visit time yet' :
    'Verify by phone before quoting';

  // Evidence badges
  const evidenceBadges: string[] = [];
  if (sourceLower.includes('planning')) evidenceBadges.push('Planning Verified');
  if (sourceLower.includes('contracts') || sourceLower.includes('fts') || sourceLower.includes('pcs')) evidenceBadges.push('Tender Live');
  if (lead.publishedAt) {
    const ageDays = (Date.now() - new Date(lead.publishedAt).getTime()) / 86_400_000;
    if (ageDays <= 7) evidenceBadges.push('Fresh');
  }
  if (sourceLower.includes('companies') || sourceLower.includes('company')) evidenceBadges.push('Company Verified');
  if (sourceLower.includes('land') || sourceLower.includes('registry')) evidenceBadges.push('New Owner');
  if (lead.estimatedValue && !lead.estimatedValue.includes('POA') && lead.estimatedValue !== '') evidenceBadges.push('Budget Band');
  evidenceBadges.push('Exclusive');

  const leadReadiness = ghostRisk;
  return { score: finalScore, reasons, qualityLabel, ghostRisk, leadReadiness, recommendedAction, evidenceBadges };
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
