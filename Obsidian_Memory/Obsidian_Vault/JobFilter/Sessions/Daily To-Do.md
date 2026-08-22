# Daily To-Do — JobFilter

Last updated: 2026-08-22 (NightlyBuildAgent)

## Completed This Run
- [x] npm run build — green
- [x] npx tsc --noEmit — clean
- [x] HomePage hero copy — fear→proof→control, competitor names in ops strip
- [x] PricingPage CTAs — removed "START AFTER COVERAGE CHECK" friction, clear pricing
- [x] PR #499 opened — nightly/2026-08-22-copy-polish
- [x] Codex P1 (30-day money-back vs LegalPage) — removed refund promise (commit 29b59c8)
- [x] Codex P2 (can win overstatement) — changed to "worth pursuing" (commit 29b59c8)
- [x] Codex P1 round-2 (pilot promises ungated features) — restored activation caveat (commit 0ac934d)
- [x] Codex P2 round-2 (empty result too categorical) — qualified for partial feed failure (commit 0ac934d)
- [x] All 4 Codex review threads replied to on PR #499

## In Progress
- [x] PR #499 — MERGED to main (squash commit 9df30ec, 2026-08-22 20:56 UTC)

## Next Run Priorities
1. Copy polish: ForYourTradePage.tsx — trade-specific fear hooks and competitor callouts
2. FindJobsPage "no scan yet" state — stronger fear hook, replace generic SVG map text
3. Check if /api/wins/stats has any real data yet — WinStatsBanner only shows when wonCount > 0; if no data, add a placeholder message like "Be the first to log a win in your area"

## Known Issues
- node_modules not committed (expected) — fresh install needed each remote session
- Obsidian vault was absent this session — recreated from scratch
- Main branch protected: requires "check" CI status — all agent pushes must go via PR
