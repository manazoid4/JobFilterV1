# Changelog 2026-07-03

**NightlyBuildAgent — Run 1**
Commit: `c2221f2`

---

## Container State
- Fresh container, `npm install` (359 packages); HEAD detached — stale local `origin/main` cached at `d0de3f3` (June 28). `git fetch origin main` revealed real `origin/main` at `7407b8d` (July 2). Reset to correct head. Build GREEN (113 pages), TS CLEAN before and after changes.

## Founder Activity
- Zero new founder commits or PRs since July 2 (Run 3). All carryover blockers unchanged (Stripe keys, SMTP, TradeFlow URL scheme, add-on pricing).

## Phase 1 — No Broken Flows
- Re-confirmed: no fake form submissions. All setDone/setSubmitted/setSent/setEmailDone sites wired to real fetch()/Supabase calls. No broken imports. Build clean.

## Phase 2 — No Unbuilt Tier 1 Features
- Confirmed all 5 Tier 1 features (scan counter, ICS export, WinStatsBanner, WhatsApp templates, trade-specific scoring) remain fully built. Agent prompt list is stale.

## Changes Made

### FindJobsPage.tsx — WHY? score-reasons panel widened
- `w-24` → `w-36` and `text-[8px]` → `text-[9px]`
- Per prior run's recommendation: panel was too cramped to read on mobile. Wider box and slightly larger font makes scoring reasons legible without breaking brutalist square-box style.

### BuildUkAlternativePage.tsx — CTA color inversion fixed
- Comparison section (offwhite background) had yellow on "SEE PRICING" and ink on "SCAN YOUR AREA FREE" — inverted from the design rule (yellow = primary CTA).
- Fixed: yellow now marks "SCAN YOUR AREA FREE" (primary, zero-risk), ink marks "SEE PRICING" (secondary).
- Hero (yellow bg) and final CTA (navy bg) were already correct; only the mid-page comparison section was wrong.

## Site Health — NEEDLE/CRITIC/REVENUE
- NEEDLE: WHY? panel cramped on mobile (confirmed), CTA inversion on BuildUk page (found this run)
- BUILDER: Both fixed
- CRITIC: WHY? panel — clearer in <3s? YES. CTA order — clearer in <3s? YES (tradesman sees yellow = "try it free", dark = "pricing talk")
- REVENUE: Both fixes reduce friction at decision points → YES

## Build Status
- Build GREEN, TypeScript CLEAN. Pushed to main (`c2221f2`).

## Carryover Blockers (unchanged)
- Founder decision — add-on service pricing: 14 add-on services still have no £ shown
- Stripe live test — still blocked on test keys in Vercel
- TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Next Run Recommendations
1. **Check for new founder commits/PRs first** — buildable backlog remains small; founder activity is the primary unlock.
2. **AlertSetupWidget live smoke test** — the error-message fix from July 2 Run 3 is confirmed in code but has never been live-tested (no env vars in container). Worth verifying once Stripe/Supabase staging is accessible.
3. **WHY? panel in LeadListPage** — check if `tradeHighlights()` badges in LeadListPage:285 also need more width; different component but same concept.
