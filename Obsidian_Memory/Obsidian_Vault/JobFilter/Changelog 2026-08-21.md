# Changelog 2026-08-21

## NightlyBuildAgent Run

### Build Status
- Build: PASS (Next.js compiled successfully in ~15s)
- TypeScript: CLEAN (0 errors)

### Tier 1 Features — Status Check
All Tier 1 features found already built:
- Scan counter (localStorage, resets Monday): ✓ built
- Google Calendar ICS export: ✓ built (LeadDetailPage CalendarCopyLink)
- Won leaderboard (WinStatsBanner): ✓ built (/api/wins/stats endpoint + component)
- WhatsApp templates "Quick quote offer" + "Availability check": ✓ built (chaseTemplates.ts)
- Trade-specific scoring UX (parseTradeReasons): ✓ built

### Copy Polish — FindJobsPage
- Empty state: Removed off-brand SVG illustration; replaced corporate alert copy with direct trade language; added Bark/Checkatrade contrast
- Scan limit message: "Buyer and submission context locked" → "Free scans used up — upgrade to see who to call, the value, and the deadline on every lead"
- Upgrade nudge: New micro-label "NO SHARED AUCTION. NO FIVE-TRADE BLAST."; added competitor contrast; "No credit card required to browse" added to CTA

### Copy Polish — PricingPage
- Hero micro-label: "FOUNDER-ASSISTED PILOT" → "FULL ACCESS — £39/MO"
- Hero body: "5–25-person contractors evaluating public works" → "electricians, plumbers, roofers and builders who want to quote public work — without wading through procurement jargon"
- FAQ: Added Checkatrade/Bark competitor answer explicitly

### Site Health (Phase 4)
NEEDLE found: 3 issues — paywall jargon at scan limit, pricing page wrong persona, dashboard FTS acronym
BUILDER fixed all 3:
- DashboardPage: "PUBLIC-WORKS DECISION TRACKER" → "YOUR JOB PIPELINE"
- DashboardPage: "FIND A TENDER: FREE + PUBLIC" badge → "LIVE PUBLIC JOB FEED"
- DashboardPage: "CHECK CURRENT FTS OPPORTUNITIES →" → "SCAN FOR JOBS NEAR YOU →"
CRITIC: All 3 changes clear in <3 seconds ✓
REVENUE: Yes — removes persona mismatch and paywall jargon at highest-intent moment ✓

### PR
https://github.com/manazoid4/JobFilterV1/pull/492
Branch: nightly/copy-polish-2026-08-21
