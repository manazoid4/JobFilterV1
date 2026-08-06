# Changelog — 2026-08-06 (NightlyBuildAgent)

## Build Status
- **Build**: PASS (120 static pages, 0 errors)
- **TypeScript**: CLEAN (0 errors)
- **PR**: #442 — nightly/trade-scoring-pricing-copy

## Changes Made

### Phase 2 — Feature: Trade-Specific Scoring UX
**File**: `src/pages/FindJobsPage.tsx`

Added `TRADE_LABEL_MAP` — a per-trade keyword enhancement dictionary. Lead cards now show trade-specific reason labels instead of generic uppercase keywords:
- Electricians see: `EV CHARGER FIT — YOUR TRADE`, `FULL REWIRE — YOUR TRADE`, `CU UPGRADE — YOUR TRADE`
- Plumbers see: `BOILER SWAP — YOUR TRADE`, `BATHROOM FIT — YOUR TRADE`
- Roofers see: `FLAT ROOF JOB — YOUR TRADE`, `GUTTERING FIT — YOUR TRADE`
- Builders see: `EXTENSION BUILD — YOUR TRADE`, `LOFT CONV — YOUR TRADE`
- HVAC/Heating: `HEAT PUMP INSTALL — YOUR TRADE`, `BOILER REPLACEMENT — YOUR TRADE`
- Carpentry: `FLOORING FIT — YOUR TRADE`, `KITCHEN FIT — YOUR TRADE`
- Painting: `FULL DECOR — YOUR TRADE`, `PLASTER + PAINT — YOUR TRADE`
- Landscaping: `GROUNDWORKS — YOUR TRADE`, `FENCE FIT — YOUR TRADE`

Also: fixed scan-exhaustion copy — removed jargon "submission context", replaced with clear upgrade message.

### Phase 3 — Pricing Page Copy
**File**: `src/pages/PricingPage.tsx`

- Hero headline: `STOP PRICING JOBS ALREADY WON BY SOMEONE ELSE.` (was corporate)
- Named competitors explicitly: Checkatrade, Bark, BuildAlert, Planning Pipe
- FAQ/objections rewritten to directly compare vs. those competitors
- All free CTAs now say `SCAN FREE — NO CARD NEEDED →`
- `No credit card required` line added to hero footer
- Consistent `£39/MO` label on both paid CTAs (was "START AFTER COVERAGE CHECK")
- Green coverage section rewritten for emotional impact: £39/mo pays for itself on first accurate price

### Phase 4 — Site Health (4-Agent Check)
Issues found and fixed:
1. Scan-exhaustion copy clarified (jargon → plain English)
2. CTA labels made consistent across pricing page
3. Trade-specific scoring deployed to give more relevant signals per trade

## Not Touched
- Route paths unchanged
- GOLD/SILVER/BRONZE labels unchanged
- No new pages added
- No homeowner contact enrichment
- No blog

## Next Run Priorities
1. Check Vercel CI on PR #442 — merge if green
2. Consider adding `WinStatsBanner` postcode prefill from user's last scan (it currently shows only when postcode is entered, not after scan completes)
3. Trade-specific scoring: expand TRADE_LABEL_MAP to cover FTS/commercial tender keywords (e.g. "RESPONSIVE REPAIRS", "ESTATE MAINTENANCE" for building/roofing)
4. Pricing page: add a social proof row (e.g. "X tradespeople scanned this week in [region]")
