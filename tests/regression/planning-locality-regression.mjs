import assert from 'node:assert/strict';
import fs from 'node:fs';

// Static regression: make sure planningDataFetcher does not fall back to
// stamping the searched outward code on non-local records.
const fetcher = fs.readFileSync('leadEngine/fetchers/planningDataFetcher.ts', 'utf8');

assert.match(
  fetcher,
  /isGeoLookup = .*lat && lon/,
  'planningDataFetcher must distinguish geo lookups from postcode text search',
);

assert.match(
  fetcher,
  /if \(!isLocal\) return null;/,
  'planningDataFetcher must drop non-local records when address does not confirm outward',
);

assert.doesNotMatch(
  fetcher,
  /rawLocation:\s*address \|\| outward,/,
  'planningDataFetcher must not blindly stamp outward as rawLocation when address is missing',
);

assert.match(
  fetcher,
  /rawLocation:\s*address \|\| \(isGeoLookup \? outward : ''\)/,
  'planningDataFetcher rawLocation fallback must require geo confirmation before using outward',
);

console.log('planning locality regression passed');
