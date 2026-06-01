-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)

create table if not exists waitlist (
  id bigint generated always as identity primary key,
  name text not null,
  trade text not null,
  contact text not null,
  contact_type text,
  source text default 'site',
  created_at timestamptz default now()
);

create table if not exists chase_status (
  lead_id text primary key,
  status text not null,
  sent_at timestamptz default now(),
  nudged boolean default false,
  updated_at timestamptz default now()
);

create table if not exists outcomes (
  lead_id text primary key,
  title text default 'Unknown job',
  status text not null,
  value text,
  lost_reason text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  fusion_key TEXT,
  title TEXT NOT NULL,
  trade TEXT NOT NULL,
  location TEXT,
  postcode_outward TEXT,
  estimated_value TEXT,
  urgency TEXT,
  source TEXT,
  source_confidence INTEGER,
  source_url TEXT,
  contact_signal TEXT,
  buyer_name TEXT,
  published_at TIMESTAMPTZ,
  deadline_at TIMESTAMPTZ,
  score INTEGER,
  quality_label TEXT,
  ghost_risk TEXT,
  signal_class TEXT,
  signal_stack TEXT[],
  evidence_badges TEXT[],
  score_reasons TEXT[],
  recommended_action TEXT,
  contact_path JSONB NOT NULL DEFAULT '{}'::jsonb,
  opportunity_atoms JSONB NOT NULL DEFAULT '[]'::jsonb,
  why_this_is_a_job TEXT,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_commercial BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS delivery_events (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL,
  phone TEXT,
  provider TEXT NOT NULL,
  message_body TEXT,
  status TEXT NOT NULL,
  channel TEXT DEFAULT 'whatsapp_to_tradesman',
  consent_basis TEXT DEFAULT 'service_message_to_subscriber',
  template_id TEXT,
  provider_message_id TEXT,
  delivery_status TEXT,
  opt_out_at TIMESTAMPTZ,
  next_action TEXT,
  score_at_delivery INTEGER,
  score_reasons_at_delivery TEXT[] DEFAULT '{}',
  contact_path_used TEXT,
  sent_at TIMESTAMPTZ DEFAULT now(),
  error TEXT,
  is_duplicate BOOLEAN DEFAULT false,
  delivery_lock_key TEXT
);

CREATE TABLE IF NOT EXISTS lead_outcomes (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  lead_id TEXT NOT NULL,
  title TEXT,
  trade TEXT,
  location TEXT,
  postcode_outward TEXT,
  status TEXT NOT NULL,
  delivery_event_id TEXT,
  won_value INTEGER,
  lost_reason TEXT,
  quote_value INTEGER,
  contacted_at TIMESTAMPTZ,
  quoted_at TIMESTAMPTZ,
  won_at TIMESTAMPTZ,
  lost_at TIMESTAMPTZ,
  source_attribution TEXT,
  score_at_delivery INTEGER,
  score_reasons_at_delivery TEXT[] DEFAULT '{}',
  contact_path_used TEXT,
  score_label_at_delivery TEXT,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(lead_id)
);

CREATE TABLE IF NOT EXISTS territory_metrics (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  postcode_outward TEXT NOT NULL,
  trade TEXT NOT NULL,
  signal_score INTEGER DEFAULT 0,
  label TEXT DEFAULT 'STEADY',
  signals_this_week INTEGER DEFAULT 0,
  planning_count INTEGER DEFAULT 0,
  epc_count INTEGER DEFAULT 0,
  contract_count INTEGER DEFAULT 0,
  avg_estimated_value INTEGER DEFAULT 0,
  lock_status TEXT DEFAULT 'open',
  launch_status TEXT DEFAULT 'DO_NOT_SELL',
  coverage_class TEXT DEFAULT 'no planning data',
  readiness_reason TEXT,
  source_freshness_score INTEGER DEFAULT 0,
  last_successful_scan_at TIMESTAMPTZ,
  minimum_weekly_leads_met BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(postcode_outward, trade)
);

CREATE TABLE IF NOT EXISTS user_entitlements (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  stripe_customer_id TEXT UNIQUE,
  tier TEXT NOT NULL DEFAULT 'free',
  postcode_outward TEXT,
  trade TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS source_config (
  key TEXT PRIMARY KEY,
  enabled BOOLEAN NOT NULL DEFAULT true,
  score_bonus INTEGER,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS source_benchmark_runs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  source_key TEXT NOT NULL,
  postcode_outward TEXT NOT NULL,
  trade TEXT NOT NULL,
  query_started_at TIMESTAMPTZ NOT NULL,
  query_finished_at TIMESTAMPTZ NOT NULL,
  fetched_count INTEGER DEFAULT 0,
  passed_count INTEGER DEFAULT 0,
  dropped_count INTEGER DEFAULT 0,
  newest_source_published_at TIMESTAMPTZ,
  source_latency_hours NUMERIC,
  fetch_latency_ms INTEGER,
  failed BOOLEAN DEFAULT false,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lead_quality_audit_runs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  run_week DATE NOT NULL,
  patch TEXT NOT NULL,
  postcode_outward TEXT NOT NULL,
  trade TEXT NOT NULL,
  requested_count INTEGER DEFAULT 100,
  audited_count INTEGER DEFAULT 0,
  actionable_count INTEGER DEFAULT 0,
  report JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lead_quality_audit_items (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  audit_run_id TEXT REFERENCES lead_quality_audit_runs(id) ON DELETE CASCADE,
  lead_id TEXT NOT NULL,
  source TEXT NOT NULL,
  source_url TEXT NOT NULL,
  postcode_outward TEXT NOT NULL,
  trade TEXT NOT NULL,
  score_at_audit INTEGER,
  human_label TEXT NOT NULL CHECK (human_label IN ('ACTIONABLE','WRONG_TRADE','TOO_EARLY','TOO_LATE','LOW_VALUE','NO_CONTACT_PATH','DUPLICATE','FAKE_OR_INTERNAL')),
  reason TEXT NOT NULL,
  contact_path JSONB NOT NULL DEFAULT '{}'::jsonb,
  contact_path_used TEXT,
  audited_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(audit_run_id, lead_id)
);

CREATE INDEX IF NOT EXISTS leads_postcode_trade_idx ON leads(postcode_outward, trade);
CREATE INDEX IF NOT EXISTS leads_score_idx ON leads(score DESC);
CREATE INDEX IF NOT EXISTS lead_outcomes_lead_idx ON lead_outcomes(lead_id);
CREATE INDEX IF NOT EXISTS source_benchmark_runs_lookup_idx ON source_benchmark_runs(postcode_outward, trade, source_key, query_finished_at DESC);
CREATE INDEX IF NOT EXISTS lead_quality_audit_items_label_idx ON lead_quality_audit_items(human_label, source, trade);
