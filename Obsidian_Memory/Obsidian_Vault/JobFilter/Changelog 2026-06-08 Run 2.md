# Changelog — 8 June 2026 (Run 2)

---

## Pre-flight

- Container started in detached HEAD on a stale local `main`; fetched and fast-forwarded to `origin/main` (132897f), `npm install` completed cleanly (no `node_modules` in fresh container)
- Confirmed `npm run build` green (106 pages) and `npx tsc --noEmit` clean before starting

---

## Phase 1 — Fix Broken / Phase 2 — Feature Built: Win Engine loss-loop wiring

Checked all 5 listed Tier 1 "unbuilt" candidates first — **all five were already built** (scan counter, calendar ICS export, won leaderboard, WhatsApp template additions, trade-specific scoring reasons all present and wired). Roadmap doc confirms this (all marked BUILT/ALREADY BUILT).

So I went looking for the same class of bug the previous run found (`getLostReasonBreakdown()` written but never wired) — and found a **second, deeper instance of the exact same problem, one level down**:

- The "WHY YOU LOSE JOBS" dashboard section (shipped earlier today) reads `getWinData().losses` from `localStorage['jobfilter.win']`, which is only populated by `winStore.markLost()`.
- `markLost()` was **never called from anywhere**. `LeadDetailPage`'s lost-reason picker stored ad-hoc free-text strings ('Got outbid on price', 'Customer went with someone else', "Job didn't exist", 'Other') into `lead.status` outcome payload (`/api/leads/outcome`) — a completely different pipe that doesn't match the `LostReason` enum (`price`/`timing`/`competition`/`not_interested`/`went_elsewhere`/`other`) that `getLostReasonBreakdown()` and the dashboard tips expect.
- **Net effect: "WHY YOU LOSE JOBS" could never show real data for any tradesman, ever** — the bars and tips the previous run shipped were permanently empty in production (only seeded synthetic localStorage data made them visible in testing).

**Fix — `src/pages/LeadDetailPage.tsx`:**
- Replaced the 4 ad-hoc free-text picker buttons with the canonical 6-value `LostReason` enum + matching plain-language labels (`LOST_REASON_OPTIONS`)
- Wired `markLost()` into `setStatus('lost')` so a typed `LostJob` record (leadId, title, trade, location, estimatedValue, reason, source) now actually lands in `localStorage['jobfilter.win'].losses`
- Verified live end-to-end with Playwright: marked a seeded lead LOST → `Got outbid on price` → CONFIRM LOSS → `localStorage['jobfilter.win']` now contains `{"reason":"price",...}` → navigated to `/dashboard` → "WHY YOU LOSE JOBS" renders bars (`Price Too High: 2`, `Bad Timing: 1`) + the correct top-reason tip, clean on desktop and 375px mobile

This closes the loop the previous run opened — the feature now actually works for real tradesmen, not just seeded test data.

---

## Phase 3 — Copy Polish (jargon sweep)

| File | Before | After |
|---|---|---|
| SignalsPage.tsx:187 | micro-label "START SIGNAL ENGINE" | "START SIGNAL MODE" (internal-noun "engine" leak — same class as prior signal-stack/signal-engine fixes; now matches the "Start Signal mode" name used in the body copy directly below it) |

Checked NewsPage.tsx ("your moat" — describes the *reader's* competitive edge, plain trade language, left as-is) and BlueprintPage.tsx ("Moat" scoreboard column — part of an internal-strategy transparency table alongside "Cost to us"/"Ease"/"Lead quality", consistent register, left as-is — different context from the customer-facing claim copy the prior "Fusion is the moat" fix addressed).

---

## Phase 4 — Site Health Check

1. **NEEDLE:** The Win Engine's loss-feedback loop was half-wired *twice over* — `getLostReasonBreakdown()` was wired to a UI section this morning, but the only function that ever populates the data it reads (`markLost()`) was never called. A tradesman who logs 10 lost jobs would see an empty/missing "WHY YOU LOSE JOBS" section forever.
2. **BUILDER:** Replaced the picker's mismatched free-text reasons with the canonical `LostReason` enum and wired `markLost()` into the confirm flow — see Phase 1/2.
3. **CRITIC:** Clearer in <3 seconds? Yes — the picker now shows 6 specific, recognisable reasons ("Got outbid on price", "Job filled before I called") instead of 4 ad-hoc ones that didn't even feed the feature meant to use them.
4. **REVENUE:** Increases likelihood of paying £39/mo? Yes — this is the difference between "WHY YOU LOSE JOBS" being a decorative dashboard widget and an actual working retention mechanism. Without this fix, the section the founder is counting on to turn "I keep losing jobs" into "pay £39/mo, get a sharper read on why" would have shipped permanently broken.

---

## Open / Carried Forward

- **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- **Spot-check "WHY YOU LOSE JOBS" with live loss data** — now that `markLost()` is wired, verify it populates correctly once a real paid test account logs 5+ real losses across multiple reasons
- **TradeFlow "Send to TradeFlow" button** (blocked on URL scheme from founder)
- **n8n workflow 16 (LLM Brief Builder)** — still blocked on SMTP creds + manual activation

---

## Next Run Priorities

1. Spot-check "WHY YOU LOSE JOBS" against a real paid test account's logged losses (the data pipe is now actually connected — first real chance to verify end to end)
2. Audit other dashboard/win-engine features for the same "wired UI, unwired data source" pattern — e.g. confirm `getValueAccuracy()` ("Quoted vs landed") and `getWinBreakdown()` get populated correctly from the same `markWon()`/`markLost()` calls now that the loss side is fixed
3. Stripe live test once Vercel test keys are available
