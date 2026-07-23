import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const migrationsDir = path.join('supabase', 'migrations');
const migrationName = fs.readdirSync(migrationsDir)
  .filter((name) => name.endsWith('_reconcile_supabase_schema_and_rls.sql'))
  .sort()
  .at(-1);

assert.ok(migrationName, 'Supabase reconciliation migration must exist');

const sql = fs.readFileSync(path.join(migrationsDir, migrationName), 'utf8').toLowerCase();

for (const definition of [
  /alter table if exists public\.leads[\s\S]*?add column if not exists contact_path jsonb/,
  /add column if not exists decision text/,
  /add column if not exists scoring_policy_version text/,
  /add column if not exists score_factors jsonb not null default '\[\]'::jsonb/,
  /check \(decision is null or decision in \('bid', 'watch', 'subcontract', 'skip'\)\)/,
  /add column if not exists radius_miles integer not null default 25/,
  /check \(radius_miles between 1 and 100\)/,
  /add column if not exists last_checked_at timestamptz/,
  /add column if not exists alert_id text/,
  /add column if not exists idempotency_key text/,
  /add column if not exists attempts integer not null default 0/,
  /add column if not exists next_attempt_at timestamptz/,
  /add column if not exists last_error text/,
  /delivery_events_idempotency_unique_idx[\s\S]*?where idempotency_key is not null/,
  /foreign key \(alert_id\) references public\.lead_alerts\(id\) on delete set null/,
  /create table if not exists public\.source_benchmark_runs/,
  /alter table if exists public\.lead_outcomes[\s\S]*?add column if not exists updated_at timestamptz not null default now\(\)/,
  /create table if not exists public\.lead_quality_audit_runs/,
  /create table if not exists public\.lead_quality_audit_items/,
]) {
  assert.match(sql, definition, `missing critical schema definition: ${definition}`);
}

const rlsTables = [
  'profiles',
  'subscriptions',
  'leads',
  'lead_outcomes',
  'delivery_events',
  'lead_alerts',
  'source_benchmark_runs',
  'lead_quality_audit_runs',
  'lead_quality_audit_items',
  'territory_metrics',
  'source_config',
];

for (const table of rlsTables) {
  assert.match(
    sql,
    new RegExp(`alter table public\\.${table} enable row level security`),
    `${table} must enable RLS`,
  );
}

for (const policy of [
  'profiles_select_own',
  'profiles_update_own',
  'subscriptions_select_own',
  'leads_select_own',
  'lead_outcomes_select_own',
  'lead_outcomes_insert_own',
  'lead_outcomes_update_own',
  'lead_outcomes_delete_own',
  'delivery_events_select_own',
  'lead_alerts_select_own',
  'lead_alerts_insert_own',
  'lead_alerts_update_own',
  'lead_alerts_delete_own',
]) {
  assert.match(sql, new RegExp(`create policy ${policy}`), `missing ownership policy: ${policy}`);
}

assert.match(sql, /with check \(\(select auth\.uid\(\)\)/, 'write policies must enforce ownership after updates');
assert.match(sql, /revoke all privileges on table[\s\S]+from anon, authenticated;/, 'public tables must revoke implicit API grants');
assert.match(sql, /grant all privileges on table[\s\S]+to service_role;/, 'service role must retain runtime access');
assert.doesNotMatch(sql, /grant select on public\.leads to authenticated/, 'shared lead rows must stay behind the API redaction layer');

console.log('Supabase schema contract regression passed');
