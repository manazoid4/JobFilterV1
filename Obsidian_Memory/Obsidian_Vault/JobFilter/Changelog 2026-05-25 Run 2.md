---
type: changelog
date: 2026-05-25
run: 2
repo: JobFilterV1
branch: main
source: NightlyBuildAgent
---

# JobFilter Changelog — 2026-05-25 (Run 2)

## Summary
NightlyBuildAgent session. Build: GREEN (Next.js, 63 static pages, 7.1s). TypeScript: CLEAN. 4 files changed. Copy polish on FindJobsPage (bait-and-switch fix) and PricingPage (jargon + guarantee). UX fixes on LeadListPage (TIP banner truncation) and QuickResponseKit (duplicate unlock CTA removed).

**Note on environment:** Container started in detached HEAD state at 9023b0f. Remote origin/main matched. npm install required. Resolved a git checkout/stash conflict before landing on correct Next.js files.

---

## Pre-flight

- npm install: required (fresh container, node_modules absent)
- Build: GREEN (Next.js, 63 static pages, 7.1s)
- TypeScript: CLEAN (0 errors)
- Previous session commit: 9023b0f (#191 — mobile nav duplicate + BETA badge fix)
- All Tier 1 features verified built: scan counter ✓, ICS calendar ✓, WinStatsBanner ✓, WhatsApp templates ✓, trade-specific scoring ✓

---

## PHASE 2 — Feature Built

All Tier 1 features confirmed present. No new feature needed this session.

---

## PHASE 3 — Copy Polish

### FindJobsPage: bait-and-switch perception fix

**File:** `src/pages/FindJobsPage.tsx`

| Section | Before | After |
|---------|--------|-------|
| Hero subline | "No card needed — free first scan." | "Scan free — signal is real, full lead detail unlocks from £39/mo." |
| Preview banner label | "FREE PREVIEW — THIS IS A SAMPLE" | "FREE SCAN — SIGNAL IS REAL" |
| Preview banner headline | "THE SIGNAL IS REAL. THE DETAIL IS LOCKED." | "THE JOB EXISTS. THE BUYER DETAIL IS LOCKED." |
| Preview banner body | Long list of features | "Free scan confirms the signal is live near you. Unlock from £39/mo to see who to call, when to quote, and how to beat the five other trades who don't have this yet." |

**Why:** "free first scan" created bait-and-switch perception (NEEDLE #2 from 24 May run). New copy sets explicit expectations: scan = free, lead detail = paid.

### PricingPage: hero jargon + guarantee section

**File:** `src/pages/PricingPage.tsx`

| Section | Before | After |
|---------|--------|-------|
| Hero body | "source confidence and postcode fit. Sent to WhatsApp when they are worth chasing." | "not recycled from Checkatrade or Bark. Filtered by urgency, value, and distance. Hits your WhatsApp when it's worth pricing." |
| Guarantee headline | "ONE USEFUL JOB SIGNAL OR YOUR MONEY BACK." | "ONE JOB WORTH PRICING OR YOUR £39 BACK." |
| Guarantee body | "Use JobFilter for 30 days. If you do not see one job worth chasing after setting up your patch, we refund you." | "Set up your patch, run your scans, check at least 10 scored leads. If you don't see one job worth quoting in 30 days, we refund every penny. No forms — just email us." |

**Why:** "source confidence" is corporate jargon. Guarantee headline is now concrete (£39 named explicitly). Body gives a clear 3-step action sequence.

---

## PHASE 4 — Site Health Check

### NEEDLE (top 3 UX issues found)

1. **PricingPage: 3 plan cards + duplicate feature lists on mobile** — complex restructure, deferred
2. **LeadDetailPage: Signal Intelligence overcrowded** — too many stacked elements before CTA
3. **LeadListPage: TIP banner truncated on mobile** — "Response rate drops 60% after 24 hours" gets cut off → **FIXED**

### BUILDER Fix #1 — LeadListPage TIP banner

**File:** `src/pages/LeadListPage.tsx`

| Before | After |
|--------|-------|
| `className="truncate text-sm..."` | `className="text-sm..."` (no truncate) |
| `flex items-center` | `flex items-start` + `mt-0.5` on TIP label |

The "Response rate drops 60% after 24 hours" stat is now always fully visible on mobile.

**CRITIC:** YES — urgency message reads completely in <3 seconds on all screen sizes.
**REVENUE:** YES — behavioral nudge drives same-day calls on GOLD leads → more wins → proves £39/mo value.

### BUILDER Fix #2 — QuickResponseKit duplicate unlock CTA

**File:** `src/components/QuickResponseKit.tsx`

For free users, the FindJobsPage lead card had TWO yellow "UNLOCK" buttons:
1. "UNLOCK FULL LEAD →" (main card right column)
2. "UNLOCK FIRST STRIKE →" (inside QuickResponseKit locked state)

Both linked to /pricing. Classic decision paralysis (NEEDLE #3 from 24 May run).

**Fix:** Removed "UNLOCK FIRST STRIKE →" button from QuickResponseKit locked state. Teaser content (blurred preview + description) remains. Description updated to explain templates are included in the paid plan, not separate.

**CRITIC:** YES — single yellow CTA per lead card. Trade knows exactly what to do.
**REVENUE:** YES — removes CTA confusion at the upgrade decision moment. One button = clear intent.

---

## Carry Forward (open items)

- Wire Stripe Checkout live test end-to-end with test key
- Confirm `VITE_OPEN_ACCESS=false` in Firebase hosting env before public launch
- TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- LeadDetailPage: Signal Intelligence section overcrowded (NEEDLE #2)
- PricingPage: 3-card mobile layout complexity (NEEDLE #1)

---

## Build Status
- `npm run build`: GREEN (Next.js, 63 pages, 7.1s)
- `npx tsc --noEmit`: CLEAN (0 errors)
- Commit: 0f2cde6
- Pushed: main → origin/main (direct push)

---

## Related
- [[Changelog 2026-05-25]]
- [[Changelog 2026-05-24 Run 2]]
- [[Feature Roadmap - 8th May 2026]]
- [[Daily To-Do]]
