# Daily To-Do

_Last updated: 2026-08-17 by NightlyBuildAgent_

---

## COMPLETED — 2026-08-17

- [x] Build: green (Next.js + TypeScript clean)
- [x] Trade-specific scoring UX: TRADE_SPECIFIC_SIGNALS map + extractTradeSignals + LeadResultCard currentTrade prop
- [x] Copy: PricingPage — competitor mentions (Checkatrade, MyBuilder), tradesman-first language, "No credit card required" on all free CTAs
- [x] Copy: FindJobsPage — upgrade nudge names Bark/BuildAlert, "no shared auction" language, clearer quota banner
- [x] Site health: quota-exhausted banner — plain English + mobile-friendly CTA layout
- [x] Site health: LeadListPage WhatsApp dead-end — free-tier users now see pricing upsell instead of broken wa.me link
- [x] PR #478 created: nightly/trade-scoring-copy-health → main

---

## TO DO — NEXT RUN

- [ ] **HIGH**: LeadDetailPage empty state (`line 167`) — "LEAD NOT FOUND" + generic "BACK" → add explanation + "SCAN FOR JOBS →" CTA. Affects users who email themselves a lead and open it on a different device.
- [ ] **MEDIUM**: Trade-specific WHY THIS LEAD section in LeadDetailPage — static flags, could show EV charger / boiler context based on lead source + user trade.
- [ ] **MEDIUM**: WinStatsBanner cold-start — banner only shows when wonCount > 0. Add aspirational "Be the first trade in [AREA] to log a win" nudge when count is zero.
- [ ] **LOW**: CompareCheckatradePage / CompareMyBuilderPage — verify these pages reference the correct competitor pricing (Checkatrade raised rates in 2025).
- [ ] **LOW**: ForYourTradePage — verify trade-specific page copy matches TRADE_SPECIFIC_SIGNALS keywords added this run.
