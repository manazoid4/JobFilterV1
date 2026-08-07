# Changelog — 2026-08-07

## NightlyBuildAgent Run

### Build Status
- npm run build: PASS
- npx tsc --noEmit: PASS (0 errors)

### What Was Found (Pre-Flight)
- Vault files missing from repo — first run for this session
- node_modules empty (dependencies not installed); fixed by setting npm cafile to /root/.ccr/ca-bundle.crt
- All 5 Tier 1 features were already built:
  - Scan counter: present (FindJobsPage.tsx lines 432-448)
  - Google Calendar ICS export: present (server/routes/calendarExport.ts + LeadDetailPage.tsx)
  - Won leaderboard: present (/api/wins/stats in server/routes/outcomeReport.ts)
  - WhatsApp templates: present (quick_quote_offer + availability_check in chaseTemplates.ts)
  - Trade-specific scoring: partially built (labels were generic "YOUR TRADE")

### Changes Made

#### Phase 2 — Feature: Trade-Specific Scoring Labels
- File: src/pages/FindJobsPage.tsx
- Added TRADE_MATCH_LABELS map (electrical→ELECTRICIAN, plumbing→PLUMBER, roofing→ROOFER, etc.)
- Updated parseTradeReasons() to accept optional `trade` param and output trade-specific labels
- Updated LeadResultCard to extract leadTrade from lead.trade || lead.tradeMatch and pass to parseTradeReasons
- Result: electricians now see "EV CHARGER — ELECTRICIAN" (not "EV CHARGER — YOUR TRADE")

#### Phase 3 — Copy Polish: FindJobsPage
- File: src/pages/FindJobsPage.tsx
- Upgrade nudge micro-label: "REAL JOBS. BUYER DETAILS IN FULL ACCESS." → "FLAT FEE. NO SHARED AUCTIONS. NO PER-LEAD CHARGES."
- Upgrade nudge body: added explicit Checkatrade/Bark comparison
- Added "no shared auction, no five-trade blast" key message
- Added "No credit card required to browse" next to free CTA text

#### Phase 3 — Copy Polish: PricingPage
- File: src/pages/PricingPage.tsx
- Added new objection: "How is this different from Checkatrade or Bark?" with explicit comparison
- Changed "SCAN FREE FIRST →" to "SCAN FREE — NO CARD NEEDED →" in hero CTA
- Bottom CTA section: "VERIFY COVERAGE BEFORE YOU PAY." → "SCAN FIRST. PAY ONLY IF IT FITS."
- Added clear "No credit card required" paragraph before CTA buttons

#### Phase 4 — Site Health Fix
- File: src/pages/FindJobsPage.tsx
- Scan limit hit message: "Buyer and submission context locked. Scanning remains free." → "Free scans used up. See who to call — unlock for £39/mo."
- CRITIC: clear in <3 seconds — yes
- REVENUE: directly ties to upgrade value — yes

### Commit
- Branch: nightly-build-2026-08-07
- PR: manazoid4/JobFilterV1#446
- CI: in progress at time of writing

### Files Changed
- src/pages/FindJobsPage.tsx
- src/pages/PricingPage.tsx
