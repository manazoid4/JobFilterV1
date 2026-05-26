---
type: changelog
date: 2026-05-26
run: 3
repo: JobFilterV1
branch: main
source: NightlyBuildAgent
---

# JobFilter Changelog — 2026-05-26 Run 3

## Summary
NightlyBuildAgent session. Build: GREEN. TypeScript: CLEAN. 11 files changed + 3 new files created. Fixed critical broken auth routes (login/forgot-password/reset-password 404'd in Next.js), converted 3 auth pages from React Router DOM to Next.js navigation, added Sign In link to TopNav, copy polish on SignupPage + ActivationPendingPage, Dashboard YOUR INTAKE "Not set" rows made into actionable CTAs.

## Commit Pushed
`8b623d5` — [NightlyBuildAgent] Fix broken auth routes + copy polish + Dashboard CTA fix

---

## PHASE 1 — Fix Broken

### Auth Routes Were 404ing (Critical Fix)

No `app/` directory wrappers existed for:
- `/login` — used by users trying to sign back in
- `/forgot-password` — used by users who lost their password
- `/reset-password` — used by Supabase password-reset email links

These pages were also using React Router DOM (`Link`, `useNavigate`, `Navigate`, `useNavigate`) which has no router context in the Next.js app — would crash at runtime.

**Fixed:**

#### LoginPage.tsx
- Removed: `import { Link, useNavigate } from 'react-router-dom'` + `useAuth()` from AuthProvider
- Added: `import Link from 'next/link'`, `import { useRouter } from 'next/navigation'`
- Auth: replaced `signIn()` from AuthProvider with direct `createBrowserSupabaseClient().auth.signInWithPassword()` (AuthProvider uses old Vite env vars `import.meta.env.VITE_*` which are undefined in Next.js)
- Navigation: `navigate('/dashboard')` → `router.push('/dashboard')`

#### ForgotPasswordPage.tsx
- Removed: `import { Link } from 'react-router-dom'` + `import { supabase } from '../lib/supabase'` (Vite-based)
- Added: `import Link from 'next/link'`, `createBrowserSupabaseClient()` from Next.js client
- `<Link to="...">` → `<Link href="...">`

#### ResetPasswordPage.tsx
- Removed: `import { useNavigate } from 'react-router-dom'` + Vite-based supabase
- Added: `useRouter` from `next/navigation`, `createBrowserSupabaseClient()`
- `navigate('/dashboard')` → `router.push('/dashboard')`

#### AccountPage.tsx
- Removed: `import { Navigate } from 'react-router-dom'`
- Added: `useRouter` for redirect, `Link` from `next/link`
- `<Navigate to="/login" replace />` → `router.replace('/login'); return null`
- Note: AccountPage still uses AuthProvider (Vite env issue) so app/account/page.tsx was NOT created — nothing links to /account. Left for future fix when AuthProvider is migrated.

#### New app/ wrappers created:
- `app/login/page.tsx`
- `app/forgot-password/page.tsx`
- `app/reset-password/page.tsx`

**CRITIC:** YES — users can now sign back in. **REVENUE:** YES — without login working, paying users can't return.

---

### TopNav: Sign In Link Added

No link to `/login` existed in the navigation. Existing users had no discoverable way to sign back in.

**Fixed:**
- Desktop nav: "Sign in" text link (muted, underlined) added left of "START £39/MO" button
- Mobile menu: "SIGN IN →" link added above "SCAN MY AREA FREE" button

**File:** `src/components/TopNav.tsx`

---

## PHASE 3 — Copy Polish

### SignupPage: Form Labels + Hero Copy

**Before:**
- Hero: "LOCK THE ACCOUNT FIRST." — confusing, no tradesperson knows what "lock" means here
- Field: "Work email" — tradespeople use personal email
- Field: "Postcode cluster" — jargon

**After:**
- Hero: "CREATE YOUR ACCOUNT."
- Body: "add your trade, area, and WhatsApp number. Gold leads start hitting your phone within minutes."
- Field: "Email"
- Field: "Your area (e.g. B14)"

**File:** `src/pages/SignupPage.tsx`

**CRITIC:** YES. **REVENUE:** YES — clearer form = fewer drop-offs at signup.

---

### ActivationPendingPage: Pre-Checkout Copy

**Before:** "Confirm your WhatsApp, trade and postcode. Then checkout opens with your account attached." — "checkout opens with your account attached" is technical jargon

**After:** "Set your trade and area below. Then we'll take you straight to payment — takes under 2 minutes."

Sub-heading: "Set your patch before payment." → "Set your patch — then straight to payment."

**File:** `src/pages/ActivationPendingPage.tsx`

**CRITIC:** YES. **REVENUE:** YES — clearer "under 2 minutes" removes hesitation at the final step.

---

## PHASE 4 — Site Health Check

### NEEDLE #1: DashboardPage YOUR INTAKE "Not set" Rows Were Dead Text

When a new user opens /dashboard before having scanned, YOUR INTAKE section showed:
- Trade: "Not set — pick on scan page" (plain text, no link)
- Postcode: "Not set — enter on scan page" (plain text, no link)

A tradesperson who doesn't know what to do next sees dead text with no call to action.

**Fix (BUILDER):**
- `Trade` row when unset → `RowLink` component with "Pick your trade →" linking to /find-jobs
- `Postcode` row when unset → `RowLink` component with "Set your area →" linking to /find-jobs
- When either is unset: yellow "RUN YOUR FIRST SCAN →" button shown below the grid

Added `RowLink` helper component (label + href + cta text as underlined navy link).

**File:** `src/pages/DashboardPage.tsx`

**CRITIC:** YES — clear in under 3 seconds. **REVENUE:** YES — drives first scan → activation event → upgrade trigger.

---

## Build Status
- `npm run build`: GREEN (66/66 pages)
- `npx tsc --noEmit`: CLEAN (0 errors)
- New routes in build: /login, /forgot-password, /reset-password

---

## Related
- [[Changelog 2026-05-26 Run 2]]
- [[Feature Roadmap - 8th May 2026]]
