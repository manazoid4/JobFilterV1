import assert from 'node:assert/strict';
import fs from 'node:fs';

const checkout = fs.readFileSync('app/api/stripe/checkout/route.ts', 'utf8');
const webhook = fs.readFileSync('app/api/stripe/webhook/route.ts', 'utf8');
const portal = fs.readFileSync('app/api/customer-portal/route.ts', 'utf8');
const checkoutButton = fs.readFileSync('src/components/CheckoutButton.tsx', 'utf8');
const activation = fs.readFileSync('src/pages/ActivationPendingPage.tsx', 'utf8');
const account = fs.readFileSync('src/pages/AccountPage.tsx', 'utf8');
const pricing = fs.readFileSync('src/pages/PricingPage.tsx', 'utf8');
const navigation = fs.readFileSync('src/components/TopNav.tsx', 'utf8');

// Checkout ownership must come from the verified Supabase session, never request JSON.
for (const text of [
  'createAuthServerClient',
  'authClient.auth.getUser()',
  'client_reference_id: checkoutIdentity.userId',
  'subscription_data:',
  'user_id: checkoutIdentity.userId',
]) {
  assert.ok(checkout.includes(text), `authenticated checkout contract missing: ${text}`);
}
for (const untrustedIdentity of ['body.email', 'body.userId', 'body.user_id']) {
  assert.ok(!checkout.includes(untrustedIdentity), `checkout trusts client identity: ${untrustedIdentity}`);
}
assert.ok(!checkoutButton.includes('email,'), 'shared checkout button sends an email identity');
assert.ok(!checkoutButton.includes('userId,'), 'shared checkout button sends a user ID identity');
assert.ok(!activation.includes('email: data.user'), 'activation checkout sends an email identity');
assert.ok(!activation.includes('userId: data.user'), 'activation checkout sends a user ID identity');

// Webhook acknowledgement must happen only after a verified, successful state transition.
assert.ok(webhook.includes('const rawBody = await request.text()'), 'webhook does not verify the raw request body');
assert.ok(webhook.includes('stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)'), 'webhook signature verification missing');
const processIndex = webhook.indexOf('await processEvent(stripe, admin, event)');
const processedIndex = webhook.indexOf('await markEventProcessed(admin, event.id, event.type)');
assert.ok(processIndex >= 0 && processedIndex > processIndex, 'event is marked processed before domain writes succeed');
assert.ok(webhook.includes("{ status: 500 }"), 'processing failures are not returned to Stripe as retryable failures');
assert.ok(!webhook.includes('Still return 200'), 'webhook still acknowledges failed processing');
assert.ok(webhook.includes("error?.code === '23505'"), 'duplicate webhook insert races are not handled idempotently');

// Billing portal lookup is session-owned and maps only the current user to Stripe.
for (const text of [
  'createAuthServerClient',
  'authClient.auth.getUser()',
  ".eq('user_id', userId)",
  'stripe.billingPortal.sessions.create',
]) {
  assert.ok(portal.includes(text), `authenticated portal contract missing: ${text}`);
}
assert.ok(!portal.includes('request.json'), 'billing portal accepts client-provided customer identity');

// Account lifecycle states must be visible and recoverable from native navigation.
assert.ok(navigation.includes("{ to: '/account', label: 'Account' }"), 'signed-in navigation does not expose Account');
for (const text of ['PAYMENT NEEDS ATTENTION', 'FIX PAYMENT DETAILS', 'SUBSCRIPTION CANCELLED', 'REACTIVATE']) {
  assert.ok(account.includes(text), `account lifecycle UI missing: ${text}`);
}
for (const text of ['CHECKOUT CANCELLED', 'No payment was taken', 'RETURN TO ACCOUNT']) {
  assert.ok(pricing.includes(text), `checkout cancellation UI missing: ${text}`);
}

console.log('stripe account lifecycle regression passed');
