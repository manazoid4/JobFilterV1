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

  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioFrom = process.env.TWILIO_WHATSAPP_FROM;
  const twilioTo = process.env.TWILIO_WHATSAPP_TO;

  if (!twilioSid || !twilioToken || !twilioFrom || !twilioTo) {
    // Credentials missing — throw so callers know delivery failed rather than silently claiming success.
    const missing = [
      !twilioSid && 'TWILIO_ACCOUNT_SID',
      !twilioToken && 'TWILIO_AUTH_TOKEN',
      !twilioFrom && 'TWILIO_WHATSAPP_FROM',
      !twilioTo && 'TWILIO_WHATSAPP_TO',
    ].filter(Boolean).join(', ');
    throw new Error(`WhatsApp delivery not configured — missing env vars: ${missing}`);
  }

  let result: { triggered: boolean; provider: string; reason?: string };

  const url = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;
  const auth = Buffer.from(`${twilioSid}:${twilioToken}`).toString('base64');

  const twilioResponse = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      From: formatWhatsAppNumber(twilioFrom),
      To: formatWhatsAppNumber(twilioTo),
      Body: message,
    }).toString(),
  });

  if (!twilioResponse.ok) {
    const body = await twilioResponse.text().catch(() => '');
    result = { triggered: false, provider: 'twilio-whatsapp', reason: `Twilio HTTP ${twilioResponse.status}: ${body.substring(0, 120)}` };
  } else {
    result = { triggered: true, provider: 'twilio-whatsapp' };
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
        status: result.provider === 'stub' ? 'stubbed' : (result.triggered ? 'sent' : 'failed'),
        delivery_status: result.provider === 'stub' ? 'stubbed' : (result.triggered ? 'sent' : 'failed'),
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

function formatWhatsAppNumber(value: string) {
  return value.startsWith('whatsapp:') ? value : `whatsapp:${value}`;
}
