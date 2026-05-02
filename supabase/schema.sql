create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  trade text not null,
  contact text not null,
  contact_type text not null default 'unknown',
  source text not null default 'site',
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

drop policy if exists "service role manages waitlist" on public.waitlist;
create policy "service role manages waitlist"
on public.waitlist
for all
to service_role
using (true)
with check (true);
