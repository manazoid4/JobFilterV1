# Changelog 2026-06-03 Run 3 — NightlyBuildAgent

**Commit:** `cfbc10c`
**Branch:** main (pushed directly)
**Build:** GREEN (106 pages) | TypeScript: CLEAN

---

## Pre-Flight

- npm install (fresh container — node_modules missing)
- `npm run build` → initially failed ("next: not found"), fixed by npm install
- `npm run build` → GREEN (106 pages)
- `npx tsc --noEmit` → CLEAN (0 errors)
- Read vault: Feature Roadmap, Problems and Solutions, Design Direction (Brutalist Yellow), Daily To-Do, Changelog Run 2

---

## Phase 1 — Fix Broken

No broken builds or dead imports found. Git state was complex (detached HEAD at b3a2300; local main was stale at May 29). Resolved by: fetch origin, reset --hard to b3a2300, reapply changes cleanly.

---

## Phase 2 — Feature Build

All Tier 1 features confirmed built (scan counter, ICS calendar, WinStatsBanner, WhatsApp templates, trade scoring UX). Latest commit b3a2300 (email outreach templates) already shipped email channel support in QuickResponseKit and LeadDetailPage.

**Fix: QuickResponseKit email subject parsing (enhancement to b3a2300 feature)**

b3a2300 added the email channel to QuickResponseKit but the preview rendered the raw template body with "Subject: Re: ..." embedded inline — no visual distinction between subject and body. Fix: when `activeChannel === 'email'`, call `parseEmailSubject(filledMsg)` and show the subject in a separate navy-bordered box (matching LeadDetailPage's OTHER APPROACHES section).

Files changed:
- `src/components/QuickResponseKit.tsx` — import `parseEmailSubject`, add email subject rendering in preview

---

## Phase 3 — Copy Polish

### ActivationPendingPage — jargon regression fix

**File:** `src/pages/ActivationPendingPage.tsx`

The "Postcode cluster (e.g. B14, SW1, M20)" label was fixed on SignupPage in Run 1 (June 3) but the ActivationPendingPage form had the same jargon and was missed.

- Before: `Postcode cluster (e.g. B14, SW1, M20)`
- After: `Your area (e.g. B14, SW1, M20)`

### TipsPage — CTA jargon + trust line

**File:** `src/pages/TipsPage.tsx`

The CTA section (bottom of page) used "ENTER THE INTAKE →" — internal product jargon that a tradesman who just read tips about avoiding tyre-kickers would not recognise.

- Before: `ENTER THE INTAKE →`
- After: `SCAN MY AREA FREE →`
- Added: `No credit card required` trust line below the CTA buttons (consistent with all other free CTAs on the site)

---

## Phase 4 — Site Health Check

### NEEDLE findings

**#1: FindJobsPage hero sub-line mixed free entry + price anchor** → FIXED (highest-impact)
**#2: "ENTER THE INTAKE →" on TipsPage** → FIXED (Phase 3)
**#3: Dashboard duplicate CTAs** → Left as-is (intentional placement, different contexts)

### BUILDER fix: FindJobsPage hero sub-line

**File:** `src/pages/FindJobsPage.tsx`

- Before: `No Checkatrade membership. No Bark credits. Scan free — unlock full leads from £39/mo.`
- After: `No Checkatrade membership. No Bark credits. 3 free scans every week — no credit card.`

Rationale: mixing "scan free" (free action) and "from £39/mo" (paid ask) in a trust/reassurance line created a "wait, is it free or £39?" moment before the tradesman even reaches the scanner. The scan counter already shows the upgrade path after scanning. Moving the price mention out of the hero reduces friction at entry.

**CRITIC check:** Clearer in <3 seconds? **YES**
**REVENUE check:** Increases likelihood of paying £39/month? **YES** — tradesman scans first (free, frictionless), gets value, then sees the upgrade prompt in context

---

## Git State Notes

This run encountered a complex git state: the container had HEAD detached at b3a2300 (June 3 commit), with the local `main` branch stale at May 29. An early cherry-pick attempted to apply changes to the stale local main, which would have overwritten June 3 work. Fixed by:

1. `git fetch origin main`
2. `git reset --hard origin/main` (to b3a2300)
3. Reapplied all changes directly on clean base

No June 3 history was lost or overwritten.

---

## Metrics

- Files changed: 4
- Build: GREEN (106 pages)
- TypeScript errors: 0
- Copy improvements: 4 (ActivationPendingPage, TipsPage ×2, FindJobsPage)
- UX improvements: 1 (QuickResponseKit email subject display)
- NEEDLE issues fixed: 2 (FindJobsPage hero, TipsPage CTA)

---

## Next Run Priorities

1. **Stripe live test** — still blocked on test keys in Vercel (manual action needed from founder)
2. **Gas engineer / heat pump lead quality** — verify plumbing trade returns boiler/heating leads at top for B14 scan; scoring reasons should show "BOILER — YOUR TRADE" or "HEATING — YOUR TRADE"
3. **ActivationPendingPage TRADES list** — currently uses old flat list ("Heat Pumps") vs SignupPage's specific trades ("Heat pump installer"). Consider aligning to prevent confusion about which trade is being set
