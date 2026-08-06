# Daily To-Do

## 2026-08-06 — NightlyBuildAgent Run

### COMPLETED TODAY
- [x] Build green (npm run build + tsc --noEmit — both pass)
- [x] Fix "CPV: Matched" jargon in HomePage hero bubbles → "Trade: Matched"
- [x] Fix HomePage micro-label from procurement-speak to trade names
- [x] Fix FindJobsPage scan exhaustion copy — plain English
- [x] Fix PricingPage: competitor framing, remove "pilot" jargon, add "no card required"
- [x] Add FAQ "Is this like Checkatrade?" to PricingPage
- [x] Push branch + PR to GitHub

### NEXT RUN — TOP PRIORITIES

1. **PricingPage plan bullets** — replace jargon bullets (BID/WATCH/SUBCONTRACT/SKIP) with benefit bullets:
   - "See exactly which jobs to quote, which to watch, and which to skip"
   - "Know the buyer name, deadline and official response route"
   - "Stop wasting time on jobs outside your trade or patch"
   File: `src/pages/PricingPage.tsx:9` (`planBullets` array)

2. **QuickResponseKit template picker** — check if all chase template channels (email, portal, letter, canvass) are surfaced in the UI. Currently chaseTemplates.ts has 14 templates across 5 channels but UI may only show WhatsApp.
   File: `src/components/QuickResponseKit.tsx`

3. **Trade-specific lead card reasons** — `parseTradeReasons()` produces generic badges like "GOOD VALUE", "URGENT". Electrician users should see "EV CHARGER", "REWIRE"; plumbers should see "BOILER", "BATHROOM". Need to pass the active `trade` into `LeadResultCard` and weight trade-specific keywords higher in the badge display.
   File: `src/pages/FindJobsPage.tsx:918` (`parseTradeReasons` function)

### BACKLOG
- [ ] ICS calendar link — verify ADD TO CALENDAR opens native calendar app on iOS (may need `webcal://` protocol)
- [ ] WinStatsBanner — only shows when Supabase has data; test with dummy data to verify the component works end to end
- [ ] vs/ comparison pages (Checkatrade, MyBuilder etc) — check copy is aggressive enough vs. competitors
