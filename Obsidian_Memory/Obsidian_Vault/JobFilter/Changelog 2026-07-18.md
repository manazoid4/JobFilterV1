# Changelog — 18 July 2026 (NightlyBuildAgent)

**Commit:** `4e27448`
**Build:** GREEN (113 pages)
**TypeScript:** CLEAN

---

## Phase 1 — Build Check
- Fresh container; npm install (Next.js stack)
- Build GREEN immediately after install
- No broken imports, no fake flows
- No new founder commits or open PRs since Jul 17 Run 2

## Phase 2 — Tier 1 Features
- All Tier 1 features confirmed BUILT from prior runs
- No new feature needed this run

## Phase 3 — Copy Polish

### ForgotPasswordPage — heading caps + arrow CTAs
- h1 "Reset password" → "RESET PASSWORD" (all-caps design system)
- Done state h1 "Check your email" → "CHECK YOUR EMAIL"
- Button "SEND RESET LINK" → "SEND RESET LINK →" (missing arrow)
- Done state "BACK TO SIGN IN" → "BACK TO SIGN IN →" (missing arrow)

### ActivationPendingPage — font-bold sweep + copy + arrows
- Success state body paragraph `font-black` → `font-bold` (multi-sentence)
- Main hero body paragraph `font-black` → `font-bold` (both paid and free paths)
- Footer note `font-black` → `font-bold`
- Submit button "CONFIRM MY SETUP" / "SAVE PATCH AND CHECKOUT" → added → arrow
- Free-path body copy rewritten: fear→proof→control applied
  - Old: "Set your trade and patch — then complete payment via Stripe. Takes under 2 minutes. 30-day money-back. Cancel anytime."
  - New: "Tell us your trade and patch. Gold leads go straight to your WhatsApp. 30-day money-back — if you don't find a job worth chasing, we refund every penny."

## Phase 4 — NEEDLE / BUILDER / CRITIC / REVENUE

**NEEDLE sweep** — WeeklySignalsPage bottom CTA (Section 7):

Issue found: Bottom CTA section (`bg-[var(--yellow)]`) had free scan as ink/primary and paid CTA as navy/secondary. Users who scrolled to the bottom of the signals page had already seen the data — at that scroll depth, the paid action should lead.

**BUILDER** — CTA hierarchy swapped in Section 7:
- "LOCK YOUR PATCH — £39/MO →" changed `bg-[var(--navy)]` → `bg-[var(--ink)]` (now primary)
- "RUN MY FREE SCAN →" changed `bg-[var(--ink)]` → `bg-[var(--navy)]` (now secondary)
- Order also swapped: paid CTA appears first

**CRITIC:** YES — paid CTA is now highest-contrast option on yellow; reads as primary in <3 seconds

**REVENUE:** YES — WeeklySignalsPage is a data-first signal page; users at the bottom have already seen the signals and decided it's useful. Ink on yellow is the strongest visual choice. Making paid CTA primary here directly targets the already-warmed conversion moment.

---

## Carryover Blockers (unchanged)
- Founder decision: 14 add-on services still have no £ shown
- Stripe live test: blocked on test keys in Vercel
- TradeFlow button: blocked on URL scheme from founder
- n8n workflow 16: blocked on SMTP creds + manual activation

## Next Run Priorities
1. Check founder commits/PRs first
2. WeeklySignalsPage hero section: hero CTAs are `bg-[var(--yellow)]` (free) + `bg-white` (alerts) + `bg-white` (share) — consider whether hero paid CTA is needed there too, or leave hero as free-first entry point (deliberate two-stage approach: hero = free → bottom = paid)
3. Consider NEEDLE sweep on ResetPasswordPage (the actual password-reset form after clicking the email link) — likely has same heading/arrow issues as ForgotPasswordPage
4. Carryover blockers remain the main unlock
