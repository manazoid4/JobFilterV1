import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const legal = readFileSync(new URL('../../src/pages/LegalPage.tsx', import.meta.url), 'utf8');
const activation = readFileSync(new URL('../../src/pages/ActivationPendingPage.tsx', import.meta.url), 'utf8');

for (const provider of ['Supabase', 'Stripe', 'Resend', 'Vercel', 'Meta WhatsApp Cloud API']) {
  assert.match(legal, new RegExp(provider));
}
assert.match(legal, /Find a Tender access and its own saved-search alerts are free/);
assert.match(legal, /explicitly opt in/);
assert.doesNotMatch(legal, /via Twilio/);
assert.doesNotMatch(legal, /Lead scan inputs are not stored beyond the session/);
assert.doesNotMatch(legal, /no third-party analytics/);
assert.doesNotMatch(activation, /WhatsApp within 2 hours/);
assert.doesNotMatch(activation, /patch goes live within 2 hours/i);
assert.match(activation, /I explicitly opt in/);

console.log('privacy claims regression passed');
