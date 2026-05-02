# Free Preview Gate Test - 1 May 2026

## What Failed
- Free scanner card showed buyer, deadline, exact value, exact source confidence, and searchable title.
- Firebase Functions had a separate `/api/leads/search` path that could leak full lead data.

## Fix
- Free preview now locks buyer, deadline, URL, exact value, exact timing, exact source confidence, and searchable title.
- UI now defensively shows locked values even if an API sends too much.

## Saved Tests
- `node codex-output/free-scanner-redaction-regression.mjs`
- `node codex-output/free-preview-live-contract-test.mjs`
- `npx tsx codex-output/postcode-filter-regression.mjs`

## Links
- [[System Index]]
- [[Free Access Audit - 1 May 2026]]
- [[Agent Running Model]]
