import assert from 'node:assert/strict';

const serverPostcode = await import('../server/utils/postcode.ts');
const leadPostcode = await import('../leadEngine/postcode.ts');

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

console.log('postcode filter regression passed');
