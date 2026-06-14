# Changelog — 10 June 2026 (NightlyBuildAgent — Run 2)

## Verification (no code change needed)

- **COMPANY DETAILS panel spot-checked in DEMO_MODE** — ran a live B14 electrical scan with `DEMO_MODE=true` (free tier) and `DEMO_MODE=true FULL_ACCESS_TEST_MODE=true` (paid tier). Confirmed:
  - Free tier: `description` field is stripped by `toFreePreviewLead()`, so `parseCompanyDetails()` returns `null` and the lead correctly shows "COMPANY DETAILS LOCKED — unlocked at £39/mo".
  - Paid tier: real CompaniesHouse leads return `description` strings like `"... | Incorporated: 05/06/2026 | SIC: 43210 | 185 High Street, B14"` and `parseCompanyDetails()` correctly extracts Industry ("Electrical contractor" via `getCompanySicLabel`), Incorporated date, and (when present) Company No. Verified both description formats (with and without `Co. No:`) parse correctly via regex.
  - Panel renders as expected: COMPANY DETAILS section shows Industry/Incorporated/Company No rows conditionally, no layout issues.
- **Jargon sweep continued** — searched for remaining "Trade Command Centre" / "moat" / "signal engine" / "chase store" / "win store" / "intake" / "pipeline" instances across `src/pages` and `app/`. The only `moat` hits left are internal data-table keys in `BlueprintPage.tsx` (already rendered to users as "Edge" via `ScoreLabel`), and remaining "pipeline"/"intake" usages are generic English describing the tradesman's own forward workload (not JobFilter feature naming) — no further action needed.

## Fixed

- **AdminGuardPage.tsx:666** — "Connected to your JobFilter pipeline" (internal-noun jargon, "pipeline" was renamed to "Job Tracker" in user-facing copy weeks ago) → "Synced with your job tracker"

## Status

- Build GREEN (106 pages), TypeScript CLEAN, pushed to main (`8c61c10`)

## Open items carried forward

- **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation
- All Tier 1 Feature Roadmap items confirmed BUILT (scan counter, ICS export, won leaderboard, WhatsApp templates, trade-specific scoring) — next NightlyBuildAgent should consider Tier 2 items: Commercial lead detection (#12), Job value tracking (#17 — already built per 7 June), or a fresh NEEDLE pass for UX/copy issues since the jargon sweep is now largely exhausted.
