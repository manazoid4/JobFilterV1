-- Ensure leads table has all required columns.
-- Safe to run multiple times (uses IF NOT EXISTS guards).

alter table public.leads
  add column if not exists payload jsonb not null default '{}'::jsonb;

alter table public.leads
  add column if not exists fusion_key text;

alter table public.leads
  add column if not exists source_url text;

alter table public.leads
  add column if not exists buyer_name text;

alter table public.leads
  add column if not exists quality_label text;

alter table public.leads
  add column if not exists ghost_risk text;

alter table public.leads
  add column if not exists signal_class text;

alter table public.leads
  add column if not exists recommended_action text;

alter table public.leads
  add column if not exists is_commercial boolean not null default false;

alter table public.leads
  add column if not exists updated_at timestamptz not null default now();

-- Refresh PostgREST schema cache so columns are immediately visible
notify pgrst, 'reload schema';
