import fs from 'node:fs';
import assert from 'node:assert/strict';

const read = (path) => fs.readFileSync(path, 'utf8');
const home = read('src/pages/HomePage.tsx');
const pricing = read('src/pages/PricingPage.tsx');
const dashboard = read('src/pages/DashboardPage.tsx');
const nav = read('src/components/TopNav.tsx');
const layout = read('app/layout.tsx');
const primaryCopy = [home, pricing, dashboard, layout].join('\n');

for (const phrase of ['Find a Tender', 'BID', 'WATCH', 'SUBCONTRACT', 'SKIP']) {
  assert.ok(primaryCopy.includes(phrase), `primary product copy missing: ${phrase}`);
}
assert.ok(home.includes('5–25-PERSON CONTRACTORS'), 'homepage must identify the target firm size');
assert.ok(pricing.includes('5–25-person contractors'), 'pricing must identify the target firm size');
assert.ok(primaryCopy.includes('free and public'), 'primary copy must state that Find a Tender is free and public');

for (const route of ['/find-jobs', '/methodology', '/pricing', '/trust']) {
  assert.ok(nav.includes(`to: '${route}'`), `primary navigation missing ${route}`);
}
for (const staleRoute of ['/territories', '/tradie-zone', '/vantage', '/vicinity', '/codex', '/free-tools', '/signals', '/for-your-trade', '/news', '/whats-new']) {
  assert.ok(!nav.includes(staleRoute), `primary navigation still includes ${staleRoute}`);
}

for (const staleClaim of [
  'before Checkatrade',
  'before the job goes',
  'LOCK YOUR PATCH',
  'LOCK PATCH',
  'Claim Patch',
  'Founder £39',
  'Gold leads to you first',
  'pays for itself',
]) {
  assert.ok(!primaryCopy.toLowerCase().includes(staleClaim.toLowerCase()), `primary copy still includes stale claim: ${staleClaim}`);
}

for (const contract of ["fetch('/api/alerts'", "method: 'PATCH'", "method: 'DELETE'", 'function AlertSetupWidget']) {
  assert.ok(dashboard.includes(contract), `dashboard alert management contract missing: ${contract}`);
}

console.log('primary product narrative regression passed');
