# Daily To-Do — JobFilter

## 2026-08-22 (NightlyBuildAgent)

### Completed ✓
- [x] `npm install` + verify build passes (was missing node_modules in remote env)
- [x] TypeScript check — 0 errors
- [x] Created `/api/wins/stats` route — WinStatsBanner now has a working backend
- [x] Created `/api/leads/calendar.ics` Next.js route — LeadDetailPage CalendarCopyLink now works
- [x] PricingPage copy — fear→proof→control structure, competitor FAQ, "no credit card" CTAs
- [x] SignupPage copy — tradesman-first fear hook, named Checkatrade/Bark
- [x] TopNav copy — replaced "CHECK FTS FREE" jargon with "SCAN FREE →"
- [x] Build passes (122 pages, 0 errors) after all changes
- [x] PR #496 opened: https://github.com/manazoid4/JobFilterV1/pull/496
- [x] Codex P2 fix (round 1): ilike→eq on postcode_outward; outward code from split not slice
- [x] Codex P2 fix (round 2): compact postcode parsing via outwardFromPostcode(); escIcs() for ICS injection; tomorrowLondonDate() for BST-safe date
- [x] Codex P2 fix (round 3): AbortController in WinStatsBanner; jobs-won message copy
- [x] Codex P2 fix (round 4): foldLine() per RFC 5545 §3.1 applied to ICS join; "logged work" not "verified work"
- [x] All CI green on commit 6fa98b5: GitHub Actions ✅ Vercel ✅ Meticulous ✅ (0 diffs / 169 screens)
- [x] Codex P2 fix (round 5): normalize postcode_outward at write time in buildOutcomeRow()
- [x] Codex P2 fix (round 6): omit totalValueFormatted for wonCount < 2; add VTIMEZONE to ICS
- [x] Codex P2 fix (round 7): pin nanoid override to <4; use exact count for wins/stats
- [x] Regenerated package-lock.json after nanoid override change (commit 97eddd4)
- [x] All CI green on commit 97eddd4: GitHub Actions ✅ Vercel ✅ — all 18 Codex P2 threads replied

---

## Next Run Priorities

### Priority 1 — Populate `lead_outcomes` via markWon()
Wire the win-tracking flow: when a user marks a job as won in WinEngine, POST to a new `/api/wins/record` endpoint that writes an anonymised row (postcode_outward, trade, value, date — no personal data) to Supabase `lead_outcomes`. This closes the loop: WinStatsBanner reads from `lead_outcomes`; `markWon()` now needs to write to it.

### Priority 2 — Trade-specific scoring UX
The `parseTradeReasons()` function in FindJobsPage extracts generic reasons. Make scoring reason tags more specific per trade: electrician sees EV CHARGER, REWIRE, CONSUMER UNIT, EICR; plumber sees BOILER, HEAT PUMP, BATHROOM; roofer sees FLAT ROOF, GUTTERING, SKYLIGHTS. Map trade → keyword set and show the most relevant signal tags prominently.

### Priority 3 — ADD TO CALENDAR button on LeadDetailPage
The `downloadIcs()` function already exists client-side in LeadDetailPage. Add a visible "ADD TO CALENDAR" button next to the WhatsApp and track buttons (currently the link exists only via `CalendarCopyLink` which is copy-to-clipboard). Should trigger the client-side `downloadIcs()` directly for a simpler UX.

---

## Known Issues
- `Obsidian_Memory/` directory is new in repo — needs to be tracked going forward
