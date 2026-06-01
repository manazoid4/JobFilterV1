# Daily To-Do

## Today - 1 June 2026 (NightlyBuildAgent — Run 1)

- [x] **Dashboard isEmpty LOCK YOUR PATCH CTA** — yellow button added to isEmpty block alongside RUN YOUR FIRST SCAN and SEE PRICING (new users with no territory get direct path)
- [x] **Dashboard scan counter reset note** — "X of 3 used · resets Mon" replaces ambiguous "X of 3 free used" (matches FindJobsPage which had this since 22 May)
- [x] **Dashboard avg per win stat** — "Avg per win: £X,XXX" row added to YOUR SCOREBOARD when wins > 0 (tradesmen can now benchmark job values)
- [x] **CompareBarkPage CTA copy** — "Stop paying per lead. Start scanning smarter." → "Bark credits burn. Your pipeline doesn't have to." + stronger body copy + "SCAN MY AREA FREE — NO CARD" button
- [x] Build GREEN (98 pages), TypeScript CLEAN, pushed to main
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys)
- [ ] **FreeToolsPage isPaywalled** — confirm `const isPaywalled = false` is still correct (free tools intentional)
- [ ] **LeadListPage OUTCOMES strip value** — show "£X,XXX won" aggregate in the WON/LOST/NO ANSWER strip at top of page
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 31 May 2026 (NightlyBuildAgent — Run 3)

- [x] **Job value capture in OutcomeActions (FindJobsPage)** — £ input on Won click; markWon() now called from Find page (Tier 2 feature complete)
- [x] **Duplicate UNLOCK CTAs** — dark bottom "LOCK FOUNDER PRICE" banner removed; 4→3 CTAs on FindJobsPage
- [x] **Yellow banner CTA** — restructured: button now above explanatory text, visible in <3s on mobile (NEEDLE fix)
- [x] **FILL MY WEEK progress UX** — step progress bar (3 segments) + "Takes about 5 seconds" added
- [x] **ForYourTradePage copy** — competitor names in all 6 trade signals; "Why tradesmen use JobFilter" rewritten with specific proof/control language
- [x] **FaqPage copy** — data source naming fix ("property transactions" → "property ownership data"); money-back answer strengthened; hero adds competitor mentions
- [x] Build GREEN (98 pages), TypeScript CLEAN, pushed to main

## Today - 31 May 2026 (NightlyBuildAgent — Run 2)

- [x] **TradeDampProofers EPC sweep** — 14 violations fixed (EPC data → energy signals throughout)
- [x] **TradeGasEngineers EPC sweep** — 15 violations fixed (EPC F/G-rated → low energy-rated, EPC cluster → low-efficiency cluster)
- [x] **CompareRatedPeoplePage** — 4 EPC/land registry naming violations fixed
- [x] **NewsPage** — 2 EPC violations fixed (trend label + hero body)
- [x] **TradeSolar** — 1 remaining EPC violation fixed (whatsappMessage "EPC D" → "low energy rating")
- [x] **FindJobsPage NEEDLE fix** — "source-fused evidence" jargon → plain English ("Works Starting Now shows jobs with the strongest timing signals...")
- [x] Build GREEN (98 pages), TypeScript CLEAN, pushed to main
- [ ] **Duplicate UNLOCK CTAs on FindJobsPage** — 4× "UNLOCK FOR £39/MO →" causing decision fatigue; consolidate to max 2 placements
- [ ] **FILL MY WEEK progress UX** — no time estimate or progress indicator; looks broken on slow connection
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys)
- [ ] **FreeToolsPage isPaywalled** — confirm `const isPaywalled = false` is still correct (free tools intentional)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 31 May 2026 (NightlyBuildAgent — Run 1)

- [x] **TypeScript fix** — leadsSearch.ts AccessContext: `return 'full'` → `return { tier: 'full', ... }` (build was failing)
- [x] **DashboardPage NEEDLE-2** — removed triple scan CTA when isEmpty (third redundant "RUN YOUR FIRST SCAN →" removed from YOUR SCAN SETUP section)
- [x] **HomePage territory** — "Manchester Bathrooms COMING SOON" → "AVAILABLE" (score 79→82, removes unfinished-product signal)
- [x] **CompareBarkPage** — 3 EPC/land registry naming violations fixed in comparison table + HOW JOBFILTER WORKS list
- [x] **CompareMyBuilderPage** — 2 EPC/land registry naming violations fixed
- [x] **TradeSolar** — 3 EPC naming violations fixed (EPC-flagged → energy-flagged, EPC data → energy signal)
- [x] **FindJobsPage** — EPC badge → ENERGY, COMPANIES HOUSE fallback → BUSINESS SIGNAL, scan mode copy EPC → energy
- [x] Build GREEN (98 pages), TypeScript CLEAN, pushed to main

## Today - 29 May 2026 (Run 4 — Vercel Env + GitHub Secrets + Prod Deploy)

- [x] **Root cause of broken auth identified + fixed**: Vercel had VITE_SUPABASE_URL/ANON_KEY but NO NEXT_PUBLIC_* mirrors. Next.js client code was getting undefined Supabase URL. Login appeared broken because browser client could not reach Supabase at all.
- [x] Added to Vercel (Production + Preview): NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, NEXT_PUBLIC_APP_URL — mirrored from VITE_* equivalents.
- [x] Added to GitHub repo secrets (11 total): STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_FOUNDING/PRO/BUSINESS, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_APP_URL.
- [x] Vercel production deploy triggered manually after env update: `job-filter-v1-lauhge9zm` — READY.
- [x] Live smoke test: jobfilter.uk /, /login, /signup, /pricing all return 200.
- [x] Pulled .env.vercel-pull deleted (secrets safety).

## Today - 29 May 2026 (Stripe Wired Agent)

- [x] **Stripe Checkout wired end-to-end** — PR #222 merged to main.
- [x] `src/lib/stripe.ts` helper added (`getStripe`, `resolvePriceId`, `getAppOrigin`) — server-side only.
- [x] `app/api/stripe/checkout/route.ts` — accepts `{ priceId, plan }`; `success_url` → `/dashboard?welcome=1`; `cancel_url` → `/pricing?cancelled=1`; metadata `{ user_id, plan }` for webhook; `allow_promotion_codes` enabled.
- [x] `app/api/stripe/webhook/route.ts` — reads `user_id`/`plan` metadata (snake_case + legacy fallback); upserts `profiles.stripe_customer_id` alongside `profiles.plan` on `checkout.session.completed`.
- [x] Pricing CTAs (`<CheckoutButton>` on PricingPage hero, Founder card, bottom strip) wire to live `/api/stripe/checkout` — no client changes needed.
- [x] Build: GREEN. TypeScript: CLEAN.
- [ ] **Vercel env vars to confirm in production** (names only — set values in Vercel UI): `STRIPE_SECRET_KEY` (test key for E2E), `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_PRICE_FOUNDING_MONTHLY` (or `STRIPE_PRICE_FOUNDING`), `STRIPE_PRICE_FOUNDING_ANNUAL`, `STRIPE_PRICE_PRO_MONTHLY`, `STRIPE_PRICE_PRO_ANNUAL`, `STRIPE_PRICE_BUSINESS`, `STRIPE_PRICE_EPC_MONTHLY`, `NEXT_PUBLIC_APP_URL` or `APP_URL`. `vercel env ls` requires `vercel link` (not run from this worktree).
- [ ] **Live test**: with test Stripe key set in Vercel, click `LOCK FOUNDER PRICE` on /pricing signed-in → complete `4242 4242 4242 4242` → confirm `/dashboard?welcome=1` lands and `profiles.plan` flips to `founding` in Supabase.

## Today - 29 May 2026 (Run 2 — Feature Audit Agent)

- [x] Planning locality fix — `planningDataFetcher.ts` text-search results now require address-level confirmation (UK postcode in address OR outward token in address). Geo (lat/lon) results still trusted. `rawLocation` no longer falls back to bare outward on non-geo lookups.
- [x] Delivery lock key — `sms.ts` normalises `payload.postcode` to outward via `getOutward()`. Lock key is now `trade + postcodeOutward + sourceSystem` (collides whether caller passes "B14" or "B14 7AB").
- [x] `leadNotify.ts` — forwards `leadData.source` as `sourceSystem` so the patch lock actually engages from `/api/leads/notify`.
- [x] EpcPage letter copy reviewed — already "PRINT & POST TEMPLATE" (template only, no physical send claim). No code change needed.
- [x] Routes audited: `/dashboard`, `/find-jobs`, `/login`, `/account` — all wire to live SPA pages. No dead `href="#"` in `app/` or `src/`. No `/contact` route exists or is linked.
- [x] New regression `codex-output/planning-locality-regression.mjs` passes. `whatsapp-env-regression.mjs` + `planning-contact-signal-regression.mjs` still pass.
- [x] Build GREEN.
- [ ] TradeFlow "Send to TradeFlow" button (still blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 29 May 2026 (Supabase SSR Bridge Agent)

- [x] Auth root cause fixed — browser client now uses `createBrowserClient` from `@supabase/ssr` so logins write the SSR cookie that server components read. `src/lib/supabase.ts` legacy entry also migrated; `AuthProvider.signOut` + `AccountPage.signOut` now POST `/api/auth/logout` to clear the cookie. PR #221 merged to main.

## Today - 27 May 2026 (Run 3 — NightlyBuildAgent)

- [x] DashboardPage: duplicate scan CTA fixed — `RUN YOUR FIRST SCAN →` in YOUR INTAKE now gated on `isEmpty` (no more duplicate with header `SCAN FOR JOBS →`)
- [x] HomePage: "FIRST STRIKE" jargon removed — section label → "READY-TO-SEND MESSAGES — INCLUDED WITH PATCH PLAN"; body rewritten without brand name
- [x] FindJobsPage: trust badge "BEFORE CHECKATRADE SEES IT" → "REAL LEADS — NOT ON JOB BOARDS YET" (removes ambiguity)
- [x] FindJobsPage: upgrade banner adds "Cheaper than one Bark lead — 30-day money-back" (price anchor + guarantee at conversion point)
- [x] Build: GREEN (67 pages), TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-27 Run 3 written
- [x] PR #198 created, Vercel preview building
- [ ] Wire Stripe Checkout live test end-to-end with test key
- [ ] Confirm NEXT_PUBLIC_OPEN_ACCESS=false in Vercel env before public launch
- [ ] TradeFlow "Send to TradeFlow" button (needs URL scheme from founder)
- [ ] Planning locality fix — planningDataFetcher broad fallback stamps non-local leads with outward code
- [ ] WhatsApp delivery truth — sms.ts stub success not safe for production
- [ ] Delivery lock key — deliveryLockKey = trade + postcodeOutward + sourceId not implemented
- [ ] n8n workflow 16 (LLM Brief Builder) — still inactive, needs SMTP creds + manual activation
- [ ] EpcPage: "JobFilter can send a professional introductory letter" copy — review if this is real service or aspirational

---

## Today - 27 May 2026 (Run 2 — NightlyBuildAgent)

- [x] False letter claim removed — "Unlimited direct letters — 1st class postage included" fixed across 7 pages (TerritoriesPage x2, TrustCenterPage, FaqPage, HomePage, MethodologyPage, BlueprintPage). No physical letter delivery backend exists; replaced with "Letter drop scripts for every lead — print and post in minutes"
- [x] CompareBuildAlertPage: "Letter delivery" row updated to "Physical letter service: Template included — you post"
- [x] LeadListPage: SEND WHATSAPP now uses first_touch_2h template from chaseTemplates.ts (consistent with LeadDetailPage)
- [x] HomePage: "Open Territory Grid" → "SEE OPEN TERRITORIES →" + secondary "SCAN FREE — NO CARD NEEDED" dual-button
- [x] TerritoriesPage: "Lock Patch" CTA → "LOCK PATCH →" (uppercase, brutalist style)
- [x] Build: GREEN (67 pages), TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-27 Run 2 written
- [ ] AccountPage still uses AuthProvider (Vite env vars) — needs full migration to createBrowserSupabaseClient
- [ ] Wire Stripe Checkout live test end-to-end with test key
- [ ] Confirm NEXT_PUBLIC_OPEN_ACCESS=false in Vercel env before public launch
- [ ] TradeFlow "Send to TradeFlow" button (needs URL scheme from founder)
- [ ] Planning locality fix — planningDataFetcher broad fallback stamps non-local leads with outward code
- [ ] WhatsApp delivery truth — sms.ts stub success not safe for production
- [ ] Delivery lock key — deliveryLockKey = trade + postcodeOutward + sourceId not implemented
- [ ] n8n workflow 16 (LLM Brief Builder) — still inactive, needs SMTP creds + manual activation
- [ ] EpcPage: "JobFilter can send a professional introductory letter" copy — review if this is real service or aspirational; if not live, update to "enquiry only" framing (currently EpcPage CTA says ENQUIRE which is fine)

---

## Today - 26 May 2026 (Run 4 — AuditAgent)

- [x] Lead engine double-penalty bug fixed — DirectorySignal leads were -16 instead of -8 (scorer + scan.ts both applied -8; now scorer only)
- [x] `lead-engine-quality-regression.mjs` — added `SOURCE_DIRECTORY_SIGNAL=true`; was failing for all 5 postcode/trade combos
- [x] `free-scanner-redaction-regression.mjs` — fixed dead `functions/index.ts` path → `legacy/firebase/functions/index.ts`; updated stale UI copy assertions
- [x] `lead-engine-source-config-regression.mjs` — rewritten for `sourceConfig.ts` / `isSourceEnabled` architecture (old CONFIG.sources.planningData is gone)
- [x] `package-copy-regression.mjs` — updated from removed Letterhead Pack copy to current £39/mo / Founding 30 copy
- [x] `outcome-tracking-regression.mjs` — added OUTCOMES summary strip (WON/LOST/NO ANSWER counts) to LeadListPage
- [x] 6/6 regressions PASS. Build GREEN. TypeScript CLEAN. PR #196 merged.
- [x] Vault: Changelog 2026-05-26 Run 4 written. RALPH_PLAN done log updated.
- [x] AccountPage: DONE — migrated to createBrowserSupabaseClient in Run 5 (2026-05-26)
- [ ] Wire Stripe Checkout live test end-to-end with test key
- [ ] Confirm NEXT_PUBLIC_OPEN_ACCESS=false in Vercel env before public launch
- [ ] TradeFlow "Send to TradeFlow" button (needs URL scheme from founder)
- [ ] Planning locality fix — planningDataFetcher broad fallback stamps non-local leads with outward code
- [ ] WhatsApp delivery truth — sms.ts stub success not safe for production
- [ ] Delivery lock key — deliveryLockKey = trade + postcodeOutward + sourceId not implemented
- [ ] n8n workflow 16 (LLM Brief Builder) — still inactive, needs SMTP creds + manual activation
- [ ] EpcPage: review "JobFilter can send a professional introductory letter" — if not a live service, remove or gate behind enquiry only

---

## n8n Automation Stack — All 16 Workflows

All workflow JSONs live in `JobFilterV1/n8n-workflows/`. Pushed via `node scripts/n8n-push.mjs`. Activate in n8n UI at `http://localhost:5678`.

| # | Agent | ID | Type | Cron / Trigger | Purpose |
|---|-------|----|------|----------------|---------|
| 01 | Daily Lead Digest | `hlT2YtrEBHMS0mwt` | cron | Mon–Fri 7am | `/api/leads/search` → morning lead summary |
| 02 | READY Signal Alert | `DbfARpb9uVhOdie7` | cron | every 2h | `/api/start-signals/search` → alert on READY leads (dedup via 05) |
| 03 | Multi-Trade Weekly Sweep | `67CVueXovSGu1l50` | cron | Mon 8am | `/api/leads/search` × N trades → weekly pipeline fill |
| 04 | Vault Writer | `KPPRqOtDhPJhe7Kc` | sub-workflow | called by others | Reusable node: writes `JobFilter/Agent Runs/YYYY-MM-DD/<agent>-<HHmm>.md` |
| 05 | Lead Dedup Memory | `XbhFFSqPXg7OT48c` | sub-workflow | called by 02 | Reads/writes `.seen-lead-ids.json` — prevents repeat alerts |
| 06 | Outcome Logger | `2Oar5tVrrKQWxyN3` | webhook | inbound | Won/lost → `/api/start-signals/:id/feedback` → vault `JobFilter/Outcomes/` |
| 07 | Material Price Watcher | `wK1QMco772GKXSQl` | cron | daily 6am | `/api/material-prices` diff vs snapshot → alert on >5% spike |
| 08 | Territory Summary | `mJ2jqkaEcljpAG3a` | cron | Sun 9am | `/api/territory-summary` → vault `JobFilter/Territory/` |
| 09 | Waitlist Health | `XylHASk4kvRZmsLt` | cron | hourly | `/api/waitlist-count` → alert on 10/50/100/500 milestones |
| 10 | Stripe Webhook → Vault | `2f4zmgH6jVn5ekhZ` | webhook | Stripe events | Payment/cancel events → vault `JobFilter/Revenue/YYYY-MM-DD.md` |
| 11 | Chase Check Reminder | `93yhO5CYnzrGdq92` | cron | daily 10am | Leads aged 3/7/14d no outcome → `/api/chase-check` + email |
| 12 | Intake Score Triage | `NMO8gGyB1vy6jHcW` | webhook | new intake | `/api/intake-score` → routes gold/silver/bronze vault folder |
| 13 | Calendar Sync | `enCGdpU5usm1Hy84` | cron | daily 6pm | `/api/calendar-export` → push ICS to Google/Outlook |
| 14 | Source Health Watchdog | `u5sWqnbh4gXY7oKj` | cron | every 4h | `/api/status` → alert if any source down |
| 15 | Competitor Watch | `zxjXt1x1yZA1YGN9` | cron | weekly | `/api/leads/search` on competitor postcodes → weekly diff |
| 16 | LLM Brief Builder | `dkeRwtZ1lygxeY0w` | cron | daily 6:50am | Reads last 7d Agent Runs → rebuilds `JobFilter/Daily Brief.md` |

**Status:** All 16 JSONs pushed to n8n. Most active. Workflows 01/02/03 need SMTP creds before email nodes fire. Workflow 16 still awaiting manual activation test.

To re-push after any JSON change:
```bash
node scripts/n8n-push.mjs
```

---

## NEXT BUILD AGENT PROMPT

Copy this exactly into the next NightlyBuildAgent or Claude Code session:

```
You are working on JobFilter in this repo. Read AGENTS.md, AGENT_RUNNING_MODEL.md, and Obsidian_Memory/Obsidian_Vault/Vault Map.md first. Also read Obsidian_Memory/Obsidian_Vault/JobFilter/Product/Problems and Solutions.md before any copy, pricing, or lead gating changes.

Context as of 2026-05-26 Run 4:
- Stack: Next.js App Router + Express API (proxied via pages/api/[[...path]].ts) + React SPA (src/App.tsx inside app/page.tsx ClientApp wrapper). Vite config is dead — Next.js is live.
- Production: https://jobfilter.uk (Vercel). Branch main is live.
- Lead engine: leadEngine/scan.ts → sourceConfig.ts (isSourceEnabled) → individual fetchers. DirectorySignal is the internal fallback (enabled in DEMO_MODE or SOURCE_DIRECTORY_SIGNAL=true).
- Auth: Supabase. createBrowserSupabaseClient() for client-side. AuthProvider still uses Vite env vars — needs migration (only AccountPage still uses it).
- Stripe: checkout wired, webhook wired. NEEDS live test with test key.
- WhatsApp: sms.ts has stub success path — NOT production safe. OpenWA plan saved but not wired.
- 6/6 regressions green as of last session.

Priority order for this session:
1. NEEDLE CHECK — scan all pages for regressions or new opportunities (run a quick 4-agent check: Builder, Critic, Copywriter, Data):
   - Builder: anything broken or incomplete in the flow?
   - Critic: what would a paying tradesperson find confusing or untrustworthy?
   - Copywriter: any copy that can be tightened, made more direct, or better aligned to AGENTS.md tone?
   - Data: anything that leaks source names, shows fake data, or breaks the product rule?

2. TOP LAUNCH BLOCKERS (pick the highest-impact one and fix it):
   a. AccountPage: replace AuthProvider (Vite env vars) with createBrowserSupabaseClient() — blocks returning users who change their account
   b. Planning locality: planningDataFetcher broad fallback stamps non-local planning records with the searched outward postcode — fix or filter non-local results
   c. WhatsApp delivery truth: sms.ts can report stub success. Real delivery = Twilio response check, status field 'queued'/'sent'/'failed', no production stub.
   d. Delivery lock key: implement deliveryLockKey = trade + postcodeOutward + sourceId, suppress duplicate same-trade same-patch leads

3. After any changes:
   - npm run build → must pass
   - npm run lint → must pass
   - Run applicable regression tests from codex-output/
   - git add -A && git commit -m "[NightlyBuildAgent] ..." && git push origin <branch>
   - Write vault changelog: Obsidian_Memory/Obsidian_Vault/JobFilter/Changelog YYYY-MM-DD Run N.md
   - Update Sessions/Daily To-Do.md with what was done + what's still open

Do not: expose source names publicly, add placeholder/fake leads to production paths, rewrite unrelated files, over-engineer before lead quality is proven.
```

---

## Today - 26 May 2026 (Run 3 — NightlyBuildAgent)


- [x] Auth routes: create app/login, app/forgot-password, app/reset-password Next.js wrappers (all were 404ing)
- [x] LoginPage: replace react-router-dom + AuthProvider with Next.js navigation + createBrowserSupabaseClient
- [x] ForgotPasswordPage: replace react-router-dom Link + Vite supabase with next/link + createBrowserSupabaseClient
- [x] ResetPasswordPage: replace useNavigate + Vite supabase with useRouter + createBrowserSupabaseClient
- [x] AccountPage: replace Navigate(react-router-dom) with useRouter.replace('/login')
- [x] TopNav: add Sign In link (desktop + mobile) — existing users had no discoverable login path
- [x] SignupPage: "Work email" → "Email", "Postcode cluster" → "Your area (e.g. B14)", hero "LOCK THE ACCOUNT FIRST." → "CREATE YOUR ACCOUNT."
- [x] ActivationPendingPage: pre-checkout copy clarified — "under 2 minutes" + plain language
- [x] DashboardPage: YOUR INTAKE "Not set" rows → actionable RowLink CTAs to /find-jobs + yellow scan CTA when unset (NEEDLE #1)
- [x] Build: GREEN, TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-26 Run 3 written
- [x] AccountPage still uses AuthProvider — FIXED Run 5: migrated to createBrowserSupabaseClient, /account route created
- [ ] Wire Stripe Checkout live test end-to-end with test key
- [ ] Confirm NEXT_PUBLIC_OPEN_ACCESS=false in Vercel env before public launch
- [ ] TradeFlow "Send to TradeFlow" button (needs URL scheme from founder)
- [ ] SignupPage AuthProvider migration — signUp() still uses useAuth(); needs createBrowserSupabaseClient

## Today - 26 May 2026 (Run 5 — NightlyBuildAgent)

- [x] Auth routes restored: app/login, app/forgot-password, app/reset-password (lost in PR #196 merge, re-created)
- [x] LoginPage, ForgotPasswordPage, ResetPasswordPage: react-router-dom + Vite supabase → Next.js + createBrowserSupabaseClient
- [x] AccountPage: full AuthProvider removal, createBrowserSupabaseClient + inline subscription fetch
- [x] app/account/page.tsx created — /account route now live
- [x] SignalsPage: bg-blue-600 design violation fixed → bg-[var(--navy)]; Checkatrade price comparison added to CTA
- [x] FreeToolsPage: comparison table "Live lead scanner" free column: '—' → '3 free/wk'
- [x] FindJobsPage: mobile UNLOCK CTA now shows "Buyer · deadline · proof link" hint (matches desktop)
- [x] Build: GREEN (67 pages), TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-26 Run 5 written

---

## Today - 26 May 2026 (Run 2 — NightlyBuildAgent)

- [x] FindJobsPage: data source naming violations fixed (4 locations) — formatSourceLabel() helper added; lead card source badge, PATCH PULSE source mix, PATCH PULSE best source, locked Source URL placeholder
- [x] LeadDetailPage: signalStack badges naming violations fixed — formatSignalLabel() maps EPC/PlanningData/etc. to generic signal labels
- [x] DashboardPage: duplicate "Scan for Jobs" CTAs when isEmpty — QUICK ACTIONS isEmpty branch now "SEE WHAT YOU UNLOCK →" → /pricing (closes NEEDLE #1 from 28 May)
- [x] TradieZonePage: territory stat when not locked → "NOT LOCKED" / "Another trade could claim your area." (orange, urgent); empty leads state names Checkatrade/Bark + "No credit card required"
- [x] Build: GREEN, TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-26 Run 2 written
- [ ] Wire Stripe Checkout live test end-to-end with test key
- [ ] Confirm NEXT_PUBLIC_OPEN_ACCESS=false in Vercel env before public launch
- [ ] TradeFlow "Send to TradeFlow" button (needs URL scheme from founder)

---

## Today - 25 May 2026 (Run 2 — NightlyBuildAgent)

- [x] FindJobsPage: personal scan history — localStorage "YOUR RECENT SCANS" chips, one-tap auto-rescan
- [x] FindJobsPage: hero copy fixed — "Scan free — unlock full leads from £39/mo." (resolves NEEDLE #2 from 24 May)
- [x] FindJobsPage: mobile UNLOCK CTA inline in lead card center column, lg:hidden (resolves NEEDLE #3 from 24 May)
- [x] PricingPage: hero body names Checkatrade/Bark + no-auction copy; bottom CTA "LOCK YOUR PATCH. OWN THE JOBS." + trust line
- [x] Build: GREEN, TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-25 Run 2 written
- [ ] Wire Stripe Checkout live test end-to-end with test key
- [ ] Confirm NEXT_PUBLIC_OPEN_ACCESS=false in Vercel env before public launch
- [ ] TradeFlow "Send to TradeFlow" button (needs URL scheme from founder)
- [ ] DashboardPage: YOUR INTAKE "Not set" rows — inline scan CTA within each row

---

## Today - 24 May 2026 (Run 2 — NightlyBuildAgent)

- [x] DashboardPage: "Territory: Not Locked" → "YOUR PATCH: NOT LOCKED" — plain tradesperson language, no jargon (NEEDLE #1 from 4-agent check)
- [x] NewsPage: 3 data source naming violations fixed — EPC register, Open Data Communities, Companies House removed
- [x] FindJobsPage: Start Signal tooltip — "EPC, Companies House" → "energy signals, business registrations"
- [x] Build: GREEN, TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-24 Run 2 written
- [x] FindJobsPage: hero bait-and-switch — FIXED 25 May Run 2
- [x] FindJobsPage: mobile UNLOCK CTA above fold — FIXED 25 May Run 2

---

## Today - 24 May 2026 (Ultrawork Launch Audit)

- [x] `main` synced with `origin/main` at `901b908` after PRs #173-#175.
- [x] Daily audit script ran successfully and wrote top-level vault report.
- [x] Root build passed: `npm run build`.
- [x] Root TypeScript/lint passed: `npm run lint`.
- [x] Legacy Firebase Functions build passed.
- [x] Live smoke: `https://jobfilter.uk/find-jobs` returned 200.
- [x] OpenWA plan merged; keep OpenWA as worker/VPS pilot only, not Vercel launch delivery.
- [x] Daily Brief replaced stale stub with current launch-readiness brief.
- [ ] Fix planning locality: broad fallback in `planningDataFetcher.ts` must not stamp unrelated records with searched outward postcode.
- [ ] Wire paid lead gating to authenticated profile/subscription state; remove test-mode full-access assumptions.
- [ ] Register/fix subscription status route and align it with Supabase migration fields (`user_id`, `plan`, `active`, `status`).
- [ ] Harden WhatsApp delivery: verified profile phone, provider response checks, `queued/sent/failed`, delivery events, no production stub success.
- [ ] Add delivery lock controls: `deliveryLockKey`, recipient tracking, duplicate suppression, `competitionRisk`, `crowdingSignal`.
- [ ] Run Stripe Checkout + webhook live test with test key after subscription contract is fixed.
- [ ] Make `/health` return structured JSON, not only a 200 HTML page.
- [ ] Confirm actual Vercel production env flags replacing legacy `VITE_OPEN_ACCESS=false` concern.
- [ ] TradeFlow "Send to TradeFlow" button remains blocked on TradeFlow URL scheme from founder.

---

## Today - 21 May 2026 (Run 2 — NightlyBuildAgent)

- [x] DashboardPage: duplicate "Scan for Jobs" CTA — header CTA now hidden when isEmpty=true (NEEDLE #1 from 28 May)
- [x] PricingPage: feature card brand names — plain-English tagline promoted to h3, brand name to micro-label (NEEDLE #3 from 28 May)
- [x] HomePage: proofPoints rewritten — "Jobs spotted before Checkatrade lists them" + "no five-way blast" + "Verified signals — not recycled from job boards"
- [x] Build: GREEN, TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-21 Run 2 written
- [ ] Wire Stripe Checkout live test end-to-end with test key
- [ ] Confirm `VITE_OPEN_ACCESS=false` in Firebase hosting env before public launch
- [ ] TradeFlow "Send to TradeFlow" button on lead cards (Option A — 1 day build, pre-filled URL params — need TradeFlow URL scheme from founder)

---

## Today - 28 May 2026

- [x] LeadDetailPage: GOLD/SILVER/BRONZE tier-specific context in WHY THIS LEAD section
- [x] FindJobsPage: "Unlock exact value" → "See quote floor →" (NEEDLE #2 from 27 May)
- [x] FindJobsPage: paywall trust badges — 30-DAY MONEY-BACK / CANCEL ANYTIME / NO CONTRACT + opacity 50→80%
- [x] HomePage: 4 EPC naming violations fixed (hero body, step 01, PROFIT PROOF, Patch Watch)
- [x] Build: GREEN, TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-28 written
- [x] DashboardPage: duplicate "Scan for Jobs" CTA — DONE (21 May Run 2)
- [x] PricingPage: feature card brand names — DONE (21 May Run 2)
- [ ] Wire Stripe Checkout live test end-to-end with test key
- [ ] Confirm `VITE_OPEN_ACCESS=false` in Firebase hosting env before public launch
- [ ] TradeFlow "Send to TradeFlow" button on lead cards (Option A — 1 day build, pre-filled URL params — need TradeFlow URL scheme from founder)
- [ ] LeadDetailPage SILVER/BRONZE leads: show "worth watching" or "check timing" as specific reason text — DONE this session

---

## Today - 27 May 2026

- [x] LeadDetailPage: fix WhatsApp template filter — portal/canvass/letter templates removed from SEND WHATSAPP section
- [x] LeadDetailPage: add OTHER APPROACHES section — portal, canvass, letter templates with copy-to-clipboard
- [x] PricingPage: BUYER ACTION PACK + PATCH WATCH labels → "FOUNDER & STANDARD — INCLUDED"
- [x] CompareCheckatradePage: hero CTA → "SCAN MY AREA FREE" + "No credit card required" trust line
- [x] CompareCheckatradePage: FAQ section gets yellow CTA button (NEEDLE #3 from 25 May)
- [x] FindJobsPage: trust badge row (NO CREDIT CARD / 3 FREE SCANS / BEFORE CHECKATRADE SEES IT) — BUILDER fix from 4-agent check
- [x] Build: GREEN, TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-27 written
- [ ] Wire Stripe Checkout live test end-to-end with test key
- [ ] Confirm `VITE_OPEN_ACCESS=false` in Firebase hosting env before public launch
- [ ] TradeFlow "Send to TradeFlow" button on lead cards (Option A — 1 day build, pre-filled URL params — need TradeFlow URL scheme from founder)
- [ ] FindJobsPage: "Unlock exact value" placeholder copy — change to "See quote floor" or specific estimate hint (NEEDLE #2 from today)
- [ ] LeadDetailPage SILVER/BRONZE leads: show "worth watching" or "check timing" as specific reason text rather than generic fallback

---

## Today - 26 May 2026

- [x] DashboardPage: TRACKING 0-state guide text — "Scan your postcode, then tap TRACK THIS LEAD..." (closes NEEDLE #2)
- [x] DashboardPage: RESULTS 0-state guide text — "Chase a lead and tap WON after you land the job..." (closes NEEDLE #2)
- [x] LeadListPage: empty state copy updated — explicit scan→track→view flow replaces vague "Enter your postcode" (closes NEEDLE #3)
- [x] PricingPage: "Not a lead marketplace. A construction intelligence layer." → "Not a directory. Not an auction. Jobs found before Checkatrade lists them." (removes corporate jargon)
- [x] PricingPage: Free Scan body — specific proof ("under 3 minutes") replaces vague "before you pay"
- [x] Build: GREEN, TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-26 written
- [ ] Wire Stripe Checkout live test end-to-end with test key
- [ ] Confirm `VITE_OPEN_ACCESS=false` in Firebase hosting env before public launch
- [ ] TradeFlow "Send to TradeFlow" button on lead cards (Option A — 1 day build, pre-filled URL params — need TradeFlow URL scheme from founder)
- [ ] Tracking flow jargon: "Chase" is unfamiliar to tradespeople — consider renaming "Chase store" concept to "Pipeline" throughout (FindJobsPage "TRACK THIS LEAD" button label is fine; it's the underlying data store naming that might leak into UI)
- [ ] PricingPage: "BUYER ACTION PACK" and "PATCH WATCH" sections still use "NEW PAID FEATURE" label — doesn't specify which plan tier includes them

---

## Today - 25 May 2026

- [x] LeadDetailPage: loss reason progressive reveal — DONE (panel shows AFTER clicking LOST, not before)
- [x] FindJobsPage: scan counter new-user framing fixed — "Try up to 3 free scans" (not countdown); "Resets Monday" hidden until 1+ scans used
- [x] LeadDetailPage: WhatsApp template picker now shows timing + purpose hint for selected template
- [x] FindJobsPage: FILL MY WEEK description clarified (broader than regular scan); micro-label "QUIET WEEK? FIX IT." preserved
- [x] AdminGuardTeaserPage: ops strip — specific HMRC fear copy replaces generic quote
- [x] TradieZonePage: hero names Checkatrade; empty-leads state more specific
- [x] Build: GREEN, TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-25 written
- [ ] DashboardPage: TRACKING and RESULTS copy still vague for new users (0 leads) — add micro-copy explaining what each card is for (NEEDLE #2 from today)
- [ ] PricingPage: move "WHY NOT CHECKATRADE/BARK?" FAQ section higher, or add CTA button (not text link) to the comparison page (NEEDLE #3)
- [ ] Wire Stripe Checkout live test end-to-end with test key
- [ ] Confirm `VITE_OPEN_ACCESS=false` in Firebase hosting env before public launch
- [ ] TradeFlow "Send to TradeFlow" button on lead cards (Option A — 1 day build, pre-filled URL params — need TradeFlow URL scheme from founder)

---

## Today - 24 May 2026

- [x] DashboardPage: TRACKING boxes → orange left border, RESULTS boxes → green left border (4px inline style, both pipeline grid and detail section)
- [x] HomePage: 2 EPC naming violations fixed in hero body + proofPoints → "energy signals"
- [x] PricingPage: EPC naming fixed in included list, Patch Watch description + items; "No credit card required" added below Free Scan CTA
- [x] LeadListPage: empty state overhauled — search/tabs hidden when no leads exist; yellow SCAN CTA shown directly; tab-filter empty state gets CLEAR FILTER button
- [x] Build: GREEN, TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-24 written
- [ ] Wire Stripe Checkout live test end-to-end with test key
- [ ] Confirm `VITE_OPEN_ACCESS=false` in Firebase hosting env before public launch
- [ ] TradeFlow "Send to TradeFlow" button on lead cards (Option A — 1 day build, pre-filled URL params — need TradeFlow URL scheme from founder)
- [ ] FindJobsPage: "FILL MY WEEK" CTA — add tooltip or sub-label explaining it runs a broader scan (not a duplicate of SCAN NOW)
- [ ] LeadDetailPage: loss reason flow — consider showing loss reasons AFTER clicking LOST (progressive reveal) instead of requiring pre-selection

## Today - 23 May 2026

- [x] chaseCheck.ts: TypeScript fix — remove `leadReadiness` + `qualityLabel` from `triggerGoldLeadWhatsApp()` (not in WhatsAppPayload type)
- [x] FindJobsPage: scan counter regression fixed — `weeklyScansUsed > 0` guard removed, new users now see "3 free scans left" before first scan
- [x] WeeklySignalsPage: CTA hierarchy fixed — SCAN YOUR AREA → is now yellow (primary), GET WEEKLY ALERTS → green, SHARE → white (demoted)
- [x] SmartQuotePage: hero body names Bark/Checkatrade; CTA button "ENTER THE INTAKE" → "SCAN MY AREA FREE"; "No credit card required" added below CTAs
- [x] ProductAdvantagePage (Vicinity): names Bark/Checkatrade in body copy; "no shared auction" added to distinct copy; problem line strengthened
- [x] Build: GREEN, TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-23 written
- [x] DashboardPage: TRACKING and RESULTS boxes left border accent — DONE in 2026-05-24 session

---

## Today - 22 May 2026 (Run 2 — NightlyBuildAgent)

- [x] server/routes/leadsSearch.ts: buildReasons() stub replaced — free-tier users now see trade-specific scoring reasons (Trade match, Related, Urgent, Fresh lead, pay-worthy range, Commercial)
- [x] FindJobsPage: EPC violations from Works Starting Now commit fixed — "energy signals and property data" throughout scan mode descriptions
- [x] PostJobPage: "Planning, EPC, patch demand" → "Planning approvals, energy signals, patch demand"
- [x] DashboardPage: scan counter shows paywall limit — "of 3 free used" / "of 3 used — upgrade for unlimited"
- [x] VantagePage: DEMO PREVIEW badge on fake upload UI; hero sub-copy names "blank-page terror" + "under a minute"
- [x] VicinityPage: hero names Checkatrade subscription threat; price CTA fixed £30→£39 (GET FOUNDING 30 → LOCK MY £39/MO PATCH)
- [x] Build: GREEN, TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-22 Run 2 appended
- [ ] Wire Stripe Checkout live test end-to-end with test key
- [ ] Confirm `VITE_OPEN_ACCESS=false` in Firebase hosting env before public launch
- [ ] TradeFlow "Send to TradeFlow" button on lead cards (Option A — 1 day build, pre-filled URL params — need TradeFlow URL scheme from founder)

---

## Today - 22 May 2026 (Run 1)

- [x] EpcPage: EPC naming violations fixed — RETROFIT LEADS / ENERGY UPGRADES / RETROFIT ADS / RETROFIT ALERTS + hero copy strengthened
- [x] CityPage: EPC naming violations fixed across all 6 city pages (Birmingham, London, Manchester, Bristol, Leeds, Glasgow) — heroSub, localAngleBody, statsNote, step 02, lead card labels, coverage text, meta tags
- [x] Footer: "EPC Leads" → "Retrofit Leads" nav link
- [x] TradeElectricians: painPoints[3] + metaDescription EPC removed
- [x] CompareBuildAlertPage: "No EPC signals" → "No energy signals", EPC registers removed from trust card, timeline copy cleaned
- [x] CompareCheckatradePage: feature table, signals array, CTA list cleaned
- [x] BuildUkAlternativePage: "EPC registers" → "verified energy signals"
- [x] BlueprintPage: 8 EPC violations fixed (signal types, data source list, pipeline copy, example lead, hero body, fusion moat)
- [x] signalGenerator.ts: RSS description "EPC ratings" → "energy signals"
- [x] FindJobsPage: pre-scan buttons "TRY A DIFFERENT POSTCODE" / "WIDEN YOUR TRADE SEARCH" → "SCAN MY AREA →" / "SCAN BUILDING WORK" — correct framing for first-time users
- [x] FindJobsPage: scan counter now visible BEFORE first scan — shows "3 free scans left this week — no credit card required" + "Resets Monday" hint for brand new users
- [x] Build: GREEN, TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-22 written

---

## Today - 18 May 2026 (Run 3)

- [x] PricingPage: comparison table "Full" → "Full detail" — removes ambiguity vs "Unlimited" on Codex/Vicinity/Vantage rows
- [x] FindJobsPage: UNLOCK FULL LEAD button now has sub-text "Buyer · deadline · proof link" — names exactly what's locked
- [x] DashboardPage: RESULTS pipeline box now a Link to /leads with hover + "Review leads →" text (matches SCAN + TRACKING behaviour)
- [x] DashboardPage: YOUR SCOREBOARD section gets "Review all leads →" link
- [x] Build: GREEN, TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-18 Run 3 written

---

## Today - 18 May 2026 (Run 2)

- [x] DashboardPage: YOUR INTAKE now reads real trade/postcode/scan count from localStorage (was static "Ready to scan")
- [x] FaqPage: Remove all source naming violations — EPC register, Land Registry, Companies House, Contracts Finder, planning.data.gov.uk replaced with generic descriptions
- [x] MethodologyPage: Remove "land registry, company filings" from pipeline step 01 → "property data, business registrations"
- [x] LeadListPage: Empty state simplified — single SCAN CTA + "No credit card required", removed parallel GET MY FILTER LINK distraction
- [x] Build: GREEN, TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-18 Run 2 appended
- [ ] PricingPage: contradictory "Full" vs "Unlimited" language in comparison table needs fixing
- [ ] FindJobsPage: "UNLOCK FULL LEAD" button should explain what specifically gets unlocked (contact details, full address, action notes)

---

## Today - 21 May 2026

- [x] TradePlumbers: source naming violations fixed (EPC retrofit signals, Planning Portal, EPC registers, exclusive)
- [x] TradeRoofers: source naming violations fixed (EPC data, EPC registers, Exclusive scans, Hackney Council Planning)
- [x] TradeBuilders: source naming violations fixed (planning portals, EPC data, Exclusive, Leeds City Council Planning, meta description)
- [x] TradeHeatPumps: source naming violations fixed (EPC Retrofit in headline, EPC register, EPC F, EPC signal tag, EPC data in meta) — most violations of any page
- [x] DashboardPage: SCAN box now yellow + hard shadow to distinguish as CTA vs TRACKING/RESULTS info boxes
- [x] HomePage: Step 02 "Get GOLD alerts" → "Gold hits your WhatsApp" — names delivery channel
- [x] Build: GREEN, TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-21 written
- [ ] Wire Stripe Checkout live test end-to-end with test key
- [ ] Confirm `VITE_OPEN_ACCESS=false` in Firebase hosting env before public launch
- [ ] TradeFlow "Send to TradeFlow" button on lead cards (Option A — 1 day build, pre-filled URL params — need TradeFlow URL scheme from founder)
- [ ] DashboardPage: TRACKING and RESULTS boxes still plain white — consider adding micro-copy explaining what each represents to new users
- [ ] HomePage signalRows: source label still shows 'EPC' — check if this needs changing per naming rules
- [ ] TradeRoofers comparisonNew: "Planning data shows roofing jobs" — check if "Planning data" is a naming violation (could become "Planning approvals show...")

---

## Today - 20 May 2026

- [x] TypeScript: fix TS18004 reviewUrl undefined in outcomeReport.ts
- [x] TypeScript: fix TS2304 DEV_MODE undefined in FreeToolsPage.tsx
- [x] FindJobsPage: FILL MY WEEK now resets commercialOnly filter (matches regular scan)
- [x] FindJobsPage: tierLabel() returns GOLD/SILVER/BRONZE — matches score badge labels (was WORTH CHECKING/LOW SIGNAL)
- [x] TradeElectricians: remove all source naming violations (EPC data/register/Planning Portal)
- [x] TradeElectricians: fix "Exclusive scans" product rule violation → "No shared auction — lead goes to you, not five other sparkies"
- [x] TradePage (shared): "EPC signals" → "energy signals" in Other Trades section
- [x] TradePage (shared): "No credit card required" added under hero SCAN FREE CTA (all 5 trade pages)
- [x] Build: GREEN, TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-20 written
- [ ] Wire Stripe Checkout live test end-to-end with test key
- [ ] Confirm `VITE_OPEN_ACCESS=false` in Firebase hosting env before public launch
- [ ] TradeFlow "Send to TradeFlow" button on lead cards (Option A — 1 day build, pre-filled URL params — need TradeFlow URL scheme from founder)
- [ ] Check TradePlumbers / TradeRoofers / TradeBuilders / TradeHeatPumps for same source naming violations as TradeElectricians (EPC / Planning Portal naming)
- [ ] DashboardPage action boxes: improve visual hierarchy between SCAN / TRACKING / RESULTS
- [ ] HomePage Step 02 (WhatsApp alerts): increase visual weight to match Step 01 and Step 03

---

## Today - 19 May 2026

- [x] FindJobsPage: COMMERCIAL ONLY filter toggle — shows count, resets on new scan, filters displayedLeads
- [x] FreeToolsPage: wire email capture form to /api/waitlist (was fake setEmailDone(true))
- [x] FreeToolsPage: competitor naming in hero + "No credit card required" on all free CTAs
- [x] ForYourTradePage: fix data source naming violations (EPC Register, Contracts Finder → "Verified official signals" etc.)
- [x] ForYourTradePage: competitor naming + no-shared-auction copy in CTA section + "No credit card required"
- [x] PricingPage: separate free vs paid CTAs with visual divider; free option has explanatory copy
- [x] Build: GREEN, TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-19 written
- [ ] Wire Stripe Checkout live test end-to-end with test key
- [ ] Confirm `VITE_OPEN_ACCESS=false` in Firebase hosting env before public launch
- [ ] TradeFlow "Send to TradeFlow" button on lead cards (Option A — 1 day build, pre-filled URL params — need TradeFlow URL scheme from founder)
- [ ] Commercial lead detection UX — investigate: does FILL MY WEEK reset commercialOnly filter? (check fillMyWeek function)

---

## Today - 18 May 2026

- [x] Commercial lead detection — `detectCommercial()` in normaliser (keywords + buyer org + CPV); `isCommercial` field on Lead type; COMMERCIAL badge on FindJobsPage lead cards; scorer reason "Commercial project (+N)"
- [x] HomePage: ops strip EPC → energy upgrades; signalRows source labels genericised; competitor naming (Checkatrade/MyBuilder/Bark) added to WAR ROOM section
- [x] PricingPage: Neighbour Signal "nearby" → street-level specific; Standard plan body names Checkatrade as comparison
- [x] FindJobsPage: stats bar mobile responsive (p-3 sm:p-4, 2xl sm:4xl text, shorter labels); EPC label → ENERGY; duplicate green upgrade CTA removed, replaced with conditional navy/yellow CTA
- [x] Build: GREEN, TypeScript: CLEAN
- [x] Vault: Changelog 2026-05-18 written
- [ ] Wire Stripe Checkout live test end-to-end with test key
- [ ] Confirm `VITE_OPEN_ACCESS=false` in Firebase hosting env before public launch
- [ ] TradeFlow "Send to TradeFlow" button on lead cards (Option A — 1 day build, pre-filled URL params, no partnership needed)
- [ ] Commercial lead detection UX — add filter "COMMERCIAL ONLY" toggle on FindJobsPage results
- [ ] Investigate PR #108 merge strategy — caused regressions (fixed but worth noting)

---

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
