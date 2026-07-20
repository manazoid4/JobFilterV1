# Changelog 2026-07-20 (NightlyBuildAgent — Run 1)

## Build Status
- **BUILD:** GREEN (113/113 static pages)
- **TYPESCRIPT:** CLEAN (0 errors)
- **Commit:** `27d341f`

## Phase 1 — Fix Broken
- Fresh container, `npm install` (359 packages). HEAD at `d3ed27e` (Run 2 Jul 19).
- No broken imports, no fake flows, no broken builds. Clean.

## Phase 2 — Tier 1 Features
- All Tier 1 features confirmed BUILT (scan counter, calendar ICS, WinStatsBanner, WhatsApp templates, trade-specific scoring). No new feature needed this run.

## Phase 3 — Copy Polish (7 files, 13 fixes)

### font-black → font-bold (multi-sentence body paragraphs)
- **AdminGuardPage.tsx** (line 625): hero body on ink bg — "HMRC dates, trade admin checklists and reminder exports..."
- **AdminGuardTeaserPage.tsx** (lines 133, 136): 2 body paragraphs on yellow "THE BIGGER PICTURE" section
- **CompareBarkPage.tsx** (lines 75, 85): comparison list items — "HOW BARK WORKS" and "HOW JOBFILTER WORKS" bullet lists
- **CompareBarkPage.tsx** (line 135): testimonial quote text `{q.quote}`
- **CompareBarkPage.tsx** (line 159): guarantee sentence — "30-DAY MONEY-BACK GUARANTEE — One job worth chasing..."
- **SignupPage.tsx** (line 92): spam folder tip in email confirmation state
- **LeadDetailPage.tsx** (line 620): AI draft upgrade nudge — "Get a tailored first message for this exact job..."
- **LeadDetailPage.tsx** (line 684): calendar reminder description — "Block time to chase this job. Adds a 9am reminder..."
- **LeadDetailPage.tsx** (line 721): outcome section note — "Status: ... mark the result so your wins build up..."
- **HomePage.tsx** (lines 150, 152): testimonial quote + attribution — "First planning alert was a loft conversion in B12..."
- **HomePage.tsx** (line 342): 4-step HOW IT WORKS body descriptions (multi-sentence, e.g. "Every signal scored 0–100...")

## Phase 4 — NEEDLE Site Health

### NEEDLE: FindJobsPage — SCAN NOW missing → arrow
- **File:** `src/pages/FindJobsPage.tsx`, line 507
- **Issue:** The primary yellow "SCAN NOW" button — the most-pressed button on the site — had no `→` arrow. Every other scan CTA on the site uses `→` ("SCAN MY AREA →", "SCAN FREE FIRST →") but this one did not.
- **Fix:** `'SCAN NOW'` → `'SCAN NOW →'`
- **CRITIC:** YES — reads in <3s, consistent with site-wide arrow vocabulary
- **REVENUE:** YES — most-pressed button; consistent CTA pattern reduces micro-friction at primary action moment

## Carryover Blockers (unchanged)
- [ ] **Founder decision — add-on service pricing**: 14 add-on services still have no £ shown
- [ ] **Stripe live test** — blocked on test keys in Vercel
- [ ] TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- [ ] n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation

## Next Run Priorities
1. **font-black sweep** — check remaining pages not yet swept: VerifyPage, any remaining src/pages not covered. Run `grep -rn "font-black" src/pages/ | grep -v "uppercase\|text-xs\|text-\[10\]\|tracking"` to find candidates.
2. **Copy polish** — AccountPage free-tier paragraph: fear→proof→control on upgrade section. Check if "SIGN OUT →" arrow fix on AccountPage was applied.
3. **NEEDLE** — check HomePage step 1/2 sections for any remaining copy issues; check signals page bottom CTA hierarchy.
