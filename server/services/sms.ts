import { supabase } from '../lib/supabase';
import { getOutward } from '../../leadEngine/postcode';

type WhatsAppPayload = {
  score: number;
  jobType: string;
  area: string;
  budget?: string;
  phone?: string;
  postcode?: string;
  leadId?: string;
  ghostRisk?: string;
  qualityLabel?: string;
  recommendedAction?: string;
  contactPathUsed?: string;
  scoreReasons?: string[];
  sourceSystem?: string;
};

export async function triggerGoldLeadWhatsApp(payload: WhatsAppPayload) {
  // deliveryLockKey = trade + postcodeOutward + sourceId — persisted in Supabase so it
  // survives across serverless function invocations (in-memory sets reset on cold start).
  if (payload.leadId && supabase) {
    const { data: existing } = await supabase
      .from('delivery_events')
      .select('id')
      .eq('lead_id', payload.leadId)
      .in('status', ['sent', 'stubbed'])
      .limit(1)
      .maybeSingle();
    if (existing) {
      return { triggered: false, provider: 'stub', reason: 'duplicate' };
    }
  }

  // deliveryLockKey: trade + postcodeOutward + sourceSystem — check Supabase for patch-level lock.
  // Normalise postcode to outward only so "B14 7AB" and "B14" both resolve to "B14".
  if (payload.postcode && payload.jobType && payload.sourceSystem && supabase) {
    const outward = (getOutward(payload.postcode) || payload.postcode).toUpperCase();
    const lockKey = `${payload.jobType.toLowerCase()}:${outward}:${payload.sourceSystem}`;
    const { data: locked } = await supabase
      .from('delivery_events')
      .select('id')
      .eq('delivery_lock_key', lockKey)
      .in('status', ['sent', 'stubbed'])
      .limit(1)
      .maybeSingle();
    if (locked) {
      return { triggered: false, provider: 'stub', reason: 'patch_locked' };
    }
  }

  const message = `GOLD LEAD
Trade: ${payload.jobType}
Area: ${payload.area}
Value: ${payload.budget || 'Confirm on call'}
Ghost Risk: ${payload.ghostRisk || 'READY'}
Next: ${payload.recommendedAction || 'Review proof link and contact path before outreach'}`;

  console.log('[whatsapp/gold-lead]', message);

  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const recipientPhone = process.env.WHATSAPP_TO || payload.phone;

  if (!phoneNumberId || !accessToken) {
    const missing = [
      !phoneNumberId && 'WHATSAPP_PHONE_NUMBER_ID',
      !accessToken && 'WHATSAPP_ACCESS_TOKEN',
    ].filter(Boolean).join(', ');
    throw new Error(`WhatsApp delivery not configured — missing env vars: ${missing}`);
  }

  if (!recipientPhone) {
    throw new Error('WhatsApp delivery not configured — no recipient phone number (set WHATSAPP_TO or pass payload.phone)');
  }

  let result: { triggered: boolean; provider: string; reason?: string };

  const url = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`;

  const metaResponse = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: recipientPhone,
      type: 'text',
      text: { body: message },
    }),
  });

  if (!metaResponse.ok) {
    const body = await metaResponse.text().catch(() => '');
    result = { triggered: false, provider: 'meta-whatsapp', reason: `Meta API HTTP ${metaResponse.status}: ${body.substring(0, 120)}` };
  } else {
    result = { triggered: true, provider: 'meta-whatsapp' };
  }

  if (supabase) {
    const outward = payload.postcode
      ? (getOutward(payload.postcode) || payload.postcode).toUpperCase()
      : '';
    const lockKey = (payload.jobType && outward && payload.sourceSystem)
      ? `${payload.jobType.toLowerCase()}:${outward}:${payload.sourceSystem}`
      : null;
    try {
      await supabase.from('delivery_events').insert({
        id: `de-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        lead_id: payload.leadId ?? '',
        phone: payload.phone ?? null,
        provider: result.provider,
        channel: 'whatsapp_to_tradesman',
        message_body: message,
        status: result.triggered ? 'sent' : 'failed',
        delivery_status: result.triggered ? 'sent' : 'failed',
        sent_at: new Date().toISOString(),
        error: result.reason ?? null,
        is_duplicate: false,
        next_action: payload.recommendedAction ?? null,
        score_at_delivery: Math.round(Number(payload.score ?? 0)),
        score_reasons_at_delivery: payload.scoreReasons ?? [],
        contact_path_used: payload.contactPathUsed ?? null,
        delivery_lock_key: lockKey,
      });
    } catch (err: any) {
      console.warn('[sms] Could not insert delivery_event:', err?.message);
    }
  }

  return result;
}
