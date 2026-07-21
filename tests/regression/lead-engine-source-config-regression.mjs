import assert from 'node:assert/strict';
import fs from 'node:fs';

// Source enabling now lives in leadEngine/sourceConfig.ts via isSourceEnabled().
// The old CONFIG.sources.planningData flag was removed in the sourceConfig refactor.

const config = fs.readFileSync('leadEngine/config.ts', 'utf8');
const sourceConfig = fs.readFileSync('leadEngine/sourceConfig.ts', 'utf8');
const scan = fs.readFileSync('leadEngine/scan.ts', 'utf8');
const sourceConfigModule = await import('../../leadEngine/sourceConfig.ts');

// freeTierLimit must remain at 5 for launch
assert.match(config, /freeTierLimit:\s*5,/, 'leadEngine/config.ts must keep launch free tier limited to 5');
assert.doesNotMatch(config, /freeTierLimit:\s*25/, 'leadEngine/config.ts must not ship old test-mode free limit');

// Source enablement now lives in sourceConfig via isSourceEnabled()
assert.ok(sourceConfig.includes("key: 'PlanningData'"), 'sourceConfig must register PlanningData source');
assert.ok(sourceConfig.includes('isSourceEnabled'), 'sourceConfig must export isSourceEnabled');

// scan.ts must gate PlanningData on isSourceEnabled, not hardcoded
assert.ok(scan.includes("isSourceEnabled('PlanningData')"), 'scan.ts must gate PlanningData on isSourceEnabled');
assert.doesNotMatch(scan, /CONFIG\.sources\.planningData/, 'scan.ts must not use old CONFIG.sources.planningData flag');

const previousEpcKey = process.env.EPC_API_KEY;
const previousEpcEmail = process.env.EPC_EMAIL;
const previousDemoMode = process.env.DEMO_MODE;
delete process.env.EPC_API_KEY;
delete process.env.EPC_EMAIL;
delete process.env.DEMO_MODE;
assert.equal(sourceConfigModule.isSourceEnabled('EPC'), false, 'credential-required EPC source must stay disabled without a key');
process.env.EPC_API_KEY = 'test-key';
assert.equal(sourceConfigModule.isSourceEnabled('EPC'), false, 'EPC source also requires an account email');
process.env.EPC_EMAIL = 'test@example.com';
assert.equal(sourceConfigModule.isSourceEnabled('EPC'), true, 'EPC source enables only when both credentials exist');
if (previousEpcKey === undefined) delete process.env.EPC_API_KEY;
else process.env.EPC_API_KEY = previousEpcKey;
if (previousEpcEmail === undefined) delete process.env.EPC_EMAIL;
else process.env.EPC_EMAIL = previousEpcEmail;
if (previousDemoMode === undefined) delete process.env.DEMO_MODE;
else process.env.DEMO_MODE = previousDemoMode;

console.log('lead engine source config regression passed');
