import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import { isValidMetaSignature } from '../../src/lib/whatsappSignature.ts';

const body = JSON.stringify({ entry: [{ id: 'test' }] });
const secret = 'regression-secret';
const validSignature = `sha256=${crypto.createHmac('sha256', secret).update(body).digest('hex')}`;

assert.equal(isValidMetaSignature(body, validSignature, secret), true);
assert.equal(isValidMetaSignature(`${body}tampered`, validSignature, secret), false);
assert.equal(isValidMetaSignature(body, null, secret), false);
assert.equal(isValidMetaSignature(body, 'sha256=bad', secret), false);
assert.equal(isValidMetaSignature(body, validSignature, ''), false);

const routeSource = fs.readFileSync(new URL('../../app/api/whatsapp/webhook/route.ts', import.meta.url), 'utf8');
assert.match(routeSource, /WHATSAPP_INBOUND_ENABLED !== 'true'/);
assert.match(routeSource, /if \(!appSecret\)/);
assert.match(routeSource, /isValidMetaSignature/);
assert.doesNotMatch(routeSource, /incoming from/);
assert.match(routeSource, /response\?\.ok/);

console.log('whatsapp webhook security regression passed');
