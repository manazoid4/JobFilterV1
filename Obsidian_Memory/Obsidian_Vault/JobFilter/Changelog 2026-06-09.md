# Changelog — 9 June 2026 (NightlyBuildAgent)

---

## Pre-flight

- Fresh container — `npm install` required before build (next binary missing)
- Build GREEN after install, TypeScript CLEAN before starting
- Read: Feature Roadmap, Design Direction, Problems and Solutions, Daily To-Do, Changelog 2026-06-08 Run 3

---

## Phase 1 — Fix Broken

- No broken imports, no TypeScript errors, no fake flows found
- All Tier 1 features confirmed built: scan counter, Calendar ICS, WinStatsBanner, WhatsApp templates, trade-specific scoring UX
- Commercial lead detection verified built end-to-end (normaliser → scorer → frontend filter)
- "TRADE COMMAND CENTRE" jargon identified as top NEEDLE issue (5 instances across 2 files)

---

## Phase 2 — Feature Built: PATCH PULSE "IN DEMAND" Summary

**What was built:**
- `src/pages/FindJobsPage.tsx` — added `extractTopJobTypes(leads: Lead[]): string[]` function that:
  - Iterates all leads' `reasons` arrays
  - Extracts "Trade match: X" keywords (paid-tier scoring reasons)
  - Extracts "Trade teaser: X" keywords (free-tier preview reasons)
  - Aggregates counts, returns top 3 in format ["EV CHARGER ×3", "REWIRE ×2", "BOILER"]
  - Filters out generic teasers ("URGENT TIMELINE", "COMMERCIAL JOB")
- Added `const topJobTypes = extractTopJobTypes(displayedLeads)` to the component
- Added "IN DEMAND: {topJobTypes.join(' · ')}" line in the PATCH PULSE bar (yellow text, only renders when keywords found)

**Why it matters:** PATCH PULSE already showed GOLD/SILVER/BRONZE counts and source mix. What was missing: *what specific job types are hot in that area this week*. An electrician scanning B14 now immediately sees "EV CHARGER ×3 · REWIRE ×2" before scrolling through 8 individual cards.

**Touches:** `src/pages/FindJobsPage.tsx` only. No backend changes. No new dependencies.

---

## Phase 3 — Copy Polish: Admin Guard Jargon Sweep

| File | Before | After |
|---|---|---|
| AdminGuardTeaserPage.tsx:57 | `TRADE COMMAND CENTRE — PAID FEATURE` | `TAX & ADMIN — PAID MEMBER FEATURE` |
| AdminGuardTeaserPage.tsx:151 | `TRADE COMMAND CENTRE` | `MORE COMING FOR PAID MEMBERS` |
| AdminGuardPage.tsx:90 | `TRADE COMMAND CENTRE` | `TAX & ADMIN` |
| AdminGuardPage.tsx:323 | `TRADE COMMAND CENTRE` | `TAX & ADMIN` |
| AdminGuardPage.tsx:601 | `TRADE COMMAND CENTRE` | `TAX & ADMIN` |

**Why it matters:** "Trade Command Centre" is internal product naming that leaked into public-facing and paid-member copy. A tradesman visiting the admin guard feature for the first time saw "TRADE COMMAND CENTRE" with no context before the feature name "ADMIN GUARD". "TAX & ADMIN" is self-explanatory in < 3 seconds.

---

## Phase 4 — Site Health Check

1. **NEEDLE:** "TRADE COMMAND CENTRE" jargon across AdminGuardPage (3×) and AdminGuardTeaserPage (2×) — internal product noun with no plain-English meaning to a UK tradesman
2. **BUILDER:** Replaced all 5 instances with "TAX & ADMIN" (page context) and "MORE COMING FOR PAID MEMBERS" (section heading)
3. **CRITIC:** Clearer in <3 seconds? Yes — TAX & ADMIN immediately tells the tradesman what they're looking at
4. **REVENUE:** Increases likelihood of paying £39/mo? Yes — the admin guard feature is included free with the paid plan; "TAX & ADMIN" makes it feel immediately useful vs "TRADE COMMAND CENTRE" which sounds like internal jargon

---

## PR

- #248: https://github.com/manazoid4/JobFilterV1/pull/248

---

## Open / Carried Forward

- Stripe live test — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- Spot-check review nudge — verify renders correctly once a paid test account has wins 24h+ old
- DashboardPage Admin Guard card — "TAX & ADMIN" now consistent with DashboardPage card's "TAX & DEADLINES" micro-label
- TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

---

## Next Run Priorities

1. Check if `extractTopJobTypes()` surfaces meaningful keywords on a real B14 electrical scan — if most free-tier reasons are generic (no trade teasers), the "IN DEMAND" line might not show; may need to fall back to title-keyword extraction
2. FaqPage: verify question 5 ("What do I actually get for £39/month?") mentions ADMIN GUARD — now that the label changed to "TAX & ADMIN", confirm FaqPage copy is still consistent (it still says "ADMIN GUARD" which is the product name, fine)
3. Stripe live test — when Vercel test keys are available
