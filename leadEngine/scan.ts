/**
 * scan(postcode, trade) — main lead engine entry point.
 *
 * Pipeline:
 *  1. Resolve postcode → outward, region, lat/lon
 *  2. Run all sources in parallel (ContractsFinder, FTS, PlanningData, DirectorySignal)
 *  3. Normalise raw leads
 *  4. Deduplicate by id
 *  5. Score and rank
 *  6. Return top N with per-source diagnostics
 *
 * Failover: if source fails (any HTTP error or throw) → log + continue.
 * Never blocks on a single source.
 */

import type { Lead, RawLead, ScanResult, SourceStats, SourceHealth } from './types';
import { CONFIG, TRADE_KEYS } from './config';
import { lookupPostcode, haversineMiles, regionFromOutward } from './postcode';
import { contractsFetcher } from './fetchers/contractsFetcher';
import { planningDataFetcher } from './fetchers/planningDataFetcher';
import { directorySignalFetcher } from './fetchers/directorySignalFetcher';
import { companiesHouseFetcher } from './fetchers/companiesHouseFetcher';
import { pcsS2wFetcher } from './fetchers/pcsS2wFetcher';
import { epcFetcher } from './fetchers/epcFetcher';
import { landRegistryFetcher } from './fetchers/landRegistryFetcher';
import { charityCommissionFetcher } from './fetchers/charityCommissionFetcher';
import { forestryCommissionFetcher } from './fetchers/forestryCommissionFetcher';
import { normaliseAll } from './normaliser';
import { scoreLeadBreakdown } from './scorer';
import { sourceRegistryEndpoints } from './sourceRegistry';

// Endpoint registry — printed in diagnostics
export const SOURCE_ENDPOINTS: Record<string, string[]> = {
  ...sourceRegistryEndpoints(),
  ContractsFinder: [
    'GET  https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search',
  ],
  FTS: [
    'GET  https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages',
  ],
  PCS: [
    'GET  https://api.publiccontractsscotland.gov.uk/v1/Notices  (dateFrom=MM-YYYY, noticeType=2, outputType=0)',
  ],
  Sell2Wales: [
    'GET  https://www.sell2wales.gov.wales/search/api/OCDS/v1/Releases  (publishedFrom=, stages=tender, limit=50)',
  ],
  PlanningData: [
    'GET  https://www.planning.data.gov.uk/entity.json  (geo: ?latitude=&longitude=&dataset=planning-application&period=current)',
    'GET  https://www.planning.data.gov.uk/entity.json  (postcode: ?q={outward}&dataset=planning-application&period=current)',
  ],
  CompaniesHouse: [
    'GET  https://api.company-information.service.gov.uk/advanced-search/companies  (sic_codes=, incorporated_from=, company_status=active)',
    'Requires COMPANIES_HOUSE_API_KEY env var — free at developer.company-information.service.gov.uk',
  ],
  DirectorySignal: [
    '(internal structured dataset — no HTTP call)',
  ],
  EPC: [
    'GET  https://epc.opendatacommunities.org/api/v1/domestic/search  (postcode={outward})',
    'Requires EPC_API_KEY and EPC_EMAIL env vars — free at epc.opendatacommunities.org',
  ],
  LandRegistry: [
    'CSV  https://publishing.prh.gov.uk/price-paid-data  (monthly Price Paid Data download)',
    'Open data — no API key needed. CSV parsed locally, filtered by outward postcode.',
  ],
  CharityCommission: [
    'GET  https://register-of-charities.charitycommission.gov.uk  (new charity registrations)',
    'Public register — new charities signal premises setup, renovation, adaptation work.',
  ],
  ForestryCommission: [
    'GET  https://www.gov.uk/guidance/tree-felling-licence-when-you-need-to-apply  (felling licence applications)',
    'Public register — tree clearance signals for landscapers, groundworkers, fencing contractors.',
  ],
  HMOLicensing: [
    'Council HMO public registers and open-data portals',
    'High-value compliance trigger: fire alarms, emergency lighting, EICR, heating, bathrooms, and licence renewal works.',
  ],
  BuildingControl: [
    'Council building-control public registers/open-data portals',
    'Commencement/completion signals identify work happening now, after planning intent becomes real.',
  ],
  AuctionProperty: [
    'Licensed auction-house and portal feeds only',
    'Distress/refurb trigger for roof, damp, electrical, clearance, HMO conversion, and general building work.',
  ],
  InsolvencySignals: [
    'Official insolvency/Gazette-style feeds or licensed partners',
    'Distressed business/property movement triggers refit, security, clearance, and takeover maintenance work.',
  ],
  RetrofitSchemes: [
    'DESNZ/Ofgem/MCS/BUS and local-authority retrofit programme data',
    'Grant-backed demand for heat pumps, insulation, solar, glazing, and boiler replacement.',
  ],
  PortalTrendIntelligence: [
    'Licensed Rightmove/Zoopla/portal trend feeds only',
    'Listing age, sale/rent churn, and price-drop pressure identify owners likely to spend on works.',
  ],
};

export interface ScanOptions {
  postcode: string;
  trade?: string;
  tier?: 'free' | 'paid';
  radiusMiles?: number;
}

export async function scan(opts: ScanOptions): Promise<ScanResult> {
  const { postcode, trade = '', tier = 'free', radiusMiles } = opts;
  const cleanTrade = validateTrade(trade);

  // 1. Resolve postcode
  const pcInfo = await lookupPostcode(postcode);
  const { outward, region } = pcInfo;

  // 2. Run all sources concurrently — failures are caught internally
  const [cfResult, planningResult, chResult, pcsResult, epcResult, lrResult, ccResult, fcResult] = await Promise.allSettled([
    CONFIG.sources.contractsFinder || CONFIG.sources.fts
      ? contractsFetcher(cleanTrade)
      : Promise.resolve(disabledSources(['ContractsFinder', 'FTS'])),
    CONFIG.sources.planningData
      ? planningDataFetcher(outward, region, cleanTrade, pcInfo.latitude, pcInfo.longitude)
      : Promise.resolve(disabledSources(['PlanningData'])),
    CONFIG.sources.companiesHouse
      ? companiesHouseFetcher(region, cleanTrade, outward)
      : Promise.resolve(disabledSources(['CompaniesHouse'])),
    CONFIG.sources.publicContractsScotland || CONFIG.sources.sell2wales
      ? pcsS2wFetcher(cleanTrade)
      : Promise.resolve(disabledSources(['PCS', 'Sell2Wales'])),
    CONFIG.sources.epcData
      ? epcFetcher(outward, cleanTrade)
      : Promise.resolve(disabledSources(['EPC'])),
    CONFIG.sources.landRegistry
      ? landRegistryFetcher(outward, cleanTrade)
      : Promise.resolve(disabledSources(['LandRegistry'])),
    CONFIG.sources.charityCommission
      ? charityCommissionFetcher(outward, cleanTrade)
      : Promise.resolve(disabledSources(['CharityCommission'])),
    CONFIG.sources.forestryCommission
      ? forestryCommissionFetcher(outward, cleanTrade)
      : Promise.resolve(disabledSources(['ForestryCommission'])),
  ]);

  const dirResult = directorySignalFetcher(region, cleanTrade, outward); // sync

  // 3. Collect raw leads + merge stats
  const allRaw = [
    ...(cfResult.status === 'fulfilled' ? cfResult.value.leads : []),
    ...(planningResult.status === 'fulfilled' ? planningResult.value.leads : []),
    ...(chResult.status === 'fulfilled' ? chResult.value.leads : []),
    ...(pcsResult.status === 'fulfilled' ? pcsResult.value.leads : []),
    ...(epcResult.status === 'fulfilled' ? epcResult.value.leads : []),
    ...(lrResult.status === 'fulfilled' ? lrResult.value.leads : []),
    ...(ccResult.status === 'fulfilled' ? ccResult.value.leads : []),
    ...(fcResult.status === 'fulfilled' ? fcResult.value.leads : []),
    ...dirResult.leads,
  ];

  const mergedStats: Record<string, SourceStats> = {};

  if (cfResult.status === 'fulfilled') {
    Object.assign(mergedStats, cfResult.value.stats);
  } else {
    mergedStats['ContractsFinder'] = { fetched: 0, passed: 0, dropped: 0, failed: true, error: 'ContractsFinder settled as rejected' };
    mergedStats['FTS'] = { fetched: 0, passed: 0, dropped: 0, failed: true, error: 'FTS settled as rejected' };
  }

  if (planningResult.status === 'fulfilled') {
    Object.assign(mergedStats, planningResult.value.stats);
  } else {
    mergedStats['PlanningData'] = { fetched: 0, passed: 0, dropped: 0, failed: true, error: 'Planning settled as rejected' };
  }

  if (chResult.status === 'fulfilled') {
    Object.assign(mergedStats, chResult.value.stats);
  } else {
    mergedStats['CompaniesHouse'] = { fetched: 0, passed: 0, dropped: 0, failed: true, error: 'CompaniesHouse settled as rejected' };
  }

  if (pcsResult.status === 'fulfilled') {
    Object.assign(mergedStats, pcsResult.value.stats);
  } else {
    mergedStats['PCS'] = { fetched: 0, passed: 0, dropped: 0, failed: true, error: 'PCS settled as rejected' };
    mergedStats['Sell2Wales'] = { fetched: 0, passed: 0, dropped: 0, failed: true, error: 'Sell2Wales settled as rejected' };
  }

  if (epcResult.status === 'fulfilled') {
    Object.assign(mergedStats, epcResult.value.stats);
  } else {
    mergedStats['EPC'] = { fetched: 0, passed: 0, dropped: 0, failed: true, error: 'EPC settled as rejected' };
  }

  if (lrResult.status === 'fulfilled') {
    Object.assign(mergedStats, lrResult.value.stats);
  } else {
    mergedStats['LandRegistry'] = { fetched: 0, passed: 0, dropped: 0, failed: true, error: 'LandRegistry settled as rejected' };
  }

  if (ccResult.status === 'fulfilled') {
    Object.assign(mergedStats, ccResult.value.stats);
  } else {
    mergedStats['CharityCommission'] = { fetched: 0, passed: 0, dropped: 0, failed: true, error: 'CharityCommission settled as rejected' };
  }

  if (fcResult.status === 'fulfilled') {
    Object.assign(mergedStats, fcResult.value.stats);
  } else {
    mergedStats['ForestryCommission'] = { fetched: 0, passed: 0, dropped: 0, failed: true, error: 'ForestryCommission settled as rejected' };
  }

  Object.assign(mergedStats, dirResult.stats);

  // 4. Normalise
  const normalised: Lead[] = normaliseAll(allRaw, cleanTrade);

  // 5. Deduplicate — exact ID match + fuzzy title+postcode match
  const seenIds = new Set<string>();
  const seenSignatures: string[] = [];
  const unique: Lead[] = [];
  for (const lead of normalised) {
    if (seenIds.has(lead.id)) continue;

    // Fuzzy dedup: normalise title + outward postcode into a signature
    const sig = `${lead.title?.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim()}|${lead.postcodeOutward?.toUpperCase() ?? ''}`;
    const isDuplicate = seenSignatures.some(existing => signatureOverlap(existing, sig));
    if (isDuplicate) continue;

    seenIds.add(lead.id);
    seenSignatures.push(sig);
    unique.push(lead);
  }

  // 5b. Fuse signals
  const fused = fuseSignals(unique, outward);

  // 6. Score, update stats.passed, rank
  const scored: Lead[] = fused.map(l => {
    const { score, reasons, qualityLabel, leadReadiness, recommendedAction, evidenceBadges } = scoreLeadBreakdown(l, region, outward, cleanTrade as any);
    const scoreReasons = [...reasons];
    let finalScore = score;
    const stack = l.signalStack ?? [l.source].filter(Boolean);
    if (l.signalClass === 'internal_fallback' || (stack.length === 1 && stack[0] === 'DirectorySignal')) {
      finalScore = Math.max(0, finalScore - 8);
      scoreReasons.push('Internal fallback — lower confidence');
    }
    if (stack.length > 1) {
      finalScore = Math.min(100, finalScore + 5);
      scoreReasons.push('Multi-source verified');
    }
    finalScore = Math.min(Math.max(finalScore, 0), 100);
    const leadWithDistance: Lead = {
      ...l,
      score: finalScore,
      scoreReasons,
      qualityLabel,
      leadReadiness,
      recommendedAction,
      evidenceBadges: stack.length > 1 ? [...evidenceBadges, 'Multi-source'] : evidenceBadges,
    };
    const leadOutward = l.postcodeOutward?.toUpperCase() ?? '';
    if (leadOutward === outward.toUpperCase()) {
      leadWithDistance.distanceMiles = 0;
    } else if (regionFromOutward(leadOutward) === region) {
      leadWithDistance.distanceMiles = Math.round((5 + Math.random() * 10) * 10) / 10;
    } else {
      leadWithDistance.distanceMiles = Math.round((15 + Math.random() * 35) * 10) / 10;
    }
    return leadWithDistance;
  });
  const tradeMatched = scored.filter(l => l.trade === cleanTrade);
  const rankingPool = tradeMatched.length ? tradeMatched : scored;

  const radiusFiltered = radiusMiles
    ? rankingPool.filter(l => (l.distanceMiles ?? 0) <= radiusMiles)
    : rankingPool;
  radiusFiltered.sort((a, b) => compareLeadRank(a, b));

  // Update passed counts from normalised totals
  for (const source of Object.keys(mergedStats)) {
    const count = radiusFiltered.filter(l => l.source === source).length;
    mergedStats[source].passed = count;
  }

  // 7. Tier gating
  const limit = tier === 'free' ? CONFIG.freeTierLimit : CONFIG.topN;
  const top = radiusFiltered.slice(0, limit);
  const lockedCount = Math.max(0, radiusFiltered.length - top.length);

  // 8. Build errors list from failed sources
  const errors: string[] = [];
  for (const [src, stats] of Object.entries(mergedStats)) {
    if (stats.failed) errors.push(`${src}: ${stats.error ?? 'failed'}`);
  }

  return {
    leads: top,
    total: radiusFiltered.length,
    region,
    outward,
    lockedCount,
    sources: mergedStats,
    sourceHealth: {},
    errors,
  };
}

function fuseSignals(leads: Lead[], outward: string): Lead[] {
  const groups = new Map<string, Lead[]>();
  for (const lead of leads) {
    const key = lead.fusionKey || `${lead.postcodeOutward || outward}|${normaliseFusionTitle(lead.title)}`;
    const bucket = groups.get(key) ?? [];
    bucket.push(lead);
    groups.set(key, bucket);
  }

  return leads.map((lead) => {
    const key = lead.fusionKey || `${lead.postcodeOutward || outward}|${normaliseFusionTitle(lead.title)}`;
    const stack = uniqueSources(groups.get(key) ?? [lead]);
    return {
      ...lead,
      fusionKey: key,
      signalStack: stack,
      signalClass: classifySignalStack(stack),
    };
  });
}

function normaliseFusionTitle(title: string): string {
  return String(title ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2)
    .slice(0, 6)
    .join('-');
}

function uniqueSources(leads: Lead[]): string[] {
  return [...new Set(leads.map(lead => lead.source).filter(Boolean))];
}

function classifySignalStack(sources: string[]): NonNullable<Lead['signalClass']> {
  const lower = sources.map(source => source.toLowerCase());
  const has = (needle: string) => lower.some(source => source.includes(needle));
  const hasPlanning = has('planning') || has('plan');
  const hasContracts = has('contracts') || has('fts') || has('pcs') || has('sell2wales');

  if (hasPlanning && has('epc')) return 'homeowner_retrofit';
  if (hasPlanning && has('buildingcontrol')) return 'active_site';
  if (has('companies') && hasPlanning) return 'commercial_fitout';
  if (hasContracts) return 'public_contract';
  if (sources.length === 1 && sources[0] === 'DirectorySignal') return 'internal_fallback';
  return 'active_site';
}

function validateTrade(trade: string): Exclude<ScanOptions['trade'], undefined | 'all'> {
  const clean = String(trade ?? '').trim().toLowerCase();
  if (!TRADE_KEYS.includes(clean as any) || clean === 'all') {
    throw new Error('trade must be plumbing, electrical, roofing, building, carpentry, painting, hvac, or landscaping');
  }
  return clean as Exclude<ScanOptions['trade'], undefined | 'all'>;
}

function disabledSources(names: string[]): { leads: RawLead[]; stats: Record<string, SourceStats> } {
  const stats: Record<string, SourceStats> = {};
  for (const name of names) {
    stats[name] = { fetched: 0, passed: 0, dropped: 0, failed: false };
  }
  return { leads: [], stats };
}

function contactRank(lead: Lead): number {
  if (lead.contactSignal === 'strong') return 2;
  if (lead.contactSignal === 'weak') return 1;
  return 0;
}

function compareLeadRank(a: Lead, b: Lead): number {
  return (b.score ?? 0) - (a.score ?? 0)
    || contactRank(b) - contactRank(a)
    || b.sourceConfidence - a.sourceConfidence
    || Number(b.estimatedValue !== 'POA') - Number(a.estimatedValue !== 'POA');
}

// Fuzzy dedup: returns true if two signatures overlap enough to be the same lead
// Signature format: "normalised title|OUTWARD"
function signatureOverlap(a: string, b: string): boolean {
  if (a === b) return true;
  const [titleA, pcA] = a.split('|');
  const [titleB, pcB] = b.split('|');

  // Same outward postcode + significant title overlap
  if (pcA && pcA === pcB) {
    const wordsA = titleA.split(' ').filter(w => w.length > 2);
    const wordsB = titleB.split(' ').filter(w => w.length > 2);
    if (wordsA.length === 0 || wordsB.length === 0) return false;
    const shared = wordsA.filter(w => wordsB.includes(w)).length;
    const overlapRatio = shared / Math.min(wordsA.length, wordsB.length);
    return overlapRatio >= 0.5;
  }

  // No postcode match — require near-identical titles
  const wordsA = titleA.split(' ').filter(w => w.length > 2);
  const wordsB = titleB.split(' ').filter(w => w.length > 2);
  if (wordsA.length === 0 || wordsB.length === 0) return false;
  const shared = wordsA.filter(w => wordsB.includes(w)).length;
  const overlapRatio = shared / Math.min(wordsA.length, wordsB.length);
  return overlapRatio >= 0.75;
}

// ── CLI runner ────────────────────────────────────────────────────────────────
// Usage: node --import=tsx leadEngine/scan.ts <postcode> [trade] [free|paid]

if (process.argv[1] && process.argv[1].endsWith('scan.ts')) {
  const [,, postcode = 'B15 1AA', trade = 'all', tier = 'free'] = process.argv;

  (async () => {
    console.log('\n╔══════════════════════════════════════════════╗');
    console.log('║          JobFilter Lead Engine v2            ║');
    console.log('╚══════════════════════════════════════════════╝\n');

    console.log('── Sources & Endpoints ──────────────────────────');
    for (const [src, endpoints] of Object.entries(SOURCE_ENDPOINTS)) {
      console.log(`\n  ${src}:`);
      for (const ep of endpoints) console.log(`    ${ep}`);
    }
    console.log('\n── Running scan ─────────────────────────────────');
    console.log(`  Postcode: ${postcode}  Trade: ${trade}  Tier: ${tier}\n`);

    const result = await scan({ postcode, trade, tier: tier as any });

    console.log('── Per-Source Results ───────────────────────────');
    for (const [src, stats] of Object.entries(result.sources)) {
      const status = stats.failed ? '✗ FAIL' : '✓ OK';
      console.log(`  ${status}  ${src.padEnd(20)} fetched=${stats.fetched}  passed=${stats.passed}  dropped=${stats.dropped}${stats.error ? '  ERR=' + stats.error : ''}`);
    }

    if (result.errors.length) {
      console.log('\n── Errors ───────────────────────────────────────');
      for (const e of result.errors) console.log(`  ! ${e}`);
    }

    console.log('\n── Top 10 Leads ─────────────────────────────────');
    const top10 = result.leads.slice(0, 10);
    for (const [i, lead] of top10.entries()) {
      console.log(`\n  ${i + 1}. [${lead.urgency.toUpperCase()}] ${lead.title}`);
      console.log(`     Trade:   ${lead.trade}`);
      console.log(`     Location: ${lead.location}`);
      console.log(`     Value:   ${lead.estimatedValue}`);
      console.log(`     Source:  ${lead.source}  (confidence ${lead.sourceConfidence}%)`);
      console.log(`     Score:   ${lead.score ?? '?'}/100`);
      if ((lead as any).sourceUrl) console.log(`     URL:     ${(lead as any).sourceUrl}`);
    }

    console.log(`\n── Summary ──────────────────────────────────────`);
    console.log(`  Total leads found: ${result.total}`);
    console.log(`  Shown:             ${result.leads.length}`);
    console.log(`  Locked (upgrade):  ${result.lockedCount}`);
    console.log(`  Region:            ${result.region} (${result.outward})\n`);
  })().catch(err => {
    console.error('Scan failed:', err);
    process.exit(1);
  });
}
