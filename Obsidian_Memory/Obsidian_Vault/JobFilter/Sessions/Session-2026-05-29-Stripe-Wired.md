# Session 2026-05-29 — Stripe Wired

Wired Stripe Checkout end-to-end. PR #222 merged to main.

## What landed

- `src/lib/stripe.ts` — server-only helper: `getStripe()`, `resolvePriceId(tier, billing)`, `getAppOrigin(request)`.
- `app/api/stripe/checkout/route.ts` — accepts `{ priceId, plan }`, returns `{ url, sessionId }`. `success_url` → `/dashboard?welcome=1`. `cancel_url` → `/pricing?cancelled=1`. Metadata carries `user_id` + `plan` (snake_case) for the webhook.
- `app/api/stripe/webhook/route.ts` — reads snake_case metadata, upserts `profiles.stripe_customer_id` alongside `profiles.plan` on `checkout.session.completed`.

## Open

Live test still needs Stripe test key set in Vercel env. `vercel env ls` requires `vercel link` from the worktree — not done in this session. Env var names listed in PR #222 body and Daily To-Do.

## Links

- [[Daily To-Do]]
- [[Problems and Solutions]]
- PR: https://github.com/manazoid4/JobFilterV1/pull/222
