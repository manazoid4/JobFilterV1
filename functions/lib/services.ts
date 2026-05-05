async function twilioWhatsApp(message: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886';
  const to = process.env.TWILIO_WHATSAPP_TO;
  if (!sid || !token || !to) return { triggered: false, provider: 'none' };
  try {
    const auth = Buffer.from(`${sid}:${token}`).toString('base64');
    await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: 'POST',
      headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ From: `whatsapp:${from}`, To: `whatsapp:${to}`, Body: message }).toString(),
    });
    return { triggered: true, provider: 'twilio-whatsapp' };
  } catch (e: any) {
    console.error('[twilio]', e?.message);
    return { triggered: false, provider: 'twilio-error' };
  }
}

async function sendEmail(to: string, subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { sent: false, provider: 'none' };
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: 'JobFilter <no-reply@jobfilter.uk>', to, subject, html }),
    });
    return { sent: res.ok, provider: 'resend' };
  } catch (e: any) {
    console.error('[resend]', e?.message);
    return { sent: false, provider: 'resend-error' };
  }
}
