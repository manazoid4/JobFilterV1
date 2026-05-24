import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const _url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const _key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const _db: SupabaseClient | null = _url && _key
  ? createClient(_url, _key, { auth: { persistSession: false } })
  : null;

export interface SourceConfigEntry {
  key: string;
  label: string;
  endpoint: string;
  signalClass: string;
  readiness: 'live' | 'key-required' | 'partner-required' | 'research';
  scoreBonus: number;
  defaultEnabled: boolean;
  apiKeyEnv?: string;
  envToggle?: string;
  enabledInDemoMode?: boolean;
}

// Single source of truth for all lead sources: metadata, scoring, and enabled state.
// Runtime overrides are stored in the `source_config` Supabase table.
// Adding a new source = add one entry here + write a fetcher + register it in scan.ts.
export const SOURCE_REGISTRY: SourceConfigEntry[] = [
  { key: 'ContractsFinder',         label: 'Contracts Finder',          endpoint: 'https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search', signalClass: 'procurement', readiness: 'live',             scoreBonus: 7,  defaultEnabled: true,  envToggle: 'SOURCE_CF' },
  { key: 'FTS',                     label: 'Find a Tender Service',     endpoint: 'https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages',        signalClass: 'procurement', readiness: 'live',             scoreBonus: 7,  defaultEnabled: true,  envToggle: 'SOURCE_FTS' },
  { key: 'PlanningData',            label: 'Planning Data API',         endpoint: 'https://www.planning.data.gov.uk/entity.json',                             signalClass: 'planning',    readiness: 'live',             scoreBonus: 7,  defaultEnabled: true,  envToggle: 'SOURCE_PLANNING_DATA' },
  { key: 'CompaniesHouse',          label: 'Companies House',           endpoint: 'https://api.company-information.service.gov.uk',                           signalClass: 'business',    readiness: 'key-required',     scoreBonus: 3,  defaultEnabled: false, apiKeyEnv: 'COMPANIES_HOUSE_API_KEY', enabledInDemoMode: true },
  { key: 'PublicContractsScotland', label: 'Public Contracts Scotland', endpoint: 'https://api.publiccontractsscotland.gov.uk/v1/Notices',                   signalClass: 'procurement', readiness: 'live',             scoreBonus: 7,  defaultEnabled: true,  envToggle: 'SOURCE_PCS' },
  { key: 'Sell2Wales',              label: 'Sell2Wales',                endpoint: 'https://www.sell2wales.gov.wales/search/api/OCDS/v1/Releases',            signalClass: 'procurement', readiness: 'live',             scoreBonus: 7,  defaultEnabled: false, envToggle: 'SOURCE_S2W' },
  { key: 'EPC',                     label: 'EPC Domestic Certificates', endpoint: 'https://epc.opendatacommunities.org/api/v1/domestic/search',              signalClass: 'retrofit',    readiness: 'key-required',     scoreBonus: 6,  defaultEnabled: true,  apiKeyEnv: 'EPC_API_KEY', envToggle: 'SOURCE_EPC' },
  { key: 'LandRegistry',            label: 'HM Land Registry',          endpoint: 'https://publishing.service.gov.uk/price-paid-data',                       signalClass: 'property',    readiness: 'live',             scoreBonus: 4,  defaultEnabled: false, enabledInDemoMode: true },
  { key: 'CharityCommission',       label: 'Charity Commission',        endpoint: 'https://register-of-charities.charitycommission.gov.uk',                  signalClass: 'business',    readiness: 'live',             scoreBonus: 3,  defaultEnabled: false, enabledInDemoMode: true },
  { key: 'ForestryCommission',      label: 'Forestry Commission',       endpoint: 'https://www.gov.uk/guidance/tree-felling-licence',                        signalClass: 'planning',    readiness: 'live',             scoreBonus: 3,  defaultEnabled: false, enabledInDemoMode: true },
  { key: 'DirectorySignal',         label: 'Internal Directory',        endpoint: '(internal)',                                                              signalClass: 'internal',    readiness: 'research',         scoreBonus: -8, defaultEnabled: false, envToggle: 'SOURCE_DIRECTORY_SIGNAL', enabledInDemoMode: true },
  { key: 'PlanAPI',                 label: 'PlanAPI',                   endpoint: 'https://planapi.co.uk/',                                                  signalClass: 'planning',    readiness: 'key-required',     scoreBonus: 8,  defaultEnabled: false, apiKeyEnv: 'PLANAPI_KEY' },
  { key: 'PlanNexus',               label: 'PlanNexus',                 endpoint: 'https://api.plannexus.io/v1/applications',                               signalClass: 'planning',    readiness: 'key-required',     scoreBonus: 8,  defaultEnabled: false, apiKeyEnv: 'PLANNEXUS_API_KEY' },
  { key: 'PlanWire',                label: 'PlanWire',                  endpoint: 'https://planwire.io/',                                                    signalClass: 'planning',    readiness: 'key-required',     scoreBonus: 8,  defaultEnabled: false, apiKeyEnv: 'PLANWIRE_API_KEY' },
  { key: 'BuildingControl',         label: 'Building Control',          endpoint: 'Council building-control registers',                                      signalClass: 'planning',    readiness: 'research',         scoreBonus: 10, defaultEnabled: false, envToggle: 'SOURCE_BUILDING_CONTROL' },
  { key: 'HMOLicensing',            label: 'HMO Licensing',             endpoint: 'Council HMO registers',                                                  signalClass: 'planning',    readiness: 'research',         scoreBonus: 6,  defaultEnabled: false, envToggle: 'SOURCE_HMO' },
  { key: 'AuctionProperty',         label: 'Auction Property',          endpoint: 'Licensed auction feeds',                                                 signalClass: 'property',    readiness: 'research',         scoreBonus: 3,  defaultEnabled: false, envToggle: 'SOURCE_AUCTIONS' },
  { key: 'InsolvencySignals',       label: 'Insolvency Signals',        endpoint: 'Official insolvency feeds',                                              signalClass: 'business',    readiness: 'research',         scoreBonus: 2,  defaultEnabled: false, envToggle: 'SOURCE_INSOLVENCY' },
  { key: 'RetrofitSchemes',         label: 'Retrofit Schemes',          endpoint: 'DESNZ/Ofgem/MCS data',                                                   signalClass: 'retrofit',    readiness: 'research',         scoreBonus: 6,  defaultEnabled: false, envToggle: 'SOURCE_RETROFIT_SCHEMES' },
  { key: 'PortalTrendIntelligence', label: 'Portal Trend Intelligence', endpoint: 'Licensed portal feeds',                                                  signalClass: 'property',    readiness: 'partner-required', scoreBonus: -4, defaultEnabled: false, envToggle: 'SOURCE_PORTAL_TRENDS' },
];

type DbOverride = { enabled: boolean; scoreBonus?: number };
let _overrideCache: Record<string, DbOverride> | null = null;
let _cacheExpiry = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

export async function warmSourceConfigCache(): Promise<void> {
  if (Date.now() < _cacheExpiry && _overrideCache !== null) return;
  if (!_db) {
    _overrideCache = {};
    _cacheExpiry = Date.now() + CACHE_TTL_MS;
    return;
  }
  try {
    const { data } = await _db.from('source_config').select('key, enabled, score_bonus');
    const map: Record<string, DbOverride> = {};
    for (const row of data ?? []) {
      map[row.key] = { enabled: row.enabled, scoreBonus: row.score_bonus ?? undefined };
    }
    _overrideCache = map;
    _cacheExpiry = Date.now() + CACHE_TTL_MS;
  } catch {
    _overrideCache ??= {};
    _cacheExpiry = Date.now() + 60_000;
  }
}

export function invalidateSourceConfigCache(): void {
  _overrideCache = null;
  _cacheExpiry = 0;
}

function staticEntry(key: string): SourceConfigEntry | undefined {
  return SOURCE_REGISTRY.find(s => s.key === key);
}

export function isSourceEnabled(key: string): boolean {
  const override = _overrideCache?.[key];
  if (override !== undefined) return override.enabled;
  const entry = staticEntry(key);
  if (!entry) return false;
  if (entry.enabledInDemoMode && process.env.DEMO_MODE === 'true') return true;
  if (entry.envToggle) {
    const val = process.env[entry.envToggle];
    if (val === 'false') return false;
    if (val === 'true') return true;
  }
  if (entry.apiKeyEnv && process.env[entry.apiKeyEnv]) return true;
  return entry.defaultEnabled;
}

export function getScoreBonus(key: string): number {
  const override = _overrideCache?.[key];
  if (override?.scoreBonus !== undefined) return override.scoreBonus;
  return staticEntry(key)?.scoreBonus ?? 0;
}

export function getAllSourcesConfig(): Array<SourceConfigEntry & { effectiveEnabled: boolean; effectiveScoreBonus: number }> {
  return SOURCE_REGISTRY.map(entry => ({
    ...entry,
    effectiveEnabled: isSourceEnabled(entry.key),
    effectiveScoreBonus: getScoreBonus(entry.key),
  }));
}
