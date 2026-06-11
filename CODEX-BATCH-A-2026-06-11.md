| # | Task | Status | Files |
|---|---|---|---|
| 1 | Harden Stripe checkout | Complete | `app/api/stripe/checkout/route.ts` |
| 2 | Unify lead tier thresholds | Complete | `leadEngine/thresholds.ts`, `leadEngine/scorer.ts`, `server/services/decisionScoring.ts`, `server/services/leadNormalizer.ts`, `server/routes/leadsSearch.ts`, `src/components/ScoreBadge.tsx`, `src/components/SeriousBuyerScore.tsx`, `src/components/QuickResponseKit.tsx`, `src/components/EpcSignalCard.tsx`, `src/components/KeywordSearch.tsx`, `src/pages/FindJobsPage.tsx`, `src/pages/FreeToolsPage.tsx`, `src/pages/HomePage.tsx`, `src/pages/LeadDetailPage.tsx`, `src/pages/LeadListPage.tsx` |
| 3 | Gate dev pages | Complete | `app/test/page.tsx`, `app/dev-portal/page.tsx` |
| 4 | Rate limiting | Complete | `src/lib/rateLimit.ts`, `app/api/leads/whatsapp/route.ts`, `app/api/waitlist/route.ts`, `app/api/ai/score-lead/route.ts` |
| 5 | Webhook retry semantics | Complete | `app/api/stripe/webhook/route.ts` |
| 6 | Dependency vulnerabilities | Partial | `package-lock.json`; `npm audit fix` reduced production audit to 2 moderate Next/PostCSS advisories requiring `--force`, which npm reports as a breaking downgrade path. |
| 7 | Root debris cleanup | Complete | Removed root fix/migration scripts and ignored build debris. |
