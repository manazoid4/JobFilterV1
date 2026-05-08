# Stripe Integration

> Status: Test mode. Use `sk_test_` + `pk_test_` keys only. Never commit live keys.

---

## Architecture

```
PricingPage.tsx → CheckoutButton.tsx → POST /api/create-checkout-session → Stripe Checkout
                                                                    ↓
                                                         checkout.session.completed
                                                                    ↓
                                                  POST /api/stripe/webhook → update user status
```

- **Client**: `src/components/CheckoutButton.tsx` — calls `/api/create-checkout-session`
- **Server (Express)**: `server/routes/stripe.ts` — creates sessions + handles webhooks
- **Firebase Functions**: `functions/stripe.ts` — same logic for Firebase deployment
- **Webhook**: verifies Stripe signatures before processing

---

## Pricing Tiers

| Tier | Monthly | Annual (billed yearly) | Stripe amount (pence) |
|---|---|---|---|
| Founding 30 | £29/mo | £240/yr | 2900 / 24000 |
| Pro | £49/mo | £408/yr | 4900 / 40800 |
| EPC Signal Engine | £19/mo | — | 1900 |

All amounts in **pence** (Stripe's unit). GBP, no decimals.

---

## Founding 30 Enforcement

- Hard cap: **30 users max**
- Checked at checkout session creation time
- Queries `payments` collection for active founding subscriptions
- Returns `409 Conflict` if slots full — user redirected to Pro tier
- See [[Launch Checklist]] for production enforcement

---

## Endpoints

### POST `/api/create-checkout-session`

Creates a Stripe Checkout session and returns the redirect URL.

**Request body:**
```json
{
  "tier": "founding" | "pro" | "epc",
  "billing": "monthly" | "annual",
  "email": "user@example.com",
  "userId": "optional-firebase-uid"
}
```

**Response:**
```json
{ "url": "https://checkout.stripe.com/..." }
```

**Errors:**
- `409` — Founding 30 slots full
- `503` — Stripe not configured or session creation failed

### POST `/api/stripe/webhook`

Receives Stripe webhook events. **Must have raw body** (not JSON-parsed) for signature verification.

**Events handled:**
- `checkout.session.completed` — payment succeeded, activate user
- `invoice.payment_failed` — subscription payment failed, mark past_due

**Headers required:**
- `stripe-signature` — Stripe's webhook signature

---

## Webhook Setup (Stripe Dashboard)

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://jobfilter.uk/api/stripe/webhook`
3. Select events: `checkout.session.completed`, `invoice.payment_failed`
4. Copy the **Signing Secret** (`whsec_...`)
5. Set as `STRIPE_WEBHOOK_SECRET` in env vars

**Local dev:**
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

## Firebase Schema

### `payments` collection
| Field | Type | Notes |
|---|---|---|
| `stripeSessionId` | string | Stripe session ID |
| `stripeCustomerId` | string | Stripe customer ID |
| `stripeSubscriptionId` | string | Stripe subscription ID |
| `tier` | string | `founding` / `pro` / `epc` |
| `billing` | string | `monthly` / `annual` |
| `email` | string | Customer email |
| `userId` | string | Firebase auth UID (optional) |
| `amount` | number | Amount in pence |
| `status` | string | `active` / `past_due` / `cancelled` |
| `paidAt` | string | ISO timestamp |

### `users` collection (updated on payment)
| Field | Type | Notes |
|---|---|---|
| `tier` | string | Current tier |
| `billing` | string | Billing cycle |
| `status` | string | `active` / `past_due` / `cancelled` |
| `stripeCustomerId` | string | For webhook lookups |
| `stripeSubscriptionId` | string | For subscription management |
| `paidAt` | string | Last payment timestamp |

---

## Environment Variables

| Variable | Where | Example |
|---|---|---|
| `STRIPE_SECRET_KEY` | Server + Functions | `sk_test_51...` |
| `STRIPE_PUBLISHABLE_KEY` | Client (Vite) | `pk_test_51...` |
| `STRIPE_WEBHOOK_SECRET` | Server + Functions | `whsec_...` |

**Never expose `STRIPE_SECRET_KEY` or `STRIPE_WEBHOOK_SECRET` in client code.**

---

## Testing

1. Use Stripe test cards: `4242 4242 4242 4242` (success), `4000 0000 0000 0002` (decline)
2. Run `stripe listen` locally to forward webhooks
3. Check `/api/waitlist/count` to verify founding slot tracking
4. Verify Firestore/Firebase `payments` collection after test checkout

---

## TODO (post-launch)

- [ ] Subscription cancellation endpoint
- [ ] Proration handling for tier upgrades
- [ ] Dunning management for failed payments
- [ ] Customer portal (self-service billing)
- [ ] Receipt emails via Resend
- [ ] Switch to `sk_live_` keys

---

## Connections

- [[Pricing]]
- [[Stripe Keys Reference]]
- [[Launch Checklist]]
