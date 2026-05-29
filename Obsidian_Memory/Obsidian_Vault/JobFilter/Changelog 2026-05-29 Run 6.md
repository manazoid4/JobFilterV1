# Changelog 2026-05-29 Run 6 — NightlyBuildAgent

**Commit:** `04aa949`
**Branch:** main
**Build:** GREEN (95 pages) | TypeScript: CLEAN

---

## Pre-Flight

- `npm install` required (fresh container — no node_modules)
- `npm run build` → GREEN (95 pages, all compiled)
- `npx tsc --noEmit` → CLEAN
- All 5 listed Tier 1 features verified BUILT (scan counter, ICS export, leaderboard, WA templates, trade scoring)

---

## Phase 2 — ActivationPendingPage Two-State Visual Split

### `src/pages/ActivationPendingPage.tsx`

**Problem:** paid=0 and paid=1 states had identical yellow hero backgrounds. A tradesman who just paid (paid=1) and one who hasn't (paid=0) saw the same visual — no immediate signal about their context.

**Fix — paid=0 (pre-payment):**
- Hero background: yellow → `bg-[var(--ink)]` (dark, urgency)
- Micro-label: `text-[var(--ink)]` → `text-[var(--yellow)]`
- H1: white text, new copy: "ONE STEP FROM YOUR FIRST LEAD."
- Body: white/80, copy: "Set your trade and patch. Then checkout — under 2 minutes."
- Form h2: "Set up below. Pay in under 2 minutes."

**Fix — paid=1 (post-Stripe):**
- Hero stays yellow (celebration/confirmed)
- Micro-label: "PAYMENT RECEIVED" → "PAYMENT CONFIRMED"
- H1: "TERRITORY ACTIVATION PENDING." → "SET YOUR PATCH. LIVE IN 2 HOURS."
- Body: "Payment confirmed by Stripe. Gold leads hit your WhatsApp within 2 hours."
- Form h2: "4 details — then you're live."

**Fix — done screen:**
- Micro-label: "SETUP RECEIVED" → "PATCH CONFIRMED"
- Body: "Patch confirmed. Gold leads will hit your WhatsApp within 2 hours. Run your first free scan while you wait."

**CRITIC:** Clearer in <3 seconds? YES — dark vs yellow immediately signals pre-payment vs confirmed.
**REVENUE:** YES — paid user feels confident; pre-paid user feels urgency toward checkout.

---

## Phase 3a — DashboardPage Copy Polish

### `src/pages/DashboardPage.tsx`

Three surgical copy improvements:

1. **SCAN card subtitle** (Pipeline Visual): "Find jobs worth pricing" → "Before Checkatrade lists them" — names the competitor at the most visible scan entry point.

2. **Empty state body**: "Run a scan, find one £2,000 job, and your Patch Plan pays for itself in a single win. Founding rate locks in at £39/mo." → "Find a job before Checkatrade lists it. One £2,000 win and the Patch Plan pays for itself — founding rate £39/mo, no shared auction." — adds competitor + no-auction promise.

3. **Scan limit upgrade CTA**: When `scansUsed >= 3`, now shows inline `RowLink` "Scan limit reached" → "Upgrade for unlimited →" /pricing. Previously only the row value changed text with no immediate action link.

---

## Phase 3b — LeadDetailPage WHY THIS LEAD Copy Polish

### `src/pages/LeadDetailPage.tsx`

All three tier blocks rewritten with fear → proof → control structure:

**GOLD** (was): "GOLD — first-mover window open. Most trades won't see this for 24–48h."
**GOLD** (now): "GOLD — first-mover window open. Most trades won't see this for 24–48h. Send a WhatsApp now — five minutes costs nothing. Losing the job to someone faster costs everything." + SEND WHATSAPP NOW → button

**SILVER** (was): "SILVER — worth watching. Job signal is verified but timing or budget not confirmed. Worth a quick call, not a full chase yet."
**SILVER** (now): "SILVER — timing not confirmed yet. Signal is verified. A 2-minute call finds out if they're ready now. Use the availability check template below — takes 30 seconds."

**BRONZE** (was): "BRONZE — check timing. Signal detected but work may not start immediately. Verify before spending time chasing."
**BRONZE** (now): "BRONZE — real signal, not urgent. Work may not start for weeks. Add to your quiet-week list. Don't spend chase time here yet — revisit when pipeline is low."

---

## Phase 4 — Site Health: Fix Chase Lead Detail 404

**NEEDLE finding:** Tradesman tracks a lead from FindJobsPage → clicks VIEW → on dashboard overdue section → sees "LEAD NOT FOUND". Root cause: `importLeadToChase()` only saves to chase store (`ChaseLead[]`), but `LeadDetailPage` reads from lead store (`LeadDecision[]`), which is only populated by IntakePage.

### `src/pages/FindJobsPage.tsx`

**Fix:** `trackLead()` now also calls `saveStoredLead()` with a minimal `LeadDecision` mapped from the `Lead` object:
- Added `LeadDecision` to types import
- Added `saveStoredLead` import from `../lib/leadStore`
- Maps `lead.urgency` ('high'/'medium'/'low' → 'Emergency'/'This week'/'Later')
- Preserves `score`, `jobType`, `postcode`, `area`, `qualityLabel`, `recommendedAction`, `signalStack`, `signalClass`, `quoteFloor`, `evidenceBadges`
- Does not duplicate (existing `trackedLeads.has()` guard prevents double-save)

**CRITIC:** Clearer in <3 seconds? YES — VIEW → now shows lead detail instead of error page.
**REVENUE:** YES — removes friction for users who've tracked leads; builds trust in the pipeline flow.

---

## Metrics

- Files changed: 4 source files
- Lines: 51 insertions, 17 deletions (surgical)
- Build time: GREEN (8.8s)
- TS errors: 0
- Pages: 95

---

## Next Run Priorities

1. **Stripe live test** — wire end-to-end with test key (4242 4242 4242 4242), confirm `/dashboard?welcome=1` lands and `profiles.plan` updates in Supabase
2. **Commercial lead detection UX** — Tier 2 (score 3.25): commercial badge + filter are built, but the scoring logic needs review — do commercial leads consistently score higher than residential for trades that want them?
3. **WhatsApp delivery hardening** — `sms.ts` still has stub success path; real delivery needs Twilio response check (`status: 'queued'|'sent'|'failed'`) before production launch
