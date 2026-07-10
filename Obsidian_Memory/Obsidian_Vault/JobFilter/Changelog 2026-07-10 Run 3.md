# Changelog 2026-07-10 Run 3 (NightlyBuildAgent)

## Build Status
- **Build**: GREEN (113 pages)
- **TypeScript**: CLEAN
- **Founder activity**: One new commit since Run 2: `610092b` — hero price anchor ("£39/mo founder price") + Signals moved lower in nav. Reviewed — sound. No open PRs.

## Pre-flight
- Container fresh; `npm install` completed.
- HEAD synced to origin/main at `610092b` after `git fetch origin main`.
- Build GREEN, TS CLEAN confirmed before changes.
- All Tier 1 features confirmed BUILT (unchanged).

## Changes Made

### 1. TopNav.tsx — Nav redundancy resolved (founder hint)
**Before**: Primary nav: Find Jobs | Pricing | Claim Patch | Free Tools | Trades | More▾
**After**: Primary nav: Find Jobs | Pricing | Free Tools | Trades | Proof | More▾ (Claim Patch → More)
- "Claim Patch" moved from primary nav slot 3 to More dropdown (slot 6)
- "Proof" (/trust) moved from More dropdown up to primary nav slot 5
- Reasoning: "Pricing" and "Claim Patch" were both purchase-funnel CTAs in the primary nav, creating decision paralysis (do I go to Pricing or Claim Patch first?). Now only ONE purchase-funnel item in primary nav (Pricing). Proof page brought up because trust-building content is higher value for new visitors than a patch-check form.

### 2. TopNav.tsx — Mobile 2-col shortcut updated
**Before**: Right column: "PAID" / "CLAIM PATCH" → /territories
**After**: Right column: "£39/MO" / "LOCK PATCH" → /pricing
- Mobile conversion path now goes directly to /pricing (checkout button), not /territories (check/wait form)
- Label "£39/MO" immediately anchors the price — clearer than "PAID"

### 3. FindJobsPage.tsx — Hero subtitle copy improved
**Before**: "Pick your trade. Enter your postcode. See what's live near you right now."
**After**: "Pick your trade. Enter your postcode. See what's live in your patch — 3–5 days before job boards."
- Adds timing advantage claim (3–5 days) — the core differentiator
- "in your patch" replaces vague "near you" — uses product language

### 4. FindJobsPage.tsx — Commercial signals trust message legibility
**Before**: `text-[10px] text-white/50` on "No credit card required to browse"
**After**: `text-xs text-white/70`
- Trust message inside dark paywall box was nearly unreadable. Now legible.

### 5. TradePage.tsx (all 15+ trade pages) — Copy polish
**Before**: "See what {trade} work is active near you — before it hits the directories."
**After**: "See what {trade} work is live in your postcode — before Checkatrade or Bark lists it."
- "Near you" → "in your postcode" (specific > vague, per copy rules)
- "directories" → competitor names (Checkatrade, Bark) — copy rule: name them

### 6. BuildUkAlternativePage.tsx — Same "near you" fix
**Before**: "See what work is active near you."
**After**: "See what work is live in your postcode — before Checkatrade or Bark lists it."
- Consistent with TradePage fix. Named competitors. Specific postcode language.

## Site Health (NEEDLE → BUILDER → CRITIC → REVENUE)
- **NEEDLE**: #1 issue — Nav had two purchase-funnel CTAs (Pricing + Claim Patch) in primary nav; creates decision paralysis. #2 — "near you" vague copy on 17 pages. #3 — text-[10px] trust message in dark paywall box.
- **BUILDER**: All three fixed this run.
- **CRITIC**: YES — clearer in <3 seconds. One nav path to /pricing. Hero copy names timing advantage. Mobile shortcut routes directly to checkout.
- **REVENUE**: YES — removes purchase-funnel ambiguity = fewer bounces on nav = more £39/mo conversions. Mobile "LOCK PATCH → /pricing" is now a direct checkout path.

## Commit
- `8297007` — [NightlyBuildAgent] nav redundancy fix + copy polish — "near you" → "in your postcode" + trust legibility

## Carryover Blockers (unchanged)
- [ ] **Founder decision — add-on service pricing**: 14 add-on services still have no £ shown
- [ ] **Stripe live test** — still blocked on test keys in Vercel
- [ ] TradeFlow "Send to TradeFlow" button — blocked on URL scheme from founder
- [ ] n8n workflow 16 (LLM Brief Builder) — blocked on SMTP creds + manual activation
- [ ] **Do NOT delete `vite.config.ts`/`index.html`** — confirmed in use by `server/app.ts`

## Next Run Priorities
1. **Check for new founder commits/PRs first** — standard pre-flight.
2. **Nav change verification**: Primary nav now shows Find Jobs | Pricing | Free Tools | Trades | Proof. Verify "Claim Patch" correctly appears in More dropdown and mobile "LOCK PATCH" routes to /pricing.
3. **Remaining "near you" instances**: TradeGroundworkers, TradeQuantitySurveyors, TradeEVCharger, TradeSmartHome, TradeFireSafety, SignalsPage — these are in narrative/step descriptions, not CTAs. Context makes them acceptable; low priority.
4. **Buildable backlog genuinely small** — carryover blockers (Stripe, TradeFlow, add-on pricing) remain the main unlock.
