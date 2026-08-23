# Daily To-Do — JobFilter

Last updated: 2026-08-23 (NightlyBuildAgent)

## Completed This Run (2026-08-23)
- [x] npm run build — green
- [x] npx tsc --noEmit — clean
- [x] Confirmed PR #499 merged to main
- [x] ForYourTradePage hero — fear→proof→control, Checkatrade named in first sentence
- [x] ForYourTradePage WHY section — all 3 boxes rewritten with competitor names + exclusivity contrast
- [x] FindJobsPage no-scan-yet state — "READY?" → fear hook + competitor callout
- [x] FindJobsPage empty-result alert — corporate jargon removed, direct £39/mo CTA
- [x] PR #502 opened — nightly/2026-08-23-copy-and-ux

## Previously Completed
- [x] HomePage hero copy — fear→proof→control, competitor names in ops strip (#499)
- [x] PricingPage CTAs — removed "START AFTER COVERAGE CHECK" friction, clear pricing (#499)
- [x] Scan counter with weekly reset (Monday midnight): DONE — FindJobsPage.tsx lines 33-76
- [x] WinStatsBanner with /api/wins/stats endpoint: DONE
- [x] Google Calendar ICS export: DONE
- [x] WhatsApp templates (quick_quote_offer + availability_check): DONE

## In Progress
- [ ] PR #502 — awaiting CI "check" status

## Next Run Priorities
1. Scan counter visibility: confirm "X free scans remaining" banner shows for non-open-access users
2. WinStatsBanner: add teaser copy when wonCount === 0 ("First win in your area gets featured here")
3. Copy polish: PricingPage FAQ — check questions address real tradesperson objections (is the data real? does it work in my area? what if I find nothing?)

## Known Issues
- node_modules not committed (expected) — fresh install needed each remote session
- Main branch protected: requires "check" CI status — all agent pushes must go via PR
