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

---

## Next Run Priorities

### Priority 1 — Populate `data/outcomes.jsonl`
When real tradespeople mark jobs as won (via the win engine / markWon()), write their anonymised outcomes to `data/outcomes.jsonl`. The WinStatsBanner will then show social proof automatically on FindJobsPage. Format: `{"postcode_outward":"B14","trade":"electrical","value":2500,"wonAt":"2026-08-20T10:00:00Z"}` one per line.

### Priority 2 — Trade-specific scoring UX
The `parseTradeReasons()` function in FindJobsPage extracts generic reasons. Make scoring reason tags more specific per trade: electrician sees EV CHARGER, REWIRE, CONSUMER UNIT, EICR; plumber sees BOILER, HEAT PUMP, BATHROOM; roofer sees FLAT ROOF, GUTTERING, SKYLIGHTS. Map trade → keyword set and show the most relevant signal tags prominently.

### Priority 3 — Add ICS "ADD TO CALENDAR" link on LeadDetailPage
The `downloadIcs()` function already exists client-side in LeadDetailPage. Add a visible "ADD TO CALENDAR" button next to the WhatsApp and track buttons (currently the link exists only via `CalendarCopyLink` which is copy-to-clipboard). Should trigger the client-side `downloadIcs()` directly for a simpler UX.

### Priority 4 — Wire `data/outcomes.jsonl` writes from markWon()
When a user marks a job as won in the WinEngine, write an anonymised entry (no personal data, just postcode outward + trade + value + date) to the server-side outcomes file via a new `POST /api/wins/record` endpoint. This closes the loop between WinStatsBanner (reads) and the win tracking flow (writes).

---

## Known Issues
- PR requires "check" status check to pass before merge to main — normal CI gate
- `data/` directory is gitignored (correct for runtime data)
- `Obsidian_Memory/` directory is new in repo — needs to be tracked going forward
