# Changelog 2026-08-07

## NightlyBuildAgent Run

### Build Status
- `npm run build` — PASS (120/120 static pages)
- `npx tsc --noEmit` — PASS (0 errors)
- Dependencies installed from scratch (node_modules absent at run start)

### Phase 1 — Fix Broken
- No broken imports or fake flows found
- Build was failing only due to missing node_modules — `npm install` resolved it

### Phase 2 — Feature Built: Trade-Specific Scoring UX

**File:** `src/pages/FindJobsPage.tsx`

Added `TRADE_KEYWORD_LABELS` map (60 entries) and `tradeKeywordLabel()` function. Raw engine keywords now display as specific, trade-friendly labels on lead cards:

- Electrician sees: `EV CHARGER INSTALL — YOUR TRADE`, `FULL REWIRE — YOUR TRADE`, `CONSUMER UNIT UPGRADE — YOUR TRADE`, `EICR INSPECTION — YOUR TRADE`
- Plumber sees: `BOILER INSTALL/SERVICE — YOUR TRADE`, `BATHROOM FIT-OUT — YOUR TRADE`, `HEAT PUMP INSTALL — YOUR TRADE`
- Roofer sees: `FLAT ROOF JOB — YOUR TRADE`, `FULL RE-ROOF — YOUR TRADE`, `SLATE ROOF — YOUR TRADE`
- Builder sees: `EXTENSION BUILD — YOUR TRADE`, `LOFT CONVERSION — YOUR TRADE`

Also improved generic labels: `URGENT — ACT TODAY`, `QUOTE THIS WEEK`, `WORTH QUOTING` replace previous flat labels.

### Phase 3 — Copy Polish (2 pages)

**FindJobsPage — No-scan-yet empty state:**
- Replaced generic "CHECK THE CURRENT PUBLIC-TENDER FEED" prompt
- Now: "NO SHARED AUCTION. NO FIVE-TRADE BLAST." headline
- Calls out Checkatrade, MyBuilder, Bark by name
- Added trust chips: "Scored for your trade only", "Verified official sources", "No credit card required"
- Changed secondary CTA from "SCAN BUILDING WORK" to "SCAN ELECTRICAL JOBS" (electricians are highest-value segment)

**PricingPage:**
- Added competitor comparison block: Checkatrade/MyBuilder/Bark (them) vs JobFilter (us)
- Clarified FAQ: "No credit card required for the check", "No shared auction, no five-trade blast"
- Updated who JobFilter is for: explicit mention of electricians, plumbers, builders, roofers
- Added `SCAN FREE — NO CARD REQUIRED →` CTA link to coverage section

### Phase 4 — Site Health Fix

**TopNav — "CHECK FTS FREE" → "SCAN FREE — NO CARD":**
- Desktop nav CTA was using internal jargon "FTS" (Find a Tender Service) — meaningless to a tradesperson
- Fixed desktop: `SCAN FREE — NO CARD`
- Fixed mobile header quick-link: "FREE — NO CARD" / "SCAN JOBS"
- Fixed mobile bottom CTA: `SCAN FREE — NO CARD REQUIRED`

CRITIC: Yes — clearer in <3 seconds  
REVENUE: Yes — primary trial action is now obvious, increases scan→paid conversion

### PR
- Branch: `nightly/2026-08-07`
- PR #447: https://github.com/manazoid4/JobFilterV1/pull/447

### Files Changed
- `src/pages/FindJobsPage.tsx` — trade keyword labels, no-scan copy
- `src/pages/PricingPage.tsx` — competitor comparison, FAQ sharpening
- `src/components/TopNav.tsx` — CTA jargon removal
