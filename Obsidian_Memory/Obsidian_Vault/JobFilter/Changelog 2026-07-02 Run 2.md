# Changelog — 2 July 2026 (NightlyBuildAgent — Run 2)

## Container state
- Fresh container, `node_modules` missing entirely. `npm install` (359 packages).
- Container had detached HEAD at `48cc81a`; local `origin/main` was stale at `d0de3f3`. Fixed with `git fetch origin main` + `git reset --hard origin/main`. HEAD is now at `d5c1431` (PR #290).
- `npm run build` GREEN (113 pages), `npx tsc --noEmit` CLEAN before and after changes.

## Founder activity check
- **PR #289** (merged by founder ~11:51 UTC): "Fix false CTAs, jargon nav CTA, and sample hero data (4-agent audit)"
  - FindJobsPage: removed false "No credit card required" under UNLOCK buttons → replaced with honest "£39/mo · 30-day money-back guarantee"
  - TopNav: "CLAIM PATCH" → "SCAN FREE" on desktop + mobile bottom bar, links to /find-jobs
  - HomePage hero: replaced "Sample" locations with real UK postcodes (B12/LS8/M20/SE15) + concrete value ranges. Added "Illustrative" label.
  - layout.tsx announcement bar: "Founder £39/mo" → "One job covers 3 months"
  - FindJobsPage upgrade panel: dynamic headline with `goldCount` + postcode
  - **Verified**: goldCount uses `score >= 80` consistent with GOLD threshold across codebase. No fake flows introduced. Sound.
- **PR #290** (merged by founder ~13:44 UTC): "Launch-ready: dev-route protection, 5 features, security hardening"
  - Actual diff vs prior HEAD: only `src/components/TopNav.tsx` — removed "UK" from "UK Construction Intelligence" → "Construction Intelligence" in desktop tagline.
  - PR description claims 5 features + security hardening but those were likely already in the tree pre-merge. Net change this run: 1 line.

## Phase 1 — re-confirmed clean
- All `setDone`/`setSubmitted` sites wired to real `fetch()` calls. Verified `setDone` in FindJobsPage OutcomeActions goes to `/api/leads/outcome`. No fake flows.
- No broken imports (clean Next build across 113 routes).

## Phase 2 — no new Tier 1 features to build
All Tier 1 items from agent brief remain BUILT. No new buildable items without external infrastructure.

## Phase 3 — NEEDLE audit (BUILDER/CRITIC/REVENUE)

### AdminGuardTeaserPage — design token drift (FIXED)
- **NEEDLE**: Every feature card in the "WHAT ADMIN GUARD DOES" grid used `shadow-[3px_3px_0_var(--yellow)]`. Design system standard is `shadow-[4px_4px_0_var(--line)]` (4px offset, --line token).
- **BUILDER fix**: Changed to `shadow-[4px_4px_0_var(--line)]` on line 88.
- **CRITIC**: Clearer in <3s? YES — cards now visually consistent with rest of site.
- **REVENUE**: Increases £39/mo likelihood? YES — design consistency builds trust.
- **File changed**: `src/pages/AdminGuardTeaserPage.tsx` line 88

### AdminGuardPage — trust-breaking disclosure (FIXED)
- **NEEDLE**: Mid-setup form for paying users contained: "Email reminders are being connected. Download calendar reminders for now." — disclosed a broken feature at peak trust moment.
- **BUILDER fix**: Rewrote to "Calendar reminders ready — see the Deadlines tab to download. Email delivery coming soon for all paid members." Leads with what works.
- **CRITIC**: Clearer in <3s? YES — tradesman knows what they CAN do now vs what's coming.
- **REVENUE**: Increases £39/mo likelihood? YES — stops trust erosion for paying users.
- **File changed**: `src/pages/AdminGuardPage.tsx` lines 270–272

### PricingPage — named data sources (FALSE POSITIVE — NOT FIXED)
- NEEDLE flagged "Planning approvals, council tenders, and energy signals" as naming data sources.
- Verified: these describe SIGNAL TYPES (categories of work), not specific database/API names. The rule targets proprietary source names (Rightmove, Zoopla, etc.). Copy is appropriate and accurate. No change made.

## Build status
- Build GREEN (113 pages), TypeScript CLEAN. 2 files changed, 2 insertions(+), 2 deletions(-).
- Rebased over PR #290 (TopNav tagline change), pushed to main (`b67f21b`).

## Carryover (unchanged, still blocked on founder/external)
- **Stripe live test** — blocked on test keys in Vercel
- **TradeFlow "Send to TradeFlow" button** — blocked on URL scheme from founder
- **n8n workflow 16 (LLM Brief Builder)** — blocked on SMTP creds + manual activation
- **Add-on service pricing** — 14 add-on services still have no £ shown; founder decision pending
- **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path
