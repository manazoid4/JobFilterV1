export type ContractsFinderNotice = {
  id: string;
  ocid: string;
  title: string;
  description: string;
  buyer: string;
  location: string;
  postcode: string;
  value?: number;
  publishedAt: string;
  deadlineAt: string;
  url: string;
  cpvCodes: string[];
};

const ENDPOINT = 'https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search';

const TRADE_KEYWORDS: Record<string, string[]> = {
  plumbing: ['plumbing', 'boiler', 'heating', 'pipework', 'sanitary', 'mechanical services', 'water'],
  electrical: ['electrical', 'electric', 'wiring', 'ev charger', 'lighting', 'rewire', 'fire alarm'],
  roofing: ['roof', 'roofing', 'cladding', 'guttering', 'fascia', 'flat roof'],
  building: ['refurbishment', 'extension', 'construction', 'building', 'renovation', 'maintenance works'],
};

const CPV_PREFIXES: Record<string, string[]> = {
  plumbing: ['45330', '45331', '45332', '45333', '50720', '50730'],
  electrical: ['45310', '45311', '45312', '45315', '45316', '50710', '50711'],
  roofing: ['45260', '45261', '45262', '45263'],
  building: ['45000', '45100', '45200', '45210', '45211', '45220', '45400', '45410', '45450'],
};

export function keywordsForTrade(trade: string) {
  return TRADE_KEYWORDS[trade] ?? [];
}

export function noticeMatchesTrade(notice: ContractsFinderNotice, trade: string) {
  const terms = keywordsForTrade(trade);
  const haystack = `${notice.title} ${notice.description}`.toLowerCase();
  const keywordMatch = terms.some((term) => haystack.includes(term));
  const cpvMatch = (CPV_PREFIXES[trade] ?? []).some((prefix) => notice.cpvCodes.some((code) => code.startsWith(prefix)));
  return keywordMatch || cpvMatch;
}

export async function fetchContractsFinderNotices(trade: string, signal: AbortSignal): Promise<ContractsFinderNotice[]> {
  const publishedFrom = new Date(Date.now() - 45 * 86_400_000)
    .toISOString()
    .replace('T', ' ')
    .substring(0, 19);

  const params = new URLSearchParams({
    publishedFrom,
    stages: 'tender',
    limit: '100',
  });

  const response = await fetch(`${ENDPOINT}?${params}`, {
    signal,
    headers: {
      Accept: 'application/json',
      'User-Agent': 'JobFilter/1.0 (jobfilter.uk)',
    },
  });

  if (!response.ok) {
    throw new Error(`contracts finder returned ${response.status}`);
  }

  const payload = await response.json() as { releases?: any[] };
  const releases = Array.isArray(payload.releases) ? payload.releases : [];

  return releases
    .map(mapRelease)
    .filter((notice): notice is ContractsFinderNotice => Boolean(notice))
    .filter((notice) => noticeMatchesTrade(notice, trade));
}

function mapRelease(release: any): ContractsFinderNotice | null {
  const tender = release?.tender ?? {};
  const items = Array.isArray(tender.items) ? tender.items : [];
  const title = clean(tender.title);
  if (!title) return null;

  const documents = Array.isArray(tender.documents) ? tender.documents : [];
  const firstAddress = items.flatMap((item: any) => item?.deliveryAddresses ?? [])[0] ?? {};
  const region = clean(firstAddress.region || firstAddress.locality || firstAddress.countryName);
  const postcode = clean(firstAddress.postalCode);
  const classifications = [
    tender?.classification?.id,
    ...items.flatMap((item: any) => [
      item?.classification?.id,
      ...(item?.additionalClassifications ?? []).map((entry: any) => entry?.id),
    ]),
  ];

  return {
    id: clean(release.id || release.ocid),
    ocid: clean(release.ocid),
    title,
    description: clean(tender.description),
    buyer: clean(release?.buyer?.name || tender?.procuringEntity?.name),
    location: region || postcode || 'United Kingdom',
    postcode,
    value: Number(tender?.value?.amount) || undefined,
    publishedAt: clean(tender.datePublished || release.date),
    deadlineAt: clean(tender?.tenderPeriod?.endDate),
    url: clean(documents[0]?.url) || (release.id ? `https://www.contractsfinder.service.gov.uk/Notice/${release.id}` : 'https://www.contractsfinder.service.gov.uk/'),
    cpvCodes: classifications.filter(Boolean).map(String),
  };
}

function clean(value: unknown) {
  return String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, 600);
}
