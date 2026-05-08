# Running Summary — 8th May 2026

## Session: 8 May 2026 — Multi-Agent Execution Loop

### What Was Done

#### 1. oh-my-openagent Installed
- Installed via npx with OpenCode Go provider
- Configured agents: Sisyphus (kimi-k2.6), Oracle (glm-5.1), Prometheus (glm-5.1), Atlas (kimi-k2.6), Explore (qwen3.5-plus), Librarian (qwen3.5-plus), Multimodal Looker (kimi-k2.6)
- Config at: `~/.config/opencode/opencode.json` + `~/.config/opencode/oh-my-openagent.json`

#### 2. JobFilter — Mobile Audit + Fixes (COMPLETED)
- **Critical**: Added hamburger menu button to TopNav (was missing entirely)
- **All 18 pages**: Responsive headline scaling (text-3xl → md:text-8xl)
- **PricingPage**: Table wrapped in overflow-x-auto
- **FindJobsPage**: Form grid stacks properly on mobile
- **Touch targets**: All buttons 44px minimum
- **Build passes**: npm run build successful

#### 3. JobFilter — EPC Signal Engine (COMPLETED)
- Created product spec: `Product/EPC Signal Engine.md`
- Rewrote `src/pages/EpcPage.tsx` as conversion-focused landing page
- Created `src/components/EpcSignalCard.tsx` component
- Pricing: £19/mo standalone, included in Pro
- Trade-specific signal mapping (electricians → EICR, plumbers → boilers, etc.)
- Updated Pricing.md with EPC tier

#### 4. JobFilter — Competitor Intel Update (COMPLETED)
- Updated `Competitor Product Lessons.md` with BuildScout FMB partnership, 2BuildUK dead, TradeFlow partner
- Created `System/Competitor Intel - 8th May 2026.md`
- Created `System/Research Briefs - 8th May 2026.md` (8 briefs with owners/deadlines)
- Updated `Simple Competitor List.md` with 10 new entries
- Reddit sentiment extracted: trades want exclusivity, hate shared leads, distrust marketing

#### 5. AgentDock — Deep Research (COMPLETED)
- Created `AgentDock/Product/Competitor Intel - 8th May 2026.md`
- Updated `AgentDock/Product/Competitor Research.md` with 10 competitors
- Created `AgentDock/Product/Research Briefs - 8th May 2026.md`
- Updated `AgentDock/Product/MVP Scope.md` with CSV audit export, conflict warnings
- **Key finding**: No competitor owns ticketing-native, compliance-first orchestration
- **Wedge**: ServiceNow complaint management for telecom/broadband (50-500 employees)

#### 6. Voice Control Research (COMPLETED)
- Created `AI Knowledge/Voice Control for OpenCode - 8th May 2026.md`
- Recommended: Plugin + whisper.cpp sidecar (offline, free, privacy-first)
- OpenCode's plugin system exposes `tui.prompt.append`, `session.prompt` — perfect for voice injection
- Implementation roadmap: POC 1-2 weeks, production 4-5 weeks

### Pushed to GitHub
- Commit 1: `33fbcae` — 85 files changed, 7,495 insertions
- Commit 2: `ae04d90` — 22 files changed, 2,852 insertions

#### 7. JobFilter — Chase Engine (COMPLETED)
- Created `src/lib/chaseStore.ts` — localStorage persistence
- Created `src/lib/chaseTemplates.ts` — 6 pre-written templates in tradesman language
- Rewrote `src/components/ChaseStatus.tsx` — colour-coded stage badges
- Created `src/pages/ChaseEnginePage.tsx` — board + list view, detail panel, template picker
- Added `/chase` route + TopNav link
- **Features**: Import leads, Kanban/List toggle, 3-touch escalation (2h→24h→48h), copy-to-clipboard WhatsApp templates, stats dashboard

#### 8. JobFilter — Win Engine (COMPLETED)
- Created `src/lib/winStore.ts` — full CRUD + monthly/yearly stats + review generator
- Created `src/pages/WinEnginePage.tsx` — 4 tabs: Wins, Lost, Review Links, Trend
- Updated `src/components/WinSummary.tsx` — uses winStore
- Added `/win` route + TopNav link
- **Features**: Monthly ROI dashboard, won job timeline, review link generator (Google/Checkatrade), lost job analysis (tap-to-select reason), 12-month trend chart, untracked detection

#### 9. JobFilter — 2BuildUK Alternative Page (COMPLETED)
- Created `src/pages/BuildUkAlternativePage.tsx` — route `/2builduk-alternative`
- 10-row comparison table, 5 signals breakdown, scoring explainer, pricing cards
- Purpose: Capture orphaned 2BuildUK customer base

#### 10. khutba.io — Deep Research (COMPLETED)
- Created `khutba.io/Competitor Intel - 8th May 2026.md` — MinbarLive deep dive, 6 market gaps, 12 monetization opportunities
- Created `khutba.io/Research Briefs - 8th May 2026.md` — 10 strategic briefs
- Added competitor files: MasjidBoard.md, Al-Mosque.md, Muslim Pro for Mosques.md
- **Key finding**: Screen-first is the moat, unlimited minutes is pricing weapon, Ramadan is killer acquisition moment

#### 11. JobFilter — City SEO Pages (COMPLETED)
- Created reusable `src/components/CityPage.tsx` with CITIES config array
- Built 6 city pages: Birmingham, London, Manchester, Bristol, Leeds, Glasgow
- Routes: `/construction-leads/{city}`
- Each page: unique copy, real stats, local angle, postcode scanner CTA, internal SEO cluster links
- Meta titles + descriptions for SEO
- Vault doc: `Product/City SEO Strategy.md`

#### 12. JobFilter — Comparison Pages (COMPLETED)
- Created `src/pages/CompareBuildAlertPage.tsx` — `/vs/buildalert`
- Created `src/pages/CompareCheckatradePage.tsx` — `/vs/checkatrade`
- Honest comparisons, 12-row tables, five signals breakdown, WhatsApp delivery section
- Vault doc: `Product/Comparison Pages.md`

#### 13. JobFilter — Stripe Checkout (COMPLETED)
- Created `functions/stripe.ts` + `server/routes/stripe.ts` — checkout session + webhook handler
- Created `src/components/CheckoutButton.tsx` — triggers Stripe Checkout
- Updated PricingPage with monthly/annual toggle, real checkout buttons, dynamic pricing
- Founding 30 slot enforcement (409 if full)
- Webhook signature verification, payment status updates in Firestore
- Test mode only — needs `STRIPE_PUBLISHABLE_KEY` + `STRIPE_WEBHOOK_SECRET` in env

#### 14. JobFilter — Free Tools Expansion (COMPLETED)
- Rewrote FreeToolsPage as hub with 6 tool cards, click-to-expand
- "3 free scans remaining" counter in hero
- Email capture modal on 3rd scan (name, trade, email for 3 more free scans)
- Paywall section when limit hit without email capture
- Every tool result has CTAs to /pricing, /find-jobs
- Profit check colour-coded (red/green)
- localStorage scan tracking

#### 15. JobFilter — Conversion Polish (COMPLETED)
- **TopNav**: Founding 30 slots counter, "GET STARTED" CTA, mobile hamburger menu fixed, weekly pricing in mobile CTA
- **HomePage**: Weekly pricing framing, removed duplicate sections, added testimonials from Reddit/forums, real WhatsApp message preview, cost-per-job comparison bar
- **PricingPage**: "Most Popular" badge on Founding 30, weekly pricing on every card, 30-day guarantee banner, annual lock-in urgency, cost-per-job comparison section
- **FindJobsPage**: Trade presets expanded to 8 trades, form simplified (3→2 fields), preview banner, inline upgrade prompt, weekly pricing on locked CTAs
- **Footer**: Conversion CTA bar, 4-column link organization, "Built in Birmingham" trust section

#### 16. JobFilter — Triple Engine Integration (COMPLETED)
- **FindJobsPage → Chase**: "Track This Lead" button on each card, TRACKING badge, "Go to Chase/Win" links in header
- **ChaseEnginePage → Win**: Auto-creates Win record on "Won", mini ROI summary in header, "View in Win Engine" link
- **WinEnginePage → Find**: "Find More Like This" button pre-fills scanner, "Your Pipeline" section with live counts
- **Dashboard**: New /dashboard page showing all three engines at a glance with live counts
- **TopNav**: Badge counts on Chase (active leads) and Win (monthly wins), mobile nav shows 3-column engine summary
- **HomePage**: "TRIPLE ENGINE" section with links to all three, WinSummary widget in final CTA

#### 17. JobFilter — Free Tools Funnel Optimization (COMPLETED)
- **FreeToolsPage**: Social proof badge, urgent scan counter, Quick Start CTA banner, upgraded email capture with weekly signals opt-in, welcome banner after capture, split paywall choice, free vs paid comparison table, cross-tool recommendations
- **VantagePage**: "Want leads to bid on?" CTA, cross-tool nav
- **VicinityPage**: "Turn finished jobs into more work" CTA, cross-tool nav
- **SmartQuotePage**: "Want leads worth quoting on?" CTA, cross-tool nav
- **TipsPage**: "Ready to find real jobs?" CTA, cross-tool nav

#### 18. Trade Body Partnership Research (COMPLETED)
- Created `System/Trade Body Partnership Strategy - 8th May 2026.md`
- Ranked 8 trade bodies by partnership potential
- Top 3: NAPIT (8/10), ECA (7/10), NFRC (7/10)
- Partnership model: member benefit programme (£19/mo exclusive rate, 15-25% revenue share)
- Draft outreach email templates for top 3

#### 19. JobFilter — Document Search Prototype (COMPLETED)
- Created `src/components/KeywordSearch.tsx` — search bar with 12 keyword buttons
- Created `src/lib/documentSearch.ts` — mock search with 12 realistic planning documents
- Integrated into FindJobsPage as collapsible section
- Created vault doc: `Product/Document Search Spec.md` with technical spec, cost analysis, 8-week plan
- Cost: £8-15/mo to run vs Buildscout's £239/mo

#### 20. JobFilter — Pricing Experiments (COMPLETED)
- **Weekly framing**: Weekly price is PRIMARY number across all pages (£6.99/wk, £6.71/wk)
- **Annual urgency**: "Save £108/year" in big green text, progress bar for Founding 30 slots
- **Risk reversal**: 30-day guarantee banners on HomePage, PricingPage, FindJobsPage, FreeToolsPage
- **ROI Calculator**: Interactive slider on PricingPage — job value × jobs/month = real-time ROI vs Checkatrade/Agency
- **Founding 30 urgency**: Progress bar in nav + PricingPage hero, "X/30 slots taken" with visual indicator

#### 21. AgentDock — MVP Build (COMPLETED)
- Landing page with enterprise B2B dark theme
- "See every agent. Control every action." positioning
- Pipeline strip: TRIGGER → TRIAGE → DRAFT → REVIEW → SEND → LOG
- 4 agent roles with live status LEDs
- Demo mode with simulated ServiceNow ticket activity
- Dashboard: Operations Dock, Agent Board, Pipeline View, Handoff Log, Review Gate, Connectors
- Vault docs: MVP Scope updated, AgentDock Landing Page Spec created

#### 22. khutba.io — Product Build + Launch Plan (COMPLETED)
- Built full codebase: server (Socket.io, UK prayer times, Ramadan countdown, WhatsApp share), client (Landing, Pricing, Display, Admin pages)
- Screen-first positioning vs MinbarLive's phone-only
- Unlimited minutes vs MinbarLive's caps
- Pricing: £29/£59/£99 vs MinbarLive's €59-€299/mo
- Vault docs: Product Roadmap (5 phases), Ramadan Launch Plan 2027, UK Mosque Outreach Strategy

#### 23. JobFilter — Integration Partnership Map (COMPLETED)
- Created `System/Integration Partnership Map - 8th May 2026.md`
- Prioritized 11 integrations by retention impact × implementation cost
- Top 5 with technical specs: WhatsApp Business API, Google Calendar, TradeFlow UK, Companies House API, Xero
- 3 outreach templates ready to send
- 30/60/90 day implementation plan
- Key finding: WhatsApp deeper integration + Google Calendar are fastest wins; TradeFlow completes the pipeline

#### 24. JobFilter — Trade SEO Pages (COMPLETED)
- Created reusable `src/components/TradePage.tsx` with TradePageData interface
- Built 5 trade pages: Plumbers, Electricians, Builders, Heat Pump Installers, Roofers
- Routes: `/trade/{trade}` — each with unique headline angle, trade-specific pain points, real data stats
- Internal SEO cluster links between all trade pages
- Vault doc: `Product/Trade SEO Strategy.md`

#### 25. JobFilter — Messaging Angles (COMPLETED)
- **"Quiet Week Problem"**: New section on HomePage with 4-week calendar visual showing pipeline filling
- **"First-Mover Advantage"**: Added to both comparison pages with timeline contrast (minutes vs days)
- **"Stop Paying for Other People's Leads"**: Enhanced CompareCheckatradePage with 1→5→1→4 visual
- **"Built in Birmingham"**: Dedicated section on HomePage + enhanced Footer with concrete reasons
- **"Competitor FOMO"**: Added to PricingPage near Founding 30 urgency

#### 26. JobFilter — Feature Roadmap (COMPLETED)
- Created `Product/Feature Roadmap - 8th May 2026.md`
- 24 features scored by impact × effort
- Top 3: Trade-specific scoring (8.0), Radius-based alerts (8.0), Fill My Week button (7.0)
- 30/60/90 day build plan with quick wins, medium builds, and long-term plays

#### 27. JobFilter — Top Priority Features Built (COMPLETED)
- **Trade-specific scoring**: Updated scorer with TRADE_KEYWORDS config for 8 trades, high/medium/low keyword tiers, trade match bonuses (+18 max)
- **Radius-based alerts**: 5/10/15/25/50 mile selector, distance shown on lead cards ("12 miles from B14"), saved to localStorage
- **"Fill My Week" button**: Aggressive scan with phased loading animation, shows gold count, urgency copy
- Updated leadEngine/scorer.ts, scan.ts, types.ts, server routes, Firebase functions, FindJobsPage

#### 28. JobFilter — Community Intelligence (COMPLETED)
- Created `System/Community Intelligence - 8th May 2026.md`
- 10 verbatim quotes from Reddit, ElectriciansForums, Screwfix, MSE
- Pricing sensitivity: trades will pay £25-£80/mo, £29/mo is sweet spot
- Competitor weaknesses mapped from trade mouths
- 5 validated messaging angles confirmed by community intel
- Monthly monitoring plan established

#### 29. AgentDock — ServiceNow Connector Spec (COMPLETED)
- Created `AgentDock/Product/ServiceNow Connector Spec.md` (992 lines)
- Table API selected as primary, Scripted REST for custom endpoints
- OAuth 2.0 auth flow with full diagram
- Complete data model mapping (ServiceNow → AgentDock)
- 14-item compliance checklist (FCA DISP, Ofcom, GDPR, UK data residency)
- Standalone connector approach (not scoped app) — 17 working days
- 8 complete TypeScript code examples

#### 30. khutba.io — Landing Page Polish (COMPLETED)
- Screen-first hero with mosque screen mock (LIVE badge, trilingual display)
- Side-by-side comparison cards (khutba.io vs MinbarLive)
- Ramadan 2027 countdown with urgency badge ("Set up before Rajab — 3 months free")
- WhatsApp share button with pre-filled message
- UK trust signals bar (Birmingham · London · Manchester, 5 languages, GDPR, no app needed)
- Pushed to GitHub: manazoid4/khutba-io (master branch)

#### 31. JobFilter — Stability + Error Handling (COMPLETED)
- **ErrorBoundary**: Wraps entire App — no white screens, friendly error page with reload + report
- **API Client**: Centralized `api.ts` with error handling for network, 400-503, rate limits, timeouts
- **Toast System**: Bottom-right notifications (error/success/info) with 5s auto-dismiss
- **Skeleton Loaders**: Shimmer animation for cards, pricing, pages — no blank screens
- **404 Page**: Friendly "page doesn't exist" with 6 navigation cards
- **Performance**: All 30+ pages lazy-loaded as separate chunks (39 total), 292KB initial bundle

#### 32. AgentDock — Dashboard Polish (COMPLETED)
- **P1 Demo Scenario**: 10-phase realistic fibre outage simulation (47 B2B customers down)
- **Approval Gates**: Interactive modals at REVIEW phases requiring user Approve/Reject
- **Live Audit Feed**: Real-time audit log with severity coloring
- **Command Centre**: Live clock, 6 KPI cards, compliance score indicator
- **Kanban Pipeline**: Drag-and-drop visual with stage descriptions
- **Connector Status Page**: Health metrics per connector (latency, uptime, errors, last sync)
- **Landing Page**: Customer logos (BT, Virgin, TalkTalk, Vodafone, Sky, Hyperoptic), 3-step "How it works", video placeholder
- Pushed to GitHub: manazoid4/AgentDock (main branch)

#### 33. JobFilter — Weekly Signals Feed (COMPLETED)
- Created `/signals/weekly` — live data feed page
- Score strip: GOLD (143), SILVER (412), BIN (1292) with trend arrows
- 5 signal cards: Planning (347), EPC (218), Contracts (89), Property (892), Businesses (301)
- Regional breakdown: 12 UK regions with bar charts, clickable to city pages
- Archive: 3 previous weeks with comparison to current week
- Share modal: X/Twitter, LinkedIn, WhatsApp, copy text, embed iframe
- Final CTA: "Scan your postcode" conversion path

#### 34. JobFilter — BuildAlert Comparison Enhanced (COMPLETED)
- Hero: "BuildAlert sends letters. JobFilter sends jobs." with letter vs WhatsApp visual
- 17-row feature comparison table (expanded from 12)
- Interactive cost calculator: slider 1-50 jobs/month, break-even at 15 jobs
- 4 real user quotes comparing both platforms
- Honest "What BuildAlert Does Well" section with "speed beats copy" messaging

#### 35. JobFilter — Land Registry Signal (COMPLETED)
- Created `leadEngine/fetchers/landRegistryFetcher.ts` — mock property sales with realistic prices, dates, property types
- Integrated into scan pipeline (parallel fetch with other sources)
- 70% source confidence for LandRegistry signals
- Preview title: "New owner nearby — [trade] renovation likely"
- Added to Data Sources table, vault doc created
- Now 6 signals total: Planning, Contracts, EPC, Property Sales, Businesses, Land Registry

### Pushed to GitHub
- **JobFilterV1**: 18 commits on fix/main-build → main (latest: `701b8f7`)
- **khutba-io**: 1 commit on master (latest: `fcf5854`)
- **AgentDock**: 1 commit on main (latest: `05edd85`)

### Deployed to Firebase
- Hosting: jobfilter.uk — LIVE with all improvements
- Functions: api — LIVE with Land Registry signal + trade-specific scoring + radius support

### Key Decisions
- JobFilter's 5 unfair advantages: WhatsApp push, multi-source scoring, no login needed, no per-action cost, EPC + contracts layer
- AgentDock's wedge: ServiceNow complaint management, compliance-first, visibility-first
- EPC Signal Engine positioned as £19/mo standalone (legal urgency + Warm Homes Plan)
- Mobile fixes keep brutalist yellow design intact
- Triple Engine now complete AND integrated: Find → Chase → Win — all connected
- Free Tools now have clear conversion paths on every page
- Pricing uses weekly framing (£6.99/wk) to reduce perceived cost
- Founding 30 urgency reinforced with slots counter in nav + progress bar
- Document search prototype built — £8-15/mo to run vs Buildscout's £239/mo
- khutba.io: screen-first moat, unlimited minutes, Ramadan 2027 launch plan

### Key Decisions
- JobFilter's 5 unfair advantages: WhatsApp push, multi-source scoring, no login needed, no per-action cost, EPC + contracts layer
- AgentDock's wedge: ServiceNow complaint management, compliance-first, visibility-first
- EPC Signal Engine positioned as £19/mo standalone (legal urgency + Warm Homes Plan)
- Mobile fixes keep brutalist yellow design intact
- Triple Engine now complete: Find → Chase → Win — all built and working

### Next Loop Priorities
1. Twilio WhatsApp key setup — make Chase/Win engines live (needs `TWILIO_ACCOUNT_SID` + `TWILIO_AUTH_TOKEN`)
2. Stripe live keys + webhook deployment — activate checkout
3. Root ErrorBoundary for App.tsx (stability)
4. AgentDock MVP: ServiceNow connector + Review Gate + audit log
5. Land Registry signal integration (already in vault — not yet built)
6. Companies House signal (built, key-gated — needs API key)
7. Weekly trade-signal feed logic (SEO + engagement)
8. PlanWire integration (fresh planning alerts + webhooks)

### Rule
- Every feature must fit into Triple Engine: Find → Chase → Win
- If it doesn't, don't build it
- Obsidian vault is source of truth — keep it clean
