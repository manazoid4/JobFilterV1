# Changelog — 17 June 2026 (NightlyBuildAgent)

## Session notes

- Local `main` ref was stale (diverged 132 commits from `origin/main` after a fetch surfaced `origin/main` had moved to `b9c037d`). Reset local `main` to `origin/main` via `git checkout -B main origin/main` — no remote changes, just fixed the local tracking branch. `node_modules` also had to be reinstalled from scratch (`npm install`) before `npm run build` / `tsc` would run.
- Build GREEN (Next.js, all routes), TypeScript CLEAN after the ref fix.

## Phase 1 — Fix Broken

- No build errors, no TypeScript errors, no broken relative imports across `app/` + `src/` (239 files scanned).
- Audited all `setSubmitted(true)` / `setEmailDone(true)` / `setDone(true)` call sites (ForgotPasswordPage, FreeToolsPage, ProductAdvantagePage, WeeklySignalsPage) — all wired to real Supabase/`/api/waitlist` calls before the state flip. No fake-submit forms found.

## Phase 2 — Tier 1 feature check

All 5 Tier 1 items listed in this run's brief were already built and verified working in the current `main`:
- Scan counter (FindJobsPage, localStorage, resets Monday, gated on `!OPEN_ACCESS`)
- ICS calendar export (`/api/leads/calendar.ics` + LeadDetailPage link)
- Won leaderboard (`/api/wins/stats?postcode=` + WinStatsBanner)
- WhatsApp templates — `quick_quote_offer` and `availability_check` both present in `chaseTemplates.ts`
- Trade-specific scoring — `leadEngine/scorer.ts` plumbing weights boiler/heating high; FindJobsPage surfaces trade-specific reason badges

No new feature build was needed this run — moved budget to Phase 3/4 instead.

## Phase 3 — Copy polish

- `src/pages/MaterialPriceEnginePage.tsx` — hero was missing "No credit card required" trust line (only free tool page without it). Added under hero body copy.
- `src/pages/TradieStackPage.tsx` — primary buy CTA "ENQUIRE — EMAIL US" replaced with "BUY TRADIESTACK — £450 →" (price-anchored, concrete action).

## Phase 4 — NEEDLE site health check

Spawned an Explore agent across the long-tail pages (free-tools pack pages, MaterialPriceEnginePage, SmartQuotePage, TradieStackPage, etc.) that hadn't been touched in the last ~50 nightly runs. Findings:
1. MaterialPriceEnginePage missing trust line — FIXED (see above).
2. TradieStackPage weak CTA — FIXED (see above).
3. SmartQuotePage bracketed placeholder text in the quote preview — investigated, not a bug: it's a deliberately blurred/locked teaser behind a paywall overlay, working as designed.

No EPC/data-source naming violations found in public copy. No corporate jargon (leverage/utilise/seamless/etc.) found anywhere in `src/pages`.

## Build status

- BUILD: PASS
- TYPESCRIPT: CLEAN (0 errors)
- Pushed to `main`: `464dc38`

## Next run priorities

1. **Stripe live test** — still blocked on test keys in Vercel (recurring blocker, many runs).
2. **TradeFlow "Send to TradeFlow" button** — still blocked on URL scheme from founder.
3. **n8n workflow 16 (LLM Brief Builder)** — still blocked on SMTP creds + manual activation.
4. Codebase is very mature — most Tier 1/Tier 2 roadmap items are already built. Future runs should focus on: (a) verifying the 3 founder/infra blockers above are still blocked, (b) deeper NEEDLE passes on the free-tools pack pages (AcmReportPack, NascPack, OzevGrantPack, GasSafeKit, SwmpTemplate, FraTemplate, CctvCompliancePack, DnoBrief, WayleavePack) which have had the least polish attention, (c) Tier 2 items not yet confirmed built: TradeFlow integration (blocked), PlanWire integration (not started), Xero/FreeAgent (intentionally deferred per roadmap).
