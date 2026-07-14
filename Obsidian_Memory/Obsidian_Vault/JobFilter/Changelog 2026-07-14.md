# Changelog 2026-07-14 — NightlyBuildAgent

## Summary

Build: GREEN (Next.js, 113 pages)
TypeScript: CLEAN
Commit: `6a4fd0c`

---

## Container State

Fresh container — `npm install` required. HEAD synced to `304e2cd` (founder vault-only commits: RoleSignal note removal + portfolio note). Build GREEN, TS CLEAN before changes.

---

## Founder Activity Check

Two vault-only commits since last NightlyBuildAgent run (Jul 13 Run 3):
- `304e2cd` "Remove misplaced RoleSignal project note" — vault only
- `4041fa5` "Add active portfolio project note" — vault only

No app-code changes. No open PRs. All carryover blockers unchanged.

---

## Phase 1 — Fix Broken

No broken builds. No broken imports. All forms confirmed wired to real endpoints. Build GREEN before and after changes.

---

## Phase 2 — Tier 1 Features

All Tier 1 features confirmed BUILT from prior runs. No new Tier 1 work required.

---

## Phase 3 — Copy Polish

### "near you" — fully swept across all trade howItWorks step descriptions

4 remaining "near you" instances in trade page howItWorks step 03 descriptions — all in narrative examples of what a GOLD lead looks like. Per the specificity rule: specific beats vague.

**TradeFireSafety.tsx:**
- `'An HMO licence application for an 8-bed property near you is...'` → `'...in your area is...'`

**TradeGroundworkers.tsx:**
- `'A 12-unit brownfield approval near you is a groundworks package...'` → `'...in your area is...'`

**TradeEVCharger.tsx:**
- `'A 20-unit new build approved near you means...'` → `'...in your area means...'`

**TradeSmartHome.tsx:**
- `'A large double extension approved in a £600k+ postcode area near you is...'` → `'...in your patch is...'`

### "platform" — fully swept across all remaining user-facing copy

Design rule: never "platform" in user-facing copy. Use "directory", "service", "site", or "directories" instead.

**TradeRoofers.tsx:**
- `'never make it to lead platforms'` → `'never make it to lead directories'`

**CompareCheckatradePage.tsx (3 fixes):**
- Table column header: `<th>Platform</th>` → `<th>Service</th>`
- Disclaimer footnote: `'from platform documentation and user complaints'` → `'from service documentation and user complaints'`
- FAQ answer for Checkatrade: `'Your reviews on their platform are theirs'` → `'Your reviews on their site are theirs'`

**CompareTrustATraderPage.tsx (2 fixes):**
- Testimonial quote: `'My review platform membership renewed automatically'` → `'My review directory membership...'`
- Testimonial quote: `'Review platforms rank me against 40 other local trades'` → `'Review directories rank me...'`

**CityPage.tsx (Glasgow section):**
- `'Most lead platforms ignore Scotland entirely'` → `'Most lead directories ignore Scotland entirely'`

---

## Phase 4 — Site Health Check (NEEDLE)

### NEEDLE — Top 3 UX issues found:

1. **WeeklySignalsPage Section 7 bottom CTA — `LOCK YOUR PATCH — £39/MO` missing →** — The bottom CTA section has a 3-button row: "RUN MY FREE SCAN →", "LOCK YOUR PATCH — £39/MO" (no arrow), "GET WEEKLY EMAILS →". Two of three buttons had arrows, the paid conversion button did not. In a 3-button row, an arrowless button reads as less actionable than its neighbours. **FIXED.**

2. **PricingPage free plan card — `SCAN FREE — NO CARD NEEDED` missing →** — The Free Scan plan card CTA was the only non-arrowed CTA among all three pricing page CTAs. Founder plan "LOCK FOUNDER PRICE →" and "SCAN FREE FIRST →" both had arrows; the inline plan card did not. **FIXED.**

3. **`near you` in 4 trade howItWorks examples** — These describe what a GOLD WhatsApp alert looks like. "near you" is weaker than "in your area" or "in your patch" — the latter is specific (feels like the data already knows your location). All 4 fixed. **FIXED.**

### CRITIC: Are the WeeklySignalsPage and PricingPage fixes clearer in <3 seconds? YES — arrows on navigation CTAs signal direction instantly.
### REVENUE: Does adding → to the paid CTA on WeeklySignalsPage increase likelihood of paying £39/month? YES — it makes the paid option visually as actionable as the free option in the final close-out section.

---

## Carryover Blockers (unchanged)

- **Founder decision — add-on service pricing**: 14 add-on services still have no £ shown
- **Stripe live test**: blocked on test keys in Vercel
- **TradeFlow "Send to TradeFlow" button**: blocked on URL scheme from founder
- **n8n workflow 16 (LLM Brief Builder)**: blocked on SMTP creds + manual activation

---

## Next Run Priorities

1. **Add-on service pricing copy** — 14 services show no price; still blocked on founder decision. If founder decides, add "from £X" or "priced per job" labels to each service card in ProductAdvantagePage.
2. **`near you` is now FULLY SWEPT** — do not re-check in next run. All instances resolved across CTAs and howItWorks narratives.
3. **`platform` in user-facing copy is now FULLY SWEPT** — only remaining instances are JavaScript variable names/property keys (not rendered text). Do not re-check.
4. **Carryover blockers remain the main unlock** — Stripe keys, TradeFlow URL scheme, n8n SMTP creds. No buildable work available until one unlocks.
