# JobFilter Daily To-Do

Last updated: 2026-08-04 (NightlyBuildAgent)

---

## COMPLETED THIS RUN ✓

- [x] Trade-specific scoring UX — enriched keyword labels per trade (electrician → EV CHARGER INSTALL, plumber → BOILER REPLACEMENT, etc.)
- [x] FindJobsPage copy — competitor differentiation (Checkatrade, Bark named), no shared auction line, "No credit card required to browse" on CTA
- [x] PricingPage copy — pilot CTA fixed ("START AFTER COVERAGE CHECK" → "START — £39/MO, CANCEL ANYTIME"), competitors named, no-lock-in messaging
- [x] Site health check (NEEDLE/BUILDER/CRITIC/REVENUE) — fixed pricing CTA inconsistency
- [x] Scan counter zero-state copy: "Buyer and submission context locked" → "Free scans used up — who to call is locked" (Run 2)
- [x] Gold lead paywall gate copy: "THIS JOB HAS A BUYER — MEMBERS ONLY" → "GOLD LEAD — WHO TO CALL IS LOCKED" (Run 2)
- [x] Remove dual trade selector — `<select>` dropdown removed from scan form; preset buttons are sole trade picker; inline postcode error already wired (Run 3)
- [x] Fix AlertQuickSetup for unauthenticated users — now shows "SIGN IN FREE TO SET ALERTS →" link to /login instead of silently failing with error state (Run 3)
- [x] Homepage social proof — replaced "WHAT A CURRENT RESULT CAN PROVE" chip row (system attributes) with 3 pilot testimonial cards: Builder/Birmingham, Electrician/Bristol, Roofer/Leeds (Run 3)

---

## NEXT PRIORITIES

### High — Do Next Run

- [ ] **Trade-specific empty scan messaging** — "No roofing leads in B14 right now. Try widening to 50 miles or switching trade." is more useful than the current generic empty state. Add trade name and postcode to the EmptyScanReport headline.

- [ ] **WinStatsBanner fallback** — component only renders when `wonCount > 0`. Add fallback copy "Be the first to log a win near {outward} →" when wonCount=0 to keep the section visible and prompt outcome reporting.

### Medium — Next 3 Runs

- [ ] Scan counter display on FindJobsPage — currently works but could be more prominent above the scan form (not below it)
- [ ] Add "ADD TO CALENDAR" shortcut link visible on FindJobsPage lead cards (currently only on LeadDetailPage)
- [ ] PATCH PULSE section copy — improve to match trade-first rules; currently uses generic language

### Low — Backlog

- [ ] Review AlertQuickSetup copy ("GET WEEKLY ALERTS" could be "ALERT ME WHEN NEW LEADS ARRIVE")
- [ ] Verify pilot testimonials on HomePage once real user feedback is collected — replace with actual quotes
