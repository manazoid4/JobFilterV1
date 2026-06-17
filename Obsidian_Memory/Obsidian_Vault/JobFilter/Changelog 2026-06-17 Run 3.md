# Changelog — 17 June 2026 (NightlyBuildAgent — Run 3)

## Container state
- Local `main`/HEAD was detached at `2489111` (== `origin/main`, no real divergence) — `git checkout main && git reset --hard origin/main` resolved it
- `npm install` (359 packages, fresh container)
- Build GREEN, TypeScript CLEAN, all `codex-output/*.mjs` regression scripts checked before changes

## Audit
- Phase 1 re-confirmed: all 4 `setSubmitted`/`setSent`/`setEmailDone` forms (PostJobPage, FreeToolsPage, ProductAdvantagePage, WeeklySignalsPage) wired to real `fetch('/api/waitlist', ...)` calls — no fake flows
- Explore-agent NEEDLE pass flagged `TradePage.tsx:217` `rounded-lg` as a design-token violation — investigated and rejected: this is the WhatsApp message mockup block, already documented as an intentional exception in the 12 June Run 2 changelog (mimics real WhatsApp UI, not a brutalist site card)
- Ran all 16 `codex-output/*.mjs` regression scripts via `npx tsx` — all pass except scripts that need a live server (`free-preview-live-contract-test.mjs`, ECONNREFUSED on :3000) or live external API keys/network (`lead-engine-50-plus-quality-test-fixed.mjs`, `site-conversion-quality-test.mjs`, `ten-postcode-source-smoke.mjs`) — same known false-negative class noted in prior runs, not a real bug. Test-run JSON/MD artifacts in `codex-output/` reverted before commit (not real changes).

## Fix — design-token drift (raw red Tailwind colors)
Own grep sweep (`bg-red-`, `text-red-`, `border-red-`) found 2 files still using raw Tailwind red instead of the brutalist `--orange` token — same class of fix applied to LoginPage/AccountPage/IntakeTestPage in earlier runs, just not yet done here:
- `DashboardPage.tsx:86` — alert-setup error text `text-red-600` → `text-[var(--orange)]`
- `FindJobsPage.tsx:972-974` — deadline countdown badges used `bg-red-600` for "closes today"/"≤2 days" while the ≤7-day tier already used `bg-[var(--orange)]` — collapsing both to solid orange would have erased the urgency distinction, so kept solid orange for the most urgent tier and switched the ≤7-day tier to an outlined orange (`border-2 border-[var(--orange)] text-[var(--orange)]`) — both raw-red and the urgency hierarchy fixed
- `FindJobsPage.tsx:1012` — alert-quick-setup error text (on dark navy bg) `text-red-400` → `text-[var(--orange)]`
- `FindJobsPage.tsx:1040` — source-health failure badge `border-red-300 bg-red-50 text-red-700` → `border-[var(--orange)] bg-[var(--orange)]/10 text-[var(--orange)]`

Build GREEN, TypeScript CLEAN, `package-copy-regression.mjs` PASS, pushed to main (`ebae1ec`).

## Next run priorities
1. **Founder decision — add-on service pricing** (carried over from Run 2): `dno-brief`/`ozev-grant-pack`/`gas-safe-kit`/`swmp-template`/`fra-template`/`acm-report-pack`/`nasc-pack`/`wayleave-pack`/`cctv-compliance-pack`/`calc-pack`/`vantage`/`codex` all take a lead via a form with zero price shown anywhere — need a decision: free perk of £39/mo (then say so) or paid add-on (then show a price/range)
2. **Stripe live test** — still blocked on test keys in Vercel (carried over many runs)
3. Tier 1/2 roadmap items are now exhaustively built and polished across many runs; next genuinely-buildable medium-effort items are Tier 2 #13 (WhatsApp Business API Phase 2, two-way messaging) or Tier 2 #18 (PlanWire) — both multi-day/multi-run, scope before starting. Diminishing returns on further NEEDLE/design-token sweeps — most low-hanging fruit across `src/pages` and `src/components` has been found and fixed over the last ~2 weeks of runs.
