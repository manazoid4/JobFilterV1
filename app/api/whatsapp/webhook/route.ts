import { NextResponse, type NextRequest } from 'next/server';
import crypto from 'crypto';
import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';
import { isValidMetaSignature } from '../../../../src/lib/whatsappSignature';

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
  if (process.env.WHATSAPP_INBOUND_ENABLED !== 'true') {
    return new NextResponse('WhatsApp inbound is disabled', { status: 503 });
  }

  const raw = await request.text();
  const appSecret = process.env.WHATSAPP_APP_SECRET;

  if (!appSecret) {
    return new NextResponse('WhatsApp signature verification is not configured', { status: 503 });
  }

  if (!isValidMetaSignature(raw, request.headers.get('x-hub-signature-256'), appSecret)) {
    return new NextResponse('Invalid signature', { status: 403 });
  }

  const body = (() => { try { return JSON.parse(raw); } catch { return null; } })();
  
  if (body?.entry?.[0]?.changes?.[0]?.value?.messages) {
    const message = body.entry[0].changes[0].value.messages[0];
    const fromPhone = message.from;
    const text = message.text?.body || '';
    
    // Ignore status updates
    if (!text) return NextResponse.json({ ok: true });
    
    // Simple Rule-Based Receptionist
    const postcodeRegex = /[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/i;
    const hasPostcode = postcodeRegex.test(text);
    
    const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const token = process.env.WHATSAPP_ACCESS_TOKEN;
    
    if (phoneId && token) {
      let replyText = '';
      
      if (hasPostcode) {
        replyText = "Thanks! We've received your details (postcode logged). Our team will review it and get back to you shortly with availability.";
        
        // Push to Intake
        const supabase = getSupabaseServiceClient();
        if (supabase) {
          await supabase.from('intake_submissions').insert({
             id: crypto.randomUUID(),
             phone: fromPhone,
             details: text,
             job_type: 'Inbound Request',
             urgency: 'Standard',
             postcode: text.match(postcodeRegex)?.[0]?.toUpperCase() || '',
             area: 'WhatsApp Inbound'
          });
        }
      } else {
        replyText = "Hi! I'm the automated receptionist. To help us get you a quote quickly, please reply with:\n1. The type of work you need\n2. Your postcode\n3. When you need it done";
      }
      
      const response = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: fromPhone,
            type: 'text',
            text: { preview_url: false, body: replyText }
          }),
          signal: AbortSignal.timeout(8_000),
      }).catch(() => null);

      if (!response?.ok) {
        console.error('[whatsapp/webhook] outbound reply failed', { status: response?.status ?? 0 });
        return NextResponse.json({ ok: false, error: 'Outbound reply failed' }, { status: 502 });
      }
    } else {
      return NextResponse.json({ ok: false, error: 'WhatsApp delivery is not configured' }, { status: 503 });
    }
  }

  return NextResponse.json({ ok: true });
}
