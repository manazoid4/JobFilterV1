# Changelog — 17 July 2026 (NightlyBuildAgent — Run 2)

**Commit:** `81924f0`
**Build:** GREEN (113 pages)
**TypeScript:** CLEAN

---

## Phase 1 — Build Check
- Fresh container; npm install (Next.js stack)
- Build GREEN immediately after install
- No broken imports, no fake flows
- No new founder commits or open PRs since Jul 17 Run 1

## Phase 2 — Tier 1 Features
- All Tier 1 features confirmed BUILT from prior runs
- No new feature needed this run

## Phase 3 — Copy Polish

### AccountPage — free-tier upgrade copy
- Old: "Free tier: 3 scans a week. Gold lead details are locked — only paid members see the contact path and quote timing. Checkatrade charges £300+ for the same reach."
- New: "You're on free. 3 scans a week, no contact details. The homeowner name, phone, and quote window are locked behind paid access. Checkatrade takes £300+ for that same visibility. You get it for £39/mo."
- Fear→proof→control applied: specific (homeowner name, phone, quote window), price anchor, competitor named

### LoginPage — headline uppercase
- `h1` "Sign in" → "SIGN IN"
- Matches all-caps brutalist design system (was the only mixed-case h1 in the app)

## Phase 4 — NEEDLE / BUILDER / CRITIC / REVENUE

**NEEDLE sweep** — WeeklySignalsPage + BlueprintPage (hadn't been swept for non-font UX issues):

Top 3 issues found:
1. **BlueprintPage final CTA (line 971)** — CRITICAL: `LOCK YOUR PATCH — £39/MO →` was `bg-[var(--yellow)]` on `bg-[var(--yellow)]` section — completely invisible paid CTA
2. **BlueprintPage double arrows (lines 690, 968)** — `SCAN MY AREA FREE →` had both literal `→` AND `<ArrowRight />` icon, rendering as `→ →`
3. **WeeklySignalsPage hero alert button (line 305)** — `GET WEEKLY ALERTS →` was `bg-white/10` (ghost/near-invisible) on navy background

**BUILDER** — all 3 issues fixed (4 files):

BlueprintPage:
- Hero: removed `<ArrowRight />` icon from `SCAN MY AREA FREE →` (text already had arrow)
- Final CTA: removed `<ArrowRight />` icon from second `SCAN MY AREA FREE →`
- Final CTA: `LOCK YOUR PATCH — £39/MO →` changed `bg-[var(--yellow)] text-[var(--ink)]` → `bg-[var(--navy)] text-white` (navy on yellow = solid, visible secondary CTA)
- Removed `ArrowRight` from lucide-react import (unused after above fixes)

WeeklySignalsPage:
- `GET WEEKLY ALERTS →` changed `bg-white/10 text-white border-white/20 shadow-none hover:bg-white/20` → `bg-white text-[var(--ink)]` (solid, full contrast)

**CRITIC:** YES — paid CTA visible immediately on yellow background; ghost button now solid; no double arrows

**REVENUE:** YES — BlueprintPage paid CTA was completely invisible to anyone who scrolled to the bottom. Fix directly unblocks conversion path. WeeklySignals alert signup now clickable by all users.

---

## Carryover Blockers (unchanged)
- Founder decision: 14 add-on services still have no £ shown
- Stripe live test: blocked on test keys in Vercel
- TradeFlow button: blocked on URL scheme from founder
- n8n workflow 16: blocked on SMTP creds + manual activation

## Next Run Priorities
1. Check founder commits/PRs first
2. WeeklySignalsPage NEEDLE still has: hero CTA hierarchy (free ink > paid navy on yellow bottom CTA) — could elevate paid CTA prominence there
3. Consider sweep on ForgotPasswordPage and ActivationPendingPage for any copy drift
4. Carryover blockers remain the main unlock
