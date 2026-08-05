# Changelog 2026-08-05

## NightlyBuildAgent Run

### Pre-flight
- Build: PASS (npm install required — fresh container, node_modules absent)
- TypeScript: CLEAN (0 errors)
- Vault files: not present in repo (created this run)

### Feature Assessment — Tier 1 Status

All Tier 1 features were already built by prior sessions:
- Scan counter (localStorage, weekly reset, shown only when OPEN_ACCESS !== true) — DONE
- Google Calendar ICS export (server route + frontend download + copy link) — DONE
- Won leaderboard (WinStatsBanner + /api/wins/stats from Supabase) — DONE
- WhatsApp template improvements (quick_quote_offer + availability_check in chaseTemplates.ts) — DONE
- Trade-specific scoring UX (TRADE_KEYWORDS in scorer, parseTradeReasons in FindJobsPage) — DONE

No new Tier 1 feature was needed this run.

### Phase 3 — Copy Polish

**HomePage (src/pages/HomePage.tsx)**
- Micro-label changed: `PUBLIC-WORKS QUALIFICATION FOR 5–25-PERSON CONTRACTORS` → `PUBLIC CONTRACT FILTER — FREE SCAN, NO CARD NEEDED`
- Hero paragraph: replaced disclaimer-heavy copy with fear-first hook — "Bidding the wrong public contract wastes weeks of bid time. JobFilter reads the current notice and tells you whether it fits your firm — BID, WATCH, SUBCONTRACT or SKIP — before you write a single page. Three free scans, no card."
- Lock note: replaced vague "Scan the current feed before deciding" with competitor callout — "Unlike BuildAlert and Planning Pipe — we check firm fit against each notice, not just trade type."
- Social proof strip: "Built for 5–25-person construction and maintenance firms" → "Built for contractors who need to know which public contracts are worth bidding — before they spend bid time"

**PricingPage (src/pages/PricingPage.tsx)**
- Header label: `FOUNDER-ASSISTED PILOT` → `FOUNDING MEMBER PILOT — £39/MO`
- Plan card body: shortened from 2-sentence disclaimer to direct "Check public tenders against your firm before you bid. Know the fit, the buyer and the deadline — then decide."
- FAQ: "Who is JobFilter for?" — removed "The pilot is designed for" (corporate); now "Built for 5–25-person contractors already looking at commercial and public works — not homeowners or sole traders on domestic jobs."
- FAQ: Coverage answer — added "No card needed" explicitly, replaced "empty result is a valid outcome" with "an empty result means no verified match, not a product failure"

### Phase 4 — Site Health

**NEEDLE identified (top 3 UX issues):**
1. WHY? button on lead score badge was 9px text, `px-1.5 py-0.5` — untappable on mobile
2. Score reason panel too narrow (w-36), text too small to read (9px)
3. "Source mix:" label in Patch Pulse exposed internal source terminology

**BUILDER fix applied:**
- `FindJobsPage.tsx`: WHY? → "WHY THIS SCORE?" with `min-h-[28px]`, `text-[10px]`, `border-2`, `px-2 py-1`
- Score reason panel: `w-36 → w-40`, `gap-0.5 → gap-1`, `text-[9px] → text-[10px]`
- "Source mix:" → "Verified signals:", "Best source this scan:" → "Strongest signal:"

**CRITIC verdict:** Yes — WHY THIS SCORE? is readable at a glance. Panel text legible without squinting.
**REVENUE verdict:** Yes — clearer score reason visibility helps users understand why a lead scores high, increasing perceived value of the product.

### Commit & PR
- Commit: `79ba3d6` — `[NightlyBuildAgent] Copy polish + site health: clearer hero, competitor callout, bigger score reasons button`
- PR: https://github.com/manazoid4/JobFilterV1/pull/439
- CI: in_progress at time of writing

### Next Run — Top 3 Priorities

1. **Competitor comparison page**: `/vs/planning-pipe` — full head-to-head page on firm fit checking vs keyword matching; BuildAlert comparison also missing
2. **Empty scan state copy**: the `EmptyScanReport` component (not read this run) likely has weak copy — check and tighten it following fear → proof → control
3. **Alert quick-setup CTA conversion**: after a successful scan, the `AlertQuickSetup` component sends to `/api/alerts` — verify this endpoint exists and the copy converts ("Get a weekly update for this trade and area")
