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
  sent_at TIMESTAMPTZ DEFAULT now(),
  error TEXT,
  is_duplicate BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS lead_outcomes (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  lead_id TEXT NOT NULL,
  title TEXT,
  trade TEXT,
  location TEXT,
  postcode_outward TEXT,
  status TEXT NOT NULL,
  won_value INTEGER,
  lost_reason TEXT,
  score_label_at_delivery TEXT,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
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

CREATE INDEX IF NOT EXISTS leads_postcode_trade_idx ON leads(postcode_outward, trade);
CREATE INDEX IF NOT EXISTS leads_score_idx ON leads(score DESC);
CREATE INDEX IF NOT EXISTS lead_outcomes_lead_idx ON lead_outcomes(lead_id);
