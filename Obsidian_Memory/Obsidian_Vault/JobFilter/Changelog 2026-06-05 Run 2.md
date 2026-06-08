# Changelog 2026-06-05 — NightlyBuildAgent Run 2

## Build Status
- **Build:** GREEN (106 pages)
- **TypeScript:** CLEAN

---

## Pre-flight

- Fresh container — `npm install` required, node_modules absent
- Build confirmed GREEN, TypeScript CLEAN before changes
- Run 1 priorities reviewed:
  1. PATCH PULSE source mix labels → verified `formatSourceLabel()` correctly maps all source system names (PlanningData→"Planning signal", ContractsFinder→"Contract signal", etc.) — no change needed
  2. Stripe live test → still blocked on test keys in Vercel, no action
  3. DashboardPage mobile sections → FIXED this run

---

## Phase 2 — Feature: Expose new WhatsApp templates in QuickResponseKit UI

### Problem
`quick_quote_offer` and `availability_check` were added to `chaseTemplates.ts` in a previous run but were unreachable from the QuickResponseKit UI (used on FindJobsPage lead cards). The `WA_TIMING_KEYS` allowlist only contained the 3 original timing templates.

### Fix — `src/components/QuickResponseKit.tsx`
- Renamed `WA_TIMING_KEYS` → `WA_TEMPLATE_KEYS`
- Added `'quick_quote_offer'` and `'availability_check'` to the tab allowlist
- Interleaved order: First Touch → Quick Quote → 24h Follow-up → Avail. Check → Final Nudge

### Fix — `src/lib/chaseTemplates.ts`
- Reordered template array so `quick_quote_offer` follows `first_touch_2h` and `availability_check` follows `follow_up_24h`
- Shortened labels: "Quick quote offer" → "Quick Quote", "Availability check" → "Avail. Check" (for compact tab display at 9px)
- Both templates now appear in LeadDetailPage AND QuickResponseKit tabs

**Result:** A paid tradesman on a Gold lead card can now access 5 WhatsApp templates (up from 3): First Touch, Quick Quote (same-day speed angle), 24h Follow-up, Avail. Check (diary-framing angle), Final Nudge.

---

## Phase 3 — Copy Polish

### PricingPage

**Plan bullet:**
- "One trade per postcode — you're not racing five strangers" → "One trade per postcode patch — no shared auction, no five-trade blast"
- Now uses the exact brand language from `Problems and Solutions.md`

**Objections:**
- "Is this another job board?" answer: added MyBuilder and BuildAlert to competitor list ("Checkatrade, MyBuilder, Bark, and BuildAlert sell the same lead to 5 trades at once")
- "Are leads shared?" answer: added "unlike Bark credits or Checkatrade matchups" for specificity

---

## Phase 4 — Site Health Check

### NEEDLE: Top 3 UX Issues Identified

1. **DashboardPage mobile: all 3 summary sections had grey "SCAN / TRACKING / RESULTS" micro-labels** — no colour differentiation on mobile when stacked vertically. SCAN section had no left-border accent. → FIXED this run
2. **QuickResponseKit: 2 new WhatsApp templates hidden from UI** — users couldn't access Quick Quote or Avail. Check templates → FIXED this run
3. **PricingPage: competitor objections named only Checkatrade + Bark** — MyBuilder and BuildAlert missed → FIXED this run

### BUILDER fix: DashboardPage section colour identity

**`src/pages/DashboardPage.tsx`:**
- SCAN section: added `borderLeftColor: 'var(--navy)', borderLeftWidth: '4px'` and `micro-label text-[var(--navy)]`
- TRACKING section: micro-label upgraded from `text-[var(--muted)]` → `text-[var(--orange)]`  
- RESULTS section: micro-label upgraded from `text-[var(--muted)]` → `text-[var(--green)]`

**CRITIC:** Yes — clearer in <3 seconds. Navy=scan, orange=tracking, green=results. A tradesman opening the dashboard on mobile now has instant visual anchors for each section.

**REVENUE:** Yes — a polished, readable dashboard reduces churn by making it easier to navigate the Find→Chase→Win flow.

---

## Next Run Priorities

1. **DashboardPage INTAKE hero section** — the top summary panel (plan name, area, trade) is the first thing a logged-in paid user sees. Check if it's doing the job for day-1 activation (prompting first scan, first WhatsApp send)
2. **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
3. **FindJobsPage upgrade nudge specificity** — the "SEEN ENOUGH?" section after leads says "unlock buyer, deadline, exact value, and action route" — could be more concrete about what a Gold lead looks like unlocked (name the 3 specific fields: buyer name, job value band, direct WhatsApp contact)
