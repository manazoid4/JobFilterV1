# Changelog — 16 June 2026 (NightlyBuildAgent — Run 1)

## Container state
- `npm install` (359 packages, fresh container); build GREEN (110 pages), TypeScript CLEAN before and after changes.

## Phase 1 — verified
- Build GREEN, TypeScript CLEAN.
- No `setSubmitted(true)` without real fetch: `ProductAdvantagePage` and `WeeklySignalsPage` both wired to real `fetch('/api/waitlist', ...)`.
- No broken imports found.

## Phase 2 — Tier 1 feature audit
All Tier 1 features confirmed built on main:
- Scan counter (FindJobsPage): `weeklyScansRemaining` UI at lines 439–454, localStorage-based, resets Monday.
- Google Calendar ICS: `buildIcs()` in `LeadDetailPage.tsx`, `/api/leads/calendar.ics` server route.
- Won leaderboard: `WinStatsBanner` component on FindJobsPage, `/api/wins/stats` route.
- WhatsApp templates: `quick_quote_offer` and `availability_check` both in `chaseTemplates.ts`; shown as sub-tabs in `QuickResponseKit`.
- Trade-specific scoring UX: `parseTradeReasons` → `parsedReasons` badges on `LeadResultCard`; backend sends `Trade match: EV CHARGER (...)` reasons.
- Job value tracking: `BuyerOutcomePicker` in FindJobsPage has full WON value capture (inline £ input) wired to backend.
- Commercial lead detection: `isCommercial` flag in lead engine, UI badge + commercial-only filter toggle on FindJobsPage.

## Phase 3 — Copy polish (PricingPage + HomePage)

### PricingPage (`src/pages/PricingPage.tsx`)
- Plan bullets: rewritten to be more specific and action-oriented ("Gold leads to your WhatsApp — scored and delivered within minutes of detection"; "Buyer context before you call — job type, value band, and best contact route"; "Win tracker — log wins, track ROI...")
- Objections: expanded answers naming Checkatrade/MyBuilder/Bark/BuildAlert, explaining one-trade-per-patch promise, clarifying activation is "usually same day"
- Hero subtitle: now names signal types specifically ("Planning approvals, council tenders, and energy signals")

### HomePage (`src/pages/HomePage.tsx`)
- Proof points: "3–5 days before Checkatrade or Bark sees the same job" (specific timing); last point adds "No credit card" explicitly
- Ops strip: "Planning approvals, council tenders, and energy signals — not job boards"; "Scored 0–100 by job value, trade fit, and how close you are"; "GOLD leads to WhatsApp — 3–5 days before the job goes public"
- Founding-30 strip: "Founding 30 places — one trade per patch. Miss the window, pay more later." (clearer + urgency)

## Phase 4 — Site health (NEEDLE/BUILDER/CRITIC/REVENUE)
- **NEEDLE issue fixed**: WhatsApp template tab label "Avail. Check" → "Diary Check" in `src/lib/chaseTemplates.ts`. "Diary Check" is instantly understood by a tradesman scanning on mobile; "Avail. Check" was an abbreviation that required decoding.
- CRITIC: Clearer in <3 seconds? YES.
- REVENUE: Reduces friction in the Chase step → more templates used → more jobs chased → better retention.

## Build status
- `npm run build` GREEN (110 pages), `npx tsc --noEmit` CLEAN.
- Pushed to `main` (`f8973b7`).

## Next run priorities
1. **TerritoriesPage territory table** — the `max-lg:hidden` columns on desktop work fine; but the mobile article card view stacks all fields. Worth checking if the "Avg job value" and "Signals/mo" fields appear clearly on mobile.
2. **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (blocked on test keys in Vercel, carried over multiple weeks).
3. **WinStatsBanner real-data test** — the BuyerOutcomePicker WON capture in FindJobsPage sends wonValue to backend; verify WinStatsBanner actually renders once a win is logged.
4. **QuickResponseKit WA_TEMPLATE_KEYS sync** — check that `WA_TEMPLATE_KEYS` array in QuickResponseKit.tsx includes all 5 templates (first_touch_2h, quick_quote_offer, follow_up_24h, availability_check, final_nudge_48h) after the chaseTemplates reorder.
5. **Email ME THIS LEAD** spot-check (blocked, no RESEND_API_KEY in container).
