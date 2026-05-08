/**
 * Land Registry Fetcher
 *
 * Signal: UK Land Registry Price Paid Data — recent property sales by postcode area.
 * New owners = high likelihood of renovation, extension, refurbishment work.
 *
 * Real endpoint: https://publishing.prh.gov.uk/price-paid-data (CSV, open data)
 * Monthly updates with: address, price, date, property type, tenure, locality
 *
 * For now: mock data. Real API requires parsing large CSV files.
 * When ready: download monthly CSV, filter by outward postcode, score by price/property type.
 */

import type { RawLead, SourceStats } from '../types';

// Mock property sales data — realistic UK Land Registry records
function generateMockSales(outward: string, trade: string): RawLead[] {
  const now = Date.now();
  const day = 86_400_000;

  // Property types and their typical renovation value signals
  const propertyTypes = [
    { type: 'Detached', value: 450_000, renovationLikelihood: 0.85, trades: ['building', 'roofing', 'landscaping', 'electrical', 'plumbing', 'hvac', 'carpentry', 'painting'] },
    { type: 'Semi-Detached', value: 280_000, renovationLikelihood: 0.75, trades: ['building', 'electrical', 'plumbing', 'roofing', 'carpentry', 'painting'] },
    { type: 'Terraced', value: 195_000, renovationLikelihood: 0.65, trades: ['building', 'electrical', 'plumbing', 'carpentry', 'painting'] },
    { type: 'Flat', value: 150_000, renovationLikelihood: 0.45, trades: ['electrical', 'plumbing', 'carpentry', 'painting'] },
    { type: 'Bungalow', value: 220_000, renovationLikelihood: 0.7, trades: ['building', 'roofing', 'electrical', 'plumbing', 'landscaping'] },
  ];

  const streets = [
    'Victoria Road', 'High Street', 'Church Lane', 'Park Avenue', 'Station Road',
    'Manor Drive', 'Oak Tree Close', 'Mill Lane', 'The Green', 'Kingsway',
    'Elm Grove', 'Hillside', 'Station Approach', 'Broad Street', 'New Road',
  ];

  const tenures = ['Freehold', 'Leasehold'];
  const saleAges = [3, 7, 12, 18, 25, 31, 44, 52, 61]; // days ago

  // Generate 8-12 mock sales for this postcode area
  const count = 8 + Math.floor(Math.random() * 5);
  const sales: RawLead[] = [];

  for (let i = 0; i < count; i++) {
    const propType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const street = streets[Math.floor(Math.random() * streets.length)];
    const houseNum = Math.floor(Math.random() * 150) + 1;
    const tenure = tenures[Math.floor(Math.random() * tenures.length)];
    const daysAgo = saleAges[i % saleAges.length];
    const saleDate = new Date(now - daysAgo * day);

    // Price variation ±20%
    const priceVariation = 0.8 + Math.random() * 0.4;
    const salePrice = Math.round(propType.value * priceVariation / 1000) * 1000;

    // Estimate renovation value as % of sale price (new owners typically spend 5-15% on works)
    const renovationValue = Math.round(salePrice * (0.05 + Math.random() * 0.1) / 1000) * 1000;

    // Check if this property type is relevant to the user's trade
    const isRelevant = propType.trades.includes(trade);
    if (!isRelevant && Math.random() > 0.3) continue; // 70% drop irrelevant

    const tradeWork: Record<string, string> = {
      plumbing: 'bathroom refit, boiler upgrade, or full replumb likely',
      electrical: 'rewire, consumer unit upgrade, or EV charger install likely',
      roofing: 'roof survey, tile replacement, or gutter work likely',
      building: 'extension, loft conversion, or full refurbishment likely',
      carpentry: 'kitchen fitting, new doors, or bespoke joinery likely',
      painting: 'full redecoration or plaster refresh likely',
      hvac: 'heat pump install or new ventilation system likely',
      landscaping: 'garden redesign, patio, or driveway work likely',
    };

    sales.push({
      rawId: `lr-${outward.replace(/\s/g, '')}-${saleDate.getTime()}-${i}`,
      rawTitle: `Property Sold: ${propType.type} — ${street}`,
      rawDescription: `${propType.type} house sold for £${salePrice.toLocaleString()} on ${saleDate.toLocaleDateString('en-GB')} at ${houseNum} ${street}, ${outward}. ${tenure}. New owner — ${tradeWork[trade] || 'renovation work likely'}. Based on Land Registry Price Paid Data. Typical renovation spend: £${renovationValue.toLocaleString()}.`.substring(0, 300),
      rawValue: renovationValue,
      rawLocation: `${outward}`,
      rawPostcode: outward,
      rawPublished: saleDate.toISOString(),
      rawBuyer: 'New Owner (Land Registry)',
      sourceSystem: 'LandRegistry',
      sourceUrl: 'https://search-property-information.service.gov.uk/',
    });
  }

  return sales;
}

export async function landRegistryFetcher(
  outward: string,
  trade: string,
): Promise<{ leads: RawLead[]; stats: Record<string, SourceStats> }> {
  // Check if source is enabled
  if (!process.env.SOURCE_LR || process.env.SOURCE_LR === 'false') {
    // Default: enabled in dev, can be disabled via env
    if (process.env.NODE_ENV === 'production' && process.env.SOURCE_LR !== 'true') {
      return {
        leads: [],
        stats: {
          LandRegistry: { fetched: 0, passed: 0, dropped: 0, failed: false, error: 'Disabled: No credentials' },
        },
      };
    }
  }

  try {
    // TODO: Replace with real Land Registry CSV parsing
    // Real implementation:
    // 1. Download latest monthly CSV from https://publishing.prh.gov.uk/price-paid-data
    // 2. Filter rows where postcode starts with outward code
    // 3. Sort by date descending (most recent first)
    // 4. Score by: recency (last 30 days = high), price (higher = more renovation budget), property type
    // 5. Return as RawLead[]

    const leads = generateMockSales(outward, trade);

    const stats: SourceStats = {
      fetched: leads.length + Math.floor(Math.random() * 5), // mock "dropped" count
      passed: leads.length,
      dropped: Math.floor(Math.random() * 5),
      failed: false,
    };

    return { leads, stats: { LandRegistry: stats } };

  } catch (err: any) {
    console.error(`[LandRegistry] throw — ${err?.message ?? err}`);
    return {
      leads: [],
      stats: {
        LandRegistry: { fetched: 0, passed: 0, dropped: 0, failed: true, error: err?.message },
      },
    };
  }
}
