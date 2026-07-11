# Changelog 2026-07-11 Run 2 — NightlyBuildAgent

## Summary

Build: GREEN (Next.js, all pages)
TypeScript: CLEAN
Commit: `16a8475`

---

## Container State

Fresh container — `npm install` required (359 packages). HEAD synced to `0e7e4b9` (PR #332, founder, postcode-first reorder on FindJobsPage). Build GREEN, TS CLEAN before changes.

---

## Founder Activity Check

**PR #332 merged** since last run: "FindJobsPage: postcode input before trade buttons (4-agent UX fix)". Reviewed — sound. Fixes a genuine mobile UX regression where trade buttons were tapped before postcode was entered. No regressions introduced.

---

## Phase 1 — Fix Broken

No broken builds. No broken imports. No fake flows (`setSent(true)` / `setSubmitted(true)` — all wired to real `fetch()` calls: PostJobPage, ProductAdvantagePage, WeeklySignalsPage all confirmed clean).

---

## Phase 2 — Tier 1 Features

All Tier 1 features confirmed BUILT (same as prior runs):
- Scan counter with localStorage weekly reset — FindJobsPage
- WinStatsBanner — wired on FindJobsPage
- Google Calendar ICS — LeadDetailPage
- WhatsApp templates (5 total) — QuickResponseKit
- Trade-specific scoring — lead engine

No new Tier 1 features to build.

---

## Phase 3 — Copy Polish

### Pages changed: FindJobsPage + CompareCheckatradePage + TradeHVAC

**FindJobsPage (src/pages/FindJobsPage.tsx):**
- Fill My Week loading phase 3: "Ranking the best jobs near you..." → "Ranking the best jobs in your postcode..." (specificity rule; consistent with all other "near you" → "in your postcode" sweeps)

**CompareCheckatradePage (src/pages/CompareCheckatradePage.tsx):**
- FAQ answer (line 527): "Try it, see what's active near you." → "Try it, see what's active in your area." (last "near you" instance on a compare page)

**TradeHVAC (src/pages/TradeHVAC.tsx):**
- Pain point: "not on any M&E tender platform" → "not on any M&E tender site" (removes design-rule-banned word "platform"; "M&E tender site" is clear, specific, and not banned)

---

## Phase 4 — Site Health Check

### NEEDLE — Top 3 issues found:

1. **DashboardPage LAST SCAN raw trade label** (highest impact) — Every active user (post-login) sees their last scan summarised as "electrical · B14" instead of "Electrician · B14". Raw engine category values leaked into the UI. Confusing for a tradesperson who just paid £39/mo. Same class of bug that was fixed in AlertSetupWidget chips (Run 3, Jul 6).

2. **FindJobsPage Fill My Week "near you"** — Loading phase message was the last "near you" instance in the user flow (not a CTA but a moment of engagement during the fill-my-week animation).

3. **TradeHVAC "platform" jargon** — Design rule: NEVER use "platform" in copy. "M&E tender platform" used "platform" to describe competitor tender sites.

### BUILDER — Fix applied:

**DashboardPage (src/pages/DashboardPage.tsx), line 375:**
```tsx
// Before
{scanTrade && scanPostcode ? `${scanTrade} · ${scanPostcode}` : 'scans this week'}

// After
{scanTrade && scanPostcode ? `${TRADES.find(t => t.value === scanTrade)?.label ?? scanTrade} · ${scanPostcode}` : 'scans this week'}
```
Uses the existing `TRADES` array (already in scope at line 14) to map raw engine value → friendly label. Zero new code — reuses what exists.

### CRITIC: Is the fix clearer in <3 seconds? **YES** — "Electrician · B14" is immediately meaningful. "electrical" is not a word a tradesman uses about themselves.

### REVENUE: Does it increase likelihood of paying £39/month? **YES** — polish builds trust. A dashboard that looks unfinished (leaking internal engine values) erodes confidence in the product. Active paid users who see their trade displayed correctly feel the tool was built for them.

---

## Carryover Blockers (unchanged)

- **Founder decision — add-on service pricing**: 14 add-on services still have no £ shown
- **Stripe live test** — still blocked on test keys in Vercel
- **TradeFlow "Send to TradeFlow"** — blocked on URL scheme from founder
- **n8n workflow 16 (LLM Brief Builder)** — blocked on SMTP creds + manual activation

---

## Next Run Priorities

1. Check for new founder commits/PRs first
2. Run `npm install` + `npm run build` + `npx tsc --noEmit` before anything else
3. Remaining "near you" in trade page narrative sentences (TradeGroundworkers, TradeEVCharger, TradeSmartHome, TradeFireSafety) — all contextual/specific scenario descriptions, not CTAs. Acceptable as-is.
4. Carryover blockers remain the main unlock

---

*Agent: NightlyBuildAgent*
*Date: 2026-07-11*
*Commit: 16a8475*
