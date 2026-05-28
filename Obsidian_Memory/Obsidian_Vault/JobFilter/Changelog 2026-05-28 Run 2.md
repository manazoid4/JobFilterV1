---
type: changelog
date: 2026-05-28
run: 2
repo: JobFilterV1
branch: nightly/2026-05-28-run2
pr: 218
source: NightlyBuildAgent
---

# JobFilter Changelog — 2026-05-28 Run 2

## Summary
NightlyBuildAgent session. Build: GREEN (94 pages). TypeScript: CLEAN. 4 files changed across 1 commit. Delivery lock key implemented in sms.ts. LeadDetailPage GOLD banner now has an immediate SEND WHATSAPP CTA. MethodologyPage score thresholds corrected (were wrong: 90+/75-89 vs actual 80+/50-79). HomePage corporate jargon fixed.

## Commits Pushed

| Commit | Files | Change |
|--------|-------|--------|
| c6cb23c | 4 files | Delivery lock key + GOLD CTA + copy polish x3 |

---

## PHASE 1 — Pre-flight

- npm install: required (fresh container, node_modules missing)
- Build: GREEN after npm install
- TypeScript: CLEAN (0 errors)
- Previous session: 2026-05-28 Run 1 (3cac756)
- All Tier 1 features confirmed BUILT from previous sessions
- WhatsApp templates quick_quote_offer + availability_check: already in chaseTemplates.ts ✅
- sms.ts stub: was returning triggered:true — misleading. Fixed this run.
- planningDataFetcher: addressConfirmsOutward already guards non-local postcode stamping ✅
- EpcPage: "PRINT & POST TEMPLATE" + mailto: CTA — already honest, no fix needed ✅
- SignupPage: using createBrowserSupabaseClient — already migrated ✅

---

## PHASE 2 — Feature Built

### sms.ts: Delivery Lock Key (trade+postcode+sourceSystem)

**Problem (Daily To-Do, Problems and Solutions.md):** triggerGoldLeadWhatsApp had no patch-level dedup. Multiple leads from the same source (e.g. PlanningData) in the same patch (e.g. B14) and same trade could be sent in one session, saturating the tradesman.

**Also:** stub was returning `triggered: true` which told callers delivery happened when it hadn't (no Twilio config).

**Fix:**
- Added `sourceSystem?: string` to WhatsAppPayload type
- Added `patchLockSet = new Set<string>()` — session-scoped
- Before delivery: check `lockKey = trade:postcode:sourceSystem` against patchLockSet
- If locked: return `{ triggered: false, provider: 'stub', reason: 'patch_locked' }` — skip delivery
- If not locked: add to patchLockSet, proceed
- Stub path: now returns `{ triggered: false, provider: 'stub', reason: 'no_twilio_config' }` — explicit non-delivery
- Supabase delivery_events: status logic updated — `provider === 'stub'` → `'stubbed'`

**File:** `server/services/sms.ts`

**CRITIC:** YES — dedup prevents the product rule violation ("no five-trade blast") from firing in the same session
**REVENUE:** YES — prevents tradesman distrust caused by seeing duplicate leads from same patch

---

## PHASE 3 — Copy Polish

### LeadDetailPage: GOLD Tier Banner — SEND WHATSAPP NOW CTA

**Problem (NEEDLE #2 from site health check):** The GOLD tier banner said "Chase now." but had no actual button. Tradesman had to scroll to the SEND WHATSAPP section below. Gap between urgency prompt and action.

**Fix:**
1. Computed `firstTouchTemplate` and `quickWaUrl` using first_touch_2h template + lead.jobType + lead.area
2. Added `SEND WHATSAPP NOW →` button inside the GOLD banner — black on yellow, hard shadow style
3. Only renders when `quickWaUrl` is non-null (safe)

**Before:** "GOLD — first-mover window open. Most trades won't see this for 24–48h. Chase now."
**After:** Same text + `[SEND WHATSAPP NOW →]` button inline in the banner

**File:** `src/pages/LeadDetailPage.tsx` (~line 266)

**CRITIC:** YES — action is visible in <3 seconds, no scrolling required
**REVENUE:** YES — GOLD leads with immediate action → more chase attempts → more wins → retention

---

### MethodologyPage: Score Threshold Corrections + Source Naming Fixes

**Problem:** MethodologyPage step 04 said GOLD (90+), SILVER (75-89), BRONZE (60-74) — wrong. Actual thresholds: GOLD ≥80, SILVER 50-79, BRONZE <50. A potential customer reading the methodology page would distrust the product if they then saw a GOLD lead at score 82 (which the page claimed was only SILVER).

**Additional issues:**
- Step 02 used "UPRN" — jargon tradesmen don't know
- Step 03 used "price-paid history" — implies Land Registry (source naming violation)
- Data sources: "Government contracts portal" → Contracts Finder (too specific), "UK public tenders portal" → Find a Tender Service (too specific)

**Fixes:**
1. Step 02 body: "postcode, UPRN, and company number" → "specific address and company"
2. Step 03 body: "price-paid history" → "value history"
3. Step 04 detail: `Score: 0-100. GOLD (90+). SILVER (75-89). BRONZE (60-74). CHECK (below 60).` → `Score: 0-100. GOLD (80+). SILVER (50-79). BRONZE (below 50). Higher = chase today.`
4. Data sources: "Government contracts portal" → "Public contract notices", "UK public tenders portal" → "Public tender notices"

**File:** `src/pages/MethodologyPage.tsx`

**CRITIC:** YES — correct thresholds build trust. Tradesmen trust numbers they can verify.
**REVENUE:** YES — correct methodology creates confidence in the scoring system

---

### HomePage: "construction intelligence layer" Jargon Removed

**Problem:** Bottom CTA section said "Not a lead marketplace. A construction intelligence layer." — this jargon was fixed on PricingPage (26 May) but missed on HomePage.

**Fix:** "Not a lead marketplace. A construction intelligence layer. Gold leads are scored by trade, patch, and timing — and sent only to you." →
"Not a directory. Not an auction. Gold leads scored by trade, patch, and timing — sent to you, not four other trades bidding on the same job."

**File:** `src/pages/HomePage.tsx` (~line 448)

**Applies:** Competitor naming rule (directory, auction). Fear (four other trades) → Control (sent to you).

---

## PHASE 4 — Site Health Check (4-Agent Loop)

### NEEDLE Findings

1. **LeadDetailPage: GOLD banner had no CTA** (HIGH) — "Chase now" statement with no button → FIXED THIS SESSION
2. **FindJobsPage: paywall trigger lacks emotional hook** (HIGH) — "READY TO UNLOCK?" is vague when user has seen mediocre leads → Carry to next run
3. **DashboardPage: empty state two CTAs create friction** (MEDIUM) — "RUN FIRST SCAN" vs "SEE PRICING" → which one? → Carry to next run

### REVENUE Audit Findings

- Trust badges (30-DAY MONEY-BACK, CANCEL ANYTIME, NO CONTRACT): ✅ PASS
- Price anchoring vs Bark: ✅ PASS — "Cheaper than one Bark lead" in multiple places
- "No credit card required": ✅ PASS — appears 3x
- Upgrade CTA above fold on mobile: ⚠️ PARTIAL — main upgrade CTA appears after scan results, below fold → Carry to next run

### BUILDER Fix

LeadDetailPage GOLD banner CTA (NEEDLE #1). See PHASE 3 above.

**CRITIC:** YES
**REVENUE:** YES

---

## Build Status
- `npm run build`: GREEN (94 pages)
- `npx tsc --noEmit`: CLEAN (0 errors)

---

## Related
- [[Changelog 2026-05-28]]
- [[Feature Roadmap - 8th May 2026]]
- [[Problems and Solutions]]
