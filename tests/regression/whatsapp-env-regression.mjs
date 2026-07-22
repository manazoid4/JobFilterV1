import assert from 'node:assert/strict';
import fs from 'node:fs';

const sms = fs.readFileSync('server/services/sms.ts', 'utf8');
const env = fs.readFileSync('.env.example', 'utf8');

for (const key of ['WHATSAPP_PHONE_NUMBER_ID', 'WHATSAPP_ACCESS_TOKEN', 'WHATSAPP_TO']) {
  assert.match(env, new RegExp(`${key}=`), `.env.example must document ${key}`);
}

// Legacy Express-side WhatsApp delivery is now a disabled stub.
// Proactive delivery goes through the authenticated `/api/leads/whatsapp` App route.
assert.match(sms, /Legacy.*WhatsApp delivery is deliberately disabled/, 'sms.ts must document the disabled legacy delivery');
assert.doesNotMatch(sms, /graph\.facebook\.com/, 'disabled sms.ts must not call Meta Cloud API');
assert.match(sms, /provider:\s*'disabled'/, 'sms.ts must return disabled provider');

console.log('whatsapp env regression passed');
