# Changelog 2026-08-06

## NightlyBuildAgent Run — 6 Aug 2026

### Build Status
- `npm run build` — PASS (clean, no errors)
- `npx tsc --noEmit` — PASS (no TypeScript errors)

### Changes Made

#### PHASE 1 — Build Check
- Build was clean on first run after `npm install` (dependencies not pre-installed in remote env)
- No broken imports or fake form flows found

#### PHASE 2 — Tier 1 Features Audit
All Tier 1 features were already built:
- **Scan counter**: Live in FindJobsPage — localStorage-based, resets Monday, 3 free scans/week
- **Google Calendar ICS**: `/api/leads/calendar.ics` endpoint + "ADD TO CALENDAR →" link in LeadDetailPage
- **Won leaderboard**: `/api/wins/stats` endpoint in outcomeReport.ts + WinStatsBanner component wired in FindJobsPage
- **WhatsApp templates**: `quick_quote_offer` and `availability_check` templates already in chaseTemplates.ts
- **Trade-specific scoring UX**: parseTradeReasons() in FindJobsPage already extracts trade keywords

#### PHASE 3 — Copy Polish

**FindJobsPage.tsx** (scan limit exhaustion):
- BEFORE: "Buyer and submission context locked. Scanning remains free."
- AFTER: "3 free scans done. Upgrade to see buyer details, deadlines and how to respond."

**HomePage.tsx** (hero):
- BEFORE: Floating bubble "CPV: Matched" (procurement jargon)
- AFTER: "Trade: Matched"
- BEFORE: micro-label "PUBLIC-WORKS QUALIFICATION FOR 5–25-PERSON CONTRACTORS"
- AFTER: "FOR ELECTRICIANS, PLUMBERS, ROOFERS AND BUILDERS"

**PricingPage.tsx** (major copy overhaul):
- Hero label: "FOUNDER-ASSISTED PILOT" → "PUBLIC CONTRACTS FOR ELECTRICIANS, PLUMBERS, ROOFERS AND BUILDERS"
- Hero headline: Added competitor mention — "STOP LOSING TO CHECKATRADE. START WINNING PUBLIC CONTRACTS."
- Hero description: Now explicitly calls out councils, housing associations, NHS — no shared leads, no five-trade auction
- CTAs: "SCAN FREE FIRST →" → "SCAN FREE — NO CARD →" (clearer)
- Plan card "PILOT SUBSCRIPTION" → "FULL ACCESS"
- Plan priceNote: "Paid activation follows coverage and delivery checks." → "No credit card required for the free scan."
- Plan CTA: "START AFTER COVERAGE CHECK →" → "GET FULL ACCESS — £39/MO →"
- Added FAQ: "Is this like Checkatrade, MyBuilder or Bark?" — explicitly differentiates vs. shared lead auctions
- Updated FAQ: "Who is JobFilter for?" now says "Electricians, plumbers, roofers, builders..."
- Bottom CTA section: Added "Not Checkatrade, not Bark — public contracts from councils, housing associations and the NHS."

#### PHASE 4 — Site Health
- NEEDLE issue 1 found: "CPV: Matched" jargon in hero bubbles — FIXED
- NEEDLE issue 2 found: No competitor differentiation anywhere — FIXED (pricing page + FAQ)
- NEEDLE issue 3 found: Scan limit exhaustion copy opaque — FIXED

### Commits
- `8653524` — [NightlyBuildAgent] Copy polish: competitor framing, plain English scan limit, clearer pricing CTAs
- Branch: `nightly-build-agent-2026-08-06`

---

## Next Run Priorities

1. **WhatsApp templates in QuickResponseKit** — check if QuickResponseKit shows all chase templates including the email/portal/canvass ones, or only WhatsApp. If only WhatsApp, expand the template picker to show all channels.
2. **Trade-specific scoring reasons** — the `parseTradeReasons()` function is generic; electricians should see EV charger/rewire reasons prominently, plumbers should see boiler/bathroom. Backend scoring engine needs to surface trade keywords more explicitly.
3. **Pricing page plan bullets** — `planBullets` array uses "BID, WATCH, SUBCONTRACT or SKIP" jargon — replace with plain benefit bullets: "See exactly which jobs to quote", "Know the buyer, deadline and how to respond", "Stop wasting time on jobs outside your trade"
