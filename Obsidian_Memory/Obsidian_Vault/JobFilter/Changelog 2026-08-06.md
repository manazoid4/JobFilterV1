# Changelog 2026-08-06

## NightlyBuildAgent Run — 6 August 2026

### Build Status
- `npm run build`: PASS
- `npx tsc --noEmit`: PASS (no errors)
- PR: https://github.com/manazoid4/JobFilterV1/pull/443

---

### Phase 2 — Feature: Trade-Specific Scan Loading Messages

**File:** `src/pages/FindJobsPage.tsx`

Added `TRADE_SCAN_JOBS` lookup table mapping each trade to its most common job types:

| Trade | Jobs shown during scan |
|-------|----------------------|
| electrical | rewire, EV charger, consumer unit, EICR |
| plumbing | boiler, bathroom, hot water, central heating |
| roofing | re-roof, flat roof, guttering, fascia |
| building | extension, loft conversion, refurbishment |
| carpentry | kitchen fit, flooring, joinery, staircase |
| painting | full redecorate, exterior painting, commercial repaint |
| hvac | heating system, air conditioning, ventilation |
| landscaping | patio, fencing, driveway, garden design |

Loading state now reads: "Checking for {jobs} jobs near {postcode}."
Previously showed generic "Running the Money Filter."

---

### Phase 3 — Copy Polish: FindJobsPage

**Hero section:**
- Micro-label: `LIVE SCANNER — 3 FREE SCANS, NO CARD` → `3 FREE SCANS — NO CREDIT CARD, NO CATCH`
- Added competitor callout under h1: "Bark charges credits. Checkatrade charges £80+/mo. JobFilter is £39/month flat — or free for 3 scans a week. Leads are not shared with other trades."

**Upgrade nudge (after results):**
- Micro-label: `REAL JOBS. BUYER DETAILS IN FULL ACCESS.` → `REAL JOBS. REAL CONTACTS. NO SHARED LEADS.`
- Fallback headline: `SEE BUYER DETAILS ON EVERY LEAD.` → `SEE WHO TO CALL ON EVERY LEAD.`
- CTA button: `SEE BUYER DETAILS — £39/MO →` → `GET FULL ACCESS — £39/MO →`
- Sub-copy added competitor framing: "Unlike Bark or Checkatrade, these leads are not sold to five other trades — your scan is private."
- Added: "No credit card required to browse · no shared auctions"

---

### Phase 4 — Site Health: Remove Internal Source Labels

**NEEDLE identified:** Patch Pulse strip was showing `Source mix: FTS sample ×3` and `Best source this scan: FTS` — internal data source identifiers exposed to tradesmen who don't know what FTS is. This violates the "NEVER name data sources publicly" rule from the design brief.

**BUILDER fix:** Removed both labels entirely from the Patch Pulse strip. The "IN DEMAND: [job types]" line remains as it's tradesman-relevant.

**CRITIC:** A tradesman landing on the page would no longer see confusing internal codes. Cleaner. ✅

**REVENUE:** Removing jargon reduces friction and looks more professional. Increases trust. ✅

---

### What Was Already Built (Not Rebuilt)
All 5 Tier 1 features were found to be already implemented:
1. Scan counter — already shows "X free scans left this week" with green/orange state
2. Google Calendar ICS export — `server/routes/calendarExport.ts` + ADD TO CALENDAR link in LeadDetailPage
3. Won leaderboard — `WinStatsBanner` component + `/api/wins/stats` endpoint in `server/routes/outcomeReport.ts`
4. WhatsApp templates — `quick_quote_offer` and `availability_check` already in `src/lib/chaseTemplates.ts`
5. Trade-specific scoring — backend TRADE_KEYWORDS in `leadEngine/scorer.ts`, frontend `parseTradeReasons()` converts to "REWIRE — YOUR TRADE" badges
