-- Backfill lead_outcomes rows where postcode_outward was stored as a full
-- postcode (e.g. "B14 7QH" or "B147QH") instead of just the outward code
-- ("B14"). The regex mirrors the outwardFromPostcode() logic in
-- server/utils/postcode.ts: strip non-alphanumeric chars, uppercase, then
-- extract the leading 2–4 character outward portion.

UPDATE lead_outcomes
SET postcode_outward = (
  regexp_match(
    upper(regexp_replace(postcode_outward, '[^A-Z0-9a-z]', '', 'g')),
    '^([A-Z]{1,2}[0-9][A-Z0-9]?)(?:[0-9][A-Z]{2})?$'
  )
)[1]
WHERE postcode_outward IS NOT NULL
  AND (
    -- Spaced full postcode: "B14 7QH"
    postcode_outward ~ '^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][A-Z]{2}$'
    OR
    -- Compact full postcode: "B147QH"
    postcode_outward ~ '^[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2}$'
  );
