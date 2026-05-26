/**
 * EPC (Energy Performance Certificate) Fetcher
 *
 * Endpoint: GET https://get-energy-performance-data.communities.gov.uk/api/v1/domestic/search
 * Auth: Authorization: Bearer {token}
 *
 * Signal: Homes with low ratings (F, G) or recently expired EPCs are high-value
 * prospects for insulation, heat pumps, and solar upgrades.
 */

import type { RawLead, SourceStats } from '../types';
import { CONFIG } from '../config';

const EPC_BASE_URL = 'https://get-energy-performance-data.communities.gov.uk/api/v1/domestic/search';

export async function epcFetcher(
  outward: string,
  trade: string,
): Promise<{ leads: RawLead[]; stats: Record<string, SourceStats> }> {
  const bearerToken = process.env.EPC_BEARER_TOKEN;
  if (!bearerToken) {
    return {
      leads: [],
      stats: { EPC: { fetched: 0, passed: 0, dropped: 0, failed: false, error: 'Disabled: No EPC_BEARER_TOKEN' } },
    };
  }

  try {
    const url = `${EPC_BASE_URL}?postcode=${outward}&size=50`;
    const r = await fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${bearerToken}`,
        'User-Agent': 'JobFilter/2.0 (jobfilter.uk)',
      },
      signal: AbortSignal.timeout(CONFIG.fetchTimeoutMs),
    });

    if (!r.ok) {
      console.error(`[EPC] HTTP ${r.status} — ${url}`);
      return {
        leads: [],
        stats: {
          EPC: { fetched: 0, passed: 0, dropped: 0, failed: true, error: `HTTP ${r.status}` },
        },
      };
    }

    const data = await r.json() as any;
    const rows: any[] = data?.rows ?? data?.data ?? data?.results ?? [];

    // Filter by trade relevance
    // Electrical -> Heat Pumps, Solar
    // Plumbing -> Boilers, Insulation (indirectly)
    // Building -> Insulation
    const leads: RawLead[] = rows
      .filter((row: any) => {
        const rating = String(row['current-energy-rating'] || '').toUpperCase();
        // Focus on poor ratings or potential upgrades
        if (trade === 'electrical' && rating > 'C') return true;
        if (trade === 'plumbing' && rating > 'D') return true;
        if (trade === 'building') return true; // All building ops
        return rating > 'D'; // Default: target poor efficiency
      })
      .map((row: any, i: number) => {
        const addr = [row['address1'], row['address2'], row.postcode].filter(Boolean).join(', ');
        const rating = row['current-energy-rating'];
        const potential = row['potential-energy-rating'];

        return {
          rawId: row['lmk-key'] || `epc-${Date.now()}-${i}`,
          rawTitle: `Efficiency Upgrade: Rating ${rating}`,
          rawDescription: `Property in ${row.postcode} has energy rating ${rating} (Potential ${potential}). High likelihood of upgrade requirement for ${trade} works.`,
          rawValue: 2500, // Typical small upgrade value
          rawLocation: addr,
          rawPostcode: row.postcode,
          rawPublished: row['inspection-date'] || new Date().toISOString(),
          rawBuyer: 'Residential Property',
          sourceSystem: 'EPC',
          sourceUrl: `https://find-energy-certificate.service.gov.uk/energy-certificate/${row['certificate-number']}`,
        } satisfies RawLead;
      });

    const stats: SourceStats = {
      fetched: rows.length,
      passed: leads.length,
      dropped: rows.length - leads.length,
      failed: false,
    };

    return { leads, stats: { EPC: stats } };

  } catch (err: any) {
    console.error(`[EPC] throw — ${err?.message ?? err}`);
    return {
      leads: [],
      stats: {
        EPC: { fetched: 0, passed: 0, dropped: 0, failed: true, error: err?.message },
      },
    };
  }
}
