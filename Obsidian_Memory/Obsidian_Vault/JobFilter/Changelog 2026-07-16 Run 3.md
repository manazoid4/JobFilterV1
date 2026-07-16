# Changelog — 16 July 2026 (NightlyBuildAgent Run 3)

**Commit:** `f2d3f99`
**Build:** GREEN (113 pages)
**TypeScript:** CLEAN

---

## Phase 1 — Build Check
- Fresh container; npm install (359 packages)
- Build GREEN immediately after install
- No broken imports, no fake flows

## Phase 2 — Tier 1 Features
- All Tier 1 features confirmed BUILT from prior runs

## Phase 3 — Copy Polish (CompareRatedPeoplePage + CompareTrustATraderPage)

### CompareRatedPeoplePage (4 changes)
- Hero sub-headline: `font-black` → `font-bold` (2-sentence body paragraph)
- Testimonial quotes: `font-black` → `font-bold` (all quote cards)
- Bottom CTA body paragraph: `font-black` → `font-bold`
- `FULL COMPARISON` hero button: added `→`

### CompareTrustATraderPage (4 changes — same pattern)
- Hero sub-headline: `font-black` → `font-bold`
- Testimonial quotes: `font-black` → `font-bold`
- Bottom CTA body paragraph: `font-black` → `font-bold`
- `FULL COMPARISON` hero button: added `→`

## Phase 4 — Site Health (NEEDLE / BUILDER / CRITIC / REVENUE)

**NEEDLE** found 3 issues across AdminGuardPage, AccountPage, IntakeTestPage:

### Issue 1 — GREEN BUTTON ON COPIED STATE (HIGH)
- **File:** `AdminGuardPage.tsx` line 599
- **Fix:** `COPY LIST` button `copied` state `bg-[var(--green)]` → `bg-[var(--ink)]`
- Green is a data-indicator token only. Never a button background.
- **CRITIC:** YES — ink reads as "done" clearly. **REVENUE:** YES — design trust signal.

### Issue 2 — SIGN OUT MISSING ARROW (MEDIUM)
- **File:** `AccountPage.tsx` line 182
- **Fix:** `SIGN OUT` → `SIGN OUT →` (design rule: all non-submit buttons get `→`)
- **CRITIC:** YES. **REVENUE:** Neutral.

### Issue 3 — FONT-BLACK ON BODY PARAGRAPHS (MEDIUM, 3 FILES)
- **AdminGuardPage:** 3 body paragraphs (hero, MTD Check, Calendar Export) `font-black` → `font-bold`
- **AccountPage:** Free-tier description paragraph `font-black` → `font-bold`
- **IntakeTestPage:** Hero intro paragraph `font-black` → `font-bold`
- **CRITIC:** YES — body text is more readable at normal bold weight. **REVENUE:** Positive (readability = trust).

---

## Carryover Blockers (unchanged)
- Founder decision: 14 add-on services still have no £ shown
- Stripe live test: blocked on test keys in Vercel
- TradeFlow button: blocked on URL scheme from founder
- n8n workflow 16: blocked on SMTP creds + manual activation
