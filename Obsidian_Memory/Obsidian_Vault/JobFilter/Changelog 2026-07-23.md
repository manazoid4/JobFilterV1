# Changelog 2026-07-23 — NightlyBuildAgent Run

## Context

Vault files were removed in commit 13b5241 (Clean the public JobFilter repository). This is the first vault entry post-clean. Product has pivoted from tradesman-consumer to B2B public-works qualification for 5–25-person contractors (FTS & Commercial Workflows, PR #383).

## Build Status

- **npm install** required on fresh container (node_modules absent)
- **Build**: PASS after install
- **TypeScript**: CLEAN (0 errors)

## Phase 1 — Fix Broken

No broken imports. No fake form flows. All Tier 1 features confirmed built:
- Scan counter: ✅ (FindJobsPage lines 432–448, localStorage-based, resets Monday)
- Google Calendar ICS export: ✅ (server/routes/calendarExport.ts + LeadDetailPage)
- Win leaderboard: ✅ (WinStatsBanner.tsx + server/routes/outcomeReport.ts /api/wins/stats)
- WhatsApp templates: ✅ (chaseTemplates.ts — quick_quote_offer + availability_check present)
- Trade-specific scoring: ✅ (parseTradeReasons() in FindJobsPage)

## Phase 2 — Tier 1 Features

All already built. No new feature required.

## Phase 3 — Copy Polish

### PricingPage (src/pages/PricingPage.tsx)

1. Added 5th FAQ: "How is this different from Checkatrade, BuildAlert or Bark?" — names competitors explicitly per copy rules, differentiates B2B public-works focus from shared homeowner lead model
2. Hero free-scan CTA: "SCAN FREE FIRST →" → "SCAN FREE — NO CARD NEEDED →"
3. Hero sub-copy: Made more decisive — "Scan first. Pay only if the coverage fits your firm."
4. Plan card checkout label: Standardised "START AFTER COVERAGE CHECK →" → "START £39/MO →" (the old label implied checkout wasn't starting, which was misleading)

### FindJobsPage (src/pages/FindJobsPage.tsx)

1. Exhausted-scan upgrade CTA: "UNLOCK — £39/MO →" → "UNLOCK BUYER DETAILS — £39/MO →" (specific about what unlocks)

## Phase 4 — Site Health

**NEEDLE (top UX issue found):** Pricing page bottom section "VERIFY COVERAGE BEFORE YOU PAY" had paid CTA as primary button, free scan as secondary — directly contradicting the section headline. This is a classic conversion anti-pattern.

**BUILDER (fix applied):** Flipped button order in bottom CTA section. Free scan (SCAN FREE — NO CARD NEEDED →) is now primary (dark/ink button on yellow bg). Paid (START £39/MO →) is secondary (white button).

**CRITIC:** Yes — section readable in <3 seconds. Headline and primary CTA now agree: "verify before paying" + free scan button first.

**REVENUE:** Yes — removing the CTA/headline contradiction and surfacing "NO CARD NEEDED" reduces drop-off. Visitors now see the expected flow: scan free → check coverage → decide.

## Infrastructure Fix

**Vercel deployment blocker fixed (vercel.json):**
- Hourly cron `0 * * * *` was blocking all Vercel Hobby plan deployments
- Changed to `0 7 * * *` (daily, 7am UTC) — within Hobby plan limits
- The hourly cron was NEVER running on Hobby plan anyway, so this enables the feature for the first time

## Commit & PR

- Branch: `nightly/2026-07-23-cta-copy-polish`
- PR: #390
- Commits: 6b8fee3 (copy/CTA changes), 182d27e (cron fix)
- Vercel: Building (unblocked after cron fix)

## Next Run — Top 3 Priorities

1. **Trade-specific scoring UX**: Make scoring reasons on lead cards more specific per trade (electrician → EV charger/rewire, plumber → boiler/bathroom). The parseTradeReasons() extracts keywords but doesn't inject trade-context labels. Consider a trade-to-keyword hint map.
2. **Signals page audit**: Recent commits did font-bold sweeps there — worth checking if any copy still uses vague "nearby" or "platform" language. Apply "8 miles from you" specificity rule.
3. **Competitor comparison pages** (CompareCheckatradePage etc.): These pages still reference old consumer-tradesman product features (WhatsApp alerts, planning data, HMO licensing). Need updating to reflect the B2B pivot — or at minimum a disclaimer that the consumer product has been replaced by the B2B qualification pilot.
