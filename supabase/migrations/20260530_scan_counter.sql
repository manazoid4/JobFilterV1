-- Add server-side weekly scan counter to profiles.
-- These columns replace the client-side localStorage counter as the authoritative gate.
-- weekly_scan_week: ISO week key (YYYY-WXX) — reset counter when week changes.
-- weekly_scan_count: number of free scans used this week.

alter table public.profiles
  add column if not exists weekly_scan_week text,
  add column if not exists weekly_scan_count integer not null default 0;
