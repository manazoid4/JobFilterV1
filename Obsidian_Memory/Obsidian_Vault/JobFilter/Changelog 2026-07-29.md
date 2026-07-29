# Changelog 2026-07-29 — NightlyBuildAgent Run

## Build status
- `npm run build` — PASS (118 static pages)
- `npx tsc --noEmit` — PASS (0 errors)

## Feature built — Won leaderboard API

**File:** `app/api/wins/stats/route.ts` (new)

The `WinStatsBanner` component was already imported and rendered in `FindJobsPage.tsx` but the backend route `/api/wins/stats` did not exist, causing a silent 404 on every FindJobs page load.

Built `GET /api/wins/stats?postcode=B14`:
- Queries Supabase `lead_outcomes` table for wins in the last 30 days
- Returns anonymised aggregate: `wonCount`, `totalValueFormatted`, message string
- Returns `{ ok: false }` gracefully when Supabase is unconfigured (banner stays hidden)
- Message format: "5 jobs won near B14 in the last 30 days — £38k in work"
- Value formatting: pence → £Xk / £X.Xm (same convention as roi-stats endpoint)

## Copy fixed — FindJobsPage

**File:** `src/pages/FindJobsPage.tsx`

- Scan-limit expired message: `"Buyer and submission context locked. Scanning remains free."` → `"Free scan limit reached. Upgrade to see the full buyer name, published value, response deadline and how to bid."` — names the exact value of upgrading at the highest-intent conversion moment
- Scan-limit CTA: `"UNLOCK — £39/MO →"` → `"SEE BUYER DETAILS — £39/MO →"` — specific, not generic

## Copy fixed — PricingPage

**File:** `src/pages/PricingPage.tsx`

- Pilot plan `priceNote`: `"Paid activation follows coverage and delivery checks."` → `"Cancel any time. Run the free scan first — no card needed."` — removed billing ambiguity
- Pilot plan body: removed internal jargon about "delivery features activate only when account and provider setup is ready"
- Pilot plan CTA: `"START AFTER COVERAGE CHECK →"` → `"START — £39/MO →"` — clearer
- Added `"No credit card required to scan first"` note under Pilot CTA
- Consolidated duplicate "no card" disclaimers in hero (was two sentences, now one)
- Bottom yellow CTA section: `"SCAN FREE FIRST →"` → `"SCAN FREE — NO CARD NEEDED →"` — consistent with other CTAs
- Coverage section: added `SCAN FREE NOW →` CTA button (instruction without action fixed)

## Site health NEEDLE findings

Three issues identified by NEEDLE agent:

1. **Duplicate trade selection (Issue 1 — NOT fixed this run):** Two trade-selection controls on FindJobsPage — a `<select>` dropdown in the form AND preset buttons that immediately fire `submit()`. Confusing UX — users don't know which control "wins". Fix: remove the dropdown, make preset buttons state-only, keep single "SCAN NOW →" submit path. Deferred — larger refactor.

2. **Scan-limit message (Issue 2 — FIXED):** See above.

3. **Pricing page ambiguity (Issue 3 — FIXED):** See above.

CRITIC verdict on Issue 2 fix: Yes — message names specific unlocked features, clearer in <3 seconds.
REVENUE verdict: Yes — naming exact value at the exact conversion moment increases £39/mo likelihood.

## PR

PR #409: https://github.com/manazoid4/JobFilterV1/pull/409
Branch: `nightly/2026-07-29-wins-api-copy`

## CI notes

- Vercel deployment error on PR: pre-existing issue (cron `0 * * * *` in `vercel.json` incompatible with Hobby plan). Was already in `main` before this run. No action taken.
- Supabase Preview: skipped (no migrations, expected).
- GitHub Actions `check` job: in_progress at time of writing.

## Next run priorities

1. **Fix duplicate trade select UX (NEEDLE Issue 1):** Remove `<select>` dropdown from FindJobsPage form. Preset buttons already cover all 8 trades and are more mobile-friendly. Update presets to set state only (not trigger submit). Single "SCAN NOW →" submit path.
2. **Google Calendar ICS export:** `GET /api/leads/:id/calendar.ics` returning a valid ICS file. Add "ADD TO CALENDAR" link to LeadDetailPage. Frontend and backend both needed.
3. **Verify wins API in production:** Once real `lead_outcomes` rows exist with `status='won'`, check `WinStatsBanner` renders correctly on FindJobsPage with a postcode that has wins.
