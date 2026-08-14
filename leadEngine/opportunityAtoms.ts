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

const ATOM_DESCRIPTIONS: Record<string, string> = {
  extension: 'Extension build confirmed in planning — groundwork, structure, and finishing trades needed.',
  loft_dormer: 'Loft or dormer conversion approved — roofing, structural, and electrical work follows.',
  roof_works: 'Roof work confirmed — re-roofing, slate, or flat roof replacement in the planning record.',
  solar_ev: 'Solar or EV charger install — planning signal confirmed, electrical work can start.',
  ashp_hvac: 'Heat pump or HVAC install confirmed — specialist heating engineer required.',
  glazing_windows_doors: 'Window or door replacement confirmed in planning — frames, fitting, and finishing work needed.',
  drainage_groundworks: 'Drainage or groundworks confirmed — foundations, excavation, or driveway work ahead.',
  tree_fencing_landscaping: 'Landscaping or boundary work confirmed — fencing, decking, or garden work in scope.',
  hmo_fire_alarm_eicr: 'HMO or fire alarm upgrade — EICR, consumer unit, or emergency lighting install required.',
  commercial_fit_out: 'Commercial fit-out or change of use confirmed — multiple trades likely needed on site.',
};

const TRADE_CONTEXT: Record<string, string> = {
  electrical: 'Confirmed electrical scope — first mover gets the quote.',
  plumbing: 'Confirmed plumbing or heating scope — ready to price.',
  roofing: 'Confirmed roofing scope — survey and quote now before it goes to Checkatrade.',
  building: 'Confirmed building scope — multiple trades likely, subcontract route available.',
  hvac: 'Confirmed heating scope — ASHP and boiler installs are up across the UK.',
  carpentry: 'Confirmed joinery or windows scope — fit now or lose it to a national firm.',
  landscaping: 'Confirmed landscaping scope — local trade advantage, start booking.',
};

export function whyThisIsAJob(atoms: OpportunityAtom[]): string {
  const best = [...atoms].sort((a, b) => (b.confidence + b.urgencyImpact / 20) - (a.confidence + a.urgencyImpact / 20))[0];
  if (!best) return '';
  const atomDesc = ATOM_DESCRIPTIONS[best.atomType] ?? `${best.atomType.replace(/_/g, ' ')} work confirmed by official source.`;
  const tradeCtx = TRADE_CONTEXT[best.trade] ?? 'Verified signal backed by official source data.';
  return `${atomDesc} ${tradeCtx}`;
}
