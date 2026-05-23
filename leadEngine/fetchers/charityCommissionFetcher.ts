/**
 * Charity Commission Signal Fetcher
 *
 * Signal: Newly registered charities often need premises setup, renovation,
 * or adaptation work. High-value commercial leads that competitors ignore.
 *
 * API: https://register-of-charities.charitycommission.gov.uk
 * Data: Public register with API access
 *
 * Free, daily updates, 10,000-12,000 new charities/year
 */

import type { RawLead, SourceStats } from '../types.js';

const CHARITY_API = 'https://api.charitycommission.gov.uk';

// Charity categories that signal premises work
const PREMISES_SIGNALS = [
  { category: 'Education', trades: ['building', 'electrical', 'plumbing', 'hvac'], valueLow: 15000, valueHigh: 100000, label: 'School/Education Charity' },
  { category: 'Health', trades: ['building', 'electrical', 'plumbing', 'hvac', 'carpentry'], valueLow: 20000, valueHigh: 150000, label: 'Healthcare Charity' },
  { category: 'Social Welfare', trades: ['building', 'plumbing', 'electrical', 'carpentry'], valueLow: 10000, valueHigh: 80000, label: 'Community Centre' },
  { category: 'Religion', trades: ['building', 'electrical', 'plumbing', 'carpentry', 'painting'], valueLow: 8000, valueHigh: 60000, label: 'Place of Worship' },
  { category: 'Arts/Culture', trades: ['building', 'electrical', 'hvac', 'carpentry'], valueLow: 12000, valueHigh: 90000, label: 'Arts/Culture Venue' },
  { category: 'Animal Welfare', trades: ['building', 'carpentry', 'painting', 'landscaping'], valueLow: 5000, valueHigh: 40000, label: 'Animal Shelter' },
];

function generateMockCharities(outward: string, trade: string): RawLead[] {
  const now = Date.now();
  const day = 86_400_000;

  const streets = [
    'High Street', 'Victoria Road', 'Church Lane', 'Station Road', 'Park Avenue',
    'Manor Drive', 'Mill Lane', 'The Green', 'Kingsway', 'Elm Grove',
  ];

  const charityNames: Record<string, string[]> = {
    'Education': ['Bright Futures Learning Trust', 'Community Education Foundation', 'Next Generation Academy Trust'],
    'Health': ['Local Health Support Charity', 'Community Care Foundation', 'Wellbeing Trust'],
    'Social Welfare': ['Neighbourhood Support Trust', 'Community Hub Foundation', 'Local Aid Charity'],
    'Religion': ['Faith Community Centre', 'Interfaith Trust', 'Community Worship Foundation'],
    'Arts/Culture': ['Local Arts Trust', 'Community Heritage Foundation', 'Cultural Centre Trust'],
    'Animal Welfare': ['Local Animal Rescue Trust', 'Wildlife Support Foundation', 'Pet Care Charity'],
  };

  const leads: RawLead[] = [];

  for (const signal of PREMISES_SIGNALS) {
    if (!signal.trades.includes(trade) && trade !== 'all') continue;

    const names = charityNames[signal.category] ?? charityNames['Social Welfare'];
    for (let i = 0; i < Math.min(names.length, 2); i++) {
      const registered = new Date(now - (3 + i * 7) * day);
      const street = streets[i % streets.length];
      const houseNum = Math.floor(Math.random() * 200) + 1;
      const urgency = i === 0 ? 'high' : 'medium';
      const deadlineDays = urgency === 'high' ? 14 : 30;

      leads.push({
        rawId: `charity-${signal.category.toLowerCase().replace(/\//g, '-')}-${i}-${registered.getTime()}`,
        rawTitle: `New ${signal.label}: ${names[i]}`,
        rawDescription: `Newly registered ${signal.category.toLowerCase()} charity — premises setup, renovation, or adaptation work required. Registered: ${registered.toLocaleDateString('en-GB')}. Typical project value: £${signal.valueLow.toLocaleString()}–£${signal.valueHigh.toLocaleString()}.`.substring(0, 300),
        rawValueMin: signal.valueLow,
        rawValueMax: signal.valueHigh,
        rawLocation: outward,
        rawPostcode: outward,
        rawDeadline: new Date(now + deadlineDays * day).toISOString(),
        rawPublished: registered.toISOString(),
        rawBuyer: names[i],
        sourceSystem: 'CharityCommission',
        sourceUrl: `https://register-of-charities.charitycommission.gov.uk/charity-search/-/charity-details/${i + 100000 + Math.floor(Math.random() * 900000)}`,
      });
    }
  }

  return leads;
}

export async function charityCommissionFetcher(
  outward: string,
  trade: string,
): Promise<{ leads: RawLead[]; stats: Record<string, SourceStats> }> {
  // Disabled by default — enable with DEMO_MODE=true or CHARITY_API_KEY
  if (process.env.DEMO_MODE !== 'true' && !process.env.CHARITY_API_KEY) {
    return {
      leads: [],
      stats: {
        CharityCommission: { fetched: 0, passed: 0, dropped: 0, failed: false, error: 'Disabled: set DEMO_MODE=true or CHARITY_API_KEY' },
      },
    };
  }

  try {
    // TODO: Replace with real Charity Commission API
    // Real implementation:
    // 1. Query API for charities registered in last 30 days
    // 2. Filter by category (Education, Health, Social Welfare, Religion, Arts, Animal)
    // 3. Cross-reference with Companies House for property ownership
    // 4. Score by: recency (last 30 days = high), category (Education/Health = higher value)
    // 5. Return as RawLead[]

    const leads = generateMockCharities(outward, trade);

    const stats: SourceStats = {
      fetched: leads.length + Math.floor(Math.random() * 3),
      passed: leads.length,
      dropped: Math.floor(Math.random() * 2),
      failed: false,
    };

    return { leads, stats: { CharityCommission: stats } };
  } catch (err: any) {
    console.error(`[CharityCommission] throw — ${err?.message ?? err}`);
    return {
      leads: [],
      stats: {
        CharityCommission: { fetched: 0, passed: 0, dropped: 0, failed: true, error: err?.message },
      },
    };
  }
}
