# Changelog — 19 June 2026 (NightlyBuildAgent — Run 2)

## Container state
- Fresh container, `node_modules` missing entirely; `npm install` (359 packages).
- Build GREEN (Next.js, all routes), TypeScript CLEAN before any changes.
- Since this morning's Run 1 (`2a9978b`), two PRs landed on main: #284 (cross-tenant ROI data leak + Stripe price-tampering fix) and #285 (standardise lead-tier naming to GOLD/SILVER/BRONZE). Both already merged — no action needed, confirmed build still green after them.
- Detached HEAD as usual; pushed via `git push origin HEAD:main` (clean fast-forward this time, no stale-ref conflict).

## Feature/fix built — closed Run 1's #3 carryover priority
- Run 1 flagged that `LeadDecision` (`src/lib/types.ts`) had no source-URL field at all, so even though Run 1's fallback-text fix improved the *generic* explain summary, `extractOpportunityAtoms()` (which hard-requires `lead.sourceUrl`) could never populate real atoms for a tracked lead's explain panel.
- Threaded it through the full chain:
  - `LeadDecision` gains `sourceUrl?: string` (`src/lib/types.ts`).
  - `FindJobsPage.trackLead()` now persists `sourceUrl: lead.url || lead.sourceUrls?.[0]` (`src/pages/FindJobsPage.tsx`).
  - `LeadDetailPage.handleExplain()` now sends `sourceUrl: lead!.sourceUrl ?? ''` to `/api/leads/explain` (`src/pages/LeadDetailPage.tsx`).
  - Removed the now-stale comment in `app/api/leads/explain/route.ts` noting callers "rarely carry sourceUrl" — they now do, when the upstream source provides one.
- **Verified live**: ran the Express + Next dev servers in `DEMO_MODE=true FULL_ACCESS_TEST_MODE=true`, scanned B14 electrical. Confirmed the wiring is correct end-to-end, but found that none of the current DEMO_MODE mock fetchers (FTS, ContractsFinder, CompaniesHouse, LandRegistry) populate `lead.url`/`sourceUrls` in this dataset — `url` is consistently `''`. So atoms still won't populate from synthetic demo data; this is a separate, larger data-pipeline gap (upstream fetchers not setting `url`), not a bug in tonight's plumbing. Flagging as a new follow-up below rather than chasing it further this run (would require touching every fetcher, not a single-run fix).
- Build GREEN, TypeScript CLEAN. Ran all 17 `codex-output/*.mjs` regressions via `npx tsx` (server running in `DEMO_MODE=true FULL_ACCESS_TEST_MODE=true`): 13/17 pass, same known false-negative class as every prior run (`free-preview-live-contract-test`, `lead-engine-50-plus-quality-test-fixed`, `site-conversion-quality-test`, `ten-postcode-source-smoke` — all need live external network access, e.g. real PCS/planning.data.gov.uk endpoints, not available in this container).
- Pushed to main (`873bc6a`).

## Next run priorities
1. **New gap found tonight**: none of the DEMO_MODE mock fetchers (`leadEngine/fetchers/*.ts`) set `lead.url`/`sourceUrls`, so the sourceUrl threading landed tonight has no real data to carry yet in demo/dev. Real fix is per-fetcher (set `url` from whatever document/listing link each source actually returns) — multi-file, not single-run. Lowest-effort fetcher to start with is probably `contractsFetcher.ts` (ContractsFinder/FTS — OCDS packages typically include a `tender.documents[].url` or release URL).
2. **Founder decision — add-on service pricing** (carried over many runs): `dno-brief`/`ozev-grant-pack`/`gas-safe-kit`/`swmp-template`/`fra-template`/`acm-report-pack`/`nasc-pack`/`wayleave-pack`/`cctv-compliance-pack`/`calc-pack`/`vantage`/`codex` still take a lead via a form with zero price shown anywhere.
3. **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks).
4. TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder).
5. n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation.
