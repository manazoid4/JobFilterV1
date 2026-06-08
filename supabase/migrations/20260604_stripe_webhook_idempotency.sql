-- Idempotency table for Stripe webhook events
-- Prevents duplicate processing of the same Stripe event

CREATE TABLE IF NOT EXISTS stripe_webhook_events (
  id bigint generated always as identity primary key,
  event_id text not null,
  event_type text not null,
  processed_at timestamptz default now()
);

-- Unique index on event_id for fast duplicate checks
CREATE UNIQUE INDEX IF NOT EXISTS stripe_webhook_events_event_id_idx ON stripe_webhook_events(event_id);

-- RLS: only service role should write to this table (internal use)
ALTER TABLE stripe_webhook_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "stripe_webhook_events_service_role" ON stripe_webhook_events;
CREATE POLICY "stripe_webhook_events_service_role" ON stripe_webhook_events
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);
