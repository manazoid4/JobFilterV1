import assert from 'node:assert/strict';
import fs from 'node:fs';

const sms = fs.readFileSync('server/services/sms.ts', 'utf8');
const env = fs.readFileSync('.env.example', 'utf8');

for (const key of ['WHATSAPP_PHONE_NUMBER_ID', 'WHATSAPP_ACCESS_TOKEN', 'WHATSAPP_TO']) {
  assert.match(sms, new RegExp(`process\\.env\\.${key}`), `sms service must read ${key}`);
  assert.match(env, new RegExp(`${key}=`), `.env.example must document ${key}`);
}

assert.match(sms, /graph\.facebook\.com\/v17\.0/, 'real WhatsApp delivery must use Meta Cloud API');
assert.match(sms, /provider:\s*'meta-whatsapp'/, 'sms service must label Meta WhatsApp delivery');

console.log('whatsapp env regression passed');
