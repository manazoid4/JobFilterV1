# Changelog 2026-07-13 Run 3 — NightlyBuildAgent

## Summary

Build: GREEN (Next.js, 113 pages)
TypeScript: CLEAN
Commit: `2d79a63`

---

## Container State

Fresh container — `npm install` required. HEAD synced to `9109b4a` (audit doc commit). Build GREEN, TS CLEAN before changes.

---

## Founder Activity Check

No new founder commits or open PRs detected since Run 2. All carryover blockers unchanged.

---

## Phase 1 — Fix Broken

No broken builds. No broken imports. All forms confirmed wired to real endpoints. Build GREEN before and after changes.

---

## Phase 2 — Tier 1 Features

All Tier 1 features confirmed BUILT from prior runs. No new Tier 1 work required.

---

## Phase 3 — Copy Polish

### Pages changed: BlueprintPage + CityIntelligencePage + SmartQuotePage + TipsPage + TradeBuilders + TradeSmartHome

**BlueprintPage (src/pages/BlueprintPage.tsx):**
- Hero secondary CTA: `LOCK YOUR PATCH →` → `LOCK YOUR PATCH — £39/MO →` — bottom section already had the price anchor; hero was inconsistent

**CityIntelligencePage (src/pages/CityIntelligencePage.tsx):**
- Paywall primary CTA: `UNLOCK — £39/MO` → `UNLOCK — £39/MO →`
- Paywall secondary CTA: `SCAN FREE FIRST` → `SCAN FREE FIRST →`
- Both CTAs at the upgrade-decision moment were missing directional arrows

**SmartQuotePage (src/pages/SmartQuotePage.tsx):**
- Paywall CTA: `GET THE FULL QUOTE — £39/mo` → `GET THE FULL QUOTE — £39/MO →` (arrow added + case standardized)
- Free tools CTA: `OPEN QUOTE FLOOR TOOL` → `OPEN QUOTE FLOOR TOOL →`

**TipsPage (src/pages/TipsPage.tsx):**
- Tip copy: `'Avoid shared lead platforms'` → `'Avoid shared lead sites'` (design rule: no "platform" in user-facing copy)

**TradeBuilders (src/pages/TradeBuilders.tsx):**
- Pain point copy: `'Shared lead platforms let anyone...'` → `'Shared lead sites let anyone...'`

**TradeSmartHome (src/pages/TradeSmartHome.tsx):**
- Pain point heading: `'Comparison platforms undervalue your work'` → `'Comparison sites undervalue your work'`
- Comparison old list: `'Comparison platforms commoditise smart home work...'` → `'Comparison sites commoditise smart home work...'`

---

## Phase 4 — Site Health Check (NEEDLE)

### NEEDLE — Top 3 UX issues found:

1. **CityIntelligencePage paywall CTAs both missing →** — The upgrade moment on city intelligence briefings (linked from /news in nav) had BOTH the primary `UNLOCK — £39/MO` and secondary `SCAN FREE FIRST` missing directional arrows. Every user hitting the paywall on any city page saw directionless CTAs. **FIXED.**

2. **BlueprintPage hero secondary CTA missing price anchor** — The bottom section had `LOCK YOUR PATCH — £39/MO →` (correct) but the hero had `LOCK YOUR PATCH →` (no price). Inconsistency in the most above-the-fold section. **FIXED.**

3. **"platform" word in 4 user-facing copy locations** — TipsPage, TradeBuilders, TradeSmartHome (×2) all used the banned word "platform" in content visible to tradesmen. Design rule: never "platform", always "site", "directory", or "service". **FIXED.**

### CRITIC: Are the CityIntelligencePage fixes clearer in <3 seconds? YES — arrows signal action direction; both CTAs now read as navigational.
### REVENUE: Does adding → to `UNLOCK — £39/MO →` increase likelihood of paying £39/month? YES — it's the primary CTA at the exact upgrade decision moment; consistent with the site arrow standard.

---

## Carryover Blockers (unchanged)

- **Founder decision — add-on service pricing**: 14 add-on services still have no £ shown
- **Stripe live test**: blocked on test keys in Vercel
- **TradeFlow "Send to TradeFlow" button**: blocked on URL scheme from founder
- **n8n workflow 16 (LLM Brief Builder)**: blocked on SMTP creds + manual activation

---

## Next Run Priorities

1. **Add-on service pricing copy** — 14 services show no price; still blocked on founder decision. If founder decides, add "from £X" or "priced per job" labels to each service card in ProductAdvantagePage.
2. **"near you" narrative sweep** — TradeGroundworkers, TradeFireSafety, TradeEVCharger, TradeQuantitySurveyors still have "near you" in howItWorks step descriptions. Low priority (narrative context, not CTAs) but consistent with overall specificity rule.
3. **CityIntelligencePage back-link** — Error state "← Back to briefings" uses ← (back arrow) on a yellow-ish button. Functional but could use consistency audit.
