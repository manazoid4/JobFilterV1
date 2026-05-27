---
type: changelog
date: 2026-05-27
run: 2
repo: JobFilterV1
branch: main
source: NightlyBuildAgent
---

# JobFilter Changelog — 2026-05-27 Run 2

## Summary

NightlyBuildAgent session. Build: GREEN. TypeScript: CLEAN. 8 files changed. Core fix: removed false "Unlimited direct letters — 1st class postage included" claim from 7 pages across the site — this claim was contradicted by CompareBuildAlertPage and has no backend implementation. Also improved LeadListPage WhatsApp template consistency and HomePage territory CTA.

---

## PHASE 1 — Pre-flight

- npm install: required (fresh container)
- Build: GREEN (67 pages, 9.7s)
- TypeScript: CLEAN (0 errors)
- Previous session: 969e71b (2026-05-27 NightlyBuildAgent Run 1)

---

## PHASE 2 — Fix / Feature

### LeadListPage: WhatsApp template consistency

**Problem:** SEND WHATSAPP button in LeadListPage used a hardcoded, lower-quality message string:
```
"Hi, saw your ${lead.jobType} job in ${lead.area}. I'm local and can quote this week — happy to pop round. Let me know."
```

This bypassed the `chaseTemplates.ts` template system and was inconsistent with LeadDetailPage.

**Fix:**
- Imported `MESSAGE_TEMPLATES` and `fillTemplate` from `../lib/chaseTemplates`
- Added `FIRST_TOUCH_TEMPLATE` constant pointing to the `first_touch_2h` template
- Replaced hardcoded string with `fillTemplate(FIRST_TOUCH_TEMPLATE, { job_type: lead.jobType, area: lead.area })`
- Result: message now matches the LeadDetailPage First Touch template in quality and content

**File:** `src/pages/LeadListPage.tsx`

**CRITIC:** YES — message is now consistent and more professional in <3 seconds.
**REVENUE:** YES — paid users get the same quality template from list view as detail view.

---

## PHASE 3 — Copy Polish

### Critical: False Letter Claim Removed (7 files)

**Problem Found:** "Unlimited direct letters — 1st class postage included" appeared in 5 pages as a claimed product feature. However:
1. `CompareBuildAlertPage` explicitly said `{ feature: 'Letter delivery', jobfilter: 'No — instant digital delivery', jf: false }`
2. No backend API exists for sending physical letters
3. The only "letter" feature is `letter_drop` in `chaseTemplates.ts` — a template for the USER to copy and print themselves (confirmed by `copiedLabel: 'COPIED — PRINT & POST'` in QuickResponseKit)
4. `EpcPage` has a separate "Enquire about letter service" CTA — confirming letters are NOT automatically included

Claiming "unlimited direct letters — 1st class postage included" to a tradesman who expects physical letters through homeowners' doors is a false promise.

**Files fixed and copy change:**

| File | Before | After |
|------|--------|-------|
| `TerritoriesPage.tsx` (WHAT YOU GET list) | `Unlimited direct letters — 1st class postage included` | `Letter drop scripts for every lead — print and post in minutes` |
| `TerritoriesPage.tsx` (final CTA copy) | `unlimited direct letters with 1st class postage included` | `letter drop scripts for every lead` |
| `TrustCenterPage.tsx` (guaranteeFeatures) | `Unlimited direct letters — 1st class postage included` | `Letter drop scripts for every lead — print and post in minutes` |
| `FaqPage.tsx` (£39/mo answer) | `company-branded approach letters for selected Gold leads` | `letter drop scripts for every lead` |
| `HomePage.tsx` (feature grid) | `Unlimited direct letters — Written with your company details. 1st class postage included.` | `Letter drop scripts — Pre-written for your trade and area. Print and post in minutes.` |
| `MethodologyPage.tsx` (step 06 DELIVER) | `Gold signals route to WhatsApp, direct letters, territory locks` | `Gold signals route to WhatsApp, letter drop scripts, territory locks` |
| `BlueprintPage.tsx` (step 06 DELIVER) | `Gold signals route to WhatsApp, direct letters, territory locks` | `Gold signals route to WhatsApp, letter drop scripts, territory locks` |

**CompareBuildAlertPage** updated: `'Letter delivery': 'No — instant digital delivery'` → `'Physical letter service': 'Template included — you post'` to be accurate and fair.

### HomePage: Territory CTA upgraded

**Before:** `Open Territory Grid` (single, lowercase, mixed-case, no secondary)
**After:**
```
SEE OPEN TERRITORIES → (primary, uppercase, nav style)
SCAN FREE — NO CARD NEEDED (secondary, reinforces free entry point)
```

Two-button pattern matches the hero and other CTA sections.

---

## PHASE 4 — Site Health Check (4-agent)

**NEEDLE found:**
1. FILL MY WEEK above scan results — **false positive**: `SHOW_ADVANCED_TOOLS = false`, section is hidden. Not an issue.
2. Territory shown twice in DashboardPage — already has connecting copy "No patch locked — you're racing every other trade for the same leads. Lock your patch →". Minor.
3. LeadListPage WhatsApp generic template — **FIXED** (Phase 2 above).

**BUILDER:** LeadListPage WhatsApp template consistency fix (above)
**CRITIC:** YES — paid users see consistent, professional message quality from both list and detail view
**REVENUE:** YES — removes friction for first-contact (better message = more replies = more wins)

---

## Build Status
- `npm run build`: GREEN (67 pages)
- `npx tsc --noEmit`: CLEAN (0 errors)
- Pushed to main: YES (784a73c)
- Vercel deploy: triggered

---

## Files Changed

| File | Change |
|------|--------|
| `src/pages/LeadListPage.tsx` | WhatsApp uses first_touch_2h template from chaseTemplates.ts |
| `src/pages/TerritoriesPage.tsx` | Letter claim → letter drop scripts (2 locations) + "Lock Patch" → "LOCK PATCH →" |
| `src/pages/TrustCenterPage.tsx` | Letter claim → letter drop scripts |
| `src/pages/FaqPage.tsx` | Letter claim → letter drop scripts |
| `src/pages/HomePage.tsx` | Letter claim → letter drop scripts; territory CTA → dual-button |
| `src/pages/MethodologyPage.tsx` | Letter claim → letter drop scripts |
| `src/pages/BlueprintPage.tsx` | Letter claim → letter drop scripts |
| `src/pages/CompareBuildAlertPage.tsx` | Feature row clarified |
