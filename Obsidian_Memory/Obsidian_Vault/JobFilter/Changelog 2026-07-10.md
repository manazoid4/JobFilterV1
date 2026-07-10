# Changelog 2026-07-10 (NightlyBuildAgent)

## Build Status
- **Build**: GREEN (113 pages)
- **TypeScript**: CLEAN
- **Founder activity**: None since vault auto-digest 2026-07-09 10:47 UTC. No open PRs.

## Changes Made

### 1. MethodologyPage.tsx — Yellow-bg primary CTA color fixed
- **Before**: `bg-[var(--navy)] text-white` on a yellow (`bg-[var(--yellow)]`) section background
- **After**: `bg-[var(--ink)] text-white`
- **Reason**: On a yellow background, ink (black) is the established primary button color — maximum contrast, consistent with WeeklySignalsPage fix (Jul 5 Run 1) and Jul 8 Run 1. Navy on yellow is readable but not the design-system primary. Affects the "SEE IT IN ACTION" CTA section.

### 2. TradePage.tsx — Bottom CTA stale copy fixed (all 15+ trade pages)
- **Before**: `GET FOUNDING 30 — £39/mo` (white button, bottom CTA)
- **After**: `LOCK YOUR PATCH — £39/MO →` + added → arrow
- **Reason**: "FOUNDING 30" as a button label in the bottom CTA is orphaned jargon — the plan name appears on the Pricing page, not here. "LOCK YOUR PATCH" is the standard for all bottom CTAs and has been swept everywhere else. "/mo" lowercase → "/MO" uppercase for consistency.

### 3. BuildUkAlternativePage.tsx — Bottom CTA fixed (2 instances)
- **Before**: "SCAN MY AREA FREE" (missing →) + "GET FOUNDING 30 — £39/mo" (stale copy)
- **After**: "SCAN MY AREA FREE →" + "LOCK YOUR PATCH — £39/MO →"
- **Reason**: Missing arrow on scan CTA is inconsistent with the rest of the site. Bottom-CTA FOUNDING 30 fix same as TradePage.

### 4. CompareCheckatradePage.tsx — Bottom CTAs fixed (3 instances)
- **Before**: Mid-page: `GET FOUNDING 30 — £39/mo` (yellow button); Bottom: "SCAN MY AREA FREE" (missing →) + "GET FOUNDING 30 — £39/mo" (white button)
- **After**: Mid-page: `LOCK YOUR PATCH — £39/MO →`; Bottom: "SCAN MY AREA FREE →" + "LOCK YOUR PATCH — £39/MO →"
- **Reason**: Same FOUNDING 30 sweep + missing arrow fix.

### 5. CompareBuildAlertPage.tsx — Bottom CTA fixed
- **Before**: `GET FOUNDING 30 — £39/mo` (white button, bottom CTA)
- **After**: `LOCK YOUR PATCH — £39/MO →`
- **Reason**: Same FOUNDING 30 sweep.

### 6. NewsPage.tsx — Missing arrow added
- **Before**: "LOCK YOUR PATCH — £39/MO" (no arrow)
- **After**: "LOCK YOUR PATCH — £39/MO →"
- **Reason**: Every other pricing CTA on the site has the → arrow. Missing here was inconsistent.

## Commit
- `9624bd5` — [NightlyBuildAgent] sweep FOUNDING 30 CTAs + fix yellow-bg button color

## Carryover Blockers (unchanged)
- [ ] **Founder decision — add-on service pricing**: 14 add-on services still have no £ shown
- [ ] **Stripe live test** — still blocked on test keys in Vercel
- [ ] TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- [ ] n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation
- [ ] **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path
