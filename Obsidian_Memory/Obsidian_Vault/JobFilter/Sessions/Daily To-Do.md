# Daily To-Do — JobFilter

Last updated: 2026-08-23 (NightlyBuildAgent)

## Completed This Run
- [x] npm run build — green (120 pages)
- [x] npx tsc --noEmit — clean
- [x] Trade-specific scoring UX — parseTradeReasons now surfaces EV CHARGER/REWIRE for electricians, BOILER/BATHROOM for plumbers, etc. as highlighted badges
- [x] FindJobsPage empty-state copy — fear-first headline naming Checkatrade/Bark
- [x] ForYourTradePage — trade-specific fearHook field added to all 19 trades, displayed as "THE PROBLEM" callout
- [x] HomePage hero — rewrote 18-word jargon headline to "JOBS IN YOUR PATCH — BEFORE YOUR COMPETITORS SEE THEM"
- [x] FindJobsPage duplicate CTAs — differentiated: "UNLOCK THIS LEAD →" (inline) vs "START £39/MO — NO CONTRACT →" (post-results)
- [x] PR #503 opened — nightly/2026-08-23-trade-scoring-copy
- [x] Codex rounds 3–6 — all findings fixed (9 commits total):
  - Word-boundary regex for keyword matching (no TILE→TEXTILE false positives)
  - TILE→TILE ROOF taxonomy fix (scorer.ts alignment)
  - RENDER removed from building TRADE_KEYWORDS (scorer.ts classifies under painting)
  - Planning-data-gated fearHooks rewritten for all affected trades (roofing, building, decorating, scaffolding, ev-charger, groundworkers, structural, solar, heat-pump)
  - Data-cabling "3–5 days earlier" timing claim removed
  - Electrical "before Checkatrade even knows" ordering claim removed
  - scanResultTrade state — frozen at scan time, prevents reclassification between scans
  - Not-your-trade guard — title fallback skipped when backend supplies negative trade evidence
- [x] CI check ✅, Vercel ✅, Meticulous 0 diffs ✅ on commit 225a4e6
- [x] PR #503 ready for merge
- [x] Codex rounds 7–9 — all findings fixed (3 additional commits):
  - CCTV fearHook — removed unavailable planning/tenancy sources (commit f8fd7fe)
  - buildPreviewReasons — preserve Not-your-trade in free-preview path (commit 8cd0658)
  - Fire-safety fearHook — removed unavailable building-regs tracking claim (commit 3f593ad)
  - Roofing fearHook — removed "first to respond wins" procurement claim (commit 3f593ad)
  - buildPreviewReasons — guard against discarding positive Trade match when both reasons present (commit 3f593ad)
- [x] CI check ✅, Vercel ✅ on commit 3f593ad
- [x] Codex round 10: silent pass (no findings on 3f593ad)
- [x] PR #503 fully green — 12 commits total

## In Progress
- [ ] PR #503 — awaiting owner merge

## Next Run Priorities
1. **Empty-state mobile fix**: embed a minimal postcode input inline in the "no scan yet" section (`FindJobsPage.tsx:878-913`) so tapping "SCAN MY AREA →" on mobile doesn't teleport user to top of page — add an inline `<input>` + submit button directly inside that section
2. **WinStatsBanner placeholder**: if `/api/wins/stats` returns `wonCount=0`, currently the banner hides entirely — show "Be the first to log a win in your area — [MARK A WIN]" as a soft prompt instead
3. **HomePage proofPoints**: check lines 73-78 — the proof-points grid may still carry corporate copy; apply tradesperson-first language with specific job types

## Known Issues
- node_modules not committed (expected) — fresh install needed each remote session
- Main branch protected: requires "check" CI status — all agent pushes must go via PR
- Empty-state mobile UX: tapping SCAN MY AREA scrolls user to top of page if postcode is empty (no inline postcode field in empty state) — deferred to next run
