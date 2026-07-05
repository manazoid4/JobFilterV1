# Changelog 2026-07-05

**NightlyBuildAgent — Run 1**
Commit: `231231a`

---

## Container State
- npm install (359 packages, node_modules missing in fresh container).
- Build GREEN (113 pages), TS CLEAN before and after changes.
- HEAD synced to origin/main post Jul 4 Run 3 (107561e).

## Founder Activity
- Zero new founder commits or PRs since Run 3 July 4. All carryover blockers unchanged.

## Phase 1 — No Broken Flows
- Re-confirmed: no fake form submissions. No broken imports. Clean build.

## Phase 2 — All Tier 1 Features Confirmed Built
- Same as every recent run.

## Changes Made

### FindJobsPage.tsx — scan counter timing bug fixed
`recordWeeklyScan()` was called at the top of `submit()`, before the API fetch. A network
error or timeout burned one of the 3 free weekly scans with nothing to show for it. Moved
`recordWeeklyScan()` + `setWeeklyScansUsed()` inside the `else` (success) branch — scans
only counted when the API returns `ok: true`. Removed the duplicate `saveScanHistory` call
that happened before the fetch (one call inside success branch is sufficient).

### FindJobsPage.tsx — hardcoded B14 default postcode removed
`getSavedPostcode()` returned `'B14 7QH'` for first-time visitors with no localStorage.
Trade preset buttons (ELECTRICAL, PLUMBING, etc.) call `submit()` immediately — a Leeds
visitor who tapped "PLUMBING" before entering their postcode got Birmingham results, saw
low-relevance leads, and bounced. Changed default to `''`. Also added `|| !postcode.trim()`
to preset button `disabled` prop — buttons are now greyed out until a postcode is typed.

### TradieZonePage.tsx — green nav cards fixed
Two navigable UI elements used `bg-[var(--green)]`:
- `vicinity` tool icon square (memberTools, line 13)  
- `My Territory` quick-action card (quickActions, line 22)

Design rule: green = data indicators (won/status badges) only, not navigation elements.
Both changed to `bg-[var(--ink)] text-white`. The `won` stage badge at line 131 is correct
and was not touched.

### WeeklySignalsPage.tsx — section 7 primary CTA fill contrast corrected
Section 7 has `bg-[var(--yellow)]` background. The primary CTA "RUN MY FREE SCAN →" was
`bg-[var(--yellow)]` — same fill as the section background, no visual contrast (only the
ink border made it visible). Run 3 (July 4) accidentally introduced this when applying the
"yellow = primary" rule without accounting for yellow-background context. Changed to
`bg-[var(--ink)] text-white` — maximum contrast on yellow background. The secondary
"GET WEEKLY EMAILS →" (navy) and tertiary "SHARE THIS FEED →" (white) are unchanged.

### PricingPage.tsx — hero secondary CTA changed to free scan entry
Hero had "START £39/MO" (yellow/primary) + "CHECK MY PATCH FIRST" (→ /territories, white).
A visitor not ready to pay had to scroll past the full hero to find the free scan option
in the plan cards section. Changed secondary CTA to "SCAN FREE FIRST →" linking to
`/find-jobs`. Now the two hero choices map cleanly: pay now or try it free.

### AccountPage.tsx — free tier upsell copy made specific
"You're on the free tier. Upgrade to unlock Gold leads, territory lock, and WhatsApp alerts."
Rewritten to: "Free tier: 3 scans a week. Gold lead details are locked — only paid members
see the contact path and quote timing. Checkatrade charges £300+ for the same jobs."
More specific (names what's locked), fear-based (locked contact path), competitor-anchored
(Checkatrade £300+).

## Site Health — NEEDLE/BUILDER/CRITIC/REVENUE
- **NEEDLE**: Top 3 issues found: (1) scan counter burns on network error, (2) B14 default
  causes wrong-city scans for first-time visitors, (3) PricingPage hero has no free path.
- **BUILDER**: All 3 fixed plus TradieZonePage green cards and WeeklySignals CTA contrast.
- **CRITIC**: Clearer in <3s? YES — free visitors in non-Birmingham postcodes now see
  relevant results; PricingPage hero now immediately offers a no-card path.
- **REVENUE**: YES — scan counter fix reduces frustration (no phantom scan burns);
  PricingPage free path keeps hesitant visitors in the funnel rather than bouncing.

## Build Status
- Build GREEN (113 pages), TypeScript CLEAN. Pushed to main (`231231a`).

## Carryover Blockers (unchanged)
- Founder decision — add-on service pricing: 14 add-on services still have no £ shown
- Stripe live test — still blocked on test keys in Vercel
- TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Next Run Recommendations
1. **Check for new founder commits/PRs first** — buildable backlog remains small.
2. **WeeklySignalsPage subscription modal** — "YOUR TRADE (OPTIONAL)" select only lists 8 trades; site now covers 18 trades. Worth expanding.
3. **FindJobsPage: postcode placeholder** still shows `B14 7QH` (placeholder text, not default value). This is fine as a hint but could be changed to `e.g. B14 7QH` for clarity.
4. **Carryover blockers remain the main unlock** — Stripe keys, add-on pricing decision, TradeFlow URL scheme.
