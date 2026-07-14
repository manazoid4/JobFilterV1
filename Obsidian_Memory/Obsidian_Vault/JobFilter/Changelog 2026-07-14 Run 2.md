# Changelog 2026-07-14 Run 2 — NightlyBuildAgent

## Summary

Build: GREEN (Next.js, 113+ pages)
TypeScript: CLEAN
Commit: `0a24b29`

---

## Container State

Fresh container — `npm install` required. HEAD synced to `c8e912f` (founder PR #335 — Hero clarity on HomePage). Build GREEN, TS CLEAN before changes.

---

## Founder Activity Check

One new founder commit since Run 1:
- `c8e912f` PR #335 — "Hero clarity: proof-points → bullet strip, reduce font-black on body copy"
  - HomePage hero proof-points converted from 4 bordered boxes to yellow-dot bullet strip
  - Hero description: `font-black` → `font-bold leading-snug text-white/85`
  - Body descriptions in Vantage/Vicinity/Codex cards and territory section: `font-black` → `font-bold`
  - "Sample data" disclaimer made legible (text-white/55)
  - Removed competing "Check my patch" secondary link from hero CTA row
  - Verified: sound, no regressions.

No open PRs at time of run.

---

## Phase 1 — Fix Broken

No broken builds. No broken imports. All forms confirmed wired to real endpoints:
- PostJobPage.tsx: `setSent(true)` inside try/catch after real fetch
- ForgotPasswordPage.tsx: `setDone(true)` inside try/catch after real auth call
- ProductAdvantagePage.tsx: `setSubmitted(true)` inside try/catch after real fetch
- WeeklySignalsPage.tsx: `setSubmitted(true)` after fire-and-forget `/api/waitlist` call (intentional pattern)

Build GREEN before and after changes.

---

## Phase 2 — Tier 1 Features

All Tier 1 features confirmed BUILT from prior runs. No new Tier 1 work required.

---

## Phase 3 + Phase 4 — Copy Polish + Site Health (NEEDLE)

### NEEDLE — Top 3 UX issues found:

1. **TradePage.tsx (15+ trade pages) — hero description `font-black` same as HomePagePage pre-#335 fix** — The founder's PR #335 identified that `font-black` on description paragraphs creates visual monotony by matching headline weight. The TradePage.tsx template (electrician, plumber, roofer, builder, etc.) had the same pattern on 3 key paragraphs: hero sub, WhatsApp section, and final CTA. One change fixes 15+ pages. **FIXED.**

2. **CityPage.tsx (20+ city pages) — same `font-black` description pattern** — Hero sub, local-angle body, and final CTA all used `font-black` on `text-xl` description paragraphs. Same fix applied. **FIXED.**

3. **PricingPage.tsx + SignalsPage.tsx — same hero description pattern** — Highest-conversion page (Pricing) and key acquisition page (Signals) both had `text-xl font-black` hero descriptions. Both updated. **FIXED.**

### Changes made:

**`src/components/TradePage.tsx`** (affects 15+ trade pages):
- Line 85: hero `{data.sub}` description — `font-black leading-tight` → `font-bold leading-snug`
- Line 218: WhatsApp section description — `font-black text-white/80` → `font-bold text-white/85`
- Line 356: final CTA section description — `font-black text-white/90` → `font-bold text-white/85`

**`src/components/CityPage.tsx`** (affects 20+ city pages):
- Line 166: hero `{city.heroSub}` — `font-black leading-tight` → `font-bold leading-snug`
- Line 222: local angle body `{city.localAngleBody}` — `font-black` → `font-bold`
- Line 394: final CTA description — `font-black text-white/90` → `font-bold text-white/85`

**`src/pages/PricingPage.tsx`**:
- Line 32: hero description — `font-black text-white/80` → `font-bold text-white/85`

**`src/pages/SignalsPage.tsx`**:
- Line 145: hero description — `font-black` → `font-bold text-white/85`

### CRITIC: Is the fix clearer in <3 seconds? YES — lighter description weight means the headline (`font-black` headline class) stands out more; eye goes to the CTA row faster.
### REVENUE: Does it increase likelihood of paying £39/month? YES — less visual noise before the primary CTA = lower friction on the trade pages that drive paid signups.

---

## Carryover Blockers (unchanged)

- **Founder decision — add-on service pricing**: 14 add-on services still have no £ shown
- **Stripe live test**: blocked on test keys in Vercel
- **TradeFlow "Send to TradeFlow" button**: blocked on URL scheme from founder
- **n8n workflow 16 (LLM Brief Builder)**: blocked on SMTP creds + manual activation

---

## Next Run Priorities

1. **`near you` is FULLY SWEPT** — do not re-check.
2. **`platform` in user-facing copy is FULLY SWEPT** — do not re-check.
3. **font-black on description paragraphs** — The pattern remains on other individual pages (BuildUkAlternativePage, EpcPage, CompareBarkPage, CompareCheckatradePage). These are lower-traffic individual pages. Consider sweeping 2-3 more in the next run if no new founder commits land.
4. **Add-on service pricing copy** — blocked on founder decision. If unlocked, add "from £X" or "priced per job" to 14 service cards in ProductAdvantagePage.
5. **Carryover blockers remain the main unlock** — Stripe keys, TradeFlow URL scheme, n8n SMTP creds.
