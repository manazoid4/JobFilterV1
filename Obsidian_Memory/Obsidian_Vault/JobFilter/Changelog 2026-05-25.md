---
type: changelog
date: 2026-05-25
repo: JobFilterV1
branch: main
source: NightlyBuildAgent (Run 2)
---

# JobFilter Changelog — 2026-05-25 (Run 2)

## Summary
NightlyBuildAgent session. Build: GREEN. TypeScript: CLEAN. 2 files changed. Feature: personal scan history on FindJobsPage (localStorage-based, replaces hardcoded postcodes). Copy polish: FindJobsPage hero (bait-and-switch fix), PricingPage hero + bottom CTA. Site health BUILDER fix: mobile UNLOCK CTA added inline in lead card center column so it's visible above the fold on phones and tablets.

---

## PHASE 1 — Pre-flight

- Build: GREEN (npm install required — node_modules absent in fresh container)
- TypeScript: CLEAN (0 errors)
- Previous session commit: 7614702 (vault: Changelog 2026-05-24 Run 2)

---

## PHASE 2 — Feature Built

### Personal Scan History (FindJobsPage)

**Problem:** `RECENT_SEARCHES` was a hardcoded list of 5 postcodes. Also hidden behind `SHOW_ADVANCED_TOOLS = false` so never actually shown.

**Built:**
- `SCAN_HISTORY_KEY = 'jf-scan-history'` localStorage key
- `getScanHistory()` reads last 5 (postcode, trade) pairs from localStorage
- `saveScanHistory(postcode, trade)` deduplicates by (postcode+trade), prepends, caps at 5
- `submit()` extended with `postcode?: string` override so history chips can trigger auto-scan correctly without waiting for setState
- `scanHistory` state initialised from localStorage on mount, updates after each scan
- JSX chip row "YOUR RECENT SCANS:" — visible only when user has actual history, removed SHOW_ADVANCED_TOOLS guard
- One-tap chip click: sets postcode + trade + auto-scans immediately

**File:** `src/pages/FindJobsPage.tsx`

**CRITIC:** YES — returning tradesman re-scans usual patch in one tap.
**REVENUE:** YES — lower friction for repeat scanning → more lead finds → more paid unlocks.

---

## PHASE 3 — Copy Polish

### FindJobsPage: Hero — Bait-and-Switch Fix (NEEDLE #2 from 24 May)

**Before:** "No card needed — free first scan." → implies lead details are also free.
**After:** "Scan free — unlock full leads from £39/mo." → two-tier structure explicit in hero.

**File:** `src/pages/FindJobsPage.tsx`

### PricingPage: Hero body + Bottom CTA

**Hero body before:** "Real lead signals. Filtered by urgency, value, source confidence and postcode fit."
**Hero body after:** "Not Checkatrade. Not Bark. No auction, no shared blast. Verified signals filtered by urgency, value, and postcode — sent to your WhatsApp when worth chasing."

**Bottom CTA before:** "LOCK THE ACCOUNT. THEN CONTROL THE JOBS."
**Bottom CTA after:** "LOCK YOUR PATCH. OWN THE JOBS." + "No credit card required to scan." trust line added

**File:** `src/pages/PricingPage.tsx`

---

## PHASE 4 — Site Health Check

### NEEDLE — Top 3 Issues Found

1. **Mobile UNLOCK button below fold** — On screens < 1024px, the UNLOCK button lives in the 3rd grid column which stacks after all lead details. Mobile free users must scroll 400–600px past the title to find the CTA. **FIXED.**
2. **Hero bait-and-switch framing** — "free first scan" implied leads were also free. **FIXED.**
3. **DashboardPage YOUR INTAKE "Not set" values** — new users see passive "not set" copy with no inline CTA. Header SCAN button covers it partially but specific field rows are dead ends. Carry forward.

### BUILDER Fix Applied

Added inline UNLOCK CTA in lead card center column, below title, `lg:hidden` (only shows on mobile/tablet where right column is not visible):

```tsx
{!cardOpenAccess && (
  <Link href="/pricing" className="mt-3 flex lg:hidden ... bg-[var(--yellow)] ...">
    UNLOCK FULL LEAD →
  </Link>
)}
```

**CRITIC:** YES — yellow button visible in first screen on mobile. Clear action in < 3 seconds.
**REVENUE:** YES — removes biggest friction point for mobile free users.

---

## Outstanding (carry forward)

- [ ] Wire Stripe Checkout live test end-to-end with test key
- [ ] Confirm `NEXT_PUBLIC_OPEN_ACCESS=false` in Vercel/Firebase env before public launch
- [ ] TradeFlow "Send to TradeFlow" button (needs URL scheme from founder)
- [ ] DashboardPage: "Not set" rows in YOUR INTAKE — inline scan CTA within each row
