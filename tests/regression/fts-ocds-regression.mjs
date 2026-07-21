import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { fetchFindATender } from '../../leadEngine/fetchers/contractsFetcher.ts';
import { normaliseAll } from '../../leadEngine/normaliser.ts';
import { scoreLeadBreakdown } from '../../leadEngine/scorer.ts';
import { SOURCE_REGISTRY } from '../../leadEngine/sourceConfig.ts';

const fixtureUrl = new URL('../fixtures/fts/', import.meta.url);
const page1 = JSON.parse(await readFile(new URL('page-1.json', fixtureUrl), 'utf8'));
const page2 = JSON.parse(await readFile(new URL('page-2.json', fixtureUrl), 'utf8'));
const authoritativeNext = page1.links.next;

const ftsSource = SOURCE_REGISTRY.find(source => source.key === 'FTS');
const cfSource = SOURCE_REGISTRY.find(source => source.key === 'ContractsFinder');
const planningSource = SOURCE_REGISTRY.find(source => source.key === 'PlanningData');
assert.equal(ftsSource?.readiness, 'live');
assert.equal(ftsSource?.defaultEnabled, true);
assert.equal(cfSource?.readiness, 'legacy');
assert.equal(cfSource?.defaultEnabled, false);
assert.equal(planningSource?.readiness, 'experimental');
assert.equal(planningSource?.defaultEnabled, false);

function fixtureFetch(calls) {
  return async (input, init = {}) => {
    const url = String(input);
    calls.push(url);
    init.signal?.throwIfAborted();
    const payload = new URL(url).searchParams.get('cursor') === 'page-2' ? page2 : page1;
    return new Response(JSON.stringify(payload), { status: 200, headers: { 'Content-Type': 'application/json' } });
  };
}

const fixedNow = new Date('2026-07-21T12:00:00Z');

{
  const calls = [];
  const result = await fetchFindATender('electrical', { fetchImpl: fixtureFetch(calls), useCache: false, now: fixedNow, maxPages: 5 });
  assert.equal(calls.length, 2, 'follows exactly one next page');
  assert.equal(calls[1], authoritativeNext, 'uses the FTS-provided full next URL, preserving cursor and frozen updatedTo');
  assert.equal(result.leads.length, 1, 'dedupes the repeated ocid and filters other trades/malformed releases');
  assert.equal(result.leads[0].rawBuyer, 'Northshire Council Procurement', 'resolves full buyer party details from buyer id');
  assert.deepEqual(result.leads[0].rawCpvCodes, ['45310000'], 'maps tender-level primary classification when items omit CPV');
  assert.equal(result.leads[0].rawPostcode, 'LS10 1AA', 'prefers delivery postcode over buyer postcode');
  assert.match(result.leads[0].rawLocation ?? '', /Leeds/);
  assert.equal(result.leads[0].rawValue, 450000);
  assert.equal(result.leads[0].rawPublished, '2026-07-20T09:15:00Z');
  assert.equal(result.leads[0].rawDeadline, '2026-08-14T12:00:00Z');
  assert.equal(result.leads[0].rawStage, 'tender');
  assert.equal(result.leads[0].sourceUrl, 'https://www.find-tender.service.gov.uk/Notice/068859-2026');
  assert.equal(result.stats.fetched, 7);
  assert.equal(result.stats.failed, false);

  const normalised = normaliseAll(result.leads, 'electrical');
  assert.equal(normalised.length, 1, 'current FTS fixture reaches normalisation');
  assert.equal(normalised[0].procurementStage, 'tender');
  const scored = scoreLeadBreakdown(normalised[0], 'Yorkshire and the Humber', 'LS1', 'electrical');
  assert.ok(Number.isFinite(scored.score), 'normalised FTS lead reaches scoring');
}

for (const [trade, expectedTitle] of [
  ['building', 'Building refurbishment works'],
  ['roofing', 'Responsive roofing repairs'],
]) {
  const result = await fetchFindATender(trade, { fetchImpl: fixtureFetch([]), useCache: false, now: fixedNow, maxPages: 2 });
  assert.ok(result.leads.some(lead => lead.rawTitle === expectedTitle), `${trade} CPV fixture maps through FTS`);
}

{
  const result = await fetchFindATender('building', { fetchImpl: fixtureFetch([]), useCache: false, now: fixedNow, maxPages: 2 });
  const titles = result.leads.map(lead => lead.rawTitle);
  assert.ok(titles.includes('Community hall building refurbishment'), 'text fallback admits a legitimate no-CPV building notice');
  assert.ok(!titles.includes('Care Board clinical maintenance services'), 'authoritative medical CPV blocks misleading building/maintenance text');
  assert.ok(result.leads.every(lead => lead.rawCpvCodes?.length === 0 || lead.rawCpvCodes.some(code => code.startsWith('45'))), 'every classified building result has a construction-works CPV');
}

{
  const calls = [];
  const result = await fetchFindATender('roofing', { fetchImpl: fixtureFetch(calls), useCache: false, now: fixedNow, maxPages: 1 });
  assert.equal(calls.length, 1, 'pagination is bounded by maxPages');
  assert.equal(result.leads.length, 0, 'does not read a later page beyond the bound');
}

{
  const result = await fetchFindATender('electrical', { fetchImpl: async () => new Response('upstream unavailable', { status: 503 }), useCache: false, now: fixedNow });
  assert.equal(result.leads.length, 0);
  assert.equal(result.stats.failed, true);
  assert.match(result.stats.error ?? '', /FTS HTTP 503/);
}

{
  const controller = new AbortController();
  controller.abort(new Error('caller cancelled'));
  const result = await fetchFindATender('electrical', { signal: controller.signal, fetchImpl: fixtureFetch([]), useCache: false, now: fixedNow });
  assert.equal(result.stats.failed, true, 'caller cancellation aborts the request safely');
  assert.match(result.stats.error ?? '', /caller cancelled/);
}

console.log(`FTS OCDS regression passed (${fileURLToPath(import.meta.url)})`);
