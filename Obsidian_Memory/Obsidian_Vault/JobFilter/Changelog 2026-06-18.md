# Changelog — 18 June 2026 (NightlyBuildAgent)

## Container state
- Detached HEAD at `b6df9dd`, local `main` ref stale at `609898a` (52 commits behind) — `git checkout main`, `git fetch origin main` (corrected a stale cached `origin/main` ref too), `git reset --hard origin/main` resolved it
- `npm install` (359 packages, fresh container, `node_modules` was missing entirely)
- Build GREEN (Next.js, all routes), TypeScript CLEAN before any changes

## Audit (Phases 1 + 4)
- Phase 1 re-confirmed: all 4 `setSubmitted`/`setSent`/`setEmailDone` forms (PostJobPage, FreeToolsPage, ProductAdvantagePage, WeeklySignalsPage) wired to real `fetch('/api/waitlist', ...)` — no fake flows
- No broken imports; no `React.lazy()` path risk; all dynamic `import()` calls resolve to real files
- Ran all 17 `codex-output/*.mjs` regression scripts via `npx tsx` — all pass except the known false-negative class needing a live server or live external API/network access (`free-preview-live-contract-test.mjs`, `lead-engine-50-plus-quality-test-fixed.mjs`, `site-conversion-quality-test.mjs`, `ten-postcode-source-smoke.mjs`) — not real bugs, same pattern noted in every prior run
- Investigated PR #281 ("open tracked leads in WhatsApp", merged just before this run) — `Lead.buyerPhone` is only ever populated for tradesman-submitted intake leads (which already have a real phone); for scanned/fetched leads (`leadEngine/normaliser.ts`) it's never set, so `toWhatsAppHref()` degrades gracefully to a generic `wa.me/?text=...` link with no pre-selected contact — same documented pattern as the existing SMS fallback, not a regression
- Full CTA sweep across `src/pages/*.tsx` and `src/components/*.tsx` for buttons styled as real actions (VIEW/TRACK/SEND/DOWNLOAD/OPEN/GENERATE/UNLOCK/CLAIM/BUY/UPGRADE/EXPORT/COPY/SHARE) with no `onClick` and no `Link`/`href` — **zero genuinely broken buttons found**. The only buttons missing handlers are: implicit form-submit buttons inside `<form onSubmit>` (working as intended), `ALREADY TRACKING` (intentionally disabled status indicator), and `KeywordSearch.tsx` ("VIEW FULL DOCUMENT"/"TRACK THIS LEAD") which is dead code behind `SHOW_ADVANCED_TOOLS = false` in `FindJobsPage.tsx:25` — confirmed unreachable by any real user
- Re-confirmed the "Document/keyword search" Tier 1 roadmap item (#11, "Prototype built") is exactly that: a mock-data scaffold (`src/lib/documentSearch.ts` hardcoded `MOCK_DOCUMENTS`, fake 800ms latency) correctly hidden behind the disabled flag — not live, not deceiving anyone, matches the spec's "Phase 1: Mock done, Phases 2-4 not started" status. No action needed; finishing it for real needs PDF ingestion + storage + a real search API (multi-day, not attempted)
- Reviewed the sitewide `LaunchWaitlistModal` (auto-opens on homepage after 18s) — confirmed this is consistent, intentional "Founding 30" scarcity-marketing copy used identically elsewhere on the site (same `WaitlistForm` component embedded directly in HomePage), not a stale pre-launch leftover; left unchanged as a product/marketing decision, not a bug

## No code changes this run
Every Tier 1 feature is already built, every fake-flow/broken-import/broken-CTA/design-token class of bug from the brief has already been swept in prior runs and re-confirmed clean tonight. Build stayed GREEN and TypeScript stayed CLEAN throughout — nothing to fix, nothing unbuilt to ship without a founder decision or external credential first.

## Next run priorities (unchanged — all blocked on the founder, not on engineering)
1. **Founder decision — add-on service pricing**: `dno-brief`/`ozev-grant-pack`/`gas-safe-kit`/`swmp-template`/`fra-template`/`acm-report-pack`/`nasc-pack`/`wayleave-pack`/`cctv-compliance-pack`/`calc-pack`/`vantage`/`codex` still take a lead via a form with zero price shown anywhere — free £39/mo perk or paid add-on?
2. **Stripe live test** — still blocked on test keys in Vercel (carried over many weeks)
3. TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
4. n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation
5. Diminishing returns confirmed again on NEEDLE/design-token/fake-flow sweeps — the only genuinely buildable medium-effort items left (Tier 2 #13 WhatsApp two-way messaging, #18 PlanWire integration, finishing document search) all need new external infrastructure/partnerships and are multi-day, not single-run, builds.
