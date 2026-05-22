/**
 * Public Contracts Scotland (PCS) + Sell2Wales (S2W) fetcher
 *
 * PCS exposes official OCDS releases through its API host.
 * Sell2Wales endpoint remains disabled by default until a live official route is confirmed.
 *
 * PCS:  https://api.publiccontractsscotland.gov.uk/v1/Notices
 * S2W:  https://www.sell2wales.gov.wales/search/api/OCDS/v1/Releases
 *
 * No authentication required.
 */

import type { RawLead, SourceStats } from '../types';
import { CONFIG } from '../config';

const PCS_BASE = 'https://api.publiccontractsscotland.gov.uk/v1/Notices';
const S2W_BASE = 'https://www.sell2wales.gov.wales/search/api/OCDS/v1/Releases';
let systemCaEnabled = false;
const PCS_CACHE_TTL_MS = 10 * 60_000;
const pcsReleaseCache = new Map<string, { expiresAt: number; releases: any[] }>();
const pcsInflight = new Map<string, Promise<any[]>>();

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

function isNodeCertificateChainError(err: unknown): boolean {
  const code = (err as any)?.cause?.code ?? (err as any)?.code;
  return code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' || code === 'SELF_SIGNED_CERT_IN_CHAIN';
}

async function enableSystemCaForNode(): Promise<boolean> {
  if (systemCaEnabled) return true;

  try {
    const tls = await import('node:tls');
    const getCACertificates = (tls as any).getCACertificates;
    const setDefaultCACertificates = (tls as any).setDefaultCACertificates;
    if (typeof getCACertificates !== 'function' || typeof setDefaultCACertificates !== 'function') {
      return false;
    }

    setDefaultCACertificates(getCACertificates('system'));
    systemCaEnabled = true;
    return true;
  } catch {
    return false;
  }
}

async function fetchWithTimeout(
  url: string,
  opts: RequestInit = {},
  options: { retryWithSystemCa?: boolean; timeoutMs?: number } = {}
): Promise<Response> {
  const timeoutMs = options.timeoutMs ?? CONFIG.fetchTimeoutMs;
  let lastErr: unknown;
  for (let i = 0; i < CONFIG.retryAttempts; i++) {
    try {
      const r = await fetch(url, { ...opts, signal: AbortSignal.timeout(timeoutMs) });
      if (r.status === 429) {
        const retryAfter = Number(r.headers.get('Retry-After') ?? (i + 1) * 2);
        await new Promise(res => setTimeout(res, retryAfter * 1000));
        continue;
      }
      return r;
    } catch (e) {
      lastErr = e;
      if (options.retryWithSystemCa && isNodeCertificateChainError(e) && await enableSystemCaForNode()) {
        try {
          return await fetch(url, { ...opts, signal: AbortSignal.timeout(timeoutMs) });
        } catch (retryErr) {
          lastErr = retryErr;
        }
      }
      if (i < CONFIG.retryAttempts - 1) await new Promise(res => setTimeout(res, 500 * (i + 1)));
    }
  }
  throw lastErr ?? new Error('fetch failed');
}

function parseOcdsReleases(releases: any[], trade: string, system: string): { leads: RawLead[]; dropped: number } {
  const leads: RawLead[] = [];
  let dropped = 0;

  for (const rel of releases) {
    const tender = rel?.tender ?? {};
    const buyer = rel?.buyer ?? rel?.parties?.find((p: any) => p.roles?.includes('buyer')) ?? {};
    const items: any[] = tender?.items ?? [];

    const cpvCodes: string[] = [
      tender?.classification?.id,
      ...items.flatMap((it: any) => [
      it?.classification?.id,
      ...(it?.additionalClassifications ?? []).map((c: any) => c?.id),
      ]),
    ].filter(Boolean).map(String);

    const title = String(tender?.title ?? '').trim();
    const desc = String(tender?.description ?? '').trim();

    if (!title || title.length < 4) { dropped++; continue; }
    if (!matchesTrade(title, desc, cpvCodes, trade)) { dropped++; continue; }

    const value = tender?.value?.amount ?? tender?.minValue?.amount ?? 0;
    const deliveryLocs: any[] = tender?.deliveryLocations ?? [];
    const deliveryAddrs: any[] = items.flatMap((it: any) => it?.deliveryAddresses ?? []);
    const location = deliveryLocs.map((l: any) => l?.description ?? l?.region ?? '').filter(Boolean).join(', ')
      || deliveryAddrs.map((a: any) => a?.region ?? a?.description ?? '').filter(Boolean).join(', ')
      || items[0]?.deliveryLocation?.description
      || tender?.deliveryAddress?.region
      || buyer?.address?.region
      || buyer?.address?.locality
      || '';

    const noticeId = String(rel?.ocid ?? rel?.id ?? '');
    const idSuffix = noticeId.split('-').pop();
    const documents: any[] = tender?.documents ?? [];
    const documentUrl = documents.find((d: any) => d?.documentType === 'contractNotice' && d?.url)?.url
      ?? documents.find((d: any) => d?.url)?.url;
    const canonicalUrl = (rel?.links ?? []).find((l: any) => l?.rel === 'canonical' && l?.href)?.href;
    const sourceUrl = documentUrl
      || (noticeId
        ? system === 'PCS'
          ? `https://www.publiccontractsscotland.gov.uk/search/show/search_view.aspx?ID=${idSuffix}`
          : `https://www.sell2wales.gov.wales/search/show/search_view.aspx?ID=${idSuffix}`
        : canonicalUrl);

    leads.push({
      rawId: noticeId || `${system.toLowerCase()}-${Date.now()}-${leads.length}`,
      rawTitle: title,
      rawDescription: desc,
      rawValue: Number(value) || undefined,
      rawLocation: location,
      rawPostcode: String(tender?.deliveryAddress?.postalCode ?? buyer?.address?.postalCode ?? '').trim(),
      rawDeadline: String(tender?.tenderPeriod?.endDate ?? '').trim(),
      rawPublished: String(rel?.date ?? rel?.publishedDate ?? '').trim(),
      rawBuyer: String(buyer?.name ?? tender?.procuringEntity?.name ?? '').trim(),
      rawCpvCodes: cpvCodes,
      sourceSystem: system,
      sourceUrl,
    });
  }

  return { leads, dropped };
}

function pcsDateFromMonths(): string[] {
  const months: string[] = [];
  const start = new Date(Date.now() - CONFIG.lookbackDays * 86_400_000);
  start.setUTCDate(1);
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date();
  end.setUTCDate(1);
  end.setUTCHours(0, 0, 0, 0);

  for (const cursor = new Date(start); cursor <= end; cursor.setUTCMonth(cursor.getUTCMonth() + 1)) {
    const month = String(cursor.getUTCMonth() + 1).padStart(2, '0');
    months.push(`${month}-${cursor.getUTCFullYear()}`);
  }

  return months;
}

async function fetchPublicContractsScotland(trade: string): Promise<{ leads: RawLead[]; stats: SourceStats }> {
  const urls = pcsDateFromMonths().map(dateFrom => {
    const params = new URLSearchParams({
      dateFrom,
      noticeType: '2',
      outputType: '0',
    });
    return `${PCS_BASE}?${params}`;
  });

  const results = await Promise.allSettled(urls.map(async url => {
    const releases = await fetchPcsReleases(url);
    const parsed = parseOcdsReleases(releases, trade, 'PCS');
    console.error(`[PCS] ${url} → fetched=${releases.length} passed=${parsed.leads.length} dropped=${parsed.dropped}`);
    return { url, releases: releases.length, ...parsed };
  }));

  const leads: RawLead[] = [];
  let fetched = 0;
  let dropped = 0;
  const errors: string[] = [];

  for (const result of results) {
    if (result.status === 'fulfilled') {
      leads.push(...result.value.leads);
      fetched += result.value.releases;
      dropped += result.value.dropped;
    } else {
      errors.push(String(result.reason?.message ?? result.reason));
    }
  }

  return {
    leads,
    stats: {
      fetched,
      passed: leads.length,
      dropped,
      failed: errors.length > 0,
      error: errors.length ? `PCS month fetch failed: ${errors.join(' | ')}` : undefined,
    },
  };
}

async function fetchPcsReleases(url: string): Promise<any[]> {
  const cached = pcsReleaseCache.get(url);
  if (cached && cached.expiresAt > Date.now()) return cached.releases;

  const existing = pcsInflight.get(url);
  if (existing) return existing;

  const request = (async () => {
    const r = await fetchWithTimeout(url, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'JobFilter/2.0 (jobfilter.uk)',
      },
    }, { retryWithSystemCa: true, timeoutMs: Math.max(CONFIG.fetchTimeoutMs, 25_000) });

    if (!r.ok) {
      const body = await r.text().catch(() => '');
      throw new Error(`HTTP ${r.status} — ${body.substring(0, 200)}`);
    }

    const pkg = await r.json() as any;
    const releases: any[] = pkg?.releases ?? [];
    pcsReleaseCache.set(url, { expiresAt: Date.now() + PCS_CACHE_TTL_MS, releases });
    return releases;
  })();

  pcsInflight.set(url, request);
  try {
    return await request;
  } finally {
    pcsInflight.delete(url);
  }
}

async function fetchOcdsSource(
  name: string,
  baseUrl: string,
  trade: string
): Promise<{ leads: RawLead[]; stats: SourceStats }> {
  const since = new Date(Date.now() - CONFIG.lookbackDays * 86_400_000)
    .toISOString()
    .replace('T', ' ')
    .substring(0, 19);

  const params = new URLSearchParams({
    publishedFrom: since,
    stages: 'tender',
    limit: '50',
  });

  const url = `${baseUrl}?${params}`;

  try {
    const r = await fetchWithTimeout(url, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'JobFilter/2.0 (jobfilter.uk)',
      },
    });

    if (!r.ok) {
      const body = await r.text().catch(() => '');
      return {
        leads: [],
        stats: {
          fetched: 0, passed: 0, dropped: 0,
          failed: true,
          error: `${name} HTTP ${r.status} — ${body.substring(0, 200)}`,
        },
      };
    }

    const pkg = await r.json() as any;
    const releases: any[] = pkg?.releases ?? pkg?.data ?? [];
    const { leads, dropped } = parseOcdsReleases(releases, trade, name);

    console.error(`[${name}] ${url} → fetched=${releases.length} passed=${leads.length} dropped=${dropped}`);

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
        error: `${name} threw — ${String(err?.message ?? err)}`,
      },
    };
  }
}

export async function pcsS2wFetcher(
  trade: string
): Promise<{ leads: RawLead[]; stats: Record<string, SourceStats> }> {
  const [pcsSettled, s2wSettled] = await Promise.allSettled([
    CONFIG.sources.publicContractsScotland
      ? fetchPublicContractsScotland(trade)
      : Promise.resolve({ leads: [], stats: { fetched: 0, passed: 0, dropped: 0, failed: false } }),
    CONFIG.sources.sell2wales
      ? fetchOcdsSource('Sell2Wales', S2W_BASE, trade)
      : Promise.resolve({ leads: [], stats: { fetched: 0, passed: 0, dropped: 0, failed: false } }),
  ]);

  const pcs = pcsSettled.status === 'fulfilled'
    ? pcsSettled.value
    : { leads: [], stats: { fetched: 0, passed: 0, dropped: 0, failed: true, error: 'PCS threw unexpectedly' } };

  const s2w = s2wSettled.status === 'fulfilled'
    ? s2wSettled.value
    : { leads: [], stats: { fetched: 0, passed: 0, dropped: 0, failed: true, error: 'Sell2Wales threw unexpectedly' } };

  return {
    leads: [...pcs.leads, ...s2w.leads],
    stats: { PCS: pcs.stats, Sell2Wales: s2w.stats },
  };
}
