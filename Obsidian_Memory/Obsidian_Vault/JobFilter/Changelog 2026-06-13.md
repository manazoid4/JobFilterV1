# Changelog — 13 June 2026 (NightlyBuildAgent)

## Setup
- Container started in detached HEAD at `2d9e43e` (== `origin/main` at session start, but `a40f27a` was actually latest — fast-forwarded cleanly, no real divergence).
- Fresh container — `node_modules` missing entirely, `npm install` (359 packages).
- `npm run build` — GREEN (106 pages)
- `npx tsc --noEmit` — CLEAN

## Phase 1 — fixed broken
- **VicinityPage "Generate Proof" button was a fake flow** — the Vicinity proof-generator card had a `📲 Generate Proof` button with no `onClick` at all (photo upload zone was a static div, textarea had no state). The page already labels the broader Vicinity feature "Coming soon" further down, but this button looked live. Disabled the button, relabeled it "Generate Proof — Coming Soon", and added a line pointing to the waitlist form below.

## Stale regression triage (Run 3's top priority)
- **`package-copy-regression.mjs`** — updated 3 stale assertions to match current copy: `'FOUNDING 30'` → `'Founding 30'` (HomePage line 153), `'CANCEL ANYTIME'` → `'Cancel anytime'` (HomePage proof points), `'WhatsApp Gold leads'` → `'WhatsApp delivery'` (PricingPage no longer uses GOLD/SILVER tier naming on the pricing page). Regression now PASSES.
- **Retired 3 more regressions** that asserted copy/routes from a pre-rewrite version of the site (entirely different homepage hero — "STOP FUNDING TYRE-KICKERS"/£49 pricing/"Pro unlocks" gate copy/news pages naming raw data sources like "GOV.UK Building Materials" which directly violates the "never name data sources publicly" rule): `launch-polish-regression.mjs`, `free-access-daily-tools-regression.mjs`. Plus the two `ENOENT src/App.tsx` regressions from the Next.js migration (`intake-test-mode-regression.mjs`, `news-link-regression.mjs` — `/news` is alive via `app/news/page.tsx` but the content assertions matched an earlier NewsPage). All 4 moved to `codex-output/retired/` with a README explaining why, rather than rewritten wholesale — see README for rationale and a flag that `src/pages/IntakeTestPage.tsx` is now orphaned (no route imports it).

## NEEDLE pass (Phase 4) — less-trafficked pages
Ran an Explore-agent pass over Vicinity/Vantage/Blueprint/TradieZone/ActivationPending/WeeklySignals/Methodology/ForYourTrade/ProductAdvantage/BuildUkAlternative/AdminGuard*/Trade*/IntakeTest/TestConsole.

**Fixed (BUILDER):**
- `src/pages/TradeBuilders.tsx:9,68` — `highlightedPhrase: 'Planning Data'` and a matching `metaTitle` named the internal planning-data source directly in the hero headline and SEO title. Changed to `'Planning Approvals'` — matches the wording already used on sibling Trade* pages (TradeDecorators, TradeScaffolders) and the body copy ("JobFilter reads planning approvals across 400+ councils").

**CRITIC check:** TradeBuilders hero no longer leaks a source name; consistent with sibling trade pages in <3 seconds — yes.
**REVENUE check:** removes a public clue about the data pipeline that a competitor could copy — neutral-to-positive, not a direct conversion lever.

## Copy polish (Phase 3) — "No credit card required"
- `src/pages/VantagePage.tsx` and `src/pages/VicinityPage.tsx` — both "SCAN MY AREA FREE →" conversion CTAs were missing the "No credit card required." trust line that's standard on every other free-scan CTA across the site (FindJobsPage, MethodologyPage, SmartQuotePage, etc). Added.

## Verification
- `npm run build` — GREEN (106 pages)
- `npx tsc --noEmit` — CLEAN
- `node codex-output/package-copy-regression.mjs` — PASS (was failing)
- `npx tsx codex-output/lead-engine-quality-regression.mjs` — PASS
- `npx tsx codex-output/unified-find-jobs-regression.mjs` — PASS
- `node codex-output/free-scanner-redaction-regression.mjs` — PASS
- Commit `58a50e5` pushed to `main`.

## NEXT RUN — top priorities
1. **`src/pages/IntakeTestPage.tsx` is orphaned dead code** — no route imports it (the old `/intake-test` route from `src/App.tsx` was never ported to the App Router). Either give it a real `app/intake-test/page.tsx` route or delete the component.
2. **VicinityPage "Generate Proof" tool** — currently disabled/Coming Soon. If this is meant to ship soon, the real build is: wire the photo upload + job-summary textarea + template selection into an actual image-generation flow (or at minimum a working download of a templated graphic).
3. **Spot-check EMAIL ME THIS LEAD live** — still blocked, no `RESEND_API_KEY` in this container.
4. **Stripe live test** — 4242 4242 4242 4242, confirm `/dashboard?welcome=1` and `profiles.plan` flip (still blocked on test keys in Vercel, ~3 weeks carried over).
5. **Other long-running/live-network regressions** (`free-preview-live-contract-test.mjs`, `lead-engine-50-plus-quality-test-fixed.mjs`, `ten-postcode-source-smoke.mjs`) — not run this session; need `npm run dev` or live network access to verify.
