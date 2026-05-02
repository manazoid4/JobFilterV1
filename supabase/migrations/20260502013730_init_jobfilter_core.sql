create extension if not exists pgcrypto;

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) > 0),
  trade text not null check (length(trim(trade)) > 0),
  contact text not null check (length(trim(contact)) > 0),
  contact_type text not null default 'unknown' check (contact_type in ('email', 'phone', 'unknown')),
  source text not null default 'site',
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

revoke all on table public.waitlist from anon;
revoke all on table public.waitlist from authenticated;
grant all on table public.waitlist to service_role;

drop policy if exists "service role manages waitlist" on public.waitlist;
create policy "service role manages waitlist"
on public.waitlist
for all
to service_role
using (true)
with check (true);

create index if not exists waitlist_created_at_idx
on public.waitlist (created_at desc);

create table if not exists public.leads (
  id text primary key,
  title text not null check (length(trim(title)) > 0),
  trade text not null check (length(trim(trade)) > 0),
  location text not null check (length(trim(location)) > 0),
  postcode_outward text not null check (postcode_outward = upper(postcode_outward) and length(trim(postcode_outward)) > 0),
  estimated_value numeric(12, 2) not null default 0 check (estimated_value >= 0),
  urgency text not null check (urgency in ('low', 'medium', 'high')),
  source text not null check (length(trim(source)) > 0),
  source_confidence integer not null check (source_confidence between 0 and 100),
  contact_signal text not null check (contact_signal in ('none', 'weak', 'strong')),
  status text not null default 'new' check (status in ('new', 'qualified', 'sent', 'won', 'lost', 'archived')),
  score integer not null default 0 check (score between 0 and 100),
  reasons text[] not null default '{}',
  source_url text,
  raw_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.leads enable row level security;

revoke all on table public.leads from anon;
revoke all on table public.leads from authenticated;
grant all on table public.leads to service_role;

drop policy if exists "service role manages leads" on public.leads;
create policy "service role manages leads"
on public.leads
for all
to service_role
using (true)
with check (true);

create index if not exists leads_priority_idx
on public.leads (status, score desc, estimated_value desc, created_at desc);

create index if not exists leads_trade_postcode_idx
on public.leads (trade, postcode_outward);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_leads_updated_at on public.leads;
create trigger set_leads_updated_at
before update on public.leads
for each row
execute function public.set_updated_at();
