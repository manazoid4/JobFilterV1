---
type: changelog
date: 2026-05-24
run: 2
repo: JobFilterV1
branch: main
source: NightlyBuildAgent
---

# JobFilter Changelog — 2026-05-24 (Run 2)

## Summary
NightlyBuildAgent session. Build: GREEN. TypeScript: CLEAN. 3 files changed, 9 lines touched. DashboardPage territory jargon removed (4-agent BUILDER fix). NewsPage and FindJobsPage data source naming violations fixed (copy polish).

**Note on environment:** Container started in detached HEAD at latest remote commits (Next.js migration, PRs #185–#189). Local main was stale at ade198d. Resolved with `git pull --rebase origin main`.

---

## Pre-flight

- npm install: required (fresh container, node_modules absent)
- Build: GREEN (Next.js, 63 static pages, 6.5s)
- TypeScript: CLEAN (0 errors)
- Previous session commit: 5b5eaad (#189)
- All Tier 1 features verified built: scan counter ✓, ICS calendar ✓, WinStatsBanner ✓, WhatsApp templates (quick_quote_offer + availability_check) ✓, trade-specific scoring ✓

---

## PHASE 2 — Feature Built

All Tier 1 features confirmed present. No new feature needed this session.

---

## PHASE 3 — Copy Polish

### NewsPage: 3 data source naming violations

**File:** `src/pages/NewsPage.tsx`

| Before | After |
|--------|-------|
| "recently filed EPC certificate…pulls this from the public EPC register daily" | "recently filed energy certificate…reads verified energy signals daily" |
| `sources: ['Open Data Communities EPC register', ...]` | `sources: ['Verified energy efficiency signals', ...]` |
| "Companies House and EPC filings together flag this" | "Business registration signals and energy filings together flag this" |

### FindJobsPage: Start Signal tooltip naming

**File:** `src/pages/FindJobsPage.tsx` (line ~418)

- Before: "EPC, Companies House and property signals"
- After: "energy signals, business registrations, and property data"

---

## PHASE 4 — Site Health Check

### NEEDLE (top 3 UX issues found)

1. **Territory jargon on Dashboard** (HIGH) — "Territory: Not Locked" — UK tradespeople think in patches, not territories. Corporate register language creates friction at the patch-lock decision point. → **FIXED**
2. **Free scan vs paywall contradiction** (HIGH) — Hero says "free first scan" but buyer details are locked immediately. Feels like bait-and-switch. → Carry to next run
3. **Multiple competing CTAs per lead card** (HIGH) — TRACK / SEND TO WHATSAPP / UNLOCK on the same card creates decision paralysis on mobile. → Carry to next run

### BUILDER Fix — DashboardPage territory language

**File:** `src/pages/DashboardPage.tsx`

| Before | After |
|--------|-------|
| "Territory: Not Locked" | "YOUR PATCH: NOT LOCKED" |
| "Locked — Gold leads in this patch won't go to other trades before you." | "Gold leads shown to you first — your competition gets them 24h later." |
| "No territory = same leads as everyone else. Lock yours →" | "No patch locked — you're racing every other trade for the same leads. Lock your patch →" |
| "LOCK YOUR TERRITORY →" | "LOCK YOUR PATCH →" |

**CRITIC:** YES — "YOUR PATCH" is plain tradesperson language. "24h later" is concrete and creates urgency. Clear in <3 seconds.

**REVENUE:** YES — removes jargon barrier at the upgrade decision point. Tradesperson immediately understands what locking means for them.

---

## Build Status
- `npm run build`: GREEN (63 pages, 6.5s)
- `npx tsc --noEmit`: CLEAN (0 errors)
- Commit: 5adc771
- Pushed: main → origin/main (direct push)

---

## Related
- [[Changelog 2026-05-24]]
- [[Changelog 2026-05-23]]
- [[Feature Roadmap - 8th May 2026]]
- [[Daily To-Do]]
