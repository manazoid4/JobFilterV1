# Changelog 2026-06-06 — NightlyBuildAgent Run 2

## Build Status
- **Build:** GREEN (106 pages)
- **TypeScript:** CLEAN

---

## Pre-flight

- Fresh container — `npm install` required, completed cleanly
- Build confirmed GREEN (106 pages), TypeScript CLEAN before changes
- Read vault: Feature Roadmap, Design Direction, Problems and Solutions, Daily To-Do, Changelog 2026-06-06 Run 1
- All Tier 1 features confirmed built (scan counter, ICS export, won leaderboard, WA templates, trade scoring UX)

---

## Phase 1 — Fix Broken

No broken builds or TypeScript errors. No fake form submissions found.

---

## Phase 2 — Tier 2 Feature: WhatsApp Phone-Aware Links

### Problem Found
All `wa.me` links on LeadDetailPage and LeadListPage used `wa.me/?text=...` — no phone number. When a paid user unlocks a lead and has the buyer's phone, tapping "SEND WHATSAPP" opens WhatsApp without pre-selecting the contact. The user still has to manually find the buyer, then paste the message.

### Fix Applied

**`src/pages/LeadDetailPage.tsx`**
- Added `waPhone` variable: formats `lead.phone` to E.164 (strip non-digits, `0` → `44`)
- Updated both `wa.me` URLs: `wa.me/?text=...` → `wa.me/${waPhone ?? ''}?text=...`
- GOLD urgency box: `SEND WHATSAPP NOW →` → `OPEN BUYER WHATSAPP →` when phone available
- Main SEND WHATSAPP button: label changes to `OPEN WHATSAPP CHAT →` when phone available

**`src/pages/LeadListPage.tsx`**
- Same phone-aware formatting applied to list-view quick-send button
- Button label: "OPEN WHATSAPP CHAT" when `lead.phone` present, otherwise existing label

### Impact
Before: Copy template → open WhatsApp → find buyer manually → paste message (3 steps)
After: Tap OPEN WHATSAPP CHAT → chat opens with buyer pre-selected and message pre-filled (1 step)

---

## Phase 3 — Copy Polish

### Page 1: HomePage

**Sample Lead section**
- **Before:** "Structured signal. Real scoring shape. Clear recommended action. This is the format that lands in your WhatsApp — scored, filtered, and ready to act on."
- **Problem:** "Structured signal" and "Real scoring shape" are jargon. Doesn't tell a tradesman what they'll actually see.
- **After:** "Job type, postcode, budget band, score, and urgency — in one message. This is exactly what lands in your WhatsApp when a GOLD lead fires. No noise. No recycled Checkatrade listings. Just the job."

**Territory headline**
- `SECURE YOUR PATCH BEFORE ANOTHER FIRM DOES.` → `SECURE YOUR PATCH BEFORE ANOTHER TRADE DOES.` ("firm" is corporate)

**Territory body copy**
- `Territory lock gives one trade first look in one postcode cluster. Founder firms keep the cheaper price while their plan stays active.` → `Territory lock gives you first look at every signal in your postcode cluster. Tradesmen who lock in now keep £39/mo for life — the rate goes up when founder slots fill.`
- "Founder firms" removed (corporate); specific price urgency added

### Page 2: ActivationPendingPage

**Paid done-state**
- `Gold leads will hit your WhatsApp within 2 hours. Run your first free scan while you wait.` → `Gold leads will hit your WhatsApp within 2 hours. Run a scan now — full access is live.`
- "Free scan" was wrong for paid users who have full access

**Pre-checkout state**
- `Set your trade and patch. Then checkout — under 2 minutes. First scan is free while you wait.` → `Set your trade and patch — then complete payment via Stripe. Takes under 2 minutes. 30-day money-back. Cancel anytime.`
- "While you wait" was misleading (form submission redirects immediately to Stripe)

---

## Phase 4 — Site Health Check

### NEEDLE: Top 3 Issues Found
1. **Paywall copy uses "Pro"** — FindJobsPage upgrade banner says "Pro unlocks" but there's no "Pro" plan. Tradespeople who've only seen "Founder" or "Founding 30" are confused. **→ FIXED this run.**
2. **Weak Fill My Week CTA** — "FILL MY WEEK" button after results doesn't explain what it does vs. a regular scan. Opportunity to improve copy here (not fixed this run).
3. **Free/paid copy inconsistency** — Dashboard says "Gold leads shown to you first" (timing advantage) but FindJobsPage shows "████" locked fields (detail advantage). Two different value props in active conflict. Not fixed this run — requires aligning copy across 3 files.

### BUILDER Fix Applied
**`src/pages/FindJobsPage.tsx`** — upgrade banner:
- `Pro unlocks buyer name, job value band, and direct contact link — locked on every lead above.`
- → `Founding 30 members see the buyer's name, job value band, and direct contact link on every lead above — not shared with Checkatrade, Bark, or any other trade.`
- Named plan correctly ("Founding 30"), added competitor differentiation

### CRITIC: Yes — clearer in <3 seconds. "Founding 30 members see..." tells you exactly what you get for the money.
### REVENUE: Yes — removes plan-name confusion and adds competitor contrast at the moment a free user is considering upgrading.

---

## Next Run Priorities

1. **Fill My Week CTA copy** — "FILL MY WEEK" is unclear. Should say "EXPAND YOUR SCAN — 25mi radius, all sources, auto-ranked. Same scan allowance." (or similar)
2. **Free/paid value prop alignment** — Dashboard "first-mover timing" vs FindJobsPage "detail gate" contradicts. Pick one story: "Free = scored leads, no buyer contact. Paid = buyer name + WhatsApp routing + 24h lead advantage."
3. **Stripe live test** — still blocked on Vercel test keys. Confirm 4242 4242 4242 4242 → /dashboard?welcome=1 → profiles.plan flip
