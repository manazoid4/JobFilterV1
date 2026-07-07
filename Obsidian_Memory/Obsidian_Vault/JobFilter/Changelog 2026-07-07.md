# Changelog 2026-07-07 (NightlyBuildAgent — Run 1)

**Commit:** `156d0f0`
**Branch:** main
**Build:** GREEN (113 pages)
**TypeScript:** CLEAN

---

## CONTAINER STATE

Fresh container. `npm install` (359 packages). HEAD synced to `origin/main` at `9ea0b17` (Jul 6 Run 3 vault commit). Build GREEN, TS CLEAN before changes. No new founder commits or open PRs since last run.

---

## PHASE 1 — FIX BROKEN

No broken imports, no fake flows. Clean build confirmed.

---

## PHASE 2 — TIER 1 FEATURES

All Tier 1 features confirmed BUILT (same as all recent runs). Agent prompt list remains stale — no new features to build this run.

---

## PHASE 3 — COPY POLISH + UX FIXES

### 1. FindJobsPage — AlertQuickSetup raw trade label (carryover from Jul 6 Run 3)

- Added `TRADE_FRIENDLY: Record<string, string>` map above `AlertQuickSetup` component (same values as DashboardPage's `TRADES` array)
- Raw API value `{trade}` (e.g. "electrical") → friendly `{tradeLabel}` (e.g. "Electrician") in:
  - Success confirmation: "✓ WEEKLY ALERT SET — we'll email when new **Electrician** leads appear near B14"
  - Body text: "Get weekly email alerts for **Electrician** jobs near B14"
- Closes known carryover from Run 3 daily to-do

### 2. AdminGuardPage — paywall hero CTA

- Primary yellow button on the deadlines/admin paywall screen: `SEE PRICING →` → `LOCK YOUR PATCH — £39/MO →`
- Highest-intent authenticated page now has a deliverable CTA at the conversion moment

### 3. AdminGuardTeaserPage — closing section CTA

- Secondary ink button in the yellow "bigger picture" section: `SEE PRICING →` → `LOCK YOUR PATCH — £39/MO →`
- Matches pattern applied to FAQ, TrustCenter, WeeklySignals, Blueprint, News, Tips

### 4. CompareBuildAlertPage — CTA inversion fixed

- Comparison table bottom CTAs were inverted: ink on "SCAN FREE" (should be yellow = primary), yellow on "SEE PRICING" (should be secondary)
- Swapped: free scan → yellow, pricing → ink
- Label: `SEE PRICING` → `LOCK YOUR PATCH — £39/MO →`

### 5. CompareCheckatradePage — CTA inversion fixed

- Same inversion pattern as CompareBuildAlertPage in the comparison table section
- Swapped: free scan → yellow, pricing → ink
- Label: `SEE PRICING` → `LOCK YOUR PATCH — £39/MO →`

### 6. ForYourTradePage — "No credit card required" text size + pricing CTA

- `text-[10px] text-[var(--ink)]/50` on "No credit card required" → `text-xs text-[var(--ink)]/60` (10px is below minimum readable size)
- `SEE PRICING — FROM £39/MO` → `LOCK YOUR PATCH — £39/MO →` (deliverable + arrow)

### 7. FreeToolsPage — two "No credit card required" text size fixes

- Quick Start CTA section: `text-[10px]/50` → `text-xs/60`
- Free/paid comparison table section: `text-[10px]` → `text-xs`
- Both are below the free scan CTA where users are about to act — invisible trust signal now legible

---

## PHASE 4 — SITE HEALTH CHECK

- NEEDLE: Top issues found were (1) CTA inversions on two compare pages, (2) raw trade label in AlertQuickSetup, (3) SEE PRICING paywalls without deliverables
- BUILDER: Fixed all of the above (7 changes across 6 files)
- CRITIC: All CTAs now say what you get (patch, trade, price) in <3 seconds ✓
- REVENUE: Yes — removing SEE PRICING gates from paywall moments and compare pages increases conversion likelihood

---

## REMAINING CARRYOVER BLOCKERS (unchanged)

- **Founder decision — add-on service pricing**: 14 add-on services still have no £ shown
- **Stripe live test**: blocked on test keys in Vercel
- **TradeFlow "Send to TradeFlow" button**: blocked on URL scheme from founder
- **n8n workflow 16 (LLM Brief Builder)**: blocked on SMTP creds + manual activation
- **Do NOT delete `vite.config.ts`/`index.html`**: confirmed in use by `server/app.ts`

---

## NEXT RUN PRIORITIES

1. Check for new founder commits/PRs first
2. Remaining `SEE PRICING` instances: SmartQuotePage (secondary, low priority), BuildUkAlternativePage line 263 (STANDARD tier card, low priority)
3. Consider sweeping authenticated pages (LeadListPage, TradieZonePage) for any copy drift
