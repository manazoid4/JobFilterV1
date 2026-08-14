# Daily To-Do — JobFilter

Last updated: 2026-08-14 (NightlyBuildAgent)

## DONE THIS RUN

- [x] Build green (npm run build + tsc --noEmit clean)
- [x] Audit Tier 1 features — all 5 already implemented in codebase
- [x] Trade-specific scoring UX: TRADE_TITLE_KEYWORDS map per trade, fallback in parseTradeReasons
- [x] WHY THIS? button: bigger, navy border, easier to tap on mobile
- [x] FindJobsPage upgrade CTA: competitor names (Checkatrade, MyBuilder, Bark) + no-auction copy
- [x] PricingPage: competitor comparison grid (Checkatrade/Bark/MyBuilder vs BuildAlert/PlanningPipe vs JobFilter)
- [x] Fix nanoid HIGH severity CVE (GHSA-2v37-7h3g-55p8) via package.json override ^3.3.18
- [x] PR #472 pushed and Vercel preview deployed
- [x] Vault changelog created

## NEXT RUN PRIORITIES

1. **Monitor PR #472** — merge once CI green + Meticulous visual regression completes
2. **LeadDetailPage copy polish** — apply fear/proof/control structure to the lead detail view
3. **Homepage hero** — add competitor mention (Checkatrade/MyBuilder/Bark) to the hero section for SEO and trust
4. **WinStatsBanner seeding** — if no wins data in Supabase, the banner never shows; consider showing a placeholder message ("Be the first in your area to log a win") for new areas
5. **postcss moderate CVE** — forced by Next.js dependency; check when Next.js 16.3.x lands to clear this

## BACKLOG

- Trade-specific scoring UX: extend TRADE_TITLE_KEYWORDS to include more CPV/tender keywords (scaffolding, fire safety, CCTV)
- Mobile testing: verify WHY THIS? button tap target on 375px viewport
- Alert signup UX: test that /api/alerts returns helpful error when not signed in
- VS comparison pages (bark, checkatrade etc): check copy for fear/proof/control structure
