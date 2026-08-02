-- Fix lead_alerts schema: add columns used by the send route but missing from initial migration.
-- Also tighten frequency constraint now that 'instant' is no longer a supported cadence.

ALTER TABLE lead_alerts
  ADD COLUMN IF NOT EXISTS last_checked_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS radius_miles     INTEGER DEFAULT 25;

-- Migrate any existing 'instant' rows to 'daily' before adding the new constraint;
-- PostgreSQL validates ADD CONSTRAINT against all existing rows immediately.
UPDATE lead_alerts SET frequency = 'daily' WHERE frequency = 'instant';

-- Drop and recreate the frequency check without 'instant'.
ALTER TABLE lead_alerts DROP CONSTRAINT IF EXISTS lead_alerts_frequency_check;
ALTER TABLE lead_alerts ADD CONSTRAINT lead_alerts_frequency_check
  CHECK (frequency IN ('daily', 'weekly'));
