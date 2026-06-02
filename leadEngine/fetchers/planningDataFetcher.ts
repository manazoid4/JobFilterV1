/**
 * Planning Data fetcher
 *
 * Endpoint: GET https://www.planning.data.gov.uk/entity.json
 * OpenAPI spec: https://www.planning.data.gov.uk/openapi.json
 *
 * Key params:
 *   dataset      — array, e.g. "planning-application"
 *   q            — postcode or UPRN text search
 *   longitude    — decimal, used with latitude for geo search
 *   latitude     — decimal
 *   geometry_relation — "within" | "intersects" | "contains" (default "within")
 *   period       — "current" (active records only)
 *   limit        — max 500, default 10
 *   offset       — pagination
 *
 * Purpose: planning applications → intent signal for future trade work.
 * No auth required. Public API.
 */

import type { RawLead, SourceStats } from '../types';
import { CONFIG } from '../config';

const PLANNING_ENTITY_URL = 'https://www.planning.data.gov.uk/entity.json';
// Dataset: 'planning-application' is the correct live dataset on planning.data.gov.uk
const PLANNING_DATASET = 'planning-application';

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

function extractUkPostcode(text: string): string {
  const m = text.match(/\b([A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2})\b/i);
  return m ? m[1].toUpperCase().replace(/\s+/, ' ') : '';
}

// Only use outward as a fallback if the address text actually contains that outward code as a word.
// Avoids stamping records that mention the code in a reference number or unrelated context.
function addressConfirmsOutward(address: string, outward: string): boolean {
  if (!address || !outward) return false;
  const escaped = outward.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escaped}\\b`, 'i').test(address);
}

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
    // Point search — returns entities near this lat/lon
    const geo = new URLSearchParams();
    geo.append('dataset', PLANNING_DATASET);
    geo.append('latitude', String(lat));
    geo.append('longitude', String(lon));
    geo.set('period', 'current');
    geo.set('limit', '30');
    attempts.push(geo);
  }

  // Postcode outward code text search
  const byPostcode = new URLSearchParams();
  byPostcode.append('dataset', PLANNING_DATASET);
  byPostcode.set('q', outward);
  byPostcode.set('period', 'current');
  byPostcode.set('limit', '30');
  attempts.push(byPostcode);

  for (let attemptIdx = 0; attemptIdx < attempts.length; attemptIdx++) {
    const params = attempts[attemptIdx];
    // First attempt is geo (lat/lon) when available — geo results are inherently local.
    // Text search (?q=outward) can match unrelated records that mention the outward in
    // a reference number, so we must require address-level confirmation for those.
    const isGeoLookup = !!(lat && lon) && attemptIdx === 0;
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

      const mapped: Array<RawLead | null> = entities
        .filter((e: any) => {
          const text = `${e?.name ?? ''} ${e?.description ?? ''} ${e?.reference ?? ''}`;
          return kw.test(text);
        })
        .map((e: any, i: number): RawLead | null => {
          // planning.data.gov.uk can nest data under json_data or use top-level fields
          const jsonData = e?.json_data ?? e?.data ?? {};
          const desc = String(
            e?.description ?? jsonData?.description ?? jsonData?.development_description ??
            jsonData?.proposal ?? e?.name ?? ''
          ).trim();
          const name = String(e?.name ?? jsonData?.site_name ?? desc).substring(0, 80);
          const address = String(
            e?.address ?? jsonData?.site_address ?? jsonData?.address ?? e?.locality ?? ''
          ).trim();
          const addressPostcode = extractUkPostcode(address);
          const addressMentionsOutward = addressConfirmsOutward(address, outward);
          // Locality: for geo lookups, trust the lat/lon proximity.
          // For text search (?q=outward), only accept records whose extracted postcode
          // starts with the target outward code, OR whose address text explicitly
          // contains the outward code as a word-boundary match.
          // A record with a postcode from a different district is NOT local.
          const postcodeMatchesOutward = !!addressPostcode &&
            addressPostcode.toUpperCase().startsWith(outward.toUpperCase());
          const isLocal = isGeoLookup || postcodeMatchesOutward || addressMentionsOutward;
          if (!isLocal) return null;
          const locationLabel = address.length > 3 ? address.substring(0, 60) : outward;
          return {
            rawId:         String(e?.entity ?? e?.reference ?? `planning-${Date.now()}-${i}`),
            rawTitle:      `Planning Approval: ${name || 'New Development'}`,
            rawDescription:`Planning application in ${locationLabel} — potential ${trade} work. Ref: ${e?.reference ?? 'N/A'}. ${desc || 'Development works approved.'}`.substring(0, 300),
            rawValue:      estimateValue(desc || name, trade),
            // Only stamp rawLocation with outward when geo-confirmed local; otherwise keep address only.
            rawLocation:   address || (isGeoLookup ? outward : ''),
            rawPostcode:   addressPostcode || (isGeoLookup ? outward : ''),
            rawDeadline:   new Date(Date.now() + 30 * 86_400_000).toISOString(),
            rawPublished:  String(e?.['entry-date'] ?? e?.['start-date'] ?? e?.entry_date ?? e?.start_date ?? new Date().toISOString()),
            rawBuyer:      String(e?.organisation ?? e?.['organisation-entity'] ?? jsonData?.applicant_name ?? 'Local Authority').trim(),
            rawCpvCodes:   [],
            sourceSystem:  'PlanningData',
            sourceUrl:     e?.entity ? `https://www.planning.data.gov.uk/entity/${e.entity}` : undefined,
          };
        });
      const leads: RawLead[] = mapped.filter((l): l is RawLead => l !== null);

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
