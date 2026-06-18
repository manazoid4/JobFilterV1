import assert from 'node:assert/strict';
import fs from 'node:fs';

const types = fs.readFileSync('src/lib/types.ts', 'utf8');
const findJobs = fs.readFileSync('src/pages/FindJobsPage.tsx', 'utf8');
const responseKit = fs.readFileSync('src/components/QuickResponseKit.tsx', 'utf8');
const templates = fs.readFileSync('src/lib/chaseTemplates.ts', 'utf8');

assert.match(types, /buyerPhone\?: string/, 'frontend Lead type must expose the buyer phone');
assert.match(findJobs, /phone: lead\.buyerPhone/, 'tracking must retain the buyer phone');
assert.match(findJobs, /phone=\{lead\.buyerPhone\}/, 'response kit must receive the buyer phone');
assert.match(responseKit, /toWhatsAppHref\(phone, filledMsg\)/, 'WhatsApp action must use a wa.me link');
assert.match(responseKit, /OPEN WHATSAPP/, 'action label must describe the actual destination');
assert.doesNotMatch(responseKit, /OPEN SMS/, 'WhatsApp action must not open the SMS app');
assert.match(templates, /https:\/\/wa\.me\//, 'message helper must build a WhatsApp deep link');

console.log('whatsapp direct chat regression passed');
