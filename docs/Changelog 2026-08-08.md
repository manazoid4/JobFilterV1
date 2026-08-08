# Changelog — 2026-08-08 (NightlyBuildAgent)

## Build Status
- npm run build: PASS
- npx tsc --noEmit: PASS (no errors)

## TypeScript
No errors found.

## What Was Built / Fixed

### Phase 1 — Fix Broken
- Build and TypeScript were already clean. No broken imports found.

### Phase 2 — Tier 1 Features Audit
All Tier 1 features were already built:
- Scan counter: PRESENT (FindJobsPage lines 432–448)
- Google Calendar ICS export: PRESENT (calendarExport.ts + LeadDetailPage CalendarCopyLink)
- WinStatsBanner + /api/wins/stats: PRESENT (WinStatsBanner.tsx + outcomeReport.ts)
- WhatsApp templates (quick_quote_offer, availability_check): PRESENT (chaseTemplates.ts)
- Trade-specific scoring UX: PRESENT (parseTradeReasons function)

No new Tier 1 feature built — all already shipped.

### Phase 3 — Copy Polish (PricingPage + FindJobsPage)

**PricingPage:**
- Hero paragraph: rewritten with fear→proof→control. Now leads with "Most contractors spend hours reading public tenders that were never going to fit..." and names Checkatrade/MyBuilder as competitors
- Hero secondary CTA: "SCAN FREE FIRST →" → "SCAN FREE FIRST — NO CARD →"
- Hero footnote: removed redundant third line, added Checkatrade/MyBuilder differentiation
- Plan card CTA: "START AFTER COVERAGE CHECK →" → "CHECK FIT & START — £39/MO →"
- Plan bullets: rewritten to be outcome-specific ("Missing requirements flagged before you waste a day on a no-win tender")
- FAQ question 1: changed from "Is Find a Tender free?" to "Is this like Checkatrade or MyBuilder?" — much more useful at decision moment

**FindJobsPage:**
- Scan-limit zero-state: "Buyer and submission context locked. Scanning remains free." → "3 scans used. Buyer details and deadlines hidden until you unlock. Cancel any time."
- Empty-state headline: "CHECK THE CURRENT PUBLIC-TENDER FEED." → "SEE WHAT'S LIVE NEAR YOU RIGHT NOW."
- Empty-state micro-label: "READY?" → "YOUR PATCH. YOUR TRADE."
- Hardcoded "SCAN BUILDING WORK" button bug fixed → trade-aware "SCAN [TRADE] JOBS →"

### Phase 4 — Site Health
NEEDLE found 3 issues:
1. PricingPage CTA confusion → FIXED (CHECK FIT & START — £39/MO →)
2. FindJobsPage scan-limit jargon → FIXED (plain English naming what is locked)
3. FindJobsPage "SCAN BUILDING WORK" override bug → FIXED (trade-aware)

CRITIC: Yes — all 3 fixes are clearer in <3 seconds.
REVENUE: Yes — CTA fix and competitor naming directly increase likelihood of £39/mo conversion.

## PR
https://github.com/manazoid4/JobFilterV1/pull/448

## Next Run — Top 3 Priorities

1. **Trade-specific scoring UX (deeper)**: The parseTradeReasons function maps generic keywords — but the badge labels on lead cards could be even more specific per trade. Electricians should see "EV CHARGER", "EICR", "CONSUMER UNIT" highlighted in yellow; plumbers should see "BOILER", "BATHROOM", "HEAT PUMP". Currently this depends on the backend returning trade-specific reasons which may or may not happen.

2. **FindJobsPage upgrade nudge placement**: The gold-lead paywall message appears mid-list after the first gold lead. On mobile this can be confusing — users see partial results then hit a wall. Consider moving the upgrade nudge to the top of the lead list when scans are exhausted, not buried mid-scroll.

3. **PricingPage social proof**: The pricing page has zero social proof — no win stats, no testimonials, no "X contractors in your area checked this week" type signal. Even a static line like "14 contractors qualified their first public tender this month" would materially improve trust at the payment decision point.
