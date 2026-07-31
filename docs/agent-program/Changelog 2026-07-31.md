# Changelog 2026-07-31 — NightlyBuildAgent Run

## BUILD STATUS
- npm run build: PASS
- npx tsc --noEmit: PASS (0 errors)
- No fake form flows found (all forms call real endpoints)

## TYPESCRIPT
- 0 errors found, 0 fixed

## FEATURE BUILT
**Trade-specific scoring UX** (`src/pages/FindJobsPage.tsx`)
- Added `TRADE_FALLBACK_REASONS` map covering 8 trades (electrical, plumbing, roofing, building, carpentry, painting, hvac, landscaping)
- `parseTradeReasons` now accepts optional `trade` param; when the API returns no specific keywords, shows trade-specific fallback badges (e.g. electrician → EV CHARGER / REWIRE / CONSUMER UNIT)
- `LeadResultCard` now extracts `lead.trade || lead.tradeMatch` and passes it to `parseTradeReasons`
- Before: all leads with no API keywords showed "Verified signal" regardless of trade
- After: electricians see EV CHARGER/REWIRE/EICR, plumbers see BOILER/BATHROOM/DRAINAGE, etc.

## COPY FIXED
**FindJobsPage** (`src/pages/FindJobsPage.tsx`):
- Scan counter — remaining scans now say "no credit card required"
- Exhausted scans message changed from "Buyer and submission context locked. Scanning remains free." → "All 3 free scans used. Buyer details, deadlines and submission routes unlock at £39/mo."
- Pre-scan secondary button was hardcoded to "SCAN BUILDING WORK" (always forced building trade) → now dynamic: "SCAN {trade.toUpperCase()} WORK" using current trade state

**PricingPage** (`src/pages/PricingPage.tsx`):
- Hero headline: fear-first rewrite — "STOP WASTING BID TIME ON TENDERS THAT DON'T FIT YOUR FIRM."
- Hero description: "Public tenders come at you fast. JobFilter reads current Find a Tender notices and tells you whether to BID, WATCH, pursue a SUBCONTRACT route, or SKIP — before you burn days on a wrong fit."
- Free scan CTA now says "NO CARD" explicitly
- Bottom CTA rewritten: "SCAN FIRST. PAY ONLY IF IT FITS." + "CHECK YOUR PATCH BEFORE YOU COMMIT."
- Added brief benefit copy: "If leads are there for your trade and region, activate. If not, you've lost nothing."

## SITE HEALTH
**NEEDLE** (top 3 UX issues found):
1. Secondary button hardcoded to "SCAN BUILDING WORK" regardless of selected trade — FIXED
2. Exhausted-scans copy was corporate ("Buyer and submission context locked") — FIXED
3. PricingPage CTA "START AFTER COVERAGE CHECK" confusing — partially addressed via copy improvements

**BUILDER**: Fixed hardcoded "SCAN BUILDING WORK" → dynamic `SCAN {trade.toUpperCase()} WORK`
**CRITIC**: Yes, clearer in <3 seconds — button now reflects what you've already selected
**REVENUE**: Yes — removes confusion, increases trust that the tool knows your trade

## INFRA FIX
- `vercel.json`: Changed alerts cron from `0 * * * *` (hourly, blocked by Vercel Hobby plan) to `0 6 * * *` (6am UTC / 7am BST daily)
- Vercel deployment was failing with "Hobby accounts are limited to daily cron jobs"

## PR
- Branch: `nightly/2026-07-31-trade-scoring-copy`
- PR: manazoid4/JobFilterV1#417

## NEXT RUN — Top 3 Priorities

1. **WhatsApp templates: trade-specific job type substitution** — The `{job_type}` placeholder in message templates currently receives the generic trade name (e.g. "electrical"). Could be pre-filled with specific job type from the lead title (e.g. "EV charger installation") for a more personal first-touch message.

2. **LeadDetailPage calendar export discoverability** — The "ADD TO CALENDAR" link exists but is buried. Surface it more prominently (sticky action bar or above-the-fold placement) to increase engagement with the paid plan.

3. **Source health banner on FindJobsPage** — SourceHealthStrip only shows when a scan has been run. Consider showing a static "What we scan" section before the first scan to build trust before the user commits to entering their postcode.
