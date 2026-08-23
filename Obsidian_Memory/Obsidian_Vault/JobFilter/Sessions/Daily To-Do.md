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

## In Progress
- [ ] PR #503 — awaiting CI "check" status before merge

## Next Run Priorities
1. **Empty-state mobile fix**: embed a minimal postcode input inline in the "no scan yet" section (`FindJobsPage.tsx:878-913`) so tapping "SCAN MY AREA →" on mobile doesn't teleport user to top of page — add an inline `<input>` + submit button directly inside that section
2. **WinStatsBanner placeholder**: if `/api/wins/stats` returns `wonCount=0`, currently the banner hides entirely — show "Be the first to log a win in your area — [MARK A WIN]" as a soft prompt instead
3. **HomePage proofPoints**: check lines 73-78 — the proof-points grid may still carry corporate copy; apply tradesperson-first language with specific job types

## Known Issues
- node_modules not committed (expected) — fresh install needed each remote session
- Main branch protected: requires "check" CI status — all agent pushes must go via PR
- Empty-state mobile UX: tapping SCAN MY AREA scrolls user to top of page if postcode is empty (no inline postcode field in empty state) — deferred to next run
