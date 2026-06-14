# Changelog 2026-06-07 Run 2 — NightlyBuildAgent

## Build Status
- **Build:** GREEN (106 pages)
- **TypeScript:** CLEAN

---

## Pre-flight

- Fresh container — `npm install` required, completed cleanly
- Local `main` ref was stale (pointing at 609898a while origin/main was at f915f4b, 26 commits ahead) — fast-forwarded local main to match origin
- Confirmed build green and TypeScript clean before starting

---

## Phase 1 — Fix Broken

- No broken build, no TypeScript errors
- Checked both `setSubmitted(true)` instances (ProductAdvantagePage, WeeklySignalsPage) — both wired to real `fetch` POSTs, not fake
- No broken relative imports across `src/` and `app/` (scripted check, 0 broken)

---

## Phase 2 — Feature Built: Job Value Tracking (estimate vs landed)

Roadmap Tier 2 item #17 "Job value tracking" (score 3.25, status "Not built" — *"Compare estimated vs actual over time... Your extension jobs average £18,500. Heat pump jobs average £8,200."*)

- `WinJob` type (`src/lib/types.ts`) gains `estimatedValue?: string` — captures the lead's quoted value band at the moment a job is marked Won
- `markWon()` calls in `FindJobsPage.tsx` and `LeadDetailPage.tsx` now pass `estimatedValue: lead.estimatedValue` / `lead.budget`
- New `getValueAccuracy()` in `src/lib/winStore.ts` — parses the estimate band (reuses the same midpoint-averaging logic as `leadValue.ts`'s `parseMoneyBand`), compares it against the actual £ entered on Won, and returns `{ count, avgEstimated, avgActual, deltaPct }`
- `DashboardPage.tsx` YOUR SCOREBOARD section gets a new row: **"Quoted vs landed"** — e.g. *"+12% vs quote · 4 jobs"* — only shown once a tradesperson has logged wins with both an estimate and an actual value
- Purely client-side (localStorage `jobfilter.win`), no backend changes — consistent with how "Avg per win" already works on the same page
- Build verified GREEN, TypeScript CLEAN

---

## Phase 3 — Copy Polish: "Intake" Jargon Sweep

Found 8 user-facing instances of internal product naming ("Intake", "Intake Engine") leaking into customer copy — same class of fix as the 7 June Run 1 "pipeline" sweep and the earlier TipsPage "ENTER THE INTAKE" fix.

| File | Before | After |
|---|---|---|
| BuildUkAlternativePage.tsx | micro-label "ENTER THE INTAKE" | "SCAN YOUR AREA FREE" |
| CompareBuildAlertPage.tsx | micro-label "ENTER THE INTAKE" | "SCAN YOUR AREA FREE" |
| CompareCheckatradePage.tsx | micro-label "ENTER THE INTAKE" | "SCAN YOUR AREA FREE" |
| VantagePage.tsx | "TRY THE INTAKE ENGINE FREE." / "Intake finds the jobs worth bidding on" / button "ENTER THE INTAKE →" | "SCAN YOUR AREA FREE." / "The scanner finds the jobs worth bidding on" / "SCAN MY AREA FREE →" |
| SmartQuotePage.tsx | "Intake finds the jobs worth proposing on" | "The scanner finds the jobs worth proposing on" |
| NewsPage.tsx (×3) | "JobFilter's Intake Engine reads verified energy signals..." / "...Intake Engine flags funded scheme leads..." / "The Intake Engine reads the same data this briefing is built from..." | "JobFilter reads verified energy signals..." / "...JobFilter flags funded scheme leads..." / "JobFilter reads the same data this briefing is built from..." |

`IntakeTestPage.tsx` left untouched — confirmed unrouted/dead (no imports anywhere), out of scope for a copy sweep.

---

## Phase 4 — Site Health Check

1. **NEEDLE:** Reviewed FindJobsPage conversion banners and DashboardPage scoreboard — main gap was the missing estimate-vs-actual comparison flagged in the roadmap as a retention lever ("helps trades understand actual vs estimated value").
2. **BUILDER:** Built "Quoted vs landed" stat — surfaces automatically once a tradesperson has 1+ comparable win (estimate + actual both present and parseable).
3. **CRITIC:** Clearer in <3 seconds? Yes — "+12% vs quote · 4 jobs" reads as a single trust signal: "my estimates are roughly right" or "I'm landing more than I quote."
4. **REVENUE:** Increases likelihood of paying £39/mo? Yes — it's a retention/habit feature (Win engine), not a conversion one: it gives paying users a reason to keep logging outcomes, which is the data JobFilter needs to prove ROI back to them.

---

## Open / Carried Forward

- **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- **TradeFlow "Send to TradeFlow" button** (blocked on URL scheme from founder)
- **n8n workflow 16 (LLM Brief Builder)** — still blocked on SMTP creds + manual activation
- **Spot-check ShareWinCard with live win data** (carried from Run 1 — still no Supabase test data with `lead_outcomes` rows in this container)

---

## Next Run Priorities

1. Spot-check "Quoted vs landed" stat with real win data once a paid test account exists — verify the % delta reads sensibly for both over- and under-estimates
2. Continue jargon sweep — "chase engine"/"signal stack"/"win store"/"chase store" internal nouns, focus on less-trafficked Trade* and comparison pages
3. Stripe live test once Vercel test keys are available
