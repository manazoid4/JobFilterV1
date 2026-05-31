import type { Lead, TradeKey } from './types';
import { regionSimilarity } from './postcode';
import { getScoreBonus } from './sourceConfig';
import { buildContactPath, contactPathScoreAdjustment } from './contactPath';

const TRADE_KEYWORDS: Record<string, { high: string[]; medium: string[]; low: string[] }> = {
  plumbing: {
    // Gas engineers, plumbers, heating engineers
    high: ['boiler', 'bathroom', 'plumb', 'heating', 'radiator', 'hot water', 'central heating', 'gas safe', 'unvented', 'pressurised', 'gas engineer', 'gas installation', 'combi', 'heat exchanger', 'pipework'],
    medium: ['kitchen', 'wet room', 'shower', 'pipe', 'drain', 'sanitary', 'water supply', 'mechanical services', 'immersion', 'cylinder'],
    low: ['rewire', 'solar panel', 'roof', 'extension', 'landscap', 'paint', 'carpentry', 'joinery'],
  },
  electrical: {
    high: ['rewire', 'electrical', 'wiring', 'ev charger', 'electric vehicle', 'solar', 'consumer unit', 'fuse board', 'lighting', 'fire alarm', 'eicr', 'pat test', 'rcd', 'electrical installation'],
    medium: ['kitchen', 'bathroom', 'smart home', 'data cabling', 'security system', 'cctv', 'access control', 'solar pv', 'battery storage'],
    low: ['boiler', 'plumb', 'roof', 'flat roof', 'tiling', 'landscap', 'paint', 'decorat', 'gas'],
  },
  roofing: {
    high: ['roof', 'roofing', 'flat roof', 'velux', 'slate', 'tile roof', 'gutter', 'fascia', 'soffit', 'cladding', 'felt roof', 'epdm', 'lead flashing', 'ridge', 're-roof'],
    medium: ['loft', 'chimney', 'lead work', 'flashings', 'ridge tile', 'dormer', 'loft conversion', 'scaffolding'],
    low: ['rewire', 'boiler', 'plumb', 'kitchen', 'bathroom', 'landscap', 'paint', 'ev charger', 'tiling'],
  },
  building: {
    high: ['extension', 'new build', 'loft conversion', 'garage', 'structural', 'building work', 'construction', 'refurbishment', 'renovation', 'groundwork', 'foundation', 'underpinning'],
    medium: ['kitchen', 'bathroom', 'basement', 'conversion', 'knock through', 'steel beam', 'block work', 'brickwork'],
    low: ['boiler', 'rewire', 'ev charger', 'gutter', 'fascia', 'landscap', 'paint', 'decorat', 'solar'],
  },
  carpentry: {
    high: ['carpentry', 'joinery', 'staircase', 'bespoke', 'fitted wardrob', 'kitchen fitting', 'door hanging', 'skirting', 'architrave', 'wood floor', 'hardwood floor', 'engineered floor'],
    medium: ['loft', 'stud partition', 'door', 'window', 'decking', 'fencing', 'shelving', 'cabinet', 'timber frame'],
    low: ['boiler', 'rewire', 'electrical', 'roof', 'flat roof', 'plumb', 'landscap', 'paint', 'solar'],
  },
  painting: {
    // Decorators, plasterers, tilers all map here
    high: ['paint', 'decorat', 'plaster', 'render', 'wallpaper', 'exterior paint', 'interior paint', 'emulsion', 'gloss', 'skimming', 'skim coat', 'plastering', 'tiling', 'tile', 'ceramic', 'porcelain'],
    medium: ['refurbishment', 'renovation', 'kitchen', 'bathroom', 'ceiling', 'coving', 'artex', 'floor tile', 'wall tile'],
    low: ['boiler', 'rewire', 'electrical', 'roof', 'flat roof', 'plumb', 'ev charger', 'landscap', 'structural'],
  },
  hvac: {
    high: ['heat pump', 'air conditioning', 'ventilation', 'hvac', 'mechanical', 'ductwork', 'extractor', 'mvhr', 'air source', 'ground source', 'ashp', 'gshp', 'refrigeration', 'vrf'],
    medium: ['boiler', 'heating', 'radiator', 'bathroom', 'kitchen', 'commercial', 'energy efficiency', 'underfloor heating'],
    low: ['rewire', 'electrical', 'roof', 'flat roof', 'paint', 'decorat', 'landscap', 'carpentry'],
  },
  landscaping: {
    high: ['landscape', 'grounds', 'garden', 'paving', 'decking', 'fencing', 'turf', 'retaining wall', 'patio', 'driveway', 'groundwork', 'block paving', 'resin driveway'],
    medium: ['tree', 'hedge', 'irrigation', 'shed', 'gazebo', 'pergola', 'planting', 'boundary', 'drainage', 'lawn maintenance'],
    low: ['boiler', 'rewire', 'electrical', 'roof', 'flat roof', 'plumb', 'kitchen', 'bathroom', 'solar'],
  },
};

const HIGH_INTENT_KEYWORDS = [
  // Emergency / reactive — very high likelihood of real work
  'emergency', 'leak', 'repair', 'broken', 'failed', 'urgent', 'burst', 'failure', 'no hot water', 'no heating',
  // Planning/construction intent signals
  'approved', 'commencement', 'building control', 'licence renewal', 'hmo',
  'planning approved', 'full planning permission', 'planning granted', 'permitted development',
  // Financial urgency / distress / procurement
  'void', 'retrofit', 'grant approved', 'deadline', 'auction', 'possession', 'repossession',
  'probate', 'estate agent', 'chain free', 'cash buyer',
  // Gas/electrical compliance urgency
  'gas safe', 'eicr required', 'landlord certificate', 'remedial work', 'compliance',
];

// Keywords suggesting low quality / ghost / spam leads
const GHOST_RISK_KEYWORDS = [
  'test', 'example', 'lorem ipsum', 'dummy', 'placeholder', 'tbc', 'to be confirmed',
  'seeking quotes', 'idea stage', 'no budget', 'enquiry only',
];


export function scoreLead(lead: Lead, userRegion: string, userTrade?: TradeKey): number {
  return scoreLeadBreakdown(lead, userRegion, '', userTrade).score;
}

export function scoreLeadBreakdown(lead: Lead, userRegion: string, userOutward = '', userTrade?: TradeKey): { score: number; reasons: string[]; qualityLabel: Lead['qualityLabel']; ghostRisk: Lead['ghostRisk']; leadReadiness: Lead['leadReadiness']; recommendedAction: string; evidenceBadges: string[]; contactPath: NonNullable<Lead['contactPath']> } {
  let score = 0;
  const reasons: string[] = [];
  const contactPath = buildContactPath(lead);

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

  const contactAdjustment = contactPathScoreAdjustment(contactPath);
  score += contactAdjustment.points;
  reasons.push(contactAdjustment.reason);

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

  const fullText = `${lead.title} ${lead.description ?? ''} ${lead.scoreReasons?.join(' ') ?? ''}`.toLowerCase();
  const matched = HIGH_INTENT_KEYWORDS.filter(k => fullText.includes(k));
  if (matched.length > 0) {
    const bonus = Math.min(matched.length * 5, 10);
    score += bonus;
    reasons.push(`High intent keywords: ${matched.slice(0, 3).join(', ')} (+${bonus})`);
  }

  // Ghost/spam risk penalty — keywords that suggest low-quality or fake signals
  const ghostMatched = GHOST_RISK_KEYWORDS.filter(k => fullText.includes(k));
  if (ghostMatched.length > 0) {
    const penalty = Math.min(ghostMatched.length * 8, 20);
    score -= penalty;
    reasons.push(`Ghost/spam signal: ${ghostMatched.join(', ')} (-${penalty})`);
  }

  // Data completeness bonus — leads with more fields filled are higher quality
  let completenessBonus = 0;
  if (lead.buyerName) completenessBonus += 3;
  if (lead.deadlineAt) completenessBonus += 3;
  if (lead.sourceUrl) completenessBonus += 2;
  if (lead.description && lead.description.length > 50) completenessBonus += 2;
  if (completenessBonus > 0) {
    score += completenessBonus;
    reasons.push(`Data completeness (+${completenessBonus})`);
  }

  const atomBoost = Math.min((lead.opportunityAtoms ?? []).reduce((sum, atom) => sum + Math.round(atom.confidence * 4) + Math.min(atom.urgencyImpact, 5), 0), 14);
  if (atomBoost > 0) {
    score += atomBoost;
    reasons.push(`Document opportunity atoms (+${atomBoost})`);
  }

  if (lead.isCommercial) {
    // Commercial leads score significantly higher for trades that regularly win commercial contracts.
    // hvac/electrical/building: typically 30–50% of turnover is commercial. landscaping/carpentry: occasional.
    const commercialBonus = (userTrade === 'hvac' || userTrade === 'electrical') ? 14
      : (userTrade === 'building') ? 12
      : (userTrade === 'plumbing' || userTrade === 'landscaping' || userTrade === 'carpentry') ? 6
      : 3;
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
    !isDirectorySource &&
    contactPath.allowedChannels.length > 0
  ) {
    ghostRisk = 'READY';
  } else if (
    finalScore < 40 ||
    (isDirectorySource && lead.sourceConfidence < 50) ||
    (lead.urgency === 'low' && lead.contactSignal === 'none') ||
    contactPath.recommendedChannel === 'do_not_contact_yet'
  ) {
    ghostRisk = 'WASTE';
  } else {
    ghostRisk = 'MAYBE';
  }

  // Recommended action
  const recommendedAction =
    ghostRisk === 'READY' ? contactPath.reason :
    ghostRisk === 'WASTE' ? 'Do not spend site-visit time yet' :
    contactPath.reason;

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
  if (lead.opportunityAtoms?.length) evidenceBadges.push('Why this is a job');

  const leadReadiness = ghostRisk;
  return { score: finalScore, reasons, qualityLabel, ghostRisk, leadReadiness, recommendedAction, evidenceBadges, contactPath };
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
