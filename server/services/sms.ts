import { supabase } from '../lib/supabase';

const deliveredSet = new Set<string>();

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
};

export async function triggerGoldLeadWhatsApp(payload: WhatsAppPayload) {
  const dedupKey = `${payload.leadId ?? ''}:${payload.phone ?? ''}`;
  if (payload.leadId && payload.phone && deliveredSet.has(dedupKey)) {
    return { triggered: false, provider: 'stub', reason: 'duplicate' };
  }

  const message = `GOLD LEAD
Trade: ${payload.jobType}
Area: ${payload.area}
Value: ${payload.budget || 'Confirm on call'}
Ghost Risk: ${payload.ghostRisk || 'READY'}
Next: Call within 24 hours`;

  console.log('[whatsapp/gold-lead]', message);

  const hasRequiredEnv =
    process.env.TWILIO_WHATSAPP_TO &&
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN;

  let result: { triggered: boolean; provider: string; reason?: string };

  if (hasRequiredEnv) {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`;
    const auth = Buffer.from(
      `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
    ).toString('base64');

    await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        From: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM ?? 'whatsapp:+14155238886'}`,
        To: `whatsapp:${process.env.TWILIO_WHATSAPP_TO}`,
        Body: message,
      }).toString(),
    });

    result = { triggered: true, provider: 'twilio-whatsapp' };
  } else {
    result = { triggered: true, provider: 'stub' };
  }

  deliveredSet.add(dedupKey);

  if (supabase) {
    try {
      await supabase.from('delivery_events').insert({
        id: `de-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        lead_id: payload.leadId ?? '',
        phone: payload.phone ?? null,
        provider: result.provider,
        message_body: message,
        status: 'sent',
        sent_at: new Date().toISOString(),
        is_duplicate: false,
      });
    } catch (err: any) {
      console.warn('[sms] Could not insert delivery_event:', err?.message);
    }
  }

  return result;
}
