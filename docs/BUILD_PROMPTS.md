# JobFilter — Autonomous Build Prompts

Each prompt is designed to be executed by an autonomous agent without clarification. Search before editing. Read before touching.

---

## 1. Lead Scoring Calibration

Review the lead scoring logic in `leadEngine/scorer.ts` and `leadEngine/normaliser.ts`. Identify any hardcoded weights that produce skewed GOLD/SILVER/BRONZE ratios across different trade types. Compare scoring distributions across the stored lead samples. Adjust weights so that GOLD (score >=90) represents roughly 10-20% of total leads for typical urban UK postcodes. Verify by re-scoring at least 5 sample leads and checking the output distribution. Do not change the scoring formula shape — only adjust weights.

---

## 2. Source Reliability Audit

Search `leadEngine/fetchers/` and `server/services/` for all active data source fetchers. For each source, check: (a) whether it has a `sourceConfidence` or equivalent reliability field, (b) whether stale data is flagged to the UI (look for `stale`, `checkedAt`, or `readiness` fields), (c) whether errors are surfaced in `sourceHealth` on the `LeadSearchResponse`. Add a `readiness` field to any fetcher missing it, using the `SourceStats` type in `src/lib/types.ts`. Ensure `sourceHealth` is returned on every `/api/find-jobs` response. Do not change API contracts — extend only.

---

## 3. Material Price Engine (Next Iteration)

The Material Price Engine page is at `src/pages/MaterialPriceEnginePage.tsx`. The API endpoint is `/api/material-prices`. Static benchmark data is also available in `src/components/MaterialEstimator.tsx`. Next iteration goals: (a) add a `MaterialEstimator` embed directly on the Material Price Engine page below the API results, pre-seeded with the searched trade; (b) add CSV export for paid users only — detect `useSubscription().active` from `src/lib/useSubscription.ts` and gate the export button behind it; (c) expand benchmark data in `MaterialEstimator.tsx` to cover at least 3 more trades (Painting, Landscaping, Gas/Heating). Do not modify the API fetching logic.

---

## 4. Paid Gating Audit

Search all page components in `src/pages/` for patterns where data is shown unconditionally that should require `useSubscription().active === true`. Key targets: (a) `contactPath` data on leads — should show upgrade prompt if `active === false`; (b) full lead details (buyer name, budget) on `FindJobsPage.tsx` — already partially gated via `lockedCount` but verify the lock is enforced server-side not just client-side; (c) material estimate CSV export; (d) source health breakdown. For each gating point found, add a visible upgrade prompt using the pattern established in `LeadDetailPage.tsx` (navy box with yellow CTA to `/pricing`). Do not add full UI blocks — always show partial value, then the prompt.

---

## 5. Owner/Superuser Access

The owner access system is in `src/lib/adminGuard.ts` and the UI is at `src/pages/AdminGuardPage.tsx`. Check that the owner email (`manazoid4@gmail.com`) bypasses subscription gating on all protected routes. Verify the `ProtectedRoute` component in `src/components/ProtectedRoute.tsx` correctly checks admin status. If any routes guard against non-admin owners, add the bypass. Also check `AGENT_RUNNING_MODEL.md` for the canonical owner access model. Do not create new auth flows — extend the existing `adminGuard` pattern only.

---

## 6. Outcome Tracking + ROI Reporting

The win/loss tracking system is in `src/lib/winStore.ts`. The outcome API is `/api/leads/outcome`. The dashboard shows win stats via `DashboardPage.tsx`. Extend the reporting to include: (a) a "Return on subscription" calculation — total value of won jobs this month divided by the 39 GBP subscription cost, displayed as `Nx return`; (b) a simple trade-level win rate (wins / (wins + losses) per trade) — add to `getWinBreakdown()` in `winStore.ts`; (c) display both on `DashboardPage.tsx` in the existing stats section. All data is local (localStorage); no backend changes needed. Ensure the calculation handles zero-state gracefully.

---

## 7. Comparison/SEO Expansion

The comparison pages live in `src/pages/Compare*.tsx` and `app/vs/*/page.tsx`. Existing pages cover Checkatrade, BuildAlert, Bark, MyBuilder, and RatedPeople. Add two more: (a) `src/pages/CompareLocalHeroPage.tsx` + `app/vs/local-hero/page.tsx` comparing JobFilter vs Local Heroes; (b) `src/pages/CompareHaMPage.tsx` + `app/vs/homeadvisor/page.tsx` comparing JobFilter vs HomeAdvisor. Follow the exact same component structure as `src/pages/CompareCheckatradePage.tsx`. Add both to the sitemap if one exists (`app/sitemap.ts` or similar). Do not add them to the main nav — they are SEO landing pages only.

---

## 8. WhatsApp Lead Delivery

The WhatsApp integration currently uses wa.me links (outbound from user). Build a server-side push trigger: when a GOLD lead (score >=90) is stored via the scan API, send a formatted WhatsApp message to the user's registered number. Store the API key in `.env.local` as `WHATSAPP_API_KEY`. The notification format should match `FIRST_TOUCH_TEMPLATE` from `src/lib/chaseTemplates.ts` but sent TO the user, not from them. Add a `notifyUserViaWhatsApp(lead, userPhone)` function in `server/services/whatsappNotifier.ts` using Twilio WhatsApp API. Do not expose the API key client-side and do not modify the existing wa.me link pattern.

---

## 9. Supabase Schema Audit

The Supabase client is configured in `src/lib/supabase/client.ts` and `src/lib/supabase/server.ts`. Check `supabase/migrations/` or `supabase/schema.sql` if they exist. Audit: (a) verify the `leads` table has `score`, `status`, `trade`, `postcode`, `created_at` columns; (b) verify the `subscriptions` table has `user_id`, `stripe_subscription_id`, `status`, `tier` columns; (c) check the `outcomes` table (created by `/api/leads/outcome`) has `lead_id`, `status`, `value`, `created_at`; (d) verify Row Level Security (RLS) is enabled on all tables. Output findings in `supabase/audit_report.md` with recommended SQL fixes. Do not run migrations automatically.
