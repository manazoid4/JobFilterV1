# Changelog — 20 June 2026 (NightlyBuildAgent — Run 2)

## Container state
- Detached HEAD at `c342d26` (== `origin/main`, includes founder's PR #286 merged since Run 1). `git fetch origin main` + `git checkout -B main origin/main` resolved it. `npm install` (359 packages, missing entirely). Build GREEN, TypeScript CLEAN before changes.

## Bug found and fixed — competing hero CTAs on TerritoriesPage and NewsPage
- **Files**: `src/pages/TerritoriesPage.tsx:118-120`, `src/pages/NewsPage.tsx:133-140`
- **Root cause**: PR #286 (founder, just before this run) fixed HomePage's hero — two equal-weight `jf-button` CTAs (one yellow, one white) competing for attention — by demoting the secondary button to a text underline link. Checked the same pattern elsewhere per last run's tip ("re-reading a recent PR's diff for missed surfaces" beats generic NEEDLE sweeps): found the identical two-full-button hero pattern on two more pages.
  - TerritoriesPage hero: yellow "LOCK MY PATCH →" next to a full white "SCAN FREE FIRST — NO CARD NEEDED" button.
  - NewsPage hero: dark "SCAN MY POSTCODE FREE →" next to a full white "SEE LIVE SIGNALS" button.
- **Fix**: demoted each page's secondary hero button to a text underline link, matching HomePage's exact treatment (color-adjusted per page background — white/80 underline on TerritoriesPage's dark hero, ink/70 underline on NewsPage's yellow hero). Left lower-page `jf-button bg-white` CTAs alone (legitimate single-CTA bottom sections, not hero competition).
- Audited all other 23 files containing both a yellow and white `jf-button` (Compare* pages, FaqPage, MaterialPriceEnginePage, etc.) via Explore agent — all already have a single primary hero CTA with secondary actions correctly weighted as anchor/text links. No further instances of this bug class.

## Phase 1 — re-confirmed, no fake flows
- Audited via Explore agent: 5 form state-flip patterns (`ProductAdvantagePage`, `WeeklySignalsPage`, `PostJobPage`, `FreeToolsPage`, `ForgotPasswordPage`) all wired to real `/api/waitlist` fetch or Supabase calls with proper `res.ok`/error handling. No fake flows.
- 237 import statements across `src/` and `app/` audited — no broken local imports.

## Phase 2/3 — no new feature or copy changes
- All 5 Tier 1 brief features (scan counter, ICS export, won leaderboard, WhatsApp templates, trade scoring) confirmed already shipped, consistent with every run since 12 June.
- Declined a generic NEEDLE/copy sweep — confirms diminishing-returns pattern flagged by recent runs. Tonight's fix again came from checking a landed PR's diff for missed surfaces (same method that found the BIN tier RSS bug on 19/20 June), not a blind sweep.

## Regressions
- All 17 `codex-output/*.mjs` scripts run via `npx tsx`. Non-network ones pass. Known false-negative class unchanged: `free-preview-live-contract-test` (needs live server on :3000), `lead-engine-50-plus-quality-test-fixed` (`oneLeadRulePasses: 0/42`, confirmed pre-existing baseline), `site-conversion-quality-test` (`oneLeadRule: NO`, same root cause), `ten-postcode-source-smoke` (upstream PCS API HTTP 503 — external outage, not our code).
- Reverted regression-script-generated report artifacts (`codex-output/lead-engine-50-plus-quality-test-fixed.{json,md}`) before commit.

## Build status
- Build GREEN, TypeScript CLEAN. Pushed to main (`5a5205f`).

## Carryover (unchanged, still blocked on founder/external)
- Founder decision — add-on service pricing (dno-brief, ozev-grant-pack, gas-safe-kit, etc. — zero price shown anywhere)
- Stripe live test — blocked on test keys in Vercel
- TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation
