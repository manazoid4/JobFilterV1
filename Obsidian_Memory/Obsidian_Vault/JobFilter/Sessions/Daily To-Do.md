# Daily To-Do

## Today - 17 May 2026

- [x] Job value tracking — clicking WON shows value capture panel (£ input), calls markWon() into winStore, posts actual value to backend — DashboardPage scoreboard now shows real wins
- [x] BuildUkAlternativePage: EPC / Land Registry / Companies House naming removed from comparison tables and signals — replaced with signal-type descriptions
- [x] CompareBuildAlertPage: same source naming fix + NO CARD NEEDED added to free CTAs
- [x] FindJobsPage: FILL MY WEEK copy — "opportunity network" jargon replaced with plain trade language
- [x] WinStatsBanner + GhostRiskBadge components recovered (dropped by PR #108 merge)
- [x] Build: GREEN, TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-17 written
- [ ] Wire Stripe Checkout live test end-to-end with test key
- [ ] Confirm `VITE_OPEN_ACCESS=false` in Firebase hosting env before public launch
- [ ] Commercial lead detection (Tier 2 — next high-value feature, scores 3.25)
- [ ] TradeFlow "Send to TradeFlow" button on lead cards (Option A — 1 day build)
- [ ] Investigate PR #108 merge strategy — caused LeadDetailPage / FindJobsPage regression (features dropped)

---

## Today - 16 May 2026

- [x] GET /api/leads/calendar.ics server route — query-param ICS, shareable link for WhatsApp
- [x] LeadDetailPage: COPY CALENDAR LINK button uses server route URL
- [x] TrustCenterPage: fix product rule violation — dataSources replaced with verifiedSignals (no longer names EPC/Land Registry/Companies House publicly)
- [x] TrustCenterPage: hero gets competitor naming (Checkatrade/Bark/MyBuilder) + no-shared-auction promise
- [x] PricingPage: competitor naming paragraph in hero (Checkatrade/Bark/BuildAlert)
- [x] FindJobsPage: empty scan upgrade prompt anchored BEFORE widen radius buttons
- [x] FindJobsPage: mobile lead card gets inline UNLOCK FULL LEAD CTA (lg:hidden) — CTA visible without scrolling
- [x] Build: GREEN, TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-16 written
- [ ] Wire Stripe Checkout live test end-to-end with test key
- [ ] Confirm `VITE_OPEN_ACCESS=false` in Firebase hosting env before public launch
- [ ] Commercial lead detection (Tier 2 — next high-value feature, scores 3.25)
- [ ] Job value tracking — when marking Won, capture actual £ value vs estimated
- [ ] TradeFlow "Send to TradeFlow" button on lead cards (Option A — 1 day build)

---

## Today - 15 May 2026

- [x] data/outcomes.jsonl persistence — wins survive server restart, WinStatsBanner data is durable
- [x] DashboardPage: territory header explains WHY lock matters; Quick Actions removes duplicate status block → single LOCK MY PATCH CTA
- [x] TerritoriesPage: GBP→£, hero free CTA gets NO CARD NEEDED, WHY section names Checkatrade/Bark/MyBuilder, WHAT YOU GET adds no-shared-auction promise
- [x] FindJobsPage: FILL MY WEEK moved below scan results — no more competing scan flows
- [x] Build: GREEN, TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-15 written
- [x] Fix lead card right column on mobile — UNLOCK CTA added inline (lg:hidden) ✅
- [x] Empty scan state: upgrade prompt anchored before WIDEN RADIUS ✅
- [ ] Wire Stripe Checkout live test end-to-end with test key
- [ ] Confirm `VITE_OPEN_ACCESS=false` in Firebase hosting env before public launch

---

## Today - 14 May 2026

- [x] Trade-specific scoring UX — parseTradeReasons() in FindJobsPage, electrician sees EV CHARGER — YOUR TRADE, plumber sees BOILER — YOUR TRADE
- [x] Fix scoreReasons → reasons mapping in leadsSearch.ts (frontend was always showing fallback)
- [x] ICS calendar export — LeadDetailPage ADD TO CALENDAR button, FOLLOW-UP REMINDER section
- [x] LeadListPage copy polish — remove fake 98.4% stat, fix live ticker, better empty CTAs, SEND WHATSAPP
- [x] LeadDetailPage copy polish — WHY THIS LEAD, DID YOU WIN IT?, plain-English flag explanations
- [x] HomePage CTA hierarchy — SCAN FREE — NO CARD NEEDED as single primary CTA, demote other CTAs to text links
- [x] Build: GREEN, TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-14 written
- [ ] Wire Stripe Checkout (Founding 30 + Pro)
- [ ] Confirm Twilio env vars in Firebase console
- [ ] Confirm `VITE_OPEN_ACCESS=false` in Firebase hosting env before public launch
- [x] DashboardPage: add territory status line ("Territory: Not Locked" or "Territory: B12 Roofing") before scan CTA
- [x] PricingPage: make Founder card visually dominant (bolder border or background) vs Free tier
- [x] WhatsApp template picker in LeadDetailPage — stage-aware, toggle UX, wa.me deep link
- [x] PricingPage + CompareCheckatradePage copy polish — SCAN FREE — NO CARD NEEDED CTAs
- [x] CompareCheckatradePage data source naming fix (Land Registry, Companies House removed)
- [x] FindJobsPage duplicate Target badge removed (bundle −580 B)

---

## 13 May 2026 (archived)

- [x] Fix FreeToolsPage.tsx TS1128 errors (9 spurious `}` after section comments)
- [x] Fix outcomeReport.ts `${'£'}` encoding artifact in win stats message
- [x] Merge FindJobsPage — preserve remote visual features, add NightlyBuild additions (WinStatsBanner, OPEN_ACCESS env var, weekly scan counter)
- [x] Verify TypeScript clean before push

---

## 6 May 2026 (archived)

- [x] Fix white screen (3 chained ReferenceErrors: LeadPreview, products, steps)
- [x] Fix TopNav JSX (misplaced closing tags)
- [x] Trigger Firebase deploy manually (PR #66 never auto-deployed)
- [x] Unlock lead engine for testing (remove toFreePreviewLead gating)
- [x] Run scenarios S3, S5, S14 — see [[Launch Scenarios]]
- [x] Clean Obsidian vault (Recent.md, Learnings.md, Rolling Launch Summary, Vault Map)
- [x] Add root ErrorBoundary to App.tsx
  - Created `ErrorBoundary.tsx` — catches React errors, shows friendly message, reload + report buttons
  - Created `api.ts` — centralized API client with error handling (network, 404, 500, rate limits)
  - Created `Toast.tsx` — toast notifications for API errors (no console errors)
  - Created `Skeleton.tsx` — reusable skeleton loaders for cards, pricing, pages
  - Created `NotFoundPage.tsx` — friendly 404 with brutalist yellow design + navigation links
  - Code-split all non-critical pages (lazy loading) — 39 separate chunks
  - Added missing CSS variables (`--paper`, `--offwhite`, `--rule`, `--yellow-2`)
  - Added `@types/react` and `@types/react-dom` to fix type errors
  - Every error has recovery path (reload, report, navigate)
- [ ] Wire Stripe Checkout (Founding 30 + Pro)
- [ ] Confirm Twilio env vars in Firebase console
- [x] Add "cold outreach needed" flag for planning-only leads (S14 gap)
  - Added `coldOutreachNeeded` field to ChaseLead type
  - Added filter button in ChaseEnginePage to surface cold outreach leads
  - Orange badge on board cards + list view + detail panel warning

---

## 2 May 2026 (archived)

- [x] Spawn codebase deep-dive agent.
- [x] Spawn competitor/source research agent.
- [x] Add data-source status note.
- [x] Save one-lead-per-week scenarios.
- [x] Add intake test mode.
- [x] Add useful news/signals page.
- [x] Fix PlanningData gating and free-tier lead-engine limit.
- [x] Run 10-postcode source smoke test.
- [x] Run build and targeted regressions.
- [x] Wire visible `/find-jobs` scanner to the unified lead engine.
- [x] Improve one-lead-rule pass rate to 42/42.
- [x] Add won/lost/no answer outcome tracking.
- [x] Confirm WhatsApp key blocker and test stub gold-lead delivery.
- [x] List API keys needed from founder.

## Rolling Next

- [ ] Confirm Companies House key.
- [ ] Confirm WhatsApp provider/token.
- [ ] Confirm PlanWire interest/key.
- [ ] Decide whether My Link is free acquisition or paid value.
- [ ] Add paid lead proof card.
- [ ] Add lead outcome tracking.
- [ ] Add weekly trade-signal feed logic.
- [ ] FindJobsPage: move FILL MY WEEK section below scan results (currently above — creates competing scan flows)
- [ ] DashboardPage: territory shown in two places — add connecting copy explaining why territory lock matters
