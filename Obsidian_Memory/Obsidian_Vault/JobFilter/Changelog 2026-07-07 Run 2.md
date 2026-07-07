# Changelog 2026-07-07 (NightlyBuildAgent — Run 2)

**Commit:** `cdb51db`
**Branch:** main
**Build:** GREEN (113 pages)
**TypeScript:** CLEAN

---

## CONTAINER STATE

Fresh container. `npm install`. HEAD at `7802c5f` (vault auto-digest, Jul 7 10:37 UTC). Build GREEN, TS CLEAN before changes. No new founder commits or open PRs since Run 1.

---

## PHASE 1 — FIX BROKEN

No broken imports, no fake flows. Clean build confirmed.

---

## PHASE 2 — TIER 1 FEATURES

All Tier 1 features confirmed BUILT. No new features to build this run.

---

## PHASE 3 — COPY POLISH + UX FIXES

### 1. "SEE PRICING" fully swept — zero instances remain in the codebase

**Footer.tsx** — CTA bar secondary button: `SEE PRICING` → `LOCK YOUR PATCH — £39/MO →`. Appears in the footer on every single page of the site.

**CityPage.tsx (2 instances)** — Template used for 20+ city pages:
- Hero secondary button: `SEE PRICING` → `LOCK YOUR PATCH — £39/MO →`
- Bottom closing section secondary: `SEE PRICING` → `LOCK YOUR PATCH — £39/MO →`

**TradePage.tsx** — Template used for 15+ trade pages:
- Pricing card CTA: `SEE PRICING` → `LOCK YOUR PATCH — £39/MO →`

**SmartQuotePage.tsx** — Cross-sell paywall box secondary CTA: `SEE PRICING` → `LOCK YOUR PATCH — £39/MO →`

**BuildUkAlternativePage.tsx** (2 instances):
- Comparison table section: `SEE PRICING` → `LOCK YOUR PATCH — £39/MO →`
- STANDARD tier card: `SEE PRICING` → `JOIN STANDARD — £79/MO →` (accurate to the £79 price shown in the card heading — not misleading)

`grep -r "SEE PRICING" src/` now returns zero results.

### 2. KeywordSearch.tsx — green button violation fixed

`TRACK THIS LEAD` button was `bg-[var(--green)] text-white`. Design rule: green = data indicators only, never buttons. Changed to `bg-[var(--yellow)] text-[var(--ink)]`. Used on the document search feature card.

### 3. DashboardPage empty-state CTA hierarchy fixed

The empty-state box (NO JOBS TRACKED YET) that every new user sees on first login had an inverted CTA hierarchy:
- **Before:** scan = ink/dark, lock patch = yellow, pricing = white
- **After:** scan = yellow (primary), lock patch = navy (secondary), pricing = white ("SEE PLANS →")

The `!territory` conditional means two possible states:
- No territory: [YELLOW] RUN YOUR FIRST SCAN → | [NAVY] LOCK YOUR PATCH → | [WHITE] SEE PLANS →
- Has territory: [YELLOW] RUN YOUR FIRST SCAN → | [WHITE] SEE PLANS →

"SEE PRICING" on tertiary changed to "SEE PLANS →" to avoid a duplicate "LOCK YOUR PATCH" label when the territory button is also shown.

---

## PHASE 4 — SITE HEALTH

- **NEEDLE:** Top issues — (1) SEE PRICING on every page via Footer/City/Trade templates, (2) green button in KeywordSearch, (3) CTA hierarchy inversion on Dashboard empty state
- **BUILDER:** All three fixed this run
- **CRITIC:** Footer CTA now has a deliverable ("LOCK YOUR PATCH"). Dashboard primary action is now yellow. Passes <3 second read ✓
- **REVENUE:** Removing "SEE PRICING" from 35+ pages (via templates) and fixing the primary-action color on the first authenticated screen a tradesman sees — both increase conversion likelihood ✓

---

## REMAINING CARRYOVER BLOCKERS (unchanged)

- **Founder decision — add-on service pricing**: 14 add-on services still have no £ shown
- **Stripe live test**: blocked on test keys in Vercel
- **TradeFlow "Send to TradeFlow" button**: blocked on URL scheme from founder
- **n8n workflow 16 (LLM Brief Builder)**: blocked on SMTP creds + manual activation
- **Do NOT delete `vite.config.ts`/`index.html`**: confirmed in use by `server/app.ts`

---

## NEXT RUN PRIORITIES

1. Check for new founder commits/PRs first
2. "SEE PRICING" is now completely swept — do not re-check
3. Sweep remaining `bg-[var(--green)]` on non-badge/non-indicator elements (KeywordSearch badge `UNLIMITED SEARCHES` on line 75 is a data indicator — correct; QuickResponseKit `TRACKING` label is a status badge — correct)
4. Consider copy sweep on authenticated pages not recently reviewed (LeadDetailPage, AccountPage) for any drift
