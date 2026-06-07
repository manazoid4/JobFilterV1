# Changelog 2026-06-07 Run 3 — NightlyBuildAgent

## Build Status
- **Build:** GREEN (106 pages)
- **TypeScript:** CLEAN

---

## Pre-flight

- Fresh container — `npm install` required, completed cleanly
- Confirmed build green and TypeScript clean before starting (no broken state inherited from Run 2)

---

## Phase 1 — Fix Broken

- No broken build, no TypeScript errors, no broken imports found

---

## Phase 2 — Feature Built: Trade-Specific Scoring UX — Free-Tier Preview Teasers

Roadmap Tier 1 item #1 "Trade-specific scoring" was marked BUILT, but the free-tier preview path (`buildPreviewReasons()` in `server/routes/leadsSearch.ts`) only produced a specific "Trade teaser: X" line when the lead's score reasons contained `Trade match:` or `Related:` — for any other lead it fell straight through to the generic "Paid preview - unlock buyer, deadline, exact value, and action route" line, which reads as a sales pitch rather than a real signal.

- `buildPreviewReasons()` now also surfaces a specific teaser from three more signal types (in priority order, before the generic fallback):
  - `High intent keywords: X, Y (+N)` → `Trade teaser: <first keyword>` (e.g. "Trade teaser: emergency")
  - `Commercial project (+N)` → `Trade teaser: commercial job`
  - `Urgent timeline (+20)` → `Trade teaser: urgent timeline`
- These render through the existing `parseTradeReasons()` "Trade teaser:" badge path on `FindJobsPage.tsx` lead cards — no frontend change needed
- More free-scan leads now show a concrete, specific signal instead of generic "unlock to see" copy — directly supports the conversion story (proof before the ask)
- Build verified GREEN, TypeScript CLEAN

---

## Phase 3 — Copy Polish

| File | Before | After |
|---|---|---|
| SignalsPage.tsx:233 | "Every scan runs the active **signal stack** in parallel..." | "Every scan runs **all ten signals** in parallel..." (internal noun "signal stack" was leaking into customer copy — same class as the Run 2 "Intake" sweep) |
| BlueprintPage.tsx:749 | "Single signals are easy. **Fusion is the moat.**" | "Single signals are easy to copy. Stacking them isn't." (corporate VC jargon "moat" replaced with plain trade language — no change to meaning) |

---

## Phase 4 — Site Health Check

1. **NEEDLE:** Free-tier scan results frequently showed the generic "Paid preview - unlock buyer, deadline, exact value, and action route" line on lead cards instead of a specific signal — this is the exact moment a non-paying tradesperson decides whether JobFilter's data is "real" or "another lead-gen pitch."
2. **BUILDER:** Extended `buildPreviewReasons()` to surface a specific teaser (urgency, commercial, or high-intent keyword) before falling back to the generic line — see Phase 2.
3. **CRITIC:** Clearer in <3 seconds? Yes — a badge reading "URGENT TIMELINE" or "COMMERCIAL JOB" on a free-scan card reads as a live signal; "unlock to see more" reads as a sales wall.
4. **REVENUE:** Increases likelihood of paying £39/mo? Yes — every additional lead that shows a specific, real-feeling teaser instead of generic copy reinforces "this data is real and current," which is the trust threshold a free user has to cross before paying.

---

## Open / Carried Forward

- **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- **Spot-check "Quoted vs landed" stat with live win data** (carried from Run 2 — still no Supabase test data with `lead_outcomes` rows in this container)
- **TradeFlow "Send to TradeFlow" button** (blocked on URL scheme from founder)
- **n8n workflow 16 (LLM Brief Builder)** — still blocked on SMTP creds + manual activation

---

## Next Run Priorities

1. Spot-check the new free-tier "Trade teaser: urgent timeline" / "commercial job" badges against a live B14 scan — confirm they render cleanly alongside existing "Trade teaser: <keyword>" badges and don't crowd the card on mobile
2. Spot-check "Quoted vs landed" stat with real win data once a paid test account exists
3. Stripe live test once Vercel test keys are available
