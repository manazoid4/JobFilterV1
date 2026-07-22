import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const route = readFileSync(new URL('../../server/routes/leadsSearch.ts', import.meta.url), 'utf8');
const migration = readFileSync(new URL('../../supabase/migrations/20260722194500_atomic_weekly_scan_quota.sql', import.meta.url), 'utf8');

assert.match(route, /\.rpc\('claim_weekly_scan'/);
assert.doesNotMatch(route, /Promise\.all\(\[\s*scan\(/, 'source scan must not start before access resolution');
assert.ok(route.indexOf('const accessCtx = await resolveAccessContext(req)') < route.indexOf('const result = await scan({'));
assert.match(route, /tier: accessCtx\.tier === 'full' \? 'paid' : 'free'/);

assert.match(migration, /security definer/i);
assert.match(migration, /on conflict \(id\) do update/i);
assert.match(migration, /revoke all on function public\.claim_weekly_scan/);
assert.match(migration, /grant execute .* to service_role/i);
assert.doesNotMatch(migration, /grant execute .* authenticated/i);

console.log('scan quota contract regression passed');
