---
tags: [jobfilter, todo, manual, blockers]
updated: 2026-05-31
---

# JobFilter — Manual Actions Required

These cannot be done autonomously. Complete before deploying latest changes to production.

---

## CRITICAL — Do First

### 1. Run Supabase Migration
**File:** `supabase/migrations/20260531_owner_access_and_status_fix.sql`

1. Supabase Dashboard → SQL Editor
2. Paste + run the migration file
3. Verify: `profiles` table has `role` column, `manazoid4@gmail.com` has `role = 'owner'`

Adds: owner role, lead status constraints, tier sync trigger.

---

### 2. Set Vercel Environment Variables

Vercel → JobFilter → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `JOBFILTER_SUPERUSER_EMAILS` | `manazoid4@gmail.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `STRIPE_WEBHOOK_SECRET` | From Stripe Dashboard → Webhooks |

Without these: owner access falls back to email-only, static build fails on some pages.

---

### 3. Register Stripe Webhook (if not done)

1. Stripe Dashboard → Developers → Webhooks → Add endpoint
2. URL: `https://jobfilter.uk/api/stripe/webhook`
3. Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Copy signing secret → paste as `STRIPE_WEBHOOK_SECRET` in Vercel

---

## SOON — After Critical

### 4. Verify Owner Access in Production
After migration + env vars + redeploy:
1. Log in as `manazoid4@gmail.com`
2. Check `/api/subscription/status` → `{ tier: "business", active: true, isOwner: true }`
3. Confirm full lead detail visible (contactPath, signalStack, opportunityAtoms)
4. Confirm source health loads without query-param

### 5. Redeploy Vercel
After adding env vars → Vercel Dashboard → Redeploy latest.

### 6. Check lead status data after migration
```sql
SELECT status, count(*) FROM leads GROUP BY status;
```

---

## Already Done (no action needed)

- Owner access logic implemented server-side
- Stripe webhook patched — will not downgrade owner
- Free user gating fixed — no contactPath/signalStack exposed to free tier
- Query-param paid bypass removed from source health
- Lead statuses expanded to 11 in types + UI
- Trade coverage improved (gas safe, HVAC, tiling, plastering, decorating)
- Lead scoring improved (ghost risk, data completeness, high-intent signals)
- Outcome reporting wired backend from LeadCard
- 3 new comparison pages: /vs/bark, /vs/mybuilder, /vs/rated-people
- All committed and pushed
