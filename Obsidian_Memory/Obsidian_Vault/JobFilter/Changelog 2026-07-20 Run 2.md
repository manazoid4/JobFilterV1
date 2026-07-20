# Changelog 2026-07-20 Run 2 (NightlyBuildAgent)

## Build Status
- **BUILD:** GREEN (113/113 static pages)
- **TYPESCRIPT:** CLEAN (0 errors)
- **Commit:** `acd9096`

## Phase 1 — Fix Broken
- Fresh container, `npm install` (359 packages). HEAD at `74fa748` (vault Jul 20 Run 1).
- Build initially failed: `next: not found` — node_modules absent in new container. Fixed with `npm install`.
- No broken imports, no fake flows, no build errors after install. Clean.

## Phase 2 — Tier 1 Features
- All Tier 1 features confirmed BUILT (scan counter, calendar ICS, WinStatsBanner, WhatsApp templates, trade-specific scoring). No new feature needed this run.

## Phase 3 — Copy Polish (3 files, 6 fixes)

### font-black → font-bold (multi-sentence body paragraphs)
- **SmartQuotePage.tsx** (line 74): hero paragraph on navy bg — "Bark and Checkatrade make you compete on price. Walk in with a proper written proposal..." (4-sentence competitor differentiation paragraph)
- **SmartQuotePage.tsx** (line 174): CTA section paragraph on navy bg — "Smart Quote writes the proposal. The scanner finds the jobs worth proposing on. REAL LEADS..." (multi-sentence conversion paragraph)
- **MaterialPriceEnginePage.tsx** (line 167): hero paragraph on ink bg — "Reference prices from major UK suppliers — Selco, Travis Perkins, Buildbase. Use as a quoting baseline..."

### CTA Uppercase Consistency (MaterialPriceEnginePage)
- **Line 195**: Primary "Compare" button → `COMPARE →` — the main form submit on the most-used free tool was lowercase and arrow-less, inconsistent with every other primary CTA site-wide
- **Line 292**: "Save to list" → `SAVE TO LIST` — secondary action button; uppercase matches design pattern
- **Line 333**: "Clear list" → `CLEAR LIST` — tertiary action; uppercase for consistency

### SignupPage — Missing Arrow on Highest-Stakes CTA
- **SignupPage.tsx** (line 140): `'CREATE ACCOUNT'` → `'CREATE ACCOUNT →'`
- This is the submit button for account creation — the moment of highest intent on the entire site. Every other primary CTA uses `→`. This was the only exception.

## Phase 4 — NEEDLE Site Health

### NEEDLE: MaterialPriceEnginePage primary action button was lowercase
- **File:** `src/pages/MaterialPriceEnginePage.tsx`, line 195
- **Issue:** The "Compare" form submit button — the most important button on the Material Price Engine free tool — used lowercase text with no `→` arrow. Every other primary CTA on the site is uppercase with `→`. A tradesman scanning the form might not recognise it as the primary action.
- **Fix:** `<Search /> Compare` → `<Search /> COMPARE →`
- **CRITIC:** YES — uppercase button with arrow reads in <3 seconds; matches site-wide pattern
- **REVENUE:** YES — the Material Price Engine is a free-tool discovery path; clearer primary action = more searches = more exposure to the paid upgrade nudge (basket breakdown locked behind £39/mo)

### SignupPage NEEDLE
- **File:** `src/pages/SignupPage.tsx`, line 140
- **Issue:** "CREATE ACCOUNT" submit button was the only primary CTA on the site without `→`. At the highest-intent moment (someone clicking to create an account), the inconsistent style could create micro-hesitation.
- **Fix:** `'CREATE ACCOUNT'` → `'CREATE ACCOUNT →'`
- **CRITIC:** YES — reads in <3 seconds; consistent with site-wide arrow vocabulary
- **REVENUE:** YES — account creation is the gateway to the paid conversion path; consistent CTA style reinforces confidence at decision point

## Carryover Blockers (unchanged)
- [ ] **Founder decision — add-on service pricing**: 14 add-on services still have no £ shown
- [ ] **Stripe live test** — blocked on test keys in Vercel
- [ ] TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- [ ] n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation

## Next Run Priorities
1. **font-black final sweep** — run `grep -rn "font-black" src/pages/ | grep -v "uppercase\|text-xs\|text-\[10\]\|tracking\|text-sm\|text-\[11\]\|text-\[13\]"` and check if any remaining multi-sentence paragraphs were missed. TrustCenterPage `font-black text-white/90` (line 210) is a single-sentence value label — likely intentional.
2. **Copy polish** — EpcPage and SignalsPage: check for fear→proof→control structure and competitor naming.
3. **NEEDLE** — Check /find-jobs scan counter: when 0 scans remain, is the upgrade CTA "UNLOCK — £39/MO →" prominent enough? Consider if the expired-scan state should show a more prominent full-width upgrade box.
