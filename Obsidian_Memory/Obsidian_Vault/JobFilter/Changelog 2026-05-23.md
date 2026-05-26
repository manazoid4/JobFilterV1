---
type: changelog
date: 2026-05-23
repo: JobFilterV1
branch: main
source: NightlyBuildAgent
---

# JobFilter Changelog — 2026-05-23

## Summary
NightlyBuildAgent session. Build: GREEN. TypeScript: CLEAN (fixed 1 TS2353 error in chaseCheck.ts). Regression fix on FindJobsPage scan counter. Copy polish on SmartQuotePage and ProductAdvantagePage. WeeklySignalsPage CTA hierarchy fix.

## Commit Pushed

| Commit | Files | Change |
|--------|-------|--------|
| 0ae16bd | 5 files | TypeScript fix + scan counter regression + copy polish + CTA hierarchy |

---

## PHASE 1 — Pre-flight

- Build: GREEN (3.18s)
- TypeScript: 1 error found and fixed (`chaseCheck.ts` — `leadReadiness` not in `WhatsAppPayload` type)
- Previous session: ade198d → 5724229 (remote had 8 commits ahead from earlier PRs)

---

## PHASE 2 — Build Tier 1 Features

All Tier 1 features confirmed BUILT. All Tier 2 high-priority features confirmed BUILT (won leaderboard, WhatsApp templates including quick_quote_offer and availability_check, commercial detection, scan counter, Google Calendar ICS, trade-specific scoring).

No new feature built this session.

---

## PHASE 3 — Copy Polish

### SmartQuotePage.tsx

| Location | Before | After |
|----------|--------|-------|
| Hero body | "Stop writing the same quote from scratch every time. Pick your trade, pick the job, get the starter." | "Bark and Checkatrade send five trades after the same job. The sharpest quote wins. Stop starting from a blank page." |
| CTA button | `ENTER THE INTAKE →` | `SCAN MY AREA FREE →` |
| Below CTA | (missing) | `No credit card required.` |

### ProductAdvantagePage.tsx (Vicinity section)

| Location | Before | After |
|----------|--------|-------|
| Vicinity body | "No wasted flyers. No blanket coverage. Just the houses with the signal." | "before they post on Bark or Checkatrade. No blanket drops. Just the houses already showing a live signal." |
| Vicinity distinct | "Micro-ads, hyper-targeted, cheap as chips." | "Targeted, cheap as chips, no shared auction." |
| Vicinity problem | "Vicinity targets only the homes with a trigger signal." | "Vicinity skips those entirely." (more specific) |

---

## PHASE 4 — Site Health Check

### NEEDLE findings (top 3)

1. **WeeklySignalsPage hero: wrong CTA priority** — "SHARE THIS WEEK →" was yellow (primary), which is a marketing action. "SCAN YOUR AREA →" (the conversion path) was white/secondary. A tradesman landing on the signals page should be pushed to scan, not share. **HIGH IMPACT** — yellow = primary action per design rules.

2. **FindJobsPage scan counter regression** — `weeklyScansUsed > 0` condition was present in the remote version (not fully fixed in 2026-05-22 as described in changelog). New users with 0 scans still didn't see "3 free scans left this week". **HIGH IMPACT** — removes the capacity signal for first-time visitors.

3. **chaseCheck.ts TypeScript error** — `leadReadiness: 'MAYBE'` was passed to `triggerGoldLeadWhatsApp()` but `WhatsAppPayload` type doesn't include that property. TS2353 error. **MEDIUM IMPACT** — would block TypeScript compilation.

### BUILDER fixes

#### Fix 1: WeeklySignalsPage CTA order

**Before:**
- Yellow: `SHARE THIS WEEK →`
- Green: `SUBSCRIBE TO WEEKLY →`
- White: `SCAN YOUR AREA →`

**After:**
- Yellow: `SCAN YOUR AREA →` ← primary conversion CTA
- Green: `GET WEEKLY ALERTS →` ← subscriber acquisition
- White: `SHARE →` ← demoted, tertiary

**CRITIC:** Clearer in <3 seconds? YES — yellow button = do this first. Tradesman's eye goes to the conversion action.
**REVENUE:** YES — more scans = more free→paid conversion events.

#### Fix 2: FindJobsPage scan counter always visible

**Before:** `{!unlimitedTester && weeklyScansUsed > 0 && (` — hidden until first scan

**After:** `{!unlimitedTester && (` — always shows for free users, even before first scan

**CRITIC:** YES — "3 free scans left this week — no credit card required" is the first thing a new user needs to see.
**REVENUE:** YES — removes the "what does this cost?" barrier before the first scan attempt.

#### Fix 3: chaseCheck.ts TypeScript fix

Removed `leadReadiness: 'MAYBE'` and `qualityLabel: 'SILVER'` from `triggerGoldLeadWhatsApp()` call in `/api/chase/nudge`. Neither field exists in `WhatsAppPayload` type.

---

## Build Status
- `npm run build`: GREEN (3.18s)
- `npx tsc --noEmit`: CLEAN (0 errors after fix)

---

## Related
- [[Changelog 2026-05-22]]
- [[Feature Roadmap - 8th May 2026]]
- [[Recent]]
