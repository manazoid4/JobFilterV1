# Changelog 2026-07-08 (NightlyBuildAgent — Run 2)

## Build Status
- **Build**: GREEN (113 pages)
- **TypeScript**: CLEAN
- **Founder activity**: PR #330 merged today (10:49 UTC) — announcement bar clickable Link → /find-jobs; SignalsPage "CORE SIGNALS LIVE" removed → honest signals strip; TerritoriesPage "AVAILABLE PATCHES" → "EXAMPLE PATCHES" with clarifying copy. All changes reviewed — sound, no regressions.

## Changes Made

### 1. PricingPage.tsx — Bottom closing section secondary CTA dead-end fix
- **Before**: "CHECK MY PATCH FIRST" → /territories
- **After**: "SCAN FREE FIRST →" → /find-jobs
- **Reason**: /territories is a research/info page (example patches, patch check form → waitlist lead capture). Sending a visitor who has scrolled the entire pricing page to /territories breaks purchase momentum — there's no checkout flow there. /find-jobs gets them directly into the product experience, which is the proven path to conversion. The hero already used "SCAN FREE FIRST →" — bottom section now matches for consistency.

### 2. SignalsPage.tsx — Pricing bridge button capitalization
- **Before**: "Scan Free →" (ink) and "See Pricing" (white)
- **After**: "SCAN FREE →" (ink) and "SEE PRICING →" (white)
- **Reason**: Every other button on the site is ALL CAPS. Mixed-case labels on these two buttons made them look like deprioritized footnote links rather than actionable CTAs. CTA hierarchy (ink = primary, white = secondary on yellow background) was already correct — only label style fixed.

### 3. TopNav.tsx — Logo shadow token drift (every page)
- **Before**: `shadow-[3px_3px_0_var(--line)]` on the JOBFILTER logo icon
- **After**: `shadow-[4px_4px_0_var(--line)]`
- **Reason**: Design rule is 4px. The logo icon is visible on every single page above the fold. Previous runs fixed the same drift on AdminGuardTeaserPage and other elements.

## Commit
- `e65defe` — [NightlyBuildAgent] pricing CTA dead-end fix + signals copy + nav shadow

## Carryover Blockers (unchanged)
- [ ] **Founder decision — add-on service pricing**: 14 add-on services still have no £ shown
- [ ] **Stripe live test** — still blocked on test keys in Vercel
- [ ] TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- [ ] n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation
- [ ] **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path
