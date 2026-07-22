import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtemp, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const outputDirectory = await mkdtemp(path.join(os.tmpdir(), 'jobfilter-fts-benchmark-'));
const tsx = [process.execPath, ['node_modules/tsx/dist/cli.mjs']];

execFileSync(tsx[0], [
  ...tsx[1],
  'scripts/fts-benchmark.ts',
  '--input',
  'tests/fixtures/fts/benchmark-90-day.json',
  '--trade',
  'electrical',
  '--postcode',
  'B14',
  '--locality',
  'West Midlands',
  '--labels',
  'tests/fixtures/fts/benchmark-labels-synthetic.json',
  '--as-of',
  '2026-07-21T12:00:00Z',
  '--out-dir',
  outputDirectory,
], { stdio: 'pipe' });

const reportPath = path.join(outputDirectory, 'fts-review-set.json');
const report = JSON.parse(await readFile(reportPath, 'utf8'));
assert.equal(report.input.releaseCount, 5);
assert.equal(report.input.releasesInWindow, 4, 'excludes releases outside the fixed 90-day window');
assert.equal(report.metrics.mappedTradeCandidates, 3, 'production mapper rejects the misleading non-electrical CPV');
assert.equal(report.metrics.localCandidateCount, 2, 'postcode and NUTS delivery evidence resolve locally');
assert.equal(report.metrics.localityResolvedCount, 2, 'buyer headquarters never count as delivery-locality evidence');

const postcodeRow = report.reviewSet.find((row) => row.ocid === 'ocds-test-local-postcode');
assert.equal(postcodeRow?.postcodeOutward, 'B14');
assert.equal(postcodeRow?.localityResolution, 'delivery_postcode');
assert.ok(postcodeRow?.cpvEvidence.some((item) => item.path.includes('tender.classification.id')));
assert.ok(postcodeRow?.localityEvidence.some((item) => item.path.includes('tender.items[0].deliveryAddresses')));
assert.ok(postcodeRow?.scoreFactors.length, 'every score component carries provenance');

const buyerOnlyRow = report.reviewSet.find((row) => row.ocid === 'ocds-test-buyer-only');
assert.equal(buyerOnlyRow?.localityResolution, 'unresolved');
assert.equal(buyerOnlyRow?.postcodeOutward, 'UK');
assert.equal(buyerOnlyRow?.localMatch, false);
assert.deepEqual(buyerOnlyRow?.localityEvidence, []);

assert.equal(report.labels.externalEvidence, false, 'synthetic labels cannot satisfy external evidence');
assert.equal(report.metrics.precisionAt10, null, 'precision@10 remains unavailable without ten labelled ranked results');
assert.equal(report.gate.status, 'NO_GO');
assert.ok(report.gate.blockers.includes('external_label_provenance'));
assert.ok(report.gate.blockers.includes('minimum_human_labels'));

const gateResult = spawnSync(tsx[0], [
  ...tsx[1],
  'scripts/fts-coverage-gate.ts',
  '--report',
  reportPath,
], { encoding: 'utf8' });
assert.equal(gateResult.status, 1, 'insufficient benchmark evidence must fail the release gate');
const gate = JSON.parse(gateResult.stdout);
assert.equal(gate.status, 'NO_GO');
assert.ok(gate.blockers.includes('external_label_provenance'));

const missingGate = spawnSync(tsx[0], [
  ...tsx[1],
  'scripts/fts-coverage-gate.ts',
], { encoding: 'utf8' });
assert.equal(missingGate.status, 1, 'missing benchmark evidence must fail closed');
assert.ok(JSON.parse(missingGate.stdout).blockers.includes('benchmark_report_present'));

console.log('FTS benchmark and coverage gate regression passed');
