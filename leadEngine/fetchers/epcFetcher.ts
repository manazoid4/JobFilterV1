/**
 * EPC (Energy Performance Certificate) Fetcher
 *
 * Endpoint: GET https://epc.opendatacommunities.org/api/v1/domestic/search
 * Auth: Authorization: Basic {base64(email:api_key)}
 *
 * Signal: Homes with low ratings (F, G) or recently expired EPCs are high-value
 * prospects for insulation, heat pumps, and solar upgrades.
 */

import type { RawLead, SourceStats } from '../types.js';
import { CONFIG } from '../config.js';

const EPC_BASE_URL = 'https://epc.opendatacommunities.org/api/v1/domestic/search';

export async function epcFetcher(
  outward: string,
  trade: string,
): Promise<{ leads: RawLead[]; stats: Record<string, SourceStats> }> {
  // Check for API key
  const apiKey = process.env.EPC_API_KEY;
  const email = process.env.EPC_EMAIL;

  if (!apiKey || !email) {
    console.error('[EPC] Missing EPC_API_KEY or EPC_EMAIL env vars');
    return {
      leads: [],
      stats: {
        EPC: { fetched: 0, passed: 0, dropped: 0, failed: false, error: 'Disabled: No credentials' },
      },
    };
  }

  // Basic Auth header
  const auth = Buffer.from(`${email}:${apiKey}`).toString('base64');

  try {
    const url = `${EPC_BASE_URL}?postcode=${outward}&size=50`;
    const r = await fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${auth}`,
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
    const rows: any[] = data?.rows ?? [];

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
