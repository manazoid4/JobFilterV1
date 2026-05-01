const BASE_URL = process.env.JOBFILTER_BASE_URL || 'http://localhost:3000';

const requiredLeadFields = [
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

const scanCases = [
  ['B14 7QH', 'electrical', 25],
  ['B1 1AA', 'building', 25],
  ['M1 1AE', 'roofing', 25],
  ['M14 5PX', 'plumbing', 50],
  ['SW1A 1AA', 'electrical', 25],
  ['E1 6AN', 'building', 25],
  ['N1 9GU', 'roofing', 50],
  ['LS1 1UR', 'plumbing', 25],
  ['NE1 4LP', 'electrical', 50],
  ['BS1 5TR', 'building', 25],
  ['CF10 1EP', 'roofing', 100],
  ['EH1 1YZ', 'plumbing', 100],
  ['G1 1XW', 'electrical', 100],
  ['BT1 5GS', 'building', 100],
  ['L1 8JQ', 'roofing', 25],
  ['S1 2HE', 'plumbing', 50],
  ['NG1 5FS', 'electrical', 25],
  ['CB2 1TN', 'building', 50],
  ['OX1 1AA', 'roofing', 100],
  ['EX1 1AE', 'plumbing', 100],
  ['B14 7QH', 'electrical', 10],
  ['B14 7QH', 'electrical', 50],
  ['B14 7QH', 'electrical', 100],
  ['B1 1AA', 'building', 100],
  ['M1 1AE', 'roofing', 100],
  ['SW1A 1AA', 'plumbing', 100],
  ['LS1 1UR', 'building', 100],
  ['CF10 1EP', 'electrical', 100],
];

const junkCases = [
  [{ postcode: '', trade: 'electrical', radiusMiles: 25 }, 400],
  [{ postcode: 'NOTREAL', trade: 'electrical', radiusMiles: 25 }, 400],
  [{ postcode: 'B14 7QH', trade: 'seo', radiusMiles: 25 }, 422],
  [{ postcode: 'B14 7QH', trade: '<script>', radiusMiles: 25 }, 422],
  [{ postcode: 'B14 7QH', trade: 'electrical', radiusMiles: 0 }, 422],
  [{ postcode: 'B14 7QH', trade: 'electrical', radiusMiles: 500 }, 422],
  [{ postcode: 'B14 7QH', trade: 'electrical', radiusMiles: 'wide' }, 422],
  [{ postcode: '<b>B14</b>', trade: 'plumbing', radiusMiles: 25 }, 400],
  [{ postcode: 'SW1A 1AA', trade: 'plumbing', radiusMiles: -1 }, 422],
  [{ postcode: 'M1 1AE', trade: 'plumbing union', radiusMiles: 25 }, 422],
];

const pageCases = [
  ['/', 'Find The Jobs Worth Pricing'],
  ['/find-jobs', 'FIND JOBS WORTH PRICING'],
  ['/pricing', '£49/MONTH'],
  ['/free-tools', 'FREE'],
  ['/vantage', 'Vantage'],
  ['/vicinity', 'Vicinity'],
  ['/codex', 'Codex'],
  ['/my-link', 'FILTER'],
  ['/health', 'SYSTEM ONLINE'],
];

function percentile(values, p) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.ceil((p / 100) * sorted.length) - 1);
  return sorted[index];
}

async function timedFetch(path, options = {}) {
  const started = performance.now();
  let response;
  let text = '';
  let json = null;
  let error = '';
  try {
    response = await fetch(`${BASE_URL}${path}`, options);
    text = await response.text();
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = null;
    }
  } catch (err) {
    error = String(err?.message || err);
  }
  return {
    status: response?.status || 0,
    ok: Boolean(response?.ok),
    ms: Math.round(performance.now() - started),
    contentType: response?.headers?.get('content-type') || '',
    text,
    json,
    error,
  };
}

function leadSchemaMisses(lead) {
  return requiredLeadFields.filter((field) => {
    const value = lead?.[field];
    return value === undefined || value === null || value === '';
  });
}

function oneLeadVerdict(leads) {
  const top = leads[0];
  if (!top) return { pass: false, reason: 'No top lead.' };
  const misses = leadSchemaMisses(top);
  const score = Number(top.score || 0);
  const confidence = Number(top.sourceConfidence || 0);
  const valueText = String(top.estimatedValue || '').toLowerCase();
  const hasMoney = /£|gbp|k|million|contract|tender|[1-9]/i.test(valueText);
  const clearAction = Boolean(top.title && top.location && top.trade && top.source && top.contactSignal !== 'none');
  const pass = misses.length === 0 && score >= 55 && confidence >= 70 && hasMoney && clearAction;
  return {
    pass,
    reason: pass
      ? 'YES: one strong weekly lead has clear trade, location, value signal, source confidence, and action path.'
      : `NO: top lead is not strong enough (${[
          misses.length ? `missing ${misses.join(',')}` : '',
          score < 55 ? `score ${score}` : '',
          confidence < 70 ? `confidence ${confidence}` : '',
          !hasMoney ? 'weak value signal' : '',
          !clearAction ? 'weak action detail' : '',
        ].filter(Boolean).join('; ')}).`,
    topLead: top,
  };
}

const results = {
  startedAt: new Date().toISOString(),
  baseUrl: BASE_URL,
  scans: [],
  junk: [],
  pages: [],
  waitlist: [],
  summary: {},
};

for (const [postcode, trade, radiusMiles] of scanCases) {
  const response = await timedFetch('/api/leads/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ postcode, trade, radiusMiles }),
  });
  const leads = Array.isArray(response.json?.leads) ? response.json.leads : [];
  results.scans.push({
    postcode,
    trade,
    radiusMiles,
    status: response.status,
    ok: response.ok && response.json?.ok === true,
    ms: response.ms,
    count: response.json?.count ?? 0,
    empty: leads.length === 0,
    schemaMisses: leads.flatMap((lead, index) => leadSchemaMisses(lead).map((field) => `${index}:${field}`)),
    duplicateIds: leads.length - new Set(leads.map((lead) => lead.id)).size,
    ordered: leads.every((lead, index) => index === 0 || Number(leads[index - 1].score || 0) >= Number(lead.score || 0)),
    oneLead: oneLeadVerdict(leads),
    errors: response.json?.errors || (response.error ? [response.error] : []),
  });
}

for (const [payload, expectedStatus] of junkCases) {
  const response = await timedFetch('/api/leads/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  results.junk.push({
    payload,
    expectedStatus,
    status: response.status,
    pass: response.status === expectedStatus && response.json?.ok === false && Array.isArray(response.json?.errors),
    ms: response.ms,
    errors: response.json?.errors || (response.error ? [response.error] : []),
  });
}

for (const [path, expectedText] of pageCases) {
  const response = await timedFetch(path);
  results.pages.push({
    path,
    status: response.status,
    pass: response.ok && response.text.includes(expectedText),
    ms: response.ms,
    expectedText,
  });
}

for (const payload of [
  { name: '', trade: 'Electrician', contact: '', source: 'codex-test-empty' },
  { name: 'Codex Test', trade: 'Electrician', contact: '', source: 'codex-test-missing-contact' },
  { name: 'Codex Test', trade: 'Roofer', contact: `codex-test-${Date.now()}@example.com`, source: 'codex-test-valid' },
]) {
  const response = await timedFetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const shouldPass = Boolean(payload.name && payload.trade && payload.contact);
  results.waitlist.push({
    source: payload.source,
    status: response.status,
    pass: shouldPass ? response.ok && response.json?.ok === true : response.status === 422 && response.json?.ok === false,
    ms: response.ms,
    stored: response.json?.stored,
    error: response.json?.error || response.error,
  });
}

const scanLatencies = results.scans.map((item) => item.ms);
const validScanPasses = results.scans.filter((item) => item.ok && !item.empty && item.schemaMisses.length === 0 && item.duplicateIds === 0 && item.ordered).length;
const oneLeadPasses = results.scans.filter((item) => item.oneLead.pass).length;

results.summary = {
  totalTests: results.scans.length + results.junk.length + results.pages.length + results.waitlist.length,
  scanTests: results.scans.length,
  validScanPasses,
  validScanFailures: results.scans.length - validScanPasses,
  emptyOutputs: results.scans.filter((item) => item.empty).length,
  schemaFailures: results.scans.filter((item) => item.schemaMisses.length).length,
  duplicateFailures: results.scans.filter((item) => item.duplicateIds).length,
  orderingFailures: results.scans.filter((item) => !item.ordered).length,
  junkTests: results.junk.length,
  junkPasses: results.junk.filter((item) => item.pass).length,
  pageTests: results.pages.length,
  pagePasses: results.pages.filter((item) => item.pass).length,
  waitlistTests: results.waitlist.length,
  waitlistPasses: results.waitlist.filter((item) => item.pass).length,
  p50Ms: percentile(scanLatencies, 50),
  p95Ms: percentile(scanLatencies, 95),
  oneLeadPasses,
  oneLeadRule: oneLeadPasses >= Math.ceil(results.scans.length * 0.8) ? 'YES' : 'NO',
  endedAt: new Date().toISOString(),
};

console.log(JSON.stringify(results, null, 2));
