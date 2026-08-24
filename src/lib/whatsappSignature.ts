import crypto from 'node:crypto';

const META_SIGNATURE_PREFIX = 'sha256=';

export function isValidMetaSignature(rawBody: string, signature: string | null, appSecret: string) {
  if (!appSecret || !signature?.startsWith(META_SIGNATURE_PREFIX)) return false;

  const providedHex = signature.slice(META_SIGNATURE_PREFIX.length);
  if (!/^[a-f0-9]{64}$/i.test(providedHex)) return false;

  const expected = crypto.createHmac('sha256', appSecret).update(rawBody).digest();
  const provided = Buffer.from(providedHex, 'hex');
  return provided.length === expected.length && crypto.timingSafeEqual(provided, expected);
}
