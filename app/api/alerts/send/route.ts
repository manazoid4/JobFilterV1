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
import { createHash } from 'node:crypto';

// Vercel Hobby cron has ±59 min time-of-day jitter but fires at most once per
// calendar day, so calendar-period checks are reliable where ms thresholds are not.
const DAY_MS = 24 * 60 * 60 * 1000;
function isDue(lastCheckedAt: string | null, frequency: string): boolean {
  if (!lastCheckedAt) return true;
  const lastMs = new Date(lastCheckedAt).getTime();
  if (Number.isNaN(lastMs)) return true;
  const nowMs = Date.now();
  if (frequency === 'instant' || frequency === 'daily') {
    // Fire when the UTC calendar date has changed.
    const now = new Date(nowMs);
    const last = new Date(lastMs);
    return (
      now.getUTCFullYear() !== last.getUTCFullYear() ||
      now.getUTCMonth() !== last.getUTCMonth() ||
      now.getUTCDate() !== last.getUTCDate()
    );
  }
  // weekly: require 7 full UTC calendar days so jitter (time-of-day only) cannot
  // shorten the interval to 6 days.
  return Math.floor(nowMs / DAY_MS) - Math.floor(lastMs / DAY_MS) >= 7;
}

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
    .select('id, user_id, trade, location, postcode_outward, radius_miles, frequency, last_checked_at, last_sent_at')
    .eq('active', true)
    .not('postcode_outward', 'is', null);

  if (error) {
    console.error('[alerts/send] DB query failed:', error.code);
    return Response.json({ ok: false, error: 'Failed to load alerts' }, { status: 500 });
  }

  // Deduplicate legacy instant+daily pairs that share the same effective scope
  // (trade/postcode/location/radius). weekly is a distinct cadence and always
  // passes through unchanged; only instant vs. daily rows are collapsed.
  // The canonical daily row carries forward the freshest last_checked_at and
  // last_sent_at from both rows so isDue() sees the most recent delivery state
  // and avoids re-sending what an old hourly runner already sent that UTC day.
  const laterOf = (x: string | null, y: string | null) =>
    !x ? y : !y ? x : x > y ? x : y;
  const alertsByKey = new Map<string, (typeof alerts)[number]>();
  const nonInstantDaily: (typeof alerts)[number][] = [];
  for (const a of alerts ?? []) {
    if (a.frequency !== 'instant' && a.frequency !== 'daily') {
      nonInstantDaily.push(a);
      continue;
    }
    const key = `${a.user_id}:${a.trade}:${a.postcode_outward}:${a.location}:${a.radius_miles}`;
    const existing = alertsByKey.get(key);
    if (!existing) {
      alertsByKey.set(key, a);
    } else {
      const canonical = a.frequency === 'daily' ? a : existing;
      const other = a.frequency === 'daily' ? existing : a;
      alertsByKey.set(key, {
        ...canonical,
        last_checked_at: laterOf(canonical.last_checked_at, other.last_checked_at),
        last_sent_at: laterOf(canonical.last_sent_at, other.last_sent_at),
      });
    }
  }
  const deduped = [...nonInstantDaily, ...alertsByKey.values()];

  let checked = 0;
  let sent = 0;
  let failed = 0;

  for (const alert of deduped) {
    if (!isDue(alert.last_checked_at, alert.frequency)) continue;
    checked++;

    try {
      const isPaid = alert.frequency !== 'weekly';
      const result = await scan({
        postcode: alert.postcode_outward,
        trade: alert.trade,
        tier: isPaid ? 'paid' : 'free',
        radiusMiles: Number(alert.radius_miles ?? 25),
      });

      const sourceStates = Object.values(result.sources ?? {});
      const sourceFailures = sourceStates.filter((source) => source.failed).length;
      if (sourceFailures > 0) {
        failed++;
        console.error('[alerts/send] source scan incomplete', { alertId: alert.id, sourceFailures });
        continue;
      }

      if (result.leads.length > 0) {
        const { data: profile } = await admin
          .from('profiles')
          .select('email')
          .eq('id', alert.user_id)
          .maybeSingle();

        if (profile?.email) {
          const idempotencyKey = createHash('sha256')
            .update(`${alert.id}:${alert.last_sent_at ?? 'never'}:${result.leads.slice(0, 5).map((lead) => lead.id).join(',')}`)
            .digest('hex');
          const deliveryId = `alert-${idempotencyKey.slice(0, 32)}`;
          const { data: priorDelivery } = await admin
            .from('delivery_events')
            .select('id, status, attempts')
            .eq('id', deliveryId)
            .maybeSingle();
          if (priorDelivery?.status === 'sent') {
            await admin.from('lead_alerts').update({ last_checked_at: new Date().toISOString(), last_sent_at: new Date().toISOString() }).eq('id', alert.id);
            continue;
          }

          const { error: outboxError } = await admin.from('delivery_events').upsert({
            id: deliveryId,
            lead_id: result.leads[0].id,
            alert_id: alert.id,
            user_id: alert.user_id,
            provider: 'resend',
            channel: 'email',
            status: 'pending',
            delivery_status: 'pending',
            idempotency_key: idempotencyKey,
            attempts: Number(priorDelivery?.attempts ?? 0) + 1,
            next_attempt_at: null,
            error: null,
            updated_at: new Date().toISOString(),
          });
          if (outboxError) throw new Error(`Could not claim alert delivery: ${outboxError.code}`);

          const delivery = await sendLeadAlertEmail(profile.email, {
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
          if (!delivery.sent) {
            failed++;
            await admin.from('delivery_events').update({
              status: 'failed',
              delivery_status: 'failed',
              error: delivery.error ?? 'Email provider rejected delivery',
              last_error: delivery.error ?? 'Email provider rejected delivery',
              next_attempt_at: null,
              updated_at: new Date().toISOString(),
            }).eq('id', deliveryId);
            continue;
          }

          const deliveredAt = new Date().toISOString();
          await admin.from('delivery_events').update({
            status: 'sent',
            delivery_status: 'sent',
            provider_message_id: delivery.providerMessageId ?? null,
            last_error: null,
            sent_at: deliveredAt,
            next_attempt_at: null,
            updated_at: deliveredAt,
          }).eq('id', deliveryId);
          await admin.from('lead_alerts').update({ last_checked_at: deliveredAt, last_sent_at: deliveredAt }).eq('id', alert.id);
          sent++;
          continue;
        }
        failed++;
        console.error('[alerts/send] alert owner has no deliverable email', { alertId: alert.id });
        continue;
      }

      await admin.from('lead_alerts').update({ last_checked_at: new Date().toISOString() }).eq('id', alert.id);
    } catch (err: any) {
      failed++;
      console.error('[alerts/send] failed for alert', alert.id, err?.message);
    }
  }

  return Response.json({ ok: failed === 0, total: deduped.length, checked, sent, failed }, { status: failed === 0 ? 200 : 503 });
}
