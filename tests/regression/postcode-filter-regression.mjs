import assert from 'node:assert/strict';

const serverPostcode = await import('../../server/utils/postcode.ts');
const leadPostcode = await import('../../leadEngine/postcode.ts');
const { isLeadWithinRadius } = await import('../../leadEngine/scan.ts');

const cases = [
  ['B14 7QH', 'B14', 'West Midlands'],
  ['B147QH', 'B14', 'West Midlands'],
  ['B10', 'B10', 'West Midlands'],
  ['L10', 'L10', 'North West'],
  ['SY111SG', 'SY11', 'Wales'],
  ['SY11', 'SY11', 'Wales'],
  ['SW17', 'SW17', 'London'],
];

for (const [input, outward, region] of cases) {
  const parsed = serverPostcode.parseUkPostcode(input);
  assert.equal(parsed.outward, outward, `${input} server outward`);
  assert.equal(parsed.region, region, `${input} server region`);
  assert.equal(leadPostcode.assertValidPostcodeInput(input), outward, `${input} lead outward`);
  assert.equal(leadPostcode.getOutward(input), outward, `${input} getOutward`);
}

for (const bad of ['', '12345', 'NOTREAL', 'X10', 'ZZ99 9ZZ']) {
  assert.throws(() => serverPostcode.parseUkPostcode(bad), /valid UK postcode|required/);
  assert.throws(() => leadPostcode.assertValidPostcodeInput(bad), /valid UK postcode|required/);
}

assert.equal(isLeadWithinRadius({ postcodeOutward: 'B14', distanceMiles: 0 }, 'B14', 25), true, 'exact outward is local');
assert.equal(isLeadWithinRadius({ postcodeOutward: 'B10', distanceMiles: 8.5 }, 'B14', 25), true, 'known in-radius distance passes');
assert.equal(isLeadWithinRadius({ postcodeOutward: 'N22', distanceMiles: 103 }, 'B14', 25), false, 'known out-of-radius distance is excluded');
assert.equal(isLeadWithinRadius({ postcodeOutward: 'PA14' }, 'B14', 25), false, 'unknown distance must not be treated as zero');
assert.equal(isLeadWithinRadius({ postcodeOutward: 'B14' }, 'B14', 25), true, 'exact outward remains eligible when distance is unavailable');

const outwardCoordinates = await leadPostcode.lookupOutwardCoordinates('B14', {
  useCache: false,
  fetchImpl: async (input) => {
    assert.equal(String(input), 'https://api.postcodes.io/outcodes/B14');
    return new Response(JSON.stringify({ status: 200, result: { latitude: 52.41, longitude: -1.89 } }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  },
});
assert.deepEqual(outwardCoordinates, { latitude: 52.41, longitude: -1.89 }, 'outward centroid mapping is deterministic');

console.log('postcode filter regression passed');
