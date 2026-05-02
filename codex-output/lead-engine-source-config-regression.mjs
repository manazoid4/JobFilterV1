import assert from 'node:assert/strict';
import fs from 'node:fs';

for (const configPath of ['leadEngine/config.ts', 'functions/leadEngine/config.ts']) {
  const config = fs.readFileSync(configPath, 'utf8');
  assert.match(config, /planningData:\s*process\.env\.SOURCE_PLANNING_DATA !== 'false'/, `${configPath} must expose a PlanningData source flag`);
  assert.match(config, /freeTierLimit:\s*5,/, `${configPath} must keep launch free tier limited to 5`);
  assert.doesNotMatch(config, /freeTierLimit:\s*25/, `${configPath} must not ship the old test-mode free limit`);
}

for (const scanPath of ['leadEngine/scan.ts', 'functions/leadEngine/scan.ts']) {
  const scan = fs.readFileSync(scanPath, 'utf8');
  assert.match(scan, /CONFIG\.sources\.planningData\s*\?\s*planningDataFetcher/s, `${scanPath} must gate PlanningData on planningData flag`);
  assert.doesNotMatch(scan, /CONFIG\.sources\.contractsFinder\s*\?\s*planningDataFetcher/s, `${scanPath} must not gate PlanningData on ContractsFinder`);
}

console.log('lead engine source config regression passed');
