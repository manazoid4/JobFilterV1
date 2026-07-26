# Changelog 2026-07-26 — NightlyBuildAgent Run

## Build Status
- `npm run build` — PASS (117/117 pages)
- `npx tsc --noEmit` — PASS (0 errors)

## TypeScript
- No errors found or fixed. Codebase was clean before this run.

## Feature Audit (Tier 1)
All previously listed Tier 1 unbuilt features were confirmed already built:
- **Scan counter** — already in FindJobsPage (weeklyScansRemaining logic, resets Monday midnight, hidden when OPEN_ACCESS=true)
- **Google Calendar ICS export** — already in server/routes/calendarExport.ts + LeadDetailPage has ADD TO CALENDAR button
- **Won leaderboard** — /api/wins/stats already in outcomeReport.ts, WinStatsBanner.tsx already calls it
- **WhatsApp templates** — quick_quote_offer and availability_check already in chaseTemplates.ts
- **Trade-specific scoring** — already in leadEngine/scorer.ts with TRADE_KEYWORDS per trade

## Copy Polish (Phase 3)

### FindJobsPage.tsx
- Gold paywall label: "THIS JOB HAS A BUYER — MEMBERS ONLY" → "BUYER & DEADLINE LOCKED — CHECK BEFORE THE WINDOW CLOSES"
- Gold paywall body: added "Not on Checkatrade. Not on Bark." competitor contrast + "No credit card required to browse"
- Upgrade nudge label: "REAL JOBS. BUYER DETAILS IN FULL ACCESS." → "NOT ON CHECKATRADE. NOT ON BARK. NOT SHARED."
- Upgrade nudge body: added "no shared auction, no five-trade blast" language
- Scan counter micro-label: `text-[var(--orange)]` → `text-[var(--green)]` (removes alarm color on a welcoming message)

### PricingPage.tsx
- Pilot plan body: rewrote from corporate jargon to plain tradesman copy
- Pilot plan CTA: "START AFTER COVERAGE CHECK →" → "START £39/MO →" (removes friction words "after" and "check")
- Plan card priceNote: now says "Scan free first — no credit card required"
- Added Checkatrade/Bark comparison to FAQ: explains domestic vs public-sector market difference
- Both secondary CTAs: "SCAN FREE FIRST →" → "SCAN FREE — NO CARD →" (trust signal inline at decision moment)
- Sub-copy: "Scan first. See real leads. Upgrade only if the coverage fits."

## Site Health (Phase 4)

**NEEDLE — top 3 UX issues found:**
1. Pricing page secondary CTA had no inline "no credit card" signal — buried in small text 2 lines below
2. Gold paywall card used passive "MEMBERS ONLY" framing with no urgency or competitor contrast
3. Scan counter used orange (#C5462A alarm red) on a positive/welcoming "3 FREE SCANS" message

**BUILDER fix applied:**
- CRITIC: Clearer in <3 seconds? YES — "NO CARD" inline with button beats footnote
- REVENUE: Increases £39/mo likelihood? YES — users who scan first convert at higher rates; reducing CTA friction → more scans → more upgrades

## PR
- Branch: `nightly/copy-polish-2026-07-26`
- PR: https://github.com/manazoid4/JobFilterV1/pull/397
- CI: `check` job in progress at time of writing
- Vercel: Deployment blocked (pre-existing) — hourly cron `0 * * * *` requires Pro. **Owner decision needed**: upgrade to Pro or change to `0 8 * * *` (daily 8am).

## Next Run — Top 3 Priorities

1. **Vercel cron fix** — Change `"schedule": "0 * * * *"` to `"0 8 * * *"` in vercel.json OR upgrade to Vercel Pro. Alert delivery currently broken on deployments.
2. **Homepage hero copy** — Apply same fear→proof→control structure. Current headline repeats the pricing page headline exactly. "KNOW WHICH PUBLIC WORKS OPPORTUNITIES FIT YOUR FIRM" is passive. Could be: "STOP BIDDING ON JOBS THAT DON'T FIT. START WINNING THE ONES THAT DO."
3. **Trade page copy refresh** — /trade/* pages (electricians, plumbers, roofers etc.) should name the specific signal types they'll see (EV charger tenders, boiler maintenance frameworks, flat roof repairs). Currently generic.
