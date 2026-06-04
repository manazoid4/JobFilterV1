# Changelog 2026-05-30 Run 1 — NightlyBuildAgent

**Commits:** `e922d94`, `b94b094`
**Branch:** main
**Build:** GREEN (95 pages) | TypeScript: CLEAN

---

## Pre-Flight

- `npm install` required (fresh container — no node_modules)
- `npm run build` → GREEN (95 pages, 95/95 compiled)
- `npx tsc --noEmit` → CLEAN
- WhatsApp templates `quick_quote_offer` + `availability_check` confirmed already BUILT in prior runs
- All Tier 1 features confirmed BUILT from prior runs

---

## Phase 2 — Commercial Detection Expansion

### `leadEngine/normaliser.ts`

**Priority:** Flagged in Run 7 next-run priorities.

**Added to COMMERCIAL_KEYWORDS:**
- `'hmo'`, `'house in multiple occupation'` — HMO licensing is already a source system; now the keyword also catches HMO mentions in planning/contract text
- `'apartment block'`, `'block of flats'` — multi-unit residential projects are high-value for plumbers (boiler systems, bathrooms × N units) and electricians (rewires, fire alarms, EV infrastructure)
- `'student accommodation'`, `'student housing'` — recurring maintenance + fit-out contracts, often commercial buyer
- `'purpose built'`, `'co-living'` — modern multi-occupancy signal

**Why it matters:** A student accommodation block for 80 people needs full electrical + plumbing infrastructure. These are among the highest-value leads for electricians and plumbers. Previously they could score SILVER even if the job value was £50k+.

---

## Phase 3a — MethodologyPage Copy Polish

### `src/pages/MethodologyPage.tsx`

**Problems fixed:**
1. Section label "SERIOUS BUYER SCORE" — stale term, product shows GOLD/SILVER/BRONZE. FAQ page was already fixed in Run 7. MethodologyPage was missed.
2. Scoring thresholds on line 33 said GOLD (80+), SILVER (50-79) — WRONG. Actual scorer.ts thresholds: GOLD ≥ 90, SILVER ≥ 75, BRONZE ≥ 60.
3. Hero body didn't name competitors — "before anyone else knows the job exists" is weak vs explicit competitor naming.
4. CTA section had no "No credit card required" language.

**Changes:**
- `micro-label`: "SERIOUS BUYER SCORE" → "LEAD SCORING — GOLD / SILVER / BRONZE"
- Step 04 detail: corrected thresholds "GOLD (90+). SILVER (75-89). BRONZE (60-74)."
- Scoring section body: accurate thresholds + action guidance per tier
- Hero body: "No guesswork. No scraped job boards. Every lead … before Checkatrade or MyBuilder even know the job exists."
- CTA body: "Free scan. No credit card required. See real scored leads … before Checkatrade or Bark list them."
- Added "No credit card required — 3 free scans every week" micro-label under CTA buttons

---

## Phase 3b — BlueprintPage Copy + Style Polish

### `src/pages/BlueprintPage.tsx`

**Problems fixed:**
1. Pipeline step 01 body: "land registry, company filings" — explicit source naming violation per product rules.
2. Hero CTAs: "Scan a Patch" / "Get Early Access" — lowercase mixed-case, violates brutalist ALL-CAPS design direction.
3. Bottom CTA: "See what your patch looks like." — lowercase h2; "Scan a Patch" lowercase button; no competitor naming; no "No credit card required".
4. "THIS IS WHAT A GOLD LEAD LOOKS LIKE." section h2 was lowercase.

**Changes:**
- Step 01 body: "land registry, company filings" → "property data, business registrations"
- Hero CTA 1: "Scan a Patch" → "SCAN MY AREA FREE →"
- Hero CTA 2: "Get Early Access" → "LOCK YOUR PATCH →"
- Hero: added "No credit card required — 3 free scans every week" micro-label
- Section h2: "This is what a gold lead looks like." → "THIS IS WHAT A GOLD LEAD LOOKS LIKE."
- Bottom h2: "See what your patch looks like." → "SEE WHAT YOUR PATCH LOOKS LIKE."
- Bottom CTA body: competitor naming + "No credit card" added
- Bottom CTA button: "Scan a Patch" → "SCAN MY AREA FREE →"

---

## Phase 4 — Site Health (NEEDLE fix)

### `src/pages/DashboardPage.tsx`

**NEEDLE-1 (highest impact):** When a user hasn't locked a territory, the only visible CTA to "Lock your patch" was a tiny underlined text link inside a small paragraph below the status badge. This is a hidden conversion moment — free users who haven't locked their patch are the most likely to churn if they don't understand the urgency.

**Fix:** Replaced text link with a proper yellow `jf-button` ("LOCK YOUR PATCH →") rendered inline alongside the fear copy. The fear copy ("you're racing every other trade for the same leads") now has a visible action button immediately to its right on desktop, or below on mobile.

**CRITIC:** Clearer in <3 seconds? YES — orange warning dot + fear copy + yellow button form an unmistakable call to act.
**REVENUE:** YES — this is the single highest-leverage conversion point for free users on the dashboard.

---

## Metrics

- Files changed: 4 source files
- Lines: 23 insertions, 16 deletions (surgical)
- Build: GREEN (95 pages, 9.4s)
- TypeScript errors: 0
- Commits: 2

---

## Next Run Priorities

1. **Stripe live test** — wire end-to-end with test key (4242 4242 4242 4242), confirm `/dashboard?welcome=1` and `profiles.plan` flip in Supabase. Blocked on test keys in environment.
2. **Score threshold audit** — MethodologyPage now shows correct 90/75/60 thresholds. Verify FaqPage also uses correct thresholds (check "What does GOLD/SILVER/BRONZE mean?" FAQ added in Run 7).
3. **DashboardPage NEEDLE-2** — duplicate SCAN CTAs (header + pipeline card both show when `!isEmpty`). Repurpose the pipeline SCAN card to show a "last scan results" count or link to recent leads instead of just linking to /find-jobs again.
