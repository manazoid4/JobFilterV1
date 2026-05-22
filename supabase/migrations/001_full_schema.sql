-- JobFilter full schema migration
-- Run in Supabase: Dashboard → SQL Editor → New query

-- ─── EXISTING TABLES (safe re-run) ──────────────────────────────────────────

CREATE TABLE IF NOT EXISTS waitlist (
  id bigint generated always as identity primary key,
  name text not null,
  trade text not null,
  contact text not null,
  contact_type text,
  source text default 'site',
  created_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS chase_status (
  lead_id text primary key,
  status text not null,
  sent_at timestamptz default now(),
  nudged boolean default false,
  updated_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS outcomes (
  lead_id text primary key,
  title text default 'Unknown job',
  status text not null,
  value text,
  lost_reason text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS leads (
  id text primary key,
  fusion_key text,
  title text not null,
  trade text not null,
  location text,
  postcode_outward text,
  estimated_value text,
  urgency text,
  source text,
  source_confidence integer,
  source_url text,
  contact_signal text,
  buyer_name text,
  published_at timestamptz,
  deadline_at timestamptz,
  score integer,
  quality_label text,
  ghost_risk text,
  signal_class text,
  signal_stack text[],
  evidence_badges text[],
  score_reasons text[],
  recommended_action text,
  is_commercial boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS delivery_events (
  id text primary key,
  lead_id text not null,
  phone text,
  provider text not null,
  message_body text,
  status text not null,
  sent_at timestamptz default now(),
  error text,
  is_duplicate boolean default false
);

CREATE TABLE IF NOT EXISTS lead_outcomes (
  id text primary key default gen_random_uuid()::text,
  lead_id text not null,
  title text,
  trade text,
  location text,
  postcode_outward text,
  status text not null,
  won_value integer,
  lost_reason text,
  score_label_at_delivery text,
  source text,
  created_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS territory_metrics (
  id text primary key default gen_random_uuid()::text,
  postcode_outward text not null,
  trade text not null,
  signal_score integer default 0,
  label text default 'STEADY',
  signals_this_week integer default 0,
  planning_count integer default 0,
  epc_count integer default 0,
  contract_count integer default 0,
  avg_estimated_value integer default 0,
  lock_status text default 'open',
  updated_at timestamptz default now(),
  unique(postcode_outward, trade)
);

CREATE TABLE IF NOT EXISTS user_entitlements (
  id text primary key default gen_random_uuid()::text,
  stripe_customer_id text unique,
  tier text not null default 'free',
  postcode_outward text,
  trade text,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── NEW TABLES ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  trade text,
  postcode text,
  tier text default 'free',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id text primary key default gen_random_uuid()::text,
  user_id text,
  email text,
  stripe_customer_id text unique,
  stripe_subscription_id text,
  tier text default 'free',
  status text default 'inactive',
  billing text default 'monthly',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS payments (
  id text primary key default gen_random_uuid()::text,
  user_id text,
  email text,
  stripe_session_id text unique,
  stripe_customer_id text,
  stripe_subscription_id text,
  tier text,
  billing text,
  amount integer,
  status text,
  paid_at timestamptz,
  created_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS saved_scans (
  id text primary key default gen_random_uuid()::text,
  user_id text not null,
  postcode text,
  trade text,
  results jsonb,
  created_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS postcode_searches (
  id text primary key default gen_random_uuid()::text,
  postcode text not null,
  trade text,
  user_id text,
  result_count integer default 0,
  created_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS tool_outputs (
  id text primary key default gen_random_uuid()::text,
  tool_name text not null,
  user_id text,
  input jsonb,
  output jsonb,
  created_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS email_captures (
  id text primary key default gen_random_uuid()::text,
  email text not null unique,
  source text,
  trade text,
  postcode text,
  created_at timestamptz default now()
);

CREATE TABLE IF NOT EXISTS n8n_events (
  id text primary key default gen_random_uuid()::text,
  event text not null,
  payload jsonb,
  status text default 'sent',
  created_at timestamptz default now()
);

-- ─── INDEXES ──────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS leads_postcode_trade_idx ON leads(postcode_outward, trade);
CREATE INDEX IF NOT EXISTS leads_score_idx ON leads(score desc);
CREATE INDEX IF NOT EXISTS lead_outcomes_lead_idx ON lead_outcomes(lead_id);
CREATE INDEX IF NOT EXISTS subscriptions_customer_idx ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS subscriptions_user_idx ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS postcode_searches_postcode_idx ON postcode_searches(postcode);
CREATE INDEX IF NOT EXISTS tool_outputs_tool_idx ON tool_outputs(tool_name);
CREATE INDEX IF NOT EXISTS n8n_events_event_idx ON n8n_events(event);

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────────────────────

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

ALTER TABLE saved_scans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own scans" ON saved_scans FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "Users can insert own scans" ON saved_scans FOR INSERT WITH CHECK (auth.uid()::text = user_id);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own subscription" ON subscriptions FOR SELECT USING (auth.uid()::text = user_id);
