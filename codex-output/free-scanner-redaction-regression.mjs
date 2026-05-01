import fs from 'node:fs';
import assert from 'node:assert/strict';

const route = fs.readFileSync('server/routes/leadsSearch.ts', 'utf8');
const functionsIndex = fs.readFileSync('functions/index.ts', 'utf8');
const findJobsPage = fs.readFileSync('src/pages/FindJobsPage.tsx', 'utf8');
const pricing = fs.readFileSync('src/pages/PricingPage.tsx', 'utf8');

for (const text of [
  'toFreePreviewLead',
  'title:',
  "buyer: ''",
  "url: ''",
  "deadlineAt: ''",
  'valuePreview',
  'previewSourceConfidence',
  "urgency: 'medium'",
  "contactSignal: 'none'",
  'previewScore',
  'Paid preview',
]) {
  assert.ok(route.includes(text), `free scanner route missing redaction: ${text}`);
  assert.ok(functionsIndex.includes(text), `firebase function missing redaction: ${text}`);
}

for (const forbidden of [
  "value={lead.buyer || 'Unlock on Pro'}",
  'formatDate(lead.deadlineAt)',
  "['Value', lead.estimatedValue || 'Not listed']",
  "`${lead.sourceConfidence}% source`",
  'urgencyLabel(lead.urgency)',
]) {
  assert.ok(!findJobsPage.includes(forbidden), `free scanner UI can still leak: ${forbidden}`);
}

for (const required of [
  'safePreviewValue',
  'Unlock exact value',
  'Unlock timing',
  'Timing locked',
  'Free view proves the signal exists',
]) {
  assert.ok(findJobsPage.includes(required), `free scanner UI missing lock copy: ${required}`);
}

assert.ok(!pricing.includes('2 scans per week'), 'pricing still claims unenforced 2 scans per week');
assert.ok(!pricing.includes('2/week'), 'pricing table still claims unenforced 2/week');

console.log('free scanner redaction regression passed');
