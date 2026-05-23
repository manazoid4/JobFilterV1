/**
 * Contracts Finder + FTS fetcher
 *
 * Contracts Finder:
 *   Public OCDS endpoint (no auth required):
 *   GET https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search
 *   Params: publishedFrom, publishedTo, stages, limit, cursor
 *
 * FTS (Find a Tender Service):
 *   Official OCDS release packages endpoint:
 *   GET https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages
 *   Params: limit, cursor, updatedFrom, updatedTo, stages
 */

import type { RawLead, SourceStats } from '../types';
import { CONFIG } from '../config';

const PACKAGE_CACHE_TTL_MS = 5 * 60_000;
const packageCache = new Map<string, { expiresAt: number; payload: any }>();
const packageInflight = new Map<string, Promise<any>>();

// ── CPV prefix → trade mapping (post-fetch filter) ────────────────────────────
const CPV_TRADE_PREFIXES: Record<string, string[]> = {
  plumbing:    ['45330', '45331', '45332', '45333', '50720', '50730'],
  electrical:  ['45310', '45311', '45312', '45315', '45316', '50710', '50711'],
  roofing:     ['45260', '45261', '45262', '45263'],
  building:    ['45000', '45100', '45200', '45210', '45211', '45220', '45400', '45410', '45450'],
  carpentry:   ['45420', '45421', '45422', '45423'],
  painting:    ['45440', '45441', '45442'],
  hvac:        ['45331', '45332', '50720', '50730'],
  landscaping: ['77300', '77310', '77311', '77312', '77313', '77314'],
  all:         [],
};

// Title/description keyword filter when CPV unavailable
const TRADE_KEYWORDS: Record<string, RegExp> = {
  plumbing:    /plumb|boiler|sanit|hot water|drain|water.*supply/i,
  electrical:  /electric|rewire|wiring|lighting|ev.?charg|solar.?pv|power/i,
  roofing:     /roof|tile|flat.?roof|epdm|gutter|fascia/i,
  building:    /build|construct|refurb|renovat|extension|conversion|maintenance/i,
  carpentry:   /carpent|joine|floor|timber|door|window.?frame/i,
  painting:    /paint|decorat|plaster|render/i,
  hvac:        /hvac|ventilat|air.?con|heat.?pump|ashp|mechanical/i,
  landscaping: /landscap|grounds|garden|lawn|horticultur/i,
};

function matchesTrade(title: string, desc: string, cpvCodes: string[], trade: string): boolean {
  if (trade === 'all') return true;
  const prefixes = CPV_TRADE_PREFIXES[trade] ?? [];
  if (prefixes.length > 0 && cpvCodes.some(c => prefixes.some(p => c.startsWith(p)))) return true;
  const re = TRADE_KEYWORDS[trade];
  if (re && re.test(`${title} ${desc}`)) return true;
  return false;
}

async function fetchWithTimeout(url: string, opts: RequestInit = {}): Promise<Response> {
  let lastErr: unknown;
  for (let i = 0; i < CONFIG.retryAttempts; i++) {
    try {
      const r = await fetch(url, { ...opts, signal: AbortSignal.timeout(CONFIG.fetchTimeoutMs) });
      if (r.status === 429) {
        const retryAfter = Number(r.headers.get('Retry-After') ?? (i + 1) * 2);
        await new Promise(res => setTimeout(res, retryAfter * 1000));
        continue;
      }
      return r;
    } catch (e) {
      lastErr = e;
      if (i < CONFIG.retryAttempts - 1) await new Promise(res => setTimeout(res, 500 * (i + 1)));
    }
  }
  throw lastErr ?? new Error('fetch failed');
}

async function fetchJsonPackage(label: string, url: string): Promise<any> {
  const cached = packageCache.get(url);
  if (cached && cached.expiresAt > Date.now()) return cached.payload;

  const existing = packageInflight.get(url);
  if (existing) return existing;

  const request = (async () => {
    const r = await fetchWithTimeout(url, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'JobFilter/2.0 (jobfilter.uk)',
      },
    });

    if (!r.ok) {
      const body = await r.text().catch(() => '');
      throw new Error(`${label} HTTP ${r.status} — ${url} — ${body.substring(0, 200)}`);
    }

    const payload = await r.json() as any;
    packageCache.set(url, { expiresAt: Date.now() + PACKAGE_CACHE_TTL_MS, payload });
    return payload;
  })();

  packageInflight.set(url, request);
  try {
    return await request;
  } finally {
    packageInflight.delete(url);
  }
}

// ── Contracts Finder OCDS Search ─────────────────────────────────────────────
// Endpoint: GET https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search
// No authentication required for public OCDS endpoint.

const CF_OCDS_BASE = 'https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search';

async function fetchContractsFinder(trade: string): Promise<{ leads: RawLead[]; stats: SourceStats }> {
  const since = new Date(Date.now() - CONFIG.lookbackDays * 86_400_000)
    .toISOString()
    .replace('T', ' ')
    .substring(0, 19);

  const params = new URLSearchParams({
    publishedFrom: since,
    stages: 'tender',
    limit: '50',
  });

  const url = `${CF_OCDS_BASE}?${params}`;

  try {
    const pkg = await fetchJsonPackage('CF', url);
    // OCDS release package — releases array
    const releases: any[] = pkg?.releases ?? pkg?.data ?? [];

    const leads: RawLead[] = [];
    let dropped = 0;

    for (const rel of releases) {
      const tender = rel?.tender ?? {};
      const buyer = rel?.buyer ?? rel?.parties?.find((p: any) => p.roles?.includes('buyer')) ?? {};
      const items: any[] = tender?.items ?? [];

      const cpvCodes: string[] = items.flatMap((it: any) => [
        it?.classification?.id,
        ...(it?.additionalClassifications ?? []).map((c: any) => c?.id),
      ]).filter(Boolean).map(String);

      const title = String(tender?.title ?? '').trim();
      const desc = String(tender?.description ?? '').trim();

      if (!title || title.length < 4) { dropped++; continue; }
      if (!matchesTrade(title, desc, cpvCodes, trade)) { dropped++; continue; }

      const value = tender?.value?.amount ?? tender?.minValue?.amount ?? 0;
      const deliveryLocs: any[] = tender?.deliveryLocations ?? [];
      const location = deliveryLocs.map((l: any) => l?.description ?? l?.region ?? '').filter(Boolean).join(', ')
        || tender?.deliveryAddress?.region
        || buyer?.address?.region
        || '';

      leads.push({
        rawId: String(rel?.ocid ?? rel?.id ?? `cf-${Date.now()}-${leads.length}`),
        rawTitle: title,
        rawDescription: desc,
        rawValue: Number(value) || undefined,
        rawLocation: location,
        rawPostcode: String(tender?.deliveryAddress?.postalCode ?? buyer?.address?.postalCode ?? '').trim(),
        rawDeadline: String(tender?.tenderPeriod?.endDate ?? '').trim(),
        rawPublished: String(rel?.date ?? '').trim(),
        rawBuyer: String(buyer?.name ?? tender?.procuringEntity?.name ?? '').trim(),
        rawCpvCodes: cpvCodes,
        sourceSystem: 'ContractsFinder',
        sourceUrl: rel?.ocid
          ? `https://www.contractsfinder.service.gov.uk/Notice/OCDS/${rel.ocid}`
          : undefined,
      });
    }

    return {
      leads,
      stats: { fetched: releases.length, passed: leads.length, dropped, failed: false },
    };
  } catch (err: any) {
    return {
      leads: [],
      stats: {
        fetched: 0, passed: 0, dropped: 0,
        failed: true,
        error: `CF threw — ${url} — ${String(err?.message ?? err)}`,
      },
    };
  }
}

// ── FTS OCDS Release Packages ─────────────────────────────────────────────────
// Endpoint: GET https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages
// Params: limit (1–100), cursor, updatedFrom (YYYY-MM-DDTHH:MM:SS), updatedTo, stages
// No authentication required.

const FTS_BASE = 'https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages';

async function fetchFTS(trade: string): Promise<{ leads: RawLead[]; stats: SourceStats }> {
  const since = new Date(Date.now() - CONFIG.lookbackDays * 86_400_000)
    .toISOString()
    .substring(0, 19); // YYYY-MM-DDTHH:MM:SS

  const params = new URLSearchParams({
    updatedFrom: since,
    stages: 'tender',
    limit: '100',
  });

  const url = `${FTS_BASE}?${params}`;

  try {
    const pkg = await fetchJsonPackage('FTS', url);
    const releases: any[] = pkg?.releases ?? [];

    const leads: RawLead[] = [];
    let dropped = 0;

    for (const rel of releases) {
      const tender = rel?.tender ?? {};
      const buyer = rel?.buyer ?? rel?.parties?.find((p: any) => p.roles?.includes('buyer')) ?? {};
      const items: any[] = tender?.items ?? [];

      const cpvCodes: string[] = items.flatMap((it: any) => [
        it?.classification?.id,
        ...(it?.additionalClassifications ?? []).map((c: any) => c?.id),
      ]).filter(Boolean).map(String);

      const title = String(tender?.title ?? '').trim();
      const desc = String(tender?.description ?? '').trim();

      if (!title || title.length < 4) { dropped++; continue; }
      if (!matchesTrade(title, desc, cpvCodes, trade)) { dropped++; continue; }

      const value = tender?.value?.amount ?? tender?.minValue?.amount ?? 0;
      // FTS: tender.deliveryLocations absent — real path is items[].deliveryAddresses[].region
      const deliveryAddrs: any[] = items.flatMap((it: any) => it?.deliveryAddresses ?? []);
      const location = deliveryAddrs.map((a: any) => a?.region ?? a?.description ?? '').filter(Boolean).join(', ')
        || items[0]?.deliveryLocation?.description
        || buyer?.address?.region
        || '';

      leads.push({
        rawId: String(rel?.ocid ?? rel?.id ?? `fts-${Date.now()}-${leads.length}`),
        rawTitle: title,
        rawDescription: desc,
        rawValue: Number(value) || undefined,
        rawLocation: location,
        rawPostcode: String(buyer?.address?.postalCode ?? '').trim(),
        rawDeadline: String(tender?.tenderPeriod?.endDate ?? '').trim(),
        rawPublished: String(rel?.date ?? '').trim(),
        rawBuyer: String(buyer?.name ?? tender?.procuringEntity?.name ?? '').trim(),
        rawCpvCodes: cpvCodes,
        sourceSystem: 'FTS',
        sourceUrl: rel?.ocid
          ? `https://www.find-tender.service.gov.uk/Notice/${rel.ocid.split('-').pop()}`
          : undefined,
      });
    }

    return {
      leads,
      stats: { fetched: releases.length, passed: leads.length, dropped, failed: false },
    };
  } catch (err: any) {
    return {
      leads: [],
      stats: {
        fetched: 0, passed: 0, dropped: 0,
        failed: true,
        error: `FTS threw — ${url} — ${String(err?.message ?? err)}`,
      },
    };
  }
}

// ── Public entry point ────────────────────────────────────────────────────────

export async function contractsFetcher(
  trade: string
): Promise<{ leads: RawLead[]; stats: Record<string, SourceStats> }> {
  const [cfSettled, ftsSettled] = await Promise.allSettled([
    fetchContractsFinder(trade),
    fetchFTS(trade),
  ]);

  const cf = cfSettled.status === 'fulfilled'
    ? cfSettled.value
    : { leads: [], stats: { fetched: 0, passed: 0, dropped: 0, failed: true, error: 'ContractsFinder threw unexpectedly' } };

  const fts = ftsSettled.status === 'fulfilled'
    ? ftsSettled.value
    : { leads: [], stats: { fetched: 0, passed: 0, dropped: 0, failed: true, error: 'FTS threw unexpectedly' } };

  // Log endpoint + status to stderr (visible in server logs, not surfaced to user)
  console.error(`[CF]  ${CF_OCDS_BASE} → fetched=${cf.stats.fetched} passed=${cf.stats.passed} failed=${cf.stats.failed}${cf.stats.error ? ' ERR=' + cf.stats.error : ''}`);
  console.error(`[FTS] ${FTS_BASE} → fetched=${fts.stats.fetched} passed=${fts.stats.passed} failed=${fts.stats.failed}${fts.stats.error ? ' ERR=' + fts.stats.error : ''}`);

  return {
    leads: [...cf.leads, ...fts.leads],
    stats: { ContractsFinder: cf.stats, FTS: fts.stats },
  };
}
