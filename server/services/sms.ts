import { supabase } from '../lib/supabase';

type WhatsAppPayload = {
  leadId?: string;
  score: number;
  jobType: string;
  area: string;
  budget?: string;
  phone?: string;
  postcode?: string;
  ghostRisk?: 'READY' | 'MAYBE' | 'WASTE';
  qualityLabel?: 'GOLD' | 'SILVER' | 'BRONZE' | 'CHECK' | 'SKIP';
};

const deliveredSet = new Set<string>();

export async function triggerGoldLeadWhatsApp(payload: WhatsAppPayload) {
  const leadId = payload.leadId || `${payload.jobType}:${payload.area}:${payload.score}`;
  const phone = payload.phone || 'unknown';
  const deliveryKey = `${leadId}:${phone}`;
  const budgetText = payload.budget || 'Not specified';
  const ghostRisk = payload.ghostRisk || 'READY';

  const message = `GOLD LEAD
Trade: ${payload.jobType}
Area: ${payload.area}
Value: ${budgetText}
Ghost Risk: ${ghostRisk}
Next Action: Call within 24 hours`;

  console.log('[whatsapp/gold-lead]', message);

  if (deliveredSet.has(deliveryKey)) {
    await recordDelivery({ payload, message, provider: 'stub', status: 'duplicate', isDuplicate: true });
    return { triggered: false, provider: 'stub', reason: 'duplicate' };
  }

  const hasRequiredEnv =
    process.env.TWILIO_WHATSAPP_TO &&
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN;

  if (hasRequiredEnv) {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`;
    const auth = Buffer.from(
      `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
    ).toString('base64');

    try {
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

      deliveredSet.add(deliveryKey);
      await recordDelivery({ payload, message, provider: 'twilio-whatsapp', status: 'sent', isDuplicate: false });
      return { triggered: true, provider: 'twilio-whatsapp' };
    } catch (error: any) {
      await recordDelivery({
        payload,
        message,
        provider: 'twilio-whatsapp',
        status: 'failed',
        isDuplicate: false,
        error: String(error?.message ?? 'Twilio send failed'),
      });
      throw error;
    }
  }

  deliveredSet.add(deliveryKey);
  await recordDelivery({ payload, message, provider: 'stub', status: 'sent', isDuplicate: false });
  return { triggered: true, provider: 'stub' };
}

async function recordDelivery(input: {
  payload: WhatsAppPayload;
  message: string;
  provider: string;
  status: string;
  isDuplicate: boolean;
  error?: string;
}) {
  try {
    if (!supabase) return;
    await supabase.from('delivery_events').upsert({
      lead_id: input.payload.leadId || null,
      phone: input.payload.phone || null,
      provider: input.provider,
      message_body: input.message,
      status: input.status,
      sent_at: new Date().toISOString(),
      error: input.error || null,
      is_duplicate: input.isDuplicate,
    }, {
      onConflict: 'lead_id,phone',
    });
  } catch (error) {
    console.warn('[whatsapp/delivery-events]', error);
  }
}
