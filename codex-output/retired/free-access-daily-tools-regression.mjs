import fs from 'node:fs';
import assert from 'node:assert/strict';

const freeTools = fs.readFileSync('src/pages/FreeToolsPage.tsx', 'utf8');
const pricing = fs.readFileSync('src/pages/PricingPage.tsx', 'utf8');
const home = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');

for (const text of [
  'FREE DAILY TOOLS',
  'Profit check',
  'Tyre-kicker check',
  'Travel cost',
  'Quote floor',
  'Tools are free. Leads are not.',
  'OPEN SCANNER',
]) {
  assert.ok(freeTools.includes(text), `free tools missing ${text}`);
}

for (const text of [
  'Free shows the signal',
  'Pro unlocks',
  'Highest',
]) {
  assert.ok(pricing.includes(text), `pricing missing paid gate copy: ${text}`);
}

for (const text of [
  'Free shows the signal',
  'Highest adds',
]) {
  assert.ok(home.includes(text), `home missing paid gate copy: ${text}`);
}

assert.ok(!freeTools.includes('No catch. Use them before you pay us.'), 'free page still implies everything is free/no catch');

console.log('free access and daily tools regression passed');
