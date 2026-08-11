# Changelog — 2026-08-11

## NightlyBuildAgent Run

### Build Status
- **Build:** PASS (120/120 static pages)
- **TypeScript:** Clean (0 errors)

---

### Feature Built — Trade-Specific Scoring UX

**File:** `src/pages/FindJobsPage.tsx`

Added `TRADE_JOB_KEYWORDS` map (8 trades × ~10 keywords each) and `getTradeJobHints(lead, trade)` function. Lead cards now surface trade-relevant job type keywords as highlighted yellow badges — derived client-side from the lead title and description.

Examples:
- Electrician selects: sees **EV CHARGER**, **REWIRE**, **CONSUMER UNIT** badges
- Plumber selects: sees **BOILER**, **BATHROOM**, **HEAT PUMP** badges
- Roofer selects: sees **FLAT ROOF**, **GUTTER**, **FASCIA** badges

`LeadResultCard` now accepts `trade?: Trade` prop. Trade hints appear before parsed score reasons and are deduped to avoid repetition.

---

### Copy Polish

**PricingPage.tsx:**
- Hero micro-label: "FOUNDER-ASSISTED PILOT" → "PUBLIC WORKS QUALIFICATION — £39/MO"
- Hero headline: Added fear hook — "MOST CONTRACTORS BID ON 5 TENDERS TO WIN 1. KNOW WHICH ONE BEFORE YOU START."
- Hero subhead: Added proof+control — explains BID/WATCH/SKIP verdict in seconds vs 8 hours of PDFs
- Free CTA in hero: "SCAN FREE FIRST →" → "SCAN FREE — NO CARD NEEDED →"
- Pilot card CTA: "START AFTER COVERAGE CHECK →" → "START £39/MO →" (unified with hero)
- Pilot card body: Removed corporate jargon; plain-English description of what the layer does
- Objections section: De-corporatised; removed "firm-aware qualification", "outcome learning", etc.
- Bottom yellow CTA: Restructured so free scan leads; "No credit card required" inline

**FindJobsPage.tsx:**
- No-scan-yet prompt: Fear hook added — "OTHER CONTRACTORS ARE BIDDING ON WORK IN YOUR AREA RIGHT NOW."
- Scan CTA: "SCAN MY AREA →" → "SCAN MY AREA — NO CARD →"
- Added "Verified signals · official sources · no shared auctions" footnote

---

### Site Health Fix

**Issue (NEEDLE):** PricingPage had two CTAs for the same Pilot plan — "START AFTER COVERAGE CHECK →" on the plan card vs "START £39/MO →" in the hero. Contradictory signals create hesitation at the conversion point.

**Fix (BUILDER):** Unified all Pilot CTAs to "START £39/MO →". Plan card body and priceNote rewritten to be honest and plain.

**CRITIC check:** Fix is clear in <3 seconds — one price, one action.
**REVENUE check:** Yes — removing CTA contradiction directly reduces bounce at checkout.

**Secondary fix:** Scan exhaustion message "Buyer and submission context locked. Scanning remains free." → "Scanning is always free. Buyer details and response routes unlock at £39/mo."

---

### PR

- Branch: `nightly/trade-specific-scoring-ux-copy-polish`
- PR: manazoid4/JobFilterV1#459
- Commit: `203418e`

---

## Tier 1 Feature Status (as of this run)

| Feature | Status |
|---|---|
| Scan counter (3 free/week) | DONE — already implemented |
| Google Calendar ICS export | DONE — already implemented |
| Won leaderboard (WinStatsBanner) | DONE — already implemented |
| WhatsApp templates (Quick Quote + Availability Check) | DONE — already in chaseTemplates.ts |
| Trade-specific scoring UX | **BUILT THIS RUN** |
