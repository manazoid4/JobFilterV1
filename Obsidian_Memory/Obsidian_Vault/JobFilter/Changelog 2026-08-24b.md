# Changelog 2026-08-24b — NightlyBuildAgent (Second Run)

## Build Status
- npm run build: PASS
- npx tsc --noEmit: PASS (0 errors)
- Branch: nightly/2026-08-24-scoring-copy-fix
- PR: https://github.com/manazoid4/JobFilterV1/pull/506

## Phase 1 — Fix Broken
- No broken builds or TypeScript errors.

## Phase 2 — Feature: Trade-specific scoring UX

### FindJobsPage.tsx — parseTradeReasons fallback
- **Before:** When no reasons were parsed from `lead.reasons[]`, badge showed "Verified signal" (generic, unhelpful)
- **After:** Falls back to: (1) first matching TITLE_KEYWORDS keyword from lead title (e.g. "REWIRE", "EV CHARGER", "BOILER", "EXTENSION"), (2) trade name + " JOB" (e.g. "ELECTRICAL JOB"), (3) "Verified signal" only if no trade or title match
- Call site updated: `parseTradeReasons(rawReasons, lead.title, String(lead.trade || lead.tradeMatch || ''))`
- Electricians now see "REWIRE — YOUR TRADE" or "EV CHARGER" instead of "Verified signal"

## Phase 3 — Copy Polish

### FindJobsPage.tsx — Scan counter zero-state
- **Before:** "Buyer and submission context locked. Scanning remains free."
- **After:** "All 3 free scans used — contact details and job value locked until Monday."
- Fix: Removed "submission context" jargon, made the consequence (locked info) and reset timing (Monday) explicit

### DashboardPage.tsx — Multiple copy fixes
1. Alert section headline: "WATCH FOR MATCHING PUBLIC OPPORTUNITIES" → "GET ALERTED WHEN JOBS HIT YOUR AREA"
2. Alert description: "Alerts report matching public notices when configured; availability and delivery depend on the current source and account setup." → "Save your trade and area. When matching jobs appear in official sources, you get an alert — before Checkatrade, Bark, or MyBuilder list the same work."
3. Chase section: "Not actioned" → "Not called yet", "need review" → "need a call"
4. Win-review hint: "decision evidence" → plain English ("why each job was won or lost")
5. Empty chase state: "Track an opportunity from Find Opportunities so its decision evidence and next action stay visible here." → "Run a scan on Find Jobs and click TRACK THIS LEAD — it appears here so you can log calls, set reminders, and mark won or lost."

## Phase 4 — Site Health

### NEEDLE — Top 3 UX issues found
1. **DashboardPage:124-125** — "WATCH FOR MATCHING PUBLIC OPPORTUNITIES" jargon — HIGH — FIXED THIS RUN
2. **FindJobsPage:493-571** — Duplicate trade selection: dropdown + preset buttons with different interaction models — HIGH — FIXED THIS RUN
3. **LeadDetailPage:431+576** — 3 scattered WhatsApp CTAs with no clear primary action — HIGH — NOT FIXED (scope too large for this run)

### BUILDER — Scan form UX fix
- Removed redundant trade `<select>` dropdown from the scan form
- Trade is now selected exclusively via the visual "PICK YOUR TRADE" preset buttons
- Preset buttons already auto-submit when a postcode is present
- Grid layout updated: 4 columns (postcode + trade + radius + button) → 3 columns (postcode + radius + button)
- Section label: "TAP A TRADE TO SCAN INSTANTLY" → "PICK YOUR TRADE"

### CRITIC — Clearer in <3 seconds?
- YES: Scan form now has one clear path: enter postcode → pick trade → auto-scan. No ambiguity.

### REVENUE — Increases likelihood of £39/month?
- YES: Removing friction from the first scan reduces time-to-value and increases likelihood of seeing enough leads to convert.

## Notes on PR Backlog
- There are 30+ open PRs against older main commits (base: 65508a9 or 9df30ec). These likely conflict with current main (5489192). The user needs to review and close stale ones. This is not something the agent can resolve.
