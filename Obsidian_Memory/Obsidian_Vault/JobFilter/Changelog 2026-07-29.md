# Changelog 2026-07-29 — NightlyBuildAgent Run

## BUILD STATUS
- `npm run build` — PASS (117 pages, compiled in 10.5s)
- `npx tsc --noEmit` — PASS (0 errors)
- Dependencies: installed fresh (no node_modules in remote env)

## ENVIRONMENT NOTE
Obsidian vault files were not present in the remote execution environment (local-only). Agent worked from codebase inspection only.

---

## WHAT WAS BUILT

### PHASE 1 — Fix Broken
- No broken builds, no TypeScript errors found.

### PHASE 2 — Feature: Trade-Specific Scoring UX
**File:** `src/pages/FindJobsPage.tsx`

The `LeadResultCard` component now shows a **TRADE FIT:** strip directly below the lead title — yellow badge(s) showing matched trade keywords such as `EV CHARGER`, `REWIRE` (for electricians), `BOILER`, `BATHROOM` (for plumbers). These were previously only discoverable by clicking a near-invisible 9px grey "WHY?" button.

- Highlighted trade reasons now appear immediately after the lead title
- Bottom badge row updated to show only non-trade contextual tags (URGENT, GOOD VALUE, JUST POSTED) — avoids duplication
- No new prop needed — uses `parsedReasons` already computed from backend scorer

### PHASE 3 — Copy Polish: PricingPage
**File:** `src/pages/PricingPage.tsx`

1. Added competitor FAQ answer: "How is this different from Checkatrade or Bark?" — names both competitors explicitly, uses "no shared auction, no five-trade blast" framing
2. FAQ expanded from 4 to 5 answers
3. Both free CTA buttons updated: "SCAN FREE FIRST →" → "SCAN FREE — NO CARD →"
4. FAQ coverage answer updated to say "no card required" inline

### PHASE 4 — Site Health (NEEDLE → BUILDER → CRITIC → REVENUE)
- **NEEDLE**: Trade match keywords were hidden behind a 9px "WHY?" button — tradespeople scanning 10+ leads missed the most important info
- **BUILDER**: Trade-fit badges now always visible below the title (no click required)
- **CRITIC**: Clearer in <3 seconds — YES. Yellow badges immediately signal trade relevance
- **REVENUE**: Increases £39/mo likelihood — YES. Tradesman sees "EV CHARGER — YOUR TRADE" on a gold lead and wants to unlock buyer details

---

## TIER 1 STATUS (after this run)

| Feature | Status |
|---|---|
| Scan counter (3/week) | ALREADY BUILT — visible on FindJobsPage |
| ICS calendar export | ALREADY BUILT — in LeadDetailPage |
| WinStatsBanner | ALREADY BUILT — component + API call exist |
| WhatsApp templates (5 total incl. quick_quote + availability_check) | ALREADY BUILT — all templates in chaseTemplates.ts |
| Trade-specific scoring UX | BUILT THIS RUN |

---

## PR / GIT
- Branch: `nightly/2026-07-29`
- PR: https://github.com/manazoid4/JobFilterV1/pull/408
- Vercel cron error flagged in PR comment — pre-existing in vercel.json (hourly cron on Hobby plan). Fix: upgrade to Pro OR change schedule to `0 0 * * *` (daily). Product call required.

---

## NEXT RUN: TOP 3 PRIORITIES

1. **Vercel cron fix decision** — change `vercel.json` schedule to `0 0 * * *` (daily) if hourly alert send isn't critical, or owner upgrades to Pro. Blocks clean Vercel deploys on every PR.
2. **Won leaderboard data** — `GET /api/wins/stats` endpoint and `WinStatsBanner` component exist, but `data/outcomes.jsonl` needs real win data for the banner to show. Test with a seeded entry to confirm the flow works end-to-end.
3. **Trade-specific scoring: teaser text** — `parseTradeReasons` currently parses backend reasons but the "Trade teaser" format needs backend support for leads where no direct trade keywords are found. Audit whether electrician leads without explicit "ev charger" in title still surface relevant badges.
