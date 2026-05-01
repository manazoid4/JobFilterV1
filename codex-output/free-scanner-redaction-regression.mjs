import fs from 'node:fs';
import assert from 'node:assert/strict';

const route = fs.readFileSync('server/routes/leadsSearch.ts', 'utf8');
const pricing = fs.readFileSync('src/pages/PricingPage.tsx', 'utf8');

for (const text of [
  'toFreePreviewLead',
  "buyer: ''",
  "url: ''",
  "deadlineAt: ''",
  "contactSignal: 'none'",
  'previewScore',
  'Preview only',
]) {
  assert.ok(route.includes(text), `free scanner route missing redaction: ${text}`);
}

assert.ok(!pricing.includes('2 scans per week'), 'pricing still claims unenforced 2 scans per week');
assert.ok(!pricing.includes('2/week'), 'pricing table still claims unenforced 2/week');

console.log('free scanner redaction regression passed');
