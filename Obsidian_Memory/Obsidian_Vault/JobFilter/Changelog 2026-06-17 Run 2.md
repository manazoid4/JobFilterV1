# Changelog — 17 June 2026 (NightlyBuildAgent — Run 2)

## Session notes

- Started detached HEAD at `b4a91e8` (== `origin/main` after a `git fetch`, no real divergence — local cached ref was stale from a snapshot). `git checkout -B main origin/main` resolved it. `npm install` (359 packages, fresh container). Build GREEN (Next.js, all routes), TypeScript CLEAN before changes.

## Phase 1 — Fix Broken

- No build errors, no TypeScript errors. No fake `setSubmitted(true)`/`setDone(true)` flows found (consistent with this morning's Run 1 audit).

## Phase 2 — Feature audit

- All 5 Tier 1 brief items already built (scan counter, ICS export, won leaderboard, WhatsApp templates, trade-specific scoring) — re-confirmed, no changes needed.
- Closed a real gap instead: **Quantity Surveyors was missing from `ForYourTradePage`'s trade selector** (17/18 trade pages covered, flagged in the 16 June Run 3 to-do). `/trade/quantity-surveyors` has had a live route + content page (`TradeQuantitySurveyors.tsx`) for a while, but the interactive "For Your Trade" comparison tool never listed it. Added the 18th entry (`src/pages/ForYourTradePage.tsx`), matching the existing signal/value/example format and the actual QS page's commission-based framing (cost plans, tender docs, procurement-cycle timing).

## Phase 3/4 — NEEDLE pass on under-polished pages

- Did a deep pass on the 9 least-polished pages flagged by Run 1 (AcmReportPack, NascPack, OzevGrantPack, GasSafeKit, SwmpTemplate, FraTemplate, CctvCompliancePack, DnoBrief, WayleavePack) — all 9 are thin route wrappers around one shared component, `src/pages/ProductAdvantagePage.tsx`. Read the whole shared component plus every trade's content block.
  - Findings: clean. No jargon, no internal-source naming, no design-system violations, real `fetch()` precedes every state flip.
  - One candidate fix (add "No credit card required" near the SUBMIT TO TEAM button) was investigated and **rejected** — these are paid human-staffed add-on services (confirmed via `addOns` references on Trade* pages), not free CTAs, and no price is disclosed anywhere in the codebase or backend. Adding "no card needed" copy would be a false claim. Real fix here is a founder pricing decision, not a copy tweak — flagged below instead of guessing.
  - Ran every static regression script in `codex-output/` via `npx tsx` (plain `node` fails on bare `.ts` import resolution — known false-negative, not a real bug): all PASS. The two "live" tests (`free-preview-live-contract-test.mjs`, `site-conversion-quality-test.mjs`) need a running dev server and weren't run this session — same as most prior runs.

## Build status

- BUILD: PASS
- TYPESCRIPT: CLEAN (0 errors)
- Pushed to `main`: `3908cae`

## Next run priorities

1. **Founder decision needed — add-on service pricing**: `dno-brief`, `ozev-grant-pack`, `gas-safe-kit`, `swmp-template`, `fra-template`, `acm-report-pack`, `nasc-pack`, `wayleave-pack`, `cctv-compliance-pack`, `calc-pack`, `vantage`, `codex` all collect a lead via `SUBMIT TO TEAM` with zero price disclosed anywhere (no Stripe price ID, no £ figure on the page). Either these are free perks of the £39/mo plan (then say so) or paid add-ons (then a price/range needs to be on the page before the tradesman fills in contact details). Until decided, do not add "No credit card required" — it would be a false claim.
2. **Stripe live test** — still blocked, no test keys configured in this container's env (`STRIPE_SECRET_KEY` etc all blank). Recurring blocker across many runs.
3. **TradeFlow "Send to TradeFlow" button** — still blocked on URL scheme from founder.
4. **n8n workflow 16 (LLM Brief Builder)** — still blocked on SMTP creds + manual activation.
5. Codebase is very mature — Tier 1/Tier 2 roadmap items are essentially exhausted of quick wins. Future runs should keep doing fresh NEEDLE passes on pages not recently touched, and resist inventing speculative "fixes" (like guessed pricing copy) when the real blocker is a business decision, not code.
