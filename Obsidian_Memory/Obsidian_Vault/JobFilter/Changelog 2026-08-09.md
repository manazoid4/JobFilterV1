# Changelog 2026-08-09 — NightlyBuildAgent Run

## Build Status
- `npm run build`: PASS
- `npx tsc --noEmit`: PASS (zero errors)
- PR: https://github.com/manazoid4/JobFilterV1/pull/451

## Feature Built: Trade-Specific Scoring UX

**File:** `src/pages/FindJobsPage.tsx`

The top trade keyword (EV CHARGER, BOILER, REWIRE, CONSUMER UNIT, etc.) is now shown as a persistent yellow-on-black chip directly below the score badge on every lead card that has a matched trade reason. Previously this was hidden behind the "WHY?" button click. Electricians now immediately see "EV CHARGER" or "REWIRE" on the card face without any interaction required.

The "WHY?" button now shows "+N MORE" when multiple reasons exist, signalling there's more detail to expand.

## Copy Fixed

### FindJobsPage
- Micro-label: "LIVE SCANNER — 3 FREE SCANS, NO CARD" → "LIVE SCANNER — 3 FREE SCANS PER WEEK, NO CARD REQUIRED"
- Scan counter remaining message: "X free scans left this week" → "X free scans remaining — resets Monday"
- Lock message: "Buyer and submission context locked. Scanning remains free." → "Buyer detail and submission context locked — scan results still free."
- Lock CTA: "UNLOCK — £39/MO →" → "SEE BUYER DETAILS — £39/MO →"

### PricingPage
- Hero headline: "KNOW WHICH PUBLIC WORKS OPPORTUNITIES FIT YOUR FIRM — AND WHICH TO SKIP." → "STOP WASTING BID TIME ON JOBS THAT DON'T FIT. KNOW BEFORE YOU QUOTE."
- Hero micro-label: "FOUNDER-ASSISTED PILOT" → "PUBLIC-WORKS QUALIFICATION — £39/MONTH"
- Pilot card CTA: "START AFTER COVERAGE CHECK →" → "START £39/MO →"
- Free scan CTA: "SCAN FREE FIRST →" → "SCAN FREE — NO CARD REQUIRED →"
- Bottom CTA added competitor contrast: "Not on Checkatrade, Bark, or MyBuilder — this is public procurement, not domestic job leads."

## Site Health Fix

Removed the duplicate mid-list paywall interrupt that appeared between lead cards (was identical to the end-of-results yellow section). Three identical "SEE BUYER DETAILS — £39/MO →" CTAs in one scroll caused CTA blindness. Now there is a single, personalised end-of-results upgrade block.

## Tier 1 Feature Status (all confirmed done)

- [x] Scan counter — fully implemented and displayed
- [x] Google Calendar ICS export — fully implemented in LeadDetailPage + server route
- [x] Won leaderboard (WinStatsBanner) — component and API route both exist and wired
- [x] WhatsApp templates — quick_quote_offer and availability_check both present
- [x] Trade-specific scoring UX — **built this run**

## Next Run Priorities

1. **Fix WhatsApp prompt() call** — `LeadCard.tsx:57` uses `prompt()` which is blocked/suspicious on iOS Safari; replace with inline input that slides open in the card
2. **WinStatsBanner data** — verify `/api/wins/stats` is returning real data from `data/outcomes.jsonl` (the file may not exist in production; add graceful seeding or documented empty state)
3. **Pricing page objections section** — the Q&A section (line ~128) still has generic corporate answers; make them more specific to trade contractors' actual objections ("Can I use this as a plumber?", "Do you cover my area?")
