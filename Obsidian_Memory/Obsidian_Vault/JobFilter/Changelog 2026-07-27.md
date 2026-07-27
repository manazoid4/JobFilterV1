# Changelog 2026-07-27 — NightlyBuildAgent Run

## Build Status
- npm run build: PASS
- npx tsc --noEmit: PASS (zero errors)

## Changes Made

### FEATURE: Trade-specific score tags on lead cards (`FindJobsPage.tsx`)
Added `TRADE_TITLE_KEYWORDS` map covering 9 trades (electrical, plumbing, roofing, building, carpentry, painting, hvac, landscaping, scaffolding). When the backend returns only generic scoring reasons (e.g. free-tier leads with no detailed reasons), the "WHY?" popover on a lead card now falls back to trade-specific keywords extracted from the lead title rather than "Verified signal". Electricians see EV CHARGER / REWIRE / CONSUMER UNIT; plumbers see BOILER / BATHROOM / HEAT PUMP, etc. Paid users who receive full backend reasons are unaffected.

### COPY: SignupPage accuracy fixes (`SignupPage.tsx`)
- Replaced "Gold leads for your trade and patch start coming through from day one" (implied push delivery; the product uses active scanning not a push feed) with "Run your first scan immediately — see which current public tenders fit your trade and area"
- WhatsApp field changed from `required` to optional with inline label "(optional — used for new-match alerts)" to reduce form abandonment
- Post-confirm CTA: "BROWSE LIVE LEADS →" → "RUN YOUR FIRST SCAN →" to match actual product flow

### COPY: PricingPage CTA consistency (`PricingPage.tsx`)
Standardised all three CheckoutButton instances to "START £39/MO →". The plan card previously read "START AFTER COVERAGE CHECK →" which implied a different gated flow to the identical Stripe checkout, causing confusion.

### FIX: Vercel cron schedule (`vercel.json`)
Changed cron from `0 * * * *` (hourly — blocked by Vercel Hobby plan) to `0 9 * * *` (daily at 09:00 UTC — within Hobby plan limits). Pre-existing issue from commit f96ace7; fixed as part of this run because it was blocking PR preview deployments.

## PR
https://github.com/manazoid4/JobFilterV1/pull/401

## Site Health (NEEDLE / BUILDER / CRITIC / REVENUE)
- NEEDLE found: (1) SHOW_ADVANCED_TOOLS hardcoded off — intentionally left hidden per product honesty policy; (2) SignupPage promised push delivery; (3) PricingPage inconsistent CTA labels
- BUILDER fixed: issues 2 and 3
- CRITIC: YES — both fixes are clearer in under 3 seconds
- REVENUE: YES — honest expectations reduce churn; consistent CTA removes friction

## Already Built (Tier 1 — confirmed in codebase)
- Scan counter with weekly reset (FindJobsPage, localStorage, Monday reset)
- Calendar ICS export (LeadDetailPage buildIcs + downloadIcs + CalendarCopyLink)
- Won leaderboard / WinStatsBanner (component + /api/wins/stats endpoint)
- WhatsApp templates: quick_quote_offer + availability_check already present in chaseTemplates.ts

## Next Run Priorities
1. Enable `SHOW_ADVANCED_TOOLS` behind `unlimitedTester` gate (Document Search is production-ready, just needs ungating for paid users)
2. Check if `/api/alerts/send` endpoint handles the daily cadence correctly and has proper deduplication
3. FTS results quality: spot-check that trade-specific CPV code matching is returning relevant results for electricians vs plumbers
