# Changelog — 19 June 2026 (NightlyBuildAgent)

## Container state
- HEAD detached at `c752a4a` (== `origin/main`, no real divergence). Local `main` branch ref was stale at `609898a` — irrelevant for work (detached HEAD), but `git push origin main` failed non-fast-forward because it tried to push the stale local branch ref; fixed by pushing `HEAD:main` directly.
- `node_modules` missing entirely (fresh container) — `npm install` (359 packages).
- Build GREEN (Next.js, all routes), TypeScript CLEAN before any changes.

## Spot-check from Run 3's top carryover priority — found and fixed a real gap
- Run 3 (18 June) asked for a live spot-check of the "WHAT THIS MEANS" explain panel against a real, non-synthetic lead (it had only been curl-tested with a hand-written description).
- Started both the Express backend (`server.ts`, port 3000) and Next dev server (port 3100) in `DEMO_MODE=true FULL_ACCESS_TEST_MODE=true`, ran a real `POST /api/leads/search` scan for B14 electricians, and fed real returned leads (FTS council contract, DirectorySignal rewire/EICR job) into `POST /api/leads/explain`.
- **Found the bug**: `LeadDetailPage.handleExplain()` only ever sends `{title, description, trade, estimatedValue, source}` to the endpoint — never `sourceUrl`. The route's deterministic (no-AI) fallback calls `extractOpportunityAtoms(lead)`, which hard-requires `lead.sourceUrl` (`if (!sourceDocumentUrl) return [];`) and silently returns `[]` without it. Result: **every real call from the UI, for every lead, always fell through to the generic "{trade} opportunity from {source}." line** whenever AI is unavailable (no `ANTHROPIC_API_KEY`, timeout, or rate limit) — regardless of how specific the actual lead description was. Not a fake flow (the line is still truthful), but a real quality regression in exactly the situation the fallback exists to handle.
- **Fix** (`app/api/leads/explain/route.ts`): fallback now uses the lead's own title before the generic line — `"{trade} job: {title}."` instead of `"{trade} opportunity from {source}."`. One-line change, no risk to the AI-enabled path (unaffected) or to atom extraction elsewhere in the codebase (unchanged).
- Verified live: re-ran the same DirectorySignal rewire lead through the endpoint — fallback summary went from `"electrical opportunity from DirectorySignal."` to `"electrical job: Full rewire on 1970s 3-bed semi."`.
- Build GREEN, TypeScript CLEAN, 13/17 `codex-output/*.mjs` regressions pass (same known false-negative class as every prior run: `free-preview-live-contract-test`, `lead-engine-50-plus-quality-test-fixed`, `site-conversion-quality-test`, `ten-postcode-source-smoke` — all need live network/external APIs, not a real bug).
- Pushed to main (`2a9978b`).

## Next run priorities
1. **Founder decision — add-on service pricing** (carried over many runs): `dno-brief`/`ozev-grant-pack`/`gas-safe-kit`/`swmp-template`/`fra-template`/`acm-report-pack`/`nasc-pack`/`wayleave-pack`/`cctv-compliance-pack`/`calc-pack`/`vantage`/`codex` still take a lead via a form with zero price shown anywhere.
2. **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks).
3. **Consider threading `sourceUrl`/`sourceUrls` onto `LeadDecision`** (`src/lib/types.ts`) so `extractOpportunityAtoms()` can actually populate atoms for the explain panel's AI-enabled prompt context and any future fallback richness — currently `LeadDecision` has no source-URL field at all, so this is a multi-file thread (normaliser → FindJobsPage.trackLead → LeadDetailPage), not a single-run fix. Today's fix only patched the fallback's text quality, not the underlying missing field.
4. TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder).
5. n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation.
