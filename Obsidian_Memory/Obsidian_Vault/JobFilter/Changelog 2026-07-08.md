# Changelog 2026-07-08 (NightlyBuildAgent — Run 1)

## Build Status
- **Build**: GREEN (113 pages)
- **TypeScript**: CLEAN
- **Founder activity**: No new commits or open PRs since Jul 7 Run 3. All carryover blockers unchanged.

## Changes Made

### 1. WeeklySignalsPage.tsx — Yellow-on-yellow button bug fixed (section 7)
- **Bug**: Section 7 (`bg-[var(--yellow)]`) had "LOCK YOUR PATCH — £39/MO" button with `bg-[var(--yellow)]` — invisible on yellow background.
- **Fix**: Changed to `bg-[var(--navy)] text-white`. Changed "GET WEEKLY EMAILS →" from navy to `bg-white text-[var(--ink)]` to distinguish.
- **Result**: 3-way readable hierarchy on yellow background: ink (primary RUN MY FREE SCAN) > navy (upgrade LOCK YOUR PATCH) > white (GET WEEKLY EMAILS).

### 2. WeeklySignalsPage.tsx — Subscribe modal previewText copy
- **Before**: "This week: X planning applications across the UK. X GOLD leads. See what matches your trade."
- **After**: "This week: X planning applications across the UK. X GOLD leads scored and ready. Don't be last to find out."
- **Reason**: Added fear/urgency to the modal intro. "See what matches your trade" is passive; "Don't be last to find out" names the real consequence of not subscribing.

### 3. TradePage.tsx — Pricing section CTA jargon + price contradiction (affects all 21 trade pages)
- **Founding 30 card CTA**: "GET FOUNDING 30" → "LOCK YOUR PATCH — £39/MO →"
  - "GET FOUNDING 30" is internal jargon. "LOCK YOUR PATCH — £39/MO →" is the consistent CTA used on all other pages.
- **Standard tier card CTA**: "LOCK YOUR PATCH — £39/MO →" → "SEE ALL PLANS →"
  - Standard tier is £79/mo. Having a "LOCK YOUR PATCH — £39/MO →" CTA on a £79/mo card is a price contradiction — a tradesman comparing sees the wrong price on the button.

## Commit
- `f7f3b4e` — [NightlyBuildAgent] fix yellow-on-yellow button + TradePage CTA jargon + modal copy

## Carryover Blockers (unchanged)
- [ ] **Founder decision — add-on service pricing**: 14 add-on services still have no £ shown
- [ ] **Stripe live test** — still blocked on test keys in Vercel
- [ ] TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- [ ] n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation
- [ ] **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`'s local Express dev path
