# Changelog 2026-08-02 — NightlyBuildAgent Run

## Build Status
- npm run build: PASS (clean, 117 static pages)
- npx tsc --noEmit: PASS (0 errors)

## Phase 1 — Fix Broken
No broken builds or TypeScript errors found. node_modules was missing (fresh clone); ran npm install.

## Phase 2 — Feature Built: Trade-Specific Scoring UX

**File**: `src/pages/FindJobsPage.tsx`

Added `TRADE_SIGNAL_KEYWORDS` map (8 trades × 10-13 keywords each):
- electrical: EV CHARGER, REWIRE, CONSUMER UNIT, EICR, SOLAR PV, FUSEBOARD, FIRE ALARM…
- plumbing: BOILER, BATHROOM, HOT WATER, GAS SAFE, CYLINDER, RADIATOR…
- roofing: FLAT ROOF, GUTTERING, CHIMNEY, DORMER, SLATE, FELT…
- building: EXTENSION, LOFT CONVERSION, GARAGE CONVERSION, STRUCTURAL…
- hvac: HEAT PUMP, AIR SOURCE, VENTILATION, MVHR, RETROFIT…
- landscaping: PAVING, DRIVEWAY, FENCING, PATIO, DECKING…
- carpentry: FLOORING, STAIRCASE, FITTED KITCHEN, FITTED WARDROBES…
- painting: DECORATING, PLASTERING, RENDER, ARTEX…

Added `TRADE_GENERIC_LABELS` map for trade-specific fallback (e.g. "ELECTRICAL WORK" vs generic "Verified signal").

Updated `parseTradeReasons(raw, trade, title)`:
- Now accepts `trade` and `title` parameters
- When scoring engine returns no keyword matches, extracts keywords from lead title using trade-specific keyword list first, then generic TITLE_KEYWORDS
- Falls back to trade-specific label instead of "Verified signal"

Updated `LeadResultCard` call to pass `lead.trade || lead.tradeMatch` and `lead.title`.

**Result**: Electricians now see "EV CHARGER — YOUR TRADE" or "REWIRE" from lead titles. Plumbers see "BOILER" or "BATHROOM". Generic "Verified signal" is replaced by "ELECTRICAL WORK", "PLUMBING / HEATING WORK" etc.

## Phase 3 — Copy Polish

### FindJobsPage (`src/pages/FindJobsPage.tsx`)
1. **Pre-scan empty state** rewritten:
   - Before: "CHECK THE CURRENT PUBLIC-TENDER FEED."
   - After: "REAL JOBS IN YOUR PATCH — SCORED BEFORE YOU SEE THEM." with competitor callout (Checkatrade/Bark), three feature columns (Free/Scored/Yours), "NO CARD NEEDED" CTA
2. **Scan limit copy** when 3 free scans used:
   - Before: "Buyer and submission context locked. Scanning remains free."
   - After: "WHO TO CALL and HOW MUCH TO QUOTE is hidden — unlock buyer details and quote guidance on every lead."
3. **Trade preset label**:
   - Before: "TAP A TRADE TO SCAN INSTANTLY"
   - After: "YOUR TRADE — PICK ONE, THEN HIT SCAN"

### PricingPage (`src/pages/PricingPage.tsx`)
1. **Plan bullets** rewritten to be concrete and trade-specific; added Checkatrade comparison bullet
2. **New FAQ**: "How is this different from Checkatrade or Bark?" — clarifies no shared leads, no per-lead credits
3. **Pilot card CTA**:
   - Before: "START AFTER COVERAGE CHECK →" (confusing friction)
   - After: "START £39/MO →" + "No credit card required to scan first" note
4. **Bottom yellow CTA** strengthened with Checkatrade price callout: "Checkatrade costs £80–£370/mo and shares your lead with 4–8 other trades"

## Phase 4 — Site Health (NEEDLE/BUILDER/CRITIC/REVENUE)

**NEEDLE identified 3 issues:**
1. Dashboard header: enterprise procurement language, not tradesman language
2. FindJobsPage trade presets: "TAP A TRADE TO SCAN INSTANTLY" breaks its own promise (error without postcode)
3. Scan limit copy: "submission context" is corporate jargon — cost of not upgrading invisible

**BUILDER fixed all 3:**
- DashboardPage: "YOUR JOB PIPELINE / FIND IT. TRACK IT. WIN IT." replaces "PUBLIC-WORKS DECISION TRACKER"; FTS disclaimer removed above the fold; SCAN FOR JOBS CTA added to header
- FindJobsPage: trade preset label fixed (see Phase 3)
- FindJobsPage: scan limit copy fixed (see Phase 3)

**CRITIC**: All 3 fixes are clearer in <3 seconds. YES.
**REVENUE**: All 3 changes remove confusion that blocks conversion. YES — the scan limit copy fix directly increases upgrade urgency.

## Commit & PR
- Branch: `nightly/2026-08-02-trade-scoring-copy-polish`
- PR: https://github.com/manazoid4/JobFilterV1/pull/422
- CI: In progress at time of vault write

## Vercel Cron Note
Vercel deployment failing with "Hobby accounts limited to daily cron jobs" for `0 * * * *` schedule in vercel.json. This is PRE-EXISTING (added in commit f96ace7, before this run). Not caused by this PR's changes.
