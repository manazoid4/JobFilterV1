-- Runtime overrides for lead source enabled state and score bonuses.
-- NULL score_bonus means "use static default from SOURCE_REGISTRY".
CREATE TABLE IF NOT EXISTS source_config (
  key TEXT PRIMARY KEY,
  enabled BOOLEAN NOT NULL DEFAULT true,
  score_bonus INTEGER,
  updated_at TIMESTAMPTZ DEFAULT now()
);
