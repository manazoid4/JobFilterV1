-- Fix: lead_outcomes had no per-user ownership column, so /api/leads/roi-stats
-- (which powers the "your ROI" dashboard widget for paid users) was reading
-- and aggregating every tenant's outcome rows together. Adds scoping so each
-- paid user's ROI Tracker reflects only their own logged outcomes.
alter table if exists lead_outcomes
  add column if not exists user_id text;

create index if not exists lead_outcomes_user_id_idx on lead_outcomes(user_id);
