-- Fix lead_alerts schema: add columns used by the send route but missing from initial migration.
-- Also tighten frequency constraint now that 'instant' is no longer a supported cadence.

ALTER TABLE lead_alerts
  ADD COLUMN IF NOT EXISTS last_checked_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS radius_miles     INTEGER DEFAULT 25;

-- Migrate any existing 'instant' rows to 'daily' before adding the new constraint.
-- If a user already has a 'daily' row for the same (user_id, trade, location), the
-- UPDATE would violate lead_alerts_unique_idx — delete those colliding instant rows first.
DELETE FROM lead_alerts i
WHERE i.frequency = 'instant'
  AND EXISTS (
    SELECT 1 FROM lead_alerts d
    WHERE d.user_id = i.user_id
      AND d.trade   = i.trade
      AND d.location = i.location
      AND d.frequency = 'daily'
  );

-- Convert remaining instant rows to daily; no duplicates remain.
UPDATE lead_alerts SET frequency = 'daily' WHERE frequency = 'instant';

-- Drop and recreate the frequency check without 'instant'.
ALTER TABLE lead_alerts DROP CONSTRAINT IF EXISTS lead_alerts_frequency_check;
ALTER TABLE lead_alerts ADD CONSTRAINT lead_alerts_frequency_check
  CHECK (frequency IN ('daily', 'weekly'));
