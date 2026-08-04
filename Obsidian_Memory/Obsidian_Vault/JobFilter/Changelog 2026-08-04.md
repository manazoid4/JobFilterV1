# Changelog 2026-08-04

## NightlyBuildAgent Run

### BUILD STATUS
- npm run build: PASS (green, 120 static pages)
- npx tsc --noEmit: PASS (0 errors)

### PHASE 1 — FIX BROKEN
No broken builds or TypeScript errors found. Build was clean from the start.

### PHASE 2 — TIER 1 FEATURES (audit)
All Tier 1 features were already implemented:
- Scan counter: Built (lines 432-448 FindJobsPage.tsx — shows "X free scans remaining this week")
- Google Calendar ICS export: Built (calendarExport.ts + LeadDetailPage.tsx ADD TO CALENDAR)
- Won leaderboard: Built (outcomeReport.ts /api/wins/stats + WinStatsBanner.tsx, already rendered on FindJobsPage)
- WhatsApp templates: Built (quick_quote_offer + availability_check in chaseTemplates.ts)
- Trade-specific scoring UX: Built (parseTradeReasons + TITLE_KEYWORDS in FindJobsPage.tsx)

No new Tier 1 feature was needed this run — all were already shipped.

### PHASE 3 — COPY POLISH

**PricingPage.tsx:**
- CTA "START AFTER COVERAGE CHECK →" → "START PILOT — £39/MO →" (removes friction language)
- Both CTA instances updated (hero + bottom yellow section)
- Free plan body copy: removed corporate language, added "No credit card, no signup gate"
- Free plan CTA: "SCAN FREE — NO CARD NEEDED →" → "SCAN FREE — NO CARD REQUIRED →"
- Paid plan priceNote: removed "Paid activation follows coverage and delivery checks" → "Scan free first. Pay when the coverage fits your firm."
- Paid plan body: removed "firm-aware", simplified to plain English
- Bottom section free scan button updated to match

**FindJobsPage.tsx:**
- "READY?" prompt → "STOP CHASING DEAD LEADS" (fear hook)
- Added competitor call-out: "Unlike Checkatrade or Bark, these are verified public opportunities — not shared leads sold to five trades at once"
- Upgrade nudge header: "REAL JOBS. BUYER DETAILS IN FULL ACCESS." → "NOT BARK. NOT CHECKATRADE. NOT A SHARED AUCTION."
- "No credit card required to scan" added inline next to CTA
- Removed corporate body copy, replaced with plain English + "no shared leads"

### PHASE 4 — SITE HEALTH

**NEEDLE findings:**
1. (FIXED) PricingPage: "START AFTER COVERAGE CHECK →" was the highest-friction CTA — users couldn't tell if they could pay immediately or had to do something first
2. PricingPage: "No card required" was buried in small muted text below CTAs — partly addressed by making free CTA button itself say "NO CARD REQUIRED"
3. FindJobsPage: Upgrade nudge didn't differentiate from Checkatrade/Bark — now names competitors

**BUILDER:** Fixed the PricingPage CTA and copy confusion
**CRITIC:** Clearer in <3 seconds: YES — "START PILOT — £39/MO →" is immediate and obvious
**REVENUE:** Increases likelihood of £39/mo: YES — removing the implied "you must wait" gate reduces abandonment

### NEXT RUN — TOP 3 PRIORITIES
1. Build a proper trade-specific scoring UX improvement — make score reasons on lead cards actually show trade-specific language (e.g. "EV CHARGER — YOUR TRADE" for electricians, "BOILER REPLACEMENT" for plumbers) rather than generic labels
2. LeadDetailPage: confirm the ADD TO CALENDAR button is visible and working for free tier users (not locked behind paywall)
3. HomePage: Add a competitor comparison strip (vs Checkatrade, MyBuilder, Bark) to the hero section to increase differentiation and SEO value
