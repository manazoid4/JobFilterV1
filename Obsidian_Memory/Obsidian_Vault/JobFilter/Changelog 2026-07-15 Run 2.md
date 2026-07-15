# Changelog — 2026-07-15 Run 2 (NightlyBuildAgent)

## Summary
Founder PR #336 reviewed (sound). Authenticated-page NEEDLE sweep: LeadDetailPage body-copy audit found 10 `font-black` description paragraphs. TerritoriesPage and SignupPage swept in the same pass. 20 total font-bold changes across 3 files. Build and TypeScript both clean.

## Founder Activity
**PR #336 merged** (Jul 15 11:54 UTC):
1. Fill My Week section demoted from yellow-box to white-box+border — upgrade CTA now owns the conversion moment on the scan results page.
2. Trade `<select>` added directly to the scan form (next to Postcode + Radius). Default 'electrical' no longer silently misfires for non-electricians. Form layout updated to `lg:grid-cols-[1fr_1fr_1fr_auto]`.

Both changes reviewed, no regressions.

## Changes Made

### NEEDLE Fix — LeadDetailPage font-bold sweep (10 changes)
**File:** `src/pages/LeadDetailPage.tsx`

Every authenticated user hits this page on each lead they click. Body paragraphs using `font-black` made multi-sentence descriptions harder to scan — `font-black` is reserved for labels, badges, and CTAs.

Changes (all `font-black` → `font-bold`):
- Line 430: GOLD action paragraph ("first-mover window open…")
- Line 444: SILVER action paragraph ("timing not confirmed yet…")
- Line 448: BRONZE action paragraph ("real signal, not urgent…")
- Line 481: `{lead.recommendedAction}` body
- Line 487: "Source data can lag or change…" verify-before-contact panel
- Line 519: "The paid part is not just the lead…"
- Line 526: "Material price jumps quietly kill your margin…"
- Line 548: "The raw record is full of council/legal jargon…"
- Line 558: "Get a plain-English breakdown…" (locked state)
- Line 568: `{explainResult.summary}` (ready state)
- Line 577: WhatsApp section intro "Message ready — tap SEND WHATSAPP…"
- Also: "Subject" email label `text-[10px]` → `text-xs` (line 670)

### TerritoriesPage font-bold sweep (8 changes)
**File:** `src/pages/TerritoriesPage.tsx`

- Line 114: hero body paragraph "Lock your trade and postcode cluster…"
- Line 125: patch check form description "We check source coverage…"
- Line 192: WHY TERRITORIES competitor paragraph "Checkatrade blasts the same lead…"
- Line 205: card body descriptions via `{body}` map (4 cards)
- Line 243: `{territory.claimNote}` per-territory description
- Line 280: ROI section "At £39 per month, one £2,000 job covers 51 months…"
- Line 335: Q&A answers via `{a}` map
- Line 347: final CTA paragraph "Founder monthly includes one territory lock…"

### SignupPage font-bold sweep (2 changes)
**File:** `src/pages/SignupPage.tsx`

- Line 89: confirmation-sent paragraph "We sent the confirmation link to {email}…"
- Line 106: signup form hero paragraph "{planLabel}. Fill in your details below…"

## Invariants Preserved
- `font-black` kept: all labels, badges, micro-labels, button text, short disclaimers, guarantee lines, status chips, data indicators, list items, and table cells
- No route paths changed
- No new pages created
- No GOLD/SILVER/BRONZE label changes
- No GDPR-adjacent data changes

## Build Status
- `npx tsc --noEmit`: clean
- `npm run build`: all pages built successfully

## Git
- Commit: `[NightlyBuildAgent] font-bold sweep: LeadDetailPage (10), TerritoriesPage (8), SignupPage (2)`
- Hash: `930642d`
- Branch: main
- Push: success

## Carryover Blockers (unchanged)
- Add-on service pricing — blocked on founder decision
- Stripe live test — blocked on Vercel test keys
- TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- n8n workflow 16 — blocked on SMTP creds + manual activation
