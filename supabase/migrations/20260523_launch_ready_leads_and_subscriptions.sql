alter table public.leads
  add column if not exists fusion_key text,
  add column if not exists source_url text,
  add column if not exists buyer_name text,
  add column if not exists published_at timestamptz,
  add column if not exists deadline_at timestamptz,
  add column if not exists quality_label text,
  add column if not exists ghost_risk text,
  add column if not exists signal_class text,
  add column if not exists recommended_action text,
  add column if not exists is_commercial boolean not null default false,
  add column if not exists payload jsonb not null default '{}'::jsonb;

alter table public.subscriptions
  add column if not exists active boolean not null default false;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'leads_source_confidence_range'
  ) then
    alter table public.leads add constraint leads_source_confidence_range check (source_confidence between 0 and 100);
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'leads_score_range'
  ) then
    alter table public.leads add constraint leads_score_range check (score between 0 and 100);
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'leads_urgency_allowed'
  ) then
    alter table public.leads add constraint leads_urgency_allowed check (urgency in ('low', 'medium', 'high'));
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'leads_contact_signal_allowed'
  ) then
    alter table public.leads add constraint leads_contact_signal_allowed check (contact_signal in ('none', 'weak', 'strong'));
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'leads_status_allowed'
  ) then
    alter table public.leads add constraint leads_status_allowed check (status in ('new', 'saved', 'ignored', 'closed', 'cancelled'));
  end if;
end $$;

create index if not exists leads_source_created_idx on public.leads(source, created_at desc);
create index if not exists subscriptions_user_status_idx on public.subscriptions(user_id, status);

drop policy if exists "leads_select_own" on public.leads;
revoke select on public.leads from authenticated;
