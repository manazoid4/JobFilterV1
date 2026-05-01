import { writeFile } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';
import { scan } from '../leadEngine/scan.ts';

const REQUIRED_FIELDS = [
  'id',
  'title',
  'trade',
  'location',
  'postcodeOutward',
  'estimatedValue',
  'urgency',
  'source',
  'sourceConfidence',
  'contactSignal',
  'status',
];

const trades = [
  'building',
  'plumbing',
  'electrical',
  'roofing',
  'carpentry',
  'painting',
  'hvac',
  'landscaping',
  'all',
];

const postcodes = [
  'B15 1AA', 'B1', 'B91 3QJ', 'CV5 6QL', 'DY1 1AE', 'WV3 0SR', 'WS1 1DA', 'M20 2UR', 'M1 1AE', 'BL3 5AB',
  'SK4 1AA', 'OL1 1UT', 'WN1 1AA', 'LS1 1UR', 'LS6 1AN', 'BD3 8HX', 'HX1 1AA', 'WF1 1AA', 'HD4 5AB', 'S1 2HE',
  'S6 3TA', 'S10 2TN', 'DN1 1AA', 'NG1 5FS', 'NG7 2RD', 'LE1 5XY', 'LE2 1AA', 'DE1 2FS', 'DE22 3WT', 'L1 8JQ',
  'L15 3JR', 'CH49 0AB', 'NE1 4LP', 'NE8 1AB', 'SR1 3SD', 'SR4 6AB', 'TS1 1AA', 'TS18 1AA', 'EH1 1BB', 'EH6 6QQ',
  'G1 1AA', 'G11 6AA', 'CF10 1EP', 'CF14 3AT', 'BS1 4ST', 'BS6 5AA', 'SO14 7DW', 'SO17 1BJ', 'PO1 2AL', 'PO5 2AA',
  'GU1 3AA', 'GU21 6AA', 'ME15 6YE', 'CT1 2EH', 'N1 1AA', 'N10 3AA', 'NW3 1AA', 'NW6 4AA', 'E3 2AA', 'E8 1AA',
  'E15 1AA', 'SE13 5AA', 'SE15 4AA', 'SW4 7AA', 'SW17 0AA', 'W5 2AA', 'W6 9AA', 'UB1 1AA', 'WC1A 1AA', 'EC1A 1BB',
  'BR1 1AA', 'CR0 1AA', 'KT1 1AA', 'TW1 1AA', 'HA1 1AA', 'WD17 1AA', 'AL1 1AA', 'HP1 1AA', 'OX1 1AA', 'RG1 1AA',
  'MK9 1AA', 'NN1 1AA', 'CB1 1AA', 'PE1 1AA', 'IP1 1AA', 'NR1 1AA', 'CO1 1AA', 'CM1 1AA', 'SS1 1AA', 'TN1 1AA',
  'BN1 1AA', 'BH1 1AA', 'DT1 1AA', 'EX1 1AA', 'PL1 1AA', 'TR1 1AA', 'TQ1 1AA', 'GL1 1AA', 'SN1 1AA', 'BA1 1AA',
  'TA1 1AA', 'SP1 1AA', 'WR1 1AA', 'HR1 1AA', 'ST1 1AA', 'SY1 1AA', 'TF1 1AA', 'LN1 1AA', 'HU1 1AA', 'YO1 1AA',
  'HG1 1AA', 'DL1 1AA', 'DH1 1AA', 'CA1 1AA', 'LA1 1AA', 'PR1 1AA', 'FY1 1AA', 'WA1 1AA', 'CW1 1AA', 'LL11 1AA',
  'SA1 1AA', 'NP20 1AA', 'LD1 5AA', 'AB10 1AA', 'DD1 1AA', 'FK1 1AA', 'KY1 1AA', 'PH1 1AA', 'IV1 1AA', 'KA1 1AA',
  'PA1 1AA', 'ML1 1AA', 'DG1 1AA', 'TD1 1AA', 'BT1 1AA', 'JE2 3AA', 'GY1 1AA', 'ZE1 0AA', 'HS1 2AA', 'KW1 4AA',
];

const cases = postcodes.slice(0, 150).map((postcode, index) => ({
  index: index + 1,
  postcode,
  trade: trades[index % trades.length],
}));

const concurrency = Number(process.env.LEAD_ENGINE_TEST_CONCURRENCY ?? 12);
const startedAt = new Date().toISOString();

function percentile(values, pct) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = Math.min(sorted.length - 1, Math.ceil((pct / 100) * sorted.length) - 1);
  return sorted[idx];
}

function schemaProblems(leads) {
  const missing = new Set();
  for (const lead of leads) {
    for (const field of REQUIRED_FIELDS) {
      const value = lead?.[field];
      if (value === undefined || value === null || value === '') missing.add(field);
    }
  }
  return [...missing];
}

function detectInternalDataset(result) {
  const stat = result?.sources?.DirectorySignal;
  return Boolean((stat && stat.fetched > 0) || result?.leads?.some((lead) => lead.source === 'DirectorySignal'));
}

function sourceSummary(result) {
  return Object.fromEntries(Object.entries(result?.sources ?? {}).map(([name, stats]) => [
    name,
    {
      fetched: stats.fetched,
      passed: stats.passed,
      dropped: stats.dropped,
      failed: stats.failed,
      error: stats.error ?? '',
    },
  ]));
}

async function runOne(testCase) {
  const start = performance.now();
  try {
    const result = await scan({ postcode: testCase.postcode, trade: testCase.trade, tier: 'paid' });
    const latencyMs = Math.round(performance.now() - start);
    const missingFields = schemaProblems(result.leads);
    return {
      ...testCase,
      success: true,
      leadCount: result.leads.length,
      totalBeforeTierLimit: result.total,
      internalDatasetUsed: detectInternalDataset(result),
      latencyMs,
      schemaComplete: missingFields.length === 0,
      missingFields,
      outward: result.outward,
      region: result.region,
      lockedCount: result.lockedCount,
      sourceFailures: Object.entries(result.sources)
        .filter(([, stats]) => stats.failed)
        .map(([name, stats]) => `${name}: ${stats.error ?? 'failed'}`),
      errors: result.errors,
      sources: sourceSummary(result),
    };
  } catch (error) {
    const latencyMs = Math.round(performance.now() - start);
    return {
      ...testCase,
      success: false,
      leadCount: 0,
      totalBeforeTierLimit: 0,
      internalDatasetUsed: false,
      latencyMs,
      schemaComplete: false,
      missingFields: REQUIRED_FIELDS,
      outward: '',
      region: '',
      lockedCount: 0,
      sourceFailures: [],
      errors: [String(error?.stack ?? error?.message ?? error)],
      sources: {},
    };
  }
}

async function runPool(items, workerCount) {
  const results = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const current = cursor++;
      results[current] = await runOne(items[current]);
      process.stderr.write(`completed ${current + 1}/${items.length}\n`);
    }
  }
  await Promise.all(Array.from({ length: workerCount }, worker));
  return results;
}

const results = await runPool(cases, concurrency);
const completedAt = new Date().toISOString();
const latencies = results.map((r) => r.latencyMs);
const sourceProblemCounts = new Map();
for (const result of results) {
  for (const failure of result.sourceFailures) {
    const key = failure.split(' — ')[0].slice(0, 160);
    sourceProblemCounts.set(key, (sourceProblemCounts.get(key) ?? 0) + 1);
  }
  for (const error of result.errors ?? []) {
    const key = String(error).split(' — ')[0].slice(0, 160);
    sourceProblemCounts.set(key, (sourceProblemCounts.get(key) ?? 0) + 1);
  }
  if (!result.schemaComplete) {
    const key = `Schema missing: ${result.missingFields.join(', ')}`;
    sourceProblemCounts.set(key, (sourceProblemCounts.get(key) ?? 0) + 1);
  }
}

const summary = {
  startedAt,
  completedAt,
  recordCount: results.length,
  concurrency,
  successCount: results.filter((r) => r.success).length,
  failureCount: results.filter((r) => !r.success).length,
  successRate: Number((results.filter((r) => r.success).length / results.length * 100).toFixed(2)),
  emptyOutputs: results.filter((r) => r.success && r.leadCount === 0).length,
  schemaFailures: results.filter((r) => !r.schemaComplete).length,
  internalDatasetCount: results.filter((r) => r.internalDatasetUsed).length,
  fallbackCount: results.filter((r) => r.internalDatasetUsed).length,
  latencyMs: {
    min: Math.min(...latencies),
    p50: percentile(latencies, 50),
    p95: percentile(latencies, 95),
    max: Math.max(...latencies),
  },
  topRecurringProblems: [...sourceProblemCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([problem, count]) => ({ problem, count })),
};

const payload = {
  summary,
  requiredFields: REQUIRED_FIELDS,
  results,
};

await writeFile(
  'codex-output/lead-engine-150-postcode-test-results.json',
  JSON.stringify(payload, null, 2),
);

const md = [
  '# Lead Engine 150 Postcode Test',
  '',
  `Started: ${startedAt}`,
  `Completed: ${completedAt}`,
  `Records: ${summary.recordCount}`,
  `Concurrency: ${summary.concurrency}`,
  '',
  '## Headline',
  '',
  `- Success rate: ${summary.successRate}% (${summary.successCount}/${summary.recordCount})`,
  `- Empty outputs: ${summary.emptyOutputs}`,
  `- Schema failures: ${summary.schemaFailures}`,
  `- Internal dataset/fallback used: ${summary.internalDatasetCount}`,
  `- Latency: p50 ${summary.latencyMs.p50}ms, p95 ${summary.latencyMs.p95}ms, max ${summary.latencyMs.max}ms`,
  '',
  '## Top Recurring Problems',
  '',
  ...(summary.topRecurringProblems.length
    ? summary.topRecurringProblems.map((p) => `- ${p.count}x ${p.problem}`)
    : ['- None']),
  '',
  '## Per-Record Results',
  '',
  '| # | Postcode | Trade | OK | Leads | Internal Dataset | Latency ms | Schema | Errors |',
  '| - | - | - | - | -: | - | -: | - | - |',
  ...results.map((r) => `| ${r.index} | ${r.postcode} | ${r.trade} | ${r.success ? 'yes' : 'no'} | ${r.leadCount} | ${r.internalDatasetUsed ? 'yes' : 'no'} | ${r.latencyMs} | ${r.schemaComplete ? 'complete' : r.missingFields.join(', ')} | ${(r.errors ?? []).join('; ').replace(/\|/g, '/').slice(0, 180)} |`),
  '',
  'Full machine-readable source stats are in `lead-engine-150-postcode-test-results.json`.',
  '',
].join('\n');

await writeFile('codex-output/lead-engine-150-postcode-test-report.md', md);
console.log(JSON.stringify(summary, null, 2));
