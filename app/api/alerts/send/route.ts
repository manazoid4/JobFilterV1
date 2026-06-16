/**
 * /api/alerts/send — Cron-triggered lead alert delivery.
 *
 * Checks active `lead_alerts` rows whose frequency interval has elapsed,
 * runs a scan for each, and emails the user via Resend if matching leads exist.
 *
 * Protect with CRON_SECRET (Vercel sends `Authorization: Bearer $CRON_SECRET`).
 */

import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';
import { scan } from '../../../../leadEngine/scan';
import { sendLeadAlertEmail } from '../../../../server/lib/resend';

const FREQUENCY_MS: Record<string, number> = {
  instant: 60 * 60 * 1000,
  daily: 24 * 60 * 60 * 1000,
  weekly: 7 * 24 * 60 * 60 * 1000,
};

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return Response.json({ ok: false, error: 'Cron not configured' }, { status: 503 });
  }
  const auth = request.headers.get('authorization');
  if (auth !== `Bearer ${cronSecret}`) {
    return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const admin = getSupabaseServiceClient();
  if (!admin) {
    return Response.json({ ok: false, error: 'Supabase not configured' }, { status: 503 });
  }

  const { data: alerts, error } = await admin
    .from('lead_alerts')
    .select('id, user_id, trade, location, postcode_outward, frequency, last_sent_at')
    .eq('active', true)
    .not('postcode_outward', 'is', null);

  if (error) {
    console.error('[alerts/send] DB query failed:', error.code);
    return Response.json({ ok: false, error: 'Failed to load alerts' }, { status: 500 });
  }

  const now = Date.now();
  let checked = 0;
  let sent = 0;

  for (const alert of alerts ?? []) {
    const interval = FREQUENCY_MS[alert.frequency] ?? FREQUENCY_MS.weekly;
    const lastSent = alert.last_sent_at ? new Date(alert.last_sent_at).getTime() : 0;
    if (now - lastSent < interval) continue;
    checked++;

    try {
      const isPaid = alert.frequency !== 'weekly';
      const result = await scan({
        postcode: alert.postcode_outward,
        trade: alert.trade,
        tier: isPaid ? 'paid' : 'free',
      });

      if (result.leads.length > 0) {
        const { data: profile } = await admin
          .from('profiles')
          .select('email')
          .eq('id', alert.user_id)
          .maybeSingle();

        if (profile?.email) {
          await sendLeadAlertEmail(profile.email, {
            trade: alert.trade,
            location: alert.location,
            isPaid,
            leads: result.leads.slice(0, 5).map((l) => ({
              title: l.title,
              location: l.location,
              estimatedValue: l.estimatedValue,
              urgency: l.urgency,
              sourceUrl: l.sourceUrl,
            })),
          });
          sent++;
        }
      }

      await admin.from('lead_alerts').update({ last_sent_at: new Date().toISOString() }).eq('id', alert.id);
    } catch (err: any) {
      console.error('[alerts/send] failed for alert', alert.id, err?.message);
    }
  }

  return Response.json({ ok: true, total: alerts?.length ?? 0, checked, sent });
}
