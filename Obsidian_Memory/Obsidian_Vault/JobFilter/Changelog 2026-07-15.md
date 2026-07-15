# Changelog — 2026-07-15 Run 1 (NightlyBuildAgent)

## Summary
NEEDLE sweep found 3 real UX issues — all fixed. font-bold sweep completed on 5 previously-missed pages. Build and TypeScript both clean.

## Changes Made

### NEEDLE Fix 1 — DashboardPage yellow-on-yellow cards (HIGHEST IMPACT)
**File:** `src/pages/DashboardPage.tsx` (lines 363 + 369)

The empty-state SCAN card and LAST SCAN card both used `bg-[var(--yellow)]` inside a `bg-[var(--yellow)]` section. On new user's first dashboard view, the primary "SCAN NOW →" action card was near-invisible — only distinguishable by a 4px shadow. Direct activation funnel risk.

Fix:
- Empty-state card: `bg-[var(--yellow)]` → `bg-white` with `hover:bg-[var(--yellow)]` (lifts off background, hover retains brand colour)
- LAST SCAN card: `bg-[var(--yellow)]` → `bg-white` (consistent with adjacent TRACKING and RESULTS cards which already used bg-white)

### NEEDLE Fix 2 — AdminGuardTeaserPage ghost button invisible on dark background
**File:** `src/pages/AdminGuardTeaserPage.tsx` (line 69)

"OPEN DASHBOARD →" button used `bg-white/10 border-white/20 shadow-none` inside `bg-[var(--ink)]` section. At 10% white fill on near-black background, the button read as floating text — not interactive. Users who wanted to explore before upgrading couldn't find the secondary path.

Fix: `bg-white/10 text-white border-white/20 shadow-none` → `bg-white text-[var(--ink)]` (full contrast).

### font-bold sweep — 5 pages
Applied `font-black` → `font-bold` on multi-sentence description paragraphs. Single-line labels, badges, micro-labels, and CTA button text kept at `font-black`.

**DashboardPage.tsx** (6 changes):
- Alert setup description paragraph (line 95)
- Hero body copy "Find jobs before Checkatrade lists them..." (line 263)
- Territory locked paragraph "Gold leads to you first..." (line 274)
- Territory unlocked warning paragraph (line 279)
- Empty-state "YOUR FIRST SCAN IS FREE" description (line 345)
- Win review prompt "Job was won yesterday..." (line 461)
- (Also fixed hero description `font-black` → `font-bold` in this pass)

**AdminGuardTeaserPage.tsx** (1 change):
- Hero description paragraph (line 59)

**MethodologyPage.tsx** (4 changes):
- Hero paragraph (line 77)
- Pipeline step bodies in map (line 102)
- Scoring section paragraph (line 120)
- CTA paragraph (line 213)

**FaqPage.tsx** (3 changes):
- Hero paragraph (line 66)
- Free-scan CTA paragraph (line 92)
- Support section paragraph (line 106)

**TipsPage.tsx** (2 changes):
- Tip body text in map (line 32)
- CTA paragraph (line 40)

## Invariants Preserved
- `font-black` kept: single-line labels, badges, micro-labels, button text, short disclaimers, guarantee lines, link text, table/list item text
- No route paths changed
- No new pages created
- No GOLD/SILVER/BRONZE label changes
- No GDPR-adjacent data changes

## Build Status
- `npx tsc --noEmit`: clean
- `npm run build`: all 113 pages built successfully

## Git
- Commit: `[NightlyBuildAgent] DashboardPage yellow-on-yellow fix + ghost button fix + font-bold sweep (5 pages)`
- Branch: main
- Push: success (`3e8f2c5`)

## Carryover Blockers (unchanged)
- Add-on service pricing — blocked on founder decision
- Stripe live test — blocked on Vercel test keys
- TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- n8n workflow 16 — blocked on SMTP creds + manual activation
