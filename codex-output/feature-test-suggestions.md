# JobFilter Feature Regression Tests

Use these before shipping lead, pricing, or free-tool changes.

## Free Preview Gate
- `node codex-output/free-scanner-redaction-regression.mjs`
- `node codex-output/free-preview-live-contract-test.mjs`
- Checks buyer, URL, deadline, exact value, exact score/source detail, and searchable title stay locked.

## Postcode And Filter Handling
- `npx tsx codex-output/postcode-filter-regression.mjs`
- Checks full postcodes, no-space postcodes, and outward-only formats like `B10`, `L10`, `SY11`, plus junk rejects.

## Lead Engine Quality
- `npx tsx codex-output/lead-engine-quality-regression.mjs`
- `npx tsx codex-output/lead-engine-50-plus-quality-test-fixed.mjs`
- Checks schema, no empty outputs, anti-junk, ordering, and one-lead-per-week value.

## Free Tools
- `node codex-output/free-access-daily-tools-regression.mjs`
- Checks useful free tools are visible and paid lead value remains positioned as locked.

## Package Copy
- `node codex-output/package-copy-regression.mjs`
- Checks Highest package / Letterhead Pack copy remains visible on pricing and landing pages.

## Full Site Build
- `npm run lint`
- `npm run build`
- Run after any production-facing change.