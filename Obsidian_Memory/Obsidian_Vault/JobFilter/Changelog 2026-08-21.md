# Changelog — 2026-08-21 (NightlyBuildAgent)

## Build Status
- npm run build: PASS (120/120 static pages compiled)
- npx tsc --noEmit: PASS (0 errors)
- PR: https://github.com/manazoid4/JobFilterV1/pull/495

---

## Changes Made

### FindJobsPage.tsx

**Scan limit message (clarity)**
- OLD: "Buyer and submission context locked. Scanning remains free."
- NEW: "Free scans used — buyer details and bid guidance unlock with Full Access."
- Why: The old copy was jargon. Tradesmen don't know what "submission context" means.

**Upgrade nudge section (fear → proof → control)**
- Label: "REAL JOBS. BUYER DETAILS IN FULL ACCESS." → "THESE ARE REAL JOBS — BUYER DETAILS LOCKED"
- Added ROI line: "Full Access shows the buyer, published value, deadline and official response route. One job covers 12 months at £39."
- CTA subtext: Added "No credit card required to browse · 30-day money back"
- Removed: Long disclaimer paragraph that buried the conversion point

**WHY THIS SCORE? button (site health fix)**
- Font: 9px → 11px
- Border: single → border-2
- Hover: plain text hover → yellow background hover
- Label: "WHY?" → "WHY THIS SCORE?" (purpose is now obvious)
- Score reasons popup: w-36 → w-40, single border → border-2 with shadow, gap-0.5 → gap-1, 9px text → 10px text
- Impact: Score reasons are the primary trust signal. Hiding them behind an invisible button undermined all the scoring engine work.

### PricingPage.tsx

**Bottom CTA section**
- Headline: "VERIFY COVERAGE BEFORE YOU PAY." → "SCAN YOUR PATCH FREE. PAY ONLY IF IT FITS."
- Added context paragraph: "See what's live in your trade and area right now — no card, no signup. If the coverage fits your firm, activate at £39/mo. One job won covers 12 months."
- CTA order swapped: Free scan now primary (dark button), Activate secondary (white button)
- Money-back guarantee: Moved from faint `text/60` to bold black — was invisible before

---

## Tier 1 Features Status (pre-existing)

All 5 listed Tier 1 features were already implemented before this run:
- Scan counter: DONE (3 scans/week, resets Monday, gated on OPEN_ACCESS)
- Calendar ICS export: DONE (GET /api/leads/calendar.ics, ADD TO CALENDAR on LeadDetailPage)
- Won leaderboard: DONE (WinStatsBanner + GET /api/wins/stats?postcode=)
- WhatsApp templates: DONE (quick_quote_offer, availability_check in chaseTemplates.ts)
- Trade-specific scoring UX: DONE (parseTradeReasons extracts EV/rewire/boiler keywords)

---

## Next Run Priorities

1. **SITE HEALTH — mobile lead card layout**: On narrow screens, the score badge column (BID/WATCH score + WHY THIS SCORE?) and the title column can collide. Test at 375px width and fix overflow if needed.

2. **COPY — SignupPage trade list**: "CCTV / security installer" and "Data cabling engineer" both map to value `electrical`, which is confusing if a user sees the raw form value. Consider trade display vs internal value consistency.

3. **FEATURE — Alert quick-setup**: The AlertQuickSetup component shown after scan results needs a working backend endpoint. Check if /api/alerts/subscribe is wired or still a placeholder.
