# Daily To-Do

## Today - 7 July 2026 (NightlyBuildAgent — Run 3)

- [x] **Container state** — fresh container, `npm install`; HEAD at `56fe6fe` (vault Run 2 update, Jul 7). Build GREEN (113 pages), TS CLEAN.
- [x] **Founder activity check** — zero new commits or open PRs since Run 2. All carryover blockers unchanged.
- [x] **Phase 1 re-confirmed** — no fake flows, no broken imports. Clean build.
- [x] **Phase 2 — all Tier 1 features confirmed BUILT**.
- [x] **Legibility sweep** — eliminated text-[10px] from 7 user-visible/interactive elements across 6 files: TradePage "No credit card required" (15+ pages, +opacity fix), TradePage "Buyer name + contact unlocked" caption, LeadDetailPage "Benchmark estimates" disclaimer, DashboardPage "Upgrade unlocks buyer details" (dark bg, +opacity fix), CityPage "No credit card required" opacity fix (20+ pages), LeadValueKit paid section labels ("Quote floor"/"Next action"/"Follow-up cadence" + step chips), LeadCard "SEND TO WHATSAPP" button + STATUS_PILLS buttons. All → text-xs.
- [x] Build GREEN, TypeScript CLEAN. Pushed to main (`58ccf56`).
- [ ] **Founder decision — add-on service pricing** (carried over many runs): 14 add-on services still have no £ shown
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path
- [ ] **Next run**: Check for new founder commits/PRs first. text-[10px] sweep largely complete — remaining instances are intentional compact status badges (LeadCard "NO SHARED AUCTION" chip, HomePage "Open now" chips). Consider WeeklySignalsPage subscription modal copy review (trade list was expanded but intro copy not swept since early July).

## Today - 7 July 2026 (NightlyBuildAgent — Run 2)

- [x] **Container state** — fresh container, `npm install`; HEAD at `7802c5f` (vault auto-digest Jul 7 10:37 UTC). Build GREEN (113 pages), TS CLEAN.
- [x] **Founder activity check** — zero new commits or open PRs since Run 1. All carryover blockers unchanged.
- [x] **Phase 1 re-confirmed** — no fake flows, no broken imports. Clean build.
- [x] **Phase 2 — all Tier 1 features confirmed BUILT**.
- [x] **"SEE PRICING" fully swept** — zero instances remain in the codebase. Footer (every page), CityPage template (20+ city pages), TradePage template (15+ trade pages), SmartQuotePage, BuildUkAlternativePage (2 instances). All → "LOCK YOUR PATCH — £39/MO →" or trade-specific equivalent.
- [x] **KeywordSearch green button fixed** — "TRACK THIS LEAD" was `bg-[var(--green)]` (design violation). Changed to `bg-[var(--yellow)] text-[var(--ink)]`.
- [x] **DashboardPage empty-state CTA hierarchy fixed** — "RUN YOUR FIRST SCAN" was ink (wrong); "LOCK YOUR PATCH" was yellow (wrong). Swapped: scan → yellow (primary), lock patch → navy (secondary). "SEE PRICING" → "SEE PLANS →".
- [x] Build GREEN, TypeScript CLEAN. Pushed to main (`cdb51db`).
- [ ] **Founder decision — add-on service pricing** (carried over many runs): 14 add-on services still have no £ shown
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path
- [ ] **Next run**: Check for new founder commits/PRs first. "SEE PRICING" is COMPLETELY SWEPT — do not re-check. Consider authenticated page copy sweep (LeadDetailPage, AccountPage) for any drift.

## Today - 7 July 2026 (NightlyBuildAgent — Run 1)

- [x] **Container state** — fresh container, `npm install`; HEAD synced to `origin/main` at `9ea0b17` (Jul 6 Run 3). Build GREEN (113 pages), TS CLEAN.
- [x] **Founder activity check** — zero new commits or open PRs since Jul 6 Run 3. All carryover blockers unchanged.
- [x] **Phase 1 re-confirmed** — no fake flows, no broken imports. Clean build.
- [x] **Phase 2 — all Tier 1 features confirmed BUILT**.
- [x] **AlertQuickSetup raw trade label fixed** (FindJobsPage) — success text and body showed raw engine value "electrical". Added `TRADE_FRIENDLY` map; now shows "Electrician", "Plumber / Gas", etc. Closes Jul 6 Run 3 carryover.
- [x] **AdminGuardPage paywall CTA** — primary yellow `SEE PRICING →` → `LOCK YOUR PATCH — £39/MO →`. High-intent authenticated page now has deliverable CTA.
- [x] **AdminGuardTeaserPage closing CTA** — `SEE PRICING →` → `LOCK YOUR PATCH — £39/MO →`. Matches all other landing pages.
- [x] **CompareBuildAlertPage CTA inversion fixed** — free scan was ink (secondary), pricing was yellow (primary). Swapped + `SEE PRICING` → `LOCK YOUR PATCH — £39/MO →`.
- [x] **CompareCheckatradePage CTA inversion fixed** — same inversion in comparison table section. Swapped + label updated.
- [x] **ForYourTradePage** — `text-[10px]/50` on "No credit card required" → `text-xs/60`; `SEE PRICING — FROM £39/MO` → `LOCK YOUR PATCH — £39/MO →`.
- [x] **FreeToolsPage** — two `text-[10px]` "No credit card required" instances → `text-xs`. Both below the free scan CTA.
- [x] Build GREEN, TypeScript CLEAN. Pushed to main (`156d0f0`).
- [ ] **Founder decision — add-on service pricing** (carried over many runs): 14 add-on services still have no £ shown
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path
- [ ] **Next run**: Check for new founder commits/PRs first. Remaining `SEE PRICING` (SmartQuotePage secondary, BuildUkAlternativePage STANDARD tier card) are low priority. CTA inversions now fully swept across compare pages. Carryover blockers remain the main unlock.

## Today - 6 July 2026 (NightlyBuildAgent — Run 3)

- [x] **Container state** — fresh container, `npm install`; stale `origin/main` (cached at June 28); `git fetch origin` corrected it to 1013953 (PR #329, Jul 6). Build GREEN (113 pages), TS CLEAN.
- [x] **Founder activity check** — PR #329 "Agents/jobfilter launch ready" landed since Run 2. No-op tree (identical to PR #328). No new commits after #329. All carryover blockers unchanged.
- [x] **Phase 1 re-confirmed** — no fake flows, no broken imports. Clean build.
- [x] **Phase 2 — all Tier 1 features confirmed BUILT**.
- [x] **WHY? panel labels fixed** (FindJobsPage) — WHY? toggle (added in PR #329) was rendering raw engine strings. Swapped for `parsedReasons`: "EV CHARGER — YOUR TRADE", "JUST POSTED" etc. Trade matches highlight in ink.
- [x] **Active alerts chip labels fixed** (DashboardPage) — chips showed "electrical · B14 · weekly". Now show "Electrician · B14 · Weekly" via TRADES lookup. Closes the known carryover from Run 2.
- [x] **TipsPage bottom CTA** — "SEE PRICING" → "LOCK YOUR PATCH — £39/MO →" + ROI anchor. Matches pattern from FAQ/TrustCenter/WeeklySignals/Blueprint/News.
- [x] Build GREEN, TypeScript CLEAN. Pushed to main (`cedd665`).
- [ ] **Founder decision — add-on service pricing** (carried over many runs): 14 add-on services still have no £ shown
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path
- [ ] **Next run**: Check for new founder commits/PRs first. Guarantee sweep COMPLETE — do not re-check. Active alerts chip fix is in — no longer a carryover. Buildable backlog genuinely small; carryover blockers (Stripe, TradeFlow, add-on pricing) remain the main unlock. Consider reviewing `AlertQuickSetup` trade display (shows "electrical" in success text) as a minor follow-up.

## Today - 6 July 2026 (NightlyBuildAgent — Run 2)

- [x] **Container state** — fresh container, `npm install`; HEAD rebased over origin/main (PR #326, Jul 6 founder sprint). Build GREEN (113 pages), TS CLEAN.
- [x] **Founder activity check** — 13 PRs/commits merged today (#314–#326) before this run. All reviewed: sound, no regressions. Carryover blockers unchanged.
- [x] **Phase 1 re-confirmed** — no fake flows, no broken imports. Clean build.
- [x] **Phase 2 — all Tier 1 features confirmed BUILT**.
- [x] **Guarantee legibility sweep COMPLETE** — all 14 instances of `text-[10px] text-[var(--ink)]/60` guarantee text fixed across 11 files. PR #324 fixed SignalsPage; this run fixed the remaining 13 instances. Full-section guarantees → `text-sm / 80%`; compact paywall cards → `text-xs / 80%`. "No quibbles." appended to full versions.
- [x] **AlertSetupWidget friendly trade labels** — TRADES array changed from raw engine categories (ELECTRICAL, PLUMBING, HVAC) to `{value, label}` pairs. Dropdown now shows: Electrician, Plumber / Gas, Roofer, Builder / General, Carpenter / Joiner, Decorator / Painter, Heating Engineer, Landscaper. API value unchanged.
- [x] Build GREEN, TypeScript CLEAN. Pushed to main (`62380e3`).
- [ ] **Founder decision — add-on service pricing** (carried over many runs): 14 add-on services still have no £ shown
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path
- [ ] **Next run**: Check for new founder commits/PRs first (founder very active today). AlertSetupWidget ACTIVE ALERTS chips still show raw API trade value (e.g. "electrical · B14 · weekly") — minor, backend change needed. Guarantee sweep is COMPLETE — do not re-check. Carryover blockers remain the main unlock.

## Today - 6 July 2026 (NightlyBuildAgent — Run 1)

- [x] **Container state** — fresh container, `npm install`; HEAD synced to origin/main (`b9cb04a`, Jul 5 Run 3). Build GREEN (113 pages), TS CLEAN.
- [x] **Founder activity check** — zero new commits or PRs since Jul 5 Run 3. All carryover blockers unchanged.
- [x] **Phase 1 re-confirmed** — no fake flows, no broken imports. Clean build.
- [x] **Phase 2 — all Tier 1 features confirmed BUILT**.
- [x] **ActivationPendingPage TRADES expanded 11 → 19** — Closed last run's recommendation. Now matches SignupPage exactly (same 19 trades, same engine category mappings, alphabetical order).
- [x] **TrustCenterPage GOLD card color fixed** — `bg-[var(--green)]` → `bg-[var(--ink)] text-[var(--yellow)]`. Green is a data indicator token; GOLD tier card now reads as premium (ink+yellow).
- [x] **TerritoriesPage SLA added** — success message now says "within 24 hours" (was vague "we'll reply"). Closes Jun 16 carryover.
- [x] **AdminGuardTeaserPage design token fixes** — shadow drift fixed again (`3px_yellow` → `4px_line`); "YOUR DASHBOARD →" secondary button changed to navy for clear primary/secondary distinction.
- [x] Build GREEN, TypeScript CLEAN. Pushed to main (`3469ab3`).
- [ ] **Founder decision — add-on service pricing** (carried over many runs): 14 add-on services still have no £ shown
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path
- [ ] **AdminGuardTeaserPage shadow drift** — recurring (fixed Jul 2 Run 2, reverted, fixed again today). Watch for it in next run.
- [ ] **Next run**: Check for new founder commits/PRs first. AlertSetupWidget trade display labels (raw ELECTRICAL/PLUMBING) could be improved to friendly labels — low priority. Carryover blockers remain the main unlock.

## Today - 5 July 2026 (NightlyBuildAgent — Run 3)

- [x] **Container state** — fresh container, `npm install`; HEAD synced to origin/main (Run 2, `a50e042`). Build GREEN (113 pages), TS CLEAN.
- [x] **Founder activity check** — zero new commits or PRs since Run 2. All carryover blockers unchanged.
- [x] **Phase 1 re-confirmed** — no fake flows, no broken imports. Clean build.
- [x] **Phase 2 — all Tier 1 features confirmed BUILT**.
- [x] **All 5 compare page bottom CTAs rewritten** — fear→proof→control applied to CompareMyBuilder, CompareCheckatrade, CompareBuildAlert, CompareRatedPeople, CompareTrustATrader. Each headline now names the specific competitor pain (credits/auction, profile lock-in, per-letter fees, race-to-bottom, passive inbound). Each sub-copy names signal types, cites 3–5 day timing advantage, anchors to £39/mo flat.
- [x] **SignupPage TRADES list expanded 11 → 19** — Added CCTV/security installer, Data cabling, Fire safety engineer, Groundworker, Quantity surveyor, Scaffolder, Solar PV installer, Structural engineer. All mapped to existing engine score categories. Sorted alphabetically.
- [x] Build GREEN, TypeScript CLEAN. Pushed to main (`7a0322e`).
- [ ] **Founder decision — add-on service pricing** (carried over many runs): 14 add-on services still have no £ shown
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path
- [ ] **Next run**: Check for new founder commits/PRs first. ActivationPendingPage and AlertSetupWidget trade selects may still have the old 11-trade limitation — check and expand if so. Carryover blockers remain the main unlock.

## Today - 5 July 2026 (NightlyBuildAgent — Run 2)

- [x] **Container state** — npm install already complete from Run 1; HEAD rebased over vault auto-digest. Build GREEN (113 pages), TS CLEAN.
- [x] **Founder activity check** — zero new commits or PRs since Run 1 today. All carryover blockers unchanged.
- [x] **Phase 1 re-confirmed** — no fake flows, no broken imports. Clean build.
- [x] **Phase 2 — all Tier 1 features confirmed BUILT**.
- [x] **WeeklySignalsPage subscription modal trade list expanded** — 8 → 20 trades (alphabetical). Added: CCTV/Security, Data Cabling, Decorating, EV Charger, Fire Safety, Gas Engineer, Groundworks, Heat Pumps, Quantity Surveyor, Scaffolding, Solar PV, Structural Engineer.
- [x] **FindJobsPage postcode placeholder clarified** — `placeholder="B14 7QH"` → `placeholder="e.g. B14 7QH"`. Clearly an example, not a default.
- [x] **SignupPage hero copy fixed** — removed confusing "then add your trade, area, and WhatsApp number" (those fields are already on the form). Replaced with clear sequential flow.
- [x] **SignupPage post-signup CTA regression fixed** — "BACK TO PRICING" (→/pricing) had regressed; restored to "BROWSE LIVE LEADS →" (→/find-jobs). User just committed — forward action keeps them engaged.
- [x] **CompareBarkPage bottom CTA rewritten** — "scanning smarter" → fear/proof/control: names Bark/MyBuilder/Checkatrade explicitly, cites 3–5 day timing advantage, anchors to £39/month flat.
- [x] Build GREEN, TypeScript CLEAN. Pushed to main (`58ed975`).
- [ ] **Founder decision — add-on service pricing** (carried over many runs): 14 add-on services still have no £ shown
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path
- [ ] **Next run**: Check for new founder commits/PRs first. SignupPage TRADES list has 11 options vs 20 trades on site (Solar PV, Fire Safety, Structural Engineer etc. missing) — multi-file change needed (lead engine score categories). CompareMyBuilder/CompareCheckatrade/CompareBuildAlert bottom CTAs may benefit from same fear→proof→control rewrite as CompareBarkPage today.

## Today - 5 July 2026 (NightlyBuildAgent — Run 1)

- [x] **Container state** — fresh container, `npm install`; HEAD synced to origin/main (Run 3 Jul 4, 107561e). Build GREEN (113 pages), TS CLEAN.
- [x] **Founder activity check** — zero new commits or PRs since Run 3 July 4. All carryover blockers unchanged.
- [x] **Phase 1 re-confirmed** — no fake flows, no broken imports. Clean build.
- [x] **Phase 2 — all Tier 1 features confirmed BUILT**.
- [x] **FindJobsPage scan counter bug fixed** — `recordWeeklyScan()` was called before API fetch; network errors burned a free scan. Moved to success branch only.
- [x] **FindJobsPage B14 default removed** — hardcoded Birmingham default replaced with `''`; trade preset buttons disabled until postcode entered.
- [x] **TradieZonePage green nav cards fixed** — Vicinity icon and My Territory quick-action card changed from `bg-[var(--green)]` to `bg-[var(--ink)]`. Won-stage badge unchanged (correct data indicator).
- [x] **WeeklySignalsPage section 7 CTA contrast fixed** — "RUN MY FREE SCAN →" on yellow background changed from yellow (invisible fill) to ink (high contrast). Previous run introduced the error.
- [x] **PricingPage hero secondary CTA** — "CHECK MY PATCH FIRST" (→/territories) → "SCAN FREE FIRST →" (→/find-jobs). Hesitant visitors now have an immediately visible no-card entry path.
- [x] **AccountPage free tier copy** — made specific: names what's locked, anchors against Checkatrade pricing.
- [x] Build GREEN, TypeScript CLEAN. Pushed to main (`231231a`).
- [ ] **Founder decision — add-on service pricing** (carried over many runs): 14 add-on services still have no £ shown
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path
- [ ] **Next run**: Check for new founder commits/PRs first. WeeklySignalsPage subscription modal trade list only has 8 trades (site covers 18) — easy expansion. FindJobsPage postcode placeholder still says `B14 7QH` (visual hint only, not the default value — minor).

## Today - 4 July 2026 (NightlyBuildAgent — Run 3)

- [x] **Container state** — fresh container, `npm install`; HEAD synced to origin/main (Run 2, 96644d5). Build GREEN (113 pages), TS CLEAN.
- [x] **Founder activity check** — zero new commits or PRs since Run 2. All carryover blockers unchanged.
- [x] **Phase 1 re-confirmed** — no fake flows, no broken imports. Clean build.
- [x] **Phase 2 — all Tier 1 features confirmed BUILT**.
- [x] **WeeklySignalsPage bottom CTA** — "RUN MY FREE SCAN →" was `bg-[var(--ink)]` (wrong). Changed to `bg-[var(--yellow)]`. Primary scan action now consistent between hero and bottom CTA.
- [x] **Auth pages — colorless submit buttons fixed** — LoginPage "SIGN IN", ForgotPasswordPage "SEND RESET LINK", ResetPasswordPage "SET PASSWORD" all had `jf-button w-full` with no background (transparent on white). Changed all to `bg-[var(--yellow)] text-[var(--ink)]`. ForgotPasswordPage "BACK TO SIGN IN" → `bg-[var(--navy)]` (secondary). Colorless `jf-button` class now fully closed.
- [x] **SmartQuotePage paywall CTA** — "UNLOCK FULL STARTER — FROM £39/mo" was colorless. Changed to yellow. Commercial upgrade trigger now visible.
- [x] **TrustCenterPage contact** — removed duplicate "Response time: Within 4 hours, Monday to Friday" (already stated in the email card).
- [x] **FaqPage trades list** — expanded to include structural engineers, CCTV/security installers, and quantity surveyors. Now matches 18-trade ForYourTradePage coverage.
- [x] Build GREEN, TypeScript CLEAN. Pushed to main (`2c02615`).
- [ ] **Founder decision — add-on service pricing** (carried over many runs): 14 add-on services still have no £ shown
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path
- [ ] **Next run**: Check for new founder commits/PRs first. TradieZonePage "My Territory" quick-action card uses `bg-[var(--green)]` as card background (minor). Carryover blockers remain the main unlock.

## Today - 4 July 2026 (NightlyBuildAgent — Run 2)

- [x] **Container state** — fresh container, `npm install`; HEAD synced to origin/main (PR #292 had landed since Run 1). Build GREEN (113 pages), TS CLEAN.
- [x] **Founder activity check** — PR #292 "[4-agent] fix mobile nav pricing gap + desktop claim-patch visibility + signals hero" merged between Run 1 and Run 2. TopNav + SignalsPage. Both verified sound, no regressions.
- [x] **Phase 1 re-confirmed** — no fake flows, no broken imports. Clean build.
- [x] **Phase 2 — all Tier 1 features confirmed BUILT**.
- [x] **DashboardPage green buttons fixed** — "SEND NUDGE →" (line 416) and "SEND ON WHATSAPP →" (line 471) both `bg-[var(--green)]`. Closed the Run 1 next-run recommendation. Changed to `bg-[var(--yellow)]`.
- [x] **LeadListPage:308 green button fixed** — "OPEN WHATSAPP CHAT" `bg-[var(--green)]`. Changed to `bg-[var(--yellow)]`. Green button violation class now fully closed across the codebase.
- [x] **TrustCenterPage CTA inversion fixed** — SEE PRICING was yellow/primary, SCAN MY AREA FREE was navy/secondary. Swapped: scan free → yellow (primary), see pricing → navy (secondary). Trust copy retained.
- [x] Build GREEN, TypeScript CLEAN. Pushed to main (`d7409c2`).
- [ ] **Founder decision — add-on service pricing** (carried over many runs): 14 add-on services still have no £ shown
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path
- [ ] **Next run**: Check for new founder commits/PRs first. Green button violation class fully closed. Copy sweep due on TrustCenterPage body, WeeklySignalsPage, and FaqPage (fear→proof→control). Carryover blockers remain the main unlock.

## Today - 4 July 2026 (NightlyBuildAgent — Run 1)

- [x] **Container state** — fresh container, `npm install`; detached HEAD resolved by `git checkout -B main 43ebe7c` after commit. Build GREEN (113 pages), TS CLEAN.
- [x] **Founder activity check** — zero new commits or PRs since Run 3 July 3 (26eed2d). All carryover blockers unchanged.
- [x] **Phase 1 re-confirmed** — no fake flows, no broken imports. Clean build.
- [x] **Phase 2 — all Tier 1 features confirmed BUILT**.
- [x] **ForYourTradePage Solar PV** — last remaining vague competitor ref fixed: "any installer on MyBuilder" → "Bark or MyBuilder". All 18 trades now fully name two competitors. Closes Run 3 July 3 recommendation.
- [x] **FindJobsPage SCAN NOW button** — primary form-submit was `bg-[var(--navy)]` (secondary color). Changed to `bg-[var(--yellow)]`. Biggest single-run UX fix in weeks — every new user hits this button.
- [x] **PricingPage LOCK FOUNDER PRICE** — featured Founder plan checkout CTA was `bg-[var(--ink)]` (black). Changed to `bg-[var(--yellow)]`. The most important conversion button on the site now reads as a primary action.
- [x] **FindJobsPage SEND TO WHATSAPP (Gold leads)** — was `bg-[var(--green)]`, violating the no-green-on-buttons rule. Changed to `bg-[var(--yellow)]` (primary action on the highest-value cards).
- [x] Build GREEN, TypeScript CLEAN. Pushed to main (`43ebe7c`).
- [ ] **Founder decision — add-on service pricing** (carried over many runs): 14 add-on services still have no £ shown
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path
- [ ] **Next run**: Check for new founder commits/PRs first. DashboardPage lines 416+471 and LeadListPage line 308 still have `bg-[var(--green)]` WhatsApp buttons — same violation class, lower-traffic authenticated pages, can fix next run.

## Today - 3 July 2026 (NightlyBuildAgent — Run 3)

- [x] **Container state** — fresh container, `npm install`; detached HEAD resolved by `git checkout -B main 481d7a6` after commit. Build GREEN (113 pages), TS CLEAN.
- [x] **Founder activity check** — zero new commits or PRs since Run 2 (12:48 UTC today).
- [x] **Phase 1 re-confirmed** — no fake flows, no broken imports. Clean build.
- [x] **Phase 2 — all Tier 1 features confirmed BUILT**.
- [x] **ForYourTradePage final competitor naming** — last 2 vague references fixed: Decorating "any job board" → "Bark or MyBuilder"; Data Cabling "any trade directory" → "Checkatrade or MyBuilder". All 18 trades now name specific competitors. Closes Run 2's next-run recommendation.
- [x] **WeeklySignalsPage off-system green CTAs fixed** — "GET WEEKLY ALERTS" + "GET WEEKLY EMAILS" both used `bg-[var(--green)]` which violates the design system (green is for data indicators, not CTAs). Changed to `bg-[var(--navy)]`. Visual hierarchy restored.
- [x] **AccountPage upgrade CTA price-anchored** — free-tier users saw "UPGRADE PLAN →" with no price. Changed to "UPGRADE TO FOUNDER — £39/MO →" + trust copy "30-day money-back guarantee. Cancel any time." Highest-intent moment on the site now has the strongest CTA.
- [x] Build GREEN, TypeScript CLEAN. Pushed to main (`481d7a6`).
- [ ] **Founder decision — add-on service pricing** (carried over many runs): 14 add-on services still have no £ shown
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path
- [ ] **Next run**: Check for new founder commits/PRs first. Solar PV on ForYourTradePage still says "any installer on MyBuilder" (only one competitor named, minor). Buildable backlog genuinely small — carryover blockers are the main unlock.

## Today - 3 July 2026 (NightlyBuildAgent — Run 2)

- [x] **Container state** — detached HEAD resolved by `git checkout main && git merge --ff-only`. Build GREEN (113 pages), TS CLEAN.
- [x] **Founder activity check** — PR #291 merged since Run 1 (10:48 UTC today): free tools CTAs fixed (QuoteFloor, ProfitCheck, TravelCost, TyreKicker all now route to /find-jobs). Verified in FreeToolsPage.tsx. No regressions. No open PRs.
- [x] **Phase 1 re-confirmed** — no fake flows, no broken imports. Clean build.
- [x] **Phase 2 — all Tier 1 features confirmed BUILT**.
- [x] **ForYourTradePage copy** — 2 "lead platform" instances replaced with named competitors: HVAC → "before Checkatrade or MyBuilder lists them"; Heat Pumps → "before Bark or Checkatrade lists them". Matches style of all other trades in the array.
- [x] **SignupPage NEEDLE fix** — post-signup CTA "BACK TO PRICING" replaced with "BROWSE LIVE LEADS →" → `/find-jobs`. Backwards UX (user just committed, sending them to pricing = regret signal). Forward action keeps them engaged while waiting for email.
- [x] **LeadListPage WHY? badges** (from Run 1 recommendation) — confirmed NOT a problem. Badges use `px-2 py-1 text-xs` with flex wrap, no fixed-width constraint unlike the FindJobsPage panel. Rolling recommendation resolved.
- [x] **FILL MY WEEK position** — rolling todo "move below scan results" confirmed RESOLVED. Section is at line 779, scan results at line 626 — already in correct order.
- [x] **DashboardPage territory duplication** — rolling todo reviewed. Both instances serve distinct purposes (empty-state CTA + quick-actions sidebar). Top section already has explanation copy. NOT a bug — marking resolved.
- [x] Build GREEN, TypeScript CLEAN. Pushed to main (`d6e7746`).
- [ ] **Founder decision — add-on service pricing** (carried over many runs): 14 add-on services still have no £ shown
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path
- [ ] **Next run**: ForYourTradePage lines 18 + 21 still say "any job board" without naming competitors — low priority but consistent with copy rule. Check for new founder commits first.

## Today - 3 July 2026 (NightlyBuildAgent — Run 1)

- [x] **Container state** — fresh container, `npm install` (359 packages); stale local `origin/main` cached at June 28; `git fetch origin main` corrected it to July 2 head (`7407b8d`); build GREEN (113 pages), TS CLEAN before and after changes.
- [x] **Founder activity check** — zero new commits or PRs since July 2 Run 3. All carryover blockers unchanged.
- [x] **Phase 1 re-confirmed** — all `setDone`/`setSubmitted`/`setSent`/`setEmailDone` forms wired to real backend calls. No broken imports. Clean build.
- [x] **Phase 2 — all Tier 1 features confirmed BUILT** (agent prompt list remains stale).
- [x] **AlertSetupWidget confirmed correct** — label "Your area" (not "Postcode outward"), error message surfaces API error directly (not generic fallback). Both prior-run fixes verified in code.
- [x] **FindJobsPage WHY? panel widened** — `w-24 text-[8px]` → `w-36 text-[9px]`. Score reasons now readable on mobile (was recommended by Run 3, July 2).
- [x] **BuildUkAlternativePage CTA color inversion fixed** — comparison section had yellow on "SEE PRICING" (secondary) and ink on "SCAN FREE" (primary). Swapped to match design rule: yellow = primary (scan free), ink = secondary (pricing).
- [x] Build GREEN, TypeScript CLEAN. Pushed to main (`c2221f2`).
- [ ] **Founder decision — add-on service pricing** (carried over many runs): 14 add-on services still have no £ shown
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path
- [ ] **Next run recommendation**: Check for new founder commits/PRs first. WHY? panel in LeadListPage:285 uses `tradeHighlights()` badges — check if those also need more width. AlertSetupWidget error message smoke test still needs live env to verify.

## Today - 2 July 2026 (NightlyBuildAgent — Run 3)

- [x] **Container state** — fresh container, `npm install` (359 packages); HEAD at `9df93b1` (== `origin/main`); build GREEN (113 pages), TS CLEAN before and after changes.
- [x] **Founder activity check** — zero new app-code commits or open PRs. PR #290 diff re-verified as TopNav-only (1 line); 5 features in PR description were pre-existing. All carryover blockers unchanged.
- [x] **Phase 1 re-confirmed** — all form handlers wired to real backend calls. PostJobPage spot-checked. No fake flows. No broken imports.
- [x] **Phase 2 — all Tier 1 features confirmed BUILT** (same as every recent run).
- [x] **AlertSetupWidget — "Postcode outward" jargon fixed** → "Your area". Matches SignupPage / ActivationPendingPage label style. No tradesman knows what "outward" means.
- [x] **AlertSetupWidget — generic error message improved** — API error now surfaced directly (e.g. "daily alerts require a paid subscription"). Free users selecting DAILY/INSTANT now get a clear upsell prompt, not a misleading login error.
- [x] **NEEDLE sweep** — design-token (rounded, red) drift scan across all pages: zero violations found. Jargon sweep: zero violations. FaqPage, AccountPage, ActivationPendingPage, PostJobPage all confirmed clean.
- [x] Build GREEN, TypeScript CLEAN. Pushed to main (`fa0d916`).
- [ ] **Founder decision — add-on service pricing** (carried over many runs): 14 add-on services still have no £ shown; founder decision on free-perk-vs-paid-addon still pending
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path
- [ ] **Next run recommendation**: Buildable backlog is genuinely small. AlertSetupWidget was the last clear single-run fix. Next run should: (a) check for new founder commits/PRs first; (b) verify the AlertSetupWidget error message renders correctly on staging once DAILY/INSTANT is selected and submitted as a free user; (c) consider if the WHY? score-reasons panel (text-[8px] at w-24) is too small on mobile — could widen to w-36 with slightly larger font without breaking brutalist style.

## Today - 2 July 2026 (NightlyBuildAgent — Run 2)

- [x] **Container state** — fresh container, `npm install`; HEAD fixed from detached state (stale local origin/main); reset to origin/main post-fetch; build GREEN (113 pages), TS CLEAN before and after changes.
- [x] **Founder activity check** — PR #289 (false CTAs, nav jargon, hero data) and PR #290 (launch-ready: nav tagline tweak) both landed. Both reviewed — sound, no regressions introduced.
- [x] **Phase 1 re-confirmed** — all `setDone`/`setSubmitted` sites wired to real fetch() calls. No broken imports. Clean Next build.
- [x] **Phase 2 — all Tier 1 features confirmed BUILT** (same as prior runs).
- [x] **AdminGuardTeaserPage — shadow token drift fixed** — `shadow-[3px_3px_0_var(--yellow)]` → `shadow-[4px_4px_0_var(--line)]` on feature cards. Design system standard restored.
- [x] **AdminGuardPage — trust-breaking disclosure fixed** — "Email reminders are being connected. Download calendar reminders for now." rewritten to lead with what works: "Calendar reminders ready — see the Deadlines tab to download. Email delivery coming soon for all paid members."
- [x] Build GREEN, TypeScript CLEAN. Rebased over PR #290. Pushed to main (`b67f21b`).
- [ ] **Founder decision — add-on service pricing** (carried over many runs): 14 add-on services still have no £ shown; founder decision on free-perk-vs-paid-addon still pending
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path
- [ ] **Next run recommendation**: Check for new founder commits/PRs first. PR #290 description claims "5 features + security hardening" — worth verifying what actually landed vs was already in tree. Buildable backlog remains small; the two AdminGuard fixes tonight exhausted remaining design-system drift on those pages.

## Today - 2 July 2026 (NightlyBuildAgent)

- [x] **Container state** — fresh container, `npm install` (359 packages); HEAD at `b259d2c` (== `origin/main`); no new founder commits or open PRs since 1 July; build GREEN (113 pages), TS CLEAN before changes.
- [x] **Founder activity check** — zero new app-code commits or open PRs. All carryover blockers unchanged.
- [x] **Phase 1 re-confirmed** — all fake-flow sites wired; no broken imports. Clean Next build.
- [x] **Phase 2 — all Tier 1 features confirmed BUILT** (same as every recent run — agent prompt list remains stale).
- [x] **DashboardPage bug fixed** — paid users (isPaid === true) no longer see "X of 3 used · resets Mon" or "Scan limit reached — Upgrade for unlimited →". Both scan cap messages now gated on `!isPaid`.
- [x] **AdminGuardTeaserPage copy** — fixed verbatim duplicate sentence across two adjacent paragraphs in "THE BIGGER PICTURE" section.
- [x] **LeadListPage competing CTAs** — demoted "VIEW FULL DETAILS →" from `flex-1` to `shrink-0` + shortened label to "VIEW →". WhatsApp action now visually dominant.
- [x] **PricingPage duplicate ROI stat** — removed duplicate "Average UK trade job: £800–£3,000" from "WHAT ONE MONTH LOOKS LIKE" section (hero already has it).
- [x] Build GREEN, TypeScript CLEAN. Pushed to main (`7926542`).
- [ ] **Founder decision — add-on service pricing** (carried over many runs): 14 add-on services still have no £ shown; founder decision on free-perk-vs-paid-addon still pending
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path
- [ ] **Next run recommendation**: check for new founder commits/PRs first. Buildable backlog is small — consider doing a sweep of authenticated pages (AccountPage, AdminGuardPage) for any remaining design token drift. The `isPaid` detection via `/api/leads/roi-stats` is a proxy check — worth verifying it correctly identifies Stripe-paid users in staging once Stripe keys are available.

## Today - 1 July 2026 (NightlyBuildAgent)

- [x] **Container state** — fresh container, `npm install` (359 packages); HEAD at `347b636` (== `origin/main`); only vault auto-digests and founder docs since last app-code change (21 June, PR #287); build GREEN (113 pages), TS CLEAN before changes.
- [x] **Founder activity check** — no app-code commits since 21 June. Docs-only activity 24 June (AI free router SaaS prompt, Fire Door App playbook, competitor playbook). No carryover blocker unblocked.
- [x] **Phase 1 re-confirmed** — all fake-flow sites wired to real calls; no broken imports. Clean Next build.
- [x] **Phase 2 — Tier 1 features all BUILT** — agent prompt's "unbuilt" list is stale; scan counter, calendar ICS, WinStatsBanner, WhatsApp templates (including quick_quote_offer + availability_check), and trade-specific scoring all live in code.
- [x] **LeadListPage copy fix** — removed duplicate GOLD/SILVER/BRONZE explanation from header (same text was verbatim in the HOW IT'S SCORED box immediately below). Replaced with source differentiation copy naming Checkatrade/Bark.
- [x] **ActivationPendingPage UX fix** — pre-filled trade/postcode/company from Supabase signup metadata so tradesmen don't re-enter the same fields they already gave on SignupPage. WhatsApp still manual (not collected at signup).
- [x] Build GREEN, TypeScript CLEAN. Pushed to main (`04d17dd`).
- [ ] **Founder decision — add-on service pricing** (carried over many runs): 14 add-on services still have no £ shown; founder decision on free-perk-vs-paid-addon still pending
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path
- [ ] **Next run recommendation**: check for any new founder commits/PRs before generic sweeps. Agent prompt's Tier 1 unbuilt list is stale — all features are built. The ActivationPendingPage pre-fill relies on Supabase user_metadata being populated correctly at signup — worth a founder smoke-test on staging to verify.

## Today - 21 June 2026 (NightlyBuildAgent — Run 2)

- [x] **Container state** — fresh container, `npm install` (359 packages); HEAD detached at `78ba81f` (== `origin/main`); one new founder merge since Run 1 today; build GREEN, TS CLEAN before changes.
- [x] **Reviewed founder's PR #287** ("Cross-link the 14 add-on service pages and surface them on Pricing") — sound, no fabricated prices, makes real progress on the add-on-pricing carryover by making the quote model honest/visible. No fix needed.
- [x] **Corrected a repeated prior-run mistake** — `vite.config.ts`/`index.html` were flagged across 2+ runs as "orphaned, safe to delete eventually." Verified directly: they are NOT orphaned — `server/app.ts` (standalone Express backend used for local API dev/testing, imported by both `server.ts` and `api/index.ts`) depends on them via Vite dev middleware / static fallback. Did not delete. Flagging so no future run acts on the old (wrong) assumption.
- [x] **Phase 1 re-confirmed** — 6 `setSubmitted`/`setSent`/`setEmailDone`/`setDone` sites (added `FindJobsPage.tsx` `OutcomeActions` to the known list) all wired to real `fetch()` calls; no fake flows; no broken imports (clean Next build).
- [x] Ran all `codex-output/*.mjs` regressions — same known false-negative class as every prior run (live-server/network-dependent); all others pass.
- [x] Build GREEN, TypeScript CLEAN. No app code changes — vault-doc-only commit.
- [ ] **Founder decision — add-on service pricing** (carried over, now partially addressed by PR #287): still no actual £ shown for the 14 add-on services; founder still needs to decide free-perk-of-£39/mo vs paid-per-job-quote (copy now correctly implies "quoted per job", but no range given yet)
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Do NOT re-flag `vite.config.ts`/`index.html` for deletion** — confirmed in use by `server/app.ts`'s local Express dev path (see tonight's correction above)

## Today - 21 June 2026 (NightlyBuildAgent)

- [x] **Container state** — fresh container, `npm install` (359 packages, missing entirely); HEAD detached exactly at `origin/main` (`d522e4c`), no divergence; build GREEN (118 pages), TS CLEAN before changes.
- [x] **Founder activity check (per Run 3's recommendation)** — zero new commits/PRs since last run via `git log` + GitHub `list_commits`/`list_pull_requests`; no carryover blocker unblocked (no Stripe/Resend/SMTP env vars present in this container either, same as every prior run).
- [x] **Phase 1 re-confirmed** — all 5 `setSubmitted`/`setSent`/`setEmailDone`/`setDone` forms individually read and wired to real `fetch()`/Supabase calls; no fake flows. No broken imports (Next build clean across all 118 routes).
- [x] Ran all 17 `codex-output/*.mjs` regressions — same known false-negative class as every prior run (live-server/network-dependent); all others pass.
- [x] **New observation, not actioned** — `vite.config.ts`/`index.html` are orphaned leftovers from the pre-Next.js (PR #275) setup, unreferenced by any script; `CLAUDE.md`/task brief stack description ("Vite frontend") is stale — actual stack is Next.js per `vercel.json`. Flagged for a founder/doc cleanup pass, not urgent.
- [x] Build GREEN, TypeScript CLEAN. No app code changes — vault-doc-only commit (6th+ consecutive run confirming backlog genuinely exhausted with no new founder activity to react to).
- [ ] **Founder decision — add-on service pricing** (carried over many runs): `dno-brief`/`ozev-grant-pack`/`gas-safe-kit`/`swmp-template`/`fra-template`/`acm-report-pack`/`nasc-pack`/`wayleave-pack`/`cctv-compliance-pack`/`calc-pack`/`vantage`/`codex` still take a lead via a form with zero price shown anywhere
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **NEW — cleanup, not urgent**: delete (or confirm safe to delete) orphaned `vite.config.ts`/`index.html` left over from the Next.js migration; update `CLAUDE.md` stack description from "Vite frontend" to "Next.js frontend" to match `vercel.json`'s actual `framework: nextjs`.
- [ ] **Recommend next run repeat tonight's approach**: check founder commits/PRs + carryover-blocker status first before any generic NEEDLE/copy sweep — diminishing returns on sweeps continues unchanged.

## Today - 20 June 2026 (NightlyBuildAgent — Run 3)

- [x] **Container state** — HEAD detached at `7514a9b`; local `main` ref stale (`origin/main` had force-updated since last cached fetch, no real divergence/lost work); `git update-ref refs/heads/main origin/main` + `git checkout main` resolved it; `npm install` (359 packages, missing entirely); build GREEN (118 pages), TS CLEAN before changes.
- [x] **Reviewed founder's same-day rebrand commits** (`de5631c` → `7514a9b`, JOBFILTER name kept, tagline → "UK Construction Intelligence") — verified end state consistent across TopNav/Footer/layout.tsx, no leftover old-tagline references anywhere. No fix needed.
- [x] **Closed long-standing carryover — Feature Roadmap doc reconciliation** (flagged 19/20 June as "worth a reconciliation pass", never done): marked Tier 2 #12 (Commercial lead detection) and #17 (Job value tracking) BUILT, #15 (Multi-channel follow-up) Partial — all three verified live in code, doc was stale for weeks.
- [x] **Fresh NEEDLE pass on Compare* pages** (Explore agent + manual verification) — both candidate findings were false positives on closer inspection (see changelog); confirms the diminishing-returns pattern independently rather than just citing past runs.
- [x] **Phase 1 re-confirmed** — all 5 form handlers wired to real backend calls; no broken imports.
- [x] Ran all 17 `codex-output/*.mjs` regressions — same known false-negative class as every prior run; no report artifacts left behind.
- [x] Build GREEN, TypeScript CLEAN. Only vault-doc change this run (no app code touched) — pushed.
- [ ] **Founder decision — add-on service pricing** (carried over many runs): `dno-brief`/`ozev-grant-pack`/`gas-safe-kit`/`swmp-template`/`fra-template`/`acm-report-pack`/`nasc-pack`/`wayleave-pack`/`cctv-compliance-pack`/`calc-pack`/`vantage`/`codex` still take a lead via a form with zero price shown anywhere
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Buildable backlog appears genuinely exhausted** — independent verification tonight (not just citing past runs) found zero real single-run-sized bugs/gaps. Recommend next run skip another generic NEEDLE/copy sweep by default and instead check for: (a) any new founder commits/PRs landed since this run, (b) whether any carryover blocker (Stripe keys, SMTP creds, TradeFlow URL scheme, add-on pricing decision) has been unblocked, before falling back to a sweep.

## Today - 20 June 2026 (NightlyBuildAgent — Run 2)

- [x] **Container state** — detached HEAD at `c342d26` (== `origin/main`, includes founder's PR #286 merged since Run 1); `git fetch origin main` + `git checkout -B main origin/main` resolved it; `npm install` (359 packages, missing entirely); build GREEN, TS CLEAN before changes.
- [x] **Bug found and fixed — competing hero CTAs on TerritoriesPage and NewsPage**: founder's PR #286 fixed HomePage's hero (two equal-weight `jf-button` CTAs side by side) by demoting the secondary one to a text link. Checking for the same pattern elsewhere (per last run's tip) found two more pages with it: TerritoriesPage ("LOCK MY PATCH" + full white "SCAN FREE FIRST" button) and NewsPage ("SCAN MY POSTCODE FREE" + full white "SEE LIVE SIGNALS" button). Demoted both secondary buttons to text underline links matching HomePage's treatment. Audited the other 23 files with both yellow+white `jf-button` instances — all clean (single primary hero CTA, secondary actions already correctly weighted).
- [x] **Phase 1 re-confirmed** — 5 `setSubmitted`/`setSent`/`setEmailDone`/`setDone` forms (added ForgotPasswordPage to the known list) wired to real backend/Supabase calls; no fake flows. 237 imports audited, no broken local imports.
- [x] Ran all 17 `codex-output/*.mjs` regressions — same known false-negative class as every prior run (live-server/network-dependent), all others pass. Reverted regression-script-generated report artifacts before commit.
- [x] Build GREEN, TypeScript CLEAN, pushed to main (`5a5205f`).
- [ ] **Founder decision — add-on service pricing** (carried over many runs): `dno-brief`/`ozev-grant-pack`/`gas-safe-kit`/`swmp-template`/`fra-template`/`acm-report-pack`/`nasc-pack`/`wayleave-pack`/`cctv-compliance-pack`/`calc-pack`/`vantage`/`codex` still take a lead via a form with zero price shown anywhere
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Feature Roadmap doc is stale** (`Product/Feature Roadmap - 8th May 2026.md`) — Tier 2 #17 "Job value tracking" is marked "Not built" but already live since 7-8 June. Worth a reconciliation pass.
- [ ] **Approach worth repeating**: two real fixes in two nights (BIN tier RSS label, competing hero CTAs) both came from re-checking a just-landed PR's diff for missed surfaces, not from a generic NEEDLE/copy sweep. Recommend next run start there before defaulting to NEEDLE.

## Today - 20 June 2026 (NightlyBuildAgent)

- [x] **Container state** — local `main` ref stale (179 commits diverged from `origin/main` at `1db7373`); `git reset --hard origin/main` resolved it (clean working tree, no local work lost); `npm install` (359 packages, missing entirely); build GREEN, TS CLEAN before changes.
- [x] **Bug found and fixed — leftover "BIN" tier label in `/signals/weekly` RSS feed**: PR #285 (19 June) standardized GOLD/SILVER/BRONZE naming across marketing/comparison pages but missed `generateRSSFeed()`'s item description in `src/lib/signalGenerator.ts:452`, which still published "...SILVER, Z BIN..." to the externally-syndicated RSS feed. One-word fix, BIN → BRONZE.
- [x] **Phase 1 re-confirmed** — all 4 `setSubmitted`/`setSent`/`setEmailDone` forms wired to real `fetch('/api/waitlist', ...)` calls with proper error handling; no fake flows, no broken imports.
- [x] **Grepped `leadEngine/` for the early-return-guard bug class from last night's `sourceUrl` fix** (Run 3, 19 June flagged this as the next thing to check) — found 5 more similar guards, all legitimate (missing API key / invalid title / no value data), none silently dropping valid data. Bug class confirmed contained to the one instance fixed last night.
- [x] Ran all 17 `codex-output/*.mjs` regressions — same known false-negative class as every prior run (live-server/network-dependent), all others pass. Reverted regression-script-generated report artifacts before commit.
- [x] Build GREEN, TypeScript CLEAN, pushed to main (`729bdc2`).
- [ ] **Founder decision — add-on service pricing** (carried over many runs): `dno-brief`/`ozev-grant-pack`/`gas-safe-kit`/`swmp-template`/`fra-template`/`acm-report-pack`/`nasc-pack`/`wayleave-pack`/`cctv-compliance-pack`/`calc-pack`/`vantage`/`codex` still take a lead via a form with zero price shown anywhere
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Feature Roadmap doc is stale** (`Product/Feature Roadmap - 8th May 2026.md`) — Tier 2 #17 "Job value tracking" is marked "Not built" but `getValueAccuracy()`/DashboardPage "Quoted vs landed" stat has been live since 7-8 June. Worth a pass to reconcile the doc against actual shipped state so future runs don't re-check items that are already done.
- [ ] **Next genuinely-buildable medium item still needs new external infrastructure** (WhatsApp two-way messaging, PlanWire, document search PDF pipeline) — all multi-day, not single-run. Diminishing returns on NEEDLE/copy sweeps continues; tonight's one real fix came from re-reading a recent PR's diff for missed surfaces, not a generic sweep — worth trying that approach again before defaulting to NEEDLE.

## Today - 19 June 2026 (NightlyBuildAgent — Run 3)

- [x] **Container state** — fresh container, `npm install` (359 packages); detached HEAD at `e581714` was a stale local `main` ref illusion, not real divergence — `origin/main` was already at `e581714`; resolved with `git checkout -B main origin/main`. Build GREEN, TS CLEAN before changes.
- [x] **Closed Run 2's carryover gap — found and fixed the real root cause**: `extractOpportunityAtoms()` (`leadEngine/opportunityAtoms.ts`) returned `[]` whenever `lead.sourceUrl` was empty, regardless of pattern match quality. `DirectorySignal` (the guaranteed-fallback internal dataset, used in DEMO_MODE and as real production fallback) never sets `sourceUrl` — so every DirectorySignal lead silently lost up to 14 score points, the "Why this is a job" badge, and risked `TOO_EARLY` misclassification. Removed the early-return guard (single line). Verified live: DY1/electrical DirectorySignal scan now correctly extracts a `solar_ev` atom for "EV Charger Install" where it returned `[]` before.
- [x] Build GREEN, TypeScript CLEAN. Ran `lead-engine-quality-regression`, `planning-contact-signal-regression`, `postcode-filter-regression`, `lead-engine-source-config-regression`, `package-copy-regression` — all pass. `lead-engine-50-plus-quality-test-fixed` oneLeadRule 0/42 confirmed pre-existing via git stash compare (not a regression). Pushed to main (`fac7f2d`).
- [x] **Checked all 5 candidate Tier 1 features from tonight's brief** (scan counter, ICS export, won leaderboard, WhatsApp templates, trade-specific scoring) — all 5 already shipped by prior runs, nothing to build.
- [x] **NEEDLE pass run, no edits made** — top finding ("contact route" missing from delivered UI) was a false positive on verification (`lead.contactPath` already renders as "Best approach: {channel}"); other findings re-litigated already-good fear→proof→control copy. Confirms diminishing-returns pattern — declined to force unnecessary copy churn.
- [ ] **Founder decision — add-on service pricing** (carried over many runs): `dno-brief`/`ozev-grant-pack`/`gas-safe-kit`/`swmp-template`/`fra-template`/`acm-report-pack`/`nasc-pack`/`wayleave-pack`/`cctv-compliance-pack`/`calc-pack`/`vantage`/`codex` still take a lead via a form with zero price shown anywhere
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation
- [ ] **Diminishing returns confirmed again on NEEDLE/copy sweeps** — next genuinely-buildable medium item needs new external infrastructure (WhatsApp two-way messaging, PlanWire, document search), all multi-day. Recommend next run skip NEEDLE/copy and instead grep for other `if (!sourceUrl)`/similar early-return guards elsewhere in `leadEngine/` that might have the same class of bug (silent feature degradation on a falsy-but-valid field).

## Today - 19 June 2026 (NightlyBuildAgent — Run 2)

- [x] **Container state** — fresh container, `npm install` (359 packages); confirmed build GREEN + TS CLEAN after #284 (security fix) and #285 (tier naming) landed since Run 1; detached HEAD, pushed via `git push origin HEAD:main` (clean fast-forward)
- [x] **Closed Run 1's #3 carryover priority** — threaded `sourceUrl` onto `LeadDecision` (`src/lib/types.ts`), `FindJobsPage.trackLead()` now persists it, `LeadDetailPage.handleExplain()` now sends it to `/api/leads/explain`. Removed stale comment in `app/api/leads/explain/route.ts`.
- [x] Build GREEN, TypeScript CLEAN, 13/17 regressions pass (same known false-negative class as every prior run), pushed to main (`873bc6a`)
- [ ] **New gap found tonight**: DEMO_MODE mock fetchers never set `lead.url`/`sourceUrls`, so tonight's sourceUrl threading has no real data to carry in demo/dev — atoms still won't populate from synthetic scans. Real fix is per-fetcher (start with `contractsFetcher.ts` — OCDS releases usually have a tender/document URL), multi-file, not a single-run fix.
- [ ] **Founder decision — add-on service pricing** (carried over many runs): `dno-brief`/`ozev-grant-pack`/`gas-safe-kit`/`swmp-template`/`fra-template`/`acm-report-pack`/`nasc-pack`/`wayleave-pack`/`cctv-compliance-pack`/`calc-pack`/`vantage`/`codex` still take a lead via a form with zero price shown anywhere
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation

## Today - 19 June 2026 (NightlyBuildAgent)

- [x] **Container state** — detached HEAD at `c752a4a` (== `origin/main`); `npm install` (359 packages, missing entirely); build GREEN, TS CLEAN before changes
- [x] **Closed Run 3's spot-check priority — found and fixed a real gap**: started Express backend + Next dev server in `DEMO_MODE=true`, ran a real B14 electrical scan, fed real leads (FTS council contract, DirectorySignal rewire job) into `/api/leads/explain`. Found `LeadDetailPage.handleExplain()` never sends `sourceUrl`, so the deterministic (no-AI) fallback's `extractOpportunityAtoms()` always returns `[]` and every real call degrades to the generic "{trade} opportunity from {source}." line regardless of lead specificity. Fixed fallback to use the lead's own title first: `"{trade} job: {title}."`. Verified live before/after on the same lead.
- [x] Build GREEN, TypeScript CLEAN, 13/17 regressions pass (same known false-negative class as every prior run), pushed to main (`2a9978b`)
- [ ] **`sourceUrl`/`sourceUrls` missing from `LeadDecision` entirely** (`src/lib/types.ts`) — multi-file thread (normaliser → FindJobsPage.trackLead → LeadDetailPage) needed if atoms should ever populate for real in the explain panel, not a single-run fix
- [ ] **Founder decision — add-on service pricing** (carried over many runs): `dno-brief`/`ozev-grant-pack`/`gas-safe-kit`/`swmp-template`/`fra-template`/`acm-report-pack`/`nasc-pack`/`wayleave-pack`/`cctv-compliance-pack`/`calc-pack`/`vantage`/`codex` still take a lead via a form with zero price shown anywhere
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation

## Today - 18 June 2026 (NightlyBuildAgent — Run 3)

- [x] **Container state** — detached HEAD, local `main` stale at `609898a` vs `origin/main` at `726d2db`; `git fetch origin main` + `git checkout -B main origin/main` resolved it (clean fast-forward); `npm install` (359 packages, missing entirely); build GREEN, TS CLEAN before changes
- [x] **Phase 1 re-confirmed** — all 4 `setSubmitted`/`setSent`/`setEmailDone` forms wired to real `fetch()`; no fake flows
- [x] **Feature built — closed Run 2's #1 priority: wired `/api/leads/explain` into LeadDetailPage** — new "WHAT THIS MEANS" panel translates the raw council/planning description (previously only surfaced for CompaniesHouse leads) into plain English; £39/mo lock card on 401/403, deterministic fallback verified live via `FULL_ACCESS_TEST_MODE=true` + curl, confirmed real 401 without test mode
- [x] Build GREEN, TypeScript CLEAN, all 17 regressions pass except known false-negative class (live-network dependent); reverted regression-script-generated report artifacts before commit; pushed to main (`15f1d3f`)
- [ ] **Spot-check "WHAT THIS MEANS" panel on a real live scan** — only curl-verified with a synthetic description this run; check rendering on a real planning-portal lead, desktop + 375px
- [ ] **Founder decision — add-on service pricing** (carried over many runs): `dno-brief`/`ozev-grant-pack`/`gas-safe-kit`/`swmp-template`/`fra-template`/`acm-report-pack`/`nasc-pack`/`wayleave-pack`/`cctv-compliance-pack`/`calc-pack`/`vantage`/`codex` still take a lead via a form with zero price shown anywhere
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation

## Today - 18 June 2026 (NightlyBuildAgent — Run 2)

- [x] **Container state** — detached HEAD at `dcd7647`, local `main` stale + diverged-history from `origin/main` (not just behind — `merge-base --is-ancestor` failed); `git fetch origin --prune` + `git reset --hard origin/main` resolved it (no local-only commits existed); `npm install` (359 packages); build GREEN, TS CLEAN before changes
- [x] **Found dead backend code from PR #282** — `/api/leads/draft-message` and `/api/leads/explain` (AI-powered, auth-gated, fallback-safe) had zero frontend callers since merge
- [x] **Feature built — AI draft-message wired into LeadDetailPage** — "AI DRAFT — WRITE ME A MESSAGE" button in SEND WHATSAPP section; £39/mo lock card on 401/403; drafted text + OPEN WHATSAPP CHAT link on success; verified live via `FULL_ACCESS_TEST_MODE=true` + direct curl (real fallback draft returned, no `ANTHROPIC_API_KEY` set, confirms no fake flow); unauth request correctly 401s
- [x] Build GREEN, TypeScript CLEAN, all regressions pass except known false-negative class (live-network dependent), pushed to main (`904e552`)
- [ ] **Wire `/api/leads/explain`** — still dead backend code; decide if it adds value beyond the existing WHY THIS LEAD section or retire the route
- [ ] **Founder decision — add-on service pricing** (carried over many runs): `dno-brief`/`ozev-grant-pack`/`gas-safe-kit`/`swmp-template`/`fra-template`/`acm-report-pack`/`nasc-pack`/`wayleave-pack`/`cctv-compliance-pack`/`calc-pack`/`vantage`/`codex` still take a lead via a form with zero price shown anywhere
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation

## Today - 18 June 2026 (NightlyBuildAgent)

- [x] **Container state** — detached HEAD at `b6df9dd`, local `main` stale 52 commits behind (`609898a`); `git checkout main`, `git fetch origin main` (corrected stale cached `origin/main` ref too), `git reset --hard origin/main` resolved it; `npm install` (359 packages, `node_modules` missing entirely); build GREEN, TS CLEAN before changes
- [x] **Phase 1 re-confirmed** — all 4 `setSubmitted`/`setSent`/`setEmailDone` forms wired to real `fetch()`; no broken imports; no React.lazy path risk
- [x] **Ran all 17 `codex-output/*.mjs` regression scripts** — all pass except known false-negative class needing live server/external APIs
- [x] **PR #281 ("open tracked leads in WhatsApp") reviewed** — confirmed sound; `buyerPhone` only real for tradesman-submitted intake leads, gracefully degrades to generic `wa.me/?text=` link for scanned leads (same pattern as prior SMS fallback), not a regression
- [x] **Full live-CTA sweep** — every VIEW/TRACK/SEND/DOWNLOAD/OPEN/GENERATE/UNLOCK/CLAIM/BUY/UPGRADE/EXPORT/COPY/SHARE-labelled button across `src/pages` + `src/components` checked for missing onClick/href — zero genuinely broken buttons found; only "broken-looking" button (`KeywordSearch.tsx` VIEW FULL DOCUMENT/TRACK THIS LEAD) is dead code behind `SHOW_ADVANCED_TOOLS = false`, confirmed unreachable
- [x] **Document search prototype re-confirmed correctly hidden** — mock-data scaffold, flag off, not deceiving anyone; finishing it for real needs PDF ingestion/storage/search API (multi-day)
- [x] **LaunchWaitlistModal reviewed** — confirmed intentional "Founding 30" scarcity marketing consistent with rest of site, not a stale bug; left unchanged
- [x] Build GREEN, TypeScript CLEAN throughout — **no code changes needed this run**, every Tier 1/2 buildable item already shipped in prior runs
- [ ] **Founder decision — add-on service pricing** (carried over many runs): still no price shown for `dno-brief`/`ozev-grant-pack`/`gas-safe-kit`/`swmp-template`/`fra-template`/`acm-report-pack`/`nasc-pack`/`wayleave-pack`/`cctv-compliance-pack`/`calc-pack`/`vantage`/`codex`
- [ ] **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation
- [ ] Only remaining buildable medium-effort items (Tier 2 #13 WhatsApp two-way messaging, #18 PlanWire, finishing document search) all need new external infrastructure/partnerships — multi-day, not single-run

## Today - 17 June 2026 (NightlyBuildAgent — Run 3)

- [x] **Container state** — detached HEAD at `2489111` (== `origin/main`, no real divergence); `git checkout main && git reset --hard origin/main` resolved it; `npm install`; build GREEN, TS CLEAN before changes
- [x] **Phase 1 re-confirmed** — all 4 `setSubmitted`/`setSent`/`setEmailDone` forms wired to real `fetch()` calls, no fake flows
- [x] **NEEDLE pass from Explore agent rejected** — flagged `TradePage.tsx:217` `rounded-lg` as a violation; investigated, it's the intentional WhatsApp mockup exception already documented 12 June Run 2 — no change made
- [x] **Design-token drift fix** — own grep sweep found 2 files with raw Tailwind red instead of `--orange` token: `DashboardPage.tsx:86` (alert error text) and `FindJobsPage.tsx` ×3 (deadline countdown badges, alert-setup error text, source-health failure badge). Fixed all 4; preserved 2-tier urgency on deadline badges (solid orange ≤2 days, outlined orange ≤7 days) instead of collapsing both to identical solid orange.
- [x] Ran all 16 `codex-output/*.mjs` regression scripts — pass except ones needing a live server/external API keys (known false-negative class, not a real bug)
- [x] Build GREEN, TypeScript CLEAN, `package-copy-regression.mjs` PASS, pushed to main (`ebae1ec`)
- [ ] **Founder decision — add-on service pricing** (carried over, see Run 2/3 changelogs): `dno-brief`/`ozev-grant-pack`/`gas-safe-kit`/`swmp-template`/`fra-template`/`acm-report-pack`/`nasc-pack`/`wayleave-pack`/`cctv-compliance-pack`/`calc-pack`/`vantage`/`codex` all take a lead via a form with zero price shown anywhere. Need a decision: free perk of £39/mo (then say so) or paid add-on (then show a price/range).
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel — recurring across many runs)
- [ ] TradeFlow "Send to TradeFlow" button (still blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Diminishing returns on NEEDLE/design-token sweeps** — most low-hanging fruit across `src/pages`/`src/components` found and fixed over ~2 weeks of runs; next genuinely-buildable medium item is Tier 2 #13 (WhatsApp two-way messaging) or #18 (PlanWire), both multi-day — scope before starting next run.

## Today - 17 June 2026 (NightlyBuildAgent — Run 2)

- [x] **Container state** — detached HEAD at `b4a91e8` (== `origin/main`, no real divergence); `git checkout -B main origin/main` resolved it; `npm install`; build GREEN, TS CLEAN before changes
- [x] **ForYourTradePage — Quantity Surveyors added** — closed the 16 June Run 3 gap; trade selector now covers 18/18 trade pages (was 17/18). Entry matches existing format, framed around commission value + procurement-cycle timing (mirrors `TradeQuantitySurveyors.tsx`)
- [x] **NEEDLE pass on 9 least-polished pages** (AcmReportPack, NascPack, OzevGrantPack, GasSafeKit, SwmpTemplate, FraTemplate, CctvCompliancePack, DnoBrief, WayleavePack) — all share one component (`ProductAdvantagePage.tsx`); read it in full + every trade's content block — clean, no jargon/design/fake-flow issues
- [x] **Ran all `codex-output/*.mjs` regression scripts via `npx tsx`** — all pass (plain `node` fails on bare `.ts` import resolution, known false-negative, not a real bug)
- [x] Build GREEN, TypeScript CLEAN, pushed to main (`3908cae`)
- [ ] **Founder decision — add-on service pricing** (NEW, see changelog): `dno-brief`/`ozev-grant-pack`/`gas-safe-kit`/`swmp-template`/`fra-template`/`acm-report-pack`/`nasc-pack`/`wayleave-pack`/`cctv-compliance-pack`/`calc-pack`/`vantage`/`codex` all take a lead via a form with zero price shown anywhere in the codebase. Need a decision: free perk of £39/mo (then say so) or paid add-on (then show a price/range). Do NOT add "No credit card required" copy until decided — would be a false claim.
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel — recurring across many runs)
- [ ] TradeFlow "Send to TradeFlow" button (still blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 17 June 2026 (NightlyBuildAgent)

- [x] **Local main ref repair** — local `main` had diverged 132 commits from `origin/main` (stale ref from container snapshot); reset to `origin/main` via `git checkout -B main origin/main`, reinstalled `node_modules`
- [x] **Phase 1 health check** — build GREEN, TypeScript CLEAN, no broken imports (239 files scanned), no fake-submit forms (4 setSubmitted/setEmailDone sites all wired to real backend calls)
- [x] **Tier 1 feature audit** — confirmed all 5 listed Tier 1 features already built: scan counter, ICS export, won leaderboard, WhatsApp templates (quick quote + availability check), trade-specific scoring
- [x] **MaterialPriceEnginePage** — added missing "No credit card required" trust line to hero (only free tool page without it)
- [x] **TradieStackPage CTA** — "ENQUIRE — EMAIL US" → "BUY TRADIESTACK — £450 →" (price-anchored, concrete action)
- [x] Build GREEN, TypeScript CLEAN, pushed to main (464dc38)
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel — recurring across many runs)
- [ ] TradeFlow "Send to TradeFlow" button (still blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Free-tools pack pages need NEEDLE pass** — AcmReportPack, NascPack, OzevGrantPack, GasSafeKit, SwmpTemplate, FraTemplate, CctvCompliancePack, DnoBrief, WayleavePack have had the least polish attention of any pages on the site

## Today - 16 June 2026 (NightlyBuildAgent — Run 3)

- [x] **Container state** — fresh container, `npm install`, recovered from detached HEAD (fetched origin, reset to `da7dc41`); build GREEN, TS CLEAN before and after
- [x] **ForYourTradePage trade selector expanded** — 12 → 17 trades. Added: Fire Safety, Data Cabling, CCTV/Security, Groundworks, Structural Engineer. Each with trade-specific signals, value range, and example lead.
- [x] **CompareRatedPeoplePage copy polish** — added 'No credit card required — 3 free scans every week' trust line (was missing vs TrustATrader page); added 'Signals per scan' comparison row
- [x] **TerritoriesPage mobile NEEDLE fix** — added AVG JOB VALUE and SIGNALS/MO labels on mobile territory cards; bare number `14` was unreadable without desktop header
- [x] Build GREEN, TypeScript CLEAN, pushed to main (`53d5598`)
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- [ ] **ForYourTradePage — Quantity Surveyors** — still not in trade selector (17/18 trade pages covered)
- [ ] **TerritoriesPage form response SLA** — success message should say "we'll reply within 24h" not just "we will check coverage and reply"
- [ ] **WinStatsBanner real-data test** — log a win via BuyerOutcomePicker, verify WinStatsBanner renders on FindJobsPage
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 16 June 2026 (NightlyBuildAgent — Run 2)

- [x] **Container state** — `npm install`; build GREEN (110 pages), TS CLEAN before and after changes
- [x] **WinStatsBanner verified** — component renders when `wonCount > 0`; correct to hide when no wins
- [x] **WA_TEMPLATE_KEYS verified** — all 5 keys present: first_touch_2h, quick_quote_offer, follow_up_24h, availability_check, final_nudge_48h
- [x] **ForYourTradePage trade selector expanded** — 6 → 12 trades. Added: Gas Engineer, Solar PV, EV Charger, Heat Pumps, Decorating, Scaffolding. Each with specific signals, value range, and example lead.
- [x] **FaqPage copy** — "How fresh?" adds "3–5 days ahead of Checkatrade, Bark, or MyBuilder"; 30-day guarantee answer tightened; trades list expanded to 15
- [x] **NEEDLE/BUILDER/CRITIC/REVENUE** — ForYourTradePage missing 9 trades was the top UX issue; fixed. Clearer in <3s (YES), increases £39/mo likelihood (YES).
- [x] Build GREEN (110 pages), TypeScript CLEAN, pushed to main (`29c8870`)
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- [ ] **ForYourTradePage — add remaining trades** — Fire Safety, Data Cabling, CCTV, Groundworkers, Structural Engineers still missing
- [ ] **TerritoriesPage mobile check** — verify "Avg job value" and "Signals/mo" appear on mobile article cards
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 16 June 2026 (NightlyBuildAgent — Run 1)

- [x] **Container state** — `npm install` (359 packages, fresh container); build GREEN (110 pages), TS CLEAN before and after changes
- [x] **Phase 1** — both `setSubmitted(true)` forms wired to real `fetch('/api/waitlist', ...)`; no broken imports
- [x] **Phase 2 audit** — all Tier 1 features verified built: scan counter, calendar ICS, WinStatsBanner, WhatsApp templates (quick_quote_offer + availability_check), trade-specific score reasons, job value tracking, commercial detection
- [x] **Copy polish — PricingPage**: plan bullets rewritten with specific action language; objection answers expanded to name all 4 competitors (Checkatrade/MyBuilder/Bark/BuildAlert); hero subtitle names signal types explicitly
- [x] **Copy polish — HomePage**: proof points gain "3–5 days before Checkatrade or Bark" specificity; ops strip updated; founding-30 strip adds urgency line
- [x] **NEEDLE/BUILDER fix** — "Avail. Check" WhatsApp template tab → "Diary Check" (clear to a tradesman on mobile; Avail. Check was an abbreviated label that required decoding)
- [x] Build GREEN (110 pages), TypeScript CLEAN, pushed to main (`f8973b7`)
- [ ] **WinStatsBanner live check** — verify WinStatsBanner renders once a win + value is logged via BuyerOutcomePicker; the backend already accepts wonValue
- [ ] **QuickResponseKit WA_TEMPLATE_KEYS audit** — confirm WA_TEMPLATE_KEYS has all 5 templates after chaseTemplates reorder (main branch moved quick_quote_offer before follow_up_24h)
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 15 June 2026 (NightlyBuildAgent — Run 3)

- [x] **Container state** — local `main` was 110/52 commits diverged from `origin/main` (HEAD detached at `e318118`); `git reset --hard origin/main` resolved it; `npm install` (359 packages); build GREEN (107 pages), TS CLEAN before changes
- [x] **Phase 1 re-confirmed** — both `setSubmitted(true)` forms wired to real `fetch()`; no broken imports; reviewed PR #275 (founder's "tighten patch claim conversion flow") — new TerritoriesPage patch-check form + HomePage "Open Vantage"/"Open Vicinity" badges both genuinely wired (`/api/waitlist`)
- [x] **NEEDLE/BUILDER fix — TerritoriesPage hero CTA ping-pong (regression from PR #275)**: hero "LOCK MY PATCH →" pointed at `#claim` (bottom CTA section), whose own button pointed back up to `#patch-check` (the form right next to the original button) — fixed hero CTA to link straight to `#patch-check`
- [x] Build GREEN (107 pages), TypeScript CLEAN, `package-copy-regression.mjs` PASS, pushed to main (`5db2994`)
- [ ] **Fresh NEEDLE pass on `/territories`** — PR #275 substantially rewrote this page; worth a full read-through now the dust has settled
- [ ] **Tier 2 #15 continued** — if a real buyer-phone data source becomes available, thread `phone` onto `Lead` (FindJobsPage) + `QuickResponseKit`. Until then leave as-is.
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel, carried over multiple weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 15 June 2026 (NightlyBuildAgent — Run 2)

- [x] **Container state** — local `main` was 28 commits behind `origin/main` (HEAD detached at `d0e5dc2`); `git fetch` + `git checkout main && git reset --hard origin/main` resolved it; `npm install` (359 packages); build GREEN (107 pages), TS CLEAN before changes
- [x] **Phase 1 re-confirmed** — both `setSubmitted(true)` forms wired to real `fetch()`; no broken imports (scripted check)
- [x] **NEEDLE/BUILDER fix — TradieZonePage.tsx Vicinity card mismatch**: card said "Social proof from photos" with a Camera icon linking to `/vicinity`, but `/vicinity` is a targeted door-drop ad service with no photo feature — relabelled "Targeted door-drop ads" + Megaphone icon, fixed TOOLS subtitle to match
- [x] **Copy polish — CityIntelligencePage.tsx**: "SCAN FREE FIRST" CTA was missing the "No credit card required — 3 free scans every week" trust line present on every other free CTA; added
- [x] Build GREEN (107 pages), TypeScript CLEAN, `package-copy-regression.mjs` PASS, pushed to main (`d96f852`)
- [ ] **Tier 2 #15 continued** — if a real buyer-phone data source becomes available, thread `phone` onto `Lead` (FindJobsPage) + `QuickResponseKit`. Until then leave as-is.
- [ ] **Spot-check `/test/intake` live (DEMO_MODE)** — confirm the 3 scoring scenarios return GOLD/SILVER/BIN tiers via `/api/intake/score`
- [ ] **Spot-check EMAIL ME THIS LEAD live** — still blocked, no `RESEND_API_KEY` in this container
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel, carried over multiple weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 15 June 2026 (NightlyBuildAgent)

- [x] **Container state** — `npm install` (359 packages, fresh container); build GREEN (107 pages), TS CLEAN before changes
- [x] **Phase 1 re-confirmed** — both `setSubmitted(true)` forms wired to real `fetch()`; no broken imports
- [x] **Mid-session build break from PR #269 (FlipSignal AI scaffold)** — diagnosed root `tsconfig.json` needed `flipsignal-ai` in `exclude`; PR #270 landed the identical fix first, rebased onto it. Flag for founder: `flipsignal-ai/` is an unrelated marketplace-arbitrage scaffold now in this repo root — keep excluded from root tsconfig.
- [x] **Feature built — Tier 2 #15 "Multi-channel follow-up" first slice (SMS fallback)**: `chaseTemplates.ts` gained `toSmsHref(phone, body)`; `QuickResponseKit.tsx` gained a `phone?: string` prop + "OPEN SMS" button next to "COPY MESSAGE" for WhatsApp-channel templates — opens device SMS composer with the filled message, auto-tracks the lead. Degrades gracefully to `sms:?body=...` (no recipient) when no phone is known, same pattern as existing `wa.me` links.
- [x] **NEEDLE/BUILDER fix — SmartQuotePage.tsx:132**: removed stray `rounded` class on QUOTE STARTER PREVIEW blur overlay (brutalist design system uses square corners; this was the only outlier on the page)
- [x] **Copy audit — SmartQuotePage + ProductAdvantagePage (swmp-template/wayleave-pack/dno-brief etc.)**: both already compliant with Fear→Proof→Control / named competitors / "No credit card required" / no jargon rules — no changes needed. Jargon sweep ("leverage/utilise/solution/platform") across src/pages — remaining "platform" hits are all accurate competitor descriptions, not violations.
- [x] Build GREEN (107 pages), TypeScript CLEAN, pushed to main
- [ ] **Tier 2 #15 continued** — if a real buyer-phone data source becomes available, thread `phone` onto `Lead` (FindJobsPage) + `QuickResponseKit` so SMS/WhatsApp links pre-fill the recipient. Until then leave as-is (avoids fake `wa.me//available`-style links — same reasoning as 11 June Run 3).
- [ ] **VicinityPage "Generate Proof" / VantagePage "Generate Bid Deck" tools** — still Coming Soon/disabled; real build = wire upload + template selection into an actual image/PDF-gen flow (multi-run project, needs gen API)
- [ ] **Spot-check `/test/intake` live (DEMO_MODE)** — confirm the 3 scoring scenarios return GOLD/SILVER/BIN tiers via `/api/intake/score`
- [ ] **Spot-check EMAIL ME THIS LEAD live** — still blocked, no `RESEND_API_KEY` in this container
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel, carried over multiple weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 14 June 2026 (NightlyBuildAgent — Run 3)

- [x] **Container state** — detached HEAD at `00ca6e4` (local `main` 53 commits stale, force-updated remote); `git fetch` + `git reset --hard origin/main` resolved it, `00ca6e4` already == `origin/main`; `npm install` (359 packages); build GREEN (107 pages), TS CLEAN before changes
- [x] **Phase 1 re-confirmed** — both `setSubmitted(true)` forms wired to real `fetch()`; no broken imports
- [x] **NEEDLE/BUILDER fix — `app/robots.ts` gap from PR #261**: PR #260/#261 (pushed earlier today) added `middleware.ts` redirecting unauthenticated `/dashboard`, `/leads`, `/account`, `/tradie-zone` to `/login`, and `robots.ts` disallowed `/dashboard`+`/account` but missed `/leads`+`/tradie-zone`. Added both to disallow list. Verified `/tradie-zone` only linked for logged-in users (TopNav "Tools"), `/leads` only reached via Dashboard — middleware guard correct, no UX regression.
- [x] Build GREEN (107 pages), TypeScript CLEAN, `package-copy-regression.mjs` PASS, pushed to main (`1e37315`)
- [ ] **VicinityPage "Generate Proof" / VantagePage "Generate Bid Deck" tools** — still Coming Soon/disabled; real build = wire upload + template selection into an actual image/PDF-gen flow (multi-run project, needs gen API)
- [ ] **Spot-check `/test/intake` live (DEMO_MODE)** — confirm the 3 scoring scenarios return GOLD/SILVER/BIN tiers via `/api/intake/score`
- [ ] **Spot-check EMAIL ME THIS LEAD live** — still blocked, no `RESEND_API_KEY` in this container
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel, carried over multiple weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Tier 1/2 roadmap items exhaustively built/polished** — next genuinely-buildable medium items are Tier 2 #13 (WhatsApp Business API Phase 2, two-way messaging) or Tier 2 #18 (PlanWire), both multi-day/multi-run — scope before starting.

## Today - 14 June 2026 (NightlyBuildAgent — Run 2)

- [x] **Container state** — `npm install` (359 packages, fresh container); build GREEN (107 pages), TS CLEAN before changes
- [x] **Phase 1 re-confirmed** — both `setSubmitted(true)` forms wired to real `fetch()`; audited all `Link href` against `app/` route tree, no broken links
- [x] **NEEDLE/BUILDER fix — Vantage/Vicinity misrepresented as live (same class as PR #257 from Run 1)**: `FreeToolsPage.tsx` FREE VS PAID table showed "Vantage bid decks" / "Vicinity proof generator" with ✓ under FOUNDING 30 (implies working self-serve tool included with subscription); `TradieZonePage.tsx` YOUR TOOLS tiles said "Generate bid decks"/"Social proof from photos" with "OPEN ->". Both generators are still Coming Soon/disabled on their own pages. Changed table cells to "Coming soon"; added orange "Coming soon" badge + "JOIN WAITLIST ->" to the two TradieZonePage tiles (matches PR #257's HomePage badge style).
- [x] Build GREEN (107 pages), TypeScript CLEAN, `package-copy-regression.mjs` PASS, pushed to main (`6bc387a`)
- [ ] **VicinityPage "Generate Proof" / VantagePage "Generate Bid Deck" tools** — still Coming Soon/disabled; real build = wire upload + template selection into an actual image/PDF-gen flow (multi-run project, needs gen API)
- [ ] **Spot-check `/test/intake` live (DEMO_MODE)** — confirm the 3 scoring scenarios return GOLD/SILVER/BIN tiers via `/api/intake/score`
- [ ] **Spot-check EMAIL ME THIS LEAD live** — still blocked, no `RESEND_API_KEY` in this container
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel, carried over multiple weeks)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 14 June 2026 (NightlyBuildAgent)

- [x] **Container state** — `npm install` (359 packages, fresh container); build GREEN (107 pages), TS CLEAN before changes
- [x] **Phase 1 re-confirmed** — both `setSubmitted(true)` forms (ProductAdvantagePage, WeeklySignalsPage) wired to real `fetch()`; no broken imports
- [x] **NEEDLE/BUILDER fix — VantagePage fake "Generate Bid Deck" flow**: hero promised a working tender-upload tool, but upload zone was non-interactive and CTAs just scrolled to a generic founder waitlist — disabled both buttons, relabelled "— Coming Soon" + added "Vantage is in development. Join the waitlist below..." note (matches VicinityPage's 12 June fix)
- [x] **Copy polish — "pipeline" jargon removed**: BlueprintPage.tsx:164 DELIVERY LOOP card copy ("lands in the pipeline" → "is picked up and scored"); TradieZonePage.tsx:53 ("job pipeline" → "tools no auction site gives you"), :107 ("VIEW PIPELINE" → "VIEW DASHBOARD", matches actual `/dashboard` link target), :111 (unverifiable "in minutes" claim → "before they're shared on Checkatrade or Bark. First to quote wins")
- [x] Build GREEN (107 pages), TypeScript CLEAN, `package-copy-regression.mjs` PASS, pushed to main
- [ ] **VicinityPage "Generate Proof" tool** — still Coming Soon/disabled; real build = wire photo upload + job summary + template selection into an actual image-generation flow, if shipping soon (effort ~8, needs image-gen API — likely a multi-run project)
- [ ] **Spot-check `/test/intake` live (DEMO_MODE)** — confirm the 3 scoring scenarios return GOLD/SILVER/BIN tiers via `/api/intake/score`
- [ ] **Spot-check EMAIL ME THIS LEAD live** — still blocked, no `RESEND_API_KEY` in this container
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel, ~3 weeks carried over)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 13 June 2026 (NightlyBuildAgent — Run 4)

- [x] **Container state** — `npm install` (359 packages, fresh container); build GREEN (107 pages), TS CLEAN before changes
- [x] **Audit re-confirmed** — Tier 1 Feature Roadmap items still BUILT; no fake `setSubmitted(true)` forms; no broken imports
- [x] **Fresh NEEDLE pass on /dashboard, /account, /leads/[id]** (Run 3's #1 priority) — DashboardPage, AccountPage, LeadDetailPage, LeadListPage all clean, no fake flows/broken links
- [x] **NEEDLE/BUILDER fix — raw `text-red-600` error text** on LoginPage, ForgotPasswordPage, ResetPasswordPage — replaced with brutalist `var(--orange)` token (same pattern as AccountPage in earlier runs)
- [x] Build GREEN (107 pages), TypeScript CLEAN, `package-copy-regression.mjs` PASS, pushed to main (`a9f1980`)
- [ ] **VicinityPage "Generate Proof" tool** — still Coming Soon/disabled; real build = wire photo upload + job summary + template selection into an actual image-generation flow, if shipping soon (effort ~8, needs image-gen API — likely a multi-run project)
- [ ] **Spot-check `/test/intake` live (DEMO_MODE)** — confirm the 3 scoring scenarios return GOLD/SILVER/BIN tiers via `/api/intake/score`
- [ ] **Spot-check EMAIL ME THIS LEAD live** — still blocked, no `RESEND_API_KEY` in this container
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel, ~3 weeks carried over)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 13 June 2026 (NightlyBuildAgent — Run 3)

- [x] **Container state** — local `main` was 52 commits behind `origin/main` (fresh container); `npm install` (358 packages); `git fetch` + fast-forward to `origin/main`; build GREEN (106 pages), TS CLEAN before changes
- [x] **`src/pages/IntakeTestPage.tsx` orphaned dead code — resolved** (Run 2's #1 priority): added `app/test/intake/page.tsx`, dev-only route mirroring `app/test/page.tsx` (redirects to `/` outside `NODE_ENV=development`); `/api/intake/score` backend confirmed wired in `server/app.ts`
- [x] **TerritoriesPage status legend added** (Run 2's #3 priority): short inline row under "AVAILABLE PATCHES" explaining OPEN/FOUNDER SLOT/CLAIMED/RESERVED/WAITLIST for first-time visitors
- [x] Build GREEN (107 pages, +1 for `/test/intake`), TypeScript CLEAN, `package-copy-regression.mjs` PASS, pushed to main (`733063c`)
- [ ] **Fresh NEEDLE pass on /dashboard, /account, /leads/[id]** — TerritoriesPage has had 2 runs of attention; look elsewhere next
- [ ] **VicinityPage "Generate Proof" tool** — still Coming Soon/disabled; real build = wire photo upload + job summary + template selection into an actual image-generation flow, if shipping soon
- [ ] **Spot-check `/test/intake` live (DEMO_MODE)** — confirm the 3 scoring scenarios return GOLD/SILVER/BIN tiers via `/api/intake/score`
- [ ] **Spot-check EMAIL ME THIS LEAD live** — still blocked, no `RESEND_API_KEY` in this container
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel, ~3 weeks carried over)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 13 June 2026 (NightlyBuildAgent)

- [x] **Container state** — `npm install` (359 packages, fresh container); build GREEN (106 pages), TS CLEAN before changes
- [x] **Phase 1 fix — VicinityPage "Generate Proof" fake flow**: button had no `onClick`, static upload zone/textarea — disabled it, relabeled "Generate Proof — Coming Soon", added pointer to waitlist form (matches page's existing "Coming soon" framing for the feature)
- [x] **Stale regression triage (Run 3's #1 priority)** — `package-copy-regression.mjs` fixed (3 assertions updated: "Founding 30", "Cancel anytime", "WhatsApp delivery"), now PASSES. Retired 3 more (`launch-polish-regression.mjs`, `free-access-daily-tools-regression.mjs`, `intake-test-mode-regression.mjs`, `news-link-regression.mjs` — 4 files total) that asserted copy/routes from a pre-rewrite/pre-Next.js version of the site, including some that contradicted the "never name data sources publicly" rule. Moved to `codex-output/retired/` with README explaining rationale.
- [x] **NEEDLE/BUILDER fix — TradeBuilders.tsx:9,68** — `highlightedPhrase: 'Planning Data'` + matching `metaTitle` named the internal planning-data source publicly in hero + SEO title; changed to "Planning Approvals" (matches sibling Trade* pages)
- [x] **Copy polish — "No credit card required"** — VantagePage + VicinityPage "SCAN MY AREA FREE" CTAs were missing the trust line every other free-scan CTA has; added to both
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main (`58a50e5`)
- [ ] **`src/pages/IntakeTestPage.tsx` is orphaned dead code** — no route imports it (`/intake-test` never ported to App Router). Decide: give it a real route or delete.
- [ ] **VicinityPage "Generate Proof" tool** — currently Coming Soon/disabled. If shipping soon, real build = wire photo upload + job summary + template selection into an actual image-generation flow.
- [ ] **Spot-check EMAIL ME THIS LEAD live** — still blocked, no `RESEND_API_KEY` in this container
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel, ~3 weeks carried over)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 12 June 2026 (NightlyBuildAgent — Run 3)

- [x] **Container state fixed** — detached HEAD at `2d9e43e` (== `origin/main`); `git checkout main` resolved it, no divergence
- [x] **npm install** — `node_modules` empty again in fresh container; installed 359 packages
- [x] **Carryover fix — `codex-output/free-scanner-redaction-regression.mjs`**: stale assertion expected the literal copy "Free scan confirms the signal is live" which was rewritten in earlier sweeps. The redaction behaviour it protects (blurred `LockedValue` placeholders + "N verified signal(s) backing this lead") is intact and correct — updated the test's required-copy check to `'verified signal'` to match current UI. Regression now PASSES.
- [x] **NEEDLE/BUILDER fix — IntakeTestPage.tsx:125** error state used raw `bg-red-100`/`text-red-800`; replaced with brutalist `border-[var(--orange)] bg-[var(--orange)]/10 text-[var(--ink)]`
- [x] **Copy polish — "specific beats vague"**: FindJobsPage CompaniesHouse lead line "New business nearby" → "New business {distance label}" (reuses existing `distLabel`, e.g. "8 miles from B14"); TrustCenterPage "ownership changes nearby" → "...in your patch" (matches sibling bullet copy)
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main (`e938865`)
- [ ] **Stale copy-assertion regressions (3 files)** — `package-copy-regression.mjs` ("FOUNDING 30"), `launch-polish-regression.mjs` ("What You Get" nav), `free-access-daily-tools-regression.mjs` ("FREE DAILY TOOLS") all fail on copy strings renamed in past sweeps — same fix pattern as tonight's redaction regression: confirm current copy satisfies test intent, update assertion.
- [ ] **`intake-test-mode-regression.mjs` / `news-link-regression.mjs`** — both `ENOENT src/App.tsx`, file removed in Next.js migration; rewrite against `app/` structure or retire.
- [ ] **Spot-check EMAIL ME THIS LEAD live** — still blocked, no `RESEND_API_KEY` in this container
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel, ~3 weeks carried over)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 12 June 2026 (NightlyBuildAgent — Run 2)

- [x] **Container state fixed** — local `main` ref was stale (52 commits behind `origin/main`); `git fetch` + `git checkout main && git reset --hard origin/main` resolved it
- [x] **npm install** — `node_modules` empty again in fresh container; installed 359 packages
- [x] **Audit re-confirmed** — Tier 1 + Tier 2 #12/#16/#17 still built and wired; no fake `setSubmitted(true)` forms
- [x] **Design-system token sweep on `src/components/*.tsx` completed** — all 33 components checked, remaining raw-colour/rounded hits are intentional (EPC band swatches, WhatsApp mockup, icon close buttons) — sweep now exhausted
- [x] **Bug fix — non-deterministic freshness scoring on DirectorySignal fallback leads**: `rawPublished` was `Date.now() - Math.random() * 7 days`, recomputed every scan, so the same internal lead's score/badge could jitter ±5 points (and occasionally flip quality label) scan-to-scan. Made deterministic per lead via urgency band + index in `leadEngine/fetchers/directorySignalFetcher.ts`. Also fixes flaky `lead-engine-quality-regression.mjs` (B15/building top score sometimes <85 — now passes consistently).
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main (`d5b5539`)
- [ ] **`codex-output/free-scanner-redaction-regression.mjs`** — pre-existing failure (confirmed present on `origin/main` before tonight's change too), asserts copy "Free scan confirms the signal is live" which may no longer exist in the free-scanner UI. Needs triage: update UI copy or update test.
- [ ] **Spot-check EMAIL ME THIS LEAD live** — still blocked, no `RESEND_API_KEY` in this container
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel, ~3 weeks carried over)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 12 June 2026 (NightlyBuildAgent)

- [x] **npm install** — `node_modules` empty again in fresh container; installed 359 packages
- [x] **Audit re-confirmed** — all 5 Tier 1 brief items + Tier 2 #12/#16/#17 still built and wired (scan counter, calendar ICS, WinStatsBanner, WhatsApp quick-quote/availability templates, trade-specific scoring); no regressions
- [x] **NEEDLE/BUILDER fix — SignalsPage "URGENT TAKEOVER" badge** used raw `bg-red-700` instead of brutalist `var(--orange)` token (only outlier in the SIGNAL TYPES legend); fixed
- [x] **CityPage "THE OLD WAY" label** — removed dead reference to undefined `--red` CSS var (was overridden by inline orange style anyway)
- [x] Re-confirmed no fake `setSubmitted(true)` forms; jargon sweep ("moat"/"signal engine"/"Patch Plan"/"pipeline"/"EXCLUSIVE") clean across src/pages and src/components; Trade*.tsx data files confirmed using shared TradePage trust copy (no missing "No credit card" — false alarm from initial grep)
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main (`9c41512`)
- [ ] **Next run: broaden design-system token sweep to src/components/*.tsx** — only CityPage/TradePage/SignalsPage/AccountPage checked closely for raw-Tailwind colour/shadow/radius drift so far
- [ ] **Spot-check EMAIL ME THIS LEAD live** — still blocked, no `RESEND_API_KEY` in this container
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel, ~3 weeks carried over)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 11 June 2026 (NightlyBuildAgent — Run 3)

- [x] **Container state fixed** — started in detached HEAD at `c26fee4` (== `origin/main`, no real divergence); `git checkout main && git reset --hard origin/main` resolved it
- [x] **npm install** — `node_modules` empty again in fresh container; installed 359 packages
- [x] **Tier 2 #15 re-scoped (important — stop chasing this)**: investigated "thread `rawContact.email`/`.phone` onto `Lead`" from last run's priority list. Only `directorySignalFetcher.ts` ever sets `rawContact`, and for "strong" signals it sets `phone: 'available'` — a placeholder string, not a real number. Threading this through would render a broken `wa.me/available` link (fake flow — against BUILD RULES). Real buyer contact enrichment is Tier 4 #22 "DO NOT BUILD NOW" (GDPR/ICO risk) per Feature Roadmap + CLAUDE.md DO NOT TOUCH. **This task is blocked on a real contact-data source, not a code change — remove from next-run priorities.**
- [x] **NEEDLE/BUILDER fix — AccountPage design system violation**: subscription status badges (ACTIVE/PAST_DUE/etc) and billing-portal error text used raw Tailwind `green-600`/`orange-500`/`red-600` 1px-border colours instead of brutalist `--green`/`--orange` tokens with `border-2`. Fixed to match site-wide design system.
- [x] Re-confirmed both `setSubmitted(true)` forms wired to real endpoints (no fake flows); FaqPage/TerritoriesPage free CTAs all carry "no card needed" copy; WinStatsBanner postcode always defaults non-empty (no bug); EMAIL ME THIS LEAD code reviewed, correctly wired
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main (`0cb99be`)
- [ ] **Fresh NEEDLE pass on less-trafficked pages** — `/test` console, legacy comparison pages — AccountPage was the first design-system drift found in several runs
- [ ] **Spot-check EMAIL ME THIS LEAD live** — still blocked, no `RESEND_API_KEY` in this container
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel, ~2 weeks carried over)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 11 June 2026 (NightlyBuildAgent — Run 2)

- [x] **npm install** — `node_modules` empty again in this fresh container; installed 359 packages before build/tsc could run
- [x] **Audit re-confirmed** — all 5 Tier 1 brief items + Auto-nudge/snooze genuinely built and wired (trade-specific scoring verified by reading `leadEngine/scorer.ts` TRADE_KEYWORDS — produces real per-trade differences)
- [x] **Tier 2 #15 Multi-channel follow-up — first slice built**: `POST /api/leads/email-chase` (new `server/routes/leadEmailChase.ts` + `sendLeadChaseEmail()` in `server/lib/resend.ts`, registered in `server/app.ts`) + "EMAIL ME THIS LEAD" button on LeadDetailPage FOLLOW-UP REMINDER section — sends lead summary + chase message to the logged-in user's own inbox via Resend. No fake flow: returns 503 with plain error if RESEND_API_KEY unset.
- [x] **EpcPage TRADES THAT BENEFIT mobile grid fix** — `grid-cols-2 md:grid-cols-5` → `grid-cols-1 sm:grid-cols-2 md:grid-cols-5` (removes 2/2/1 orphan card on small phones, flagged by prior NEEDLE pass)
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main (`35443eb`)
- [ ] **Full buyer-side multi-channel follow-up (Tier 2 #15 continued)** — needs `leadEngine/normaliser.ts` to thread `raw.rawContact.email`/`.phone` onto the normalised `Lead` (currently discarded after deriving `contactSignal`); this also unblocks "phone-aware WhatsApp links" (`lead.phone`/`waPhone` in LeadDetailPage is always null today in practice)
- [ ] **Spot-check EMAIL ME THIS LEAD live** — could not test without `RESEND_API_KEY` in this container; verify email renders correctly once Resend key configured
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 11 June 2026 (NightlyBuildAgent)

- [x] **npm install** — `node_modules` was missing entirely in this fresh container; installed 359 packages before build/tsc could run
- [x] **Stale local `main` ref fixed** — local `main` was 52 commits behind `origin/main` (`f487485` not reachable from cached refs); `git fetch --prune` + `git pull origin main` resolved it, no real divergence
- [x] **Audit: all 5 Tier 1 "unbuilt" features from this run's brief confirmed already BUILT** — scan counter (`weeklyScansRemaining`), Calendar ICS export, WinStatsBanner leaderboard, WhatsApp template additions (email_*/quick_quote_offer), trade-specific scoring (LARGE PROJECT badge) — all verified present and wired via grep
- [x] **Phase 1 broken-form check** — both remaining `setSubmitted(true)` forms (ProductAdvantagePage ServiceForm, WeeklySignalsPage AlertSubscribeModal) wired to real `fetch()` — no fake flows
- [x] **NEEDLE/BUILDER fix — EpcPage "GET THE TEMPLATE" CTA mismatch** — button was a bare mailto but copy promised an instant ready-to-print PDF; relabeled "EMAIL ME THE TEMPLATE →" + expectation-setting line
- [x] **Jargon sweep — QuickResponseKit.tsx "Chase stage/tracker"** → "job tracker" (last remaining instance of this internal-noun pattern in `src/`)
- [x] **QuickResponseKit.tsx "LISTING" → "VIEW LISTING"** for clarity
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main (`8aa43ea`)
- [ ] **Tier 2 #15 Multi-channel follow-up** — email templates + Resend already exist; missing piece is wiring an actual "send chase email" action into LeadDetailPage/QuickResponseKit (currently WhatsApp deep-link + copy-to-clipboard only)
- [ ] **EpcPage "TRADES THAT BENEFIT" mobile grid** (`grid-cols-2 md:grid-cols-5`, 5 cards) — flagged as possible 2/2/1 mobile layout issue, not changed (low confidence, needs visual check)
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 10 June 2026 (NightlyBuildAgent — Run 3)

- [x] **npm install** — `node_modules` was missing entirely in this fresh container; installed 359 packages before build/tsc could run
- [x] **Commercial lead project scale built (Tier 2 #12 follow-up)** — `calcProjectScale()` added to `leadEngine/normaliser.ts`: commercial leads now get `projectScale: 'small' | 'medium' | 'large'` based on value band (large ≥£100k, medium ≥£25k). FindJobsPage shows "LARGE PROJECT" badge + "likely needs multiple trades on site" line on commercial lead cards; LeadDetailPage WHY THIS LEAD section gets matching lines ("Commercial job — business buyer, not a homeowner" / "Large project — likely needs more than one trade on site"); `LeadDecision` type + `trackLead()` persist `isCommercial`/`projectScale`
- [x] Build GREEN (106 pages), TypeScript CLEAN, regression `lead-engine-quality-regression.mjs` PASS, pushed to main (`9820013`)
- [x] Verified live B14 electrical scan in DEMO_MODE: 5/10 leads commercial, projectScale correctly small/medium/large across value bands
- [ ] **Visual spot-check LARGE PROJECT badge** — Playwright not installed in this container; confirm renders cleanly desktop + 375px on a real commercial lead
- [ ] **Next run: fresh NEEDLE/UX pass or Tier 2 #15/#17** — all Tier 1 + Tier 2 #12 now built
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 10 June 2026 (NightlyBuildAgent — Run 2)

- [x] **COMPANY DETAILS panel spot-checked** — verified live B14 electrical scan in DEMO_MODE for both free tier (correctly shows LOCKED — `description` stripped for free preview) and paid tier (`FULL_ACCESS_TEST_MODE=true` — Industry/Incorporated/Company No parse correctly from real CompaniesHouse `description` strings, both with and without `Co. No:`)
- [x] **Jargon sweep — AdminGuardPage.tsx:666** — "Connected to your JobFilter pipeline" → "Synced with your job tracker" (internal noun "pipeline" leak; matches the Job Tracker rename done in prior sweeps)
- [x] **Jargon sweep audit** — searched for remaining "Trade Command Centre"/"moat"/"signal engine"/"chase store"/"win store" — all clear except internal data-table keys (already render as "Edge" to users); "pipeline"/"intake" remaining instances are generic English about the tradesman's own workload, not product naming — sweep is now largely exhausted
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main (`8c61c10`)
- [ ] **Next run: Tier 2 features or fresh NEEDLE pass** — all Tier 1 Feature Roadmap items confirmed BUILT; jargon sweep largely exhausted. Consider Commercial lead detection (#12) or a new 4-agent NEEDLE/UX pass.
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 10 June 2026 (NightlyBuildAgent)

- [x] **Companies House lead enrichment built (Tier 1 quick win — "Companies House signals" Week 1-2 roadmap item)** — `getCompanySicLabel()` exported from `companiesHouseFetcher.ts`; new `src/lib/companyDetails.ts` parses "Incorporated: ... | SIC: ..." out of CompaniesHouse lead descriptions; `Lead`/`LeadDecision` types gained `description`/`source`; `FindJobsPage.trackLead()` persists them; `LeadDetailPage` shows a new "COMPANY DETAILS" panel (industry, incorporation date, company number) for paid users on CompaniesHouse leads, "COMPANY DETAILS LOCKED — unlocked at £39/mo" for free tier
- [x] **"Trade Command Centre" jargon — missed instance fixed** — AdminGuardTeaserPage.tsx:134 body copy → "TAX & ADMIN" (9 June sweep missed this one)
- [x] **"Moat" → "Edge"** — BlueprintPage SIGNAL SCOREBOARD column label (jargon already fixed once in body copy on 9 June, scoreboard header was missed)
- [x] **Duplicate UNLOCK CTA fixed (NEEDLE)** — FindJobsPage lead cards showed two "UNLOCK FULL LEAD →" buttons stacked on mobile/tablet for free-tier users; locked-fields column CTA now `hidden lg:grid` so each breakpoint shows exactly one
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main (`8e1103a`)
- [ ] **Spot-check COMPANY DETAILS panel** — verify against a real B14/commercial scan in DEMO_MODE; confirm regex matches real descriptions and panel renders cleanly desktop + 375px
- [ ] **Continue jargon sweep** — two more stray "Trade Command Centre"/"moat"/"signal engine" instances likely remain on less-trafficked Trade*/Compare* pages
- [ ] **Spot-check review nudge** — verify renders correctly once a paid test account has wins 24h+ old
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 9 June 2026 (NightlyBuildAgent)

- [x] **PATCH PULSE "IN DEMAND" summary built** — `extractTopJobTypes()` added to FindJobsPage; aggregates trade keywords from lead.reasons ("Trade match: X" for paid tier, "Trade teaser: X" for free tier); shows top 3 in PATCH PULSE bar as "IN DEMAND: EV CHARGER ×3 · REWIRE ×2" — gives tradesmen at-a-glance demand signal before scrolling leads
- [x] **"TRADE COMMAND CENTRE" jargon sweep** — 5 instances across AdminGuardPage (×3) and AdminGuardTeaserPage (×2); replaced with "TAX & ADMIN" and "MORE COMING FOR PAID MEMBERS" — opaque internal product noun removed from all public and paid-member pages
- [x] Build GREEN, TypeScript CLEAN, pushed to branch, PR #248 created
- [ ] **Verify "IN DEMAND" line on real B14 electrical scan** — if free-tier reasons are mostly generic (no trade teasers), the line won't show; may need title-keyword fallback
- [ ] **Spot-check review nudge** — verify renders correctly once a paid test account has wins 24h+ old
- [ ] **FaqPage audit** — confirmed clean this run (no violations, CTA section present)
- [x] **DashboardPage Admin Guard card** — "TRADE COMMAND CENTRE" fully removed; DashboardPage card already has "TAX & DEADLINES" micro-label which is consistent
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 8 June 2026 (NightlyBuildAgent — Run 3)

- [x] **24h Review Nudge built (Win Engine roadmap quick win)** — `generateReviewMessage()` existed but the roadmap quick win "add auto-prompt 24h after Won status" was never implemented. New nudge section on DashboardPage shows wins 24h–7d old where `reviewMessageSent` is not true: green-bordered panel with win title, pre-filled WhatsApp review request (Google link), "SEND ON WHATSAPP →" deep link, "MARK SENT" to permanently dismiss, soft "dismiss" for session. `reviewMessageSent?: boolean` added to WinJob type; `markReviewSent()` added to winStore. Closes Feature Roadmap Week 1-2 quick win.
- [x] **"Patch Plan" jargon sweep** — 4 surfaces had "Patch Plan" / "PATCH PLAN" as internal plan naming (SampleLeadCard ×2, QuickResponseKit, CityIntelligencePage ×3). Replaced with "£39/MO" — price is always more concrete than a plan name the tradesman has never seen on /pricing.
- [x] **"INTAKE ENGINE" → "FIND WORK"** — Footer section heading used internal product naming
- [x] **"ENTER THE INTAKE" → "SCAN FREE — NO CARD NEEDED"** — TradePage.tsx final CTA micro-label used internal "Intake" jargon (same class as TipsPage fix done last week)
- [x] **"moat" → "edge"** — NewsPage.tsx ECO4 article takeaway used MBA jargon in tradesman-facing copy
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main
- [ ] **Spot-check review nudge** — verify renders correctly once a paid test account has wins 24h+ old
- [ ] **FaqPage audit** — last touched 18 May; check for source naming violations or weak CTAs
- [ ] **DashboardPage Admin Guard card** — "TRADE COMMAND CENTRE" / "ADMIN GUARD" may need plain-English subtitle for new users
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 8 June 2026 (NightlyBuildAgent — Run 2)

- [x] **Wired `markLost()` into the lost-job flow — closes the Win Engine loop for real** — the "WHY YOU LOSE JOBS" section shipped earlier today read `getWinData().losses`, which is only populated by `winStore.markLost()`; that function was never called anywhere — `LeadDetailPage`'s lost-reason picker stored 4 ad-hoc free-text strings into a different pipe (`/api/leads/outcome`) that didn't even match the `LostReason` enum the dashboard section expects. **Net effect: the new section could never show real data for any tradesman.** Replaced the picker with the canonical 6-value `LostReason` enum + matching plain-language labels and call `markLost()` on confirm — verified live end-to-end with Playwright (mark lead LOST → reason → CONFIRM → localStorage populated → dashboard renders bars + tip correctly, desktop and 375px mobile)
- [x] **"Start Signal Engine" jargon fixed** — SignalsPage.tsx:187 micro-label "START SIGNAL ENGINE" → "START SIGNAL MODE" (internal-noun "engine" leak, same class as prior signal-stack/signal-engine fixes; now matches "Start Signal mode" used in the body copy directly below)
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main
- [ ] **Spot-check "WHY YOU LOSE JOBS" against a real paid test account** — the data pipe is now actually connected; first real chance to verify it populates correctly from genuine logged losses (not seeded data)
- [ ] **Audit win-engine features for the same "wired UI, unwired data" pattern** — confirm `getValueAccuracy()` (Quoted vs landed) and `getWinBreakdown()` populate correctly from `markWon()`/`markLost()` now that the loss side is fixed

## Today - 8 June 2026 (NightlyBuildAgent)

- [x] **Lost-reason analysis built (Win Engine quick win — closes the loop)** — `getLostReasonBreakdown()` existed in `winStore.ts` but was never wired to any screen; new "WHY YOU LOSE JOBS" section on DashboardPage shows a bar chart of logged loss reasons (price/timing/competition/etc) plus an actionable tip keyed to the top reason (e.g. "Most lost jobs go on price. Lead with a fast, no-obligation quote — speed often beats being cheapest."); verified live with seeded data + screenshots, desktop and 375px mobile, renders cleanly
- [x] **"Signal engine" jargon fixed** — ProductAdvantagePage.tsx (Vicinity note) "Powered by JobFilter's signal engine" → "Built on the same scans that power JobFilter" (internal noun leak, same class as Run 3 "signal stack" fix)
- [x] **"Intake" jargon fixed (missed instance)** — VicinityPage.tsx:713 "Intake feeds you the next job" → "JobFilter finds the next job" (Run 2's 8-instance Intake sweep missed this one)
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main
- [ ] **Spot-check "WHY YOU LOSE JOBS" with live loss data** — verify the tip and bars read sensibly once a paid test account has 5+ real logged losses (only seeded synthetic localStorage data in this container)
- [ ] **Continue jargon sweep** — search for "signal engine"/"chase store"/"win store" internal-noun leaks on less-trafficked product add-on / Trade* / Compare* pages (two instances found this run that prior sweeps missed — likely more)

## Today - 7 June 2026 (NightlyBuildAgent — Run 3)

- [x] **Free-tier preview teasers extended** — `buildPreviewReasons()` in `server/routes/leadsSearch.ts` now surfaces "Trade teaser: <high-intent keyword>" / "Trade teaser: commercial job" / "Trade teaser: urgent timeline" before falling back to the generic "Paid preview - unlock buyer..." line; closes the gap where many free-scan leads showed generic copy instead of a specific signal (Tier 1 "Trade-specific scoring UX" follow-up — renders via existing `parseTradeReasons()` badge path, no frontend change needed)
- [x] **"Signal stack" jargon fixed** — SignalsPage.tsx:233 "active signal stack" → "all ten signals" (internal noun leaking into customer copy)
- [x] **"Moat" corporate jargon fixed** — BlueprintPage.tsx:749 "Fusion is the moat" → "Stacking them isn't" (plain trade language, same meaning)
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main
- [ ] **Spot-check new free-tier teaser badges** — confirm "URGENT TIMELINE" / "COMMERCIAL JOB" badges render cleanly on mobile lead cards alongside existing "Trade teaser: <keyword>" badges in a live B14 scan

## Today - 7 June 2026 (NightlyBuildAgent — Run 2)

- [x] **Job value tracking built** — Tier 2 roadmap item #17 ("compare estimated vs actual job values"); `WinJob.estimatedValue` captured at win time, `getValueAccuracy()` in winStore.ts compares quoted band vs landed £, DashboardPage scoreboard shows "Quoted vs landed" stat (e.g. "+12% vs quote · 4 jobs"), client-side only (localStorage), no backend changes
- [x] **"Intake" jargon sweep (8 instances)** — internal "Intake"/"Intake Engine" naming replaced with plain trade language across BuildUkAlternativePage, CompareBuildAlertPage, CompareCheckatradePage (micro-labels "ENTER THE INTAKE" → "SCAN YOUR AREA FREE"), VantagePage (headline + body + CTA), SmartQuotePage (body), NewsPage (3× body copy)
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main
- [ ] **Spot-check "Quoted vs landed" stat with live win data** — verify % delta reads sensibly for over/under estimates once test account with logged wins exists
- [ ] **Continue jargon sweep** — "chase engine"/"signal stack"/"win store"/"chase store" internal nouns on less-trafficked Trade* and comparison pages

## Today - 7 June 2026 (NightlyBuildAgent — Run 1)

- [x] **"Share Your Win" image generator built** — new `ShareWinCard.tsx` component: canvas-rendered 1080×1080 brutalist PNG (jobs won, total value won, win rate, JobFilter wordmark) with DOWNLOAD + SHARE (Web Share API) buttons; wired into ROITracker, shows when `totalWon > 0`. Closes roadmap quick-win item.
- [x] **"Pipeline" jargon sweep (7 instances)** — FaqPage ("pipeline tracking" → "job tracking"), LeadDetailPage ("pipeline is low" → "work is quiet"), LeadListPage ("pipeline is light" → "work is quiet"), MethodologyPage + SignalsPage (micro-label "THE PIPELINE" → "HOW IT WORKS"), ProductAdvantagePage ("fills your pipeline" → "fills your week"), FindJobsPage FILL MY WEEK banner ("pipeline problem" → "leads problem")
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main
- [ ] **Spot-check ShareWinCard with live win data** — verify canvas text doesn't overlap for different digit counts (1 vs 12 jobs won); could not test live (no Supabase test data with `lead_outcomes` rows in this container)
- [ ] **Continue jargon sweep** — search "intake"/"chase engine"/"signal stack" leakage on Trade* pages, FreeToolsPage, comparison pages
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)

## Today - 6 June 2026 (NightlyBuildAgent — Run 3)

- [x] **FILL MY WEEK copy** — "Doesn't use your scan allowance. Searches {X} miles — wider than regular scan." + button changed to "EXPAND SCAN — 25MI →"
- [x] **"TRACKING IN CHASE" jargon** — FindJobsPage tracked lead button: "TRACKING IN CHASE" → "ALREADY TRACKING"
- [x] **Lead card complianceRisk removed** — "Next action: whatsapp · low risk" → "Best approach: whatsapp" (compliance risk is internal, not tradesperson language)
- [x] **evidenceCount copy** — "source links required before purchase/contact decisions" → "N verified signals backing this lead"
- [x] **DashboardPage value prop alignment** — territory-locked: now mentions both timing AND detail benefits; no-territory: explains detail gate + two CTAs (UNLOCK BUYER DETAILS + LOCK YOUR PATCH)
- [x] **FaqPage** — "pipeline is light" → "diary is quiet"
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- [ ] **DashboardPage header mobile** — new two-button row (UNLOCK BUYER DETAILS + LOCK YOUR PATCH) on dark ink background — verify renders cleanly at 375px
- [ ] **Free/paid story consistency audit** — PricingPage, SignupPage, HomePage: confirm "buyer details locked until paid" message present wherever free users make upgrade decision

## Today - 6 June 2026 (NightlyBuildAgent — Run 2)

- [x] **WhatsApp phone-aware links** — LeadDetailPage + LeadListPage: wa.me links now include buyer phone number when unlocked (wa.me/447PHONE?text=...) — one tap opens chat with buyer pre-selected + message pre-filled
- [x] **FindJobsPage upgrade banner** — "Pro unlocks" → "Founding 30 members see..." + named Checkatrade, Bark as not-shared-with confirmation
- [x] **HomePage sample lead copy** — "Structured signal / Real scoring shape" jargon replaced with specific job-data description; "ANOTHER FIRM" → "ANOTHER TRADE"; "Founder firms" → "Tradesmen who lock in now"
- [x] **ActivationPendingPage** — paid done-state "free scan while you wait" → "full access is live"; pre-checkout copy fix (no misleading "wait" period before Stripe redirect)
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main
- [ ] **Fill My Week CTA copy** — "FILL MY WEEK" button doesn't explain what it does vs. regular scan. Should say "EXPAND YOUR SCAN — 25mi radius, all sources, auto-ranked"
- [ ] **Free/paid value prop alignment** — Dashboard "first-mover timing" vs FindJobsPage "detail gate" contradicts. Pick one story across all pages.
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- [ ] **DashboardPage welcome banner mobile** — verify 3-step ol/li layout renders cleanly at 375px (structure confirmed clean, worth visual spot-check)

## Today - 6 June 2026 (NightlyBuildAgent — Run 1)

- [x] **Score threshold consistency fix** — GOLD/SILVER/BRONZE thresholds were 90+/75-89/60-74 across TrustCenterPage, MethodologyPage, LeadListPage, SeriousBuyerScore; corrected to match engine (GOLD 80+, SILVER 50-79, BRONZE below 50) across all 4 files
- [x] **TrustCenterPage tier table** — 4-tier (GOLD/SILVER/BRONZE/CHECK) → 3-tier matching engine; grid 4-col → 3-col; "90% of revenue" unvalidated stat removed; Eye import cleaned up
- [x] **BlueprintPage naming violations** — "Planning Data API" + "Planning London Datahub" → generic names
- [x] **LeadDetailPage paywall copy** — was "see WhatsApp template" but template already visible; fixed to "unlock buyer's phone number to send it"
- [x] **DashboardPage isEmpty trust signal** — "No credit card required — 3 free scans every week" added below CTA buttons
- [x] **SignupPage trust signal** — "No card required to create your account — payment comes after you confirm your email" added above trust badges
- [x] **Calendar ICS route verified** — /api/leads/calendar.ics functional, LeadDetailPage COPY CALENDAR LINK confirmed working
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- [ ] **DashboardPage welcome banner mobile** — verify 3-step ol/li layout renders cleanly at 375px (structure confirmed clean, worth visual spot-check)

## Today - 5 June 2026 (NightlyBuildAgent — Run 3)

- [x] **DashboardPage ?welcome=1 activation banner** — 3-step guide (scan → track → WhatsApp) shown to new paid users after Stripe checkout; dismisses to localStorage; Suspense wrapper added to app/dashboard/page.tsx
- [x] **FindJobsPage SEEN ENOUGH specificity** — "who needs the work, what it's worth, and when to call" → "buyer name, job value band, and direct contact link — locked on every lead above"
- [x] **LeadDetailPage locked section copy** — "compliance risk rating / next action script" jargon removed; plain trade language: "who to contact, what the job is worth, and a ready-to-send WhatsApp template"
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- [ ] **DashboardPage welcome banner mobile** — verify 3-step ol/li layout renders cleanly at 375px
- [ ] **LeadDetailPage ADD TO CALENDAR** — verify /api/leads/:id/calendar.ics route still functional

## Today - 5 June 2026 (NightlyBuildAgent — Run 2)

- [x] **WhatsApp templates exposed in QuickResponseKit** — Quick Quote + Avail. Check were in chaseTemplates.ts but unreachable from UI; added to WA_TEMPLATE_KEYS, reordered array for logical tab flow (First Touch → Quick Quote → 24h Follow-up → Avail. Check → Final Nudge)
- [x] **DashboardPage section colour identity** — SCAN section gets navy left-border (matches orange/green on TRACKING/RESULTS); all 3 micro-labels now coloured (navy/orange/green) instead of grey muted
- [x] **PricingPage competitor specificity** — named Checkatrade, MyBuilder, Bark, BuildAlert in objections; plan bullet uses "no shared auction, no five-trade blast" brand language
- [x] **PATCH PULSE source mix labels** — verified formatSourceLabel() already maps all internal source names correctly; no change needed
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- [ ] **DashboardPage INTAKE hero section** — top paid-user panel; check day-1 activation prompts (first scan, first WA send)
- [ ] **FindJobsPage upgrade nudge specificity** — "SEEN ENOUGH?" section could name the 3 specific fields unlocked (buyer name, job value band, direct contact)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 5 June 2026 (NightlyBuildAgent — Run 1)

- [x] **Trade-specific scoring teasers for free tier** — `buildPreviewReasons(lead)` extracts real trade keywords from scorer output (EV CHARGER, BOILER, REWIRE etc) and shows as grey teaser badges on free-tier lead cards; `parseTradeReasons()` updated to handle "Trade teaser:" format
- [x] **PATCH PULSE labels explained** — GOLD/SILVER/LOCKED now show "worth quoting now", "worth watching", "upgrade to see" inline sub-labels; muted locked count only shows when > 0
- [x] **LeadListPage jargon sweep** — "JOB PIPELINE" → "LEAD TRACKER"; GOLD threshold copy "90+" → "80+" (was wrong); two "pipeline" empty state references cleaned
- [x] **PricingPage Free Scan CTA** — "SCAN MY POSTCODE" → "SCAN FREE — NO CARD NEEDED" (only remaining inconsistent free CTA)
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- [ ] **DashboardPage YOUR INTAKE sections** — visual separation between SCAN SETUP / ACTIVE JOBS / SCOREBOARD still weak on mobile (medium refactor, defer)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 4 June 2026 (NightlyBuildAgent — Run 3)

- [x] **Stripe webhook TypeScript fixed** — Stripe v22 type changes for `Subscription.current_period_end` and `Invoice.subscription` patched with safe casts; `NonNullable` type fix for Supabase client params
- [x] **DashboardPage "PIPELINE" jargon removed** — PIPELINE → JOB TRACKER, NO PIPELINE YET → NO JOBS TRACKED YET, "leads in your pipeline" → "jobs you are tracking", "View chase list" → "View your jobs", YOUR PIPELINE → YOUR ACTIVE JOBS
- [x] **HomePage "Pipeline tracking" → "Job tracking"** — WHAT YOU GET section, body copy now specific
- [x] **TerritoriesPage pipeline jargon** — two instances replaced with plain trade language
- [x] **TrustCenterPage + ForYourTradePage + AdminGuardTeaserPage** — pipeline jargon removed (4 instances)
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main
- [ ] **PATCH PULSE unexplained labels** — GOLD/SILVER/LOCKED without explanation; add inline hint or tooltip
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- [ ] **DashboardPage YOUR INTAKE sections** — YOUR SCAN SETUP / YOUR ACTIVE JOBS / YOUR SCOREBOARD could use visual separation (medium refactor, defer)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 4 June 2026 (NightlyBuildAgent — Run 2)

- [x] **ActivationPendingPage TRADES alignment** — flat string array replaced with {value, label} matching SignupPage; all 11 trades present; backend now receives correct trade codes; Gas engineer + EV charger installer + Decorator/painter added
- [x] **FaqPage free scan CTA** — "SEE REAL LEADS IN YOUR AREA — FREE" block added above contact section; FAQ-convinced visitors now have conversion path
- [x] **FaqPage "territory exclusivity" → "territory lock"** — product rule compliance fix
- [x] **FaqPage trades list** — EV charger installer + gas engineer + decorator/painter added (matches SignupPage)
- [x] **SmartQuotePage hero copy** — Fear → Proof → Control structure applied; Bark + Checkatrade named; micro-label updated to "FREE TOOL — NO SIGNUP NEEDED"
- [x] **FindJobsPage paywall position** — free-tier upgrade banner moved from ABOVE leads to BELOW leads ("SEEN ENOUGH? UNLOCK BUYER DETAIL") — users see lead quality before the ask
- [x] Build GREEN, TypeScript CLEAN, pushed to main
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- [ ] **DashboardPage YOUR INTAKE sections** — YOUR SCAN SETUP / YOUR PIPELINE / YOUR SCOREBOARD conflated; needs visual separation (NEEDLE #3 — medium refactor, defer to dedicated run)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 3 June 2026 (NightlyBuildAgent — Run 3)

- [x] **QuickResponseKit email subject parsing** — email preview now shows subject in navy box + body below (matches LeadDetailPage; b3a2300 added email channel but preview showed raw "Subject: ..." inline)
- [x] **ActivationPendingPage "Postcode cluster" regression** — "Postcode cluster (e.g. B14, SW1, M20)" → "Your area (e.g. B14, SW1, M20)" (was fixed on SignupPage in Run 1 but missed on ActivationPendingPage)
- [x] **TipsPage CTA jargon** — "ENTER THE INTAKE →" → "SCAN MY AREA FREE →" + "No credit card required" trust line (NEEDLE fix — page CTA used internal jargon)
- [x] **FindJobsPage hero sub-line** — "Scan free — unlock full leads from £39/mo" → "3 free scans every week — no credit card" (NEEDLE fix — mixed free entry + paid ask before tradesman reaches scanner)
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- [ ] **Gas engineer / heat pump lead quality** — verify boiler/heating leads surface at top for plumbing trade in B14 scan
- [ ] **ActivationPendingPage TRADES list** — old flat list ("Heat Pumps") vs SignupPage's specific trades ("Heat pump installer") — consider aligning
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 3 June 2026 (NightlyBuildAgent — Run 2)

- [x] **PricingPage bottom CTA headline** — "LOCK THE ACCOUNT. THEN CONTROL THE JOBS." → "CLAIM YOUR PATCH. OWN THE JOBS." (NEEDLE fix: "lock" appeared twice; "claim" = urgency, "own" = empowering)
- [x] **PricingPage free CTAs** — both "SCAN FREE FIRST" buttons → "SCAN FREE — NO CARD NEEDED" (trust signal now in button label; consistent with rest of site)
- [x] **TerritoriesPage table column** — "Area model" → "Avg job value" (was meaningless jargon; column shows "£2k–£9k avg job" data)
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- [ ] **Gas engineer / heat pump lead quality** — now that gas engineers can sign up correctly (as of Run 1), verify boiler/heating leads surface at top for plumbing trade in B14 scan
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 3 June 2026 (NightlyBuildAgent — Run 1)

- [x] **Build error fixed** — score/route.ts had duplicate variable block (qualityLabel, leadUrgency, lead, persistence, whatsapp declared twice); removed duplicate block + cleaned return statement of duplicate keys
- [x] **SignupPage TRADES dropdown expanded** — added Gas engineer, EV charger installer, Heat pump installer, Decorator/painter with readable labels; internal trade keys correctly mapped (gas→plumbing, heat pump→hvac, ev charger→electrical)
- [x] **LeadListPage "60% drop" stat softened** — "drops 60% after 24 hours" → "drops significantly after 24 hours" (unvalidated precision removed)
- [x] **LeadListPage TIP banner gated on leads** — TIP now hidden when list is empty (was confusing for new users with no tracked leads)
- [x] **DashboardPage patch-locked confirmation made prominent** — "Gold leads shown to you first" now text-sm/yellow instead of text-xs/white/60 (paying users now get clear patch confirmation, not a faint footnote)
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- [ ] **Homepage "Energy: F/G" signal bubble** — floating hero bubble uses F/G rating letters; consider changing to "Energy: LOW" to remove EPC F/G association
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 2 June 2026 (NightlyBuildAgent — Run 4)

- [x] **DashboardPage territory urgency** — text-xs/60% → text-sm/90%; "Another trade could claim your area today" added; button "LOCK YOUR PATCH NOW →"; QUICK ACTIONS section adds "Founder price £39/mo — no shared auction, no credit burn" context
- [x] **LeadListPage trust line prominence** — text-xs/60% → text-sm/80%; "No credit card required" → "No credit card required — 3 free scans every week"
- [x] **SignupPage "Postcode cluster" jargon** — regression fixed: "Postcode cluster (e.g. B14, SW1, M20)" → "Your area (e.g. B14, SW1, M20)" — was fixed in May 26 run but regressed in merge
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main
- [x] **LeadListPage "60% drop" stat** — DONE (3 June Run 1)
- [x] **SignupPage TRADES dropdown** — DONE (3 June Run 1)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 2 June 2026 (NightlyBuildAgent — Run 3)

- [x] **SignalsPage "EXCLUSIVE TERRITORY PROTECTION"** — fixed to "TERRITORY LOCK ACTIVE" (product rule compliance)
- [x] **CompareMyBuilderPage signals count** — "Signals per scan" row added ("10 verified signals per scan") + EPC/land-registry naming violation fixed
- [x] **CompareTrustATraderPage** — 3 naming violations fixed (EPC, land registry, planning portals); "Signals per scan" row added; "No credit card required" trust line added
- [x] **CompareRatedPeoplePage** — 4 naming violations fixed (EPC, land registry × 4 instances)
- [x] **CompareBarkPage** — 3 naming violations fixed (EPC × 3 instances)
- [x] **DashboardPage isEmpty "Patch Plan" jargon** — "the Patch Plan pays for itself" → "£39/mo pays for itself 50 times over — no shared auction, no credit burn"
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- [ ] **DashboardPage territory CTA urgency** — NEEDLE #2: "you're racing every other trade" + "LOCK YOUR PATCH NOW" scarcity language
- [ ] **LeadListPage trust line prominence** — NEEDLE #3: move "No credit card required" higher / larger text near first CTA
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 2 June 2026 (NightlyBuildAgent — Run 2)

- [x] **Stage-aware WhatsApp templates on LeadListPage** — `getChaseLeads()` cross-referenced; following_up/contacted leads now get `follow_up_24h` template + "SEND FOLLOW-UP" button label; not_contacted keeps first_touch_2h
- [x] **"FIVE SIGNALS. ONE SCAN." copy fixed** — BuildUkAlternativePage, CompareBuildAlertPage, CompareCheckatradePage all updated to "TEN SIGNALS. ONE SCAN." + 5 new signal cards each (HMO, Building Control, Auction, Void Premises, Retrofit Grants)
- [x] **WeeklySignalsPage heading** — "TEN SOURCES. ONE SCAN." → "TEN SIGNALS. ONE SCAN."
- [x] **"Exclusive" product rule violations removed** — 6 instances across BlueprintPage, BuildUkAlternativePage, CompareBuildAlertPage, CompareBarkPage fixed to "No shared auction" approved language
- [x] **CompareMyBuilderPage EPC violation** — "EPC signals" → "energy signals" in comparison table + "No credit card required" trust line added to hero
- [x] **DevPortalPage env var** — VITE_OPEN_ACCESS=true → NEXT_PUBLIC_OPEN_ACCESS=true
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- [ ] **SignalsPage "EXCLUSIVE TERRITORY PROTECTION"** — line 250 has "EXCLUSIVE" in footer badge; check if product rule violation (territory lock context may make it OK)
- [ ] **CompareMyBuilderPage signals count** — table has no signal count for JobFilter; add "10 signals" row
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Today - 2 June 2026 (NightlyBuildAgent — Run 1)

- [x] **Trade scoring reasons on LeadListPage** — `scoreReasons` persisted to localStorage when tracking leads; `tradeHighlights()` parser added; yellow badges ("EV CHARGER — YOUR TRADE", "BOILER — YOUR TRADE") now visible on pipeline cards
- [x] **WeeklySignalsPage copy** — removed corporate "Modelled estimates" disclaimer; hero CTA → "SCAN YOUR AREA FREE →"; "No credit card required" trust line added; bottom pricing line cleaned up
- [x] **EpcPage CTA** — "SCAN MY AREA FREE →" + "No credit card required" trust line added (consistent with all other free CTAs)
- [x] **LeadDetailPage silver copy** — "availability check template below" was inaccurate for not_contacted leads; fixed to "use the WhatsApp templates below"
- [x] **commercialOnly filter** — confirmed FILL MY WEEK already calls setCommercialOnly(false) at line 354 (no fix needed)
- [x] **WeeklySignalsPage/SignalsPage copy audit** — DONE (WeeklySignals fixed; SignalsPage CTA section already had correct trust copy)
- [x] Build GREEN (106 pages), TypeScript CLEAN, pushed to main
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **SignalsPage heading fix** — "FIVE SOURCES. ONE SCAN." is inaccurate (there are 10 signals). Update to "TEN SIGNALS. ONE SCAN."
- [ ] **Commercial lead COMMERCIAL badge** — verify backend actually sets `isCommercial` flag on real scan results (not just demo data)

## Today - 1 June 2026 (NightlyBuildAgent — Run 2)

- [x] **LeadCard "EXCLUSIVE · NOT SHARED" badge** — product rule violation fixed; changed to "NO SHARED AUCTION" (approved language from Problems and Solutions.md)
- [x] **Flag Bad Lead wired to backend** — `POST /api/leads/flag` endpoint added; `handleFlagLead()` now calls backend; copy fixed ("credit noted" → "We'll review it")
- [x] **DashboardPage win rate bug** — was always 100% (markLost never called); now derived from chaseLeads stage tracking which reflects real user actions
- [x] **NewsPage CTA** — "SCAN MY POSTCODE →" → "SCAN MY POSTCODE FREE →" + "No credit card required" trust line added
- [x] **TrustCenterPage CTA** — "TRY FREE SCAN" → "SCAN MY AREA FREE →" + "No credit card required" trust line added
- [x] **LeadListPage OUTCOMES strip value** — confirmed already built (£X,XXX won in WON strip, line 105-109)
- [x] **FreeToolsPage isPaywalled** — confirmed `const isPaywalled = false` is correct
- [x] Build GREEN (98 pages), TypeScript CLEAN, pushed to main
- [ ] **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys)
- [ ] TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- [ ] n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- [ ] **Commercial lead detection UX** — verify FILL MY WEEK resets commercialOnly filter after recent changes
- [ ] **WeeklySignalsPage/SignalsPage copy audit** — not polished recently; check for weak CTAs and violations

## Today - 1 June 2026 (NightlyBuildAgent — Run 1)

- [x] **Dashboard isEmpty LOCK YOUR PATCH CTA** — yellow button added to isEmpty block alongside RUN YOUR FIRST SCAN and SEE PRICING (new users with no territory get direct path)
- [x] **Dashboard scan counter reset note** — "X of 3 used · resets Mon" replaces ambiguous "X of 3 free used" (matches FindJobsPage which had this since 22 May)
- [x] **Dashboard avg per win stat** — "Avg per win: £X,XXX" row added to YOUR SCOREBOARD when wins > 0 (tradesmen can now benchmark job values)
- [x] **CompareBarkPage CTA copy** — "Stop paying per lead. Start scanning smarter." → "Bark credits burn. Your pipeline doesn't have to." + stronger body copy + "SCAN MY AREA FREE — NO CARD" button
- [x] Build GREEN (98 pages), TypeScript CLEAN, pushed to main

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
