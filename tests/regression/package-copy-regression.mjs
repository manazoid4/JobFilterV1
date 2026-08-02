import fs from 'node:fs';
import assert from 'node:assert/strict';

const home = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');
const pricing = fs.readFileSync('src/pages/PricingPage.tsx', 'utf8');

// Homepage must describe the truthful public-opportunity qualification product.
for (const text of [
  'JobFilter scans current Find a Tender notices',
  'Every result remains a public opportunity that other suppliers may pursue',
  'SPEND BID TIME ON THE RIGHT OPPORTUNITIES',
]) {
  assert.ok(home.includes(text), `homepage missing: ${text}`);
}

// Pricing must sell qualification and workflow, not exclusive access to public notices.
for (const text of [
  '£39/mo',
  'Official tenders are public',
  'You pay for qualification, evidence and workflow',
  'Results vary by trade, area and timing',
]) {
  assert.ok(pricing.includes(text), `pricing missing: ${text}`);
}

// Primary package copy must not revive unproven scarcity or exclusivity claims.
assert.ok(!home.includes('Founding 30'), 'homepage still claims unproven founding scarcity');
assert.ok(!home.includes('locks forever'), 'homepage still claims a permanent price lock');
assert.ok(!pricing.includes('Exclusive territories'), 'pricing still claims exclusive public notice access');

// Pricing must not claim unenforced scan limits.
assert.ok(!pricing.includes('2 scans per week'), 'pricing still claims unenforced 2 scans per week');
assert.ok(!pricing.includes('2/week'), 'pricing table still claims unenforced 2/week');

console.log('package copy regression passed');
