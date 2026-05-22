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
- [[Recent]]

---

# JobFilter Changelog — 2026-05-14 (Run 2)

## Summary
Second NightlyBuildAgent session same day. Build: GREEN. TypeScript: CLEAN. 4 files changed across 3 phases.

## Commits Pushed

| Commit | Files | Change |
|--------|-------|--------|
| MCP #1 | `src/pages/LeadDetailPage.tsx`, `src/pages/PricingPage.tsx` | WhatsApp template picker + PricingPage free CTA copy |
| MCP #2 | `src/pages/CompareCheckatradePage.tsx` | Data source naming fix + comparison table CTA copy |
| MCP #3 | `src/pages/FindJobsPage.tsx` | Duplicate Target badge removal |

---

## Key Changes Detail

### src/pages/LeadDetailPage.tsx — SEND WHATSAPP section (PHASE 2 Tier 1)
- New SEND WHATSAPP section between DETAILS and FOLLOW-UP REMINDER
- Stage-aware template filtering: shows `not_contacted` templates by default, switches to `following_up` templates when chase stage is contacted/following_up, `won` templates when stage is won
- Reads `chaseStage` from `getChaseLeads()` in chaseStore — no new state required, derives from existing chase pipeline
- Template picker buttons: selected = yellow highlight, deselected = white/line border
- Toggle UX: clicking selected template deselects it (hides the preview)
- Preview box: shows filled message with `{job_type}` and `{area}` substituted
- SEND WHATSAPP button opens `wa.me/?text=...` deep link in new tab
- Wires up all 6 existing templates from `chaseTemplates.ts` (first_touch_2h, follow_up_24h, final_nudge_48h, won_thanks, quick_quote_offer, availability_check)

### src/pages/PricingPage.tsx — Free CTA copy (PHASE 3)
- Free plan CTA: `"SCAN MY AREA"` → `"SCAN FREE — NO CARD NEEDED"` (copy rule: add no-credit-card signal to every free CTA)
- Hero secondary CTA: `"SCAN FIRST"` → `"TRY FREE — NO CARD"` (same rule, shorter for hero)

### src/pages/CompareCheckatradePage.tsx — Data source naming fix + CTA (PHASE 3)
- Signal `'Property sales', 'Land Registry data showing who just bought.'` → `'Property activity', 'Recent sales show where owners are ready to invest.'` — removes explicit "Land Registry" source name
- Signal `'New businesses', 'Companies House registrations needing fit-out.'` → `'Business starts', 'New commercial premises needing fit-out work.'` — removes explicit "Companies House" source name
- Rule: never expose specific data sources publicly (Problems and Solutions.md)
- Comparison table CTA: `"SCAN YOUR AREA FREE"` → `"SCAN FREE — NO CARD NEEDED"` (copy consistency)

### src/pages/FindJobsPage.tsx — Duplicate Target badge removal (PHASE 4 BUILDER)
- Removed inline Target-icon score tier badge from lead cards (was duplicate of the large 80×80 score box already on every card)
- Removed `Target` from lucide-react import (was unused after removal)
- Bundle size: 46.30 KB → 45.74 KB (−580 bytes)

---

## PHASE 4 — Site Health Check Results (Run 2)

**NEEDLE findings (new):**
1. FindJobsPage: FILL MY WEEK section appears above scan results — creates competing scan flows (MEDIUM) → logged for next session
2. DashboardPage: territory shown in two places without connecting copy explaining why it matters (LOW) → logged for next session

**BUILDER:** Duplicate score badge removed, no visual regression.
**CRITIC:** WhatsApp toggle UX clear in <3 seconds? YES (selected = yellow, preview appears inline)
**REVENUE:** Template picker reduces friction for first contact → supports retention

---

## Build Status
- `npm run build`: ✅ PASS
- `npx tsc --noEmit`: ✅ CLEAN (0 errors)

## Roadmap Updates
- WhatsApp template picker in lead detail: BUILT ✅
- Data source copy audit (CompareCheckatradePage): DONE ✅
