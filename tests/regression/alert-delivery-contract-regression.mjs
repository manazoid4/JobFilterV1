import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const api = readFileSync(new URL('../../app/api/alerts/route.ts', import.meta.url), 'utf8');
const sender = readFileSync(new URL('../../app/api/alerts/send/route.ts', import.meta.url), 'utf8');
const dashboard = readFileSync(new URL('../../src/pages/DashboardPage.tsx', import.meta.url), 'utf8');
const vercel = JSON.parse(readFileSync(new URL('../../vercel.json', import.meta.url), 'utf8'));

assert.match(api, /radius_miles/);
assert.match(api, /export async function PATCH/);
assert.match(api, /export async function DELETE/);
assert.match(api, /\.eq\('user_id', user\.userId\)/, 'alert mutations must be owner scoped');
assert.doesNotMatch(api, /Emails are sent hourly/, 'API must not promise delivery rather than checking cadence');
assert.doesNotMatch(api, /checked hourly/, 'API POST response must not promise hourly delivery when cron is daily');

assert.match(sender, /radiusMiles: Number\(alert\.radius_miles \?\? 25\)/);
assert.match(sender, /last_checked_at/);
assert.match(sender, /idempotency_key/);
assert.match(sender, /delivery\.sent/);
assert.match(sender, /sourceFailures > 0/);
assert.doesNotMatch(sender, /update\(\{ last_sent_at: new Date\(\)\.toISOString\(\) \}\)/, 'failed or empty scans must not masquerade as sent');
assert.match(sender, /SCHEDULE_TOLERANCE_MS/, 'interval gate must include processing-time tolerance to avoid skipping every other run');

assert.doesNotMatch(dashboard, /DAILY SOURCE CHECK/, 'instant option removed — no duplicate daily choice in UI');
assert.doesNotMatch(dashboard, /instant.*FREQ_OPTIONS|FREQ_OPTIONS.*instant/, 'instant must not appear in FREQ_OPTIONS');
assert.match(dashboard, /'Pause' : 'Resume'/);
assert.match(dashboard, /deleteAlert\(a\.id\)/);
assert.equal(vercel.crons.find((cron) => cron.path === '/api/alerts/send')?.schedule, '0 8 * * *');

console.log('alert delivery contract regression passed');
