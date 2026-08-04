-- Microsite growth loop: per-firm shareable pages at jobfilter.uk/{slug}
-- plus lightweight referral tracking. Writes go through the service role only.

create table if not exists public.microsites (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  firm_name text not null,
  trade text not null default '',
  areas text not null default '',
  phone text not null default '',
  whatsapp text not null default '',
  years text not null default '',
  blurb text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.microsite_referrals (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  event text not null default 'click',   -- 'click' | 'signup'
  source text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists microsite_referrals_slug_idx on public.microsite_referrals (slug);

alter table public.microsites enable row level security;
alter table public.microsite_referrals enable row level security;

-- Public pages are readable by anyone; there are deliberately no anon insert/update
-- policies, so only the service role (which bypasses RLS in the API) can write.
drop policy if exists microsites_public_read on public.microsites;
create policy microsites_public_read on public.microsites for select using (true);
