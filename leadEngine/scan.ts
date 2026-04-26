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

import type { Lead, ScanResult, SourceStats } from './types';
import { CONFIG } from './config';
import { lookupPostcode } from './postcode';
import { contractsFetcher } from './fetchers/contractsFetcher';
import { planningDataFetcher } from './fetchers/planningDataFetcher';
import { directorySignalFetcher } from './fetchers/directorySignalFetcher';
import { companiesHouseFetcher } from './fetchers/companiesHouseFetcher';
import { normaliseAll } from './normaliser';
import { scoreLeadBreakdown } from './scorer';

// Endpoint registry — printed in diagnostics
export const SOURCE_ENDPOINTS: Record<string, string[]> = {
  ContractsFinder: [
    'GET  https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search',
  ],
  FTS: [
    'GET  https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages',
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
};

export interface ScanOptions {
  postcode: string;
  trade?: string;
  tier?: 'free' | 'paid';
}

export async function scan(opts: ScanOptions): Promise<ScanResult> {
  const { postcode, trade = 'all', tier = 'free' } = opts;

  // 1. Resolve postcode
  const pcInfo = await lookupPostcode(postcode);
  const { outward, region } = pcInfo;

  // 2. Run all sources concurrently — failures are caught internally
  const [cfResult, planningResult, chResult] = await Promise.allSettled([
    contractsFetcher(trade),
    planningDataFetcher(outward, region, trade, pcInfo.latitude, pcInfo.longitude),
    companiesHouseFetcher(region, trade, outward),
  ]);

  const dirResult = directorySignalFetcher(region, trade, outward); // sync

  // 3. Collect raw leads + merge stats
  const allRaw = [
    ...(cfResult.status === 'fulfilled' ? cfResult.value.leads : []),
    ...(planningResult.status === 'fulfilled' ? planningResult.value.leads : []),
    ...(chResult.status === 'fulfilled' ? chResult.value.leads : []),
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

  Object.assign(mergedStats, dirResult.stats);

  // 4. Normalise
  const normalised: Lead[] = normaliseAll(allRaw, trade);

  // 5. Deduplicate by id
  const seen = new Set<string>();
  const unique: Lead[] = [];
  for (const lead of normalised) {
    if (!seen.has(lead.id)) {
      seen.add(lead.id);
      unique.push(lead);
    }
  }

  // 6. Score, update stats.passed, rank
  const scored: Lead[] = unique.map(l => {
    const { score, reasons } = scoreLeadBreakdown(l, region, outward);
    return { ...l, score, scoreReasons: reasons };
  });
  scored.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  // Update passed counts from normalised totals
  for (const source of Object.keys(mergedStats)) {
    const count = scored.filter(l => l.source === source).length;
    mergedStats[source].passed = count;
  }

  // 7. Tier gating
  const limit = tier === 'free' ? CONFIG.freeTierLimit : CONFIG.topN;
  const top = scored.slice(0, limit);
  const lockedCount = Math.max(0, scored.length - top.length);

  // 8. Build errors list from failed sources
  const errors: string[] = [];
  for (const [src, stats] of Object.entries(mergedStats)) {
    if (stats.failed) errors.push(`${src}: ${stats.error ?? 'failed'}`);
  }

  return {
    leads: top,
    total: scored.length,
    region,
    outward,
    lockedCount,
    sources: mergedStats,
    errors,
  };
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
