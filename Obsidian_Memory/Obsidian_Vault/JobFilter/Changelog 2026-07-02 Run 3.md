# Changelog — 2 July 2026 (NightlyBuildAgent — Run 3)

## Container state
- Fresh container, `node_modules` missing entirely. `npm install` (359 packages).
- HEAD at `9df93b1` (== `origin/main`). No divergence.
- `npm run build` GREEN (113 pages), `npx tsc --noEmit` CLEAN before and after changes.

## Founder activity check
- Zero new app-code commits or open PRs since Run 2 (`b67f21b`). All carryover blockers unchanged.
- PR #290 diff re-verified as TopNav only (tagline "UK Construction Intelligence" → "Construction Intelligence"). 5 features described in PR body were pre-existing in the tree. Confirmed match with Run 2's assessment.

## Phase 1 — re-confirmed clean
- All `setDone`/`setSubmitted`/`setSent`/`setSent` sites wired to real `fetch()` calls. PostJobPage spot-checked — wired to `/api/waitlist`. No fake flows.
- No broken imports (clean Next build across all 113 routes).

## Phase 2 — no new Tier 1 features to build
All Tier 1 items from agent brief remain BUILT. No new buildable items without external infrastructure.

## Phase 3 — NEEDLE audit (BUILDER/CRITIC/REVENUE)

### AlertSetupWidget — "Postcode outward" jargon (FIXED)
- **NEEDLE**: `DashboardPage.tsx:96` label "Postcode outward" — technical jargon. SignupPage and ActivationPendingPage use "Your area (e.g. B14, SW1, M20)" for the same field. A UK tradesman types B14 here; calling it "outward" adds friction with no benefit.
- **BUILDER fix**: Changed to "Your area" — matches language on every other form on the site. Placeholder "B14" already shows the format.
- **CRITIC**: Clearer in <3s? YES — "Your area" is immediately understood by any tradesman.
- **REVENUE**: Increases £39/mo likelihood? YES — removing friction on alert setup (a retention feature) keeps tradesmen engaged.
- **File changed**: `src/pages/DashboardPage.tsx` line 96

### AlertSetupWidget — generic error hides API reason (FIXED)
- **NEEDLE**: When the API returns an error (e.g. free user attempts DAILY/INSTANT alert — 403 "daily alerts require a paid subscription"), the widget discards `data.error` and shows the generic "Failed — check you are logged in and try again." This misleads free users into thinking their login is broken rather than showing them a clear upsell prompt.
- **BUILDER fix**: Added `errorMsg` state; captures `data.error` on failed API response; renders it in the error paragraph. Falls back to "Failed — check you are logged in and try again" when `data.error` is absent (network/CORS failures).
- **CRITIC**: Clearer in <3s? YES — "daily alerts require a paid subscription. Weekly alerts are available on the free plan." is specific and actionable.
- **REVENUE**: Increases £39/mo likelihood? YES — clear paid-feature prompt when free user hits the limit is a natural upsell moment; the generic message killed it.
- **File changed**: `src/pages/DashboardPage.tsx` (lines 25, 73–76, 111)

### Design-token sweep
- All `rounded-full` hits across `src/pages/` are intentional status dots, avatar circles, or small indicators — no brutalist violations found.
- Jargon sweep ("leverage", "utilise", "solution", "platform") — remaining "platform" hits are all accurate competitor descriptions, not violations.

### Pages confirmed clean this run
- FaqPage — copy clean, competitor names correct, six WhatsApp templates claim verified (5 in QuickResponseKit + won_thanks on LeadDetailPage = 6 total WhatsApp-channel templates; claim is accurate).
- AccountPage — no design drift, no fake flows.
- ActivationPendingPage — form labels clean, error handling human-friendly.
- PostJobPage — `setSent(true)` wired to real `/api/waitlist` POST.

## Build status
- Build GREEN (113 pages), TypeScript CLEAN. 1 file changed, 5 insertions(+), 3 deletions(-).
- Pushed to main (`fa0d916`).

## Carryover (unchanged, still blocked on founder/external)
- **Stripe live test** — blocked on test keys in Vercel
- **TradeFlow "Send to TradeFlow" button** — blocked on URL scheme from founder
- **n8n workflow 16 (LLM Brief Builder)** — blocked on SMTP creds + manual activation
- **Add-on service pricing** — 14 add-on services still have no £ shown; founder decision pending
- **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path
