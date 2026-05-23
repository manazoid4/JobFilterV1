export async function sendWaitlistConfirmation(name: string, contact: string) {
  const hasResendKey = process.env.RESEND_API_KEY;

  if (!hasResendKey) {
    console.log('[email/waitlist] RESEND_API_KEY not set — confirmation not sent.');
    return { sent: false, provider: 'none' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_SENDER_EMAIL || 'JobFilter <no-reply@jobfilter.uk>',
        to: contact,
        subject: "You're on the JobFilter Founding 30 list",
        html: `
          <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px">
            <h1 style="color:#1a1a1a">You're on the list, ${name}.</h1>
            <p style="font-size:16px;color:#444;line-height:1.6">
              Thanks for joining the JobFilter Founding 30 waitlist. We'll email you the moment it's live.
            </p>
            <p style="font-size:16px;color:#444;line-height:1.6">
              In the meantime, here's a free scan of your area: <a href="https://jobfilter.uk/find-jobs">jobfilter.uk/find-jobs</a>
            </p>
            <hr style="border:none;border-top:2px solid #eee;margin:24px 0">
            <p style="font-size:12px;color:#999">
              JobFilter — Real leads. No chasing. No competing.<br>
              Built in Birmingham. No contracts. Cancel anytime.
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error('[email/waitlist] Failed:', body);
      return { sent: false, provider: 'resend', error: body };
    }

    return { sent: true, provider: 'resend' };
  } catch (error: any) {
    console.error('[email/waitlist] Error:', error?.message);
    return { sent: false, provider: 'resend', error: String(error?.message) };
  }
}
