# JobFilter Agent Notes

## Repo Reality

- Stack: Next.js 16, React 19, TypeScript, Supabase, Stripe.
- Current live opportunity source: Find a Tender OCDS releases.
- Contracts Finder is legacy/backfill only and should not be treated as the current-notice source.

## Working Commands

- `npm run dev` - local Next.js app.
- `npm run start` - serve the built Next.js app with `next start`.
- `npm run preview` - same runtime entry as `start`; useful after a local production build.
- `npm run lint` - TypeScript no-emit check.
- `npm run releases:check` - validate release metadata before shipping.
- `npm run build` - release gate plus production build (`npm run releases:check && next build`).
- `npm run test:fts` - Find a Tender OCDS regression.
- `npm run benchmark:fts` - benchmark FTS relevance/scoring changes.
- `npm run gate:fts` - FTS coverage gate.

## FTS Evidence Workflow

- Capture a current local FTS sample with `node scripts/download-fts.mjs`; it writes `artifacts/fts-live-benchmark.json`.
- Run `npm run benchmark:fts -- --input artifacts/fts-live-benchmark.json --trade <trade> --postcode <outward-postcode> --locality <locality> --labels <labels.json>`, then validate its output with `npm run gate:fts -- --report artifacts/fts-benchmark/fts-review-set.json`.
- The coverage gate is intentionally fail-closed: synthetic labels cannot establish readiness; use externally sourced, non-synthetic human labels.

## CI / Release Workflow

Current CI in [`.github/workflows/ci.yml`](C:/Users/manaz/JobFilterV1/.github/workflows/ci.yml) runs this sequence:

- Runner baseline: Node.js 22 via `actions/setup-node@v5`.

1. `npm ci`
2. `npm audit --audit-level=high`
3. `npm run lint`
4. `npx tsx tests/regression/production-source-safety-regression.mjs`
5. `npx tsx tests/regression/postcode-filter-regression.mjs`
6. `node tests/regression/lead-engine-source-config-regression.mjs`
7. `node tests/regression/free-scanner-redaction-regression.mjs`
8. `npx tsx tests/regression/lead-engine-quality-regression.mjs`
9. `npm run test:fts`
10. `npm run build`
11. `node tests/regression/production-runtime-regression.mjs`

Additional targeted regression probes live in [`tests/regression`](C:/Users/manaz/JobFilterV1/tests/regression). When touching a specific contract area, prefer running the matching file directly with `node` or `npx tsx` rather than expanding the default CI sequence.

## Deployment Notes

- Vercel build command: `npm run build`.
- Vercel cron hits `/api/alerts/send` hourly via [`vercel.json`](C:/Users/manaz/JobFilterV1/vercel.json).
