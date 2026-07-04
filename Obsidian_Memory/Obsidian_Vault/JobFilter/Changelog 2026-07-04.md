# Changelog 2026-07-04

**NightlyBuildAgent — Run 1**
Commit: `43ebe7c`

---

## Container State
- npm install (359 packages, node_modules missing in fresh container).
- Build GREEN (113 pages), TS CLEAN before and after changes.
- Detached HEAD resolved post-commit via `git checkout -B main 43ebe7c`.

## Founder Activity
- No new founder commits since Run 3 July 3 (26eed2d).
- No open PRs.

## Phase 1 — No Broken Flows
- Re-confirmed: no fake form submissions. No broken imports. Clean build.

## Phase 2 — No Unbuilt Tier 1 Features
- All Tier 1 features confirmed built (same as every recent run — agent prompt list remains stale).

## Changes Made

### FindJobsPage.tsx — SCAN NOW button: navy → yellow
Design rule: yellow = primary CTA. SCAN NOW is the primary form-submit on the free scan
page — the core entry point of the free→paid funnel. It was `bg-[var(--navy)]`, reading
visually as a secondary action. Changed to `bg-[var(--yellow)] text-[var(--ink)]`.
NEEDLE finding #2 — highest daily-traffic impact.

### FindJobsPage.tsx — SEND TO WHATSAPP on Gold leads: green → yellow
Design rule: no green on buttons; yellow = primary CTA. The SEND TO WHATSAPP button on
Gold lead cards (score >= 80) used `bg-[var(--green)]` — WhatsApp brand color, but
explicitly excluded from the design system button palette. This is the primary action on
the highest-value lead cards for paying subscribers. Changed to `bg-[var(--yellow)]
text-[var(--ink)]`. Non-Gold version stays navy (secondary weight, correct).
NEEDLE finding #3.

### PricingPage.tsx — LOCK FOUNDER PRICE checkout button: black → yellow
Design rule: yellow = primary CTA. The featured Founder plan checkout button used
`bg-[var(--ink)]` (black/dark). This is the single most important conversion button on
the site. Users who scroll past the hero to read plan bullets land on a button that reads
as a secondary action. Changed to `bg-[var(--yellow)] text-[var(--ink)]`.
NEEDLE finding #1.

### ForYourTradePage.tsx — Solar PV competitor naming fix
Copy rule: name competitors explicitly. Solar PV signals copy said "3–5 days before any
installer on MyBuilder sees them" — only one competitor named. Changed to "3–5 days before
Bark or MyBuilder lists them" — consistent with all 17 other trades. This was the last
vague competitor reference on ForYourTradePage flagged in Run 3 July 3.

## Site Health — NEEDLE/BUILDER/CRITIC/REVENUE
- **NEEDLE**: Three CTA color violations found (SCAN NOW navy, LOCK FOUNDER PRICE black,
  SEND TO WHATSAPP green). Plus Solar PV missing second competitor name.
- **BUILDER**: All four issues fixed in this run.
- **CRITIC**: Clearer in <3s? YES — SCAN NOW now reads unmistakably as the primary action;
  LOCK FOUNDER PRICE now draws the eye as a primary checkout button.
- **REVENUE**: YES — SCAN NOW is the entry point for every new user; fixing its color
  increases first scan completion rate. LOCK FOUNDER PRICE is the £39/mo checkout trigger.

## Build Status
- Build GREEN (113 pages), TypeScript CLEAN. Pushed to main (`43ebe7c`).

## Carryover Blockers (unchanged)
- Founder decision — add-on service pricing: 14 add-on services still have no £ shown
- Stripe live test — still blocked on test keys in Vercel
- TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Next Run Recommendations
1. **Check for new founder commits/PRs first** — buildable backlog remains small.
2. **DashboardPage green WhatsApp buttons** (lines 416, 471): "SEND NUDGE →" and "SEND ON
   WHATSAPP →" also use bg-green. Same design rule violation class as tonight's fix.
   Low urgency (authenticated-only pages, smaller traffic) but consistent to fix.
3. **LeadListPage:308** "OPEN WHATSAPP CHAT" also bg-green — same class.
4. **Buildable backlog remains slim** — NEEDLE sweeps are still finding real issues (3 tonight)
   but each run finds fewer. Carryover blockers are the main unlock for new work.
