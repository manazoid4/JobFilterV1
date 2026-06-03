-- intake_submissions: tracks every public intake form submission.
-- Used for per-IP rate limiting and intake-specific analytics.
CREATE TABLE IF NOT EXISTS intake_submissions (
  id           text        PRIMARY KEY,
  username     text        NOT NULL DEFAULT 'unknown',
  ip           text        NOT NULL DEFAULT 'unknown',
  job_type     text        NOT NULL,
  urgency      text        NOT NULL,
  details      text,
  postcode     text,
  phone        text,
  has_photos   boolean     NOT NULL DEFAULT false,
  budget       text,
  score        integer     NOT NULL DEFAULT 0,
  tier         text        NOT NULL DEFAULT 'BRONZE',
  area         text        NOT NULL DEFAULT '',
  flags        text[]      NOT NULL DEFAULT '{}',
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- Rate-limit queries filter by ip + created_at window; this index makes them fast.
CREATE INDEX IF NOT EXISTS intake_submissions_ip_created_at
  ON intake_submissions (ip, created_at DESC);
