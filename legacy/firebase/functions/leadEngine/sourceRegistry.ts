export type SourceReadiness = 'live' | 'key-required' | 'partner-required' | 'council-specific' | 'research';

export interface DataSourceDefinition {
  key: string;
  label: string;
  readiness: SourceReadiness;
  signalClass: 'planning' | 'procurement' | 'property' | 'retrofit' | 'business' | 'distress' | 'territory';
  endpoint: string;
  advantage: string;
  legalMode: string;
}

export const DATA_SOURCE_REGISTRY: DataSourceDefinition[] = [
  {
    key: 'PlanningData',
    label: 'Planning Data API',
    readiness: 'live',
    signalClass: 'planning',
    endpoint: 'https://www.planning.data.gov.uk/entity.json',
    advantage: 'Official England planning/housing datasets, including planning applications, brownfield land, listed buildings, conservation areas, Article 4, and constraints.',
    legalMode: 'Official API. Prefer dataset and coordinate/postcode filters.',
  },
  {
    key: 'PlanAPI',
    label: 'PlanAPI',
    readiness: 'key-required',
    signalClass: 'planning',
    endpoint: 'https://planapi.co.uk/',
    advantage: 'Paid unified planning API across UK local planning authorities; useful where official Planning Data coverage is incomplete.',
    legalMode: 'Use commercial API terms. No scraping.',
  },
  {
    key: 'PlanNexus',
    label: 'PlanNexus',
    readiness: 'key-required',
    signalClass: 'planning',
    endpoint: 'https://api.plannexus.io/v1/applications',
    advantage: 'Normalised planning application feed with postcode, status, authority, and source-council tracebacks.',
    legalMode: 'Use API key and provider terms. No scraping.',
  },
  {
    key: 'PlanWire',
    label: 'PlanWire',
    readiness: 'key-required',
    signalClass: 'planning',
    endpoint: 'https://planwire.io/',
    advantage: 'Planning application search, nearby queries, freshness metadata, council coverage, and webhooks.',
    legalMode: 'Use API key and provider terms. No scraping.',
  },
  {
    key: 'Searchland',
    label: 'Searchland APIs',
    readiness: 'partner-required',
    signalClass: 'planning',
    endpoint: 'https://searchland.co.uk/our-apis/planning-applications',
    advantage: 'Planning, boundaries, ownership/property, EPC, and feasibility data that can compress multiple competitor datasets into one feed.',
    legalMode: 'Commercial API/partner access only.',
  },
  {
    key: 'ContractsFinder',
    label: 'Contracts Finder',
    readiness: 'live',
    signalClass: 'procurement',
    endpoint: 'https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search',
    advantage: 'England public-sector tenders before smaller competitors check portals.',
    legalMode: 'Official public procurement API.',
  },
  {
    key: 'FTS',
    label: 'Find a Tender Service',
    readiness: 'live',
    signalClass: 'procurement',
    endpoint: 'https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages',
    advantage: 'Higher-value UK public procurement opportunities with OCDS releases.',
    legalMode: 'Official public procurement API.',
  },
  {
    key: 'PublicContractsScotland',
    label: 'Public Contracts Scotland',
    readiness: 'live',
    signalClass: 'procurement',
    endpoint: 'https://api.publiccontractsscotland.gov.uk/v1/Notices',
    advantage: 'Scottish tenders competitors miss if they only monitor England/Wales portals.',
    legalMode: 'Official OCDS API.',
  },
  {
    key: 'Sell2Wales',
    label: 'Sell2Wales',
    readiness: 'research',
    signalClass: 'procurement',
    endpoint: 'https://www.sell2wales.gov.wales/search/api/OCDS/v1/Releases',
    advantage: 'Welsh public-sector works and maintenance tenders.',
    legalMode: 'Use official API once endpoint contract is verified.',
  },
  {
    key: 'EPC',
    label: 'EPC Domestic Certificates',
    readiness: 'key-required',
    signalClass: 'retrofit',
    endpoint: 'https://epc.opendatacommunities.org/api/v1/domestic/search',
    advantage: 'F/G/E rated properties, expired certificates, and recommendation text for insulation, boilers, solar, heat pumps, and windows.',
    legalMode: 'Official EPC API with registered credentials.',
  },
  {
    key: 'HMOLicensing',
    label: 'HMO Licensing Registers',
    readiness: 'council-specific',
    signalClass: 'property',
    endpoint: 'Council HMO public registers and open-data portals',
    advantage: 'Landlords facing licence renewals need fire alarms, EICR, heating, bathrooms, and compliance works.',
    legalMode: 'Use council open-data APIs/registers only; no restricted scraping.',
  },
  {
    key: 'BuildingControl',
    label: 'Building Control Notices',
    readiness: 'council-specific',
    signalClass: 'planning',
    endpoint: 'Council building-control registers/open-data portals',
    advantage: 'Commencement/completion notices reveal works that are happening now, not just planning intent.',
    legalMode: 'Official council APIs/open registers only.',
  },
  {
    key: 'LandRegistry',
    label: 'HM Land Registry Price Paid Data',
    readiness: 'live',
    signalClass: 'property',
    endpoint: 'https://publishing.service.gov.uk/government/statistical-data-sets/price-paid-data-downloads',
    advantage: 'Recent property purchases indicate renovation, extension, boiler, electrical, and roofing intent.',
    legalMode: 'Official open data download.',
  },
  {
    key: 'AuctionProperty',
    label: 'Auction Property Feeds',
    readiness: 'partner-required',
    signalClass: 'distress',
    endpoint: 'Partner/API feeds from auction houses and portals',
    advantage: 'Auction buyers often need fast refurb, damp, roof, electrical, HMO, and conversion work.',
    legalMode: 'Partner/API terms. Avoid scraping restricted listings.',
  },
  {
    key: 'CompaniesHouse',
    label: 'Companies House',
    readiness: 'key-required',
    signalClass: 'business',
    endpoint: 'https://api.company-information.service.gov.uk/',
    advantage: 'New incorporations, SIC changes, and registered-office movement can signal fit-out, signage, electrical, and premises work.',
    legalMode: 'Official API with key.',
  },
  {
    key: 'Insolvency',
    label: 'Insolvency / Administration Signals',
    readiness: 'research',
    signalClass: 'distress',
    endpoint: 'The Gazette notices and official insolvency publications',
    advantage: 'Distressed property/business assets create clearance, security, refit, maintenance, and takeover works.',
    legalMode: 'Use official/public APIs or licensed feeds.',
  },
  {
    key: 'RetrofitSchemes',
    label: 'Retrofit and Grant Schemes',
    readiness: 'research',
    signalClass: 'retrofit',
    endpoint: 'DESNZ/Ofgem/MCS/Boiler Upgrade Scheme/public retrofit datasets',
    advantage: 'Grant eligibility and retrofit deadlines create heat-pump, insulation, solar, and boiler demand.',
    legalMode: 'Official datasets and partner APIs only.',
  },
  {
    key: 'LocalPlanBrownfield',
    label: 'Brownfield and Local Plan Land',
    readiness: 'live',
    signalClass: 'territory',
    endpoint: 'https://www.planning.data.gov.uk/entity.json?dataset=brownfield-land',
    advantage: 'Future construction clusters for groundworks, builders, roofers, electricians, and landscapers.',
    legalMode: 'Official Planning Data API.',
  },
  {
    key: 'RightmoveZooplaTrends',
    label: 'Portal Trend Intelligence',
    readiness: 'partner-required',
    signalClass: 'property',
    endpoint: 'Licensed property portal trend feeds only',
    advantage: 'Price cuts, sale/rent churn, and listing age point to owners likely to spend on works.',
    legalMode: 'Do not scrape restricted portals. Use licensed/partner data only.',
  },
];

export function sourceRegistryEndpoints(): Record<string, string[]> {
  return Object.fromEntries(
    DATA_SOURCE_REGISTRY.map((source) => [
      source.key,
      [
        `${source.readiness.toUpperCase()}  ${source.endpoint}`,
        `Signal: ${source.signalClass}. Advantage: ${source.advantage}`,
        `Legal: ${source.legalMode}`,
      ],
    ]),
  );
}
