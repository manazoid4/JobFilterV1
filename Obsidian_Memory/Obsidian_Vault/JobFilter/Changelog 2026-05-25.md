---
type: changelog
date: 2026-05-25
repo: JobFilterV1
branch: main
source: NightlyBuildAgent
---

# JobFilter Changelog — 2026-05-25

## Summary
NightlyBuildAgent session. Build: GREEN. TypeScript: CLEAN. 4 files changed. UX polish across LeadDetailPage (loss reason progressive reveal + template purpose hints), FindJobsPage (scan counter new-user framing + FILL MY WEEK description), AdminGuardTeaserPage (ops strip copy), TradieZonePage (hero copy + empty state).

## Commit Pushed

| Commit | Files | Change |
|--------|-------|--------|
| b3cbc3e | 4 files | UX polish: loss reason reveal, template hints, scan counter, copy |

---

## PHASE 1 — Pre-flight

- Build: GREEN (4.61s after npm install)
- TypeScript: CLEAN (0 errors)
- Previous session commit: cf33fdd (Merge PR #140 — admin guard paid feature)

---

## PHASE 2 — Feature / UI Polish

### WhatsApp Template Picker — Purpose Hints

All 6 templates (including the 2 already-built new ones: Quick quote offer + Availability check) were confirmed in `src/lib/chaseTemplates.ts` and rendering correctly in LeadDetailPage via the stage-filtered picker. Added UX polish: when a template is selected, its `timing` and `purpose` are shown as a micro-text hint between the buttons and the filled message body.

**File:** `src/pages/LeadDetailPage.tsx` (lines ~275-280)

**CRITIC:** Yes — trade now knows WHY to pick each template without clicking through all of them.
**REVENUE:** YES — removes guesswork, trade sends faster, feels more in control.

---

## PHASE 3 — Copy Polish

### LeadDetailPage: Loss Reason Progressive Reveal

**Before:**
- 4 loss reason buttons always visible (before trade has even chosen to mark it Lost)
- LOST button immediately called `setStatus('lost')` without confirming reason
- Loss reasons cluttered the "DID YOU WIN IT?" section for winning trades

**After:**
- Loss reason picker hidden by default
- Clicking LOST → expands a panel with "Why did you lose it? (optional)" + 4 reason buttons + CONFIRM LOSS + CANCEL
- CONFIRM LOSS calls `setStatus('lost')` and closes the panel
- WON and NO ANSWER behaviour unchanged

**File:** `src/pages/LeadDetailPage.tsx`

**CRITIC:** YES — section is clean for trades marking Won; loss reason panel only appears when needed.
**REVENUE:** YES — cleaner DID YOU WIN IT? section encourages more outcome tracking.

### FindJobsPage: Scan Counter — New-User Framing

Open to-do (2026-05-24): NEEDLE #1 identified scan counter showing "3 free scans left this week" + "Resets Monday" for brand new users (0 scans used) — creates countdown anxiety before first use.

**Before:**
- All states: "X free scans left this week — no credit card required" + "Resets Monday"
- New user sees "3 free scans LEFT this week" — implies they started with more

**After:**
- When 0 scans used: "Try up to 3 free scans — no credit card required" (no "Resets Monday")
- When 1+ scans used: "X free scans left this week" + "Resets Monday"
- When 0 remaining: "Free scans used this week — upgrade for unlimited." + UNLOCK link

**File:** `src/pages/FindJobsPage.tsx` (lines ~418-425)

**CRITIC:** YES — new users see positive framing (try 3 scans); "Resets Monday" only appears after they've actually used a scan.
**REVENUE:** YES — removes pre-use anxiety, increases first-scan completion rate.

### FindJobsPage: FILL MY WEEK Description

**Before:** "One tap. Full scan — planning approvals, energy upgrades, public contracts. Top {trade} jobs within {radiusMiles} miles, ranked by score, ready to chase."

**After:** "Broader than SCAN — searches all sources out to {Math.max(radiusMiles, 25)} miles. Planning approvals, energy upgrades, public contracts. Ranked for {titleCase(trade)}, ready to chase."

Note: "QUIET WEEK? FIX IT." micro-label intentionally preserved (stronger emotional hook than alternative "NOT YOUR REGULAR SCAN").

### AdminGuardTeaserPage: Ops Strip Copy

**Before:** `"Don't let admin ambush your trade business."` — corporate, generic

**After:** `Tradesmen miss HMRC deadlines not because they're careless — they're on tools all day. Admin Guard tracks the dates you'd otherwise miss.`

Fear → cause → solution structure. Names the real mechanism (on tools all day = busy).

### TradieZonePage: Hero Body + Empty State

**Before:** "Everything you need in one place. Your leads, your tools, your territory. No fluff."
**After:** "Your pipeline, your patch, your leads — spotted before Checkatrade even lists them. Use the tools below to stay ahead."

Names Checkatrade. Reinforces the core JobFilter promise (early access to leads).

Empty state: "No leads yet. Start scanning to see real jobs in your area." → "No leads in the pipeline yet. Scan your postcode — jobs appear in minutes."

Specific ("minutes") beats vague.

---

## PHASE 4 — Site Health Check

### NEEDLE findings (top 3 — FindJobsPage, DashboardPage, PricingPage)

1. **Scan counter anxiety (HIGH)** — "3 free scans LEFT" framing + "Resets Monday" shown to new users before they've scanned. → FIXED THIS SESSION.

2. **Dashboard TRACKING/RESULTS cards still confusing (HIGH)** — Both link to /leads, both are white (left border accent was added 2026-05-24 but copy still vague: "Scan for jobs → add them here to track"). New users with 0 leads don't know what these cards are for.

3. **PricingPage Checkatrade FAQ buried (MEDIUM)** — "WHY NOT CHECKATRADE/BARK?" section is ~350 lines in, below the fold, with text-only CTAs instead of buttons.

### BUILDER fix

Fixed issue #1 (scan counter new-user framing — see above).

**CRITIC:** YES — new user now sees "Try up to 3 free scans" not a countdown. Removes first-visit friction.
**REVENUE:** YES — higher first-scan completion rate → more leads seen → more likely to upgrade.

---

## Build Status
- `npm run build`: GREEN (3.83s)
- `npx tsc --noEmit`: CLEAN (0 errors)

---

## Related
- [[Changelog 2026-05-24]]
- [[Feature Roadmap - 8th May 2026]]
- [[Sessions/Daily To-Do]]
