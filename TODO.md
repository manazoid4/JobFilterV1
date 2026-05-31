# JobFilter — Manual Actions Required

> Claude cannot do these. Complete before deploying latest build to production.

---

## CRITICAL

### 1. Run Supabase Migration
File: `supabase/migrations/20260531_owner_access_and_status_fix.sql`

1. Supabase Dashboard → SQL Editor → paste + run
2. Verify: `profiles.role` column exists, `manazoid4@gmail.com` has `role = 'owner'`

Adds: owner role, lead status check constraints, tier sync trigger.

---

### 2. Set Vercel Environment Variables

| Variable | Purpose |
|----------|---------|
| `JOBFILTER_SUPERUSER_EMAILS` | `manazoid4@gmail.com` (comma-separate extras) |
| `NEXT_PUBLIC_SUPABASE_URL` | Fixes static build failure |
| `SUPABASE_SERVICE_ROLE_KEY` | Owner profile lookup via service client |
| `STRIPE_WEBHOOK_SECRET` | Webhook signature verification |

---

### 3. Register Stripe Webhook (if not done)

- URL: `https://jobfilter.uk/api/stripe/webhook`
- Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
- Copy signing secret → `STRIPE_WEBHOOK_SECRET` in Vercel

---

## SOON

- Verify owner access post-deploy: `/api/subscription/status` → `{ tier: "business", active: true, isOwner: true }`
- Redeploy Vercel after env var changes
- Check lead statuses: `SELECT status, count(*) FROM leads GROUP BY status;`

---

## Recently Completed (no action needed)

- Owner access: `server/lib/ownerAccess.ts` server-side, Stripe-safe
- Free gating: contactPath/signalStack/opportunityAtoms hidden from free tier
- Query-param bypass removed from source health
- Lead statuses: 11 values in types, UI, migration
- Trade aliases: gas safe, HVAC, tiling, plastering, decorating in normaliser
- Scoring: ghost risk, data completeness, high-intent signals improved
- Outcomes: LeadCard POSTs to `/api/leads/outcome`, localStorage fallback
- SEO: /vs/bark, /vs/mybuilder, /vs/rated-people added
