create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  trade text,
  company_name text,
  phone text,
  postcode_outward text,
  plan text not null default 'free',
  onboarding_status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id text primary key,
  user_id uuid references auth.users(id) on delete set null,
  title text not null,
  trade text not null,
  location text not null,
  postcode_outward text not null,
  estimated_value text not null,
  urgency text not null,
  source text not null,
  source_confidence integer not null default 0,
  contact_signal text not null default 'none',
  status text not null default 'new',
  score integer not null default 0,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.saved_scans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  trade text not null,
  postcode_outward text not null,
  radius_miles integer not null default 25,
  filters jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.postcode_searches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  postcode text not null,
  postcode_outward text not null,
  trade text,
  result_count integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.tool_outputs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  tool_name text not null,
  input jsonb not null default '{}'::jsonb,
  output jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text unique,
  plan text not null,
  status text not null,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.email_captures (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  trade text,
  source text not null default 'site',
  consent boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.supplier_prices (
  id uuid primary key default gen_random_uuid(),
  supplier text not null,
  category text not null,
  item_name text not null,
  price numeric(12,2),
  currency text not null default 'GBP',
  source_url text,
  checked_at timestamptz not null default now()
);

create table if not exists public.n8n_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'received',
  created_at timestamptz not null default now()
);

create table if not exists public.ai_scores (
  id uuid primary key default gen_random_uuid(),
  lead_id text references public.leads(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  score integer not null,
  model text not null,
  reasons text[] not null default '{}',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists leads_score_created_idx on public.leads(score desc, created_at desc);
create index if not exists leads_trade_postcode_idx on public.leads(trade, postcode_outward);
create index if not exists saved_scans_user_idx on public.saved_scans(user_id, created_at desc);
create index if not exists tool_outputs_user_idx on public.tool_outputs(user_id, created_at desc);
create index if not exists n8n_events_type_idx on public.n8n_events(event_type, created_at desc);
create index if not exists ai_scores_lead_idx on public.ai_scores(lead_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.leads enable row level security;
alter table public.saved_scans enable row level security;
alter table public.postcode_searches enable row level security;
alter table public.tool_outputs enable row level security;
alter table public.subscriptions enable row level security;
alter table public.email_captures enable row level security;
alter table public.supplier_prices enable row level security;
alter table public.n8n_events enable row level security;
alter table public.ai_scores enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select to authenticated using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert to authenticated with check (auth.uid() = id);

drop policy if exists "leads_select_own" on public.leads;
create policy "leads_select_own" on public.leads
  for select to authenticated using (user_id = auth.uid());

drop policy if exists "saved_scans_manage_own" on public.saved_scans;
create policy "saved_scans_manage_own" on public.saved_scans
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "postcode_searches_select_own" on public.postcode_searches;
create policy "postcode_searches_select_own" on public.postcode_searches
  for select to authenticated using (user_id = auth.uid());

drop policy if exists "postcode_searches_insert_own_or_public" on public.postcode_searches;
create policy "postcode_searches_insert_own_or_public" on public.postcode_searches
  for insert to anon, authenticated with check (user_id is null or user_id = auth.uid());

drop policy if exists "tool_outputs_manage_own" on public.tool_outputs;
create policy "tool_outputs_manage_own" on public.tool_outputs
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "subscriptions_select_own" on public.subscriptions;
create policy "subscriptions_select_own" on public.subscriptions
  for select to authenticated using (user_id = auth.uid());

drop policy if exists "email_captures_public_insert" on public.email_captures;
create policy "email_captures_public_insert" on public.email_captures
  for insert to anon, authenticated with check (
    email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
    and length(email) <= 320
  );

drop policy if exists "supplier_prices_public_read" on public.supplier_prices;
create policy "supplier_prices_public_read" on public.supplier_prices
  for select to anon, authenticated using (true);

drop policy if exists "n8n_events_select_own" on public.n8n_events;
create policy "n8n_events_select_own" on public.n8n_events
  for select to authenticated using (user_id = auth.uid());

drop policy if exists "ai_scores_select_own" on public.ai_scores;
create policy "ai_scores_select_own" on public.ai_scores
  for select to authenticated using (user_id = auth.uid());

grant usage on schema public to anon, authenticated;
grant select, insert on public.email_captures to anon, authenticated;
grant select, insert on public.postcode_searches to anon, authenticated;
grant select on public.supplier_prices to anon, authenticated;
grant select, insert, update, delete on public.profiles to authenticated;
grant select on public.leads to authenticated;
grant select, insert, update, delete on public.saved_scans to authenticated;
grant select, insert, update, delete on public.tool_outputs to authenticated;
grant select on public.subscriptions to authenticated;
grant select on public.n8n_events to authenticated;
grant select on public.ai_scores to authenticated;
