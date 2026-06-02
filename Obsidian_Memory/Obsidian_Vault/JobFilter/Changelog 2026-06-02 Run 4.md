# Changelog 2026-06-02 Run 4 — NightlyBuildAgent

**Commit:** `e918faf` (merged into main at `6d5c396`)
**Branch:** main (pushed directly)
**Build:** GREEN (106 pages) | TypeScript: CLEAN

---

## Pre-Flight

- npm install (fresh container — node_modules missing)
- `npm run build` → GREEN (106 pages)
- `npx tsc --noEmit` → CLEAN (0 errors)
- Read vault: Feature Roadmap, Problems and Solutions, Changelog 2026-06-02 Run 3, Daily To-Do, Design Direction

---

## Phase 1 — Fix Broken

Nothing broken. Build was green from first run.

---

## Phase 2 — Feature

All Tier 1 features confirmed as already built:
- Scan counter: ✅ FindJobsPage lines 550-565
- Google Calendar ICS: ✅ `GET /api/leads/calendar.ics` + LeadDetailPage COPY CALENDAR LINK
- Won leaderboard: ✅ WinStatsBanner + `GET /api/wins/stats` route in outcomeReport.ts
- WhatsApp templates (quick_quote_offer + availability_check): ✅ chaseTemplates.ts lines 43-60
- Trade-specific scoring UX: ✅ LeadCard + LeadListPage pipeline trade highlights

No new Tier 1 feature build required this run.

---

## Phase 3 — Copy Polish

### DashboardPage — Territory urgency text made visible + stronger (NEEDLE #2 from Run 3)

**Before:**
- Urgency text: `text-xs font-black text-white/60` — small (12px) at 60% opacity, barely readable
- Button text: "LOCK YOUR PATCH →"
- QUICK ACTIONS: bare button with no supporting context

**After:**
- Urgency text: `text-sm font-black text-white/90` — clear and readable at 90% opacity
- Copy: "No patch locked — you're racing every other trade for the same leads. **Another trade could claim your area today.**"
- Button text: "LOCK YOUR PATCH NOW →" (adds urgency word)
- QUICK ACTIONS: button + "Founder price £39/mo — no shared auction, no credit burn" context line below

**CRITIC:** Clear in <3 seconds? YES — tells them the risk and the solution in one row
**REVENUE:** Increases £39/month? YES — urgency + price anchor at highest-intent moment

### LeadListPage — Trust line made prominent (NEEDLE #3 from Run 3)

**Before:** `text-xs font-black text-[var(--ink)]/60` — 12px, 60% opacity, "No credit card required"
**After:** `text-sm font-black text-[var(--ink)]/80` — 14px, 80% opacity, "No credit card required — 3 free scans every week"

Specific beats vague — "3 free scans every week" removes uncertainty about what "free" means.

---

## Phase 4 — Site Health Check

### NEEDLE finding (highest-impact)

**SignupPage — "Postcode cluster" jargon** (regression from previous fix)

A previous run (May 26) had changed "Postcode cluster" → "Your area (e.g. B14)". Somewhere in the merge history this regressed. SignupPage line 115 still read:

> `Postcode cluster (e.g. B14, SW1, M20)`

A tradesperson filling out the form to sign up would pause or abandon at "cluster" — they don't know what it means. This is a critical friction point on a conversion form.

**BUILDER fix:** `"Postcode cluster (e.g. B14, SW1, M20)"` → `"Your area (e.g. B14, SW1, M20)"`
**CRITIC:** Clear in <3 seconds? YES
**REVENUE:** YES — removes abandonment risk at signup

---

## Naming Violations Sweep

Checked TerritoriesPage, CompareCheckatradePage, HomePage — zero EPC/land registry/Companies House/Planning Portal violations found.

---

## Metrics

- Files changed: 3
- Lines: +13, -8
- Build: GREEN (106 pages)
- TypeScript errors: 0
- Copy improvements: 3 pages (Dashboard, LeadList, Signup)
- Naming violations fixed: 0 (already clean)
- Jargon regressions fixed: 1 (SignupPage)

---

## Next Run Priorities

1. **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel — manual action needed)
2. **LeadDetailPage urgency timing** — "Call GOLD leads the same day. Response rate drops 60% after 24 hours." — this stat ("60%") should be validated or softened to "significantly" to avoid false precision claims
3. **TRADES dropdown on SignupPage** — missing gas engineers, decorators, heat pump installers — these are high-volume UK trades. Expanding the list gives a better first impression and feeds trade-specific scoring correctly.
