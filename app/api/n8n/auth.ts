import { createHmac, timingSafeEqual } from 'node:crypto';

const MAX_SIGNATURE_AGE_SECONDS = 300;

export function requireN8nIngressSignature(request: Request, rawBody: string): Response | null {
  const expected = process.env.N8N_INGRESS_SECRET;
  if (!expected) {
    return Response.json({ ok: false, error: 'n8n ingress is not configured' }, { status: 503 });
  }

  const timestamp = request.headers.get('x-jobfilter-timestamp') ?? '';
  const timestampSeconds = Number(timestamp);
  const presented = (request.headers.get('x-jobfilter-signature') ?? '').replace(/^sha256=/, '');
  const nowSeconds = Math.floor(Date.now() / 1000);

  if (!Number.isInteger(timestampSeconds) || Math.abs(nowSeconds - timestampSeconds) > MAX_SIGNATURE_AGE_SECONDS) {
    return Response.json({ ok: false, error: 'Unauthorised' }, { status: 401 });
  }

  const expectedSignature = createHmac('sha256', expected)
    .update(`${timestamp}.${rawBody}`)
    .digest('hex');
  if (!secretsEqual(presented, expectedSignature)) {
    return Response.json({ ok: false, error: 'Unauthorised' }, { status: 401 });
  }
  return null;
}

function secretsEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}
