# Changelog 2026-06-05 — NightlyBuildAgent Run 3

## Build Status
- **Build:** GREEN (106 pages)
- **TypeScript:** CLEAN

---

## Pre-flight

- Fresh container — `npm install` required, node_modules absent
- Build confirmed GREEN, TypeScript CLEAN before changes
- Run 2 priorities reviewed:
  1. DashboardPage INTAKE hero section → ADDRESSED this run (welcome banner for ?welcome=1)
  2. Stripe live test → still blocked on test keys in Vercel, no action
  3. FindJobsPage SEEN ENOUGH specificity → FIXED this run

---

## Phase 2 — Feature: Welcome Activation Banner on DashboardPage

### Problem
New users landing on `/dashboard?welcome=1` after Stripe checkout saw no orientation. The isEmpty block ("NO JOBS TRACKED YET") was the only guidance but didn't explain the 3-step activation flow. Day-1 churn risk: paid users don't know what to do first.

### Fix — `src/pages/DashboardPage.tsx`
- Added `useSearchParams` import from `next/navigation`
- Added `welcomeDismissed` state, loaded from `localStorage('jf-welcome-seen')`
- When `?welcome=1` AND not dismissed: shows yellow welcome banner above isEmpty block
- Banner: "SUBSCRIPTION ACTIVE — YOU'RE IN. HERE'S WHAT TO DO NOW."
- 3 concrete steps:
  1. SCAN YOUR AREA → link to /find-jobs ("takes 30 seconds, Gold leads come back first")
  2. TRACK YOUR FIRST GOLD LEAD → tap TRACK THIS LEAD ("drops into your list so you know who to contact first")
  3. SEND THE WHATSAPP TEMPLATE → ("one pre-written message, one tap, you're first in")
- DISMISS button: writes `localStorage.setItem('jf-welcome-seen', '1')` + hides banner
- Corrected copy from "PATCH LOCKED" (incorrect — territory lock is a separate action) to "SUBSCRIPTION ACTIVE"

### Fix — `app/dashboard/page.tsx`
- Added `Suspense` wrapper (required by Next.js for `useSearchParams` in static pages)
- Without this, build fails with prerender error on `/dashboard`

---

## Phase 3 — Copy Polish

### FindJobsPage — SEEN ENOUGH section specificity
**Before:** "Pro unlocks who needs the work, what it's worth, and when to call — for every lead above."
**After:** "Pro unlocks buyer name, job value band, and direct contact link — locked on every lead above."

**Why:** Names the 3 exact locked fields a tradesman sees in a paid lead. More concrete = better conversion at the upgrade moment.

### LeadDetailPage — locked contact section jargon
**Before:** "Paid members see the recommended contact channel, compliance risk rating, and next action script for every lead — not just a score."
**After:** "Paid members see who to contact, what the job is worth, and a ready-to-send WhatsApp template — not just a score."

**Why:** "Compliance risk rating" and "next action script" are internal product jargon. A tradesman reads these as corporate nonsense, not a benefit. Plain language closes faster.

---

## Phase 4 — Site Health Check (NEEDLE)

### Top 3 UX issues found:
1. **DashboardPage no welcome state** — new paid users from Stripe had no activation guide → FIXED this run
2. **FindJobsPage SEEN ENOUGH copy vague** — didn't name the 3 specific locked fields → FIXED this run
3. **LeadDetailPage locked section corporate jargon** — "compliance risk rating", "next action script" repelled tradesmen → FIXED this run

### CRITIC verdict: Yes — all 3 fixes are clearer in <3 seconds
### REVENUE verdict: Yes — welcome banner directly reduces day-1 churn on paid users; specific locked field names increase upgrade conversion

---

## Next Run Priorities

1. **DashboardPage — welcome banner mobile test** — verify the 3-step list renders cleanly on a 375px viewport (the ol/li layout with numbered badges may stack oddly on mobile)
2. **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 lands correctly and profiles.plan flips (still blocked on test keys in Vercel)
3. **LeadDetailPage — ADD TO CALENDAR link** — verify the server route `/api/leads/:id/calendar.ics` is still working and the COPY CALENDAR LINK button is visible and functional (last confirmed 16 May)
