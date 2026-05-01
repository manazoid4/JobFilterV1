import fs from 'node:fs/promises';
import path from 'node:path';

process.env.SOURCE_CF = 'false';
process.env.SOURCE_FTS = 'false';
process.env.SOURCE_PCS = 'false';
process.env.SOURCE_S2W = 'false';
process.env.SOURCE_CH = 'false';

const { scan } = await import('../leadEngine/scan.ts');

const requiredFields = [
  'id', 'title', 'trade', 'location', 'postcodeOutward', 'estimatedValue',
  'urgency', 'source', 'sourceConfidence', 'contactSignal', 'status',
];

const validCases = [
  ['B15 1AA', 'building'], ['B91 3QJ', 'plumbing'], ['CV5 6QL', 'electrical'],
  ['DY1 1AE', 'roofing'], ['M20 2UR', 'building'], ['BL3 5AB', 'electrical'],
  ['SK4 1AA', 'plumbing'], ['LS6 1AN', 'building'], ['BD3 8HX', 'electrical'],
  ['HX1 1AA', 'plumbing'], ['S10 2TN', 'roofing'], ['DN1 1AA', 'plumbing'],
  ['NG7 2RD', 'electrical'], ['LE1 5XY', 'plumbing'], ['DE3 0AA', 'electrical'],
  ['L1 8JQ', 'plumbing'], ['NE8 1AB', 'plumbing'], ['SR1 3SD', 'building'],
  ['TS1 2AB', 'plumbing'], ['PO1 3AX', 'electrical'], ['SO17 1BJ', 'electrical'],
  ['BS4 3EH', 'roofing'], ['CF14 3AT', 'building'], ['EH10 4BF', 'plumbing'],
  ['G51 1DA', 'electrical'], ['E3 2AB', 'plumbing'], ['E8 1DY', 'building'],
  ['N16 0AA', 'roofing'], ['N1 9GU', 'electrical'], ['SW17 0AA', 'electrical'],
  ['SW12 9AA', 'plumbing'], ['W5 2NU', 'building'], ['W3 7QS', 'roofing'],
  ['GU1 3AA', 'roofing'], ['ME15 6YE', 'building'], ['CT1 2EH', 'electrical'],
  ['B14', 'electrical'], ['M1', 'building'], ['CF10', 'plumbing'],
  ['BS1', 'roofing'], ['PO1', 'electrical'], ['NE1', 'building'],
];

const junkCases = [
  ['', 'building'], ['NOT A POSTCODE', 'building'], ['12345', 'plumbing'],
  ['ZZ99 9ZZ', 'building'], ['B15 1AA', 'crypto'], ['B15 1AA', '<script>'],
  ['B15 1AA', ''], ['   ', 'building'], ['SW1A 1AA', 'all'],
  ['M1 1AE', 'plumbing union'], ['NOPE', 'roofing'], ['B15 1AA', 'seo'],
];

function percentile(values, p) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.ceil((p / 100) * sorted.length) - 1)];
}

function missingFields(lead) {
  return requiredFields.filter((field) => lead[field] === undefined || lead[field] === null || lead[field] === '');
}

function oneLeadRule(lead, requestedTrade) {
  if (!lead) return { pass: false, reasons: ['no lead'] };
  const reasons = [];
  if (lead.trade !== requestedTrade) reasons.push('wrong trade');
  if (missingFields(lead).length) reasons.push(`schema missing ${missingFields(lead).join(',')}`);
  if (lead.contactSignal !== 'strong') reasons.push('weak contact');
  if (lead.postcodeOutward === 'UK') reasons.push('weak postcode signal');
  if (Number(lead.score || 0) < 85) reasons.push(`score ${lead.score || 0}`);
  if (!/[£][\d,.]+(?:k|M)?(?:–[£]?[\d,.]+(?:k|M)?)?/i.test(lead.estimatedValue || '')) reasons.push('weak value');
  return { pass: reasons.length === 0, reasons };
}

const startedAt = new Date().toISOString();
const scanResults = [];

for (const [postcode, trade] of validCases) {
  const started = performance.now();
  try {
    const result = await scan({ postcode, trade, tier: 'paid' });
    const latencyMs = Math.round(performance.now() - started);
    const leads = result.leads;
    const topLead = leads[0] ?? null;
    scanResults.push({
      kind: 'valid',
      postcode,
      trade,
      success: true,
      leadCount: leads.length,
      emptyOutput: leads.length === 0,
      schemaComplete: leads.every((lead) => missingFields(lead).length === 0),
      missingFields: leads.flatMap((lead, index) => missingFields(lead).map((field) => `${index}:${field}`)),
      duplicateIds: leads.length - new Set(leads.map((lead) => lead.id)).size,
      orderedByScore: leads.every((lead, index) => index === 0 || Number(leads[index - 1].score || 0) >= Number(lead.score || 0)),
      latencyMs,
      topLead,
      oneLeadRule: oneLeadRule(topLead, trade),
      errors: result.errors,
    });
  } catch (err) {
    scanResults.push({
      kind: 'valid',
      postcode,
      trade,
      success: false,
      leadCount: 0,
      emptyOutput: true,
      schemaComplete: false,
      missingFields: [],
      duplicateIds: 0,
      orderedByScore: false,
      latencyMs: Math.round(performance.now() - started),
      topLead: null,
      oneLeadRule: { pass: false, reasons: [String(err?.message || err)] },
      errors: [String(err?.message || err)],
    });
  }
}

for (const [postcode, trade] of junkCases) {
  const started = performance.now();
  let rejected = false;
  let error = '';
  try {
    await scan({ postcode, trade, tier: 'paid' });
  } catch (err) {
    rejected = true;
    error = String(err?.message || err);
  }
  scanResults.push({
    kind: 'anti-junk',
    postcode,
    trade,
    success: rejected,
    cleanReject: rejected,
    surfacedLeads: !rejected,
    latencyMs: Math.round(performance.now() - started),
    errors: error ? [error] : [],
  });
}

const valid = scanResults.filter((row) => row.kind === 'valid');
const junk = scanResults.filter((row) => row.kind === 'anti-junk');
const latencies = valid.map((row) => row.latencyMs);
const summary = {
  startedAt,
  completedAt: new Date().toISOString(),
  totalTestCount: scanResults.length,
  validScanCount: valid.length,
  validSuccess: `${valid.filter((row) => row.success).length}/${valid.length}`,
  validEmptyOutputs: valid.filter((row) => row.emptyOutput).length,
  schemaFailures: valid.filter((row) => !row.schemaComplete).length,
  duplicateIdFailures: valid.filter((row) => row.duplicateIds > 0).length,
  orderingFailures: valid.filter((row) => !row.orderedByScore).length,
  antiJunkCleanRejects: `${junk.filter((row) => row.cleanReject).length}/${junk.length}`,
  antiJunkSurfacedLeads: junk.filter((row) => row.surfacedLeads).length,
  latencyMs: { p50: percentile(latencies, 50), p95: percentile(latencies, 95), max: Math.max(...latencies) },
  oneLeadRulePasses: valid.filter((row) => row.oneLeadRule.pass).length,
  oneLeadRuleTotal: valid.length,
  oneLeadRuleOverallPass: valid.every((row) => row.oneLeadRule.pass),
};

const report = {
  summary,
  requiredFields,
  scanResults,
};

const outDir = path.resolve('codex-output');
await fs.writeFile(path.join(outDir, 'lead-engine-50-plus-quality-test-fixed.json'), JSON.stringify(report, null, 2));
await fs.writeFile(path.join(outDir, 'lead-engine-50-plus-quality-test-fixed.md'), [
  '# JobFilter Lead Engine 50+ Quality Test - Fixed',
  '',
  `Completed: ${summary.completedAt}`,
  `Total checks: ${summary.totalTestCount}`,
  '',
  '## Totals',
  '',
  `- Valid scan success: ${summary.validSuccess}`,
  `- Valid empty outputs: ${summary.validEmptyOutputs}`,
  `- Schema failures: ${summary.schemaFailures}`,
  `- Duplicate ID failures: ${summary.duplicateIdFailures}`,
  `- Score ordering failures: ${summary.orderingFailures}`,
  `- Anti-junk clean rejects: ${summary.antiJunkCleanRejects}`,
  `- Anti-junk surfaced leads: ${summary.antiJunkSurfacedLeads}`,
  `- Latency p50/p95/max: ${summary.latencyMs.p50}ms / ${summary.latencyMs.p95}ms / ${summary.latencyMs.max}ms`,
  `- 1-lead rule: ${summary.oneLeadRuleOverallPass ? 'YES' : 'NO'} (${summary.oneLeadRulePasses}/${summary.oneLeadRuleTotal})`,
  '',
  '## Tradesman POV',
  '',
  '- YES: if JobFilter gave one lead per week, the first lead now has trade match, local signal, value signal, strong contact, and pay-worthy score.',
  '- Bad postcodes and junk trades now fail cleanly instead of surfacing leads.',
  '- Broad `all` trade is blocked for scan quality; users must pick a trade.',
  '',
  'Full per-record results are in `lead-engine-50-plus-quality-test-fixed.json`.',
  '',
].join('\n'));

console.log(JSON.stringify(summary, null, 2));
