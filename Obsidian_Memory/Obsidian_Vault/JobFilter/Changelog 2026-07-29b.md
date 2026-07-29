# Changelog 2026-07-29b — NightlyBuildAgent Run 2 (continuation)

## Build status
- `npm run build` — PASS (118 static pages)
- `npx tsc --noEmit` — PASS (0 errors)

## Hardening — wins API (`app/api/wins/stats/route.ts`)

Commit `9751717` — three Codex P2 issues from the prior run addressed:

### 1. Cohort anonymisation (P2 — FIXED)
Added `MIN_COHORT = 3`. Monetary value is suppressed in the WinStatsBanner message when fewer than 3 wins exist in the 30-day window. A single-win aggregate could disclose an individual's self-reported contract value. The count still displays (e.g., "1 job won via JobFilter in the last 30 days") but the value suffix is withheld.

### 2. Count/value mismatch for large win volumes (P2 — FIXED)
Previous implementation: row-fetch with `.limit(10_000)` for value summation. For >10k wins the count (uncapped) and value sum would diverge.

Fix: replaced row-fetch with two separate PostgREST aggregate queries:
- `won_value.sum()` filtered to rows where `won_value IS NOT NULL`
- `quote_value.sum()` filtered to rows where `won_value IS NULL`

Combined, these replicate `COALESCE(won_value, quote_value)` per-row with no row-fetch cap and no PostgREST column-naming collision (which occurs when two `.sum()` columns are selected in a single query — both return property named `sum`).

Aggregate query errors resolve to 0 so a value-query failure degrades gracefully (count still shown, value suppressed).

### 3. LockedValue gating (P2 — FALSE POSITIVE, no code change)
Codex suggested LockedValue might show buyer/deadline/source URL for free-tier users when values are non-null.

Investigation: `toFreePreviewLead` in `server/routes/leadsSearch.ts` (lines 218–223) explicitly sets `buyer: ''`, `deadlineAt: ''`, `url: ''` for all free-tier API responses. `LockedValue`'s `!value` check evaluates true for empty strings, so the lock UI is always shown. The scan-limit copy ("buyer name, response deadline and official source link") is accurate and no change is needed.

## PR

PR #409: https://github.com/manazoid4/JobFilterV1/pull/409
Branch: `nightly/2026-07-29-wins-api-copy`
Latest commit: `9751717`

## CI notes

- Vercel "Deployment failed" on each push: pre-existing `0 * * * *` cron in `vercel.json` incompatible with Hobby plan. Not a required check.
- GitHub Actions `check` job: awaiting result on `9751717`.
