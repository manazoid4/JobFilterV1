# Changelog 2026-05-31 Run 3 — NightlyBuildAgent

**Commit:** `cb3bd21`
**Branch:** main (pushed directly)
**Build:** GREEN (98 pages) | TypeScript: CLEAN

---

## Pre-Flight

- `npm install` required (fresh container — no node_modules)
- `npm run build` → GREEN (98 pages, no TypeScript errors)
- All Tier 1 features confirmed BUILT from prior runs
- All Tier 2 commercial lead detection confirmed already BUILT

---

## Phase 1 — Fix Broken

No broken builds or TypeScript errors on start.

---

## Phase 2 — Build Tier 2 Feature: Job Value Capture in OutcomeActions

**Problem:** `OutcomeActions` component in `FindJobsPage.tsx` marked jobs as Won via API but never called `markWon()` from winStore. Dashboard reads from localStorage (winStore) — so wins logged from the Find page showed £0 value and didn't appear in the pipeline.

**Fix:** `src/pages/FindJobsPage.tsx` — `OutcomeActions` component fully rewritten:
- "Won ★" button now shows inline £ value input (same pattern as LeadDetailPage)
- On confirm: calls both `markWon()` (localStorage) AND `/api/leads/outcome` (backend)
- Shows confirmation state: "WIN LOGGED — £X,XXX" in green
- Other outcomes (called, no answer, quoted, lost) show "logged" state after submission
- Added `import { markWon } from '../lib/winStore'` to FindJobsPage

**Tier 2 features now built:** Job value tracking ✓ (in both LeadDetailPage and FindJobsPage)

---

## Phase 3 — Copy Polish

### `src/pages/ForYourTradePage.tsx`

**Trade signals — all 6 trades updated:** Now name competitors explicitly (Checkatrade, Bark, MyBuilder, BuildAlert) within each trade's signal description:
- Electrical: "scored before Checkatrade or Bark list them"
- Plumbing: "verified before MyBuilder or Bark see them"
- Roofing: "no Checkatrade auctions"
- Building: "24–48 hours before they reach Bark or BuildAlert"
- HVAC: "flagged before any lead platform sees them"
- Landscaping: "no shared bidding, no Bark credits burned"

**"Why tradesmen use JobFilter" section rewritten** — from generic to specific:
- OLD: "Better timing / Better proof / Better control"
- NEW: "First in. Not fifth." / "Proof, not promises." / "Gold lands. Noise stays out."
- Each now references specific differentiators (24–48h timing, verified source links, WhatsApp delivery)

**Closing CTA copy fixed:** Now uses canonical brand language: "Gold leads are controlled by trade, patch, and timing — no shared auction, no five-trade blast."

### `src/pages/FaqPage.tsx`

**Data source naming violation fixed:**
- OLD: "property transactions" → could hint at Land Registry
- NEW: "property ownership data" → matches NEVER-NAME-SOURCES rule

**Money-back guarantee answer strengthened:**
- OLD: "No hoops — we just ask that you actually use the system." (corporate-sounding)
- NEW: "email us and we process the refund the same day. No forms, no argument." (direct, tradesman tone)

**Hero subhead — competitor reference added:**
- OLD: "No corporate speak. No evasion. Just direct answers to the questions tradesmen actually ask."
- NEW: "If you've used Checkatrade, Bark, or MyBuilder and got burned — you probably have questions. Here are the straight answers."

---

## Phase 4 — Site Health Check (NEEDLE)

### NEEDLE found 3 issues:
1. **Yellow banner CTA buried** — "UNLOCK FOR £39/MO →" button comes AFTER two paragraphs of text; on mobile, tradesman has to scroll past copy to see the CTA
2. **Scan counter edge case** — first-time user sees "3 scans" copy, but if they somehow see "2 left" it contradicts (minor)
3. **Dashboard patch lock hidden** — "LOCK YOUR PATCH" CTA buried in empty-state body copy (low conversion path)

### BUILDER fix — Issue #1 (highest-impact):

**`src/pages/FindJobsPage.tsx` yellow banner (was line 684-694):**

**Problem:** Yellow free-scan banner had structure: micro-label → headline (5 words) → long paragraph → CTA button. The CTA was buried below 2 blocks of text.

**Fix:** Restructured to: micro-label → shorter headline → CTA immediately → small explanatory note below. Button is now the first thing a tradesman sees after the headline.
- Headline shortened: "SIGNALS FOUND. BUYER NAME, PHONE, AND JOB DETAIL ARE LOCKED." → "SIGNALS FOUND. BUYER DETAIL IS LOCKED."
- CTA moved above explanatory text
- Trust signals ("No credit card required · 30-day money-back") moved inline with button
- Explanatory note demoted to small text below CTA

**Also removed:** The redundant dark "LOCK FOUNDER PRICE — £39/MO →" banner that appeared AFTER all lead cards. This was the 4th CTA on the page. With it gone, free-tier users see: 1 yellow banner CTA + 1 per-card sidebar CTA — cleaner conversion path.

**FILL MY WEEK progress UX fixed:**
- Added step progress bar (3 segments: Checking signals / Scoring leads / Ranking results)
- Segments fill yellow as each phase completes
- Added "Takes about 5 seconds — checking all sources" sub-line during loading
- Previously: just a spinner + phase text (opaque, looks broken on slow connections)

**CRITIC:** Banner CTA clearer in <3 seconds? YES — button is immediately visible after headline.
**REVENUE:** Does it increase likelihood of paying £39/month? YES — CTA is no longer buried.

---

## Metrics

- Files changed: 3 source files
- Lines: 113 insertions, 51 deletions
- Build: GREEN (98 pages)
- TypeScript errors: 0 found, 0 remaining
- Tier 2 features completed: 1 (Job Value Tracking in FindJobsPage)
- Copy violations fixed: 2 (FaqPage data source, money-back answer)
- Competitor mentions added: 6 (one per trade in ForYourTradePage)
- Canonical brand copy applied: 1 (ForYourTradePage CTA)
- NEEDLE fix: 1 (yellow banner CTA restructured)
- Bonus NEEDLE fix: 2 (duplicate bottom banner removed, FILL MY WEEK progress bar)

---

## Next Run Priorities

1. **Dashboard patch lock CTA** (NEEDLE Issue #3) — "LOCK YOUR PATCH" is buried in empty-state body. Should be a prominent button on the empty Dashboard state, guiding new users to set up their territory.
2. **Scan counter edge case** (NEEDLE Issue #2) — First-time user copy says "3 free scans" but if they've used one on another device/session, they see fewer. Add a note: "Count resets every Monday."
3. **Job value tracking display** — Now that wins logged from FindJobsPage include £ values, show "Your average won job this month: £X,XXX" somewhere prominent on DashboardPage.
