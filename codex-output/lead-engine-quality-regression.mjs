import assert from 'node:assert/strict';

process.env.SOURCE_CF = 'false';
process.env.SOURCE_FTS = 'false';
process.env.SOURCE_PCS = 'false';
process.env.SOURCE_S2W = 'false';
process.env.SOURCE_CH = 'false';

const { scan } = await import('../leadEngine/scan.ts');

const requiredFields = [
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

async function rejectsBadInput(name, opts) {
  await assert.rejects(
    () => scan(opts),
    /valid UK postcode|trade must be/,
    name,
  );
}

await rejectsBadInput('rejects blank postcode', { postcode: '', trade: 'building', tier: 'paid' });
await rejectsBadInput('rejects fake text postcode', { postcode: 'NOT A POSTCODE', trade: 'building', tier: 'paid' });
await rejectsBadInput('rejects numeric junk postcode', { postcode: '12345', trade: 'plumbing', tier: 'paid' });
await rejectsBadInput('rejects unmapped postcode area', { postcode: 'ZZ99 9ZZ', trade: 'building', tier: 'paid' });
await rejectsBadInput('rejects junk trade', { postcode: 'B15 1AA', trade: 'crypto', tier: 'paid' });
await rejectsBadInput('rejects empty trade', { postcode: 'B15 1AA', trade: '', tier: 'paid' });
await rejectsBadInput('rejects broad all trade', { postcode: 'B15 1AA', trade: 'all', tier: 'paid' });

const scenarios = [
  { postcode: 'BL3 5AB', trade: 'electrical' },
  { postcode: 'DE3 0AA', trade: 'electrical' },
  { postcode: 'SW17 0AA', trade: 'electrical' },
  { postcode: 'B15 1AA', trade: 'building' },
  { postcode: 'NE8 1AB', trade: 'plumbing' },
];

for (const opts of scenarios) {
  const result = await scan({ ...opts, tier: 'paid' });
  assert.ok(result.leads.length > 0, `${opts.postcode}/${opts.trade} returned no leads`);

  for (const lead of result.leads) {
    const missing = requiredFields.filter((field) => lead[field] === undefined || lead[field] === null || lead[field] === '');
    assert.deepEqual(missing, [], `${lead.id} missing fixed schema fields`);
  }

  const top = result.leads[0];
  assert.equal(top.trade, opts.trade, `${opts.postcode}/${opts.trade} top lead must match requested trade`);
  assert.equal(top.contactSignal, 'strong', `${opts.postcode}/${opts.trade} top lead needs strong contact`);
  assert.ok(Number(top.score) >= 85, `${opts.postcode}/${opts.trade} top score must be pay-worthy`);
  assert.ok(/[£][\d,.]+(?:k|M)?(?:–[£]?[\d,.]+(?:k|M)?)?/i.test(top.estimatedValue), `${opts.postcode}/${opts.trade} top lead needs value`);
  assert.ok(top.postcodeOutward !== 'UK', `${opts.postcode}/${opts.trade} top lead needs local postcode signal`);
}

console.log('lead-engine quality regression passed');
