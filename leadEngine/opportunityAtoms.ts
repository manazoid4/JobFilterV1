import type { Lead, OpportunityAtom } from './types';

const ATOM_RULES: Array<{
  atomType: OpportunityAtom['atomType'];
  trade: string;
  pattern: RegExp;
  valueImpact: number;
  urgencyImpact: number;
}> = [
  { atomType: 'extension', trade: 'building', pattern: /extension|single storey|two storey|rear extension|side extension/i, valueImpact: 18000, urgencyImpact: 8 },
  { atomType: 'loft_dormer', trade: 'building', pattern: /loft|dormer|roof space conversion/i, valueImpact: 22000, urgencyImpact: 7 },
  { atomType: 'roof_works', trade: 'roofing', pattern: /roof|reroof|rooflight|velux|slate|tile|flat roof|dormer/i, valueImpact: 9000, urgencyImpact: 7 },
  { atomType: 'solar_ev', trade: 'electrical', pattern: /solar|pv panel|ev charger|electric vehicle/i, valueImpact: 6000, urgencyImpact: 6 },
  { atomType: 'ashp_hvac', trade: 'hvac', pattern: /air source heat pump|ashp|heat pump|hvac|air conditioning|ventilation/i, valueImpact: 9000, urgencyImpact: 6 },
  { atomType: 'glazing_windows_doors', trade: 'carpentry', pattern: /window|door|glazing|bifold|bi-fold|fenestration/i, valueImpact: 5000, urgencyImpact: 4 },
  { atomType: 'drainage_groundworks', trade: 'building', pattern: /drainage|groundworks|foundation|excavat|driveway/i, valueImpact: 12000, urgencyImpact: 7 },
  { atomType: 'tree_fencing_landscaping', trade: 'landscaping', pattern: /tree|fencing|landscap|garden|patio|boundary|decking/i, valueImpact: 5000, urgencyImpact: 5 },
  { atomType: 'hmo_fire_alarm_eicr', trade: 'electrical', pattern: /hmo|fire alarm|emergency lighting|eicr|consumer unit/i, valueImpact: 7000, urgencyImpact: 9 },
  { atomType: 'commercial_fit_out', trade: 'building', pattern: /fit.?out|retail|office|restaurant|shopfront|change of use|commercial/i, valueImpact: 25000, urgencyImpact: 8 },
];

export function extractOpportunityAtoms(lead: Lead): OpportunityAtom[] {
  const text = `${lead.title ?? ''}. ${lead.description ?? ''}. ${(lead.scoreReasons ?? []).join('. ')}`;
  const evidenceText = text.replace(/\s+/g, ' ').trim().slice(0, 220);
  const sourceDocumentUrl = lead.sourceUrl ?? '';
  if (!sourceDocumentUrl) return [];

  return ATOM_RULES
    .filter(rule => rule.pattern.test(text))
    .map(rule => ({
      trade: rule.trade,
      atomType: rule.atomType,
      evidenceText,
      sourceDocumentUrl,
      confidence: 0.72,
      estimatedValueImpact: rule.valueImpact,
      urgencyImpact: rule.urgencyImpact,
    }))
    .slice(0, 4);
}

export function whyThisIsAJob(atoms: OpportunityAtom[]): string {
  const best = [...atoms].sort((a, b) => (b.confidence + b.urgencyImpact / 20) - (a.confidence + a.urgencyImpact / 20))[0];
  if (!best) return '';
  return `${best.atomType.replace(/_/g, ' ')} signal for ${best.trade} work backed by source evidence.`;
}
