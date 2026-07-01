# Changelog — 1 July 2026 (NightlyBuildAgent)

## Container state
- Fresh container, `node_modules` missing entirely. `npm install` (359 packages).
- HEAD at `origin/main` (`347b636`) — only vault auto-digest commits since last app-code change (21 June, PR #287). Founder added docs/playbooks on 24 June (AI free router SaaS prompt, Fire Door App playbook, competitor playbook) — no app code.
- `npm run build` GREEN (113 pages), `npx tsc --noEmit` CLEAN before any changes.

## Founder activity check
- No app-code commits since 21 June (PR #287). Zero open PRs. Docs-only activity 24 June. No carryover blocker unblocked (Stripe keys, SMTP creds, TradeFlow URL scheme, add-on pricing decision all remain pending founder action).

## Phase 1 — re-confirmed, no fake flows
- All `setSubmitted`/`setSent`/`setEmailDone`/`setDone` sites grepped — all wired to real `fetch()` or Supabase calls, consistent with prior runs. No broken imports (clean Next build across 113 routes).

## Phase 2 — Tier 1 features verified BUILT (agent prompt list is stale)
- Scan counter: BUILT — `WEEKLY_SCAN_LIMIT`, `getWeeklyScansUsed()`, `weeklyScansRemaining` + full UI (lines 179–454 of FindJobsPage.tsx)
- Google Calendar ICS: BUILT — `server/routes/calendarExport.ts` + `ADD TO CALENDAR` on LeadDetailPage.tsx:688
- Won leaderboard: BUILT — `WinStatsBanner` component imported on FindJobsPage
- WhatsApp templates: BUILT — all 13 templates in `chaseTemplates.ts` including `quick_quote_offer` and `availability_check`
- Trade-specific scoring: BUILT — in leadEngine

## Phase 3 — Copy polish (LeadListPage)
- **Fixed duplicate GOLD/SILVER/BRONZE explanation** (`src/pages/LeadListPage.tsx`): header description was repeating the tier meanings verbatim already covered by the "HOW IT'S SCORED" box immediately below. On mobile this wasted the top 2 visible panels saying the same thing. Replaced with source differentiation copy: "Not recycled from Checkatrade or Bark. Every signal here comes from verified official UK sources — scored by your trade, patch, and urgency before it reaches you."
- CompareBarkPage and ForYourTradePage reviewed — both already strong on competitor naming and "No credit card required" copy. No changes needed.

## Phase 4 — NEEDLE → BUILDER fix (ActivationPendingPage)
- **NEEDLE** ran parallel agent across HomePage, SignupPage, LeadListPage, ActivationPendingPage. Top finding (non-false-positive): ActivationPendingPage forces double data entry — asks for trade, postcode, and company again immediately after SignupPage collected the same fields.
- **BUILDER fix** (`src/pages/ActivationPendingPage.tsx`): added `useAuth()` import and a `useEffect` on `[user]` that reads `user.user_metadata` (set by Supabase during signup) and pre-fills `trade`, `postcode_outward`, `company_name` into the activation form. Guards (`!trade`, `!postcode`, `!company`) prevent overwriting any manual edits the user has already made. WhatsApp still requires manual entry (not collected at signup). Wired to real `fetch('/api/account/activation', ...)` — no change to submission path.
- **CRITIC**: Clearer in <3 seconds? YES — tradesman who just signed up no longer sees the same three fields again.
- **REVENUE**: Increases likelihood of paying £39/mo? YES — removes friction at the highest-dropout moment (post-signup, pre-payment).

## Build status
- Build GREEN, TypeScript CLEAN after changes. 2 files changed, 13 insertions(+), 2 deletions(-). Pushed to main (`04d17dd`).

## Carryover (unchanged, still blocked on founder/external)
- Stripe live test — blocked on test keys in Vercel
- TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation
- Add-on service pricing — honestly cross-linked (PR #287), but still no £ shown; founder decision on free-perk-vs-paid-addon still pending
- **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path (corrected in Run 2, 21 June)
