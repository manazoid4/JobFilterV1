/**
 * Forestry Commission Felling Licence Fetcher
 *
 * Signal: Landowners applying for tree felling licences need:
 * - Tree surgeons for clearance
 * - Landscapers for replanting/groundworks
 * - Fencing contractors for boundary work
 * - Groundworkers for access roads
 *
 * API: Public register of felling licence applications
 * Free, weekly updates, 10,000-15,000 licences/year
 *
 * Competitors ignore this because it's rural/niche — but it's consistent,
 * high-value work with less competition.
 */

import type { RawLead, SourceStats } from '../types.js';

const FC_API = 'https://www.gov.uk/guidance/tree-felling-licence-when-you-need-to-apply';

// Felling licence types and the trades they signal
const FELLING_SIGNALS = [
  { type: 'Commercial thinning', trades: ['landscaping', 'building'], valueLow: 5000, valueHigh: 30000, label: 'Commercial Timber Clearance', desc: 'Commercial forestry operation — timber clearance, access roads, drainage.' },
  { type: 'Safety felling', trades: ['landscaping', 'building'], valueLow: 2000, valueHigh: 15000, label: 'Safety Tree Removal', desc: 'Dangerous trees requiring removal — clearance, stump grinding, site restoration.' },
  { type: 'Disease management', trades: ['landscaping', 'building'], valueLow: 3000, valueHigh: 20000, label: 'Disease Management Programme', desc: 'Ash dieback or oak processionary moth management — clearance, replanting, ecological works.' },
  { type: 'Development clearance', trades: ['landscaping', 'building', 'carpentry'], valueLow: 8000, valueHigh: 50000, label: 'Development Site Clearance', desc: 'Land development requiring tree clearance — site prep, groundworks, fencing.' },
  { type: 'Woodland creation', trades: ['landscaping', 'building'], valueLow: 4000, valueHigh: 25000, label: 'Woodland Creation Grant', desc: 'New woodland planting — fencing, access tracks, drainage, ground preparation.' },
];

function generateMockFellingLicences(outward: string, trade: string): RawLead[] {
  const now = Date.now();
  const day = 86_400_000;

  const locations = [
    `${outward} Woodland`, `${outward} Estate`, `${outward} Forest`,
    `${outward} Farm`, `${outward} Country Park`, `${outward} Nature Reserve`,
  ];

  const landowners = [
    'Private Landowner', 'Forestry Commission', 'National Trust',
    'Woodland Trust', 'Local Authority', 'Farm Estate',
  ];

  const leads: RawLead[] = [];

  for (const signal of FELLING_SIGNALS) {
    if (!signal.trades.includes(trade) && trade !== 'all') continue;

    const location = locations[Math.floor(Math.random() * locations.length)];
    const landowner = landowners[Math.floor(Math.random() * landowners.length)];
    const applied = new Date(now - (2 + Math.floor(Math.random() * 14)) * day);
    const urgency = signal.type === 'Safety felling' ? 'high' : 'medium';
    const deadlineDays = urgency === 'high' ? 7 : 30;

    leads.push({
      rawId: `felling-${signal.type.toLowerCase().replace(/\s+/g, '-')}-${applied.getTime()}`,
      rawTitle: `${signal.label}: ${location}`,
      rawDescription: `${signal.desc} Landowner: ${landowner}. Application date: ${applied.toLocaleDateString('en-GB')}. Estimated value: £${signal.valueLow.toLocaleString()}–£${signal.valueHigh.toLocaleString()}.`.substring(0, 300),
      rawValueMin: signal.valueLow,
      rawValueMax: signal.valueHigh,
      rawLocation: outward,
      rawPostcode: outward,
      rawDeadline: new Date(now + deadlineDays * day).toISOString(),
      rawPublished: applied.toISOString(),
      rawBuyer: landowner,
      sourceSystem: 'ForestryCommission',
      sourceUrl: FC_API,
    });
  }

  return leads;
}

export async function forestryCommissionFetcher(
  outward: string,
  trade: string,
): Promise<{ leads: RawLead[]; stats: Record<string, SourceStats> }> {
  // Disabled by default — enable with DEMO_MODE=true
  if (process.env.DEMO_MODE !== 'true') {
    return {
      leads: [],
      stats: {
        ForestryCommission: { fetched: 0, passed: 0, dropped: 0, failed: false, error: 'Disabled: set DEMO_MODE=true' },
      },
    };
  }

  try {
    // TODO: Replace with real Forestry Commission felling licence register
    // Real implementation:
    // 1. Scrape public felling licence register by region
    // 2. Filter by licence type (commercial, safety, disease, development, woodland creation)
    // 3. Score by: urgency (safety = high), value (commercial = higher), recency
    // 4. Return as RawLead[]

    const leads = generateMockFellingLicences(outward, trade);

    const stats: SourceStats = {
      fetched: leads.length + Math.floor(Math.random() * 3),
      passed: leads.length,
      dropped: Math.floor(Math.random() * 2),
      failed: false,
    };

    return { leads, stats: { ForestryCommission: stats } };
  } catch (err: any) {
    console.error(`[ForestryCommission] throw — ${err?.message ?? err}`);
    return {
      leads: [],
      stats: {
        ForestryCommission: { fetched: 0, passed: 0, dropped: 0, failed: true, error: err?.message },
      },
    };
  }
}
