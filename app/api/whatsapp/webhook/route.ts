import { NextResponse, type NextRequest } from 'next/server';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge ?? '', { status: 200 });
  }
  return new NextResponse('Forbidden', { status: 403 });
}

export async function POST(request: NextRequest) {
  const raw = await request.text();
  const appSecret = process.env.WHATSAPP_APP_SECRET;

  if (appSecret) {
    const signature = request.headers.get('x-hub-signature-256');
    const expected = `sha256=${crypto.createHmac('sha256', appSecret).update(raw).digest('hex')}`;
    if (!signature || signature !== expected) {
      return new NextResponse('Invalid signature', { status: 403 });
    }
  }

  const body = (() => { try { return JSON.parse(raw); } catch { return null; } })();
  if (body) {
    console.log('[whatsapp/webhook] incoming', JSON.stringify(body).slice(0, 500));
  }
  return NextResponse.json({ ok: true });
}
