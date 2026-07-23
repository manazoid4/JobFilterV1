# Daily To-Do — JobFilter

Last updated: 2026-07-23

## COMPLETED THIS RUN ✓

- [x] npm audit: fixed body-parser + added sharp override — 0 vulnerabilities
- [x] Trade-specific scoring UX: TRADE_KEYWORD_CONTEXT map (8 trades, 60+ keywords) — WHY? tooltip now shows value/time context per trade
- [x] Stats bar labels: upgraded 9px → 11px, added descriptive sublabels (PLANNING JOBS, ENERGY UPGRADES, public tenders live)
- [x] Trade preset buttons: disabled state when no postcode entered (opacity-40, cursor-not-allowed + label change)
- [x] HomePage hero copy: names Checkatrade, Bark explicitly in subheading
- [x] PricingPage objections: names Checkatrade, MyBuilder, Bark, BuildAlert — specific attack lines
- [x] PR #387 raised and CI re-triggered after security fix

## NEXT PRIORITIES (in order)

- [ ] **PR #387**: confirm CI green and merge
- [ ] **LeadDetailPage score reasons**: apply TRADE_KEYWORD_CONTEXT enrichment to score reasons panel (same fix as FindJobsPage WHY? tooltip)
- [ ] **NEEDLE: Duplicate upgrade CTAs**: remove `lg:hidden` inline "UNLOCK FULL LEAD →" button from lead card body (~line 1344 FindJobsPage) — LockedValue + post-list section already handle this
- [ ] **ForYourTradePage**: copy hasn't been touched — apply tradesman-first rules, name competitors
- [ ] **WinStatsBanner**: add local context ("3 members near B14 won jobs this month") for stronger social proof
- [ ] **SignalsPage**: check if weekly signals email opt-in form is still wired to a real endpoint — confirm no fake setSubmitted flows
- [ ] **LeadDetailPage**: check ADD TO CALENDAR link still works after recent changes
- [ ] **DashboardPage**: verify WinSummary component renders correctly and win rate data shows real numbers

## STANDING RULES (never forget)

- No Rightmove/Zoopla integrations
- No GDPR-risk homeowner enrichment
- No change to GOLD/SILVER/BRONZE labels
- No new pages (21 is enough)
- No change to route paths unless broken
- All CTAs must have "No credit card required" near free actions
- NEVER say "leverage", "utilise", "solution", "platform"
- NEVER name data sources publicly — say "verified signals" or "official sources"
