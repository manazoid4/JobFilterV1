# Changelog 2026-07-20 Run 3 (NightlyBuildAgent)

## Build Status
- **BUILD:** GREEN (113/113 static pages)
- **TYPESCRIPT:** CLEAN (0 errors)
- **Commit:** `c6b6bc8`

## Phase 1 — Fix Broken
- Fresh container. `npm install` (359 packages). HEAD at `46a4f85` (vault Jul 20 Run 2).
- Build failed initially: `next: not found`. Fixed with `npm install`. Build GREEN. TypeScript CLEAN. No broken imports.

## Phase 2 — Tier 1 Features
- All Tier 1 features confirmed BUILT. No new feature this run.
- WhatsApp templates verified: `quick_quote_offer` and `availability_check` are both present in `chaseTemplates.ts` (keys: `quick_quote_offer`, `availability_check`). Feature roadmap correctly marks these as built.

## Phase 3 — Copy Polish

### SignalsPage.tsx — font-black → font-bold (6 multi-sentence body paragraphs)

| Line | Class changed | Content |
|------|---------------|---------|
| 185 | `font-black` → `font-bold` | Signal card descriptions (all 10 signal cards — multi-sentence) |
| 227 | `font-black` → `font-bold` | "Planning alone is often too early. Start Signal mode filters..." |
| 241 | `font-black` → `font-bold` | "Use it inside Find Jobs to surface READY/MAYBE leads first..." |
| 266 | `font-black` → `font-bold` | "How it works" step bodies in navy boxes (3 steps, each 3–5 sentences) |
| 270 | `font-black` → `font-bold` | "Every scan runs all ten signals in parallel. Results are scored..." |
| 331 | `font-black` → `font-bold` | Bottom CTA body: "Enter your postcode. Pick your trade..." |

Rule: `font-black` is for labels, prices, status pills, and short uppercase tags. Multi-sentence body paragraphs use `font-bold`.

### SignalsPage.tsx — HVAC → HEATING

- `tradeToSignalLabel` key: `HVAC` → `HEATING` (internal filter value stays `'HVAC'` to match `signals[].trades`)
- `tradeSignals` array: `{ trade: 'HVAC' }` → `{ trade: 'HEATING' }`
- Consistent with previous run's FindJobsPage TRADE_PRESETS change (HVAC → HEATING)
- Reason: UK tradesmen call themselves "Gas engineer" or "Heating engineer", not "HVAC engineer"
- Trade Targeting card header and filter button now both say "HEATING"

## Phase 4 — NEEDLE Site Health

### NEEDLE: FindJobsPage expired-scan indicator copy was misleading

**File:** `src/pages/FindJobsPage.tsx`, line 429

**Issue:**
- When a user had used all 3 weekly scans, the indicator showed: "Free scans used — upgrade to unlock buyer details and WhatsApp alerts."
- Problem: "Free scans used" implies scanning is blocked. It isn't. The SCAN NOW button stays active. Only buyer details are gated. A UK tradesman reading this would think they're locked out and leave — when they could still scan and see lead cards.

**Fix:**
- Old: `'Free scans used — upgrade to unlock buyer details and WhatsApp alerts.'`
- New: `'Buyer details locked. Scanning is always free — upgrade to see who to call.'`

**CRITIC:** YES — clearer in <3s. "Buyer details locked" is precise. "Scanning is always free" removes false friction. Tradesman understands what they can/can't do without false panic.

**REVENUE:** YES — removing "scans blocked" perception keeps tradesmen on the page. "Upgrade to see who to call" is benefit-led. The full-width yellow upgrade box after results (already exists) handles the main conversion push.

## Carryover Blockers (unchanged)
- [ ] **Founder decision — add-on service pricing**: 14 add-on services still have no £ shown
- [ ] **Stripe live test** — blocked on test keys in Vercel
- [ ] TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- [ ] n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation

## Next Run Priorities
1. **TrustCenterPage line 210 check**: `font-black text-white/90` — single-sentence value label, likely intentional, but confirm by reading context
2. **Copy polish — PricingPage**: check for fear→proof→control structure; verify all CTAs have "No credit card required" or equivalent; check competitor comparison section
3. **NEEDLE — lead card locked-detail UX**: when a free user sees a GOLD lead card with locked buyer details (padlock icon), is the unlock CTA on the card itself prominent enough? Check `LeadCard` component for the locked state styling
