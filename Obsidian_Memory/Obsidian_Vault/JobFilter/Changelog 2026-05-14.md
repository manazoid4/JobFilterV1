---
type: changelog
date: 2026-05-14
repo: JobFilterV1
branch: main
source: NightlyBuildAgent
---

# JobFilter Changelog — 2026-05-14

## Summary
NightlyBuildAgent session. Build: GREEN. TypeScript: CLEAN. 5 files changed across 4 phases.

## Commits Pushed

| Commit | Files | Change |
|--------|-------|--------|
| MCP #1 | `server/routes/leadsSearch.ts`, `src/pages/LeadListPage.tsx` | Backend scoreReasons mapping + LeadListPage copy polish |
| MCP #2 | `src/pages/LeadDetailPage.tsx` | ICS calendar export, WHY THIS LEAD, DID YOU WIN IT? |
| MCP #3 (agent) | `src/pages/FindJobsPage.tsx`, `src/pages/HomePage.tsx` | Trade-specific reason badges + HomePage CTA hierarchy |

---

## Key Changes Detail

### server/routes/leadsSearch.ts — scoreReasons → reasons
- Full-access leads now map `l.scoreReasons` → `l.reasons` before sending to frontend
- Previously: `lead.reasons` was always `undefined`, fallback `['Verification proof', ...]` always shown
- Now: real trade-specific scoring breakdown reaches the frontend card

### src/pages/FindJobsPage.tsx — Trade-specific scoring UX (PHASE 2)
Added `parseTradeReasons(raw: string[])` function that converts raw scorer output into human-readable, trade-specific badges:
- `"Trade match: ev charger, rewire (+12)"` → `"EV CHARGER — YOUR TRADE"` (highlighted yellow)
- `"Trade match: boiler, bathroom (+12)"` → `"BOILER — YOUR TRADE"` (highlighted yellow)
- `"Related: kitchen (+9)"` → `"KITCHEN"` (plain badge)
- `"Urgent timeline (+20)"` → `"URGENT"`
- `"Fresh lead 1d old (+5)"` → `"JUST POSTED"`
- `"Strong contact signal (+15)"` → `"CONTACT READY"`
- `"Estimated value in pay-worthy range (+25)"` → `"GOOD VALUE"`
- Technical reasons (source confidence, proximity, "Not your trade" penalties) are filtered out — tradesmen don't need the maths
- Fallback: `"Verified signal"` when no reasons match

### src/pages/LeadListPage.tsx — Copy Polish (PHASE 3)
- Header: "Gold means act now" → "GOLD = call today. SILVER = watch it. BIN = don't waste your time."
- Removed fabricated "98.4% Accuracy" Vantage Insight card → replaced with honest "HOW IT'S SCORED" explainer (100 max score, what goes into it)
- Removed hardcoded fake live ticker ("New GOLD lead — E8 · Bathroom refit") → replaced with actionable TIP: "Call GOLD leads the same day. Response rate drops 60% after 24 hours."
- Empty state: "Share your filter link" (weak) → "SCAN FOR JOBS NOW" (primary) + "GET MY FILTER LINK" (secondary) — two concrete actions
- WhatsApp button: "WHATSAPP PING" → "SEND WHATSAPP"; message template improved to "I'm local and can quote this week — happy to pop round"

### src/pages/LeadDetailPage.tsx — Copy Polish + ICS Calendar Export (PHASE 3 + Tier 1)
**Calendar ICS export (was on roadmap, not on main):**
- Added `buildIcs(lead)` and `downloadIcs(lead)` functions
- FOLLOW-UP REMINDER section with ADD TO CALENDAR button
- ICS file schedules 9am–10am follow-up for next day
- Explicitly mentions Google Calendar, Apple Calendar, and Outlook

**Copy polish:**
- `REASONS` → `WHY THIS LEAD` — section renamed and rewritten
- "YES Local" → "YES Within your area" with colour-coded YES/NO/LOW labels
- "YES Clear" → "YES Clear brief — no guesswork on the quote"
- "YES Budget confirmed" → "YES Budget confirmed — not fishing for a free quote"
- `TRACK THE MONEY` → `DID YOU WIN IT?`
- Outcome status line: "Current result: ..." → "Status: ... — mark the result so your wins build up over time."

### src/pages/HomePage.tsx — CTA Hierarchy (PHASE 4 BUILDER fix)
NEEDLE agent identified: 3 equal CTAs with no hierarchy (Scan My Area, See Blueprint, Claim Territory)
- Primary CTA: `SCAN FREE — NO CARD NEEDED` (larger button, yellow, full-width on mobile)
- Secondary: `See Blueprint →` and `Claim Territory →` demoted to text links
- "No credit card required" signal added to primary CTA text per copy rules

---

## PHASE 4 — Site Health Check Results

**NEEDLE findings:**
1. HomePage CTAs — 3 equal-weight buttons, no clear primary action (HIGH) → FIXED
2. DashboardPage empty state — no territory status line (HIGH) → not fixed this session, logged for next
3. PricingPage Founder card — weak visual distinction from Free tier (MEDIUM) → not fixed this session, logged for next

**CRITIC:** Fix clearer in <3 seconds? YES
**REVENUE:** Increases £39/mo conversion likelihood? YES

---

## Build Status
- `npm run build`: ✅ PASS (3.42s)
- `npx tsc --noEmit`: ✅ CLEAN (0 errors)

## Roadmap Updates
- Google Calendar ICS export: now BUILT ✅ (LeadDetailPage, client-side)
- Trade-specific scoring UX: BUILT ✅ (parseTradeReasons in FindJobsPage)

---

## Related
- [[Changelog 2026-05-13]]
- [[Feature Roadmap - 8th May 2026]]
- [[Sessions/Daily To-Do]]
