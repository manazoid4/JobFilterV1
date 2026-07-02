# Changelog — 21 June 2026 (NightlyBuildAgent)

## Container state
- Fresh container, `node_modules` missing entirely. `npm install` (359 packages).
- HEAD detached, exactly at `origin/main` (`d522e4c`) — no divergence, no local-only work.
- `npm run build` GREEN (118 pages, Next.js), `npx tsc --noEmit` CLEAN before any changes.

## Founder activity check (per last run's recommendation)
- `git log` / GitHub `list_commits` confirm zero new commits since Run 3 (20 June) — current `main` HEAD is still that run's vault-doc commit. No new PRs open.
- Checked all 4 standing carryover blockers for any sign of being unblocked: no Stripe/Resend/SMTP/WhatsApp env vars present in this container either (same as every prior run — these are Vercel-side secrets this agent has never had access to, not a local config issue). TradeFlow URL scheme and add-on pricing are still founder decisions, untouched.
- Conclusion: nothing new to react to before falling back to a sweep, as recommended.

## Phase 1 — re-confirmed, no fake flows
- All 5 `setSubmitted`/`setSent`/`setEmailDone`/`setDone` forms (`PostJobPage`, `ForgotPasswordPage`, `FreeToolsPage`, `ProductAdvantagePage`, `WeeklySignalsPage`) read individually — each calls a real `fetch('/api/waitlist', ...)` or `supabase.auth.resetPasswordForEmail()` before flipping state. No fake flows.
- No broken imports — Next.js build itself fails on any unresolved import, and tonight's build was clean across all 118 routes.

## Regressions
- All 17 `codex-output/*.mjs` scripts run via `npx tsx`. Same known false-negative class as every prior run: `free-preview-live-contract-test` (needs a live server on :3000), `lead-engine-50-plus-quality-test-fixed`/`site-conversion-quality-test` (pre-existing `oneLeadRule` 0/42 baseline, confirmed not a regression in earlier runs via git-stash compare), `ten-postcode-source-smoke` (tonight failed on an upstream PCS HTTP 503/TLS error, not our code). All others pass.

## Observation (not actioned — flagging only, per "mention dead code, don't delete it")
- `vite.config.ts` and `index.html` are still present at the repo root from before the Next.js migration (PR #275, 15 June). `package.json`'s `dev`/`build`/`start` scripts are 100% `next`-based now and never reference Vite. These two files appear to be orphaned leftovers — not referenced by anything else, don't affect the live build. Also: this session's task brief and `CLAUDE.md` both still describe the stack as "React 19 + TypeScript + Vite frontend" — that line is stale post-migration (confirmed via `vercel.json`: `"framework": "nextjs"`, `outputDirectory: ".next"`). Worth a founder/doc cleanup pass, not a code change.

## Build status
- Build GREEN (118 pages), TypeScript CLEAN. No app code changed — independent verification found nothing new tonight (no founder commits, no unblocked carryovers, no fake flows, no broken imports, regressions at known baseline). This is the 6th+ consecutive run reaching "backlog genuinely exhausted" — see prior nights' changelogs.

## Carryover (unchanged, still blocked on founder/external)
- Founder decision — add-on service pricing (dno-brief, ozev-grant-pack, gas-safe-kit, etc. — zero price shown anywhere)
- Stripe live test — blocked on test keys in Vercel
- TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation
- NEW: stale Vite remnants (`vite.config.ts`, `index.html`) + stale "Vite frontend" stack description in `CLAUDE.md`/task brief — cosmetic, no urgency, flagged for a doc/cleanup pass whenever convenient.
