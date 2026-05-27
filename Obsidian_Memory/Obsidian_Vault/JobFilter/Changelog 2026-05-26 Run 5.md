---
type: changelog
date: 2026-05-26
run: 5
repo: JobFilterV1
branch: main
source: NightlyBuildAgent
---

# JobFilter Changelog — 2026-05-26 Run 5

## Summary
NightlyBuildAgent session. Build: GREEN (67 pages). TypeScript: CLEAN. 8 files changed. Restored lost auth routes (login/forgot-password/reset-password 404ing on main). Completed AccountPage AuthProvider migration (Daily To-Do open item). Fixed mobile UNLOCK CTA UX gap. Fixed design violation on SignalsPage. Improved FreeToolsPage comparison table.

## Commits Pushed

| Commit | Files | Change |
|--------|-------|--------|
| f3a1f99 | 8 files | Auth routes restored + /account route + copy polish + mobile UX fix |

---

## PHASE 1 — Pre-flight

- npm install: required (fresh container)
- Build: GREEN — 67 pages compiled
- TypeScript: CLEAN (0 errors)
- Git state: detached HEAD (recovered via stash + checkout main + conflict resolution)
- Remote main was missing: app/login, app/forgot-password, app/reset-password (lost in PR #196 merge)

---

## PHASE 2 — Feature Built

### AccountPage: AuthProvider Removed — createBrowserSupabaseClient Direct

**Problem (Daily To-Do open item):** AccountPage used `useAuth()` from AuthProvider, which depends on Vite env vars (`VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY`). AuthProvider was not in the Next.js root layout. The `/account` route had no `app/account/page.tsx` wrapper — so logged-in users couldn't access their account.

**Fix:**
- Removed `useAuth` and `useSubscription` imports
- Added `useEffect` to call `createBrowserSupabaseClient().auth.getUser()` directly
- Inlined subscription fetch (`/api/subscription-status`) from user id + email
- `signOut()` now calls supabase directly and redirects to `/login`
- Created `app/account/page.tsx` — `/account` is now a live static route

**CRITIC:** YES — logged-in tradesman can now access and manage their account.
**REVENUE:** YES — billing portal access is now functional without AuthProvider dependency.

### Auth Routes Restored (PHASE 1 Critical Fix)

**Problem:** `app/login/page.tsx`, `app/forgot-password/page.tsx`, `app/reset-password/page.tsx` were missing from main. TopNav "Sign In" link → /login was 404ing for all users. These were committed in a previous local session (8b623d5) but lost when PR #196 merged from a branch that didn't include them.

**Fix:**
- Recreated all three app/ wrappers with Suspense fallbacks
- Migrated LoginPage, ForgotPasswordPage, ResetPasswordPage from react-router-dom + Vite supabase → Next.js useRouter + createBrowserSupabaseClient

---

## PHASE 3 — Copy Polish

### SignalsPage: Design Violation Fixed + Competitor Copy Added

**Problem 1:** `'FRESH PURCHASE': 'bg-blue-600 text-white'` — blue is not in the design system (white/black/yellow ONLY per Design Direction).
**Fix:** Changed to `bg-[var(--navy)] text-white` ✓

**Problem 2:** Bottom CTA lacked Checkatrade price comparison.
**Fix:** "3 free scans every week — no credit card required. Founder access: £39/month. Checkatrade charges £180/month for shared leads. This is unshared and filtered."

### FreeToolsPage: Comparison Table Free Column

**Problem:** "Live lead scanner" row showed `''` (rendered as "—") for free tier. Implied no free access, which is false — free users get 3 scans/week.
**Fix:** Changed to `'3 free/wk'` — accurate, specific, reduces friction.

---

## PHASE 4 — Site Health Check

### NEEDLE Issues Found

1. **Mobile UNLOCK CTA missing hint text** (FindJobsPage ~line 989) — desktop CTA shows "Buyer · deadline · proof link" below the button; mobile CTA (`lg:hidden`) showed just "UNLOCK FULL LEAD →" with no hint. Tradesman on mobile couldn't tell what they'd unlock.
2. ~~Duplicate TrustBadges in LeadDetailPage~~ — NEEDLE agent hallucinated; only one instance exists.
3. ~~LeadListPage empty state confusion~~ — Actually well-handled; NEEDLE agent was wrong.

### BUILDER Fix

**FindJobsPage mobile UNLOCK CTA:** Added "Buyer · deadline · proof link" hint paragraph below the mobile button — matches the desktop pattern exactly. Tradesman now sees what's locked regardless of device.

**CRITIC:** YES — clearer in <3 seconds on mobile.
**REVENUE:** YES — specific locked items (buyer, deadline, proof link) increase desire to unlock vs vague "full lead".

---

## What's Still Open

- Wire Stripe Checkout live test end-to-end with test key
- Confirm NEXT_PUBLIC_OPEN_ACCESS=false in Vercel env before public launch
- TradeFlow "Send to TradeFlow" button (needs URL scheme from founder)
- SignupPage still uses AuthProvider for signup logic (useAuth().signUp) — needs migration

---

## NEXT RUN Priorities

1. **SignupPage AuthProvider migration** — `signUp()` still uses `useAuth()` from AuthProvider. Same pattern as AccountPage — wire to createBrowserSupabaseClient directly.
2. **Stripe Checkout live test** — end-to-end test with test key, confirm webhook fires correctly.
3. **HomPage / PricingPage copy audit** — apply Fear → Proof → Control structure more aggressively; confirm no remaining source naming violations.
