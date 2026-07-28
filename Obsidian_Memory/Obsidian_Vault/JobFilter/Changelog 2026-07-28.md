# Changelog 2026-07-28 — NightlyBuildAgent Run

## Build Status
- npm run build: PASS
- npx tsc --noEmit: PASS (0 errors)

## Phase 1 — Fix Broken
- No TypeScript errors found
- No broken imports detected
- No fake form flows found (all forms wired to real endpoints)
- Fixed: Vercel deployment blocked by hourly cron on Hobby plan

## Phase 2 — Tier 1 Features
All 5 Tier 1 features were already fully built:
- Scan counter with localStorage weekly reset: DONE
- Google Calendar ICS export (backend + frontend link): DONE
- WinStatsBanner (Supabase-backed wins stats): DONE
- WhatsApp templates (quick_quote_offer + availability_check): DONE
- Trade-specific scoring reasons: DONE

## Phase 3 — Copy Polish

### FindJobsPage.tsx
- Scan limit message: "Buyer and submission context locked. Scanning remains free." → "Buyer details locked — scanning stays free. Upgrade to see who to call."
- Pre-scan empty state h2: "CHECK THE CURRENT PUBLIC-TENDER FEED." → "WHAT'S LIVE IN YOUR AREA? SCAN AND SEE."
- Upgrade nudge CTA note: "Official source evidence · public opportunity" → "No credit card required to browse"
- Upgrade nudge body: Replaced FTS jargon with competitor fear + proof ("Checkatrade sells the same lead to 5 other trades...")

### PricingPage.tsx
- CTA label fix: "START AFTER COVERAGE CHECK →" → "START — £39/MO →" (matched hero button)
- priceNote: Made clearer — "Run the free scan first to confirm coverage for your trade and region."
- Body: "Scan free first — coverage varies by trade, region and timing." (removed confusing "delivery features activate" language)

## Phase 4 — Site Health Check

### NEEDLE (top 3 UX issues found)
1. Scan limit message used FTS jargon ("Buyer and submission context") — FIXED
2. Pre-scan prompt used "public-tender feed" language confusing for domestic trades — FIXED
3. Pricing page had contradictory CTAs ("START £39/MO" vs "START AFTER COVERAGE CHECK") — FIXED

### BUILDER: Fixed pricing CTA contradiction
### CRITIC: Clearer in <3 seconds — YES
### REVENUE: Removes hesitation point blocking £39/mo subscriptions — YES

## Infrastructure Fix
- vercel.json: Changed cron schedule from `0 * * * *` (hourly) to `0 8 * * *` (daily 8am UTC)
- Hobby plan only allows daily crons — deployment was failing before this fix
- Cron was added in PR #383 before this run; alerts will now actually fire daily

## PR Created
- Branch: nightly/2026-07-28-copy-polish
- PR: https://github.com/manazoid4/JobFilterV1/pull/402

## Codex Review Loop (all addressed in PR #402)

### Commit a79980d — FindJobsPage nudge copy
- P1: "No shared auction" claim → fixed with explicit non-exclusive disclaimer
- P1: Categorical field promise → fixed with "where available" qualifier

### Commit 90dde49 — Cron cadence alignment
- P1: Hourly alert contract broken (Hobby plan) → removed instant option from UI, updated labels to "DAILY SOURCE CHECK" / "Daily check", aligned regression test assertions to `0 8 * * *`

### Commit 72e4c7e — Remove duplicate instant option
- P2: Duplicate daily option (instant+daily same cadence) → collapsed FREQ_OPTIONS to weekly+daily only, aliased `FREQUENCY_MS.instant` to 24h

### Commit 419516c — API normalization + sender dedup
- P2: API still accepts instant, no DB migration → POST/PATCH normalize instant→daily; sender deduplicates by (user_id, trade, location, normalizedFrequency)

### Commit 8506b4f — Fix dedup key collapse
- P2: Dedup key collapsed weekly+daily pairs → key now includes normalized frequency so weekly+daily produce different keys and both fire

### Commit de65ac8 — Sync suppressed rows
- P2: Suppressed instant rows keep stale timestamps → bulk-updates `last_checked_at` for suppressed rows after each cron run

### Commit e6d61a5 — PATCH unique constraint collision
- P2: PATCHing instant row's frequency→daily 500s on unique constraint → 23505 handler added: fetches source row, merges non-frequency updates into daily row, deletes instant row

### Commit 4d501e3 — Fix PATCH collision handler bugs
- P2: Hardcoded 'daily' merge target (breaks daily→weekly) + delete-before-merge data loss → uses actual `update.frequency` as target, merges first then deletes source row

## Final CI State (commit 4d501e3)
- check: SUCCESS
- Vercel: Ready
- Meticulous: No baseline yet (first PR since setup)
