import type { Lead, RawLead, TradeKey } from './types';
import { getOutward, regionFromNuts, regionFromOutward } from './postcode';

// ── CPV → trade mapping ────────────────────────────────────────────────────────
const CPV_TRADE_MAP: Array<[string, TradeKey]> = [
  ['45330', 'plumbing'], ['45331', 'plumbing'], ['45332', 'plumbing'], ['45333', 'plumbing'],
  ['50720', 'plumbing'], ['50730', 'plumbing'],
  ['45310', 'electrical'], ['45311', 'electrical'], ['45312', 'electrical'],
  ['45315', 'electrical'], ['45316', 'electrical'], ['50710', 'electrical'], ['50711', 'electrical'],
  ['45260', 'roofing'], ['45261', 'roofing'], ['45262', 'roofing'], ['45263', 'roofing'],
  ['45420', 'carpentry'], ['45421', 'carpentry'], ['45422', 'carpentry'], ['45423', 'carpentry'],
  ['45440', 'painting'], ['45441', 'painting'], ['45442', 'painting'],
  ['77300', 'landscaping'], ['77310', 'landscaping'], ['77311', 'landscaping'],
  ['77312', 'landscaping'], ['77313', 'landscaping'], ['77314', 'landscaping'],
  ['45000', 'building'], ['45100', 'building'], ['45200', 'building'],
  ['45210', 'building'], ['45400', 'building'], ['45410', 'building'], ['45450', 'building'],
];

function inferTradeFromCpv(cpvCodes: string[]): TradeKey | null {
  for (const [prefix, trade] of CPV_TRADE_MAP) {
    if (cpvCodes.some(c => c.startsWith(prefix))) return trade;
  }
  return null;
}

const KEYWORD_TRADE_MAP: Array<[RegExp, TradeKey]> = [
  [/plumb|boiler|sanit|hot water|drain/i, 'plumbing'],
  [/electric|rewire|wiring|lighting|ev charg|solar pv/i, 'electrical'],
  [/roof|tile|flat roof|epdm|gutter|fascia/i, 'roofing'],
  [/hvac|ventilat|air.?con|heat pump|ashp|mechanical/i, 'hvac'],
  [/landscap|ground|garden|lawn/i, 'landscaping'],
  [/carpet|joine|floor|timber|door|window frame/i, 'carpentry'],
  [/paint|decorat|plaster|render/i, 'painting'],
  [/build|construct|refurb|renovat|extension|conversion/i, 'building'],
];

function inferTradeFromText(title: string, description: string): TradeKey | null {
  const text = `${title} ${description}`;
  for (const [pattern, trade] of KEYWORD_TRADE_MAP) {
    if (pattern.test(text)) return trade;
  }
  return null;
}

function formatValue(min: number, max: number): string {
  const fmt = (v: number) => v >= 1_000_000
    ? `£${(v / 1_000_000).toFixed(1)}M`
    : v >= 1_000
      ? `£${(v / 1_000).toFixed(0)}k`
      : `£${v.toLocaleString()}`;
  if (min && max && min !== max) return `${fmt(min)}–${fmt(max)}`;
  if (max) return fmt(max);
  if (min) return fmt(min);
  return 'POA';
}

function calcUrgency(deadlineAt: string, value: number): 'low' | 'medium' | 'high' {
  if (deadlineAt) {
    const daysLeft = (Date.parse(deadlineAt) - Date.now()) / 86_400_000;
    if (daysLeft < 7) return 'high';
    if (daysLeft < 21) return 'medium';
  }
  if (value >= 100_000) return 'high';
  if (value >= 20_000) return 'medium';
  return 'low';
}

function calcContactSignal(raw: RawLead): 'none' | 'weak' | 'strong' {
  if (raw.rawContact?.phone) return 'strong';
  if (raw.rawContact?.email || raw.rawBuyer) return 'weak';
  if (raw.sourceUrl) return 'weak';
  return 'none';
}

function sourceConfidence(sourceSystem: string): number {
  switch (sourceSystem) {
    case 'FTS': return 88;
    case 'ContractsFinder': return 85;
    case 'PlanningData': return 65;
    case 'DirectorySignal': return 75;
    default: return 60;
  }
}

function normaliseDate(value: string | undefined): string {
  if (!value) return '';
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? '' : parsed.toISOString();
}

function deriveOutward(raw: RawLead): string {
  const postcodeOutward = raw.rawPostcode ? getOutward(raw.rawPostcode) : '';
  if (postcodeOutward) return postcodeOutward;

  const location = String(raw.rawLocation ?? '').trim().toUpperCase();
  const postcodeMatch = location.match(/\b[A-Z]{1,2}\d[A-Z\d]?\b/);
  if (postcodeMatch) return postcodeMatch[0];

  const nutsMatch = location.match(/\bUK[A-Z0-9]{1,3}\b/);
  if (nutsMatch) return nutsMatch[0];

  return 'UK';
}

export function normalise(raw: RawLead, requestedTrade: string): Lead | null {
  const title = raw.rawTitle?.trim();
  if (!title || title.length < 4) return null;

  const cpvCodes = raw.rawCpvCodes ?? [];
  const tradeFromCpv = inferTradeFromCpv(cpvCodes);
  const tradeFromText = inferTradeFromText(title, raw.rawDescription ?? '');
  const trade: TradeKey = (tradeFromCpv ?? tradeFromText ?? (requestedTrade as TradeKey) ?? 'building');

  const rawVal = raw.rawValue ?? raw.rawValueMax ?? raw.rawValueMin ?? 0;
  const min = raw.rawValueMin ?? (rawVal * 0.8);
  const max = raw.rawValueMax ?? rawVal;

  const deadline = normaliseDate(raw.rawDeadline);
  const published = normaliseDate(raw.rawPublished) || new Date().toISOString();

  const outward = deriveOutward(raw);
  const region = outward.startsWith('UK') ? regionFromNuts(outward) : regionFromOutward(outward);

  const estVal = formatValue(min, max);
  const urgency = calcUrgency(deadline, rawVal);
  const contactSignal = calcContactSignal(raw);

  return {
    id: `${raw.sourceSystem.toLowerCase()}-${raw.rawId}`,
    title,
    trade,
    location: raw.rawLocation?.trim() || region || 'United Kingdom',
    postcodeOutward: outward,
    estimatedValue: estVal,
    urgency,
    source: raw.sourceSystem,
    sourceConfidence: sourceConfidence(raw.sourceSystem),
    sourceUrl: raw.sourceUrl,
    contactSignal,
    status: 'new',
    description: raw.rawDescription?.substring(0, 300) ?? '',
    deadlineAt: deadline,
    buyerName: raw.rawBuyer ?? '',
    cpvCodes,
  };
}

export function normaliseAll(raws: RawLead[], requestedTrade: string): Lead[] {
  return raws
    .map(r => normalise(r, requestedTrade))
    .filter((l): l is Lead => l !== null);
}
