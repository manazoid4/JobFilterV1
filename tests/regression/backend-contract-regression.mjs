import fs from 'node:fs';
import assert from 'node:assert/strict';

const sms = fs.readFileSync('server/services/sms.ts', 'utf8');
const env = fs.readFileSync('.env.example', 'utf8');
const schema = fs.readFileSync('supabase/schema.sql', 'utf8');
const app = fs.readFileSync('server/app.ts', 'utf8');
const workflows = fs.readdirSync('n8n-workflows')
  .filter((file) => file.endsWith('.json'))
  .map((file) => [file, fs.readFileSync(`n8n-workflows/${file}`, 'utf8')]);

for (const key of ['WHATSAPP_PHONE_NUMBER_ID', 'WHATSAPP_ACCESS_TOKEN', 'WHATSAPP_TO']) {
  assert.match(sms, new RegExp(`process\\.env\\.${key}`), `sms service must read ${key}`);
  assert.match(env, new RegExp(`${key}=`), `.env.example must document ${key}`);
}

assert.match(sms, /graph\.facebook\.com\/v17\.0/, 'WhatsApp delivery must use Meta Cloud API');
assert.match(schema, /delivery_lock_key\s+TEXT/i, 'delivery_events schema must include delivery_lock_key');
assert.match(app, /registerSourceConfigRoute\(app\)/, 'source config route must be registered');

for (const [file, text] of workflows) {
  assert.doesNotMatch(text, /\/api\/waitlist-count\b/, `${file} uses obsolete /api/waitlist-count`);
  assert.doesNotMatch(text, /\/api\/intake-score\b/, `${file} uses obsolete /api/intake-score`);
}

console.log('backend contract regression passed');
