-- Reconcile the production schema with the columns used by the current runtime.
-- This migration is intentionally additive and safe across the two legacy schema
-- shapes in 001_full_schema.sql and 20260522_vercel_supabase_saas.sql.

create extension if not exists pgcrypto;

-- User/account tables -------------------------------------------------------

alter table if exists public.profiles
  add column if not exists email text,
  add column if not exists full_name text,
  add column if not exists trade text,
  add column if not exists company_name text,
  add column if not exists phone text,
  add column if not exists postcode text,
  add column if not exists postcode_outward text,
  add column if not exists tier text not null default 'free',
  add column if not exists plan text not null default 'free',
  add column if not exists onboarding_status text not null default 'new',
  add column if not exists role text not null default 'user',
  add column if not exists stripe_customer_id text,
  add column if not exists weekly_scan_week text,
  add column if not exists weekly_scan_count integer not null default 0,
  add column if not exists updated_at timestamptz not null default now();

update public.profiles
set plan = tier
where (plan is null or plan in ('', 'free'))
  and tier is not null
  and tier not in ('', 'free');

alter table if exists public.subscriptions
  add column if not exists email text,
  add column if not exists stripe_customer_id text,
  add column if not exists stripe_subscription_id text,
  add column if not exists tier text,
  add column if not exists plan text not null default 'free',
  add column if not exists status text not null default 'inactive',
  add column if not exists billing text default 'monthly',
  add column if not exists active boolean not null default false,
  add column if not exists current_period_end timestamptz,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

update public.subscriptions
set plan = tier
where (plan is null or plan in ('', 'free'))
  and tier is not null
  and tier not in ('', 'free');

update public.subscriptions
set plan = coalesce(nullif(plan, ''), nullif(tier, ''), 'free'),
    tier = coalesce(nullif(plan, ''), nullif(tier, ''), 'free'),
    active = status in ('active', 'trialing');

create or replace function public.sync_subscription_tier()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.plan := coalesce(nullif(new.plan, ''), nullif(new.tier, ''), 'free');
  new.tier := new.plan;
  return new;
end;
$$;

drop trigger if exists sync_tier_from_plan on public.subscriptions;
create trigger sync_tier_from_plan
  before insert or update of plan on public.subscriptions
  for each row execute function public.sync_subscription_tier();

create unique index if not exists subscriptions_stripe_subscription_unique_idx
  on public.subscriptions(stripe_subscription_id)
  where stripe_subscription_id is not null;
create index if not exists subscriptions_user_status_idx
  on public.subscriptions(user_id, status);

-- Lead lifecycle tables -----------------------------------------------------

alter table if exists public.leads
  add column if not exists user_id uuid references auth.users(id) on delete set null,
  add column if not exists status text not null default 'new',
  add column if not exists payload jsonb not null default '{}'::jsonb,
  add column if not exists fusion_key text,
  add column if not exists source_url text,
  add column if not exists buyer_name text,
  add column if not exists published_at timestamptz,
  add column if not exists deadline_at timestamptz,
  add column if not exists quality_label text,
  add column if not exists ghost_risk text,
  add column if not exists signal_class text,
  add column if not exists signal_stack text[] not null default '{}',
  add column if not exists evidence_badges text[] not null default '{}',
  add column if not exists score_reasons text[] not null default '{}',
  add column if not exists recommended_action text,
  add column if not exists decision text,
  add column if not exists scoring_policy_version text,
  add column if not exists score_factors jsonb not null default '[]'::jsonb,
  add column if not exists contact_path jsonb not null default '{}'::jsonb,
  add column if not exists opportunity_atoms jsonb not null default '[]'::jsonb,
  add column if not exists why_this_is_a_job text,
  add column if not exists is_commercial boolean not null default false,
  add column if not exists updated_at timestamptz not null default now();

update public.leads
set decision = null
where decision is not null
  and decision not in ('BID', 'WATCH', 'SUBCONTRACT', 'SKIP');

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.leads'::regclass
      and conname = 'leads_decision_allowed'
  ) then
    alter table public.leads
      add constraint leads_decision_allowed
      check (decision is null or decision in ('BID', 'WATCH', 'SUBCONTRACT', 'SKIP'));
  end if;
end
$$;

alter table if exists public.delivery_events
  add column if not exists user_id uuid references auth.users(id) on delete set null,
  add column if not exists alert_id text,
  add column if not exists idempotency_key text,
  add column if not exists provider text,
  add column if not exists channel text default 'whatsapp_to_tradesman',
  add column if not exists status text,
  add column if not exists attempts integer not null default 0,
  add column if not exists next_attempt_at timestamptz,
  add column if not exists consent_basis text default 'service_message_to_subscriber',
  add column if not exists template_id text,
  add column if not exists provider_message_id text,
  add column if not exists last_error text,
  add column if not exists delivery_status text,
  add column if not exists opt_out_at timestamptz,
  add column if not exists next_action text,
  add column if not exists score_at_delivery integer,
  add column if not exists score_reasons_at_delivery text[] not null default '{}',
  add column if not exists contact_path_used text,
  add column if not exists delivery_lock_key text,
  add column if not exists sent_at timestamptz,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

create unique index if not exists delivery_events_idempotency_unique_idx
  on public.delivery_events(idempotency_key)
  where idempotency_key is not null;
create index if not exists delivery_events_retry_idx
  on public.delivery_events(status, next_attempt_at)
  where status in ('pending', 'retrying');

alter table if exists public.lead_outcomes
  add column if not exists user_id text,
  add column if not exists delivery_event_id text,
  add column if not exists quote_value integer,
  add column if not exists contacted_at timestamptz,
  add column if not exists quoted_at timestamptz,
  add column if not exists won_at timestamptz,
  add column if not exists lost_at timestamptz,
  add column if not exists source_attribution text,
  add column if not exists score_at_delivery integer,
  add column if not exists score_reasons_at_delivery text[] not null default '{}',
  add column if not exists contact_path_used text,
  add column if not exists updated_at timestamptz not null default now();

update public.lead_outcomes
set updated_at = coalesce(updated_at, created_at, now())
where updated_at is null;

alter table public.lead_outcomes
  alter column updated_at set default now(),
  alter column updated_at set not null;

create unique index if not exists lead_outcomes_lead_unique_idx
  on public.lead_outcomes(lead_id);
create index if not exists lead_outcomes_user_updated_idx
  on public.lead_outcomes(user_id, updated_at desc);

create table if not exists public.lead_alerts (
  id text primary key default gen_random_uuid()::text,
  user_id text not null,
  trade text not null,
  location text not null,
  postcode_outward text,
  radius_miles integer not null default 25,
  frequency text not null check (frequency in ('instant', 'daily', 'weekly')),
  active boolean not null default true,
  last_checked_at timestamptz,
  last_sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.lead_alerts
  add column if not exists postcode_outward text,
  add column if not exists radius_miles integer not null default 25,
  add column if not exists active boolean not null default true,
  add column if not exists last_checked_at timestamptz,
  add column if not exists last_sent_at timestamptz,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

update public.lead_alerts
set radius_miles = 25
where radius_miles is null or radius_miles < 1 or radius_miles > 100;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.lead_alerts'::regclass
      and conname = 'lead_alerts_radius_miles_range'
  ) then
    alter table public.lead_alerts
      add constraint lead_alerts_radius_miles_range
      check (radius_miles between 1 and 100);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.delivery_events'::regclass
      and conname = 'delivery_events_alert_id_fkey'
  ) then
    alter table public.delivery_events
      add constraint delivery_events_alert_id_fkey
      foreign key (alert_id) references public.lead_alerts(id) on delete set null
      not valid;
  end if;
end
$$;

create index if not exists lead_alerts_user_idx on public.lead_alerts(user_id);
create index if not exists lead_alerts_active_idx on public.lead_alerts(active, frequency);
create unique index if not exists lead_alerts_unique_idx
  on public.lead_alerts(user_id, trade, location, frequency);

-- Source health and quality audit tables -----------------------------------

create table if not exists public.source_benchmark_runs (
  id text primary key default gen_random_uuid()::text,
  source_key text not null,
  postcode_outward text not null,
  trade text not null,
  query_started_at timestamptz not null,
  query_finished_at timestamptz not null,
  fetched_count integer not null default 0,
  passed_count integer not null default 0,
  dropped_count integer not null default 0,
  newest_source_published_at timestamptz,
  source_latency_hours numeric,
  fetch_latency_ms integer,
  failed boolean not null default false,
  error text,
  created_at timestamptz not null default now()
);

alter table public.source_benchmark_runs
  add column if not exists newest_source_published_at timestamptz,
  add column if not exists source_latency_hours numeric,
  add column if not exists fetch_latency_ms integer,
  add column if not exists failed boolean not null default false,
  add column if not exists error text,
  add column if not exists created_at timestamptz not null default now();

create table if not exists public.lead_quality_audit_runs (
  id text primary key default gen_random_uuid()::text,
  run_week date not null,
  patch text not null,
  postcode_outward text not null,
  trade text not null,
  requested_count integer not null default 100,
  audited_count integer not null default 0,
  actionable_count integer not null default 0,
  report jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.lead_quality_audit_items (
  id text primary key default gen_random_uuid()::text,
  audit_run_id text references public.lead_quality_audit_runs(id) on delete cascade,
  lead_id text not null,
  source text not null,
  source_url text not null,
  postcode_outward text not null,
  trade text not null,
  score_at_audit integer,
  human_label text not null check (human_label in (
    'ACTIONABLE', 'WRONG_TRADE', 'TOO_EARLY', 'TOO_LATE',
    'LOW_VALUE', 'NO_CONTACT_PATH', 'DUPLICATE', 'FAKE_OR_INTERNAL'
  )),
  reason text not null,
  contact_path jsonb not null default '{}'::jsonb,
  contact_path_used text,
  audited_at timestamptz not null default now(),
  unique(audit_run_id, lead_id)
);

alter table if exists public.territory_metrics
  add column if not exists launch_status text default 'DO_NOT_SELL',
  add column if not exists coverage_class text default 'no planning data',
  add column if not exists readiness_reason text,
  add column if not exists source_freshness_score integer not null default 0,
  add column if not exists last_successful_scan_at timestamptz,
  add column if not exists minimum_weekly_leads_met boolean not null default false;

create table if not exists public.source_config (
  key text primary key,
  enabled boolean not null default true,
  score_bonus integer,
  updated_at timestamptz not null default now()
);

create index if not exists source_benchmark_runs_lookup_idx
  on public.source_benchmark_runs(postcode_outward, trade, source_key, query_finished_at desc);
create index if not exists lead_quality_audit_items_label_idx
  on public.lead_quality_audit_items(human_label, source, trade);

-- RLS and explicit grants ---------------------------------------------------
-- API routes use the service role. Authenticated grants below are restricted
-- to rows owned by auth.uid(); internal source/audit tables stay service-only.

alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.leads enable row level security;
alter table public.lead_outcomes enable row level security;
alter table public.delivery_events enable row level security;
alter table public.lead_alerts enable row level security;
alter table public.source_benchmark_runs enable row level security;
alter table public.lead_quality_audit_runs enable row level security;
alter table public.lead_quality_audit_items enable row level security;
alter table public.territory_metrics enable row level security;
alter table public.source_config enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists profiles_select_own on public.profiles;
drop policy if exists profiles_update_own on public.profiles;
drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_select_own on public.profiles
  for select to authenticated
  using ((select auth.uid()) = id);
create policy profiles_update_own on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists "Users can read own subscription" on public.subscriptions;
drop policy if exists subscriptions_select_own on public.subscriptions;
create policy subscriptions_select_own on public.subscriptions
  for select to authenticated
  using ((select auth.uid())::text = user_id::text);

drop policy if exists leads_select_own on public.leads;
create policy leads_select_own on public.leads
  for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists lead_outcomes_select_own on public.lead_outcomes;
drop policy if exists lead_outcomes_insert_own on public.lead_outcomes;
drop policy if exists lead_outcomes_update_own on public.lead_outcomes;
drop policy if exists lead_outcomes_delete_own on public.lead_outcomes;
create policy lead_outcomes_select_own on public.lead_outcomes
  for select to authenticated
  using ((select auth.uid())::text = user_id::text);
create policy lead_outcomes_insert_own on public.lead_outcomes
  for insert to authenticated
  with check ((select auth.uid())::text = user_id::text);
create policy lead_outcomes_update_own on public.lead_outcomes
  for update to authenticated
  using ((select auth.uid())::text = user_id::text)
  with check ((select auth.uid())::text = user_id::text);
create policy lead_outcomes_delete_own on public.lead_outcomes
  for delete to authenticated
  using ((select auth.uid())::text = user_id::text);

drop policy if exists delivery_events_select_own on public.delivery_events;
create policy delivery_events_select_own on public.delivery_events
  for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists lead_alerts_select_own on public.lead_alerts;
drop policy if exists lead_alerts_insert_own on public.lead_alerts;
drop policy if exists lead_alerts_update_own on public.lead_alerts;
drop policy if exists lead_alerts_delete_own on public.lead_alerts;
create policy lead_alerts_select_own on public.lead_alerts
  for select to authenticated
  using ((select auth.uid())::text = user_id::text);
create policy lead_alerts_insert_own on public.lead_alerts
  for insert to authenticated
  with check ((select auth.uid())::text = user_id::text);
create policy lead_alerts_update_own on public.lead_alerts
  for update to authenticated
  using ((select auth.uid())::text = user_id::text)
  with check ((select auth.uid())::text = user_id::text);
create policy lead_alerts_delete_own on public.lead_alerts
  for delete to authenticated
  using ((select auth.uid())::text = user_id::text);

revoke all privileges on table
  public.profiles,
  public.subscriptions,
  public.leads,
  public.lead_outcomes,
  public.delivery_events,
  public.lead_alerts,
  public.source_benchmark_runs,
  public.lead_quality_audit_runs,
  public.lead_quality_audit_items,
  public.territory_metrics,
  public.source_config
from anon, authenticated;

grant all privileges on table
  public.profiles,
  public.subscriptions,
  public.leads,
  public.lead_outcomes,
  public.delivery_events,
  public.lead_alerts,
  public.source_benchmark_runs,
  public.lead_quality_audit_runs,
  public.lead_quality_audit_items,
  public.territory_metrics,
  public.source_config
to service_role;

grant select on public.profiles to authenticated;
grant update (full_name, trade, company_name, phone, postcode, postcode_outward, updated_at)
  on public.profiles to authenticated;
grant select on public.subscriptions to authenticated;
grant select, insert, update, delete on public.lead_outcomes to authenticated;
grant select on public.delivery_events to authenticated;
grant select, insert, update, delete on public.lead_alerts to authenticated;

-- Deliberately no authenticated grant on public.leads: shared fetched leads can
-- contain buyer/contact data and must continue through the redacting API layer.
-- Source health, audit, territory and source-config tables are service-only.

notify pgrst, 'reload schema';
