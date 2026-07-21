/**
 * Current UK procurement notices from Find a Tender (FTS).
 *
 * Contracts Finder is deliberately not queried here. New notices moved to FTS
 * in February 2025, so Contracts Finder is retained only as a documented legacy
 * and backfill source in the source registries.
 */

import type { RawLead, SourceStats } from '../types';
import { CONFIG } from '../config';

const FTS_BASE = 'https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages';
const FTS_MAX_PAGES = 5;
const PACKAGE_CACHE_TTL_MS = 5 * 60_000;
const packageCache = new Map<string, { expiresAt: number; payload: unknown }>();
const packageInflight = new Map<string, Promise<unknown>>();

type FetchLike = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

export interface FindATenderOptions {
  signal?: AbortSignal;
  maxPages?: number;
  now?: Date;
  fetchImpl?: FetchLike;
  useCache?: boolean;
}

const CPV_TRADE_PREFIXES: Record<string, string[]> = {
  plumbing: ['45330', '45331', '45332', '45333', '50720', '50730'],
  electrical: ['45310', '45311', '45312', '45315', '45316', '50710', '50711'],
  roofing: ['45260', '45261', '45262', '45263'],
  building: ['45000', '45100', '45200', '45210', '45211', '45220', '45400', '45410', '45450'],
  carpentry: ['45420', '45421', '45422', '45423'],
  painting: ['45440', '45441', '45442'],
  hvac: ['45331', '45332', '50720', '50730'],
  landscaping: ['77300', '77310', '77311', '77312', '77313', '77314'],
  all: [],
};

const TRADE_KEYWORDS: Record<string, RegExp> = {
  plumbing: /plumb|boiler|sanit|hot water|drain|water.*supply/i,
  electrical: /electric|rewire|wiring|lighting|ev.?charg|solar.?pv|power/i,
  roofing: /roof|tile|flat.?roof|epdm|gutter|fascia/i,
  building: /build|construct|refurb|renovat|extension|conversion|maintenance/i,
  carpentry: /carpent|joine|floor|timber|door|window.?frame/i,
  painting: /paint|decorat|plaster|render/i,
  hvac: /hvac|ventilat|air.?con|heat.?pump|ashp|mechanical/i,
  landscaping: /landscap|grounds|garden|lawn|horticultur/i,
};

function asArray<T>(value: T | T[] | null | undefined): T[] {
  if (Array.isArray(value)) return value;
  return value == null ? [] : [value];
}

function uniqueStrings(values: unknown[]): string[] {
  return [...new Set(values.map(value => String(value ?? '').trim()).filter(Boolean))];
}

function matchesTrade(title: string, description: string, cpvCodes: string[], trade: string): boolean {
  if (trade === 'all') return true;
  const prefixes = CPV_TRADE_PREFIXES[trade] ?? [];
  if (prefixes.some(prefix => cpvCodes.some(code => code.startsWith(prefix)))) return true;
  return Boolean(TRADE_KEYWORDS[trade]?.test(`${title} ${description}`));
}

function combineSignal(signal?: AbortSignal): AbortSignal {
  const timeoutSignal = AbortSignal.timeout(CONFIG.fetchTimeoutMs);
  return signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal;
}

async function fetchWithTimeout(
  url: string,
  fetchImpl: FetchLike,
  signal?: AbortSignal,
): Promise<Response> {
  let lastError: unknown;
  const attempts = Math.max(1, CONFIG.retryAttempts);

  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const requestSignal = combineSignal(signal);
      requestSignal.throwIfAborted();
      const response = await fetchImpl(url, {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'JobFilter/2.0 (jobfilter.uk)',
        },
        signal: requestSignal,
      });

      if (response.status !== 429 || attempt === attempts - 1) return response;
      const retryAfterSeconds = Math.min(5, Math.max(0, Number(response.headers.get('Retry-After') ?? 1)));
      await new Promise(resolve => setTimeout(resolve, retryAfterSeconds * 1000));
    } catch (error) {
      lastError = error;
      if (signal?.aborted || attempt === attempts - 1) throw error;
    }
  }

  throw lastError ?? new Error('FTS fetch failed');
}

async function fetchJsonPackage(
  url: string,
  fetchImpl: FetchLike,
  signal: AbortSignal | undefined,
  useCache: boolean,
): Promise<any> {
  if (useCache) {
    const cached = packageCache.get(url);
    if (cached && cached.expiresAt > Date.now()) return cached.payload;
    const existing = packageInflight.get(url);
    if (existing) return existing;
  }

  const request = (async () => {
    const response = await fetchWithTimeout(url, fetchImpl, signal);
    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(`FTS HTTP ${response.status} — ${body.substring(0, 200)}`);
    }
    const payload = await response.json();
    if (useCache) packageCache.set(url, { expiresAt: Date.now() + PACKAGE_CACHE_TTL_MS, payload });
    return payload;
  })();

  if (useCache) packageInflight.set(url, request);
  try {
    return await request;
  } finally {
    if (useCache) packageInflight.delete(url);
  }
}

function officialNextUrl(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value.trim()) return undefined;
  try {
    const url = new URL(value, FTS_BASE);
    const base = new URL(FTS_BASE);
    if (url.origin !== base.origin || url.pathname !== base.pathname) return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

function classificationIds(container: any): unknown[] {
  return [
    container?.classification?.id,
    ...asArray(container?.additionalClassifications).map((classification: any) => classification?.id),
  ];
}

function locationLabel(address: any): string {
  return uniqueStrings([
    address?.description,
    address?.streetAddress,
    address?.locality,
    address?.region,
    address?.postalCode,
    address?.countryName,
  ]).join(', ');
}

/** Map one realistic FTS OCDS release into the shared raw-lead contract. */
export function mapFindATenderRelease(release: any, trade: string): RawLead | null {
  if (!release || typeof release !== 'object' || !release.tender || typeof release.tender !== 'object') return null;

  const tender = release.tender;
  const status = String(tender.status ?? '').toLowerCase();
  if (['cancelled', 'complete', 'withdrawn', 'unsuccessful'].includes(status)) return null;

  const title = String(tender.title ?? '').trim();
  const description = String(tender.description ?? '').trim();
  if (title.length < 4) return null;

  const items = asArray<any>(tender.items);
  const lots = asArray<any>(tender.lots);
  const cpvCodes = uniqueStrings([
    ...classificationIds(tender),
    ...items.flatMap(classificationIds),
    ...lots.flatMap(classificationIds),
  ]);
  if (!matchesTrade(title, description, cpvCodes, trade)) return null;

  const parties = asArray<any>(release.parties);
  const buyerReference = release.buyer ?? tender.procuringEntity ?? {};
  const buyerParty = parties.find(party => party?.id && party.id === buyerReference?.id)
    ?? parties.find(party => asArray<string>(party?.roles).includes('buyer'))
    ?? {};
  const buyerAddress = buyerParty.address ?? buyerReference.address ?? {};
  const buyerContact = buyerParty.contactPoint ?? buyerReference.contactPoint ?? {};

  const deliveryAddresses = items.flatMap(item => [
    ...asArray<any>(item?.deliveryAddresses),
    ...asArray<any>(item?.deliveryAddress),
    ...asArray<any>(item?.deliveryLocation),
  ]);
  const tenderLocations = [
    ...asArray<any>(tender.deliveryAddresses),
    ...asArray<any>(tender.deliveryAddress),
    ...asArray<any>(tender.deliveryLocations),
    ...asArray<any>(tender.deliveryLocation),
  ];
  const locations = [...deliveryAddresses, ...tenderLocations];
  const location = uniqueStrings(locations.map(locationLabel)).join('; ') || locationLabel(buyerAddress);
  const deliveryPostcode = locations.map(address => String(address?.postalCode ?? '').trim()).find(Boolean);

  const amount = Number(tender?.value?.amount);
  const minAmount = Number(tender?.minValue?.amount);
  const maxAmount = Number(tender?.maxValue?.amount);
  const links = asArray<any>(release.links);
  const submissionUrl = String(tender?.submissionMethodDetails ?? '').match(/https?:\/\/\S+/)?.[0];
  const sourceUrl = links.find(link => ['canonical', 'tender'].includes(String(link?.rel ?? '').toLowerCase()))?.href
    ?? submissionUrl
    ?? (release.id ? `https://www.find-tender.service.gov.uk/Notice/${encodeURIComponent(String(release.id))}` : undefined);

  return {
    rawId: String(release.ocid ?? release.id),
    rawTitle: title,
    rawDescription: description,
    rawValue: Number.isFinite(amount) && amount > 0 ? amount : undefined,
    rawValueMin: Number.isFinite(minAmount) && minAmount > 0 ? minAmount : undefined,
    rawValueMax: Number.isFinite(maxAmount) && maxAmount > 0 ? maxAmount : undefined,
    rawLocation: location,
    rawPostcode: deliveryPostcode || String(buyerAddress?.postalCode ?? '').trim(),
    rawDeadline: String(tender?.tenderPeriod?.endDate ?? '').trim(),
    rawPublished: String(release.date ?? '').trim(),
    rawBuyer: String(buyerParty?.name ?? buyerReference?.name ?? tender?.procuringEntity?.name ?? '').trim(),
    rawCpvCodes: cpvCodes,
    rawContact: {
      name: String(buyerContact?.name ?? '').trim() || undefined,
      phone: String(buyerContact?.telephone ?? buyerContact?.phone ?? '').trim() || undefined,
      email: String(buyerContact?.email ?? '').trim() || undefined,
    },
    rawStage: asArray<string>(release.tag).includes('tender') ? 'tender' : (status || undefined),
    sourceSystem: 'FTS',
    sourceUrl: typeof sourceUrl === 'string' ? sourceUrl : undefined,
  };
}

/** Fetch bounded FTS pages, following the API-provided next URL verbatim. */
export async function fetchFindATender(
  trade: string,
  options: FindATenderOptions = {},
): Promise<{ leads: RawLead[]; stats: SourceStats }> {
  const now = options.now ?? new Date();
  const maxPages = Math.min(FTS_MAX_PAGES, Math.max(1, options.maxPages ?? FTS_MAX_PAGES));
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  const useCache = options.useCache ?? options.fetchImpl == null;
  const since = new Date(now.getTime() - CONFIG.lookbackDays * 86_400_000).toISOString().substring(0, 19);
  const params = new URLSearchParams({ updatedFrom: since, stages: 'tender', limit: '100' });

  let nextUrl: string | undefined = `${FTS_BASE}?${params}`;
  const visitedUrls = new Set<string>();
  const seenReleaseIds = new Set<string>();
  const leads: RawLead[] = [];
  let fetched = 0;
  let dropped = 0;

  try {
    for (let page = 0; page < maxPages && nextUrl; page++) {
      if (visitedUrls.has(nextUrl)) break;
      visitedUrls.add(nextUrl);

      const pkg = await fetchJsonPackage(nextUrl, fetchImpl, options.signal, useCache);
      const releases = Array.isArray(pkg?.releases) ? pkg.releases : [];
      fetched += releases.length;

      for (const release of releases) {
        const releaseId = String(release?.ocid ?? release?.id ?? '').trim();
        if (!releaseId || seenReleaseIds.has(releaseId)) {
          dropped++;
          continue;
        }
        seenReleaseIds.add(releaseId);
        const mapped = mapFindATenderRelease(release, trade);
        if (mapped) leads.push(mapped);
        else dropped++;
      }

      nextUrl = officialNextUrl(pkg?.links?.next);
    }

    return { leads, stats: { fetched, passed: leads.length, dropped, failed: false } };
  } catch (error: any) {
    return {
      leads,
      stats: {
        fetched,
        passed: leads.length,
        dropped,
        failed: true,
        error: String(error?.message ?? error),
      },
    };
  }
}

export async function contractsFetcher(
  trade: string,
  options: FindATenderOptions = {},
): Promise<{ leads: RawLead[]; stats: Record<string, SourceStats> }> {
  const result = await fetchFindATender(trade, options);
  console.error(`[FTS] ${FTS_BASE} → fetched=${result.stats.fetched} passed=${result.stats.passed} failed=${result.stats.failed}${result.stats.error ? ` ERR=${result.stats.error}` : ''}`);
  return { leads: result.leads, stats: { FTS: result.stats } };
}
