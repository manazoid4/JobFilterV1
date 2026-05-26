/**
 * Land Registry Price Paid Fetcher
 *
 * Endpoint: GET https://landregistry.data.gov.uk/data/ppi/transaction-record.json
 * No API key required. Fully open data.
 *
 * Signal: Recent property purchases signal likely renovation, fit-out, or improvement works.
 * New builds are excluded. Leaseholds (flats) are excluded unless low value.
 */

import type { RawLead, SourceStats } from '../types';
import { CONFIG } from '../config';

const LR_BASE_URL = 'https://landregistry.data.gov.uk/data/ppi/transaction-record.json';

// Property type URI suffix → readable label
const PROPERTY_TYPE_MAP: Record<string, string> = {
  D: 'Detached',
  S: 'Semi-Detached',
  T: 'Terraced',
  F: 'Flat',
  O: 'Other',
};

// Estate type URI suffix → readable label
const ESTATE_TYPE_MAP: Record<string, string> = {
  F: 'Freehold',
  L: 'Leasehold',
};

function extractUriSegment(uri: string | undefined): string {
  if (!uri) return '';
  return String(uri).split('/').pop() ?? '';
}

function estimateJobValue(pricePaid: number): number {
  if (pricePaid < 100_000) return 3_000;
  if (pricePaid < 250_000) return 8_000;
  if (pricePaid < 500_000) return 15_000;
  return 25_000;
}

function isTradeMatch(
  trade: string,
  propertyTypeCode: string,
  estateTypeCode: string,
  pricePaid: number,
  isNewBuild: boolean,
): boolean {
  if (isNewBuild) return false; // no renovation needed on new builds

  switch (trade) {
    case 'building':
    case 'carpentry':
    case 'painting':
      return true; // all recent purchases

    case 'plumbing':
    case 'hvac':
    case 'electrical':
      return true; // all except new builds (already filtered above)

    case 'roofing':
      return pricePaid < 300_000; // older stock more likely to need roofing

    case 'landscaping':
      return propertyTypeCode === 'D' || propertyTypeCode === 'S'; // detached/semi only

    default:
      return true;
  }
}

function daysAgo(dateStr: string): number {
  const then = new Date(dateStr).getTime();
  const now = Date.now();
  return Math.floor((now - then) / 86_400_000);
}

export async function landRegistryFetcher(
  outward: string,
  trade: string,
): Promise<{ leads: RawLead[]; stats: Record<string, SourceStats> }> {
  const url = `${LR_BASE_URL}?propertyAddress.postcode=${encodeURIComponent(outward)}&_pageSize=50&_sort=-transactionDate`;

  try {
    const r = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'JobFilter/2.0 (jobfilter.uk)',
      },
      signal: AbortSignal.timeout(CONFIG.fetchTimeoutMs),
    });

    if (!r.ok) {
      console.error(`[LandRegistry] HTTP ${r.status} — ${url}`);
      return {
        leads: [],
        stats: {
          LandRegistry: { fetched: 0, passed: 0, dropped: 0, failed: true, error: `HTTP ${r.status}` },
        },
      };
    }

    const data = await r.json() as any;
    const items: any[] = data?.result?.items ?? [];

    const leads: RawLead[] = [];

    for (const item of items) {
      const pricePaid: number = item.pricePaid ?? 0;
      const transactionDate: string = item.transactionDate ?? '';
      const propertyTypeUri: string = item.propertyType ?? '';
      const estateTypeUri: string = item.estateType ?? '';
      const isNewBuild: boolean = item.newBuild === true || item.newBuild === 'true';

      const propertyTypeCode = extractUriSegment(propertyTypeUri);
      const estateTypeCode = extractUriSegment(estateTypeUri);

      // Skip leasehold flats (low renovation signal) unless low value
      if (estateTypeCode === 'L' && propertyTypeCode === 'F' && pricePaid >= 200_000) {
        continue;
      }

      if (!isTradeMatch(trade, propertyTypeCode, estateTypeCode, pricePaid, isNewBuild)) {
        continue;
      }

      const addr = item.propertyAddress ?? {};
      const street = addr.street ?? '';
      const town = addr.town ?? addr.posttown ?? '';
      const postcode = addr.postcode ?? outward;
      const paon = addr.paon ?? '';
      const saon = addr.saon ?? '';

      const addressParts = [saon, paon, street].filter(Boolean).join(' ');
      const fullLocation = [addressParts, town, postcode].filter(Boolean).join(', ');

      const propertyType = PROPERTY_TYPE_MAP[propertyTypeCode] ?? 'Property';
      const estateType = ESTATE_TYPE_MAP[estateTypeCode] ?? '';
      const age = daysAgo(transactionDate);
      const jobValue = estimateJobValue(pricePaid);

      // Extract a usable transaction reference from the item URI or id
      const itemUri: string = item['@id'] ?? item.uri ?? '';
      const transactionRef = extractUriSegment(itemUri) || `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

      const lead: RawLead = {
        rawId: `lr-${transactionRef}`,
        rawTitle: `Recent Property Purchase — ${propertyType} in ${town || outward}`,
        rawDescription: `Property sold ${age} days ago for £${pricePaid.toLocaleString('en-GB')}. ${propertyType}${estateType ? ' ' + estateType : ''}. Recent purchase signals likely renovation, fit-out, or improvement works.`,
        rawValue: jobValue,
        rawLocation: fullLocation || `${town}, ${postcode}`,
        rawPostcode: postcode,
        rawPublished: transactionDate || new Date().toISOString(),
        rawBuyer: 'Private Purchaser',
        sourceSystem: 'LandRegistry',
        sourceUrl: `https://landregistry.data.gov.uk/data/ppi/transaction-record/${transactionRef}.json`,
      };

      leads.push(lead);
    }

    const stats: SourceStats = {
      fetched: items.length,
      passed: leads.length,
      dropped: items.length - leads.length,
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
