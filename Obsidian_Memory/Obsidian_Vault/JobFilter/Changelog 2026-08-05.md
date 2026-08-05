# Changelog — 2026-08-05

## NightlyBuildAgent Run

### Build Status
- npm run build: PASS
- npx tsc --noEmit: PASS (zero errors)

### Features Built

#### Trade-Specific Scoring UX (Phase 2 — Tier 1)
- Added `TRADE_KEYWORD_LABELS` map in `FindJobsPage.tsx` — 30 trade keywords mapped to human-readable job types (e.g. "EV CHARGER" → "EV charger install", "BOILER" → "Boiler replacement")
- Added `getTopTradeReason()` function that extracts the top highlighted score reason for a lead
- Lead cards now show the top matched job type as a visible yellow badge below the score badge — always visible without clicking the "WHY?" button
- Electricians see "EV charger install", "Full rewire" etc. Plumbers see "Boiler replacement", "Bathroom fit-out" etc.

#### Paywall Placement Fix (Phase 4 — Site Health)
- Moved upgrade wall from mid-list injection (at `firstGoldIdx`) to AFTER all displayed leads
- New block shows: "BUYER DETAILS LOCKED — X GOLD LEADS FOUND" with count-specific copy
- Tradesman now sees all available leads before hitting the upgrade prompt
- Added "No credit card required to browse" to the upgrade CTA
- CRITIC check: YES — clearer in <3 seconds. REVENUE check: YES — shows value before asking for money

#### Copy Polish (Phase 3)

**FindJobsPage:**
- Zero-scans message now names Checkatrade explicitly: "Unlike Checkatrade, you see leads before paying — no blind auction, no five-trade blast."

**PricingPage:**
- Added "NOT CHECKATRADE. NOT MYBUILDER. NOT BARK." competitor comparison section
- Three-column grid comparing: Checkatrade/Bark, MyBuilder/BuildAlert, Planning Pipe
- Each card shows what the competitor does (them) vs what JobFilter does (us)
- Uses black background with yellow accent labels — matches brutalist design system

### PRs
- PR #436: https://github.com/manazoid4/JobFilterV1/pull/436
- Branch: nightly/trade-scoring-ux-paywall-fix

### All Tier 1 Features Verified Present
- Scan counter: BUILT (fully implemented with localStorage + Monday reset)
- Google Calendar ICS export: BUILT (backend endpoint + LeadDetailPage button)
- Won leaderboard: BUILT (WinStatsBanner component + /api/wins/stats endpoint in outcomeReport.ts)
- WhatsApp templates: BUILT (quick_quote_offer + availability_check in chaseTemplates.ts)
- Trade-specific scoring UX: ENHANCED this run
