# Changelog — 18 June 2026 Run 3 (NightlyBuildAgent)

## Container state
- HEAD detached, local `main` stale at `609898a` while `origin/main` had moved to `726d2db`. `git fetch origin main` + `git checkout -B main origin/main` resolved it (clean fast-forward, no local-only work).
- `node_modules` missing entirely (fresh container) — `npm install` (359 packages).
- Build GREEN (Next.js, all routes), TypeScript CLEAN before any changes.

## Phase 1 re-confirmed
- All 4 `setSubmitted`/`setSent`/`setEmailDone` forms (`PostJobPage`, `FreeToolsPage`, `ProductAdvantagePage`, `WeeklySignalsPage`) wired to real `fetch('/api/waitlist', ...)` — no fake flows.

## Feature built — AI plain-English lead explainer wired into LeadDetailPage
- Run 2's top carryover priority: `POST /api/leads/explain` (auth-gated, 6s timeout, deterministic fallback, atom-evidence guardrails) had zero frontend callers since PR #282.
- Confirmed it's not redundant with the existing `WHY THIS LEAD` checklist section — that section is scoring flags (Local/Urgent/Photos/etc), not a description rewrite. The actual gap: `lead.description` (raw council/planning text, up to 300 chars) is captured on every lead but was only ever surfaced via `parseCompanyDetails()` for CompaniesHouse leads — every other source's jargon-heavy raw record was invisible to the tradesman.
- Added a new "WHAT THIS MEANS" panel on `LeadDetailPage.tsx`, shown whenever `lead.description` is present (any source): "EXPLAIN THIS LEAD IN PLAIN ENGLISH" button → calls the endpoint with `{title, description, trade, estimatedValue, source}` → shows a £39/mo lock card on 401/403 (same pattern as the AI draft-message card from Run 2) → shows the one-line summary + plain-English rewrite on success → quiet inline error pointing back at the DETAILS section above on failure.
- Verified live: `FULL_ACCESS_TEST_MODE=true` + direct curl against a synthetic planning-permission description returned a real deterministic fallback (`"ai":false` — no `ANTHROPIC_API_KEY` set in this container, confirming the documented fallback path, not a fake flow). Restarted the server *without* test mode and confirmed the same unauthenticated request correctly 401s.
- Build GREEN, TypeScript CLEAN, all 17 `codex-output/*.mjs` regressions pass except the same known false-negative class as every prior run (`free-preview-live-contract-test`, `lead-engine-50-plus-quality-test-fixed`, `site-conversion-quality-test`, `ten-postcode-source-smoke` — all need a live server/external network, not a real bug). Reverted the two generated report artifacts those scripts overwrite (`lead-engine-50-plus-quality-test-fixed.json`/`.md`) before committing — they're test output, not source.
- Pushed to main (`15f1d3f`).

## Next run priorities
1. **Founder decision — add-on service pricing** (carried over many runs): `dno-brief`/`ozev-grant-pack`/`gas-safe-kit`/`swmp-template`/`fra-template`/`acm-report-pack`/`nasc-pack`/`wayleave-pack`/`cctv-compliance-pack`/`calc-pack`/`vantage`/`codex` still take a lead via a form with zero price shown anywhere.
2. **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks).
3. **Spot-check "WHAT THIS MEANS" panel against a real non-CompaniesHouse, non-synthetic lead** — only verified via curl with a hand-written description this run; worth a visual check once a live scan with real planning-portal text is available, desktop + 375px.
4. TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder).
5. n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation.
