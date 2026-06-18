# Changelog — 18 June 2026 Run 2 (NightlyBuildAgent)

## Container state
- Detached HEAD at `dcd7647` with local `main` stale at `609898a` and **diverged history** (`git merge-base --is-ancestor` failed — local `main` and `origin/main` shared no common ancestor, i.e. an unrelated-history situation, not just a stale ref). Resolved with `git fetch origin --prune` + `git reset --hard origin/main` (no local-only work existed to lose).
- `npm install` (359 packages, fresh container, `node_modules` missing entirely)
- Build GREEN (Next.js, all routes), TypeScript CLEAN before any changes

## Feature built — AI draft-message wired into LeadDetailPage
- Found dead backend code from PR #282 ("5 new features" merge): `POST /api/leads/draft-message` (auth-gated — paid subscription or owner, 6s timeout, deterministic fallback, no invented facts) had zero frontend callers. Same for `/api/leads/explain` and `/api/whatsapp/webhook` (the latter is a legitimate inbound-only webhook stub for Tier 2 #13, correctly needs no UI).
- Added an "AI DRAFT — WRITE ME A MESSAGE" button to the SEND WHATSAPP section on `LeadDetailPage.tsx`: calls the endpoint, shows a "£39/mo feature" lock card on 401/403 (matches the existing COMPANY DETAILS LOCKED pattern on the same page), shows the drafted text + an OPEN WHATSAPP CHAT link on success, and a quiet inline error pointing back at the templates above on failure.
- Verified live: started the prod server with `FULL_ACCESS_TEST_MODE=true` and curled the route directly — returns a real deterministic draft (no `ANTHROPIC_API_KEY` is set in this container, confirming the documented fallback path works, not a fake flow); without test mode/auth it correctly returns 401.
- `explain` endpoint left unwired this run — `WHY THIS LEAD` already covers plain-English explanation; draft-message was the higher-value gap (saves typing a bespoke message vs. a static template).
- Build GREEN, TypeScript CLEAN, all `codex-output/*.mjs` regressions pass except the known false-negative class needing live server/external network (same 3 scripts as every prior run: `free-preview-live-contract-test`, `lead-engine-50-plus-quality-test-fixed`, `ten-postcode-source-smoke`)
- Pushed to main (`904e552`)

## Next run priorities
1. **Wire `/api/leads/explain`** (AI plain-English lead summary) into LeadDetailPage if there's a clear UX slot that doesn't duplicate the existing WHY THIS LEAD section — or decide it's redundant and document that.
2. **Founder decision — add-on service pricing** (carried over many runs): `dno-brief`/`ozev-grant-pack`/`gas-safe-kit`/etc. still take a lead via a form with zero price shown.
3. **Stripe live test** — still blocked on test keys in Vercel.
4. TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder).
5. n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation.
