/**
 * Public Contracts Scotland (PCS) + Sell2Wales (S2W) fetcher
 *
 * Both portals expose the same OCDS v1 Release format as ContractsFinder.
 *
 * PCS:  https://www.publiccontractsscotland.gov.uk/search/api/OCDS/v1/Releases
 * S2W:  https://www.sell2wales.gov.wales/search/api/OCDS/v1/Releases
 *
 * No authentication required. Params: publishedFrom, stages, limit, cursor
 */

import type { RawLead, SourceStats } from '../types';
import { CONFIG } from '../config';

const PCS_BASE = 'https://www.publiccontractsscotland.gov.uk/search/api/OCDS/v1/Releases';
const S2W_BASE = 'https://www.sell2wales.gov.wales/search/api/OCDS/v1/Releases';

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

function parseOcdsReleases(releases: any[], trade: string, system: string): { leads: RawLead[]; dropped: number } {
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
      || buyer?.address?.locality
      || '';

    const noticeId = String(rel?.ocid ?? rel?.id ?? '');
    const idSuffix = noticeId.split('-').pop();
    const sourceUrl = noticeId
      ? system === 'PCS'
        ? `https://www.publiccontractsscotland.gov.uk/search/show/search_view.aspx?ID=${idSuffix}`
        : `https://www.sell2wales.gov.wales/search/show/search_view.aspx?ID=${idSuffix}`
      : undefined;

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
      ? fetchOcdsSource('PCS', PCS_BASE, trade)
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
