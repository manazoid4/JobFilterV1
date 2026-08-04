# JobFilter Daily To-Do

Last updated: 2026-08-04 (NightlyBuildAgent)

---

## COMPLETED THIS RUN ✓

- [x] Trade-specific scoring UX — enriched keyword labels per trade (electrician → EV CHARGER INSTALL, plumber → BOILER REPLACEMENT, etc.)
- [x] FindJobsPage copy — competitor differentiation (Checkatrade, Bark named), no shared auction line, "No credit card required to browse" on CTA
- [x] PricingPage copy — pilot CTA fixed ("START AFTER COVERAGE CHECK" → "START — £39/MO, CANCEL ANYTIME"), competitors named, no-lock-in messaging
- [x] Site health check (NEEDLE/BUILDER/CRITIC/REVENUE) — fixed pricing CTA inconsistency

---

## NEXT PRIORITIES

### High — Do Next Run

- [ ] **Remove dual trade selector on FindJobsPage** — dropdown + preset buttons doing same job. Remove dropdown, keep preset buttons only. Show inline error on preset tap when postcode missing (currently shows alert and scrolls).

- [ ] **Fix AlertQuickSetup for unauthenticated users** — "GET WEEKLY ALERTS →" silently fails with "error" state when user not logged in. Add: if not signed in, show "Sign in free to set alerts →" with link to /login instead of calling /api/alerts and failing.

- [ ] **Homepage social proof** — Replace "TRUSTED BY" chip row (system attributes, not real proof) with 3 one-line testimonials or a real user count. Current framing is trust-damaging.

### Medium — Next 3 Runs

- [ ] Scan counter display on FindJobsPage — currently works but could be more prominent above the scan form (not below it)
- [ ] Add "ADD TO CALENDAR" shortcut link visible on FindJobsPage lead cards (currently only on LeadDetailPage)
- [ ] Trade-specific empty scan messaging — "No roofing leads in B14 right now" is more useful than generic empty state
- [ ] Won leaderboard WinStatsBanner — only shows when wonCount > 0; add fallback "Be the first to log a win in {area}" even when empty

### Low — Backlog

- [ ] Dual trade selector refactor (full cleanup — remove select dropdown from DOM entirely)
- [ ] Improve PATCH PULSE section copy to match trade-first rules
- [ ] Review AlertQuickSetup copy ("GET WEEKLY ALERTS" could be "ALERT ME WHEN NEW LEADS ARRIVE")
