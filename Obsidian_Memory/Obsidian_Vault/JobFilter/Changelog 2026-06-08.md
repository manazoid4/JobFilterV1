# Changelog 2026-06-08 — NightlyBuildAgent

## Build Status
- **Build:** GREEN (106 pages)
- **TypeScript:** CLEAN

---

## Pre-flight

- Fresh container — session started in detached HEAD on a stale local `main`; fetched and fast-forwarded to `origin/main` (a402b47), `npm install` completed cleanly
- Confirmed build green and TypeScript clean before starting

---

## Phase 1 — Fix Broken

- No broken build, no TypeScript errors, no broken imports
- Checked all `setSubmitted(true)` forms (ProductAdvantagePage, WeeklySignalsPage waitlist forms) — both already POST to real `/api/waitlist` endpoint, not fake flows

---

## Phase 2 — Feature Built: Lost-Reason Analysis (Win Engine)

The 8 May roadmap's Week 1-2 quick win "Did you win this job? — Add lost-reason analysis to close the loop" was never actually surfaced: `getLostReasonBreakdown()` existed in `src/lib/winStore.ts:104` (groups logged losses by reason — price/timing/competition/not_interested/went_elsewhere/other) but was **never imported or rendered anywhere** — dead code sitting behind a real feature.

- Added a new **"WHY YOU LOSE JOBS"** section to `DashboardPage.tsx`, shown below WIN BREAKDOWN whenever the user has logged at least one lost job:
  - Bar chart of loss reasons by count (orange bars, brutalist styling matching WIN BREAKDOWN)
  - A plain-language, actionable tip keyed to the *most common* reason — e.g. for "price": *"Most lost jobs go on price. Lead with a fast, no-obligation quote — speed often beats being cheapest."* Six tips total, one per `LostReason` value, each pointing at a concrete in-app action (Quick Quote template, 2-hour first contact, 24h follow-up template)
- This is the missing half of the loop: tradesmen already log *why* they lose jobs (LeadDetailPage lost-reason picker), but had no way to see the pattern or act on it. Now they get a direct "fix this and you'll win more" nudge — a retention lever, not just a stat.
- Verified live with seeded localStorage data (Playwright + screenshot, desktop and 375px mobile) — bars render proportionally, tip text matches top reason, layout holds on mobile

---

## Phase 3 — Copy Polish

| File | Before | After |
|---|---|---|
| ProductAdvantagePage.tsx (Vicinity add-on note) | "Powered by JobFilter's **signal engine** — we know which homes need work before they post a job." | "Built on the same scans that power JobFilter — we know which homes need work before they post a job." (internal noun "signal engine" leaking into customer copy — same class as the Run 3 "signal stack" fix) |
| VicinityPage.tsx:713 (WhatsApp alerts CTA body) | "Vicinity proves your work. **Intake** feeds you the next job..." | "Vicinity proves your work. **JobFilter finds** the next job..." (an "Intake" jargon instance the Run 2 8-instance sweep missed — same internal-noun-leak class) |

---

## Phase 4 — Site Health Check

1. **NEEDLE:** The Win Engine had a half-built feedback loop — tradesmen log *why* they lose jobs (price/timing/competition/etc via LeadDetailPage), but `getLostReasonBreakdown()` that aggregates this data was written and never wired to any screen. A tradesman who'd logged 5 losses on "price" had no way to see that pattern or know to change their approach.
2. **BUILDER:** Wired `getLostReasonBreakdown()` to a new "WHY YOU LOSE JOBS" section on DashboardPage with bars + a top-reason-specific actionable tip — see Phase 2.
3. **CRITIC:** Clearer in <3 seconds? Yes — a bar chart with "Price Too High: 4" next to a tip that says "lead with a fast no-obligation quote" tells a tradesman exactly what to change, immediately.
4. **REVENUE:** Increases likelihood of paying £39/mo? Yes — this turns JobFilter from "a place that finds leads" into "a place that helps you win more of the leads you get." That's a retention story, not just an acquisition one — directly supports the roadmap's "3+ engine features used = lower churn" hypothesis (Find + Chase + **Win**).

---

## Open / Carried Forward

- **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- **Spot-check "WHY YOU LOSE JOBS" with live loss data** — verify it reads sensibly once a paid test account has 5+ logged losses across multiple reasons (could only seed synthetic localStorage data in this container)
- **TradeFlow "Send to TradeFlow" button** (blocked on URL scheme from founder)
- **n8n workflow 16 (LLM Brief Builder)** — still blocked on SMTP creds + manual activation

---

## Next Run Priorities

1. Spot-check "WHY YOU LOSE JOBS" against live loss data once a paid test account exists with real logged losses
2. Continue jargon sweep — search for other internal-noun leaks ("signal engine", "chase store", "win store", "deliveryLockKey") on less-trafficked Trade*/Compare*/product add-on pages (ProductAdvantagePage and VicinityPage both had instances missed by prior sweeps — likely more elsewhere)
3. Stripe live test once Vercel test keys are available
