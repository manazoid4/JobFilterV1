# Changelog 2026-08-22 — NightlyBuildAgent

## Build Status
- `npm run build` — PASS (122 static pages, 0 errors)
- `npx tsc --noEmit` — PASS (0 errors)
- Commit: `8102264`
- PR: https://github.com/manazoid4/JobFilterV1/pull/496

---

## Phase 1 — Fix Broken
- No TypeScript errors found
- No broken imports detected
- No fake form flows (no bare `setSubmitted(true)` without backend)
- Build was failing on first run due to missing `node_modules` — ran `npm install`, then build passed

---

## Phase 2 — Feature Built: Won Leaderboard API

**New file: `app/api/wins/stats/route.ts`**
- `GET /api/wins/stats?postcode=B14` — endpoint for `WinStatsBanner` component
- Was returning 404 on every FindJobsPage render (component was wired, API was not)
- Reads `data/outcomes.jsonl` at runtime (gitignored, gracefully handled when absent)
- Returns anonymised win count + total value for postcode outward (90-day window)
- `WinStatsBanner` hides itself when `wonCount === 0` — no UI impact until real data exists

**New file: `app/api/leads/calendar.ics/route.ts`**
- `GET /api/leads/calendar.ics?jobType=...&postcode=...` — Next.js App Router route
- `LeadDetailPage`'s `CalendarCopyLink` component was generating URLs to this endpoint, but it only existed in the Express server (`server/routes/calendarExport.ts`)
- Returns valid ICS file with proper `Content-Type: text/calendar` and `Content-Disposition` headers

---

## Phase 3 — Copy Polish

**PricingPage (`src/pages/PricingPage.tsx`)**
- Hero label: "FOUNDER-ASSISTED PILOT" → "FROM £39/MO — NO CONTRACT, CANCEL ANYTIME"
- Hero headline: fear → proof → control structure ("STOP WASTING HOURS ON THE FTS PORTAL. GET THE BID/SKIP ANSWER IN SECONDS.")
- Hero description: names BuildAlert and Planning Pipe as raw-alert competitors
- Added 2 explicit FAQ entries:
  - How is this different from BuildAlert or Planning Pipe?
  - How is this different from Checkatrade, MyBuilder, Bark?
- All free CTAs updated to include "NO CREDIT CARD"
- Bottom CTA section: "SCAN YOUR AREA NOW — THEN DECIDE" (was "VERIFY COVERAGE BEFORE YOU PAY")

**SignupPage (`src/pages/SignupPage.tsx`)**
- Label: "CREATE YOUR JOBFILTER ACCOUNT" → "NO PER-LEAD FEES. NO CHECKATRADE CREDITS. NO BARK AUCTIONS."
- Headline: "CREATE YOUR ACCOUNT." → "GET PUBLIC CONTRACTS FOR YOUR TRADE."
- Description now explains value: "we qualify current public notices against your area"

---

## Phase 4 — Site Health Fix

**NEEDLE — Top 3 UX issues identified:**
1. "CHECK FTS FREE" in nav — FTS is procurement jargon, not tradesman language
2. "CHECK FIND A TENDER FREE" in mobile menu — same issue
3. Pricing page had no competitor differentiation (tradesmen coming from Checkatrade don't know they're different products)

**BUILDER — Fixed highest-impact issue:**
`TopNav.tsx` — replaced FTS jargon with tradesman-readable CTAs:
- Desktop: "CHECK FTS FREE" → "SCAN FREE →"
- Mobile quicklink: "CHECK FTS" → "SCAN FREE" with "NO CREDIT CARD" sublabel
- Mobile bottom CTA: "CHECK FIND A TENDER FREE" → "SCAN YOUR AREA FREE — NO CREDIT CARD"

**CRITIC:** Clearer in <3 seconds? YES — "SCAN FREE" is instantly understood by any electrician or plumber.

**REVENUE:** Increases £39/mo likelihood? YES — user understands the free action, sees value, more likely to upgrade.

---

## What Was Already Built (Not Touched)
- Scan counter on FindJobsPage (already existed lines 432–448)
- WhatsApp templates: `quick_quote_offer` and `availability_check` already present in `chaseTemplates.ts`
- Trade-specific scoring reasons: `parseTradeReasons()` already in FindJobsPage
- `WinStatsBanner` component: already wired to FindJobsPage (just needed the API)

---

## Files Changed
- `app/api/wins/stats/route.ts` — NEW
- `app/api/leads/calendar.ics/route.ts` — NEW
- `src/components/TopNav.tsx` — nav CTA copy
- `src/pages/PricingPage.tsx` — copy overhaul
- `src/pages/SignupPage.tsx` — copy overhaul
