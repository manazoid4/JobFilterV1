# Changelog 2026-06-01 — NightlyBuildAgent

**Commit:** `3292a02`
**Branch:** main (pushed directly)
**Build:** GREEN (98 pages) | TypeScript: CLEAN

---

## Pre-Flight

- Fresh container — `npm install` run first
- `npm run build` → GREEN (98 pages, no TypeScript errors)
- `npx tsc --noEmit` → CLEAN (no errors)
- All Tier 1 features confirmed BUILT from prior runs
- WhatsApp templates `quick_quote_offer` and `availability_check` confirmed already in chaseTemplates.ts

---

## Phase 1 — Fix Broken

No broken builds or TypeScript errors on start.

---

## Phase 2 — Build Tier 1 Feature

**All Tier 1 features confirmed BUILT:**
- Scan counter with reset logic: BUILT (FindJobsPage shows "Resets Monday" since 22 May)
- Google Calendar ICS: BUILT (GET /api/leads/calendar.ics + COPY CALENDAR LINK)
- Won leaderboard: BUILT (WinStatsBanner + GET /api/wins/stats + outcomes.jsonl persistence)
- WhatsApp templates: BUILT — `quick_quote_offer` and `availability_check` already in chaseTemplates.ts (lines 44-59)
- Trade-specific scoring UX: BUILT (parseTradeReasons in FindJobsPage)

**No new Tier 1 feature to build — pivoted to completing Run 3 outstanding to-do items (highest-value remaining work).**

---

## Phase 3 — Copy Polish

### `src/pages/DashboardPage.tsx` — 3 outstanding to-do items from Run 3

**Fix 1 — isEmpty LOCK YOUR PATCH CTA:**
- Problem: new users without a territory seeing the isEmpty state only had "RUN YOUR FIRST SCAN →" and "SEE PRICING". LOCK YOUR PATCH was visible in the header but not in the prominent orange isEmpty block.
- Fix: added `{!territory && <Link href="/territories" className="jf-button bg-[var(--yellow)]">LOCK YOUR PATCH →</Link>}` as the middle CTA in the isEmpty buttons row.
- New users without a territory now see all three critical actions in one place.

**Fix 2 — Scan counter reset note:**
- Problem: DashboardPage showed "X of 3 used" but no reset timing. FindJobsPage already had "Resets Monday" (since 22 May) but Dashboard was missing it.
- Fix: Row value changed from `scansUsed >= 3 ? '${scansUsed} of 3 used' : '${scansUsed} of 3 free used'` → `'${scansUsed} of 3 used · resets Mon'` (clean, compact, same info)
- New users know exactly when their free scans come back.

**Fix 3 — Average per win stat in YOUR SCOREBOARD:**
- Problem: RESULTS section showed monthly/all-time totals but no average per win — tradesmen can't benchmark their job values without knowing their average.
- Fix: Added `{winData.wins > 0 && <Row label="Avg per win" value={`£${Math.round(totalValueAllTime / winData.wins).toLocaleString()}`} />}` after the "All time" row.
- Only shows when at least one win is logged — no divide-by-zero, no "£0" confusion for new users.

### `src/pages/CompareBarkPage.tsx` — bottom CTA copy

**Problem:** Bottom CTA headline "Stop paying per lead. Start scanning smarter." uses "scanning smarter" corporate language (vague, sounds like a SaaS tagline). Body copy was generic.

**Fix:**
- Headline: → "Bark credits burn. Your pipeline doesn't have to." (names the competitor's specific pain point, uses plain trade language)
- Body: → "One trade per job. No credits, no auction, no racing four other electricians to the same form-filler. Scan your area for £39/mo flat — no credit card needed to try it." (specific, names the fear, adds pricing anchor + free-tier reassurance)
- CTA button: "START FREE — NO CARD" → "SCAN MY AREA FREE — NO CARD" (action-specific, matches FindJobsPage language)

---

## Phase 4 — NEEDLE Site Health Check

**NEEDLE findings:**
1. DashboardPage isEmpty missing patch lock CTA → FIXED this run
2. DashboardPage scan counter no reset note → FIXED this run
3. DashboardPage no avg per win stat → FIXED this run
4. CompareBarkPage bottom CTA corporate copy → FIXED this run

**BUILDER fix (highest-impact):** isEmpty LOCK YOUR PATCH CTA — new users with no pipeline AND no territory now have a direct path to territory lock from the most visible state on Dashboard.

**CRITIC:** Is the fix clearer in <3 seconds? YES — yellow button is immediately visible in the orange isEmpty block.

**REVENUE:** Does it increase likelihood of paying £39/month? YES — territory lock is the product's conversion gateway; getting new users there faster reduces drop-off.

---

## Metrics

- Files changed: 2 source files
- Lines: 10 insertions, 4 deletions
- Build: GREEN (98 pages)
- TypeScript errors: 0
- To-do items completed: 3 (all Run 3 outstanding Dashboard items)
- Copy violations fixed: 1 (CompareBarkPage vague CTA)

---

## Next Run Priorities

1. **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
2. **FreeToolsPage isPaywalled audit** — confirm `const isPaywalled = false` is correct; if so, confirm free tools are clearly positioned as acquisition funnel not product giveaway
3. **LeadListPage OUTCOMES strip** — the WON/LOST/NO ANSWER summary strip shows counts but no aggregate value; add "£X,XXX won" to the strip so tradesmen see total value at a glance
