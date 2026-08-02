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

export async function sendLeadChaseEmail(params: {
  to: string;
  leadTitle: string;
  area: string;
  score: number;
  estimatedValue: string;
  message: string;
  url?: string;
}): Promise<{ sent: boolean; error?: string }> {
  if (!resend) return { sent: false, error: 'Email is not configured yet.' };
  try {
    const safeMessage = escapeHtml(params.message).replace(/\r?\n/g, '<br>');
    const safeUrl = sanitizeHttpUrl(params.url);
    await resend.emails.send({
      from: FROM,
      to: params.to,
      subject: `Job to chase: ${stripHeaderControls(params.leadTitle)} — ${stripHeaderControls(params.area)}`,
      html: `<p><strong>${escapeHtml(params.leadTitle)}</strong> — ${escapeHtml(params.area)}</p>
<p>Score: ${escapeHtml(String(params.score))}/100 &middot; Estimated value: ${escapeHtml(params.estimatedValue)}</p>
<hr style="border:none;border-top:1px solid #ddd">
<p>${safeMessage}</p>
${safeUrl ? `<p><a href="${escapeHtml(safeUrl)}">View listing</a></p>` : ''}
<hr style="border:none;border-top:1px solid #ddd">
<p style="font-size:12px;color:#999">Sent from JobFilter — jobfilter.uk</p>`,
    });
    return { sent: true };
  } catch (err: any) {
    console.error('[resend] Lead chase email failed:', err?.message);
    return { sent: false, error: 'Email failed to send.' };
  }
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]!);
}

export function sanitizeHttpUrl(value?: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : null;
  } catch {
    return null;
  }
}

function stripHeaderControls(value: string) {
  return value.replace(/[\r\n\0]/g, ' ').slice(0, 200);
}

export async function sendLeadAlertEmail(
  to: string,
  opts: LeadAlertEmailOptions,
): Promise<{ sent: boolean; error?: string; providerMessageId?: string }> {
  if (opts.leads.length === 0) return { sent: false, error: 'No leads to send.' };
  if (!resend) return { sent: false, error: 'Email is not configured yet.' };

  const content = buildLeadAlertEmailContent(opts);

  try {
    const result = await resend.emails.send({
      from: FROM,
      to,
      subject: content.subject,
      html: content.html,
    });
    if (result.error || !result.data?.id) {
      console.error('[resend] Lead alert email rejected:', result.error?.message ?? 'missing provider message ID');
      return { sent: false, error: 'Email provider rejected the message.' };
    }
    return { sent: true, providerMessageId: result.data.id };
  } catch (err: any) {
    console.error('[resend] Lead alert email failed:', err?.message);
    return { sent: false, error: 'Email failed to send.' };
  }
}

type LeadAlertEmailOptions = {
  trade: string;
  location: string;
  isPaid: boolean;
  leads: { title: string; location: string; estimatedValue: string; urgency: string; sourceUrl?: string }[];
};

export function buildLeadAlertEmailContent(opts: LeadAlertEmailOptions) {
  const { trade, location, leads, isPaid } = opts;

  const rows = leads
    .map((l) => {
      const safeUrl = isPaid ? sanitizeHttpUrl(l.sourceUrl) : null;
      const link = safeUrl ? ` — <a href="${escapeHtml(safeUrl)}">view</a>` : '';
      return `<li><strong>${escapeHtml(l.title)}</strong> — ${escapeHtml(l.location)} — ${escapeHtml(l.estimatedValue)} (${escapeHtml(l.urgency)})${link}</li>`;
    })
    .join('');
  const cta = isPaid
    ? ''
    : `<p><a href="https://jobfilter.uk/pricing">Upgrade</a> for daily alerts and full lead details.</p>`;

  return {
    subject: `JobFilter — ${leads.length} new ${stripHeaderControls(trade)} lead${leads.length === 1 ? '' : 's'} in ${stripHeaderControls(location)}`,
    html: `<p>New leads matching your ${escapeHtml(trade)} alert for ${escapeHtml(location)}:</p><ul>${rows}</ul>${cta}<p>— The JobFilter Team</p>`,
  };
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
