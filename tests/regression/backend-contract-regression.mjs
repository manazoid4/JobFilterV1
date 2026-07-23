import fs from 'node:fs';
import assert from 'node:assert/strict';

const sms = fs.readFileSync('server/services/sms.ts', 'utf8');
const env = fs.readFileSync('.env.example', 'utf8');
const schema = fs.readFileSync('supabase/schema.sql', 'utf8');
const app = fs.readFileSync('server/app.ts', 'utf8');

for (const key of ['WHATSAPP_PHONE_NUMBER_ID', 'WHATSAPP_ACCESS_TOKEN', 'WHATSAPP_TO']) {
  assert.match(env, new RegExp(`${key}=`), `.env.example must document ${key}`);
}

// Legacy Express-side WhatsApp delivery is now a disabled stub.
assert.match(sms, /Legacy.*WhatsApp delivery is deliberately disabled/, 'sms.ts must document the disabled legacy delivery');
assert.doesNotMatch(sms, /graph\.facebook\.com/, 'disabled sms.ts must not call Meta Cloud API');

assert.match(schema, /delivery_lock_key\s+TEXT/i, 'delivery_events schema must include delivery_lock_key');
assert.match(app, /registerSourceConfigRoute\(app\)/, 'source config route must be registered');

console.log('backend contract regression passed');
