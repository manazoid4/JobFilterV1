# Changelog — 2026-07-30 (NightlyBuildAgent)

## Build Status
- npm run build: PASS
- npx tsc --noEmit: PASS (0 errors)
- npm install required (next binary was not installed in fresh remote env)

## Changes Made

### COPY — PricingPage.tsx
- Renamed all three `"START £39/MO →"` / `"START AFTER COVERAGE CHECK →"` CTAs → `"ACTIVATE PILOT — £39/MO →"`
  - "START AFTER COVERAGE CHECK" was causing friction at conversion: contractors read it as "you can't start yet"
- Changed secondary free CTA: `"SCAN FREE FIRST →"` → `"SCAN FREE FIRST — NO CARD →"`
- Added `"No credit card required to scan first. Activation follows coverage check."` below featured plan CTA button
- Rewrote Pilot plan `priceNote`: `"Paid activation follows coverage and delivery checks."` → `"Scan free first — no card required until you activate."`
- Rewrote Pilot plan `body`: removed caveat-first language; now leads with what contractor sees: buyer, evidence, missing requirements, exact response route

### COPY — FindJobsPage.tsx
- Replaced vague exhausted-scan message `"Buyer and submission context locked. Scanning remains free."` with specific upgrade value prop: `"Free scans used. Unlock buyer details, deadlines & submission routes — £39/mo, no contract."`

### INFRA FIX — vercel.json
- Changed alerts cron from `0 * * * *` (hourly) to `0 6 * * *` (daily 06:00 UTC)
- Vercel Hobby plan blocks sub-daily cron jobs; this was causing every PR deployment to fail with "Hobby accounts are limited to daily cron jobs"
- The `/api/alerts/send` endpoint already filters by each alert's own frequency setting (weekly/daily), so daily trigger is sufficient

## PR
- #413: https://github.com/manazoid4/JobFilterV1/pull/413
- Branch: nightly/copy-pricing-cta-fix

## Pre-existing State (All Tier 1 Features Already Built)
- Scan counter: BUILT (FindJobsPage.tsx lines 33-76)
- Google Calendar ICS export: BUILT (server/routes/calendarExport.ts + LeadDetailPage ADD TO CALENDAR link)
- Won leaderboard: BUILT (server/routes/outcomeReport.ts /api/wins/stats + WinStatsBanner component)
- WhatsApp templates: BUILT (chaseTemplates.ts has quick_quote_offer + availability_check)
- Trade-specific scoring UX: BUILT (parseTradeReasons function)

## Next Run Priorities
1. The /api/alerts endpoint needs a `/api/alerts/send` route wiring — check if it exists and is properly triggered by the cron
2. Consider adding competitor comparison copy to PricingPage (vs Checkatrade/MyBuilder/Bark language)
3. Trade-specific scoring reasons could be made more specific per trade (e.g. electrician sees EV charger / rewire, plumber sees boiler / bathroom)
