# Changelog 2026-08-14 — NightlyBuildAgent

## Build Status
- npm run build: PASS
- npx tsc --noEmit: PASS (0 errors)

## What Was Built

### Phase 2 — Trade-Specific Scoring UX
**File**: `src/pages/FindJobsPage.tsx`

Added `TRADE_SCORE_HINTS` constant — a per-trade keyword map (electrical, plumbing, roofing, building, carpentry, painting, hvac, landscaping). Each entry maps a title keyword fragment to a readable badge label.

When a lead card shows only the generic "Verified signal" badge (happens on free tier when API scoring returns no specific reasons), the system now scans the lead title against the searched trade's keyword map and substitutes trade-specific labels instead:
- Electrician searching EV CHARGER leads → sees "EV CHARGER FIT" badge
- Plumber searching BOILER leads → sees "BOILER WORK" badge
- Roofer searching FLAT ROOF leads → sees "FLAT ROOF" badge

`LeadResultCard` now accepts `searchedTrade?: Trade` prop. Both call sites (main results and Fill My Week) pass `searchedTrade={trade}`.

### Phase 3 — Copy Polish (FindJobsPage)
- Scanner micro-label: "LIVE SCANNER — 3 FREE SCANS, NO CARD" → "LIVE SCANNER — 3 FREE SCANS · NO CREDIT CARD EVER"
- Scanner h1: "FIND JOBS WORTH PRICING" → "FIND REAL JOBS IN YOUR PATCH"
- Empty state headline: "CHECK THE CURRENT PUBLIC-TENDER FEED." → "SEE WHAT JOBS ARE LIVE NEAR YOU RIGHT NOW."
- Empty state body: Named Checkatrade and Bark explicitly as the fee-per-lead alternative; "No credit card required" explicit

### Phase 4 — Site Health
**Stats Bar** (FindJobsPage): Changed from 3-column (MATCHES / GOLD / CONTRACTS) to 4-column (MATCHES / GOLD / SILVER / CONTRACTS).
- GOLD remains yellow for clear priority signal
- SILVER added in white to show the "watch" pipeline at a glance
- CONTRACTS remains for commercial leads visibility
- Gives tradespeople an immediate quality split without scrolling to Patch Pulse section

## Status at End of Run

### Tier 1 — Already Built Before This Run
- Scan counter: ✅ Built
- Google Calendar ICS export: ✅ Built (client-side + server route)
- Won leaderboard (WinStatsBanner): ✅ Built
- WhatsApp templates (quick_quote_offer + availability_check): ✅ Built

### Next Priorities
1. **Pricing page copy** — still corporate ("firm-aware qualification", "5-25-person contractors"). Should be rewritten in tradesman-first language: fear→proof→control, name competitors.
2. **LeadDetailPage copy** — "FOLLOW-UP REMINDER" section could be more urgent/tradesman-first
3. **Mobile nav / CTA audit** — check if bottom action bar on LeadDetailPage is visible on all mobile viewports
