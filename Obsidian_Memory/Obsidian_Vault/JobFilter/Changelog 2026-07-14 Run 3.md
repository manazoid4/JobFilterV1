# Changelog — 2026-07-14 Run 3 (NightlyBuildAgent)

## Summary
font-black sweep on the remaining 8 pages identified in Run 2's NEEDLE finding.
All description paragraphs converted to font-bold. Build and TypeScript both clean.

## Changes Made

### font-black → font-bold sweep (description paragraphs only)

**EpcPage.tsx** (6 changes)
- Hero sub-heading: `font-black text-white/80` → `font-bold text-white/85`
- Rating card body, trades card body: `font-black text-[var(--muted)]` → `font-bold`
- Intro paragraph: `font-black text-[var(--ink)]` → `font-bold`
- Steps card description, final CTA paragraph: converted to font-bold

**CompareBarkPage.tsx** (2 changes)
- Hero description: `font-black leading-tight` → `font-bold leading-snug`
- Final CTA body: `font-black text-white/80` → `font-bold`
- Kept: testimonial quotes `font-black` (intentionally punchy)

**BuildUkAlternativePage.tsx** (~14 changes)
- Hero, THE SITUATION paragraphs, THE FIX paragraphs, TEN SIGNALS, PRICING, signals map, GOLD/SILVER/BRONZE cards, WhatsApp section, WHAT YOU GET cards, final CTA
- `text-white/80` → `text-white/85` on relevant paragraphs

**CompareCheckatradePage.tsx** (~12 changes)
- Hero, pain point cards, lead auction section, TEN SIGNALS, PRICING, FIRST MOVER ADVANTAGE, WHATSAPP, signals grid, FREE/STANDARD cards, GOLD/SILVER/BRONZE, final CTA

**TradieStackPage.tsx** (5 changes)
- Hero, WHY IT MATTERS, feature card bodies, first-month marketing card bodies, #buy section
- Fixed non-standard `text-white/72` → `text-white/80`

**PostJobPage.tsx** (4 changes)
- Success state paragraph, hero sub-heading, WHAT HAPPENS NEXT div (3 child paragraphs), feature cards

**CompareBuildAlertPage.tsx** (~14 changes — NEEDLE page)
- Hero, cost calculator description, WHAT BUILDALERT DOES WELL body, THE PROBLEM body, FIRST MOVER ADVANTAGE, TEN SIGNALS, signals grid cards, GOLD/SILVER/BRONZE cards, WHAT TRADES SAY, WHATSAPP section, PRICING, FREE/FOUNDING/STANDARD cards, WHAT YOU GET features, final CTA

**ForYourTradePage.tsx** (4 changes)
- Hero description, signals article (`.signals` field), WHY cards body, SCAN YOUR PATCH paragraph

## Invariants Preserved
- `font-black` kept on: tables, list items, micro-labels, price/badge displays, single-line all-caps labels, testimonial quotes, guarantee lines, timeline timestamps, slider labels
- No route paths changed
- No new pages created
- No GDPR-adjacent data changes
- No GOLD/SILVER/BRONZE label changes

## Build Status
- `npx tsc --noEmit`: clean
- `npm run build`: all 21 pages built successfully

## Git
- Commit: `[NightlyBuildAgent] font-black sweep: description paragraphs → font-bold across 8 pages`
- Branch: main
- Push: success

## Carryover Blockers (unchanged)
- Add-on service pricing — blocked on founder decision
- Stripe live test — blocked on Vercel test keys
- TradeFlow "Send to TradeFlow" button — blocked on URL scheme
- n8n workflow 16 — blocked on SMTP creds
