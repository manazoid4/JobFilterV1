-- 2026-06-11 Batch B: intake persistence + profile metadata capture
-- 1. intake_submissions: server-side store for homeowner intake leads (was localStorage-only)
-- 2. profiles.whatsapp_number: where GOLD alerts get sent per tradesperson
-- 3. handle_new_user(): copy signup metadata (trade, postcode, phone, company) into profiles
--    (002_profile_trigger.sql only copied id + email — signup form data was silently dropped)

create table if not exists public.intake_submissions (
  id text primary key,
  username text not null,
  job_type text not null,
  urgency text not null,
  details text,
  postcode text,
  phone text,
  has_photos boolean default false,
  budget text,
  score integer not null,
  tier text not null,
  area text,
  flags text[],
  created_at timestamptz default now()
);
create index if not exists intake_submissions_username_idx
  on public.intake_submissions (username, created_at desc);

alter table public.intake_submissions enable row level security;
-- Service role bypasses RLS; no anon access policies on purpose (writes go through the API).

alter table public.profiles add column if not exists whatsapp_number text;

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, trade, postcode_outward, phone, company_name, created_at, updated_at)
  values (
    new.id,
    new.email,
    nullif(new.raw_user_meta_data->>'trade', ''),
    nullif(upper(new.raw_user_meta_data->>'postcode_outward'), ''),
    nullif(new.raw_user_meta_data->>'phone', ''),
    nullif(new.raw_user_meta_data->>'company_name', ''),
    now(),
    now()
  )
  on conflict (id) do update set
    trade = coalesce(public.profiles.trade, excluded.trade),
    postcode_outward = coalesce(public.profiles.postcode_outward, excluded.postcode_outward),
    phone = coalesce(public.profiles.phone, excluded.phone),
    company_name = coalesce(public.profiles.company_name, excluded.company_name),
    updated_at = now();
  return new;
end;
$$ language plpgsql security definer;
