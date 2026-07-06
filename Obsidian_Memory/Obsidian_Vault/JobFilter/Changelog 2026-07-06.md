# Changelog 2026-07-06

**NightlyBuildAgent — Run 1**
Commit: `3469ab3`

---

## Container State
- Fresh container. npm install complete. Build GREEN (113 pages), TS CLEAN before and after changes.
- HEAD rebased over origin/main (`b9cb04a`, Run 3 vault commit from Jul 5). No new founder commits or PRs since Jul 5 Run 3.

## Founder Activity
- Zero new founder commits or PRs since Jul 5 Run 3. All carryover blockers unchanged.

## Phase 1 — No Broken Flows
- Re-confirmed: no fake form submissions, no broken imports. Clean build.
- All setSubmitted/setSent/setDone sites verified wired to real fetch()/Supabase calls.

## Phase 2 — Tier 1 Features
All Tier 1 features confirmed built. No new features to build this run.

## Changes Made

### ActivationPendingPage.tsx — TRADES list expanded 11 → 19

The TRADES select on ActivationPendingPage had 11 options while SignupPage was expanded to 19 trades in Jul 5 Run 3. A Solar PV installer or Fire Safety engineer who signed up correctly would see no matching option in the activation form — they'd have to pick a wrong category or leave the field blank.

Added 8 trades (same set as SignupPage, in alphabetical order):
- CCTV / security installer → 'electrical'
- Data cabling engineer → 'electrical'
- Fire safety engineer → 'electrical'
- Groundworker → 'landscaping' (split from "Landscaper / groundworks")
- Quantity surveyor → 'building'
- Scaffolder → 'building'
- Solar PV installer → 'electrical'
- Structural engineer → 'building'

List now matches SignupPage exactly (19 trades, alphabetical, same engine value mappings).

### TrustCenterPage.tsx — GOLD tier card color corrected

GOLD card used `bg-[var(--green)] text-white`. Per design system, green is reserved for data indicators (live pulses, status dots, WON badges) — not section/card backgrounds. GOLD is the highest-value tier and should read as premium.

Changed to `bg-[var(--ink)] text-[var(--yellow)]`. Ink+yellow = premium/primary per the design system. The existing `ring-4 ring-[var(--yellow)] ring-offset-2` on GOLD stays, creating a yellow-framed black card. Visually distinct from SILVER (yellow background) and BRONZE (orange background).

### TerritoriesPage.tsx — patch-check SLA made specific

Form success message after submitting a patch-check was:
"Patch request saved. We will check coverage before activation and reply with the next step."

Changed to:
"Patch request saved. We'll check coverage and reply within 24 hours with the next step."

"Within 24 hours" is a concrete commitment that builds trust vs vague "we'll reply". This was a carryover todo item from Jun 16 Run 3 that was never closed.

### AdminGuardTeaserPage.tsx — two design token fixes

1. **Feature card shadow drift**: `shadow-[3px_3px_0_var(--yellow)]` → `shadow-[4px_4px_0_var(--line)]`. The standard is 4px offset with the --line token. This had drifted back after being fixed on Jul 2 Run 2 (likely reverted by a founder commit between Jul 2 and Jul 5).

2. **"YOUR DASHBOARD →" secondary button**: `bg-white text-[var(--ink)]` → `bg-[var(--navy)] text-white`. On a yellow section background, white-on-yellow has contrast but reads ambiguously. Navy is the design system's secondary action colour, making the primary/secondary hierarchy explicit. "SEE PRICING →" (ink-on-yellow = primary) stays unchanged.

## Site Health — NEEDLE/BUILDER/CRITIC/REVENUE
- **NEEDLE**: Top issues found: (1) ActivationPendingPage trade list mismatch vs SignupPage — direct signup friction for 8 trade types; (2) TrustCenterPage GOLD card using green (data indicator token) for a premium section; (3) AdminGuardTeaserPage shadow drift recurring after Jul 2 fix.
- **BUILDER**: All three fixed this run + TerritoriesPage SLA.
- **CRITIC**: Clearer in <3s? YES for all. TRADES fix — the correct trade is immediately findable. GOLD card — ink+yellow reads as premium, not "data OK". TerritoriesPage — "24 hours" is instantly scannable. Admin Guard — navy secondary is visibly different from ink primary.
- **REVENUE**: YES — ActivationPendingPage trade fix reduces activation friction for niche trades (Solar PV, Fire Safety, Structural Engineer) who are the same users most likely to convert (specific trade = specific need = more motivated). TrustCenterPage GOLD card fix strengthens the signal quality explanation on the trust page.

## Build Status
- Build GREEN (113 pages), TypeScript CLEAN. Pushed to main (`3469ab3`).

## Carryover Blockers (unchanged)
- Founder decision — add-on service pricing: 14 add-on services still have no £ shown
- Stripe live test — still blocked on test keys in Vercel
- TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Next Run Recommendations
1. **Check for new founder commits/PRs first** — buildable backlog is genuinely small.
2. **AlertSetupWidget trade display labels** — currently shows raw engine categories (ELECTRICAL, PLUMBING etc.) in the alert setup dropdown. Could be improved to show friendly labels matching the site's 19-trade system. Low priority.
3. **AdminGuardTeaserPage shadow drift** — recurring; may indicate a founder commit is periodically reverting this file. Worth noting in next run if it happens again.
4. **Carryover blockers remain the main unlock** — Stripe keys, add-on pricing decision, TradeFlow URL scheme.
