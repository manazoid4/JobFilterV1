import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const route = readFileSync(new URL('../../app/api/leads/whatsapp/route.ts', import.meta.url), 'utf8');
const preferences = readFileSync(new URL('../../app/api/account/notifications/route.ts', import.meta.url), 'utf8');
const migration = readFileSync(new URL('../../supabase/migrations/20260722201000_whatsapp_consent.sql', import.meta.url), 'utf8');
const legacy = readFileSync(new URL('../../server/services/sms.ts', import.meta.url), 'utf8');

assert.match(route, /WHATSAPP_TEMPLATE_NAME/);
assert.match(route, /type: 'template'/);
assert.match(route, /Explicit WhatsApp opt-in is required/);
assert.match(route, /profile\?\.phone/);
assert.doesNotMatch(route, /const phone_number = String\(body\.phone_number/);
assert.match(preferences, /whatsapp_opt_in_at/);
assert.match(preferences, /whatsapp_opt_out_at/);
assert.match(preferences, /\.eq\('id', user\.id\)/);
assert.match(migration, /whatsapp_opt_in_at timestamptz/);
assert.match(migration, /whatsapp_opt_out_at timestamptz/);
assert.match(legacy, /Legacy WhatsApp delivery is disabled/);
assert.doesNotMatch(legacy, /type: 'text'/);
assert.doesNotMatch(legacy, /graph\.facebook\.com/);

console.log('WhatsApp consent regression passed');
