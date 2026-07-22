import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {
  calculatePrecisionAt10,
  evaluateCoverageGate,
  readJsonWithSha256,
  replayFtsBenchmark,
  reviewSetCsv,
  writeBenchmarkArtifacts,
} from '../../scripts/lib/ftsBenchmark.ts';

const packagePath = path.resolve('tests/fixtures/fts/benchmark-90-day.json');
const labelsPath = path.resolve('tests/fixtures/fts/benchmark-labels-synthetic.json');
const input = await readJsonWithSha256(packagePath);
const labels = await readJsonWithSha256(labelsPath);
const report = await replayFtsBenchmark({
  packagePayload: input.payload,
  packageSource: packagePath,
  packageSha256: input.sha256,
  trade: 'electrical',
  asOf: new Date('2026-07-21T12:00:00Z'),
  postcode: 'B14',
  locality: 'West Midlands',
  labels: labels.payload,
});

assert.equal(report.input.releaseCount, 5);
assert.equal(report.input.releasesInWindow, 4, 'excludes releases outside the fixed 90-day window');
assert.equal(report.metrics.mappedTradeCandidates, 3, 'production mapper rejects the misleading non-electrical CPV');
assert.equal(report.metrics.localCandidateCount, 2, 'postcode and NUTS delivery evidence resolve locally');
assert.equal(report.metrics.localityResolvedCount, 2, 'buyer headquarters never count as delivery-locality evidence');

const postcodeRow = report.reviewSet.find(row => row.ocid === 'ocds-test-local-postcode');
assert.equal(postcodeRow?.postcodeOutward, 'B14');
assert.equal(postcodeRow?.localityResolution, 'delivery_postcode');
assert.ok(postcodeRow?.cpvEvidence.some(item => item.path.includes('tender.classification.id')));
assert.ok(postcodeRow?.localityEvidence.some(item => item.path.includes('tender.items[0].deliveryAddresses')));
assert.ok(postcodeRow?.scoreFactors.length, 'every score component carries provenance');

const nutsRow = report.reviewSet.find(row => row.ocid === 'ocds-test-local-nuts');
assert.equal(nutsRow?.localityResolution, 'delivery_nuts');
assert.match(nutsRow?.location ?? '', /West Midlands/i);
assert.equal(nutsRow?.localMatch, true);

const buyerOnlyRow = report.reviewSet.find(row => row.ocid === 'ocds-test-buyer-only');
assert.equal(buyerOnlyRow?.localityResolution, 'unresolved');
assert.equal(buyerOnlyRow?.postcodeOutward, 'UK');
assert.equal(buyerOnlyRow?.localMatch, false);
assert.deepEqual(buyerOnlyRow?.localityEvidence, []);

assert.equal(report.labels.externalEvidence, false, 'synthetic labels cannot satisfy external evidence');
assert.equal(report.metrics.precisionAt10, null, 'precision@10 remains unavailable without ten labelled ranked results');
assert.equal(report.gate.status, 'NO_GO');
assert.ok(report.gate.blockers.includes('external_label_provenance'));
assert.ok(report.gate.blockers.includes('minimum_human_labels'));

const noEvidenceGate = evaluateCoverageGate(null, '2026-07-21T12:00:00Z');
assert.equal(noEvidenceGate.status, 'NO_GO', 'missing benchmark evidence fails closed');
assert.ok(noEvidenceGate.blockers.includes('benchmark_report_present'));

const arithmeticRows = Array.from({ length: 10 }, (_, index) => ({
  localMatch: true,
  label: index < 8,
}));
assert.deepEqual(calculatePrecisionAt10(arithmeticRows), { fullyLabelled: true, value: 0.8 });

const csv = reviewSetCsv(report.reviewSet);
assert.match(csv, /cpvEvidence/);
assert.match(csv, /localityEvidence/);
assert.match(csv, /scoreFactors/);

const outputDirectory = await mkdtemp(path.join(os.tmpdir(), 'jobfilter-fts-benchmark-'));
await writeBenchmarkArtifacts(report, outputDirectory);
const persistedGate = JSON.parse(await readFile(path.join(outputDirectory, 'fts-coverage-gate.json'), 'utf8'));
assert.equal(persistedGate.status, 'NO_GO');

console.log('FTS benchmark and coverage gate regression passed');
