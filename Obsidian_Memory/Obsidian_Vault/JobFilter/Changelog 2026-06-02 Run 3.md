# Changelog 2026-06-02 Run 3 — NightlyBuildAgent

**Commit:** `39ba368`
**Branch:** main (pushed directly)
**Build:** GREEN (106 pages) | TypeScript: CLEAN

---

## Pre-Flight

- npm install (fresh container — node_modules missing)
- `npm run build` → GREEN (106 pages)
- `npx tsc --noEmit` → CLEAN (0 errors)
- Read vault: Feature Roadmap, Problems and Solutions, Changelog 2026-06-02 Run 2, Daily To-Do

---

## Phase 1 — Fix Broken

Nothing broken. Build was green from first run.
All Tier 1 features confirmed as already built: scan counter, calendar ICS, WinStatsBanner, WhatsApp templates (quick_quote_offer + availability_check), trade scoring UX.

---

## Phase 2 — Feature

No new Tier 1 features unbuilt. Addressed two open items from previous run's Next Run Priorities:

### SignalsPage — EXCLUSIVE violation fixed

Line 250 footer badge: `EXCLUSIVE TERRITORY PROTECTION` → `TERRITORY LOCK ACTIVE`

**Why:** "EXCLUSIVE" in any form risks implying no other trade can ever see a lead (product rule violation per Problems and Solutions.md). "TERRITORY LOCK ACTIVE" is accurate (territory locking is real) and avoids the exclusivity claim.

### CompareMyBuilderPage — signals count + naming fix

Added `Signals per scan` row to comparison table: `None — request-based only` vs `10 verified signals per scan`

Fixed naming violation in model description card: "We scan planning data, council tenders, EPC and land registry" → "We scan planning data, council tenders, energy signals and ownership data"

---

## Phase 3 — Copy Polish

### CompareTrustATraderPage (3 fixes + 1 addition)

1. Comparison table row 1: `Planning applications, council contracts, ownership signals & EPC data` → `Planning approvals, council contracts, ownership signals & energy data`
2. Added `Signals per scan` row: `None — profile-based only` vs `10 verified signals per scan`
3. JobFilter model card: `We scan planning portals, council contracts, and land registry` → `We scan planning approvals, council contracts, and ownership signals`
4. Added trust line under hero CTA: `No credit card required — 3 free scans every week`

### CompareRatedPeoplePage (4 naming violations fixed)

1. Comparison table lead source: `EPC, land registry` → `energy signals, ownership data`
2. Energy upgrade signals row: `retrofit demand mapped from EPC data` → `retrofit demand mapped from energy signal data`
3. Hero body: `council contracts, and EPC signals` → `council contracts, and energy signals`
4. JobFilter model card: `Government planning, council tenders, land registry, EPC data` → `Planning approvals, council tenders, ownership data, energy signals`

### CompareBarkPage (3 naming violations fixed)

1. Comparison table lead source: `EPC signals` → `energy signals`
2. Energy retrofit row: `EPC-backed retrofit demand` → `energy-signal-backed retrofit demand`
3. JobFilter model card: `EPC, land registry signals` → `energy signals and ownership data`

---

## Phase 4 — Site Health Check

### NEEDLE findings (top 3)

1. **DashboardPage isEmpty — "Patch Plan" jargon** — tradesperson on first visit doesn't know what "Patch Plan" means without context → FIXED
2. **DashboardPage — weak territory CTA urgency** — low pressure on territory lock conversion → (noted for next run)
3. **LeadListPage — "No credit card required" text size** — buried at tiny text; should be higher/larger (noted for next run)

### BUILDER fix (highest-impact)

**DashboardPage isEmpty**: `Find a job before Checkatrade lists it. One £2,000 win and the Patch Plan pays for itself — founding rate £39/mo, no shared auction.`

→ `Find a job before Checkatrade lists it. One £2,000 win and £39/mo pays for itself 50 times over — no shared auction, no credit burn.`

**CRITIC:** Clear in <3 seconds? YES — £39/mo is instantly understood; the 50× maths creates urgency
**REVENUE:** Increases £39/month likelihood? YES — price anchors against a concrete win scenario before first scan

---

## Source Naming Rule Sweep Summary

Total EPC/land registry/planning portal violations fixed this run: **10 across 4 pages**

Remaining known issues: TestConsolePage.tsx has EPC/Companies House labels — this is a dev admin page, not user-facing (acceptable).

---

## Metrics

- Files changed: 6
- Lines: +15, -12
- Build: GREEN (106 pages)
- TypeScript errors: 0
- Naming violations fixed: 10
- Copy improvements: 2 pages

---

## Next Run Priorities

1. **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (blocked on test keys in Vercel)
2. **DashboardPage territory CTA urgency** — "you're racing every other trade" copy + "LOCK YOUR PATCH NOW" scarcity push
3. **LeadListPage trust line prominence** — move "No credit card required" to higher position / larger text near first CTA
