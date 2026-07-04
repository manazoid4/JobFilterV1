# Changelog 2026-07-04 Run 2

**NightlyBuildAgent — Run 2**
Commit: `d7409c2`

---

## Container State
- npm install (359 packages, node_modules missing in fresh container).
- Build GREEN (113 pages), TS CLEAN before and after changes.
- HEAD synced to origin/main post PR #292 merge.

## Founder Activity
- PR #292 "[4-agent] fix mobile nav pricing gap + desktop claim-patch visibility + signals hero" merged since Run 1 today (14ccd01).
  - TopNav: Claim Patch now slot 3 on desktop (visible without More dropdown). Mobile nav: /pricing restored, /territories removed from scroll list (it's in the mini-grid). SCAN FREE → "SCAN FREE — NO CARD NEEDED".
  - SignalsPage: hero headline cut from 12 words to 4 ("JOBS BEFORE THEY GET POSTED."). Sub-copy tightened. Section-2 heading → "PICK YOUR TRADE. SEE WHAT APPLIES TO YOU."
  - Both changes sound. No regressions.
- No open PRs after #292.

## Phase 1 — No Broken Flows
- Re-confirmed: no fake form submissions. No broken imports. Clean build.

## Phase 2 — No Unbuilt Tier 1 Features
- All Tier 1 features confirmed built (same as every recent run).

## Changes Made

### DashboardPage.tsx — SEND NUDGE + SEND ON WHATSAPP: green → yellow
Design rule: green = data indicators only, NOT button CTAs. Two buttons were
bg-[var(--green)]:
- Line 416: "SEND NUDGE →" / "SEND VIA WHATSAPP →" on the lead-chasing section
- Line 471: "SEND ON WHATSAPP →" on the wins/review request section
Both are primary actions for authenticated users. Changed to bg-[var(--yellow)]
text-[var(--ink)]. Recommended by Run 1 today.

### LeadListPage.tsx — OPEN WHATSAPP CHAT: green → yellow
Design rule: same as above. Line 308 "OPEN WHATSAPP CHAT" (also used for WhatsApp
chase template buttons) was bg-[var(--green)] on tracked lead cards. Primary action.
Changed to bg-[var(--yellow)] text-[var(--ink)]. Recommended by Run 1 today.

### TrustCenterPage.tsx — CTA priority inversion fixed
NEEDLE finding: "SEE PRICING →" was bg-[var(--yellow)] (primary) and "SCAN MY AREA
FREE →" was bg-[var(--navy)] (secondary) — inverted. Yellow = primary CTA; scan free
is always the primary action for unauthenticated users on trust/proof pages.
Swapped: scan free now yellow (primary), see pricing now navy (secondary).
Trust copy "No credit card required — 3 free scans every week" retained below.

## Remaining Green Uses (NOT violations)
- KeywordSearch.tsx:216 — dead code behind SHOW_ADVANCED_TOOLS=false
- AdminGuardPage.tsx:599 — state-feedback: green only after "COPY" action confirmed
- LeadDetailPage.tsx:693 — state-feedback: green only when snoozed
- LeadDetailPage.tsx:701 — state-feedback: green only when email chase sent
- DashboardPage.tsx:121 — data tag badge (not a button)
- DashboardPage.tsx:259 — status dot (not a button)
- DashboardPage.tsx:447 — win card border/bg tint (not a button)
- LeadListPage.tsx:134,137 — won-count stat display (not a button)

## Site Health — NEEDLE/BUILDER/CRITIC/REVENUE
- **NEEDLE**: Three green button violations (DashboardPage ×2, LeadListPage ×1) + one CTA
  priority inversion (TrustCenterPage). All four fixed.
- **BUILDER**: All four issues fixed.
- **CRITIC**: Clearer in <3s? YES — yellow SEND NUDGE/WHATSAPP now reads as primary action;
  TrustCenterPage scan button now draws the eye correctly.
- **REVENUE**: YES — authenticated users hitting the chase/win sections now see clear yellow
  primary actions. TrustCenterPage scan CTA is the entry point for prospects reading proof.

## Build Status
- Build GREEN (113 pages), TypeScript CLEAN. Pushed to main (`d7409c2`).

## Carryover Blockers (unchanged)
- Founder decision — add-on service pricing: 14 add-on services still have no £ shown
- Stripe live test — still blocked on test keys in Vercel
- TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

## Next Run Recommendations
1. **Check for new founder commits/PRs first** — buildable backlog remains small.
2. **Full green sweep confirmed done** — all remaining green instances are state-feedback
   or dead code. Green button violation class is now fully closed.
3. **Copy sweep opportunity** — WeeklySignalsPage, FaqPage, and TrustCenterPage
   body copy not recently audited for fear→proof→control structure.
4. **Carryover blockers remain the main unlock** — Stripe keys, add-on pricing decision,
   TradeFlow URL scheme.
