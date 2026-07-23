import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const app = readFileSync(new URL('../../server/app.ts', import.meta.url), 'utf8');
const readiness = readFileSync(new URL('../../server/routes/readiness.ts', import.meta.url), 'utf8');

assert.match(app, /X-Request-Id/);
assert.match(app, /event: 'http_request'/);
assert.match(app, /registerReadinessRoute\(app\)/);
assert.match(app, /requestId: res\.locals\.requestId/);

assert.match(readiness, /access\.isOwner/);
for (const dependency of ['database', 'sources', 'stripe', 'email', 'whatsapp']) {
  assert.match(readiness, new RegExp(`${dependency}:`));
}
assert.match(readiness, /24 \* 60 \* 60 \* 1000/);
assert.match(readiness, /res\.status\(ready \? 200 : 503\)/);

console.log('operational readiness regression passed');
