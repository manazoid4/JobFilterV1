# Changelog 2026-07-24

## NightlyBuildAgent Run — 2026-07-24

### BUILD STATUS
- npm run build: PASS (117 static pages)
- TypeScript: CLEAN

### FEATURE BUILT — ADD TO CALENDAR (ICS Export)
**File:** `src/pages/FindJobsPage.tsx`

The backend `/api/leads/calendar.ics` endpoint was already registered (via `server/routes/calendarExport.ts`) but had no UI link. Added "ADD TO CALENDAR" link to every lead card's right column. Shows for all users (free and paid) — no locked data is exposed. Clicking downloads an `.ics` file pre-filled with job type, postcode, area, score and urgency.

Added `CalendarDays` icon from lucide-react to imports.

### COPY FIXED — Pricing Page (`src/pages/PricingPage.tsx`)

1. **Hero headline** rewritten from passive ("KNOW WHICH PUBLIC WORKS OPPORTUNITIES FIT YOUR FIRM") to fear-first ("STOP READING TENDERS THAT DON'T FIT YOUR FIRM.")
2. **Free CTA copy** — both free-scan buttons now include "NO CARD" / "NO CREDIT CARD" inline
3. **Pilot plan card CTA** fixed from confusing "START AFTER COVERAGE CHECK →" to "START £39/MO →" with a note below (NEEDLE fix: was the top-ranked UX issue)
4. **Bottom CTA section** strengthened: "SEE WHAT'S LIVE IN YOUR TRADE AND REGION." + value prop note
5. **Q&A section** — added 2 new entries:
   - BuildAlert / Planning Pipe comparison (they send bulk alerts; JobFilter adds firm-aware qualification)
   - FTS-direct comparison (honest: "if FTS works for you, use it")

### COPY FIXED — Homepage (`src/pages/HomePage.tsx`)

1. **Proof points** rewritten for specificity (from generic to concrete claims)
2. **Ops strip** now names Checkatrade and Bark as the excluded category ("Not Checkatrade. Not Bark. Official public-sector tenders.")

### SITE HEALTH — NEEDLE Fix

**Issue:** Pilot plan card CTA label "START AFTER COVERAGE CHECK →" contradicted the hero CTA "START £39/MO →" — two price points on the same page sending different signals.

**Fix:** Unified to "START £39/MO →" with one-line note below. CRITIC: readable in <3s. REVENUE: removes friction from the purchase CTA.

### PR
- Branch: `nightly-build-2026-07-24`
- PR: https://github.com/manazoid4/JobFilterV1/pull/392
- CI: All 12 regression checks passed; Vercel deployment error is pre-existing (hourly cron blocked on Hobby plan — predates this branch)

---

## NEXT RUN — Top 3 Priorities

1. **Consolidate the triple paywall CTA on FindJobsPage** — three separate upgrade blocks appear on the same results screen (commercial filter, inline gold-lead gate, post-results banner). Consolidate into one end-of-list banner for full weight.
2. **Trust section on HomePage** — replace the six technical-label chips ("CPV trade codes", "Published deadline") with a real trust signal (pilot user count, named outcome, or contractor quote).
3. **Won leaderboard activation** — `WinStatsBanner` and `/api/wins/stats` are both built but the banner only shows when `wonCount > 0`. Seed the first outcome or add a "Be the first" zero-state banner to drive adoption of the win-logging flow.
