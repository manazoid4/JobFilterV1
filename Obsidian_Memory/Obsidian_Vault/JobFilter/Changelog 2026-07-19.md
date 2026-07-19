# Changelog — 19 July 2026 (NightlyBuildAgent)

**Commit:** `5c931f4`
**Build:** GREEN (Next.js, all routes static + API proxy)
**TypeScript:** CLEAN

---

## Phase 1 — Build Check
- Fresh container; npm install required (node_modules absent — 359 packages)
- Build GREEN after install. TypeScript CLEAN.
- No broken imports, no fake flows detected
- No new founder commits or open PRs since Run 3

## Phase 2 — Tier 1 Features
- All Tier 1 features confirmed BUILT (WhatsApp templates incl. Quick Quote + Availability Check, scan counter, won leaderboard, Google Calendar ICS, trade-specific scoring)
- No new feature needed this run

## Phase 3 — Copy Polish

### TradePage.tsx — pricing section body paragraphs (3 fixes, all 21 trade pages)
- Line 292: `text-xl font-black` → `text-xl font-bold` on 2-sentence pricing description ("Free shows you the signals. Founding 30 unlocks...")
- Line 317: `font-black` → `font-bold` on standard plan body ("Full access at standard price. Available after founder slots are gone.")
- Line 332: `font-black` → `font-bold` on add-ons section intro ("Optional services built specifically for {trade}. Submit a job, get a deliverable back. No subscription — book as needed.")
- Pricing section is the conversion moment on every trade page; body copy now reads cleanly

### PricingPage.tsx — body paragraphs (5 fixes)
- Guarantee description paragraph: `text-lg font-black` → `text-lg font-bold` (3-sentence paragraph)
- "What one month looks like" intro paragraph: `font-black` → `font-bold`
- FAQ/objections answer paragraphs: `font-black` → `font-bold` (affects all 4 Q&As — multi-sentence answers)
- Add-on services description paragraph: `font-black` → `font-bold` (2-sentence paragraph)
- PlanCard body prop text: `font-black` → `font-bold` (affects both Free + Founder plan descriptions)
- PricingPage is the #1 conversion page; readable body copy = lower cognitive friction at point of purchase

### NotFoundPage.tsx — micro-label colour fix (6 fixes)
- All 6 `text-[var(--green)]` micro-labels on nav chip cards → `text-[var(--orange)]`
- Affected: HOME, FIND JOBS, PRICING, PIPELINE, SIGNALS, FREE TOOLS cards
- Design rule: green = data signals only; navigation category labels use orange
- Low-traffic page, but green on white nav chips was a design rule violation

## Phase 4 — NEEDLE / BUILDER / CRITIC / REVENUE

**NEEDLE** — DashboardPage.tsx line 286: `SEE OPEN TERRITORIES →` was a ghost button (`border-2 border-white/30 bg-white/10 text-white`) on the dark ink background. Appears exclusively for free-tier users who haven't locked a patch — the critical conversion moment (they can see leads but buyer details are hidden).

**BUILDER** — DashboardPage.tsx line 286: `border-2 border-white/30 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-white` → `jf-button bg-white text-[var(--ink)] text-xs py-1.5 px-3`. Solid white on ink background, high contrast.

**CRITIC:** YES — solid white button on dark ink background reads in <3 seconds; clearly distinguishable from background

**REVENUE:** YES — "SEE OPEN TERRITORIES" leads users to understand their patch is available → feeds directly into conversion to £39/mo. Ghost button was invisible; fix directly unblocks the conversion path. This matches the same ghost-button fix pattern applied to CityPage, WeeklySignalsPage, BlueprintPage, AdminGuardPage, and WeeklySignalsPage in prior runs.

---

## Carryover Blockers (unchanged)
- Founder decision: 14 add-on services still have no £ shown
- Stripe live test: blocked on test keys in Vercel
- TradeFlow button: blocked on URL scheme from founder
- n8n workflow 16: blocked on SMTP creds + manual activation

## Next Run Priorities
1. Check founder commits/PRs first
2. Audit remaining `font-black` on multi-sentence paragraphs in pages not yet swept: AccountSettingsPage, VerifyPage, AdminPage — grep for remaining instances
3. NotFoundPage: consider whether `text-[var(--navy)]` would be better than `text-[var(--orange)]` for nav chip micro-labels — orange is section-label style, navy might be cleaner
4. Look for more ghost buttons on authenticated pages (DashboardPage, LeadDetailPage, AccountPage)
5. Carryover blockers remain the main unlock
