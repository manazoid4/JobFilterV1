/**
 * Planning Data fetcher
 *
 * Endpoint: GET https://www.planning.data.gov.uk/entity.json
 * OpenAPI spec: https://www.planning.data.gov.uk/openapi.json
 *
 * Key params:
 *   dataset      — array, e.g. "planning-permission"
 *   q            — postcode or UPRN text search
 *   longitude    — decimal, used with latitude for geo search
 *   latitude     — decimal
 *   geometry_relation — "within" | "intersects" | "contains" (default "within")
 *   period       — "current" (active records only)
 *   limit        — max 500, default 10
 *   offset       — pagination
 *
 * Purpose: approved planning applications → intent signal for future trade work.
 * No auth required. Public API.
 */

import type { RawLead, SourceStats } from '../types.ts';
import { CONFIG } from '../config.ts';

const PLANNING_ENTITY_URL = 'https://www.planning.data.gov.uk/entity.json';

// Trade → keywords to filter planning descriptions (post-fetch)
const TRADE_KEYWORDS: Record<string, RegExp> = {
  plumbing:    /plumb|bathroom|kitchen|dwelling|house|extension|conversion/i,
  electrical:  /electric|solar|ev|dwelling|house|extension|commercial/i,
  roofing:     /roof|dormer|loft|reroofing|house|extension/i,
  building:    /extension|conversion|new.?build|house|develop|refurb|construction/i,
  carpentry:   /extension|house|conversion|dwelling|timber|joinery/i,
  painting:    /house|external|commercial|residential/i,
  hvac:        /commercial|office|house|extension|air|ventilat/i,
  landscaping: /garden|landscape|grounds|commercial|park|open.?space/i,
  all:         /.+/,
};

function estimateValue(description: string, trade: string): number {
  const d = description.toLowerCase();
  if (d.includes('loft') || d.includes('dormer'))          return 35_000;
  if (d.includes('extension') && d.includes('storey'))     return 40_000;
  if (d.includes('extension'))                             return 25_000;
  if (d.includes('new') && d.includes('dwell'))            return 200_000;
  if (d.includes('conversion'))                            return 50_000;
  if (d.includes('solar') || d.includes('ev'))             return 8_000;
  if (d.includes('commercial'))                            return 80_000;
  const defaults: Record<string, number> = {
    plumbing: 3_000, electrical: 4_000, roofing: 10_000,
    building: 30_000, carpentry: 5_000, painting: 4_000,
    hvac: 12_000, landscaping: 8_000, all: 15_000,
  };
  return defaults[trade] ?? 15_000;
}

export async function planningDataFetcher(
  outward: string,
  _region: string,
  trade: string,
  lat?: number,
  lon?: number,
): Promise<{ leads: RawLead[]; stats: Record<string, SourceStats> }> {

  // Build query — prefer geo lookup, fall back to postcode text search
  const attempts: URLSearchParams[] = [];

  if (lat && lon) {
    // Geo radius search — most accurate
    const geo = new URLSearchParams();
    geo.append('dataset', 'planning-permission');
    geo.append('latitude', String(lat));
    geo.append('longitude', String(lon));
    geo.set('geometry_relation', 'within');
    geo.set('period', 'current');
    geo.set('limit', '30');
    attempts.push(geo);
  }

  // Postcode outward code text search
  const byPostcode = new URLSearchParams();
  byPostcode.append('dataset', 'planning-permission');
  byPostcode.set('q', outward);
  byPostcode.set('period', 'current');
  byPostcode.set('limit', '30');
  attempts.push(byPostcode);

  // Broad current dataset fallback (no geo filter)
  const broad = new URLSearchParams();
  broad.append('dataset', 'planning-permission');
  broad.set('period', 'current');
  broad.set('limit', '20');
  attempts.push(broad);

  for (const params of attempts) {
    const url = `${PLANNING_ENTITY_URL}?${params}`;
    try {
      const r = await fetch(url, {
        headers: { Accept: 'application/json', 'User-Agent': 'JobFilter/2.0 (jobfilter.uk)' },
        signal: AbortSignal.timeout(CONFIG.fetchTimeoutMs),
      });

      if (!r.ok) {
        console.error(`[Planning] HTTP ${r.status} — ${url}`);
        continue;
      }

      const data = await r.json() as any;
      // API returns { entities: [...], count: n, ... }
      const entities: any[] = data?.entities ?? [];

      if (!entities.length) {
        console.error(`[Planning] 0 entities — ${url}`);
        continue;
      }

      const kw = TRADE_KEYWORDS[trade] ?? TRADE_KEYWORDS.all;

      const leads: RawLead[] = entities
        .filter((e: any) => {
          const text = `${e?.name ?? ''} ${e?.description ?? ''} ${e?.reference ?? ''}`;
          return kw.test(text);
        })
        .map((e: any, i: number) => {
          const desc = String(e?.description ?? e?.name ?? '').trim();
          const name  = String(e?.name ?? desc).substring(0, 80);
          return {
            rawId:         String(e?.entity ?? e?.reference ?? `planning-${Date.now()}-${i}`),
            rawTitle:      `Planning Approval: ${name || 'New Development'}`,
            rawDescription:`Approved planning application in ${outward} — potential ${trade} work. Ref: ${e?.reference ?? 'N/A'}. ${desc}`.substring(0, 300),
            rawValue:      estimateValue(desc, trade),
            rawLocation:   String(e?.address ?? e?.locality ?? outward).trim(),
            rawPostcode:   outward,
            rawDeadline:   '',
            rawPublished:  String(e?.entry_date ?? e?.start_date ?? new Date().toISOString()),
            rawBuyer:      String(e?.organisation ?? 'Local Authority').trim(),
            rawCpvCodes:   [],
            sourceSystem:  'PlanningData',
            sourceUrl:     e?.entity ? `https://www.planning.data.gov.uk/entity/${e.entity}` : undefined,
          } satisfies RawLead;
        });

      console.error(`[Planning] ${url} → entities=${entities.length} passed=${leads.length}`);

      const stats: SourceStats = {
        fetched: entities.length,
        passed:  leads.length,
        dropped: entities.length - leads.length,
        failed:  false,
      };
      return { leads, stats: { PlanningData: stats } };

    } catch (err: any) {
      console.error(`[Planning] threw — ${url} — ${err?.message ?? err}`);
      continue;
    }
  }

  // All attempts failed — return empty, do not throw
  console.error(`[Planning] all attempts failed for outward=${outward}`);
  return {
    leads: [],
    stats: {
      PlanningData: {
        fetched: 0, passed: 0, dropped: 0,
        failed: true,
        error: `No successful response for outward=${outward}`,
      },
    },
  };
}
