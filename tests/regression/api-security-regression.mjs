import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import fs from 'node:fs';
import { createApp } from '../../server/app.ts';
import { buildLeadAlertEmailContent, escapeHtml, sanitizeHttpUrl } from '../../server/lib/resend.ts';
import { requireN8nIngressSignature } from '../../app/api/n8n/auth.ts';

const outcome = fs.readFileSync('server/routes/outcomeReport.ts', 'utf8');
const emailChase = fs.readFileSync('server/routes/leadEmailChase.ts', 'utf8');
const startSignals = fs.readFileSync('server/routes/startSignals.ts', 'utf8');
const subscription = fs.readFileSync('server/routes/subscriptionStatus.ts', 'utf8');
const n8nLeadCreated = fs.readFileSync('app/api/n8n/lead-created/route.ts', 'utf8');
const n8nToolUsed = fs.readFileSync('app/api/n8n/tool-used/route.ts', 'utf8');

assert.match(outcome, /resolveRequestAccess\(req\)/, 'outcome mutations must authenticate the caller');
assert.match(outcome, /user_id: access\.userId/, 'outcomes must derive ownership from auth');
assert.match(outcome, /outcome\?\.user_id && outcome\.user_id !== access\.userId/, 'existing outcomes must reject cross-tenant mutation');

assert.match(emailChase, /to: access\.email/, 'email recipient must come from the authenticated user');
assert.match(emailChase, /Email can only be sent to your authenticated address/, 'arbitrary recipients must be rejected');
assert.equal(
  escapeHtml(`<img src=x onerror="alert('x')"> &`),
  '&lt;img src=x onerror=&quot;alert(&#39;x&#39;)&quot;&gt; &amp;',
  'outbound email HTML must escape user-controlled text',
);
assert.equal(sanitizeHttpUrl('javascript:alert(1)'), null, 'unsafe email link schemes must be rejected');
assert.equal(sanitizeHttpUrl('https://example.com/job?a=1')?.startsWith('https://example.com/job'), true);
const alertContent = buildLeadAlertEmailContent({
  trade: '<b>electrical</b>',
  location: 'Birmingham & Solihull',
  isPaid: true,
  leads: [{
    title: '<img src=x onerror=alert(1)>',
    location: 'B1 & nearby',
    estimatedValue: '<strong>£5k</strong>',
    urgency: 'high<script>',
    sourceUrl: 'javascript:alert(1)',
  }],
});
assert.doesNotMatch(alertContent.html, /<img|<script|<strong>£5k|javascript:/, 'lead alert HTML must escape fields and reject unsafe URLs');
assert.match(alertContent.html, /&lt;img src=x onerror=alert\(1\)&gt;/, 'lead alert titles must be HTML escaped');
const resendSource = fs.readFileSync('server/lib/resend.ts', 'utf8');
assert.match(resendSource, /result\.error \|\| !result\.data\?\.id/, 'alert sends must inspect the provider result');
assert.match(resendSource, /providerMessageId: result\.data\.id/, 'successful alert sends must return the provider message ID');

assert.match(startSignals, /if \(!access\.isPaid\)/, 'paid start-signal data must check entitlement server-side');
assert.doesNotMatch(subscription, /req\.query/, 'subscription identity must not come from query parameters');
assert.match(subscription, /\.eq\('user_id', access\.userId\)/, 'subscription lookup must use authenticated identity');
for (const route of [n8nLeadCreated, n8nToolUsed]) {
  assert.match(route, /requireN8nIngressSignature\(request, rawBody\)/, 'n8n handlers must verify a body signature');
}

const previousSecret = process.env.N8N_INGRESS_SECRET;
delete process.env.N8N_INGRESS_SECRET;
assert.equal(
  requireN8nIngressSignature(new Request('https://jobfilter.uk/api/n8n/lead-created'), '{}')?.status,
  503,
  'n8n ingress must fail closed when its secret is not configured',
);
process.env.N8N_INGRESS_SECRET = 'regression-secret';
assert.equal(
  requireN8nIngressSignature(new Request('https://jobfilter.uk/api/n8n/lead-created'), '{}')?.status,
  401,
  'n8n ingress must reject anonymous requests',
);
assert.equal(
  requireN8nIngressSignature(new Request('https://jobfilter.uk/api/n8n/lead-created', {
    headers: signedHeaders('regression-secret', '{}'),
  }), '{}'),
  null,
  'n8n ingress must accept a fresh signature from the configured secret',
);
if (previousSecret === undefined) delete process.env.N8N_INGRESS_SECRET;
else process.env.N8N_INGRESS_SECRET = previousSecret;

const app = await createApp();
const server = app.listen(0, '127.0.0.1');
try {
  await new Promise((resolve) => server.once('listening', resolve));
  const address = server.address();
  assert.ok(address && typeof address === 'object');
  const origin = `http://127.0.0.1:${address.port}`;
  for (const [path, method] of [
    ['/api/leads/outcome', 'POST'],
    ['/api/leads/flag', 'POST'],
    ['/api/leads/email-chase', 'POST'],
    ['/api/start-signals/search', 'POST'],
    ['/api/start-signals/example/feedback', 'POST'],
    ['/api/subscription-status?user_id=victim&email=manazoid4%40gmail.com', 'GET'],
  ]) {
    const protectedResponse = await fetch(`${origin}${path}`, {
      method,
      headers: method === 'POST' ? { 'Content-Type': 'application/json' } : undefined,
      body: method === 'POST' ? '{}' : undefined,
    });
    assert.equal(protectedResponse.status, 401, `${method} ${path} must reject anonymous callers`);
  }

  const response = await fetch(`${origin}/api/not-a-real-route`);
  assert.equal(response.status, 404, 'unmatched Express API routes must terminate with 404');
  assert.deepEqual(await response.json(), { ok: false, error: 'Not found' });
} finally {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
}

console.log('api security regression passed');

function signedHeaders(secret, body) {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = createHmac('sha256', secret).update(`${timestamp}.${body}`).digest('hex');
  return {
    'x-jobfilter-timestamp': timestamp,
    'x-jobfilter-signature': `sha256=${signature}`,
  };
}
