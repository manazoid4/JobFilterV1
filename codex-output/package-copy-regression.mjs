import fs from 'node:fs';
import assert from 'node:assert/strict';

const home = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');
const pricing = fs.readFileSync('src/pages/PricingPage.tsx', 'utf8');

for (const text of [
  'Letterhead Pack',
  'professional letterhead',
  'blueprint instructions',
  'printing and postage',
]) {
  assert.ok(home.includes(text), `homepage missing ${text}`);
}

for (const text of [
  'Highest',
  'Letterhead Pack',
  'Company letterhead',
  'Blueprint instructions',
  'Print + post included',
]) {
  assert.ok(pricing.includes(text), `pricing missing ${text}`);
}

console.log('package copy regression passed');
