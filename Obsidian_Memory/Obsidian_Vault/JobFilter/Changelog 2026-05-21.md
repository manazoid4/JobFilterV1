---
type: changelog
date: 2026-05-21
repo: JobFilterV1
branch: main
source: NightlyBuildAgent
---

# JobFilter Changelog — 2026-05-21

## Summary
NightlyBuildAgent session. Build: GREEN. TypeScript: CLEAN. Copy polish: source naming violations fixed on TradePlumbers, TradeRoofers, TradeBuilders, TradeHeatPumps (4 pages). Site health: DashboardPage SCAN CTA hierarchy fixed, HomePage Step 02 copy sharpened.

## Commit Pushed

| Commit | Files | Change |
|--------|-------|--------|
| bee6f46 | TradePlumbers, TradeRoofers, TradeBuilders, TradeHeatPumps, DashboardPage, HomePage | Source naming fixes, SCAN CTA, Step 02 copy |

---

## PHASE 1 — Pre-flight

- Build: GREEN (2.98s)
- TypeScript: CLEAN (0 errors)
- Previous session: b32e6f6 [vault] Changelog 2026-05-20 + Daily To-Do update
- All Tier 1 features confirmed ALREADY BUILT: scan counter, ICS calendar, WinStatsBanner, WhatsApp templates (6 total incl. quick_quote_offer + availability_check), trade-specific scoring

---

## PHASE 3 — Copy Polish: 4 Trade Pages (Outstanding To-Do Item)

Checked TradePlumbers, TradeRoofers, TradeBuilders, TradeHeatPumps for the same source naming violations fixed in TradeElectricians (2026-05-20). All 4 had violations.

### TradePlumbers.tsx

| Location | Before | After |
|----------|--------|-------|
| signals[1] label | `'EPC retrofit signals'` | `'Energy efficiency signals'` |
| signals[1] body | `cross-references EPC data with` | `cross-references energy efficiency signals with` |
| howItWorks[0] | `scan planning portals, EPC registers` | `scan planning approvals, energy efficiency signals` |
| howItWorks[2] | `a property hits F-rated EPC` | `a low-rated energy property is flagged` |
| tradeLeadExample row | `'Official Source', 'Planning Portal — 94%'` | `'Signal type', 'Verified planning signal — 94%'` |
| comparisonNew[1] | `'Every signal is exclusive — no one else sees your scan'` | `'No shared auction — lead goes to you, not five other plumbers'` |
| comparisonNew[3] | `'Official planning data, EPC ratings, council contracts'` | `'Verified planning signals, energy ratings, council contracts'` |
| metaDescription | `EPC data, and council contracts` | `verified signals` |

### TradeRoofers.tsx

| Location | Before | After |
|----------|--------|-------|
| signals[1] label | `'EPC data'` | `'Energy signals'` |
| signals[1] body | `EPC data shows which properties` | `Verified energy signals show which properties` |
| howItWorks[0] | `planning portals, EPC registers` | `planning approvals, energy efficiency signals` |
| tradeLeadExample row | `'Official Source', 'Hackney Council Planning — 93%'` | `'Signal type', 'Verified planning signal — 93%'` |
| comparisonNew[1] | `'Exclusive scans — no one else sees your results'` | `'No shared auction — lead goes to you, not five other roofers'` |

### TradeBuilders.tsx

| Location | Before | After |
|----------|--------|-------|
| sub | `reads planning portals across 400+` | `reads planning approvals across 400+` |
| signals[1] label | `'EPC data'` | `'Energy signals'` |
| signals[1] body | `poor EPC ratings often need structural upgrades` | `flagged for energy upgrades often need structural work` |
| howItWorks[0] | `planning portals, council contracts, and EPC data` | `planning approvals, council contracts, and energy signals` |
| tradeLeadExample row | `'Official Source', 'Leeds City Council Planning — 96%'` | `'Signal type', 'Verified planning signal — 96%'` |
| comparisonNew[1] | `'Exclusive — no one else sees your scan results'` | `'No shared auction — lead goes to you, not five other builders'` |
| metaDescription | `council planning portals` | `council planning approvals` |

### TradeHeatPumps.tsx

| Location | Before | After |
|----------|--------|-------|
| headline | `Find EPC Retrofit Work Before the` | `Find Retrofit Work Before the` |
| painPoints[2] label | `'EPC data is public but unusable'` | `'Energy data is public but unusable'` |
| painPoints[2] body | `The EPC register is online but...` | `The official data is out there — but it's a 30-million-row spreadsheet...` |
| signals[0] label | `'EPC register'` | `'Energy efficiency signals'` |
| howItWorks[0] | `scan the EPC register for F/G rated` | `scan for low-rated properties` |
| tradeLeadExample Urgency | `EPC F + extension approved` | `Low energy rating + extension approved` |
| tradeLeadExample Official Source | `EPC Register + Planning Portal` | `Verified energy + planning signals` |
| tradeLeadExample Signal | `F-rated property...` | `Low-rated property...` |
| tags[0] | `'EPC signal'` | `'Energy signal'` |
| whatsappMessage Urgency | `EPC F + extension approved` | `Low energy rating + extension approved` |
| comparisonOld[4] | `EPC register is a 30-million-row spreadsheet` | `Official energy data is a 30-million-row spreadsheet` |
| comparisonNew[0] | `all EPC and retrofit signals` | `all energy and retrofit signals` |
| metaTitle | `Find EPC Retrofit Work Before the Deadline` | `Find Retrofit Work Before the Deadline` |
| metaDescription | `JobFilter scans EPC data and` | `JobFilter scans energy efficiency signals and` |

---

## PHASE 4 — Site Health Check

### NEEDLE findings (top 3)
1. **DashboardPage Pipeline Visual** — SCAN box (the only CTA) looks identical to TRACKING/RESULTS info boxes (all white, same border). A tradesman can't see which one does something.
2. **HomePage Step 02** — "Get GOLD alerts" is vague; doesn't name WhatsApp delivery, weaker than Steps 01 and 03.
3. **TradePlumbers/Roofers/Builders** — "Official Source" row label in lead card examples still named specific councils/portals (now fixed in Phase 3).

### BUILDER fix 1: DashboardPage SCAN box

**Before:** `bg-white p-5 hover:bg-[var(--yellow)]/20`
**After:** `bg-[var(--yellow)] p-5 hover:opacity-90 shadow-[4px_4px_0_var(--ink)]` + label changed `SCAN` → `SCAN NOW →`

**CRITIC:** Clearer in <3 seconds? YES — yellow box immediately signals "press here", white boxes signal "data".
**REVENUE:** Increases £39/mo conversion? YES — any tradesman who scans sees better leads; scan is the entry to the conversion funnel.

### BUILDER fix 2: HomePage Step 02 copy

**Before:** `Get GOLD alerts`
**After:** `Gold hits your WhatsApp`

**CRITIC:** Clearer in <3 seconds? YES — WhatsApp is named, delivery mechanism is explicit.
**REVENUE:** YES — WhatsApp is the daily habit mechanism; naming it on the how-it-works step reinforces the core value prop.

---

## Build Status
- `npm run build`: GREEN (2.98s)
- `npx tsc --noEmit`: CLEAN (0 errors)

---

## Related
- [[Changelog 2026-05-20]]
- [[Feature Roadmap - 8th May 2026]]
- [[Sessions/Daily To-Do]]
