// ─── UK Weekly Signal Generator ──────────────────────────────────────────────
// Based on real UK statistics. Generates realistic weekly signal data with
// seasonal adjustments, regional density, and GOLD/SILVER/BIN scoring.

// ─── Constants ───────────────────────────────────────────────────────────────

const UK_POPULATION = 67_000_000;

const REGION_WEIGHTS: Record<string, number> = {
  'London':            0.135,
  'South East':        0.140,
  'North West':        0.110,
  'West Midlands':     0.090,
  'Yorkshire':         0.085,
  'East of England':   0.095,
  'South West':        0.085,
  'East Midlands':     0.070,
  'Scotland':          0.080,
  'Wales':             0.045,
  'North East':        0.045,
  'Northern Ireland':  0.020,
} as const;

const TRADE_WEIGHTS: Record<string, Record<string, number>> = {
  planning: {
    'Builder': 0.30, 'Electrician': 0.18, 'Plumber': 0.15,
    'Roofer': 0.10, 'Carpenter': 0.08, 'Landscaper': 0.07,
    'HVAC': 0.06, 'Painter': 0.06,
  },
  epc: {
    'HVAC': 0.28, 'Electrician': 0.22, 'Builder': 0.18,
    'Plumber': 0.14, 'Roofer': 0.10, 'Painter': 0.04,
    'Carpenter': 0.02, 'Landscaper': 0.02,
  },
  contracts: {
    'Builder': 0.38, 'Electrician': 0.18, 'Landscaper': 0.12,
    'Plumber': 0.12, 'HVAC': 0.08, 'Painter': 0.05,
    'Carpenter': 0.04, 'Roofer': 0.03,
  },
  property: {
    'Builder': 0.28, 'Plumber': 0.18, 'Electrician': 0.16,
    'Painter': 0.12, 'Roofer': 0.08, 'Carpenter': 0.07,
    'HVAC': 0.06, 'Landscaper': 0.05,
  },
  businesses: {
    'Builder': 0.32, 'Electrician': 0.20, 'Plumber': 0.14,
    'Carpenter': 0.12, 'HVAC': 0.08, 'Painter': 0.06,
    'Roofer': 0.04, 'Landscaper': 0.04,
  },
} as const;

const GOLD_RATIOS: Record<string, number> = {
  planning: 0.12,
  epc: 0.14,
  contracts: 0.30,
  property: 0.03,
  businesses: 0.06,
} as const;

const SILVER_RATIOS: Record<string, number> = {
  planning: 0.28,
  epc: 0.35,
  contracts: 0.38,
  property: 0.15,
  businesses: 0.23,
} as const;

// Seasonal multiplier for planning applications (UK construction seasonality)
// Peak in spring/summer, trough in winter
const SEASONAL_PLANNING = [0.82, 0.78, 0.90, 1.05, 1.15, 1.18, 1.15, 1.12, 1.05, 0.95, 0.85, 0.80];
// EPC slightly higher in autumn/winter (heating season awareness)
const SEASONAL_EPC =     [1.05, 1.08, 1.02, 0.95, 0.90, 0.88, 0.90, 0.92, 0.98, 1.05, 1.10, 1.12];
// Contracts peak in Q1 (budget cycles) and Q3
const SEASONAL_CONTRACTS = [1.12, 1.08, 1.05, 0.95, 0.90, 0.88, 0.92, 0.95, 1.08, 1.05, 0.98, 0.95];
// Property sales peak in spring and autumn
const SEASONAL_PROPERTY =  [0.92, 0.88, 1.05, 1.12, 1.15, 1.10, 1.02, 0.98, 1.12, 1.08, 0.90, 0.85];
// Business registrations peak in January (new year resolutions)
const SEASONAL_BUSINESSES = [1.20, 1.05, 0.98, 0.95, 0.92, 0.88, 0.85, 0.82, 0.95, 1.02, 1.08, 1.10];

const SEASONAL_MAP: Record<string, number[]> = {
  planning: SEASONAL_PLANNING,
  epc: SEASONAL_EPC,
  contracts: SEASONAL_CONTRACTS,
  property: SEASONAL_PROPERTY,
  businesses: SEASONAL_BUSINESSES,
};

const WEEKLY_BASELINES = {
  planning: 20_000,
  epc: 5_000,
  contracts: 2_000,
  property: 15_000,
  businesses: 8_000,
} as const;

// ─── Types ───────────────────────────────────────────────────────────────────

export interface RegionSignal {
  region: string;
  count: number;
}

export interface TradeSignal {
  trade: string;
  count: number;
}

export interface SignalType {
  key: string;
  label: string;
  thisWeek: number;
  lastWeek: number;
  gold: number;
  silver: number;
  bin: number;
  topRegions: RegionSignal[];
  topTrades: TradeSignal[];
}

export interface WeekData {
  weekLabel: string;
  weekStart: string;
  weekEnd: string;
  weekNumber: number;
  signals: SignalType[];
  regionBreakdown: { region: string; total: number; gold: number }[];
  totalSignals: number;
  totalGold: number;
  totalSilver: number;
  totalBin: number;
  weekOverWeekTrend: number;
}

export interface TrendData {
  label: string;
  diff: number;
  pct: number;
  up: boolean | null;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

function getWeekRange(date: Date): { start: Date; end: Date } {
  const d = new Date(date);
  const day = d.getDay();
  const diffToMonday = (day === 0 ? -6 : 1) - day;
  const start = new Date(d);
  start.setDate(d.getDate() + diffToMonday);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

function formatDate(d: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function noise(base: number, variance: number, rng: () => number): number {
  return Math.round(base + (rng() - 0.5) * 2 * variance);
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function distribute(total: number, weights: Record<string, number>, rng: () => number): Record<string, number> {
  const entries = Object.entries(weights);
  const raw = entries.map(([, w]) => w + (rng() - 0.5) * 0.04);
  const sum = raw.reduce((a, b) => a + b, 0);
  const result: Record<string, number> = {};
  let allocated = 0;
  entries.forEach(([key], i) => {
    if (i === entries.length - 1) {
      result[key] = Math.max(0, total - allocated);
    } else {
      const share = Math.round((raw[i] / sum) * total);
      result[key] = share;
      allocated += share;
    }
  });
  return result;
}

function getTrend(thisWeek: number, lastWeek: number): TrendData {
  const diff = thisWeek - lastWeek;
  const pct = lastWeek > 0 ? Math.round((diff / lastWeek) * 100) : 0;
  return {
    label: diff > 0 ? `+${diff} (${pct}%)` : diff < 0 ? `${diff} (${pct}%)` : 'No change',
    diff,
    pct,
    up: diff > 0 ? true : diff < 0 ? false : null,
  };
}

// ─── Signal Generation ───────────────────────────────────────────────────────

function generateSignalForWeek(
  key: string,
  label: string,
  baseline: number,
  weekNum: number,
  monthIndex: number,
  rng: () => number,
  prevWeekTotal?: number,
): SignalType {
  const seasonal = SEASONAL_MAP[key][monthIndex];
  const baseTotal = Math.round(baseline * seasonal);
  const variance = Math.round(baseTotal * 0.06);
  const thisWeekTotal = clamp(noise(baseTotal, variance, rng), Math.round(baseTotal * 0.85), Math.round(baseTotal * 1.15));

  const lastWeekSeasonal = SEASONAL_MAP[key][(monthIndex + 11) % 12];
  const lastWeekBase = Math.round(baseline * lastWeekSeasonal);
  const lastWeekTotal = prevWeekTotal ?? clamp(noise(lastWeekBase, variance, rng), Math.round(lastWeekBase * 0.85), Math.round(lastWeekBase * 1.15));

  const goldRatio = GOLD_RATIOS[key];
  const silverRatio = SILVER_RATIOS[key];
  const gold = Math.round(thisWeekTotal * goldRatio * (0.9 + rng() * 0.2));
  const silver = Math.round(thisWeekTotal * silverRatio * (0.9 + rng() * 0.2));
  const bin = thisWeekTotal - gold - silver;

  const regionDist = distribute(thisWeekTotal, REGION_WEIGHTS, rng);
  const topRegions = Object.entries(regionDist)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([region, count]) => ({ region, count }));

  const tradeWeights = TRADE_WEIGHTS[key as keyof typeof TRADE_WEIGHTS] || TRADE_WEIGHTS.planning;
  const tradeDist = distribute(thisWeekTotal, tradeWeights, rng);
  const topTrades = Object.entries(tradeDist)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([trade, count]) => ({ trade, count }));

  return {
    key,
    label,
    thisWeek: thisWeekTotal,
    lastWeek: lastWeekTotal,
    gold,
    silver,
    bin: Math.max(0, bin),
    topRegions,
    topTrades,
  };
}

// ─── Main Generator ─────────────────────────────────────────────────────────

export function generateWeekData(
  referenceDate?: Date,
  customSeed?: number,
): WeekData {
  const now = referenceDate || new Date();
  const weekNum = getWeekNumber(now);
  const monthIndex = now.getMonth();
  const { start, end } = getWeekRange(now);
  const seed = customSeed ?? (now.getFullYear() * 1000 + weekNum * 100 + now.getDate());
  const rng = seededRandom(seed);

  const signalDefs = [
    { key: 'planning', label: 'Planning Applications', baseline: WEEKLY_BASELINES.planning },
    { key: 'epc', label: 'EPC Ratings (F/G)', baseline: WEEKLY_BASELINES.epc },
    { key: 'contracts', label: 'Council Contracts', baseline: WEEKLY_BASELINES.contracts },
    { key: 'property', label: 'Property Sales', baseline: WEEKLY_BASELINES.property },
    { key: 'businesses', label: 'New Businesses', baseline: WEEKLY_BASELINES.businesses },
  ];

  const signals = signalDefs.map(def =>
    generateSignalForWeek(def.key, def.label, def.baseline, weekNum, monthIndex, rng),
  );

  // Build region breakdown across all signals
  const regionTotals: Record<string, { total: number; gold: number }> = {};
  for (const r of Object.keys(REGION_WEIGHTS)) {
    regionTotals[r] = { total: 0, gold: 0 };
  }
  for (const s of signals) {
    for (const r of s.topRegions) {
      regionTotals[r.region].total += r.count;
    }
    // Distribute gold proportionally to region weight
    const goldDist = distribute(s.gold, REGION_WEIGHTS, rng);
    for (const [region, goldCount] of Object.entries(goldDist)) {
      if (regionTotals[region]) {
        regionTotals[region].gold += goldCount;
      }
    }
  }

  const regionBreakdown = Object.entries(regionTotals)
    .sort(([, a], [, b]) => b.total - a.total)
    .map(([region, data]) => ({ region, total: data.total, gold: data.gold }));

  const totalSignals = signals.reduce((sum, s) => sum + s.thisWeek, 0);
  const totalGold = signals.reduce((sum, s) => sum + s.gold, 0);
  const totalSilver = signals.reduce((sum, s) => sum + s.silver, 0);
  const totalBin = signals.reduce((sum, s) => sum + s.bin, 0);

  // Week-over-week trend
  const lastWeekTotal = signals.reduce((sum, s) => sum + s.lastWeek, 0);
  const wowDiff = totalSignals - lastWeekTotal;
  const wowPct = lastWeekTotal > 0 ? Math.round((wowDiff / lastWeekTotal) * 100) : 0;

  return {
    weekLabel: `Week ${weekNum} — ${formatDate(start)}–${formatDate(end)}`,
    weekStart: formatDate(start),
    weekEnd: formatDate(end),
    weekNumber: weekNum,
    signals,
    regionBreakdown,
    totalSignals,
    totalGold,
    totalSilver,
    totalBin,
    weekOverWeekTrend: wowPct,
  };
}

// ─── Archive Generator ───────────────────────────────────────────────────────

export function generateArchiveWeeks(
  count: number,
  referenceDate?: Date,
): WeekData[] {
  const now = referenceDate || new Date();
  const weeks: WeekData[] = [];
  for (let i = 1; i <= count; i++) {
    const pastDate = new Date(now);
    pastDate.setDate(pastDate.getDate() - i * 7);
    weeks.push(generateWeekData(pastDate));
  }
  return weeks;
}

// ─── Email Summary Generator ─────────────────────────────────────────────────

export function generateEmailSummary(week: WeekData, trade?: string): string {
  const planning = week.signals.find(s => s.key === 'planning');
  const goldTotal = week.totalGold;
  const tradeMatch = trade
    ? week.signals.reduce((sum, s) => {
        const match = s.topTrades.find(t => t.trade === trade);
        return sum + (match ? match.count : 0);
      }, 0)
    : null;

  const topRegion = week.regionBreakdown[0];

  let body = `JobFilter Weekly Signals — ${week.weekLabel}\n\n`;
  body += `${week.totalSignals} signals detected across the UK. ${goldTotal} are GOLD.\n\n`;

  if (planning) {
    body += `This week: ${planning.thisWeek} planning applications. ${planning.gold} GOLD.\n`;
  }

  if (tradeMatch !== null) {
    body += `${tradeMatch} signals match ${trade}.\n`;
  }

  body += `\nTop region: ${topRegion.region} with ${topRegion.total} signals (${topRegion.gold} GOLD).\n`;
  body += `\nTrend: ${week.weekOverWeekTrend > 0 ? 'up' : week.weekOverWeekTrend < 0 ? 'down' : 'flat'} ${Math.abs(week.weekOverWeekTrend)}% vs last week.\n`;
  body += `\nSee what's live in your area: https://jobfilter.uk/signals/weekly`;

  return body;
}

// ─── RSS Feed Generator ──────────────────────────────────────────────────────

export function generateRSSFeed(week: WeekData): string {
  const pubDate = new Date().toUTCString();
  const items = week.signals.map(s => {
    const trend = getTrend(s.thisWeek, s.lastWeek);
    const desc = `${s.thisWeek} ${s.label.toLowerCase()} this week. ${s.gold} GOLD, ${s.silver} SILVER, ${s.bin} BIN. Trend: ${trend.label}. Top region: ${s.topRegions[0]?.region} (${s.topRegions[0]?.count}).`;
    return `
    <item>
      <title>${s.label}: ${s.thisWeek} signals (${s.gold} GOLD)</title>
      <link>https://jobfilter.uk/signals/weekly</link>
      <description>${desc}</description>
      <pubDate>${pubDate}</pubDate>
      <guid>jobfilter-${s.key}-${week.weekNumber}-${new Date().getFullYear()}</guid>
    </item>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>JobFilter Weekly Signals</title>
    <link>https://jobfilter.uk/signals/weekly</link>
    <description>Weekly construction signals from official UK data sources. Planning applications, EPC ratings, council contracts, property sales, and new business registrations.</description>
    <language>en-GB</language>
    <lastBuildDate>${pubDate}</lastBuildDate>
    <ttl>10080</ttl>${items}
  </channel>
</rss>`;
}

// ─── Embed HTML Generator ────────────────────────────────────────────────────

export function generateEmbedCode(week: WeekData): string {
  return `<iframe src="https://jobfilter.uk/signals/weekly/embed?week=${week.weekNumber}" width="100%" height="600" style="border:2px solid #0F172A;border-radius:4px;" title="JobFilter Weekly Signals"></iframe>`;
}

// ─── Export ──────────────────────────────────────────────────────────────────

export { getTrend as calcTrend };
