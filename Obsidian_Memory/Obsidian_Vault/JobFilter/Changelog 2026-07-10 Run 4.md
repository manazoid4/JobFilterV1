# Changelog — 10 July 2026 (NightlyBuildAgent Run 4)

**Commit:** `71b152c`
**Build:** GREEN (113 pages)
**TypeScript:** CLEAN

---

## Changes Made

### Phase 1 — Fix Broken
- No broken imports, no fake flows. Phase 1 clean.

### Phase 2 — Tier 1 Features
- All Tier 1 features confirmed BUILT. No action required.

### Phase 3 — NEEDLE / Site Health

**NEEDLE findings (top 3):**
1. LeadDetailPage: confirmed/snoozed button states using `bg-[var(--green)]` — violates design rule (green = data indicator only)
2. LeadDetailPage: `ADD TO CALENDAR` primary yellow button missing → arrow
3. DashboardPage: SEE PLANS CTA missing £39/mo anchor — DISMISSED (paragraph above already has "£39/mo pays for itself 50 times over")

**BUILDER fix (highest-impact):**
- `LeadDetailPage.tsx` lines 695 + 703: snoozed state + email-sent state `bg-[var(--green)]` → `bg-[var(--navy)]`. Green is reserved for data indicators, not interactive confirmed states.

**CRITIC check:** Fix is clearer in <3 seconds — confirmed state now reads as a secondary navy button, not a mystery green chip. YES.

**REVENUE check:** Does it increase likelihood of paying £39/mo? Indirectly — professional consistent design builds trust. YES.

### Phase 3 — Copy Polish

**LeadDetailPage (`src/pages/LeadDetailPage.tsx`)**
- `ADD TO CALENDAR` → `ADD TO CALENDAR →` — primary yellow CTA was missing arrow

**HomePage (`src/pages/HomePage.tsx`)**
- Hero paragraph: "serious construction work near you" → "serious construction work in your postcode" — specificity rule (postcode beats vague "near you")

**ForYourTradePage (`src/pages/ForYourTradePage.tsx`)**
- Buyer-locked caption: `text-[10px]` → `text-xs` — same legibility sweep applied in Jul 7 Run 3 (TradePage component was fixed; ForYourTradePage has its own copy)
- Scan CTA: `SCAN {trade} JOBS NOW` → `SCAN {trade} JOBS NOW →` — missing arrow on primary ink CTA

**TrustCenterPage (`src/pages/TrustCenterPage.tsx`)**
- `LOCK YOUR PATCH — £39/MO` → `LOCK YOUR PATCH — £39/MO →` — secondary CTA was missing arrow

---

## Carryover (Unchanged from Run 3)

- [ ] **Founder decision — add-on service pricing**: 14 add-on services still have no £ shown
- [ ] **Stripe live test**: blocked on test keys in Vercel
- [ ] **TradeFlow "Send to TradeFlow" button**: blocked on URL scheme from founder
- [ ] **n8n workflow 16 (LLM Brief Builder)**: blocked on SMTP creds + manual activation
- [ ] **Do NOT delete `vite.config.ts`/`index.html`**: confirmed in use by `server/app.ts`

---

## Next Run Priorities

1. Check for new founder commits/PRs first
2. `text-[10px]` in FindJobsPage (29 instances) — many are intentional status chips; review to confirm or fix user-visible ones
3. Investigate any authenticated page copy drift (AdminGuardPage, AdminGuardTeaserPage) — these are recurring regression targets
