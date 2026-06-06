# Changelog 2026-06-06 — NightlyBuildAgent Run 1

## Build Status
- **Build:** GREEN (106 pages)
- **TypeScript:** CLEAN

---

## Pre-flight

- Fresh container — `npm install` required (node_modules absent), completed cleanly
- Build confirmed GREEN, TypeScript CLEAN before changes
- Read vault: Feature Roadmap, Key Problems, Design Direction, Problems and Solutions, Daily To-Do
- Last run priorities reviewed:
  1. DashboardPage welcome banner mobile — banner structure confirmed clean for 375px (shrink-0 badges, min-w-0 content, flex layout)
  2. Stripe live test — still blocked on Vercel test keys, no action
  3. LeadDetailPage calendar link — verified server route functional, client download working

---

## Phase 1 — Fix Broken

Build was green. No TypeScript errors. No fake form submissions found (all 3 instances of setSubmitted/setEmailDone properly wired to `/api/waitlist`).

---

## Phase 2 — Tier 1 Feature Audit

All 5 Tier 1 features in the agent prompt are built:
- Scan counter: `!unlimitedTester` gating correct, shows 3 free scans remaining
- Google Calendar ICS export: `/api/leads/calendar.ics` + client-side `downloadIcs()` both functional
- Won leaderboard: `WinStatsBanner` on FindJobsPage, `/api/wins/stats` reads `data/outcomes.jsonl`
- WhatsApp template improvements: Quick Quote + Availability Check added in Run 2 (2026-06-05)
- Trade-specific scoring UX: buildPreviewReasons + parseTradeReasons working (Run 1, 2026-06-05)

---

## Phase 3 — Score Threshold Consistency Fix (Cross-Site)

### Problem Found
GOLD/SILVER/BRONZE thresholds shown to users on 4 different pages were wrong and inconsistent. The actual scoring engine uses `>= 80` for GOLD and `>= 50` for SILVER. Several UI pages still displayed the old thresholds (90+, 75–89, 60–74).

This creates a trust/confusion gap: a tradesman reads TrustCenterPage (shows GOLD = 90+), then sees a lead on FindJobsPage with score 82 labelled GOLD — and wonders if the app is broken.

### Files Fixed

**`src/components/SeriousBuyerScore.tsx`** — component used by LeadCard
- `getScoreLabel`: GOLD 90→80, SILVER 75→50, remove CHECK tier, BRONZE = <50
- `getScoreColor`: same thresholds
- `getBarColor`: same thresholds

**`src/pages/TrustCenterPage.tsx`**
- 4-tier table (90-100, 75-89, 60-74, Below 60) → 3-tier (80-100, 50-79, Below 50)
- Grid: `lg:grid-cols-4` → `sm:grid-cols-3`
- GOLD tag: "90% of revenue comes from GOLD" → "80+ score — worth quoting today" (removes unvalidated stat)
- BRONZE replaces CHECK as bottom tier
- Removed unused `Eye` import (was only used by CHECK tier card)

**`src/pages/MethodologyPage.tsx`**
- Pipeline step 04 detail: `GOLD (90+). SILVER (75-89). BRONZE (60-74)` → `GOLD (80+). SILVER (50–79). BRONZE (below 50)`
- Scoring section paragraph: same fix

**`src/pages/LeadListPage.tsx`**
- Empty-state SILVER text: `score 75–89` → `score 50–79`

---

## Phase 3 — BlueprintPage Naming Violations

**`src/pages/BlueprintPage.tsx`** — `dataSources` array
- `'England — Planning Data API'` → `'England — national planning approvals'`
- `'London — Planning London Datahub'` → `'London — Greater London planning data'`

These named specific government data portals in a public-facing page, violating the product rule (never expose data source names publicly).

---

## Phase 3 — Copy Polish: SignupPage + LeadDetailPage + DashboardPage

**`src/pages/SignupPage.tsx`**
- Added line above trust badges: "No card required to create your account — payment comes after you confirm your email."
- Previously the 30-DAY MONEY-BACK / CANCEL ANYTIME / NO CONTRACT badges implied payment was imminent, when no card is needed until Stripe checkout after email confirmation.

**`src/pages/LeadDetailPage.tsx`** — locked contact section (`!lead.phone`)
- **Before:** "CONTACT DETAILS LOCKED — Paid members see who to contact, what the job is worth, and a ready-to-send WhatsApp template — not just a score."
- **Problem:** WhatsApp template IS already visible on the page above this section. The copy contradicted what the user could see 2 scrolls up.
- **After:** "BUYER CONTACT LOCKED — The template above is ready. Gold members get the buyer's direct number so you can send it — no shared auction, no five-trade blast."
- Button: "UNLOCK CONTACT DETAILS" → "UNLOCK THIS LEAD — £39/MO →"
- Footer: "No credit card to scan" (confusing) → "30-day money-back. Cancel anytime."

**`src/pages/DashboardPage.tsx`** — isEmpty section
- Added "No credit card required — 3 free scans every week" trust line below CTA buttons
- Previously the isEmpty block had no explicit trust signal next to the free scan CTA

---

## Phase 4 — Site Health Check (NEEDLE)

### Top 3 UX issues found:
1. **Score threshold inconsistency** — TrustCenterPage/MethodologyPage/LeadListPage/SeriousBuyerScore all showed 90+/75-89 thresholds while engine uses 80+/50-79 → **FIXED this run**
2. **LeadDetailPage paywall copy contradicts visible content** — "see WhatsApp template" locked but template already visible → **FIXED this run**
3. **DashboardPage isEmpty missing trust signal** — no "No credit card required" near free scan CTA → **FIXED this run**

### CRITIC verdict: Yes — all 3 fixes are clearer in <3 seconds
### REVENUE verdict: Yes — accurate score labels reduce confusion at the moment of lead evaluation; correct paywall framing removes distrust signal

---

## Next Run Priorities

1. **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 lands correctly and profiles.plan flips (still blocked on test keys in Vercel)
2. **DashboardPage welcome banner mobile check** — verify the 3-step ol/li layout at 375px (last run confirmed code structure, worth a visual spot-check)
3. **TrustCenterPage `Crown` import check** — `Crown` was used by the GOLD tier tag; with the tag text changed from a decorative badge to plain text, verify Crown is still rendered or clean up if unused
