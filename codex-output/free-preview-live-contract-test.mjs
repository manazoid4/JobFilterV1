import assert from 'node:assert/strict';

const response = await fetch('http://localhost:3000/api/leads/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ postcode: 'SY111SG', trade: 'electrical', radiusMiles: 25 }),
});

assert.equal(response.ok, true, 'lead search request failed');
const payload = await response.json();
assert.equal(payload.ok, true, 'lead search payload not ok');
assert.ok(Array.isArray(payload.leads), 'leads must be an array');

for (const lead of payload.leads) {
  assert.equal(lead.buyer, '', 'free preview leaked buyer');
  assert.equal(lead.deadlineAt, '', 'free preview leaked deadline');
  assert.equal(lead.url, '', 'free preview leaked URL');
  assert.equal(lead.contactSignal, 'none', 'free preview leaked contact signal');
  assert.ok(!/£[\d,]+/.test(String(lead.estimatedValue)), 'free preview leaked exact value');
  assert.ok(!/Vestry House|Museum Fit-Out|London Borough/i.test(String(lead.title)), 'free preview leaked searchable title/buyer');
  assert.deepEqual(lead.reasons, ['Paid preview - unlock buyer, deadline, exact value, and action route']);
  assert.ok([80, 65, 50].includes(Number(lead.sourceConfidence)), 'free preview leaked exact source confidence');
  assert.ok([80, 55, 35].includes(Number(lead.score)), 'free preview leaked exact score');
}

console.log('free preview live contract test passed');
