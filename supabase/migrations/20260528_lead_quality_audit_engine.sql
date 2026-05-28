alter table if exists leads
  add column if not exists contact_path jsonb not null default '{}'::jsonb,
  add column if not exists opportunity_atoms jsonb not null default '[]'::jsonb,
  add column if not exists why_this_is_a_job text,
  add column if not exists payload jsonb not null default '{}'::jsonb,
  add column if not exists signal_stack text[] default '{}',
  add column if not exists evidence_badges text[] default '{}',
  add column if not exists score_reasons text[] default '{}';

alter table if exists delivery_events
  add column if not exists channel text default 'whatsapp_to_tradesman',
  add column if not exists consent_basis text default 'service_message_to_subscriber',
  add column if not exists template_id text,
  add column if not exists provider_message_id text,
  add column if not exists delivery_status text,
  add column if not exists opt_out_at timestamptz,
  add column if not exists next_action text,
  add column if not exists score_at_delivery integer,
  add column if not exists score_reasons_at_delivery text[] default '{}',
  add column if not exists contact_path_used text;

alter table if exists lead_outcomes
  add column if not exists delivery_event_id text,
  add column if not exists quote_value integer,
  add column if not exists contacted_at timestamptz,
  add column if not exists quoted_at timestamptz,
  add column if not exists won_at timestamptz,
  add column if not exists lost_at timestamptz,
  add column if not exists source_attribution text,
  add column if not exists score_at_delivery integer,
  add column if not exists score_reasons_at_delivery text[] default '{}',
  add column if not exists contact_path_used text,
  add column if not exists updated_at timestamptz default now();

create unique index if not exists lead_outcomes_lead_unique_idx on lead_outcomes(lead_id);

alter table if exists territory_metrics
  add column if not exists launch_status text default 'DO_NOT_SELL',
  add column if not exists coverage_class text default 'no planning data',
  add column if not exists readiness_reason text,
  add column if not exists source_freshness_score integer default 0,
  add column if not exists last_successful_scan_at timestamptz,
  add column if not exists minimum_weekly_leads_met boolean default false;

create table if not exists source_benchmark_runs (
  id text primary key default gen_random_uuid()::text,
  source_key text not null,
  postcode_outward text not null,
  trade text not null,
  query_started_at timestamptz not null,
  query_finished_at timestamptz not null,
  fetched_count integer default 0,
  passed_count integer default 0,
  dropped_count integer default 0,
  newest_source_published_at timestamptz,
  source_latency_hours numeric,
  fetch_latency_ms integer,
  failed boolean default false,
  error text,
  created_at timestamptz default now()
);

create table if not exists lead_quality_audit_runs (
  id text primary key default gen_random_uuid()::text,
  run_week date not null,
  patch text not null,
  postcode_outward text not null,
  trade text not null,
  requested_count integer default 100,
  audited_count integer default 0,
  actionable_count integer default 0,
  report jsonb not null default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists lead_quality_audit_items (
  id text primary key default gen_random_uuid()::text,
  audit_run_id text references lead_quality_audit_runs(id) on delete cascade,
  lead_id text not null,
  source text not null,
  source_url text not null,
  postcode_outward text not null,
  trade text not null,
  score_at_audit integer,
  human_label text not null check (human_label in ('ACTIONABLE','WRONG_TRADE','TOO_EARLY','TOO_LATE','LOW_VALUE','NO_CONTACT_PATH','DUPLICATE','FAKE_OR_INTERNAL')),
  reason text not null,
  contact_path jsonb not null default '{}'::jsonb,
  contact_path_used text,
  audited_at timestamptz default now(),
  unique(audit_run_id, lead_id)
);

create index if not exists source_benchmark_runs_lookup_idx on source_benchmark_runs(postcode_outward, trade, source_key, query_finished_at desc);
create index if not exists lead_quality_audit_items_label_idx on lead_quality_audit_items(human_label, source, trade);
