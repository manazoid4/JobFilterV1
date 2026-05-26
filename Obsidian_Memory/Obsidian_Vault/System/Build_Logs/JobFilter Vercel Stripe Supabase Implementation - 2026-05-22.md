# JobFilter Vercel + Stripe + Supabase Implementation
Date: 2026-05-22
Status: In Progress — Awaiting remaining keys

---

## Keys Requested (NOT values stored here)

| Key | Status |
|---|---|
| Supabase Project ID | ✅ Provided |
| Supabase URL (derived) | ✅ Derived from project ID |
| VITE_SUPABASE_ANON_KEY (sb_publishable) | ✅ Provided |
| SUPABASE_SERVICE_ROLE_KEY (sb_secret) | ✅ Provided |
| Vercel Project ID | ✅ Provided |
| VITE_STRIPE_PUBLISHABLE_KEY | ⚠️ From image — needs text confirmation |
| STRIPE_SECRET_KEY | ⚠️ From image — needs text confirmation |
| STRIPE_WEBHOOK_SECRET | ❌ Not yet provided |
| STRIPE_PRICE_FOUNDING | ❌ Not yet provided |
| STRIPE_PRICE_PRO | ❌ Not yet provided |
| STRIPE_PRICE_BUSINESS | ❌ Not yet provided |
| RESEND_API_KEY | ❌ Not yet provided |
| RESEND_FROM_EMAIL | ❌ Not yet provided |
| N8N_WEBHOOK_URL | ❌ Not yet provided |
| N8N_API_KEY | ❌ Not yet provided |
| VITE_SITE_URL | ❌ Not yet provided |
| VERCEL_TOKEN | ❌ Not yet provided (needed for CLI) |

---

## Files Changed

### New Files
- `src/lib/supabase.ts` — Frontend Supabase client (VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY)
- `server/lib/n8n.ts` — n8n webhook trigger utility
- `server/lib/resend.ts` — Resend email utility (welcome, paid confirmation, admin alert)
- `supabase/migrations/001_full_schema.sql` — Full schema migration with all tables + RLS

### Modified Files
- `server/lib/supabase.ts` — Added VITE_SUPABASE_URL fallback
- `server/routes/stripe.ts` — Full rewrite: all 6 webhook events, env price IDs, n8n triggers, Resend emails
- `.env.example` — Updated with all required env var names

---

## Supabase Tables Added

| Table | Status |
|---|---|
| waitlist | Pre-existing |
| leads | Pre-existing |
| chase_status | Pre-existing |
| outcomes | Pre-existing |
| delivery_events | Pre-existing |
| lead_outcomes | Pre-existing |
| territory_metrics | Pre-existing |
| user_entitlements | Pre-existing |
| profiles | ✅ Added (with RLS) |
| subscriptions | ✅ Added (with RLS) |
| payments | ✅ Added |
| saved_scans | ✅ Added (with RLS) |
| postcode_searches | ✅ Added |
| tool_outputs | ✅ Added |
| email_captures | ✅ Added |
| n8n_events | ✅ Added |

---

## Stripe Routes Added/Updated

- `POST /api/create-checkout-session` — Uses price IDs from env, falls back to inline amounts
- `POST /api/stripe/webhook` — Handles all 6 events:
  - checkout.session.completed ✅
  - customer.subscription.created ✅
  - customer.subscription.updated ✅
  - customer.subscription.deleted ✅
  - invoice.payment_succeeded ✅
  - invoice.payment_failed ✅

---

## n8n Automations Wired

Triggers fire for:
- new_paid_subscription (on checkout.session.completed)
- payment_failed (on invoice.payment_failed + subscription.deleted)

Remaining triggers to add once N8N_WEBHOOK_URL is provided:
- new_signup
- new_email_capture
- new_tool_use

---

## Resend Emails Wired

- Welcome email (on signup)
- Paid confirmation (on checkout.session.completed)
- Admin alert on new paid signup
- Admin alert on payment failure

---

## Build Status

- `npm run build` → ✅ Clean (1765 modules, 0 errors)
- Vercel deployment → ⏳ Pending (need VERCEL_TOKEN for CLI)
- Supabase migration → ⏳ Pending (run 001_full_schema.sql in Supabase SQL Editor)

---

## Blockers / Still Needed

1. **VERCEL_TOKEN** — needed to run `vercel env add` and deploy via CLI
2. **Stripe keys as text** — image was hard to read precisely; need confirmed values
3. **STRIPE_WEBHOOK_SECRET** — generate after adding the webhook endpoint in Stripe Dashboard
4. **Stripe Price IDs** — from Stripe Dashboard → Products (or create them)
5. **RESEND_API_KEY + RESEND_FROM_EMAIL**
6. **N8N_WEBHOOK_URL**
7. **VITE_SITE_URL** — your Vercel deployment URL (e.g. https://jobfilter.uk)

---

## Next 5 Tasks

1. User provides remaining keys → add to Vercel env vars
2. Run `001_full_schema.sql` in Supabase SQL Editor
3. Create Stripe products + price IDs, set STRIPE_PRICE_* env vars
4. Register Stripe webhook endpoint in Stripe Dashboard → get STRIPE_WEBHOOK_SECRET
5. Deploy to Vercel: `vercel --prod`
