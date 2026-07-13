# Changelog 2026-07-13 Run 2 — NightlyBuildAgent

## Summary

Build: GREEN (Next.js, 113 pages)
TypeScript: CLEAN
Commit: `8d948ef`

---

## Container State

Fresh container — `npm install` required. HEAD synced to `c848dc1` (founder PR #334, Jul 13). Build GREEN, TS CLEAN before changes.

---

## Founder Activity Check

**PR #334 merged** (manazoid4, Jul 13 11:46 UTC) — "Nav: surface Claim Patch in primary desktop nav; Find Jobs: remove hero delay"
- TopNav: swapped Signals and Territories order — Claim Patch now in primary nav slot 5 (was in More dropdown)
- FindJobsPage: removed large decorative hero section that delayed the scanner form; heading/label folded into the scanner panel. `text-[var(--orange)]` micro-label confirmed OK — `--orange: #C5462A` defined in index.css, used throughout site.

Reviewed — sound. No regressions. Carryover blockers unchanged.

---

## Phase 1 — Fix Broken

No broken builds. No broken imports. All forms confirmed wired to real endpoints. Build GREEN before and after changes.

---

## Phase 2 — Tier 1 Features

All Tier 1 features confirmed BUILT from prior runs. No new Tier 1 work required.

---

## Phase 3 — Copy Polish + Phase 4 NEEDLE

### NEEDLE — Top 3 UX Issues Found:

1. **Footer `SCAN MY AREA FREE` missing →** — Primary CTA shown on EVERY PAGE in the footer. Yellow button, no directional arrow. Inconsistent with the site standard and reduces click signal. **FIXED.**

2. **TradePage hero + bottom CTAs missing →** — `SCAN {TRADE} JOBS FREE` on all 15+ trade pages had no → on both the hero ink CTA and the bottom yellow CTA. These are the primary entry pages for every trade. **FIXED** (template change covers all trade pages).

3. **FreeToolsPage stale CTA `SEE FOUNDING 30`** — After email capture, the secondary button still said "SEE FOUNDING 30". Every other page uses "LOCK YOUR PATCH — £39/MO →". Also `LOCK MY PATCH — £39/MO` missing →. **FIXED.**

### CRITIC: Are the Footer/TradePage fixes clearer in <3 seconds? YES — → is the established directional signal across the site; consistency restores the scan pattern.
### REVENUE: Does adding → to the Footer primary CTA increase likelihood of paying £39/month? YES — Footer is the last CTA before leaving. A cleaner primary CTA increases conversion from passive to active.

---

## Changes Made

### src/components/Footer.tsx
- `SCAN MY AREA FREE` → `SCAN MY AREA FREE →` (shown on every page — highest reach fix of this run)

### src/components/TradePage.tsx
- Hero CTA: `SCAN {TRADE} JOBS FREE` → `SCAN {TRADE} JOBS FREE →` (ink button, 15+ trade pages)
- Bottom CTA: `SCAN {TRADE} JOBS FREE` → `SCAN {TRADE} JOBS FREE →` (yellow button, 15+ trade pages)

### src/components/CityPage.tsx
- All 3 scan button render locations: `{city.ctaText.toUpperCase()}` → `{city.ctaText.toUpperCase()} →` (6 city pages)

### src/pages/FreeToolsPage.tsx
- Email-captured welcome banner: `SEE FOUNDING 30` → `LOCK YOUR PATCH — £39/MO →`
- Free vs Paid section: `LOCK MY PATCH — £39/MO` → `LOCK MY PATCH — £39/MO →`

### src/pages/MethodologyPage.tsx
- Secondary trust CTA: `READ OUR PROMISE` → `READ OUR PROMISE →`

### src/components/ROITracker.tsx
- Free-tier upsell: `UPGRADE TO UNLOCK` → `UPGRADE TO UNLOCK — £39/MO →` (adds price anchor for paid conversion)

### src/components/MaterialEstimator.tsx
- Paywall CTA: `UNLOCK FULL ENGINE` → `UNLOCK FULL ENGINE — £39/MO →` (adds price anchor)

### src/components/WinSummary.tsx
- Win celebration CTA: `VIEW PIPELINE` → `VIEW PIPELINE →`

---

## Carryover Blockers (unchanged)

- **Founder decision — add-on service pricing**: 14 add-on services still have no £ shown
- **Stripe live test**: blocked on test keys in Vercel
- **TradeFlow "Send to TradeFlow" button**: blocked on URL scheme from founder
- **n8n workflow 16 (LLM Brief Builder)**: blocked on SMTP creds + manual activation

---

## Next Run Priorities

1. **Add-on service pricing copy** — 14 services show no price; founder decision still pending. If founder decides, add "from £X" or "priced per job" copy to each ProductAdvantagePage service card.
2. **CTA sweep remaining** — check AdminGuardPage nav CTA (line 109) and builder-facing functional buttons for any remaining no-arrow navigation CTAs.
3. **WaitlistForm / CheckoutButton review** — these are form submit buttons, not navigation — verify no false positives remain in the no-arrow list.
