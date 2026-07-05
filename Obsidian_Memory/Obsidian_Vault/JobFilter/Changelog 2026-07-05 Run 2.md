# Changelog 2026-07-05 Run 2

**NightlyBuildAgent — Run 2**
Commit: `58ed975`

---

## Container State
- npm install already complete from Run 1. Build GREEN (113 pages), TS CLEAN before and after changes.
- HEAD rebased over auto-digest `67e4a2d` (vault bot commit), no conflicts.

## Founder Activity
- Zero new founder commits or PRs since Run 1 today. All carryover blockers unchanged.

## Phase 1 — No Broken Flows
- Re-confirmed: no fake form submissions. No broken imports. Clean build.

## Phase 2 — Tier 1 Features

All Tier 1 features confirmed built. No new features to build.

**WeeklySignalsPage subscription modal trade list expanded (8 → 20 trades)**

This was the explicit next-run recommendation from Run 1. The subscription modal's
"YOUR TRADE (OPTIONAL)" select only showed 8 trades: Builder, Electrician, Plumber,
Roofer, HVAC, Landscaper, Carpenter, Painter.

Site now covers 20 trades (ForYourTradePage + signup flow). A Gas Engineer, Solar PV
installer, or CCTV fitter opening the weekly signals modal would see no matching option
and either pick "All trades" or not subscribe. Expanded to 20 options sorted alphabetically:
Builder, Carpenter, CCTV/Security, Data Cabling, Decorating, Electrician, EV Charger,
Fire Safety, Gas Engineer, Groundworks, Heat Pumps, HVAC, Landscaper, Painter, Plumber,
Quantity Surveyor, Roofer, Scaffolding, Solar PV, Structural Engineer.

## Changes Made

### WeeklySignalsPage.tsx — subscription modal trade list 8 → 20
Lines 226–234 previously: Builder, Electrician, Plumber, Roofer, HVAC, Landscaper,
Carpenter, Painter (8 options, unsorted).
Now: 20 options, alphabetically sorted. Added CCTV/Security, Data Cabling, Decorating,
EV Charger, Fire Safety, Gas Engineer, Groundworks, Heat Pumps, Quantity Surveyor,
Scaffolding, Solar PV, Structural Engineer.

### FindJobsPage.tsx — postcode placeholder clarified
`placeholder="B14 7QH"` → `placeholder="e.g. B14 7QH"`. The word "e.g." makes clear
this is an example hint, not a pre-filled default. Visitors no longer need to back-delete
a confusing placeholder value.

### SignupPage.tsx — hero copy fixed + post-signup CTA regression fixed
**Hero copy:** "Confirm your email — then add your trade, area, and WhatsApp number."
was misleading — those fields are right there on the form below, so "then add" implied
they come after email confirmation. Rewritten to: "Fill in your details below. Confirm
your email. Gold leads for your trade and patch start coming through from day one."
Honest, sequential, specific.

**Post-signup CTA regression:** After status='sent', the CTA was "BACK TO PRICING"
(→ /pricing). This was fixed in July 3 Run 2 and regressed in a later commit. Fixed
again: "BROWSE LIVE LEADS →" (→ /find-jobs). A user who just signed up has no reason
to go back to the pricing page — they're already committed. Sending them forward to
live leads keeps them engaged while waiting for the confirmation email.

### CompareBarkPage.tsx — bottom CTA copy rewritten (Phase 3 + Phase 4 NEEDLE fix)
Previous headline: "Stop paying per lead. Start scanning smarter." — vague, "scanning
smarter" is generic SaaS language.
New headline: "Stop buying the same lead five other trades already got." — specific,
visceral, fear-based (fear of losing out to 5 competitors).

Previous sub-copy: "See real UK construction leads scored by intent — not shared
form-fillers competing with four other trades." — decent but vague about sources
and timing.
New sub-copy: "JobFilter reads planning approvals, council contracts, and energy
signals — 3–5 days before Bark, MyBuilder, or Checkatrade list the same job. £39/month
flat. No credits. No auctions." — names 3 competitors explicitly, cites timing
advantage, names sources, anchors price.

Structure: fear (same lead, five trades) → proof (planning/contracts/signals, 3–5 days
before named competitors) → control (£39/month flat, no credits, no auctions).

## Site Health — NEEDLE/BUILDER/CRITIC/REVENUE
- **NEEDLE**: Top 3 issues found: (1) WeeklySignals subscription modal missing 12 trades
  (site covers 20, modal had 8); (2) SignupPage post-signup CTA "BACK TO PRICING" was a
  regression — user just committed, sending to pricing is a regret signal; (3) CompareBarkPage
  bottom CTA used vague "scanning smarter" language with no competitor names or proof.
- **BUILDER**: All 3 fixed. CompareBarkPage fix is the highest-impact single change
  (comparison shoppers are highest-intent visitors; copy at the conversion point matters most).
- **CRITIC**: Clearer in <3s? YES — CompareBarkPage bottom section now has an immediately
  scannable fear/proof/control structure with named competitors.
- **REVENUE**: YES — comparison page visitors are actively choosing between Bark and
  JobFilter; naming Bark/MyBuilder/Checkatrade and anchoring to "3–5 days before" timing
  and £39 flat price directly increases likelihood of converting.

## Build Status
- Build GREEN (113 pages), TypeScript CLEAN. Pushed to main (`58ed975`).

## Carryover Blockers (unchanged)
- Founder decision — add-on service pricing: 14 add-on services still have no £ shown
- Stripe live test — still blocked on test keys in Vercel
- TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Next Run Recommendations
1. **Check for new founder commits/PRs first** — buildable backlog remains small.
2. **SignupPage TRADES list** — only 11 trade options at signup (vs 20 on site). Trades
   like Solar PV installer, Fire Safety, Structural Engineer see no matching option. Expanding
   requires adding new score categories to lead engine — multi-file, not a single-run task.
   Worth scoping for a future run.
3. **CompareBuildAlert/CompareMyBuilder/CompareCheckatrade pages** — same bottom CTA
   pattern may benefit from the same fear→proof→control rewrite. Quick copy sweep.
4. **Carryover blockers remain the main unlock** — Stripe keys, add-on pricing decision,
   TradeFlow URL scheme.
