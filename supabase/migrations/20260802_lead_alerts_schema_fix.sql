-- Fix lead_alerts schema: add columns used by the send route but missing from initial migration.
-- Also tighten frequency constraint now that 'instant' is no longer a supported cadence.

ALTER TABLE lead_alerts
  ADD COLUMN IF NOT EXISTS last_checked_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS radius_miles     INTEGER DEFAULT 25;

-- Migrate any existing 'instant' rows to 'daily' before adding the new constraint.
-- If a user already has a 'daily' row for the same (user_id, trade, location), the
-- UPDATE would violate lead_alerts_unique_idx.  Handle in three steps:

-- Step 1: Merge relevant state from the instant row into the surviving daily row so the
-- user does not silently lose their alert.  If the instant row was active and the daily
-- row was paused, activate the daily row.  Also carry over the postcode if the daily row
-- has none (the cron skips rows with a null postcode_outward).
UPDATE lead_alerts d
SET    active           = (d.active OR i.active),
       postcode_outward = COALESCE(d.postcode_outward, i.postcode_outward)
FROM   lead_alerts i
WHERE  i.user_id   = d.user_id
  AND  i.trade     = d.trade
  AND  i.location  = d.location
  AND  i.frequency = 'instant'
  AND  d.frequency = 'daily';

-- Step 2: Delete colliding instant rows now that their state has been merged.
DELETE FROM lead_alerts i
WHERE i.frequency = 'instant'
  AND EXISTS (
    SELECT 1 FROM lead_alerts d
    WHERE d.user_id   = i.user_id
      AND d.trade     = i.trade
      AND d.location  = i.location
      AND d.frequency = 'daily'
  );

-- Step 3: Convert remaining instant rows (no daily duplicate exists) to daily.
UPDATE lead_alerts SET frequency = 'daily' WHERE frequency = 'instant';

-- Drop and recreate the frequency check without 'instant'.
ALTER TABLE lead_alerts DROP CONSTRAINT IF EXISTS lead_alerts_frequency_check;
ALTER TABLE lead_alerts ADD CONSTRAINT lead_alerts_frequency_check
  CHECK (frequency IN ('daily', 'weekly'));
