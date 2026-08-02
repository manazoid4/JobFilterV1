# Changelog 2026-08-02

## NightlyBuildAgent Run

### Build Status
- npm install required (node_modules missing in fresh container)
- npm run build: PASS
- npx tsc --noEmit: PASS (0 errors)

### Phase 1 — Fix Broken
- No broken imports found
- No fake forms (all `setSubmitted(true)` calls follow real fetch() calls)
- Build failed initially because `next` binary not installed — fixed with `npm install`

### Phase 2 — Tier 1 Feature Built: Trade-Specific Scoring UX
**File:** `src/pages/FindJobsPage.tsx`
- Added `TRADE_KEYWORDS` map covering all 8 trades (electrical, plumbing, roofing, building, carpentry, painting, hvac, landscaping)
- Each trade maps to its own keyword list (e.g. electrical: EV CHARGER, REWIRE, EICR, SOLAR PV; plumbing: BOILER, HEAT PUMP, BATHROOM)
- Updated `extractTopJobTypes()` to accept `currentTrade` param and use trade-specific keywords in the title-fallback path
- Updated call site to pass `trade` to `extractTopJobTypes(displayedLeads, trade)`
- PatchPulse "IN DEMAND" section now shows only trade-relevant job types

### Phase 3 — Copy Polish

#### FindJobsPage
- Pre-scan "no scan yet" section rewritten with fear→proof→control structure
- New headline: "HOW MANY BIDS DID YOU PRICE THIS MONTH THAT YOU HAD NO CHANCE OF WINNING?"
- Added 3 benefit tiles: most notices / ones that fit / zero guesswork
- "No credit card required" added inline next to CTA
- Trade preset label now conditional: "ENTER POSTCODE ABOVE, THEN TAP A TRADE" when postcode empty; "TAP A TRADE TO SCAN NOW" when postcode present

#### PricingPage
- Hero label changed from "FOUNDER-ASSISTED PILOT" → "FOR CONTRACTORS CHASING PUBLIC WORK"
- Hero headline changed to "STOP WASTING DAYS ON BIDS YOU CANNOT WIN"
- Added fear copy: "Find a Tender publishes hundreds of live notices. Most won't fit..."
- "No credit card required" added prominently
- Primary CTA label "START AFTER COVERAGE CHECK →" changed to "START — £39/MO →" (was actively resisting conversion)
- Bottom CTA section tightened with direct fear copy

#### HomePage
- Removed waitlist form from paid conversion panel (was undercutting the CTA with "Not ready yet?")
- Panel now drives: SCAN FREE (yellow, primary) → SEE PRICING (dark, secondary)
- Removed unused `WaitlistForm` import

### Phase 4 — Site Health
**NEEDLE:** 3 UX issues found by audit agent
**BUILDER fixes applied:**
1. Backward CTA "START AFTER COVERAGE CHECK →" → "START — £39/MO →" (PricingPage PlanCard)
2. Trade preset label false promise fixed (FindJobsPage)
3. HomePage conversion panel decoupled from waitlist

**CRITIC:** All 3 fixes make the key action clearer in under 3 seconds — yes
**REVENUE:** Removing the "not ready yet" signal and fixing the backward CTA directly removes conversion friction — yes

### Vercel Deployment Fix
- `vercel.json` cron was `0 * * * *` (hourly = 24x/day, exceeds Hobby plan)
- Changed to `0 8 * * *` (once daily at 08:00 UTC)
- Alert delivery path: `/api/alerts/send`

### PR
- Branch: `nightly/2026-08-02-copy-and-ux`
- PR #421: https://github.com/manazoid4/JobFilterV1/pull/421

### Features Already Built (Not Re-implemented)
- Scan counter: BUILT (localStorage, resets Monday)
- Google Calendar ICS export: BUILT (server/routes/calendarExport.ts + client-side download)
- Won leaderboard API: BUILT (server/routes/outcomeReport.ts `/api/wins/stats` reads Supabase)
- WhatsApp templates: BUILT (quick_quote_offer + availability_check already in chaseTemplates.ts)
