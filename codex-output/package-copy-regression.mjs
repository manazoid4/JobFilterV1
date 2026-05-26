import fs from 'node:fs';
import assert from 'node:assert/strict';

const home = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');
const pricing = fs.readFileSync('src/pages/PricingPage.tsx', 'utf8');

// Homepage must carry founding price-lock CTA and scan entry
for (const text of [
  'FOUNDING 30',
  '£39/MO',
  'CANCEL ANYTIME',
]) {
  assert.ok(home.includes(text), `homepage missing: ${text}`);
}

// Pricing must carry Gold tier, founding lock, and guarantee copy
for (const text of [
  '£39/mo',
  'WhatsApp Gold leads',
  'founding',
  'ONE JOB WORTH PRICING OR YOUR £39 BACK',
]) {
  assert.ok(pricing.includes(text), `pricing missing: ${text}`);
}

// Pricing must not claim unenforced scan limits
assert.ok(!pricing.includes('2 scans per week'), 'pricing still claims unenforced 2 scans per week');
assert.ok(!pricing.includes('2/week'), 'pricing table still claims unenforced 2/week');

console.log('package copy regression passed');
