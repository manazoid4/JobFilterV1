# Changelog — 10 June 2026 (NightlyBuildAgent)

---

## Pre-flight

- Fresh container — `npm install` required before build (next binary missing, repo had HEAD detached at last night's commit `0a4530d`)
- `git checkout main && git pull` — already up to date
- Build GREEN after install, TypeScript CLEAN before starting
- Read: Daily To-Do, Changelog 2026-06-09, Feature Roadmap, Design Direction, Problems and Solutions

---

## Phase 1 — Fix Broken

- No broken imports across src/, app/, server/
- Both remaining `setSubmitted(true)` flows (WeeklySignalsPage AlertSubscribeModal, ProductAdvantagePage ServiceForm) confirmed wired to real `/api/waitlist` POST — no fake submit flows
- `extractTopJobTypes()` title-keyword fallback (shipped in last night's #249) confirmed present and correct

---

## Phase 2 — Feature Built: Companies House Lead Enrichment (Tier 1 quick win)

Roadmap Week 1-2 quick win: "Companies House signals — remove key-gate, make it a Pro feature, auto-enrich commercial leads."

**What was built:**
- `leadEngine/fetchers/companiesHouseFetcher.ts` — exported `getCompanySicLabel(sicCode)`, mapping SIC codes to plain-English industry labels (e.g. `43210` → "Electrical contractor", `41202` → "Commercial builder")
- `src/lib/companyDetails.ts` (new) — `parseCompanyDetails(description, source)` extracts "Incorporated: ...", "Co. No: ...", "SIC: ..." from a CompaniesHouse lead's description and returns `{ incorporated, companyNumber, industry }`
- `src/lib/types.ts` — added `description?: string` to `Lead` (API response) and `description?: string` / `source?: string` to `LeadDecision` (tracked-lead storage)
- `src/pages/FindJobsPage.tsx` — `trackLead()` now persists `source` + `description` when a lead is tracked
- `src/pages/LeadDetailPage.tsx` — new "COMPANY DETAILS" panel for CompaniesHouse leads:
  - **Paid tier** (description present): shows Industry, Incorporated date, Company No, plus a one-line "why it matters" hint
  - **Free tier** (description absent — `toFreePreviewLead` strips it): shows "COMPANY DETAILS LOCKED — unlocked at £39/mo"

**Why it matters:** Companies House "NEW BUSINESS" / "NEW FIRM" badges already showed on FindJobsPage for all tiers, but tapping through to LeadDetailPage gave no extra information — paid users got nothing for the upgrade. Now paid users see real company intelligence (industry type, how new the company is, company number for a quick Companies House lookup) — directly actionable for "call before someone else does."

**Touches:** `leadEngine/fetchers/companiesHouseFetcher.ts`, `src/lib/types.ts`, `src/lib/companyDetails.ts` (new), `src/pages/FindJobsPage.tsx`, `src/pages/LeadDetailPage.tsx`. No new dependencies, no scoring/label changes.

---

## Phase 3 — Copy Polish

| File | Before | After |
|---|---|---|
| AdminGuardTeaserPage.tsx:134 | "...the first module inside the Trade Command Centre — a dashboard built for..." | "...the first module inside TAX & ADMIN — a dashboard built for..." |
| BlueprintPage.tsx:806 | Scoreboard column label "Moat" | "Edge" |

**Why it matters:** "Trade Command Centre" sweep from 9 June (#248) missed this body-copy instance on AdminGuardTeaserPage. "Moat" is MBA jargon already fixed once on this page (9 June "Fusion is the moat" → "Stacking them isn't") but the SIGNAL SCOREBOARD column header still said "Moat" — now consistent.

---

## Phase 4 — Site Health Check

1. **NEEDLE:** FindJobsPage lead cards show **two** "UNLOCK FULL LEAD →" buttons stacked on mobile/tablet (<lg) for free-tier users — one mid-card (`lg:hidden`, added 18 May for above-the-fold visibility) and one in the locked-fields column (not hidden below `lg`)
2. **BUILDER:** Changed the locked-fields column CTA wrapper to `hidden lg:grid` — mid-card CTA now owns mobile/tablet, locked-column CTA owns desktop (`lg:hidden` mid-card already disappears there). Net: exactly one UNLOCK CTA per breakpoint, both prior NEEDLE fixes preserved.
3. **CRITIC:** Clearer in <3 seconds? Yes — one CTA per card instead of two identical stacked buttons.
4. **REVENUE:** Increases likelihood of paying £39/mo? Yes — removes visual clutter/decision fatigue around the single most important conversion action on the page, without removing any CTA.

---

## PR

- Pushed directly to `main`: `8e1103a`

---

## Open / Carried Forward

- Stripe live test — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (still blocked on test keys in Vercel)
- Spot-check review nudge — verify renders correctly once a paid test account has wins 24h+ old
- TradeFlow "Send to TradeFlow" button (blocked on URL scheme from founder)
- n8n workflow 16 (LLM Brief Builder) — still blocked on SMTP creds + manual activation

---

## Next Run Priorities

1. Spot-check the new COMPANY DETAILS panel against a real B14/commercial-trade scan with `COMPANIES_HOUSE_API_KEY` unset (DEMO_MODE) — confirm the "Incorporated: ... | SIC: ..." regex matches real mock descriptions and the panel renders cleanly on desktop + 375px
2. Continue jargon sweep — search remaining Trade*/Compare* pages for stray "Trade Command Centre" / "moat" / "signal engine" instances (two more found this run that prior sweeps missed)
3. Stripe live test — when Vercel test keys are available
