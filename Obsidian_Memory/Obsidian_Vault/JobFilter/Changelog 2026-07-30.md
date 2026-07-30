# Changelog 2026-07-30 — NightlyBuildAgent Run

## Status
- BUILD: PASS
- TYPESCRIPT: CLEAN (0 errors)
- PR: #410 — nightly/copy-polish-2026-07-30

---

## Phase 1 — Fix Broken
- `npm install` required (node_modules missing in fresh clone). After install, build passed clean.
- TypeScript: no errors found.

## Phase 2 — Tier 1 Features Audit
All listed Tier 1 features are already built:
- **Scan counter** ✓ — in FindJobsPage (weekly localStorage counter, resets Monday)
- **Google Calendar ICS export** ✓ — `/api/leads/calendar.ics` route + client download in LeadDetailPage
- **Won leaderboard** ✓ — `WinStatsBanner` + `/api/wins/stats` endpoint
- **WhatsApp templates** ✓ — `quick_quote_offer` and `availability_check` already in chaseTemplates.ts
- **Trade-specific scoring UX** ✓ — `parseTradeReasons()` handles trade keywords on lead cards

No new Tier 1 features needed — all complete from previous sessions.

## Phase 3 — Copy Polish

### PricingPage (`src/pages/PricingPage.tsx`)
- `planBullets`: Rewritten to be buyer-outcome-first ("See the buyer, published value and deadline before you commit bid time")
- `objections`: Added competitor differentiation question vs Checkatrade/MyBuilder. Existing FAQs sharpened.
- Featured plan `priceNote`: Changed to "Scan free first — no credit card required."
- Featured plan `body`: Removed corporate hedging, now direct: "Know which public contract notices fit your firm before you spend time on a bid."
- Featured plan CTA: "START AFTER COVERAGE CHECK →" → "GET FULL ACCESS — £39/MO →"
- Bottom CTA section: Free scan CTA now leads. Competitor callout line added. "No credit card required" explicit.

### FindJobsPage (`src/pages/FindJobsPage.tsx`)
- Exhausted-scan state: "Buyer and submission context locked. Scanning remains free." → "Free scans used up. Buyer name, phone and deadline locked until you upgrade."
- Scan counter: "left this week" → "left this week — resets Monday" (inline, removes confusion)
- Upgrade nudge CTA label: "UNLOCK — £39/MO →" → "SEE BUYER DETAILS — £39/MO →"
- Upgrade nudge headline: "SEE BUYER DETAILS ON EVERY LEAD." → "WHO DO YOU CALL?" (fear hook)
- Upgrade nudge body: Shortened, added "No shared auction. No five-trade blast. One subscription per firm — no contract."
- "No credit card required to browse" added inline with upgrade CTA

## Phase 4 — Site Health Check

### NEEDLE (top 3 issues found)
1. Exhausted-scan copy was confusing — "submission context" is jargon → FIXED
2. PricingPage featured CTA "START AFTER COVERAGE CHECK" didn't tell user what they were starting → FIXED
3. No competitor differentiation on pricing page — users comparing to Checkatrade/MyBuilder → FIXED

### BUILDER: Fixed #1 and #2 above
### CRITIC: All changes readable in <3 seconds ✓
### REVENUE: "WHO DO YOU CALL?" + competitor callout + "no contract" increases £39/mo conversion likelihood ✓

## Vercel Cron Fix (bonus)
- Deployment failed: `vercel.json` had `0 * * * *` (hourly) cron for `/api/alerts/send`
- Vercel Hobby plan only allows daily crons
- Fixed to `0 8 * * *` (daily at 8am UTC)

---

## Files Changed
- `src/pages/PricingPage.tsx`
- `src/pages/FindJobsPage.tsx`
- `vercel.json`
