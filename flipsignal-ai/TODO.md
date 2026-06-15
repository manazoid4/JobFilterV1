# FlipSignal AI — Manual Actions Required

> Claude cannot do these. Complete before deploying to production.

---

## CRITICAL

### 1. Provision Database
- Create a Postgres instance (Supabase or Neon).
- Set `DATABASE_URL` (pooled) and `DIRECT_URL` (direct) in Vercel env vars.
- Run `npx prisma migrate deploy` (or `npx prisma db push` for first deploy).
- Run `npx tsx prisma/seed.ts` to seed demo data (optional, for testing).

### 2. Set Up Clerk
- Create a Clerk application, set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY`.
- Configure a webhook → `/api/webhooks/clerk` for `user.created`/`user.updated`, set `CLERK_WEBHOOK_SECRET`.

### 3. Set Up Stripe
- Create PRO and ELITE products/prices, set `STRIPE_PRICE_PRO` / `STRIPE_PRICE_ELITE`.
- Register webhook → `/api/webhooks/stripe` for `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`. Set `STRIPE_WEBHOOK_SECRET`.

### 4. Set OPENAI_API_KEY
- Without it, all AI steps (classify/valuation/risk/copilot) fall back to heuristic mocks — functional but lower quality.

### 5. Deploy to Vercel
- New Vercel project, **Root Directory = `flipsignal-ai/`**.
- Build command is set via `vercel.json` (`prisma generate && next build`).
- Add all env vars from `.env.example`.
- Set `CRON_SECRET` and verify the `/api/cron/daily-pipeline` cron (06:00 daily, configured in `vercel.json`).

---

## SOON

- Implement real scraper adapters (`src/lib/scrapers/{facebook,ebay,gumtree}.ts` are currently mocked with TODOs — need Playwright/HTML scraping or eBay Browse API).
- Set `OBSIDIAN_VAULT_PATH` if Obsidian export of daily reports/flips is desired (ELITE feature).
- Configure PostHog (`NEXT_PUBLIC_POSTHOG_KEY`) and Sentry (`SENTRY_DSN`) for analytics/error tracking.
- Set up Trigger.dev project, point `TRIGGER_API_KEY`/`TRIGGER_PROJECT_ID` for the scrape and daily-pipeline jobs.

---

## Deep Research Follow-Up

- [ ] Run `/deep-research` (or equivalent) on FlipSignal competitors for pricing/positioning validation — see `COMPETITOR_STRATEGY.md` for current findings (Superflip AI, Underpriced AI, Apify arbitrage scrapers, ZIK Analytics, Tactical Arbitrage, Vendoo, AutoDS).
- [ ] Validate real sold-comp data sources (eBay Terapeak, Mercari/Poshmark sold listings) to improve `estimateValuation()` accuracy beyond heuristics.
- [ ] Research local-marketplace scam/risk patterns to refine `assessRisk()` heuristics and flags.
