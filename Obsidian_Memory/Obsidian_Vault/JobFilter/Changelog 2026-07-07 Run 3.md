# Changelog 2026-07-07 (NightlyBuildAgent — Run 3)

**Commit:** `58ccf56`
**Branch:** main
**Build:** GREEN (113 pages)
**TypeScript:** CLEAN

---

## CONTAINER STATE

Fresh container. `npm install`. HEAD at `56fe6fe` (vault Run 2 update, Jul 7). Build GREEN, TS CLEAN before changes. No new founder commits or open PRs since Run 2.

---

## PHASE 1 — FIX BROKEN

No broken imports, no fake flows. Clean build confirmed.

---

## PHASE 2 — TIER 1 FEATURES

All Tier 1 features confirmed BUILT. No new features to build this run.

---

## PHASE 3 — LEGIBILITY SWEEP (text-[10px] → text-xs)

Single focused sweep: eliminated subminimum font sizes (10px) from user-visible content and interactive elements across 6 files.

### 1. TradePage.tsx — hero "No credit card required" label

`text-[10px] text-[var(--ink)]/50` → `text-xs text-[var(--ink)]/60`

The reassurance line below the primary CTA on every trade page. Affects 15+ pages. At 10px/50% it was effectively invisible — the exact opposite of what a reassurance line should be.

### 2. TradePage.tsx — "Buyer name + contact unlocked for paid subscribers"

`text-[10px]` → `text-xs`

Caption below the lead card example in the preview section. Explains the lock. At 10px it was unreadable.

### 3. LeadDetailPage.tsx — "Benchmark estimates — verify with supplier before purchase"

`text-[10px]` → `text-xs`

Legal disclaimer below the material cost CTA. Tradesmen need to read this before acting.

### 4. DashboardPage.tsx — "Upgrade unlocks buyer details..."

`text-[10px] text-white/50` → `text-xs text-white/60`

Supporting line under the upgrade CTA for free-tier users on their home screen (the no-territory state). 10px/50% on a dark background was essentially invisible.

### 5. CityPage.tsx — "No credit card required" opacity fix

`text-[var(--ink)]/50` → `text-[var(--ink)]/60`

Already at text-xs, but 50% opacity was below readable threshold. Affects 20+ city pages.

### 6. LeadValueKit.tsx — paid member section labels

"Quote floor", "Next action", "Follow-up cadence" labels + follow-up step chips: `text-[10px]` → `text-xs`

Shown to paid members in their BUYER ACTION PACK. These labels tell them what the values mean. Making them 10px defeats the purpose of showing them.

### 7. LeadCard.tsx — interactive button text

- "SEND TO WHATSAPP" button: `text-[10px]` → `text-xs`
- STATUS_PILLS (CONTACTED / QUOTED / WON / LOST / NO ANSWER / IGNORE): `text-[10px]` → `text-xs`

Action buttons at 10px are not legible for quick tapping. Both have `min-h-[44px]` for touch targets — pairing that with 10px text was inconsistent.

---

## PHASE 4 — SITE HEALTH

- **NEEDLE:** Top issues found — (1) text-[10px] on "No credit card required" in TradePage template (invisible on 15+ pages), (2) text-[10px] on LeadValueKit labels for paying members, (3) 10px status pill buttons in LeadCard
- **BUILDER:** All three fixed in this sweep (7 fixes across 6 files)
- **CRITIC:** Minimum body copy is now text-xs (12px) across all user-facing content. Each fix is immediately clearer at a glance ✓
- **REVENUE:** "No credit card required" at text-xs/60% on TradePage is the key conversion lever — hesitant tradespeople who couldn't read the reassurance were more likely to bounce ✓

---

## REMAINING CARRYOVER BLOCKERS (unchanged)

- **Founder decision — add-on service pricing**: 14 add-on services still have no £ shown
- **Stripe live test**: blocked on test keys in Vercel
- **TradeFlow "Send to TradeFlow" button**: blocked on URL scheme from founder
- **n8n workflow 16 (LLM Brief Builder)**: blocked on SMTP creds + manual activation
- **Do NOT delete `vite.config.ts`/`index.html`**: confirmed in use by `server/app.ts`

---

## NEXT RUN PRIORITIES

1. Check for new founder commits/PRs first
2. text-[10px] sweep is largely complete on critical paths — remaining instances (e.g. "NO SHARED AUCTION" badge on LeadCard, "Open now" chips on HomePage) are compact status indicators, intentionally small
3. Consider a fresh copy sweep on the WeeklySignalsPage subscription modal (trade list expanded but intro copy not reviewed since early July)
4. Consider reviewing LeadListPage WHY? badges for trade-specific copy improvements
