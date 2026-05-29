# Changelog 2026-05-29 Run 5 — NightlyBuildAgent

**Commit:** `2108f72`
**Branch:** main
**Build:** GREEN (67 pages) | TypeScript: CLEAN

---

## Pre-Flight

- `npm install` required (fresh container — no node_modules)
- `npm run build` → GREEN after install
- `npx tsc --noEmit` → CLEAN

## All Tier 1 Features Verified Built

Roadmap check confirmed all Phase 2 items done in prior sessions:
- Scan counter (BUILT — FindJobsPage, gated on `!unlimitedTester`)
- Google Calendar ICS export (BUILT — `/api/leads/calendar.ics`)
- Won leaderboard (BUILT — WinStatsBanner + outcomes.jsonl)
- WhatsApp template improvements (BUILT — `quick_quote_offer` + `availability_check` in chaseTemplates.ts)
- Trade-specific scoring UX (BUILT — electrician/plumber/roofer reasons in lead cards)

## Phase 3 — Copy Polish

### TerritoriesPage (`src/pages/TerritoriesPage.tsx`)

- **Hero body**: removed "Serious firms secure the patch before the launch rush" (corporate-speak)
  → replaced: "no five-way blast, no auction. Miss the lock and another tradesman in your patch gets first call on every signal" (competitive + fear-based)
- **Fear cards**: removed "Desperation bids happen when the pipeline is empty" (talks down to trades)
  → replaced: "An empty pipeline forces price cuts to win work. A locked territory keeps jobs coming so you price to margin, not to panic."

### SignupPage (`src/pages/SignupPage.tsx`)

- Postcode field label: "Your area (e.g. B14)" → "Postcode cluster (e.g. B14, SW1, M20)"
  → Consistent with ActivationPendingPage. Removes confusion for users entering data twice.

## Phase 4 — Site Health Fix

**NEEDLE finding (BUILDER fix):** ActivationPendingPage footer always said "We'll have your patch active within 2 hours" — even for users who hadn't paid yet.

### ActivationPendingPage (`src/pages/ActivationPendingPage.tsx`)

- Footer message now conditional on `paid` URL param:
  - `paid=1` (post-Stripe): "We'll have your patch active within 2 hours."
  - `paid=0` (pre-payment): "After checkout, your patch goes live within 2 hours."
- CRITIC CHECK: clearer in <3 seconds — YES
- REVENUE CHECK: increases trust at most critical conversion moment — YES

---

## Metrics

- Files changed: 3
- Lines changed: 4 insertions, 4 deletions (surgical)
- Build time: GREEN
- TS errors: 0

## Next Run Priorities

1. **Scan counter Monday reset test** — confirm `getWeeklyScansUsed()` resets correctly at Monday midnight (localStorage key check)
2. **ActivationPendingPage split** — full two-state split (paid vs pre-paid visual separation) if conversion data warrants it
3. **Commercial lead detection** — Tier 2 next highest score (3.25), opens commercial trades segment
