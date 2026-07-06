# Changelog 2026-07-06 — Run 2

**NightlyBuildAgent — Run 2**
Commit: `62380e3`

---

## Container State
- Fresh container. `npm install` (359 packages). Build GREEN (113 pages), TS CLEAN before and after changes.
- HEAD rebased over origin/main. Significant founder activity today: 13 commits / PRs merged between Run 1 and Run 2 (#314–#326).

## Founder Activity
- **PRs #314–#326 merged today** — heavy conversion-copy sprint by the founder. Covered: HomePage social proof strip, SignalsPage ROI anchors, SmartQuotePage paywall, LeadDetailPage gate copy, FreeToolsPage CTA rename, TopNav breakpoint fix, TerritoriesPage sample labels, BlueprintPage closing section, NewsPage CTAs.
- PR #324 established the guarantee legibility standard: `text-sm` + `80%` opacity, "No quibbles." suffix.

## Phase 1 — No Broken Flows
- Re-confirmed: no fake form submissions, no broken imports. Clean build on PR #326 HEAD.

## Phase 2 — Tier 1 Features
All Tier 1 features confirmed built. No new unbuilt features in scope.

## Changes Made

### Guarantee legibility — 11 pages (systemic fix)

PR #324 (today) fixed the guarantee text on SignalsPage. The same `text-[10px] text-[var(--ink)]/60` pattern existed on 13 more pages — 30-day money-back guarantee at 10px / 60% opacity is below minimum readable size and effectively invisible at every conversion moment.

Pages fixed (full guarantee text to `text-sm / 80%` opacity):
- `WeeklySignalsPage.tsx` — final scan CTA section
- `AdminGuardTeaserPage.tsx` — closing upgrade CTA (ink bg, yellow text)
- `FreeToolsPage.tsx` — wasted cost calculator upgrade CTA
- `ForYourTradePage.tsx` — trade-specific upgrade section
- `TipsPage.tsx` — hero upgrade CTA (ink bg, yellow text)
- `FaqPage.tsx` — hero upgrade CTA (ink bg, yellow text)
- `BuildUkAlternativePage.tsx` — closing CTA (ink bg, yellow text)

Pages fixed (compact paywall context, `text-xs / 80%` opacity):
- `LeadDetailPage.tsx` lines 560 + 622 — "WHAT THIS MEANS" and "AI DRAFT" lock cards
- `LeadDetailPage.tsx` line 788 — "BUYER CONTACT LOCKED" phone-unlock section (dark navy bg)
- `MaterialPriceEnginePage.tsx` — breakdown overlay paywall
- `FindJobsPage.tsx` line 721 — commercial filter gate (dark bg, yellow text)
- `FindJobsPage.tsx` lines 1262 + 1335 — mobile/desktop unlock CTA compact rows

"No quibbles." appended to full-length guarantee instances matching #324 standard.

### AlertSetupWidget friendly trade labels (DashboardPage)

The TRADES array in `AlertSetupWidget` showed raw engine categories as `ELECTRICAL`, `PLUMBING`, `HVAC` etc. A Solar PV installer, Heating Engineer, or Carpenter couldn't identify their trade.

Changed from a flat string array to `{value, label}` pairs. API call still sends engine category value (unchanged); dropdown now shows friendly UK trade labels:
- electrical → Electrician
- plumbing → Plumber / Gas
- roofing → Roofer
- building → Builder / General
- carpentry → Carpenter / Joiner
- painting → Decorator / Painter
- hvac → Heating Engineer
- landscaping → Landscaper

## Site Health — NEEDLE/BUILDER/CRITIC/REVENUE

- **NEEDLE**: Top issue found — invisible guarantee text pattern across 13 pages (after #324 fixed 1/14). AlertSetupWidget raw engine labels (recommended 3+ prior runs).
- **BUILDER**: Both fixed this run.
- **CRITIC**: Clearer in <3s? YES. Guarantee text is now legible at every conversion moment. Trade labels in alerts are immediately recognisable to any UK tradesman.
- **REVENUE**: YES — guarantee is the primary risk-reversal. Making it readable at every paywall and CTA increases conversion confidence. Alert widget fix reduces friction for 8+ trade types who couldn't identify their category.

## Remaining Guarantee Instances (not touched — context notes)
- `FindJobsPage:1262/1335` — FIXED this run (both `text-xs` compact CTA rows)
- All 14 instances now fixed. Guarantee legibility sweep COMPLETE.

## Build Status
- Build GREEN (113 pages), TypeScript CLEAN. Pushed to main (`62380e3`).

## Carryover Blockers (unchanged)
- Founder decision — add-on service pricing: 14 add-on services still have no £ shown
- Stripe live test — still blocked on test keys in Vercel
- TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Next Run Recommendations
1. **Check for new founder commits/PRs first** — founder is clearly active today.
2. **Guarantee sweep is COMPLETE** — all 14 instances now at readable size. Do not re-check this class.
3. **AlertSetupWidget active alerts display** — still shows raw trade value from API (e.g. "electrical · B14 · weekly") in the ACTIVE ALERTS chips. Backend change needed to label these; out of scope for single run.
4. **Carryover blockers remain the main unlock** — Stripe keys, add-on pricing decision, TradeFlow URL scheme.
