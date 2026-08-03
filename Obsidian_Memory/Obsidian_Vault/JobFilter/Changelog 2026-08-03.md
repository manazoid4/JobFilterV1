# Changelog 2026-08-03 — NightlyBuildAgent Run

## Build Status
- npm run build: PASS
- npx tsc --noEmit: PASS (0 errors)

## Phase 1 — Fix Broken
- No TypeScript errors found
- No broken imports detected
- All existing Tier 1 features already wired (scan counter, ICS export, WinStatsBanner, WhatsApp templates)

## Phase 2 — Feature Built
**Trade-specific scoring UX** (`src/pages/FindJobsPage.tsx`)

Added `TRADE_TITLE_KEYWORDS` map covering 8 trades. Modified `parseTradeReasons()` to accept the lead object and, when no highlighted trade-specific reasons come from the API, scan the lead title for trade-relevant keywords and surface them as a highlighted badge (e.g. "EV CHARGER — YOUR TRADE" for electricians, "BOILER — YOUR TRADE" for plumbers).

Changed `LeadResultCard` to pass the `lead` object to `parseTradeReasons`.

## Phase 3 — Copy Polished
**FindJobsPage** — 4 surgical changes:
1. Scan-exhausted message: "Buyer and submission context locked. Scanning remains free." → "3 free scans used — you can still scan, buyer details need Full Access"
2. Upgrade nudge micro-label: competitor callout "NOT ON CHECKATRADE. NOT ON BARK. THESE ARE LIVE CONTRACTS."
3. Upgrade nudge headline/CTA: now names buyer + contract value + deadline specifically; added "No credit card required to browse"
4. No-scan CTA: "SCAN MY AREA →" → "SCAN FREE — NO CARD →"

## Phase 4 — Site Health
**NEEDLE**: Scan-exhausted message was corporate/confusing — plain language fix
**BUILDER**: Fixed (see Phase 3 item 1)
**CRITIC**: Yes — clearer in <3 seconds
**REVENUE**: Yes — reduces churn risk from free-tier confusion; doesn't falsely suggest scanning is blocked

## Bug Fixed (CI)
`vercel.json` cron expression `0 * * * *` (hourly) fails on Vercel Hobby accounts. Changed to `0 7 * * *` (daily at 07:00 UTC — 8am UK time).

## PR
https://github.com/manazoid4/JobFilterV1/pull/423

## Files Changed
- `src/pages/FindJobsPage.tsx`
- `vercel.json`
