# Daily To-Do

## Today - 26 July 2026 (NightlyBuildAgent)

- [x] **Container state** — fresh container, `npm install` (183 packages); HEAD at `f96ace7` (FTS & Commercial Workflows #383). Build GREEN, TS CLEAN.
- [x] **Phase 1** — no broken builds, no broken imports, no fake flows. All good.
- [x] **Phase 2** — all Tier 1 features confirmed BUILT (scan counter, ICS export, wins leaderboard, WhatsApp templates, trade-specific scoring tags). No new feature needed this run.
- [x] **Phase 3 — ActivationPendingPage done state**: removed corporate jargon; named Bark/Checkatrade; fear→proof→control applied.
- [x] **Phase 3 — DashboardPage empty state**: replaced process copy with fear→proof→control.
- [x] **NEEDLE #1 — PricingPage**: added `SCAN FREE — NO CARD NEEDED →` CTA.
- [x] **NEEDLE #2 — FindJobsPage**: locked-state banner copy improved.
- [x] **NEEDLE #3 — HomePage**: WaitlistForm moved out of primary CTA panel.
- [x] **Build GREEN, TypeScript CLEAN.** PR #396 created.
- [x] **Codex P1 — paid subscribers see locked cards**: fixed (`isUnlimited` prop + bearer token in `submit()`).
- [x] **Codex P1 — WhatsApp button shows SENT despite nothing sent**: fixed (routes to `/api/leads/whatsapp`, only marks sent on `res.ok`).
- [x] **Codex P2 — auth hydration race**: fixed (`supabase.auth.getSession()` fallback in `submit()`).
- [x] **Codex P2 — cross-device quota drift (success path)**: fixed (reads `data.scansUsed` from server response).
- [x] **Codex P2 — cross-device quota drift (error/429 path)**: fixed in `fcd628f` (syncs `scansUsed` from error branch too).
- [x] **Codex P2 — mobile upgrade CTA shown to paid subscribers**: fixed (`!cardOpenAccess`).
- [x] **Codex P2 — commercial panel shown to paid subscribers**: fixed (`!unlimitedTester`).
- [x] **Codex P2 — WhatsApp error not surfaced**: fixed (`whatsappError` state + orange error line below button).
- [x] **Codex P2 — WhatsApp double-send**: fixed (`whatsappSending` state, button `disabled` in flight).
- [x] **Codex P2 — anonymous scan counter broken**: fixed (`token &&` guard so local counter fires for anon users).
- [x] **Codex P2 (outdated) — complete tender coverage copy**: already says "available" not "every"; replied to thread.
- [x] **Codex P2 (outdated) — area-specific WaitlistForm promise**: heading softened to "new coverage" (no postcode); replied to thread.
- [ ] **Waiting: CI on `fcd628f`** — last commit (quota-sync error branch fix). Check job must pass before PR is green.
- [ ] **DECISION NEEDED — Vercel cron**: `vercel.json` has `0 * * * *` (hourly) which requires Vercel Pro. Vercel bot failing on every PR. Options: change to `0 6 * * *` (daily, free) or upgrade to Pro. Pre-existing, non-blocking for merge.
- [ ] **Founder decision — add-on service pricing**: 14 add-on services still have no £ shown on pricing page.
- [ ] **Stripe live test** — still blocked on test keys in Vercel.
- [ ] **Next run priorities:**
  1. Vercel cron decision (daily vs Pro) — fix or note the trade-off
  2. Trade-specific scoring UX: make trade-match badges on lead CARDS larger/more visible (currently small `badge` class)
  3. PricingPage copy: apply fear→proof→control to plan description bullets; name Checkatrade/MyBuilder/Bark in comparison
