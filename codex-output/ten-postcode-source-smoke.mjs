import assert from 'node:assert/strict';
import { scan } from '../leadEngine/scan.ts';

const cases = [
  ['B15 1AA', 'electrical'],
  ['SW17 0AA', 'plumbing'],
  ['M20 2AA', 'building'],
  ['L1 8JQ', 'plumbing'],
  ['CF14 3UZ', 'building'],
  ['G11 6AA', 'plumbing'],
  ['BS6 6AA', 'roofing'],
  ['NG7 2RD', 'electrical'],
  ['S10 2TN', 'roofing'],
  ['NE4 5AA', 'building'],
];

const summary = [];

for (const [postcode, trade] of cases) {
  const result = await scan({ postcode, trade, tier: 'free' });
  assert.ok(result.outward, `${postcode} must resolve outward code`);
  assert.ok(Array.isArray(result.leads), `${postcode} must return a leads array`);
  assert.ok(result.leads.length > 0, `${postcode} must return non-empty structured leads`);
  assert.ok(result.leads.length <= 5, `${postcode} must respect free tier limit`);

  for (const lead of result.leads) {
    for (const key of ['id', 'title', 'trade', 'location', 'postcodeOutward', 'estimatedValue', 'urgency', 'source', 'sourceConfidence', 'contactSignal', 'status']) {
      assert.ok(lead[key] !== undefined && lead[key] !== '', `${postcode} lead missing ${key}`);
    }
  }

  summary.push({
    postcode,
    trade,
    outward: result.outward,
    region: result.region,
    shown: result.leads.length,
    total: result.total,
    sources: Object.fromEntries(Object.entries(result.sources).map(([source, stats]) => [
      source,
      { fetched: stats.fetched, passed: stats.passed, failed: stats.failed },
    ])),
    errors: result.errors,
  });
}

console.log(JSON.stringify(summary, null, 2));
