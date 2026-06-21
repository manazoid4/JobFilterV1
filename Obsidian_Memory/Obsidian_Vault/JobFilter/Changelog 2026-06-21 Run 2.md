# Changelog — 21 June 2026 (NightlyBuildAgent — Run 2)

## Container state
- Fresh container, `node_modules` missing entirely. `npm install` (359 packages).
- HEAD detached, exactly at `origin/main` (`78ba81f`) — Run 1 today (`d522e4c`) plus one new founder-authored merge since.
- `npm run build` GREEN (Next.js), `npx tsc --noEmit` CLEAN before any changes.

## Founder activity check
- New merge since Run 1 today: PR #287 "Cross-link the 14 add-on service pages and surface them on Pricing" — `ProductAdvantagePage` now cross-links the other 13 add-on services, `PricingPage` gets a new "quoted per job" section linking all 14. Reviewed the diff: no fabricated prices, copy stays honest that add-on pricing is still a pending founder decision. Sound, no fix needed.
- This makes real progress on the long-carried "add-on service pricing" item: it no longer hides the add-ons from Pricing or strands a visitor on one product page — it just doesn't fabricate a price (correctly, since that's still undecided).

## Correction to a repeated prior-run assumption
- Multiple past runs (20–21 June) flagged `vite.config.ts` / `index.html` as "orphaned leftovers from the Next.js migration, safe to delete eventually." Checked this directly tonight before acting on it: **they are not orphaned.** `server/app.ts` (the standalone Express backend, started via `server.ts`, used for local API-only dev/testing per several past runs' own methodology) branches on `NODE_ENV`: in non-Vercel production it serves `dist/index.html`, and outside production it spins up Vite's dev middleware (`createServerVite()`), which uses `vite.config.ts`. `api/index.ts` (the Vercel serverless function for `/api/*`) also imports `createApp` from the same file. Deleting these two files would have broken that legacy Express dev path. No deletion made — flagging the correction so no future run repeats the mistaken assumption or acts on it.

## Phase 1 — re-confirmed, no fake flows
- All `setSubmitted`/`setSent`/`setEmailDone`/`setDone` sites re-grepped, now 6 files (added `FindJobsPage.tsx`'s `OutcomeActions` component — contacted/no_answer/quoted/lost/won buttons). Read in full: every status report calls real `fetch('/api/leads/outcome', ...)`, confirmed live at `server/routes/outcomeReport.ts:19`. No fake flow.
- Next.js build itself fails on unresolved imports — clean build confirms no broken imports.

## Regressions
- All `codex-output/*.mjs` run via `npx tsx`. Same known false-negative class as every prior run: `free-preview-live-contract-test` (needs live server on :3000), `lead-engine-50-plus-quality-test-fixed` / `site-conversion-quality-test` (pre-existing `oneLeadRule` 0/42 baseline), `ten-postcode-source-smoke` (upstream PCS HTTP 503/TLS error tonight, not our code). All others pass.

## Build status
- Build GREEN, TypeScript CLEAN. No app code changed — founder's own PR covered tonight's one real opportunity, and tonight's independent check found nothing else actionable. Vault-doc-only commit.

## Carryover (unchanged, still blocked on founder/external)
- Stripe live test — blocked on test keys in Vercel
- TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation
- Add-on service pricing — now honestly cross-linked (PR #287), but still no actual £ shown; founder decision on free-perk-vs-paid-addon still pending
