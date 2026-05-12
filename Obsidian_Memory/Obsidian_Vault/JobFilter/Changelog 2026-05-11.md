---
type: changelog
date: 2026-05-12
repo: JobFilterV1
branch: fix/main-build
source: git
---

# JobFilter Changelog — 2026-05-11 (Last 24h)

## Summary
**22 commits** landed across the day. Heavy focus on **launch readiness**, **trust signals**, **pricing clarity**, and **UI polish** ahead of go-live. Two major Ralph loop iterations plus a trust-first MVP push.

---

## Major Themes

### 1. Trust & Credibility (Launch Blocker)
- **Trust Center** page built out with methodology, FAQ, sample lead cards
- **Trust Badges** added to leads (freshness indicators, territory locks, serious buyer scoring)
- **Guarantee & objections** handling added to pricing
- **Ghost Risk Badge** component created to flag stale leads
- **Serious Buyer Score** component with visual scoring card

### 2. Navigation & Routing Fixes
- Codex link restored to TopNav
- `/dev-portal` route fixed (was 404ing) then later removed from public routing
- `/intake-test` removed from public routing
- Nav contrast fixes across territories, leads, trust badges

### 3. Pricing & Plans
- Pricing contradictions fixed on compare pages
- "What You Get" section added to pricing
- PRO tier references cleaned up (removed non-existent tier mentions)
- Homepage urgency messaging added

### 4. Content & Copy Fixes (Loops 10–18)
- Loop 18: Fixed remaining `.co.uk` domain refs and dead intake-test links
- Loop 17: Fixed RSS copy feedback and wrong domain in WeeklySignalsPage
- Loop 16: Fixed lock-in copy on compare pages
- Loop 15: Fixed remaining PRO tier and lock-in copy in BuildUkAlternativePage
- Loop 14: Fixed dead dev-portal links on CodexPage and TradieStack CTA copy
- Loop 13: Added missing CTAs on EPC letter service and ForYourTrade scan panel
- Loop 12: Removed ops label and fixed non-existent PRO tier reference
- Loop 11: Fixed TradePage pricing copy and dead-end Standard plan card
- Loop 10: Fixed pricing contradictions on compare pages

### 5. API & Backend
- PostJobPage form wired to real API endpoint
- Dashboard empty state improved

---

## Commit Detail

| Hash | Time | Message | Author |
|------|------|---------|--------|
| `73d819c` | 20:27 | Ralph loop v2: Trust badges in leads, scoring card icons, What You Get section, Pricing guarantee+objections, homepage urgency | manazoid4 |
| `a873826` | 19:56 | Fix CSS specificity: `.jf-box` background overrides Tailwind `bg-` utilities | manazoid4 |
| `75275a5` | 19:41 | Ralph loop: Fix nav contrast, locks, territories, leads, trust badges, freshness indicators, guarantee | manazoid4 |
| `dd0a734` | 19:25 | Launch-ready: Trust Center, Methodology, FAQ, Sample Lead, Trust Badges, Nav fixes | manazoid4 |
| `2c23692` | 19:09 | Add Codex back to TopNav navigation | manazoid4 |
| `eadd9f9` | 17:57 | Fix dev portal 404 — restore missing `/dev-portal` route | manazoid4 |
| `76174af` | 16:51 | Merge `fix/main-build` into `main` | manazoid4 |
| `dd78ea9` | 16:08 | Trust-first MVP: UI fixes, new pages, content | manazoid4 |
| `b8e70c5` | 11:27 | Loop 18: fix remaining co.uk domain refs and dead intake-test links (#98) | manazoid4 |
| `9ed900f` | 11:24 | Loop 17: fix RSS copy feedback and wrong domain in WeeklySignalsPage (#97) | manazoid4 |
| `c8140e0` | 11:22 | Loop 16: fix lock-in copy on compare pages missed in Loop 10 (#96) | manazoid4 |
| `d8137a9` | 11:21 | Loop 15: fix remaining PRO tier and lock-in copy in BuildUkAlternativePage (#95) | manazoid4 |
| `d79244d` | 11:17 | Loop 14: fix dead dev-portal links on CodexPage and TradieStack CTA copy (#94) | manazoid4 |
| `d3c27ce` | 11:15 | Loop 13: add missing CTAs on EPC letter service and ForYourTrade scan panel (#93) | manazoid4 |
| `99aee67` | 11:13 | Loop 12: remove ops label and fix non-existent PRO tier reference (#92) | manazoid4 |
| `0c6f514` | 11:11 | Loop 11: fix TradePage pricing copy and dead-end Standard plan card (#91) | manazoid4 |
| `ce466e7` | 11:09 | Loop 10: fix pricing contradictions on compare pages (#90) | manazoid4 |
| `cc50e9f` | 11:04 | Wire PostJobPage form to real API endpoint (#89) | manazoid4 |
| `8a5b2e0` | 11:03 | Remove `/intake-test` from public routing; improve dashboard empty state (#88) | manazoid4 |
| `55b1f14` | 11:01 | Remove `/dev-portal` from public routing (#87) | manazoid4 |
| `e9ff2b4` | 10:59 | *(truncated in log)* | manazoid4 |

---

## Files Changed (High Touch)

### New Components
- `src/components/GhostRiskBadge.tsx` — Freshness/staleness indicator
- `src/components/SampleLeadCard.tsx` — Trust demo lead card
- `src/components/SeriousBuyerScore.tsx` — Scoring visual

### Heavily Modified Pages
- `src/pages/TrustCenterPage.tsx` — +260 lines, full rewrite
- `src/pages/MethodologyPage.tsx` — +225 lines, new page
- `src/pages/TerritoriesPage.tsx` — +219 lines, expanded
- `src/pages/FaqPage.tsx` — +108 lines, expanded
- `src/pages/HomePage.tsx` — +60 lines, urgency + trust badges
- `src/pages/PricingPage.tsx` — +22 lines, guarantee section
- `src/pages/FindJobsPage.tsx` — +8 lines, trust signals

### Style Fixes
- `src/index.css` — `.jf-box` specificity fix

---

## Risk Flags
- ⚠️ `/dev-portal` was added back then removed — check if any external links still reference it
- ⚠️ PRO tier references purged — confirm no Stripe/plan logic depends on it
- ⚠️ Domain refs changed from `.co.uk` — verify DNS/email configs

## Next Actions
- [ ] Verify trust badges render correctly on mobile
- [ ] Check API endpoint wiring in staging
- [ ] Confirm all `/dev-portal` and `/intake-test` backlinks are dead
- [ ] Review pricing page for remaining contradiction

---

## Related
- [[JobFilter Map]]
- [[Progress]]
- [[System/System]]
- [[Routine - GitHub Sync]]
