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

create table if not exists leads (
  id text primary key,
  fusion_key text,
  title text not null,
  trade text not null,
  location text not null,
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
  lead_readiness text,
  signal_class text,
  signal_stack text[],
  evidence_badges text[],
  score_reasons text[],
  recommended_action text,
  is_commercial boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists delivery_events (
  id uuid primary key default gen_random_uuid(),
  lead_id text,
  phone text,
  provider text,
  message_body text,
  status text,
  sent_at timestamptz default now(),
  error text,
  is_duplicate boolean default false,
  unique(lead_id, phone)
);

create table if not exists lead_outcomes (
  id uuid primary key default gen_random_uuid(),
  lead_id text not null,
  user_id text,
  status text not null default 'new',
  value numeric,
  notes text,
  won_at timestamptz,
  lost_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists territory_metrics (
  id uuid primary key default gen_random_uuid(),
  postcode_outward text not null,
  trade text not null,
  signal_score integer default 0,
  label text default 'STEADY',
  signals_this_week integer default 0,
  planning_count integer default 0,
  epc_count integer default 0,
  contract_count integer default 0,
  avg_estimated_value numeric default 0,
  lock_status text default 'open',
  updated_at timestamptz default now(),
  unique(postcode_outward, trade)
);

create table if not exists user_entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  plan text not null default 'free',
  postcode_outwards text[] default '{}',
  trades text[] default '{}',
  full_access boolean default false,
  unlimited_scans boolean default false,
  valid_until timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id)
);

create index if not exists leads_postcode_trade_idx on leads(postcode_outward, trade);
create index if not exists leads_score_idx on leads(score desc);
create index if not exists delivery_events_lead_phone_idx on delivery_events(lead_id, phone);
create index if not exists lead_outcomes_lead_idx on lead_outcomes(lead_id);

alter table leads enable row level security;
alter table delivery_events enable row level security;
alter table lead_outcomes enable row level security;
alter table territory_metrics enable row level security;
alter table user_entitlements enable row level security;
