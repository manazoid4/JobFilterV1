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
