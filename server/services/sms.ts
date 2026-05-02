type WhatsAppPayload = {
  score: number;
  jobType: string;
  area: string;
  budget?: string;
  phone?: string;
  postcode?: string;
};

export async function triggerGoldLeadWhatsApp(payload: WhatsAppPayload) {
  const budgetText = payload.budget || 'Not specified';
  const phoneText = payload.phone ? `Tap to call: ${payload.phone}` : '';

  const message = `🏆 NEW GOLD LEAD
Job: ${payload.jobType}
Area: ${payload.area}
Budget: ${budgetText}
Score: ${payload.score}/100${phoneText ? `\n${phoneText}` : ''}`;

  console.log('[whatsapp/gold-lead]', message);

  const hasRequiredEnv =
    process.env.TWILIO_WHATSAPP_TO &&
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN;

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

    return { triggered: true, provider: 'twilio-whatsapp' };
  }

  return { triggered: true, provider: 'stub' };
}
