---
type: changelog
date: 2026-05-15
repo: JobFilterV1
branch: main
source: NightlyBuildAgent
---

# JobFilter Changelog — 2026-05-15

## Summary
NightlyBuildAgent session. Build: GREEN. TypeScript: CLEAN. 4 files changed across all 4 phases.

## Commits Pushed

| Commit | Files | Change |
|--------|-------|--------|
| a56201d | `server/routes/outcomeReport.ts`, `src/pages/DashboardPage.tsx`, `src/pages/FindJobsPage.tsx`, `src/pages/TerritoriesPage.tsx` | Outcomes persistence + copy polish + FILL MY WEEK repositioned |

---

## Pre-flight Notes

- npm install was required (node_modules not present) — build green after install
- TypeScript: CLEAN throughout session
- All Tier 1 NightlyBuildAgent features already built from previous sessions (scan counter, ICS calendar, WinStatsBanner, WhatsApp templates, trade-specific scoring)

---

## Key Changes Detail

### server/routes/outcomeReport.ts — data/outcomes.jsonl persistence (PHASE 2)
Previously: win outcomes stored in `const outcomes = {}` — lost on every server restart. WinStatsBanner only showed seed data after restarts.

Now:
- `loadOutcomes()` runs at module init — reads `data/outcomes.jsonl` if it exists, populates in-memory map
- `persistOutcome(record)` appends each new outcome as a JSON line to `data/outcomes.jsonl`
- `data/` directory created automatically if missing
- Non-fatal: if filesystem write fails (e.g. read-only prod env), server continues normally
- `data/outcomes.jsonl` is the canonical local persistence for the won leaderboard

### src/pages/DashboardPage.tsx — territory copy (PHASE 3a)
**Problem:** Territory appeared in two places (header badge + Quick Actions block) without explaining WHY it matters. Felt like a duplicate bug.

**Fix:**
- Header badge now shows connecting copy: "Locked — Gold leads in this patch won't go to other [trade] before you." OR "No territory = same leads as everyone else. Lock yours →"
- Quick Actions block: removed the duplicate territory status display entirely — replaced with a single `LOCK YOUR TERRITORY →` button (only shown when not locked)
- Result: two distinct purposes — header = status + why it matters, actions = single CTA to fix it

### src/pages/TerritoriesPage.tsx — tradesman-first copy (PHASE 3b)
Multiple improvements following fear→proof→control structure and competitor naming rules:

- **GBP → £**: All `monthlyPotential` values changed from `"GBP 38k-62k"` to `"£38k–£62k"` (8 territory records)
- **Hero free CTA**: `"Scan Area First"` → `"SCAN FREE FIRST — NO CARD NEEDED"` (copy rule: every free CTA gets no-card signal)
- **WHY LOCK? section**: Added paragraph above problem cards naming Checkatrade, Bark, MyBuilder explicitly: "Checkatrade blasts the same lead to 5 trades. Bark sells you a name then lets you fight for it. MyBuilder runs the auction in public."
- **Problem cards**: Made more specific — "By Monday, the firm that gets the signal first has already called" vs vague "three other firms"
- **WHAT YOU GET list**: Added "Gold leads controlled by trade, patch, and timing — no shared auction, no five-trade blast" (the canonical trust phrase from Problems and Solutions.md)
- **Final CTA free link**: `"FREE SCAN FIRST"` → `"SCAN FREE — NO CARD NEEDED"`

### src/pages/FindJobsPage.tsx — FILL MY WEEK repositioned (PHASE 4 BUILDER)
**Problem (NEEDLE):** FILL MY WEEK section rendered ABOVE the scan results. A tradesman who clicked SCAN FREE → waited for results → saw a giant yellow FILL MY WEEK block before seeing any leads. Two competing scan flows, no clear hierarchy.

**Fix:** FILL MY WEEK section moved from line ~446 (before document search + results) to after the results section (before the "no scan yet" prompt).

**New page flow:**
1. Search form + postcode input
2. WinStatsBanner + scan counter
3. Stats bar (conditional — shows when results exist)
4. Document search (collapsed by default)
5. Loading state
6. **Scan results** (lead cards + upgrade prompt) ← now appears first
7. **FILL MY WEEK** ← now a natural "want more?" follow-up
8. "No scan yet" prompt (when nothing has been done)

**CRITIC:** Fix clearer in <3 seconds? YES — results → upgrade prompt → fill my week is a logical progression.
**REVENUE:** Increases £39/mo conversion? YES — lead cards + upgrade prompt now appear without interruption.

---

## PHASE 4 — Site Health Check Results

**NEEDLE findings:**
1. FILL MY WEEK above scan results — creating competing scan flows (HIGH) → FIXED ✅
2. Lead card right column invisible on mobile (lg: grid only) — MEDIUM → logged for next session
3. Empty scan state buries upgrade path below tactical "WIDEN RADIUS" actions — HIGH → logged for next session

**CRITIC:** FILL MY WEEK fix clear in <3 seconds? YES
**REVENUE:** Does it increase £39/mo conversion likelihood? YES

---

## Build Status
- `npm run build`: ✅ PASS (4.51s)
- `npx tsc --noEmit`: ✅ CLEAN (0 errors)

## Roadmap Updates
- Won leaderboard data persistence (data/outcomes.jsonl): BUILT ✅
- Territory copy + competitor naming: DONE ✅
- FILL MY WEEK position: FIXED ✅

---

## Related
- [[Changelog 2026-05-14]]
- [[Feature Roadmap - 8th May 2026]]
- [[Recent]]
