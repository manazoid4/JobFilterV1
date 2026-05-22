---
type: changelog
date: 2026-05-27
repo: JobFilterV1
branch: main
source: NightlyBuildAgent
---

# JobFilter Changelog — 2026-05-27

## Summary
NightlyBuildAgent session. Build: GREEN. TypeScript: CLEAN. 4 files changed. Fixed critical WhatsApp template bug (portal/canvass/letter templates appearing in SEND WHATSAPP section), added OTHER APPROACHES multi-channel section to LeadDetailPage, fixed PricingPage plan tier labels, strengthened CompareCheckatradePage CTAs, and added trust badge row to FindJobsPage scanner.

## Commit Pushed

| Commit | Files | Change |
|--------|-------|--------|
| c9049c8 | 4 files | WhatsApp template fix, Other Approaches section, PricingPage labels, CompareCheckatrade CTA, FindJobsPage trust badges |

---

## PHASE 1 — Pre-flight

- npm install: required (fresh container, vite not found)
- Build: GREEN (3.56s before changes, 2.69s after)
- TypeScript: CLEAN (0 errors)
- Previous session: 919c705 (2026-05-26 NightlyBuildAgent + vault run)

---

## PHASE 2 — Feature Built

### LeadDetailPage: WhatsApp Template Filter Fix + OTHER APPROACHES Section

**Problem:** `waTemplates` filter in LeadDetailPage.tsx was filtering by stage only, not by channel. This meant portal_pitch, canvass_script, and letter_drop templates (non-WhatsApp channels) appeared inside the "SEND WHATSAPP" section. Clicking "Letter Drop" or "Site Canvass" then tapping SEND would create a WhatsApp message with a letter or door-step script — wrong channel, wrong context.

**Fix 1 — Template filter:**
```javascript
// BEFORE
const waTemplates = MESSAGE_TEMPLATES.filter((t) => {
  if (chaseStage === 'won') return t.stage === 'won';
  ...
});

// AFTER
const waTemplates = MESSAGE_TEMPLATES.filter((t) => {
  if (t.channel && t.channel !== 'whatsapp') return false; // ← filter added
  if (chaseStage === 'won') return t.stage === 'won';
  ...
});
```

**Fix 2 — OTHER APPROACHES section:**
- Added `otherTemplates` computed value (portal/canvass/letter templates for current stage)
- Added `copiedOtherKey` state for copy-to-clipboard feedback
- Added `copyOtherTemplate()` helper using `navigator.clipboard.writeText()`
- Added new section "OTHER APPROACHES" below "SEND WHATSAPP" that shows only when `otherTemplates.length > 0`
- Each template shows: label, timing/purpose hint, filled body text, COPY button (turns yellow when copied)
- Appears only for `not_contacted` stage (all portal/canvass/letter templates are not_contacted)

**File:** `src/pages/LeadDetailPage.tsx`

**CRITIC:** YES — WhatsApp section now shows only WhatsApp templates. Other Approaches shows portal/canvass/letter with one-tap copy. Clear in <3 seconds.
**REVENUE:** YES — Multi-channel templates are now accessible without confusing the WhatsApp flow. Trades approaching via portal or door-knocking have a dedicated, clear section.

---

## PHASE 3 — Copy Polish

### PricingPage: Plan Tier Labels Fixed

**Problem (from Daily To-Do):** BUYER ACTION PACK and PATCH WATCH sections used "NEW PAID FEATURE" label — didn't tell users which plan tier includes them.

**Before:**
- BUYER ACTION PACK: `NEW PAID FEATURE`
- PATCH WATCH: `NEW PAID FEATURE`

**After:**
- BUYER ACTION PACK: `FOUNDER & STANDARD — INCLUDED`
- PATCH WATCH: `FOUNDER & STANDARD — INCLUDED`

**File:** `src/pages/PricingPage.tsx` (lines ~282, ~295)

**CRITIC:** YES — "FOUNDER & STANDARD — INCLUDED" tells users exactly which plans include the feature in one read.
**REVENUE:** YES — Removes ambiguity that might have caused users to wonder if there was an additional cost.

---

### CompareCheckatradePage: Hero CTA + FAQ Section CTA Button

**Problem 1:** Hero primary CTA said "STOP COMPETING. START FILTERING." — doesn't communicate the free scan offer. No "No credit card required" visible near the CTA.

**Before:** "STOP COMPETING. START FILTERING." + separate trust line "£39/mo. No contract. 30-day money-back guarantee."
**After:** "SCAN MY AREA FREE" + "No credit card required. £39/mo after free scan. No contract. 30-day money-back."

**Problem 2 (from Daily To-Do NEEDLE #3):** FAQ section had no CTA button — users who read all the objection answers had nowhere to go next except scroll back up.

**Fix:** Added CTA button block after FAQ items:
- Yellow button: "SCAN FREE — SEE WHAT'S IN YOUR PATCH" → /find-jobs
- White button: "GET FOUNDING 30 — £39/mo" → /pricing
- Trust line: "No credit card required to scan. 30-day money-back if you pay and it doesn't deliver."

**File:** `src/pages/CompareCheckatradePage.tsx`

**CRITIC:** YES — Both fixes are immediately clearer. Hero now sells the free scan; FAQ section has a clear next step.
**REVENUE:** YES — FAQ section CTA catches high-intent readers at peak conviction. "SCAN MY AREA FREE" hero CTA reduces entry friction by leading with free.

---

## PHASE 4 — Site Health Check (4-Agent Loop)

### NEEDLE Findings

1. **FindJobsPage: "No credit card required" trust signal buried** (HIGH) — Exists as small text in hero body and scan counter below form. Not prominently visible where the user is deciding whether to interact. → FIXED THIS SESSION via trust badge row.

2. **"Unlock exact value" is vague placeholder copy** (MEDIUM) — Free leads show "Unlock exact value" which offers no proof of actual value. Better: "See quote floor" or "budget inside". → Carried to next run.

3. **Pricing friction — no fast path from free preview to £39/mo** (MEDIUM) — The UNLOCK CTA appears below lead results, not inline with the locked field. → Partially mitigated by existing inline UNLOCK FULL LEAD button on mobile; leave for next run.

### BUILDER Fix Implemented

**FindJobsPage: Trust badge row before trade preset buttons**

Added three compact badges inside the scanner section (only shown when `!unlimitedTester`):
- `NO CREDIT CARD` (yellow — most important signal, highest prominence)
- `3 FREE SCANS` (white border — sets expectation before first scan)  
- `BEFORE CHECKATRADE SEES IT` (white border — names competitor, sets competitive context)

**File:** `src/pages/FindJobsPage.tsx` (inside scanner section, after headline)

**CRITIC:** YES — Three compact badges are scannable in <1 second. "NO CREDIT CARD" in yellow instantly removes the biggest objection.
**REVENUE:** YES — Trust badges at decision point (before form interaction) reduce abandonment. Naming Checkatrade anchors competitive value.

---

## Build Status
- `npm run build`: GREEN (2.69s)
- `npx tsc --noEmit`: CLEAN (0 errors)

---

## Related
- [[Changelog 2026-05-26]]
- [[Recent]]
- [[Feature Roadmap - 8th May 2026]]
