# Daily To-Do

## 2026-08-09

### Completed This Run
- [x] Build check — PASS
- [x] TypeScript check — PASS (0 errors)
- [x] Verify all Tier 1 features built (scan counter, ICS export, WinStatsBanner, WhatsApp templates, trade scoring)
- [x] Copy polish — FindJobsPage: gold lead gate (fear-first, names what's locked)
- [x] Copy polish — PricingPage: free CTAs now say "NO CARD NEEDED" inline
- [x] Copy polish — PricingPage: pilot plan description is now benefit-first
- [x] Upgrade nudge footer: plain English benefit copy
- [x] Pushed to nightly/copy-polish-2026-08-09, PR #449 updated

### Next Run — Top 3 Priorities

1. **FindJobsPage empty-state copy**: When a scan returns 0 results, what does the user see? Investigate and improve
   the empty-state message to explain WHY (trade/area may have nothing on FTS right now) rather than leaving them
   confused. Should name Checkatrade/MyBuilder/BuildAlert as the context they're coming from.

2. **Lead score reasons — trade specificity**: The tradeHighlights() function in LeadListPage.tsx only shows
   "YOUR TRADE" badges when the API returns "Trade match: X (..." reasons. Verify that real API responses do
   include this pattern, or add a fallback that maps known job types to trade-specific labels
   (e.g. "ELECTRICAL — REWIRE", "PLUMBING — BOILER"). This is the trade-specific scoring UX feature.

3. **Comparison pages copy**: The vs/checkatrade, vs/mybuilder etc. pages should name each competitor's specific
   weakness vs JobFilter (e.g. "Checkatrade charges per-lead and shares the same job with 5 tradesmen.
   JobFilter shows public tenders with no shared auction."). Currently these pages may be generic.
   Read them and apply the copy rules: fear → proof → control.
