# FlipSignal AI

AI-powered marketplace arbitrage engine. Finds undervalued items on Facebook Marketplace,
eBay, Gumtree (and eventually Craigslist), predicts resale value with an AI pipeline,
ranks opportunities by expected profit, and tracks the full lifecycle of a flip from
discovery to sale.

## 1. Overview & Core Principle

Most "deal alert" tools only scrape listings and send notifications. FlipSignal AI goes
further:

- **Understands listings deeply** — an AI classification + feature-extraction step
  identifies category, brand, model, condition, urgency, and seller intent.
- **Models resale probability** — a valuation model estimates expected/worst/best resale
  value, and a profit engine turns that into a full cost/ROI breakdown.
- **Ranks by expected value** — a composite 0-100 Deal Score combines arbitrage gap,
  demand strength, resale velocity, listing quality, seller urgency, and category
  performance.
- **Tracks the full lifecycle** — every flip moves through
  `DISCOVERED → VIEWED → SAVED → CONTACTED → PURCHASED → LISTED → SOLD`, feeding a
  learning loop that improves category-level estimates over time.

## 2. Repo Structure

```
flipsignal-ai/
├── prisma/
│   ├── schema.prisma          # 17-model schema (see §3)
│   └── seed.ts                # demo data: 1 user, 2 scraper sources, 3 listings, 1 portfolio item, 1 daily report
├── trigger.config.ts          # Trigger.dev v3 project config
├── vercel.json                # build command, function durations, cron schedule
├── middleware.ts              # Clerk auth middleware (public: /, /sign-in, /sign-up, /api/webhooks, /api/cron)
├── .env.example
└── src/
    ├── app/
    │   ├── layout.tsx, page.tsx, globals.css   # root layout + marketing landing page
    │   ├── sign-in/[[...sign-in]]/page.tsx
    │   ├── sign-up/[[...sign-up]]/page.tsx
    │   ├── (dashboard)/
    │   │   ├── layout.tsx                      # sidebar shell
    │   │   ├── dashboard/page.tsx              # Deal Feed
    │   │   ├── deals/[id]/page.tsx             # Deal Detail
    │   │   ├── copilot/page.tsx                # Flip Copilot
    │   │   ├── portfolio/page.tsx              # Portfolio Tracker (kanban)
    │   │   ├── market/page.tsx                 # Market Intelligence
    │   │   ├── reports/page.tsx                # Daily Report viewer
    │   │   ├── alerts/page.tsx                 # Alert rules CRUD
    │   │   ├── settings/page.tsx               # notification channel settings
    │   │   ├── billing/page.tsx                # Stripe plan management
    │   │   └── analytics/page.tsx              # lightweight stats
    │   └── api/
    │       ├── listings/ingest/route.ts        # POST: run pipeline on NormalizedListing[]
    │       ├── listings/[id]/analyze/route.ts  # POST: re-run pipeline for one listing
    │       ├── deals/route.ts                  # GET: paginated FlipOpportunity feed (plan-gated)
    │       ├── copilot/route.ts                # POST: Flip Copilot (PRO+)
    │       ├── portfolio/route.ts              # GET/POST/PATCH: portfolio CRUD + lifecycle
    │       ├── alerts/route.ts                 # GET/POST/PATCH/DELETE: AlertRule CRUD
    │       ├── reports/daily/route.ts          # GET: latest DailyReport
    │       ├── settings/route.ts               # POST: save Telegram/Discord settings
    │       ├── billing/checkout/route.ts       # POST: Stripe Checkout session
    │       ├── billing/portal/route.ts         # POST: Stripe billing portal session
    │       ├── cron/daily-pipeline/route.ts    # GET: Vercel Cron entrypoint (CRON_SECRET)
    │       └── webhooks/{stripe,clerk}/route.ts
    ├── components/
    │   ├── ui/{button,card,badge,input}.tsx    # shadcn-style primitives
    │   ├── deal-card.tsx, score-badge.tsx, sidebar.tsx
    ├── lib/
    │   ├── db.ts                               # Prisma client singleton
    │   ├── utils.ts                            # cn(), formatCents()
    │   ├── stripe.ts, plan-gates.ts, rate-limit.ts, query-client.tsx
    │   ├── ai/
    │   │   ├── openai.ts                       # chatJSON<T> helper (zod-validated)
    │   │   ├── classify.ts                     # step 3
    │   │   ├── valuation.ts                    # step 5
    │   │   ├── risk.ts                         # step 6
    │   │   ├── dealscore.ts                    # step 7 (pure function)
    │   │   ├── pipeline.ts                     # orchestrates steps 1-9
    │   │   ├── copilot.ts                      # Flip Copilot
    │   │   ├── listing-generator.ts            # eBay listing copy generator
    │   │   └── negotiation.ts                  # negotiation scripts
    │   ├── scrapers/
    │   │   ├── types.ts                        # NormalizedListing, PlatformAdapter
    │   │   ├── facebook.ts, ebay.ts, gumtree.ts
    │   │   ├── dedupe.ts, rate-limiter.ts
    │   ├── notifications/
    │   │   ├── telegram.ts, discord.ts, dispatch.ts
    │   └── obsidian/export.ts                  # markdown export
    ├── store/use-filters.ts                    # Zustand deal-feed filters
    └── trigger/
        ├── scrape-listings.ts                  # every 30 min
        ├── ingestion-pipeline.ts               # per-listing task
        └── daily-pipeline.ts                   # 06:00 UTC daily roll-up
```

## 3. Database Schema

See `prisma/schema.prisma`. Tables:

| Model | Purpose |
| --- | --- |
| `User` | App user, linked to Clerk via `clerkId`, holds `planTier` and notification channel config |
| `Subscription` | Stripe subscription state (1:1 with User) |
| `ScraperSource` | Configured scraper job: platform + region + search query + interval |
| `Listing` | Normalized marketplace listing (unique on `platform` + `externalId`) |
| `ListingAnalysis` | AI classification + extracted feature scores (condition, urgency, seller intent, undervaluation, risk) |
| `ProfitEstimate` | Resale value range, fees, costs, ROI, time-to-sell, liquidity, profit distribution curve |
| `DealScore` | Composite 0-100 score + sub-scores + breakdown JSON |
| `FlipOpportunity` | Surfaced opportunity (score above threshold), with rank + reason tags |
| `PortfolioItem` | User's tracked flip, current lifecycle stage, purchase/list/sold prices |
| `FlipLifecycle` | Append-only stage-transition history for a PortfolioItem |
| `UserActionLog` | Learning-loop signal: accepted/rejected deals, views, saves |
| `CategoryStats` | Rolling category-level averages (resale value, ROI, time-to-sell) |
| `MarketSignal` | Detected anomalies (price anomaly, demand spike, hotspot) |
| `DailyReport` | Generated daily summary (global or per-user), with Obsidian export path |
| `MessageTemplate` | Saved negotiation/listing message templates |
| `AlertRule` | User-defined filter + notification channels |
| `NotificationLog` | Queued/sent/failed notification records |

All tables have `createdAt`/`updatedAt` (or equivalent) timestamps, JSONB columns for AI
outputs (`rawResponse`, `breakdown`, `profitDistribution`, `identifiedAttributes`,
`payload`, `filters`), and indexes on the columns used for feed filtering
(`status`, `scrapedAt`, `priceCents`, `score`, `category`).

## 4. AI Pipeline

`runIngestionPipeline()` in `src/lib/ai/pipeline.ts` runs the 9-step flow for every
listing:

1. **Ingest** — upsert into `Listing` (unique on `platform` + `externalId`)
2. **Normalize** — handled by scraper adapters before this point (`NormalizedListing`)
3. **Classify category** — `classifyListing()` → category/subcategory/brand/model
4. **Extract features** — derived `conditionScore`, `urgencyScore`, `sellerIntentScore`,
   `undervaluationProb` from the risk + deal-score outputs
5. **Compute valuation range** — `estimateValuation()` → expected/worst/best resale + confidence
6. **Run risk model** — `assessRisk()` → riskScore, riskLevel, flags (scam/fake/damaged/stolen_risk)
7. **Generate deal score** — `computeDealScore()` (pure function, weighted composite)
8. **Store opportunity** — if score ≥ 60, upsert `FlipOpportunity` with reason tags
9. **Notify** — queue `NotificationLog` rows for any `AlertRule` whose filters match

Every AI-calling step (`classify`, `valuation`, `risk`, `copilot`, `listing-generator`,
`negotiation`) falls back to a **local heuristic / mock** if `OPENAI_API_KEY` is missing
or the call fails, so the pipeline runs end-to-end without an API key (useful for the
seeded demo and local dev).

## 5. Background Jobs (Trigger.dev)

| File | Schedule | What it does |
| --- | --- | --- |
| `src/trigger/scrape-listings.ts` | every 30 min (`*/30 * * * *`) | Runs every active `ScraperSource` through its platform adapter, deduplicates results (`dedupe.ts`), fans out one `ingestion-pipeline` task per unique listing |
| `src/trigger/ingestion-pipeline.ts` | triggered per-listing | Wraps `runIngestionPipeline()` |
| `src/trigger/daily-pipeline.ts` | daily at 06:00 UTC (`0 6 * * *`) | Recomputes `CategoryStats` from sold portfolio items, detects `MarketSignal`s (price anomalies), generates the global `DailyReport`, exports to Obsidian, dispatches pending `NotificationLog` rows |

`src/app/api/cron/daily-pipeline/route.ts` is a Vercel Cron fallback that calls
`runDailyPipeline()` directly — useful if Trigger.dev isn't configured yet. Both paths
share the same implementation.

## 6. Frontend Screens

| Route | Shows |
| --- | --- |
| `/` | Marketing landing page with FREE/PRO/ELITE comparison |
| `/sign-in`, `/sign-up` | Clerk auth |
| `/dashboard` | Deal feed — `FlipOpportunity` cards ranked by score (FREE capped at 5 results) |
| `/deals/[id]` | Full listing + AI analysis + profit breakdown + deal score, "Send to Copilot" / "Add to Portfolio" |
| `/copilot` | Flip Copilot — paste a URL/description, get product ID, value range, safe offer, resale channels, risk flags, negotiation strategy (PRO+) |
| `/portfolio` | Kanban board across `FlipStage` columns |
| `/market` | `CategoryStats` table + `MarketSignal` feed |
| `/reports` | Latest `DailyReport` (top flips, emerging categories, anomalies, hotspots, risk warnings) |
| `/alerts` | `AlertRule` list + create form (category/minScore filters, channel) |
| `/settings` | Account info, Telegram chat ID, Discord webhook URL |
| `/billing` | Current plan, Stripe Checkout upgrade buttons, billing portal link |
| `/analytics` | Lightweight DB-derived stats (PostHog dashboards configured separately) |

## 7. Monetisation

| Tier | Features |
| --- | --- |
| **FREE** | Capped deal feed (`FREE_TIER_LIMITS.MAX_DEAL_FEED_RESULTS` = 5), basic alerts, manual scoring |
| **PRO** | Full deal feed, daily opportunity feed, profit engine, portfolio tracking, listing generator, negotiation assistant, Flip Copilot |
| **ELITE** | Everything in PRO + full automation, predictive sourcing, category intelligence, Telegram/Discord alerts, batch deal analysis |

Gating is centralized in `src/lib/plan-gates.ts`:

- `FEATURE_GATES` maps each feature to its minimum `PlanTier`.
- `hasAccess(planTier, feature)` / `requireFeature(planTier, feature)` are called from API
  routes (e.g. `src/app/api/copilot/route.ts` requires `FLIP_COPILOT` → PRO).
- `FREE_TIER_LIMITS` caps the deal feed for FREE users (enforced in
  `src/app/api/deals/route.ts` and `(dashboard)/dashboard/page.tsx`).

Stripe Price IDs are configured via `NEXT_PUBLIC_STRIPE_PRICE_PRO` /
`NEXT_PUBLIC_STRIPE_PRICE_ELITE` (`src/lib/stripe.ts`). Checkout is created in
`src/app/api/billing/checkout/route.ts`; the `Subscription` row and `User.planTier` are
kept in sync by `src/app/api/webhooks/stripe/route.ts`.

## 8. Obsidian Export System

When `OBSIDIAN_VAULT_PATH` is set, `src/lib/obsidian/export.ts` writes markdown into:

```
$OBSIDIAN_VAULT_PATH/FlipSignal/
├── Daily Reports/   YYYY-MM-DD.md
├── Deals/           {slug}-{flipOpportunityId}.md
├── Portfolio/        (reserved for portfolio-item exports)
├── Market Research/  (reserved for category/market-signal exports)
└── User Performance/ (reserved for learning-loop summaries)
```

Each flip note (`exportFlipToMarkdown`) has:

- YAML frontmatter: `title`, `score`, `roi_percent`, `expected_profit_cents`, `platform`,
  `url`, `surfaced_at`, `tags` (`flipsignal/deal`, `category/<slug>`, `reason/<tag>`)
- A profit breakdown table (acquisition price, expected/worst/best resale, fees,
  transport, refurb, time-to-sell, liquidity, ROI)
- A "Decision Log" checklist (Reviewed / Contacted / Purchased / Listed / Sold)
- "Related Flips" section with `[[wikilinks]]` to other flip notes

Daily report notes (`exportDailyReportToMarkdown`) contain the same JSON sections as the
`DailyReport` model, formatted as code blocks under headers.

## 9. Deployment to Vercel

1. **Create the Postgres database** (Supabase or Neon). Copy the pooled connection
   string into `DATABASE_URL` and the direct connection string into `DIRECT_URL`.
2. **Run migrations**: `npx prisma migrate deploy` (or `npm run db:migrate` locally first
   to generate the migration), then `npm run db:seed` for demo data.
3. **Clerk**: create an application, copy `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and
   `CLERK_SECRET_KEY`. Add a webhook endpoint → `https://<domain>/api/webhooks/clerk`
   subscribed to `user.created` / `user.updated`, copy the signing secret into
   `CLERK_WEBHOOK_SECRET`.
4. **Stripe**: create PRO and ELITE recurring Prices, set
   `NEXT_PUBLIC_STRIPE_PRICE_PRO` / `NEXT_PUBLIC_STRIPE_PRICE_ELITE`. Add a webhook
   endpoint → `https://<domain>/api/webhooks/stripe` subscribed to
   `checkout.session.completed`, `customer.subscription.updated`,
   `customer.subscription.deleted`, copy the signing secret into
   `STRIPE_WEBHOOK_SECRET`.
5. **OpenAI**: set `OPENAI_API_KEY` (optional — pipeline falls back to heuristics without it).
6. **Trigger.dev**: `npx trigger.dev@latest deploy` from `flipsignal-ai/`, set
   `TRIGGER_API_KEY` / `TRIGGER_PROJECT_ID`. This deploys `scrape-listings` and
   `daily-pipeline` as scheduled tasks.
7. **Vercel project**: import the `flipsignal-ai/` directory as the project root (Root
   Directory setting), set all env vars from `.env.example`, and set `CRON_SECRET` to a
   random string (Vercel Cron sends it as `Authorization: Bearer <CRON_SECRET>` —
   configure this via a custom header or an Edge Config / Vercel Cron secret).
8. **Deploy**. `vercel.json` already configures `buildCommand: "prisma generate && next build"`,
   function `maxDuration`s for AI-heavy routes, and the `0 6 * * *` cron for
   `/api/cron/daily-pipeline`.
9. **Optional**: set `OBSIDIAN_VAULT_PATH` only for local/self-hosted runs where a
   filesystem-backed Obsidian vault is reachable (not applicable on Vercel's serverless
   filesystem — run the daily pipeline locally or on a VM if Obsidian export is required).

## 10. Build Phases

**Phase 1 — Auth, DB, mock ingestion**
- `prisma/schema.prisma`, `prisma/seed.ts`, `src/lib/db.ts`
- Clerk wired via `middleware.ts`, `src/app/layout.tsx`, sign-in/sign-up pages
- `src/lib/scrapers/*` (mock adapters), `src/app/api/listings/ingest/route.ts`

**Phase 2 — Deal scoring engine + UI**
- `src/lib/ai/{classify,valuation,risk,dealscore,pipeline}.ts`
- `(dashboard)/dashboard/page.tsx`, `components/deal-card.tsx`, `components/score-badge.tsx`
- `src/app/api/deals/route.ts`, `src/store/use-filters.ts`

**Phase 3 — Profit engine + portfolio tracking**
- `src/lib/profit-engine.ts`
- `(dashboard)/portfolio/page.tsx`, `src/app/api/portfolio/route.ts` (lifecycle transitions via `FlipLifecycle`)

**Phase 4 — AI Copilot**
- `src/lib/ai/copilot.ts`, `src/lib/ai/listing-generator.ts`, `src/lib/ai/negotiation.ts`
- `(dashboard)/copilot/page.tsx`, `src/app/api/copilot/route.ts` (PRO+ gate via `plan-gates.ts`)

**Phase 5 — Automation + alerts**
- `src/trigger/*` (scrape-listings, daily-pipeline), `trigger.config.ts`
- `src/lib/notifications/*`, `(dashboard)/alerts/page.tsx`, `src/app/api/alerts/route.ts`
- `src/app/api/cron/daily-pipeline/route.ts`, `vercel.json` cron entry

**Phase 6 — Learning system**
- `UserActionLog` writes on accept/reject/save actions (extend `portfolio`/`deals` routes)
- `CategoryStats` recomputation in `daily-pipeline.ts` from sold `PortfolioItem`s
- `MarketSignal` detection (price anomalies) feeding back into `dealscore.ts` weighting
  via `CategoryStatsInput`

## 11. Example AI Prompts

**Classification** (`src/lib/ai/classify.ts` — `CLASSIFY_PROMPT`):
```
You are a product classification expert for a resale/flipping platform.
Given the listing details below, identify the product category, subcategory, brand, and model.

Title: {{title}}
Description: {{description}}
Price (cents): {{priceCents}}

Respond with a JSON object matching this shape:
{
  "category": string,
  "subcategory": string | null,
  "brand": string | null,
  "model": string | null
}
```

**Valuation** (`src/lib/ai/valuation.ts` — `VALUATION_PROMPT`):
```
You are a resale pricing expert. Estimate the realistic resale value range
for the following item if it were cleaned up and relisted on a marketplace like eBay.

Title: {{title}}
Description: {{description}}
Listed Price (cents): {{priceCents}}
Category: {{category}}
Subcategory: {{subcategory}}
Brand: {{brand}}
Model: {{model}}

Respond with a JSON object matching this shape:
{
  "expectedResaleCents": number,
  "worstCaseCents": number,
  "bestCaseCents": number,
  "confidence": number // 0-1
}
```

**Risk** (`src/lib/ai/risk.ts` — `RISK_PROMPT`):
```
You are a fraud and risk analyst for a secondhand goods marketplace.
Assess the risk of the following listing being a scam, fake/counterfeit item, damaged goods,
or stolen property.

Title: {{title}}
Description: {{description}}
Listed Price (cents): {{priceCents}}
Category: {{category}}
Subcategory: {{subcategory}}
Brand: {{brand}}
Model: {{model}}

Respond with a JSON object matching this shape:
{
  "riskScore": number, // 0-100
  "riskLevel": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "flags": string[] // e.g. "scam", "fake", "damaged", "stolen_risk"
}
```

**Flip Copilot** (`src/lib/ai/copilot.ts` — `COPILOT_PROMPT`):
```
You are FlipSignal Copilot, an expert resale negotiation and valuation assistant.
A user is considering buying the following item to flip for profit.

URL: {{url}}
Description: {{description}}

Analyze the item and respond with a JSON object matching this shape:
{
  "productId": string,
  "marketValueRange": { "min": number, "max": number }, // cents
  "safeOfferCents": number,
  "maxBuyCents": number,
  "resaleChannels": string[],
  "riskFlags": string[],
  "negotiationStrategy": string
}
```

**Deal Score** is a pure weighted function (no LLM call) — see
`src/lib/ai/dealscore.ts` for the full weighting documentation (arbitrage gap 30%,
demand strength 20%, resale velocity 15%, listing quality 15%, seller urgency 10%,
category performance 10%, with risk-level score caps).

Listing-copy generation (`src/lib/ai/listing-generator.ts` — `LISTING_GEN_PROMPT`) and
negotiation scripts (`src/lib/ai/negotiation.ts` — `NEGOTIATION_PROMPT`) follow the same
`chatJSON<T>` pattern.

## Local Development

```bash
cd flipsignal-ai
npm install
cp .env.example .env        # fill in DATABASE_URL at minimum; everything else has fallbacks
npm run db:migrate           # creates tables
npm run db:seed              # seeds demo data (1 user, 3 listings, 1 portfolio item, 1 daily report)
npm run dev
```

Without `OPENAI_API_KEY`, `CLERK_*`, or `STRIPE_*` configured, the app still runs: AI
calls fall back to heuristics, and pages that require auth will redirect to Clerk's
hosted sign-in (set up a free Clerk dev instance to test the full flow).
