-- Backfill lead_outcomes rows where postcode_outward was stored as a full
-- postcode instead of just the outward code. Normalizes the stored value
-- (uppercase, strip non-alphanumeric) before pattern-matching so that all
-- variants — "B14 7QH", "B14  7QH", "B14-7QH", "b147qh" — are caught.
-- The regex and normalization mirror outwardFromPostcode() in
-- server/utils/postcode.ts.

UPDATE lead_outcomes
SET postcode_outward = (
  regexp_match(
    upper(regexp_replace(postcode_outward, '[^A-Za-z0-9]', '', 'g')),
    '^([A-Z]{1,2}[0-9][A-Z0-9]?)[0-9][A-Z]{2}$'
  )
)[1]
WHERE postcode_outward IS NOT NULL
  AND (
    upper(regexp_replace(postcode_outward, '[^A-Za-z0-9]', '', 'g'))
    ~ '^[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2}$'
  );
