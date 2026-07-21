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
  building: ['45'],
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
  // CPV is the authoritative classification. Text is only a fallback for
  // notices where the buyer supplied no CPV at tender, item, or lot level.
  if (cpvCodes.length > 0) {
    return prefixes.some(prefix => cpvCodes.some(code => code.startsWith(prefix)));
  }
  return Boolean(TRADE_KEYWORDS[trade]?.test(`${title} ${description}`));
}

function combineSignal(signal?: AbortSignal): AbortSignal {
  const timeoutSignal = AbortSignal.timeout(CONFIG.fetchTimeoutMs);
  return signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal;
}

function waitForRetry(milliseconds: number, signal?: AbortSignal): Promise<void> {
  if (milliseconds <= 0) return Promise.resolve();
  if (signal?.aborted) return Promise.reject(signal.reason ?? new Error('request aborted'));

  return new Promise((resolve, reject) => {
    let timer: ReturnType<typeof setTimeout>;
    const onAbort = () => {
      clearTimeout(timer);
      reject(signal?.reason ?? new Error('request aborted'));
    };
    timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, milliseconds);
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

async function fetchWithTimeout(
  url: string,
  fetchImpl: FetchLike,
  signal?: AbortSignal,
): Promise<Response> {
  let lastError: unknown;
  // CONFIG describes retries after the initial request.
  const attempts = Math.max(1, CONFIG.retryAttempts + 1);
  const retryableStatuses = new Set([429, 502, 503, 504]);

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

      if (!retryableStatuses.has(response.status) || attempt === attempts - 1) return response;
      const retryAfterSeconds = Math.min(5, Math.max(0, Number(response.headers.get('Retry-After') ?? 1)));
      await waitForRetry(retryAfterSeconds * 1000, signal);
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
  signal?.throwIfAborted();
  const now = Date.now();
  for (const [key, entry] of packageCache) {
    if (entry.expiresAt <= now) packageCache.delete(key);
  }

  if (useCache) {
    const cached = packageCache.get(url);
    if (cached && cached.expiresAt > Date.now()) return cached.payload;
    const existing = signal ? undefined : packageInflight.get(url);
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

  if (useCache && !signal) packageInflight.set(url, request);
  try {
    return await request;
  } finally {
    if (useCache && !signal) packageInflight.delete(url);
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
  return [container?.classification, ...asArray(container?.additionalClassifications)]
    .filter((classification: any) => String(classification?.scheme ?? '').toUpperCase() === 'CPV')
    .map((classification: any) => classification?.id);
}

function releaseTimestamp(release: any): number {
  const timestamp = Date.parse(String(release?.date ?? ''));
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function mergeReleaseAmendment(older: any, newer: any): any {
  const olderTender = older?.tender ?? {};
  const newerTender = newer?.tender ?? {};
  return {
    ...older,
    ...newer,
    buyer: newer?.buyer ?? older?.buyer,
    parties: newer?.parties ?? older?.parties,
    links: newer?.links ?? older?.links,
    tender: {
      ...olderTender,
      ...newerTender,
      tenderPeriod: {
        ...(olderTender?.tenderPeriod ?? {}),
        ...(newerTender?.tenderPeriod ?? {}),
      },
    },
  };
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
export function mapFindATenderRelease(release: any, trade: string, now = new Date()): RawLead | null {
  if (!release || typeof release !== 'object' || !release.tender || typeof release.tender !== 'object') return null;

  const tender = release.tender;
  const status = String(tender.status ?? '').toLowerCase();
  if (['cancelled', 'complete', 'withdrawn', 'unsuccessful'].includes(status)) return null;

  const title = String(tender.title ?? '').trim();
  const description = String(tender.description ?? '').trim();
  if (title.length < 4) return null;

  const deadline = String(tender?.tenderPeriod?.endDate ?? '').trim();
  const deadlineTimestamp = Date.parse(deadline);
  if (Number.isFinite(deadlineTimestamp)) {
    const deadlineDays = (deadlineTimestamp - now.getTime()) / 86_400_000;
    if (deadlineDays < CONFIG.minDeadlineDaysFromNow || deadlineDays > CONFIG.maxDeadlineDaysFromNow) return null;
  }

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
  const location = uniqueStrings(locations.map(locationLabel)).join('; ') || 'United Kingdom';
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
    // Buyer headquarters are not proof of where work will be delivered.
    // Keep radius filtering tied to an explicit delivery postcode only.
    rawPostcode: deliveryPostcode || '',
    rawDeadline: deadline,
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
  const cacheWindowNow = new Date(Math.floor(now.getTime() / PACKAGE_CACHE_TTL_MS) * PACKAGE_CACHE_TTL_MS);
  const since = new Date(cacheWindowNow.getTime() - CONFIG.lookbackDays * 86_400_000).toISOString().substring(0, 19);
  const params = new URLSearchParams({ updatedFrom: since, stages: 'tender', limit: '100' });

  let nextUrl: string | undefined = `${FTS_BASE}?${params}`;
  const visitedUrls = new Set<string>();
  const latestReleaseByOcid = new Map<string, any>();
  const leads: RawLead[] = [];
  let fetched = 0;
  let dropped = 0;
  let fetchError: string | undefined;

  try {
    for (let page = 0; page < maxPages && nextUrl; page++) {
      if (visitedUrls.has(nextUrl)) break;
      visitedUrls.add(nextUrl);

      const pkg = await fetchJsonPackage(nextUrl, fetchImpl, options.signal, useCache);
      const releases = Array.isArray(pkg?.releases) ? pkg.releases : [];
      fetched += releases.length;

      for (const release of releases) {
        const releaseId = String(release?.ocid ?? release?.id ?? '').trim();
        if (!releaseId) {
          dropped++;
          continue;
        }
        const existing = latestReleaseByOcid.get(releaseId);
        if (!existing) {
          latestReleaseByOcid.set(releaseId, release);
          continue;
        }

        dropped++;
        const [older, newer] = releaseTimestamp(release) >= releaseTimestamp(existing)
          ? [existing, release]
          : [release, existing];
        latestReleaseByOcid.set(releaseId, mergeReleaseAmendment(older, newer));
      }

      nextUrl = officialNextUrl(pkg?.links?.next);
    }

  } catch (error: any) {
    fetchError = String(error?.message ?? error);
  }

  for (const release of latestReleaseByOcid.values()) {
    const mapped = mapFindATenderRelease(release, trade, now);
    if (mapped) leads.push(mapped);
    else dropped++;
  }

  return {
    leads,
    stats: {
      fetched,
      passed: leads.length,
      dropped,
      failed: Boolean(fetchError),
      error: fetchError,
    },
  };
}

export async function contractsFetcher(
  trade: string,
  options: FindATenderOptions = {},
): Promise<{ leads: RawLead[]; stats: Record<string, SourceStats> }> {
  const result = await fetchFindATender(trade, options);
  console.error(`[FTS] ${FTS_BASE} → fetched=${result.stats.fetched} passed=${result.stats.passed} failed=${result.stats.failed}${result.stats.error ? ` ERR=${result.stats.error}` : ''}`);
  return { leads: result.leads, stats: { FTS: result.stats } };
}
