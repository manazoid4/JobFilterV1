-- Lead Alert Subscriptions
-- Allows users to register alerts for a trade + location combination.
-- Instant and daily frequencies are paid-only; weekly is available to free users.
-- Email delivery requires RESEND_API_KEY or SENDGRID_API_KEY (not implemented here).

CREATE TABLE IF NOT EXISTS lead_alerts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  user_id TEXT NOT NULL,
  trade TEXT NOT NULL,
  location TEXT NOT NULL,           -- human-readable area name
  postcode_outward TEXT,            -- optional: outward code for geo-filtering (e.g. 'SW1')
  frequency TEXT NOT NULL CHECK (frequency IN ('instant', 'daily', 'weekly')),
  active BOOLEAN DEFAULT true,
  last_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS lead_alerts_user_idx ON lead_alerts(user_id);
CREATE INDEX IF NOT EXISTS lead_alerts_active_idx ON lead_alerts(active, frequency);
-- Prevent duplicate alert for same user/trade/location/frequency
CREATE UNIQUE INDEX IF NOT EXISTS lead_alerts_unique_idx ON lead_alerts(user_id, trade, location, frequency);
