import assert from 'node:assert/strict';
import fs from 'node:fs';

// Source enabling now lives in leadEngine/sourceConfig.ts via isSourceEnabled().
// The old CONFIG.sources.planningData flag was removed in the sourceConfig refactor.

const config = fs.readFileSync('leadEngine/config.ts', 'utf8');
const sourceConfig = fs.readFileSync('leadEngine/sourceConfig.ts', 'utf8');
const scan = fs.readFileSync('leadEngine/scan.ts', 'utf8');

// freeTierLimit must remain at 5 for launch
assert.match(config, /freeTierLimit:\s*5,/, 'leadEngine/config.ts must keep launch free tier limited to 5');
assert.doesNotMatch(config, /freeTierLimit:\s*25/, 'leadEngine/config.ts must not ship old test-mode free limit');

// Source enablement now lives in sourceConfig via isSourceEnabled()
assert.ok(sourceConfig.includes("key: 'PlanningData'"), 'sourceConfig must register PlanningData source');
assert.ok(sourceConfig.includes('isSourceEnabled'), 'sourceConfig must export isSourceEnabled');

// scan.ts must gate PlanningData on isSourceEnabled, not hardcoded
assert.ok(scan.includes("isSourceEnabled('PlanningData')"), 'scan.ts must gate PlanningData on isSourceEnabled');
assert.doesNotMatch(scan, /CONFIG\.sources\.planningData/, 'scan.ts must not use old CONFIG.sources.planningData flag');

console.log('lead engine source config regression passed');
