---
type: changelog
date: 2026-05-28
repo: JobFilterV1
branch: main
source: NightlyBuildAgent
---

# JobFilter Changelog — 2026-05-28

## Summary
NightlyBuildAgent session. Build: GREEN. TypeScript: CLEAN. 3 files changed across 2 commits. LeadDetailPage now shows tier-specific context (GOLD/SILVER/BRONZE) in WHY THIS LEAD. FindJobsPage "Unlock exact value" placeholder fixed to "See quote floor →", and paywall trust badges added (30-DAY MONEY-BACK / CANCEL ANYTIME / NO CONTRACT). HomePage fixed 4 EPC naming violations across hero body, HOW IT WORKS step 01, PROFIT PROOF feature card, and Patch Watch plan feature.

## Commits Pushed

| Commit | Files | Change |
|--------|-------|--------|
| 474a55d (rebased: 6a1fe20) | 2 files | LeadDetailPage tier reasons, FindJobsPage value copy + paywall trust badges |
| 3cac756 | 1 file | HomePage EPC naming violations fixed (x3 → x4 total) |

---

## PHASE 1 — Pre-flight

- npm install: required (fresh container, vite not found)
- Build: GREEN (4.25s before changes, 4.24s after)
- TypeScript: CLEAN (0 errors)
- Previous session: e8d8cce (2026-05-27 NightlyBuildAgent + vault run)
- Branch state: rebased onto origin/main (was 4 commits behind)

---

## PHASE 2 — Feature Built

### LeadDetailPage: GOLD/SILVER/BRONZE Score-Tier Specific Reasons

**Problem (Daily To-Do):** LeadDetailPage SILVER/BRONZE leads showed generic "Verified signal" fallback. A tradesman looking at a SILVER lead had no context for why it scored lower or what to do with it.

**Fix:** Added tier-specific contextual banner at the bottom of the WHY THIS LEAD section:
- **GOLD (score ≥ 80):** Yellow left border, yellow/10 background — "GOLD — first-mover window open. Most trades won't see this for 24–48h. Chase now."
- **SILVER (score 50–79):** Navy left border, navy/5 background — "SILVER — worth watching. Job signal is verified but timing or budget not confirmed. Worth a quick call, not a full chase yet."
- **BRONZE (score < 50):** Line border, paper background — "BRONZE — check timing. Signal detected but work may not start immediately. Verify before spending time chasing."

**File:** `src/pages/LeadDetailPage.tsx` (WHY THIS LEAD section, ~line 233)

**CRITIC:** YES — Tier banner is in plain English, visible in <3 seconds, tells tradesman exactly what to do.
**REVENUE:** YES — GOLD banner creates urgency for GOLD leads (drives chase action). SILVER/BRONZE framing prevents wasted time on low-quality leads, increasing trust in the scoring system.

---

## PHASE 3 — Copy Polish

### FindJobsPage: "Unlock exact value" → "See quote floor →"

**Problem (NEEDLE #2, 27 May):** `safePreviewValue()` returned "Unlock exact value" as placeholder when lead value wasn't available for free users. Vague — doesn't tell the tradesman what they'd unlock.

**Fix:** Changed `safePreviewValue()` to return "See quote floor →" — implies there's a concrete number, not an unknown blob.

**File:** `src/pages/FindJobsPage.tsx` line ~964 (`safePreviewValue` function)

---

### FindJobsPage: Paywall Trust Badges

**Problem (NEEDLE #2, site health):** The "READY TO UNLOCK?" upgrade block had guarantee text at 50% opacity on dark background — near-invisible. No trust badges. UK tradesmen are conditioned to distrust lead platforms.

**Before:**
- 50% opacity guarantee text
- No visible trust signals near the buy button

**After:**
- Three compact badges: `30-DAY MONEY-BACK` / `CANCEL ANYTIME` / `NO CONTRACT`
- Guarantee text opacity raised to 80%
- Added sub-note: "No credit card required to scan. Pay only when you want to unlock full leads."

**File:** `src/pages/FindJobsPage.tsx` (~line 647)

**CRITIC:** YES — Three badges scannable in <1 second. Addresses the "am I getting locked in?" fear directly.
**REVENUE:** YES — Trust badges at decision point reduce paywall abandonment. "CANCEL ANYTIME" is the single highest-objection-killing phrase for subscription averse UK tradesmen.

---

### HomePage: EPC Naming Violations (x4)

**Problem:** Four instances of "EPC data" or "EPC" used as a data source label in public-facing copy — violations of the product rule that prohibits naming data sources.

**Fixes:**
1. Hero body: "EPC data" → "energy signals"
2. Step 01 (HOW IT WORKS): "EPC data" → "energy signals"
3. PROFIT PROOF feature card: "planning vs EPC vs tender vs Companies House" → "planning signals, energy upgrades, tenders"
4. Patch Watch plan feature: "Planning, EPC, tender, and company signals" → "Planning, energy, tender, and business signals"

**File:** `src/pages/HomePage.tsx`

**Note:** "EPC band F or G" in MEES DEADLINE WATCH section (line 374) was NOT changed — this describes a legal compliance standard (property rating grade), not a data source name.

---

## PHASE 4 — Site Health Check (4-Agent Loop)

### NEEDLE Findings

1. **Duplicate "Scan for Jobs" CTAs on Dashboard** (HIGH) — Header always shows "SCAN FOR JOBS →" and the empty-state block below shows "RUN YOUR FIRST SCAN →" — same action twice on same screen → Carried to next run
2. **No trust signals at upgrade paywall** (HIGH) — "READY TO UNLOCK?" block had near-invisible guarantee text, no trust badges → FIXED THIS SESSION
3. **Jargon-heavy pricing copy** (MEDIUM) — "First Strike", "Vicinity", "Vantage", "Win Engine" are internal brand names without plain-English payoff visible in card title → Carried to next run

### BUILDER Fix Implemented
FindJobsPage paywall trust badges + opacity fix (NEEDLE #2). See PHASE 3 above.

**CRITIC:** YES
**REVENUE:** YES

---

## Build Status
- `npm run build`: GREEN (4.24s)
- `npx tsc --noEmit`: CLEAN (0 errors)

---

## Related
- [[Changelog 2026-05-27]]
- [[Recent]]
- [[Feature Roadmap - 8th May 2026]]
