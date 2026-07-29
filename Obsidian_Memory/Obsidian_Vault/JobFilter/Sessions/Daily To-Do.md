# Daily To-Do — JobFilter

Last updated: 2026-07-29 (NightlyBuildAgent)

---

## COMPLETED THIS RUN ✓

- [x] Trade-specific scoring UX: TRADE FIT badges always visible on lead cards (no hidden WHY? button)
- [x] PricingPage competitor callout: Checkatrade + Bark named in FAQ
- [x] PricingPage free CTAs: "SCAN FREE — NO CARD →" on all secondary buttons
- [x] Build green: npm run build ✓, tsc --noEmit ✓

---

## OPEN / NEXT SESSION

- [ ] **Vercel cron plan**: `vercel.json` has `0 * * * *` (hourly) for `/api/alerts/send` — Hobby plan blocks this. Decide: Pro upgrade OR daily (`0 0 * * *`)
- [ ] **WinStatsBanner smoke test**: Component and API exist but need `data/outcomes.jsonl` with at least one win entry to verify the banner actually renders on FindJobsPage
- [ ] **Trade teaser coverage audit**: Verify electrician/plumber leads without explicit trade keywords in title still surface meaningful TRADE FIT badges (test with a roofing lead title that doesn't say "roofing")
- [ ] **Homepage copy**: The hero still says "PUBLIC-WORKS QUALIFICATION FOR 5–25-PERSON CONTRACTORS" — consider whether this matches the actual user (individual tradesperson) or is intentional B2B positioning
- [ ] **LeadDetailPage ICS download**: The `buildIcs` + `downloadIcs` functions exist — verify the "ADD TO CALENDAR" button is actually rendered and wired (spot-check the full LeadDetailPage render)
- [ ] **WhatsApp quick_quote_offer template**: Template exists in chaseTemplates.ts — confirm it surfaces in the LeadDetailPage chase engine UI

---

## KNOWN ISSUES

- Vercel deploys on PRs fail with cron error (pre-existing, not from feature work)
- `data/outcomes.jsonl` missing or empty — WinStatsBanner will always show nothing until wins are recorded
