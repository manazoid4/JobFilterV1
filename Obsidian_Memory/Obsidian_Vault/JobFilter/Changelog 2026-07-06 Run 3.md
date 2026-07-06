# Changelog — 6 July 2026 (NightlyBuildAgent — Run 3)

**Commit:** `cedd665`
**Build:** GREEN (113 pages)
**TypeScript:** CLEAN

---

## Context

PR #329 "Agents/jobfilter launch ready" landed between Run 2 and Run 3. It squash-merged to a no-op tree (identical to c0c40fd / PR #328). The 5 new features (AlertSetupWidget, deadline countdown, WHY? toggle, SourceHealthStrip, AlertQuickSetup) were already in the codebase. No new founder commits after #329.

Container had a git issue: local `origin/main` was stale (cached at June 28 vault digest). Resolved with `git fetch origin` before committing.

---

## Changes

### 1. FindJobsPage — WHY? panel now shows human-readable labels

**File:** `src/pages/FindJobsPage.tsx`

The WHY? toggle (new in PR #329) was rendering `rawReasons` — raw engine strings like `"Trade match: ev_charger,rewire (electrical)"`. The `parsedReasons` variable was already computed on every lead card by `parseTradeReasons()` but was never rendered.

Fixed: swap `rawReasons.slice(0,8)` for `parsedReasons` in the toggle panel. Trade matches now show `"EV CHARGER — YOUR TRADE"` highlighted in ink; other signals show `"JUST POSTED"`, `"URGENT"`, `"GOOD VALUE"` in muted. Clearer for a tradesman in under 2 seconds.

### 2. DashboardPage — active alerts chips show friendly trade label

**File:** `src/pages/DashboardPage.tsx`

Active alerts chips showed the raw API value: `"electrical · B14 · weekly"`. Fixed with a TRADES lookup: `TRADES.find(t => t.value === a.trade)?.label ?? a.trade` → `"Electrician · B14 · Weekly"`. Closes the known carryover from Jun 6 Run 2.

### 3. TipsPage — "SEE PRICING" replaced with deliverable CTA + ROI

**File:** `src/pages/TipsPage.tsx`

Bottom CTA had `"SEE PRICING"` (no deliverable, no price, no ROI) as the secondary action. Replaced with `"LOCK YOUR PATCH — £39/MO →"` (navy, secondary per design rules). Added ROI anchor: `"One job worth chasing covers 12+ months at £39. Average UK trade job: £800–£3,000."` Matches the pattern applied to FAQ, TrustCenter, WeeklySignals, Blueprint, and News pages in previous runs.

---

## Carryover (unchanged)

- Founder decision — add-on service pricing: 14 add-on services have no £ shown
- Stripe live test — still blocked on test keys in Vercel
- TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation
- Do NOT delete `vite.config.ts`/`index.html` — confirmed in use by `server/app.ts`
