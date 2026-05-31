-- Migration: owner access role + lead status consistency
-- Safe to re-run: uses IF NOT EXISTS / conditional checks throughout

-- 1. Add role column to profiles for owner/superuser designation
alter table if exists profiles
  add column if not exists role text not null default 'user';

-- 2. Set owner role for manazoid4@gmail.com (idempotent)
update profiles
  set role = 'owner'
  where email = 'manazoid4@gmail.com'
    and role != 'owner';

-- 3. Expand leads.status check constraint to support full lifecycle
-- Drop existing constraint if present (by name lookup) then re-add
do $$
declare
  cname text;
begin
  select constraint_name into cname
    from information_schema.table_constraints
   where table_name = 'leads'
     and constraint_type = 'CHECK'
     and constraint_name ilike '%status%'
   limit 1;
  if cname is not null then
    execute 'alter table leads drop constraint ' || quote_ident(cname);
  end if;
end
$$;

alter table if exists leads
  add constraint leads_status_check check (
    status in (
      'new', 'saved', 'contacted', 'answered',
      'quoted', 'won', 'lost', 'no_answer',
      'ignored', 'closed', 'cancelled',
      'delivered', 'opened'
    )
  );

-- 4. Ensure subscriptions has both plan and tier columns (resolves plan vs tier drift)
--    tier is kept in sync with plan via a trigger so both names work in queries.
alter table if exists subscriptions
  add column if not exists tier text;

-- Backfill tier from plan where missing
update subscriptions
   set tier = plan
 where tier is null and plan is not null;

-- Trigger to keep tier in sync with plan going forward
create or replace function sync_subscription_tier()
returns trigger language plpgsql as $$
begin
  new.tier := new.plan;
  return new;
end;
$$;

drop trigger if exists sync_tier_from_plan on subscriptions;
create trigger sync_tier_from_plan
  before insert or update of plan on subscriptions
  for each row execute function sync_subscription_tier();
