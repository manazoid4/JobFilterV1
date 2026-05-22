import { Resend } from 'resend';

const RESEND_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.RESEND_FROM_EMAIL || 'JobFilter <hello@jobfilter.uk>';
const ADMIN_EMAIL = 'manazoid4@gmail.com';

const resend = RESEND_KEY ? new Resend(RESEND_KEY) : null;

export async function sendWelcomeEmail(to: string, name?: string): Promise<void> {
  if (!resend) return;
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: 'Welcome to JobFilter',
      html: `<p>Hi ${name || 'there'},</p>
<p>You're on the list. We'll be in touch when your account is ready.</p>
<p>— The JobFilter Team</p>`,
    });
  } catch (err: any) {
    console.error('[resend] Welcome email failed:', err?.message);
  }
}

export async function sendPaidConfirmationEmail(to: string, tier: string): Promise<void> {
  if (!resend) return;
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: 'JobFilter — Payment confirmed',
      html: `<p>Payment confirmed for <strong>${tier}</strong>.</p>
<p>Your account is now active. Head to <a href="https://jobfilter.uk/dashboard">jobfilter.uk/dashboard</a> to get started.</p>
<p>— The JobFilter Team</p>`,
    });
  } catch (err: any) {
    console.error('[resend] Paid confirmation email failed:', err?.message);
  }
}

export async function sendAdminAlert(subject: string, body: string): Promise<void> {
  if (!resend) return;
  try {
    await resend.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      subject: `[JobFilter Admin] ${subject}`,
      html: `<pre style="font-family:monospace">${body}</pre>`,
    });
  } catch (err: any) {
    console.error('[resend] Admin alert failed:', err?.message);
  }
}
