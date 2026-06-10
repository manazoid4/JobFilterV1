# Changelog — 10 June 2026 (Run 3 — NightlyBuildAgent)

## Setup
- `node_modules` was missing entirely (fresh container) — `npm install` run before build/tsc would work. 359 packages installed, 14 known vulnerabilities (pre-existing, not addressed this run — `npm audit fix --force` would pull breaking majors).
- Build GREEN (106 pages), TypeScript CLEAN.

## Feature built — Commercial lead project scale (Tier 2 #12 follow-up)

Roadmap item #12 "Commercial lead detection" was already mostly built (isCommercial detection, scoring bonus, COMMERCIAL ONLY filter, Companies House enrichment). The roadmap's remaining ask was:

> "Show estimated project scale (larger = multiple trades needed = bigger opportunity)"

**Implementation:**
- `leadEngine/normaliser.ts` — new `calcProjectScale(value)`: `large` (≥£100k), `medium` (≥£25k), `small` (below). Computed only for `isCommercial` leads from the lead's value band.
- `leadEngine/types.ts` + `src/lib/types.ts` — `Lead.projectScale?: 'small' | 'medium' | 'large'` added (also added to `LeadDecision` for persistence).
- `server/routes/leadsSearch.ts` — `toFreePreviewLead()` now passes `projectScale` through to free-tier preview leads.
- `src/pages/FindJobsPage.tsx` — commercial leads with `projectScale === 'large'` get a white "LARGE PROJECT" badge next to the COMMERCIAL badge, plus a line: "Large commercial job — likely needs multiple trades on site". `trackLead()` now persists `isCommercial`/`projectScale` into `LeadDecision`.
- `src/pages/LeadDetailPage.tsx` — WHY THIS LEAD section gets two new conditional lines: "Commercial job — business buyer, not a homeowner" (any commercial lead) and "Large project — likely needs more than one trade on site" (large-scale commercial).

**Verification:**
- `npx tsc --noEmit` clean.
- `npm run build` — 106 pages, GREEN.
- `npx tsx codex-output/lead-engine-quality-regression.mjs` — passed.
- Live B14 electrical scan in DEMO_MODE: 5/10 leads commercial, projectScale correctly computed (`small`/`medium`/`large`) e.g. "CA18012 - Provision of Electrical Services £240k–£300k → large", "Electrical Contractor: SparkTech Electrical Ltd £8k–£60k → medium".

## Build status
- Build GREEN (106 pages)
- TypeScript CLEAN
- Pushed to `main` (`9820013`)

## Next run priorities
1. **Visual spot-check** — confirm LARGE PROJECT badge + WHY THIS LEAD lines render cleanly desktop + 375px on a real commercial lead (not done this run — Playwright not installed in container).
2. Fresh NEEDLE/UX pass — Tier 1 + this Tier 2 item now built; consider Tier 2 #15 (multi-channel follow-up) or #17 follow-ups, or another jargon/copy sweep.
3. Stripe live test — still blocked on test keys in Vercel.
4. TradeFlow "Send to TradeFlow" button — still blocked on URL scheme from founder.
5. n8n workflow 16 — still blocked on SMTP creds + manual activation.
