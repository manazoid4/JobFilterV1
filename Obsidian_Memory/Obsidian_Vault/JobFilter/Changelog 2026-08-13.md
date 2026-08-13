# Changelog 2026-08-13

## NightlyBuildAgent Run

### Build Status
- `npm run build` — PASS
- `npx tsc --noEmit` — PASS (zero errors)
- `npm audit` — PASS after fix (was failing on nanoid HIGH + postcss MODERATE)

### Features Audited (All Already Built)
All Tier 1 features from the roadmap were found to be already implemented:
1. **Scan counter** — `FindJobsPage.tsx` — shows "X free scans remaining" with weekly localStorage reset
2. **Google Calendar ICS export** — `LeadDetailPage.tsx` — `buildIcs()` function + "ADD TO CALENDAR" button at line 690
3. **Won leaderboard / WinStatsBanner** — `WinStatsBanner.tsx` + `server/routes/outcomeReport.ts` — `/api/wins/stats` endpoint wired
4. **WhatsApp templates** — `chaseTemplates.ts` — "Quick Quote" and "Availability Check" templates already present
5. **Trade-specific scoring UX** — `FindJobsPage.tsx` — `parseTradeReasons()` handles EV charger, boiler, rewire labels etc.

### Copy Polish

#### FindJobsPage.tsx
- **Scan limit message**: Replaced jargon "Buyer and submission context locked. Scanning remains free." with trade-first copy: "3 free scans done — buyer name and response link locked until you upgrade."
- **Mobile locked CTA condition**: Fixed `!OPEN_ACCESS` → `!cardOpenAccess` so owner/devUnlock users no longer see spurious unlock button on mobile.
- **Locked CTA text (mobile + desktop)**: Added price hint `£39/MO` and "No card for the free scan" micro-text to both CTAs.

#### PricingPage.tsx
- **priceNote**: "Paid activation follows coverage and delivery checks." → "Scan free first — no card needed until coverage is confirmed."
- **Plan body**: Replaced corporate "Firm-aware qualification for public opportunities..." with clear value prop from hero.
- **Last plan bullet**: "Decision and outcome tracking so qualification improves over time" → "Every BID or SKIP logged — your qualification sharpens with each run"
- **Paid CTA**: "START AFTER COVERAGE CHECK →" → "START £39/MO — CANCEL ANYTIME →"

#### HomePage.tsx
- **Social proof strip**: "Built for 5–25-person construction and maintenance firms that can bid or subcontract" → "For builders, electricians, roofers, plumbers and groundworkers bidding on public contracts"
- **Strip right side**: "Coverage checked before paid activation" → "Scan free — 3 scans per week, no card required"

### Security Fix
- `package-lock.json` updated via `npm audit fix`
- Resolved: `nanoid < 3.3.17` (HIGH — GHSA-2v37-7h3g-55p8)
- Resolved: `postcss <= 8.5.22` (MODERATE — GHSA-fxqj-rqcc-2cmp)

### Codex Review Corrections (commits 1d1e8cd + 9395622)

Three P2 review comments arrived from chatgpt-codex-connector; all addressed:

1. **FindJobsPage.tsx line 440** — Scan limit message implied lock was newly applied at scan 3. Fixed to: "3 of 3 free scans used this week — upgrade to view buyer name and response link." (lock was always present via `toFreePreviewLead`)
2. **PricingPage.tsx plan bullet** — "sharpens with each run" implied per-scan learning. Fixed to: "Outcome tracking — log BID, WATCH, SUBCONTRACT or SKIP decisions to build your firm's history" (`warmOutcomeLearningCache` requires 10+ `lead_outcomes` rows, not per scan)
3. **PricingPage.tsx priceNote** — "no card needed until coverage is confirmed" implied a coverage gate before Stripe checkout (none exists). Fixed to: "Run a free scan before you pay — no card required for the coverage check."

### PR
- **#465** — `nightly/2026-08-13-copy-polish`
- Vercel preview: DEPLOYED
- Meticulous: 0 visual differences across 169 screens (on commit 0fd217b; re-running on latest)
- CI `check`: in_progress (latest commit 9395622)

---

## Site Health Check Results

### NEEDLE — Top 3 UX Issues Found
1. **Scan limit jargon** (FIXED) — "Buyer and submission context locked" means nothing to a tradesman at the critical upgrade moment
2. **Mobile CTA bug** (FIXED) — `!OPEN_ACCESS` constant instead of `!cardOpenAccess` showed unlock button to owners/devUnlock on mobile
3. **Passive pricing CTA** (FIXED) — "START AFTER COVERAGE CHECK" creates hesitation; replaced with direct price + cancel-anytime copy

### CRITIC: Clearer in <3 seconds? YES
### REVENUE: Increases likelihood of £39/mo? YES — price shown at unlock moment, friction reduced

---

## Next Run Priorities

1. **Write vault docs** — create/update Product, Key Problems, and Design Direction files (currently not in repo)
2. **ICS link in LeadDetailPage** — verify the ADD TO CALENDAR button actually triggers browser download (not just API route); test the `buildIcs` + blob download flow
3. **Dashboard page copy** — the Alert Setup Widget and ROI Tracker sections could use trade-first copy pass
