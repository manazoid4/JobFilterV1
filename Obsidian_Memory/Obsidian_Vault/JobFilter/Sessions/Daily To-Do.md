# Daily To-Do — JobFilter

## 2026-08-03 (NightlyBuildAgent)

### Completed This Run
- [x] Confirm all 5 Tier 1 features are built (scan counter, ICS export, wins stats, WhatsApp templates, trade scoring)
- [x] PricingPage: competitor-named h1, no-card CTA, remove duplicate hero copy
- [x] SignupPage: fix misleading "gold leads from day one" copy, stronger h1
- [x] DashboardPage: fix 5-column alert form overflow at 640px breakpoint
- [x] Build passes clean, TypeScript clean
- [x] PR #425 pushed and open

### Next Run Priorities

1. **LeadDetailPage B2C language cleanup** — residual "buyer's direct number" and "no five-trade blast" copy doesn't fit the FTS/public-procurement product positioning. Audit and replace with procurement-appropriate language (buyer organisation, official submission route, response deadline).

2. **Mobile scan results UX** — on small screens, the lead card grid in FindJobsPage collapses to 1-column but the score badge column takes 80px of a narrow screen. Consider hiding WHY button on mobile or stacking score badge inline.

3. **Compare pages consistency** — CompareCheckatradePage has "Territory-routed — one trade per postcode cluster, priority routing" in marketPlatforms table but homepage and PricingPage no longer make this claim. Audit all 6 compare pages for copy that contradicts current product positioning.

### Backlog
- WinStatsBanner: returns null when wonCount = 0 — consider a first-time prompt instead of nothing
- LeadDetailPage: ADD TO CALENDAR link exists client-side but not visible as a prominent CTA in the action bar
- Trade-specific scoring: electricians don't yet see "EV CHARGER" or "REWIRE" reason badges by default — requires score engine changes not just UI
- Competitor page: Bark page (`vs/bark`) has older copy than the Checkatrade page
