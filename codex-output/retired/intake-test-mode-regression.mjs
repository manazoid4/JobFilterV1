import assert from 'node:assert/strict';
import fs from 'node:fs';

const app = fs.readFileSync('src/App.tsx', 'utf8');
const nav = fs.readFileSync('src/components/TopNav.tsx', 'utf8');
const pagePath = 'src/pages/IntakeTestPage.tsx';

assert.match(app, /IntakeTestPage/, 'App must import the intake test page');
assert.match(app, /path="\/intake-test"/, 'App must expose /intake-test');
assert.match(nav, /\/intake-test/, 'Top nav must expose the intake test mode');
assert.ok(fs.existsSync(pagePath), 'Intake test page file must exist');

const page = fs.readFileSync(pagePath, 'utf8');
assert.match(page, /One strong lead per week/i, 'test mode must preserve the pay-worth scenario');
assert.match(page, /\/api\/intake\/score/, 'test mode must hit the real intake scoring API');
assert.match(page, /GOLD|SILVER|BIN/, 'test mode must show score tiers');
assert.match(page, /NO CHASING|REAL LEADS|STAY IN CONTROL/, 'copy must stay in JobFilter language');

console.log('intake test mode regression passed');
