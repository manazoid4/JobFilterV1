-- Atomically claim a free-tier scan so concurrent serverless requests cannot
-- bypass the weekly allowance with read-then-write races.
create or replace function public.claim_weekly_scan(
  p_user_id uuid,
  p_week text,
  p_limit integer default 3
)
returns table (allowed boolean, scans_used integer)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  claimed_count integer;
begin
  if p_user_id is null or p_week is null or p_week = '' or p_limit < 1 then
    raise exception 'invalid scan quota claim';
  end if;

  insert into public.profiles (id, weekly_scan_week, weekly_scan_count, updated_at)
  values (p_user_id, p_week, 1, now())
  on conflict (id) do update
  set weekly_scan_week = excluded.weekly_scan_week,
      weekly_scan_count = case
        when profiles.weekly_scan_week = excluded.weekly_scan_week
          then least(profiles.weekly_scan_count + 1, p_limit + 1)
        else 1
      end,
      updated_at = now()
  returning weekly_scan_count into claimed_count;

  return query select claimed_count <= p_limit, claimed_count;
end;
$$;

revoke all on function public.claim_weekly_scan(uuid, text, integer) from public, anon, authenticated;
grant execute on function public.claim_weekly_scan(uuid, text, integer) to service_role;
