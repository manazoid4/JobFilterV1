import assert from 'node:assert/strict';
import fs from 'node:fs';

const sms = fs.readFileSync('server/services/sms.ts', 'utf8');
const env = fs.readFileSync('.env.example', 'utf8');

for (const key of ['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN', 'TWILIO_WHATSAPP_FROM', 'TWILIO_WHATSAPP_TO']) {
  assert.match(sms, new RegExp(`process\\.env\\.${key}`), `sms service must read ${key}`);
  assert.match(env, new RegExp(`${key}=`), `.env.example must document ${key}`);
}

assert.match(sms, /const hasRequiredEnv =[\s\S]*process\.env\.TWILIO_AUTH_TOKEN/, 'real WhatsApp delivery must require TWILIO_AUTH_TOKEN before sending');
assert.match(sms, /provider:\s*'stub'/, 'sms service must keep safe stub mode when keys are missing');

console.log('whatsapp env regression passed');
