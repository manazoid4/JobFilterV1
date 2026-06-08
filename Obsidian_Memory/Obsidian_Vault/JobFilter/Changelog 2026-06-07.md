# Changelog 2026-06-07 — NightlyBuildAgent

## Build Status
- **Build:** GREEN (106 pages)
- **TypeScript:** CLEAN

---

## Pre-flight

- Fresh container — `npm install` required (no node_modules), completed cleanly
- `npm run build` failed before install (`next: not found`) — resolved by install, not a code issue
- Confirmed origin/main was ahead of stale local `main` ref (detached HEAD at f0d6655); re-pointed local `main` at `origin/main` before starting work
- Read vault: Feature Roadmap, Daily To-Do, Problems and Solutions
- Verified all "Current Tier 1 unbuilt" candidates from the brief (scan counter, calendar ICS, won leaderboard, WhatsApp templates, trade-specific scoring teasers) are ALREADY BUILT in code — confirms prior runs' status notes are accurate

---

## Phase 1 — Fix Broken

- No broken build, no TypeScript errors, no fake `setSubmitted(true)` forms (both instances found — ProductAdvantagePage, WeeklySignalsPage — are wired to real `fetch` POSTs first), no broken imports.

---

## Phase 2 — Feature Built

**"Share Your Win" image generator** (Tier 1 quick-win from roadmap: "Monthly ROI summary — add 'share your wins' button (generates image for social)")

- New component: `src/components/ShareWinCard.tsx`
  - Canvas-rendered 1080×1080 brutalist (yellow/black/paper) image: jobs won count, total value won, win rate, JobFilter wordmark + tagline
  - DOWNLOAD button (canvas → PNG, browser download)
  - SHARE button (Web Share API with file attachment where supported, falls back to download)
- Wired into `src/components/ROITracker.tsx` — "SHARE YOUR WIN" button appears next to the ROI TRACKER label whenever `stats.totalWon > 0`, opens the share-card modal
- No backend changes needed — purely client-side, uses existing `/api/leads/roi-stats` data already fetched by ROITracker
- Build verified GREEN, TypeScript CLEAN

---

## Phase 3 — Copy Polish: "Pipeline" Jargon Sweep

Found 7 remaining user-facing instances of internal "pipeline" language that survived prior sweeps (Run 3 on 6 June fixed some but missed these):

| File | Before | After |
|---|---|---|
| FaqPage.tsx | "...six pre-written WhatsApp templates, **pipeline tracking**, and a 30-day money-back guarantee" | "...job tracking, and a 30-day money-back guarantee" |
| LeadDetailPage.tsx | "Don't spend chase time here yet — revisit when **pipeline is low**" | "...revisit when **work is quiet**" |
| LeadListPage.tsx | "BRONZE means worth a look when **your pipeline is light**" | "...worth a look when **work is quiet**" |
| MethodologyPage.tsx | micro-label "**THE PIPELINE**" above "SIX STEPS. ZERO WASTE." | "**HOW IT WORKS**" |
| ProductAdvantagePage.tsx | "Vicinity fills **your pipeline** between big jobs" | "Vicinity fills **your week** between big jobs" |
| SignalsPage.tsx | micro-label "**THE PIPELINE**" above "YOU DON'T CHASE LEADS..." | "**HOW IT WORKS**" |
| FindJobsPage.tsx (FILL MY WEEK results banner) | "Your quiet week isn't a skills problem. It's **a pipeline problem**." | "...It's **a leads problem**." |

These are the exact same class of fix as prior "PIPELINE jargon removed" commits (4 June Run 3, 6 June Run 3) — internal product language replaced with plain trade speech.

---

## Phase 4 — Site Health Check

1. **NEEDLE:** Highest-impact issue found — "Your quiet week isn't a skills problem. It's a pipeline problem." sits inside the FILL MY WEEK results banner (a headline conversion moment, both free and paid users see it). "Pipeline" reads as office jargon, not trade speech, right at the point a tradesman is deciding whether the feature is worth using.
2. **BUILDER:** Changed to "It's a leads problem." — ties directly to the brand promise ("REAL LEADS. NO CHASING.") and the thing the product actually delivers.
3. **CRITIC:** Clearer in <3 seconds? Yes — "leads" is immediate and concrete; "pipeline" requires a mental translation step.
4. **REVENUE:** Increases likelihood of paying £39/mo? Yes — reframes the quiet-week pain in terms the paid plan directly solves (more leads, not "pipeline management"), making the upgrade logic obvious.

---

## Open / Carried Forward

- **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- **TradeFlow "Send to TradeFlow" button** (blocked on URL scheme from founder)
- **n8n workflow 16 (LLM Brief Builder)** — still blocked on SMTP creds + manual activation
- Consider spot-checking ShareWinCard rendering in a real browser against live ROI data once a paid test account with `lead_outcomes` rows is available (could not be tested live this run — no Supabase test data in this container)

---

## Next Run Priorities

1. Spot-check ShareWinCard visually with real won-job data (download the PNG, confirm no text overlap on different digit-count win counts e.g. "1" vs "12")
2. Continue jargon sweep — search for "intake"/"chase engine"/"signal stack" user-facing leakage (internal product nouns) across less-trafficked pages (Trade* pages, FreeToolsPage, comparison pages)
3. Stripe live test once Vercel test keys are available — confirm /dashboard?welcome=1 banner + plan flip end-to-end
