/**
 * GET /api/cron/daily-scan
 * Vercel cron (07:00 UTC daily, see vercel.json) — scans each paid user's trade + area,
 * persists leads, and fires WhatsApp for fresh GOLD leads (deduped via delivery_events).
 *
 * Auth: Vercel sends `Authorization: Bearer ${CRON_SECRET}` automatically when the
 * CRON_SECRET env var is set. Manual test:
 *   curl -H "Authorization: Bearer $CRON_SECRET" https://jobfilter.uk/api/cron/daily-scan
 */

import { scan } from '../../../../leadEngine/scan';
import { persistLeads } from '../../../../server/services/leadPersistence';
import { triggerGoldLeadWhatsApp } from '../../../../server/services/sms';
import { supabase } from '../../../../server/lib/supabase';

// TODO: import from leadEngine/thresholds.ts once Codex batch A lands.
const GOLD_THRESHOLD = 80;

export const maxDuration = 300;

const PAID_PLANS = ['founding', 'pro', 'business', 'epc'];

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabase) {
    return Response.json({ ok: false, error: 'Supabase service client not configured' }, { status: 503 });
  }

  const { data: users, error } = await supabase
    .from('profiles')
    .select('id, email, trade, postcode_outward, whatsapp_number, plan')
    .in('plan', PAID_PLANS)
    .not('trade', 'is', null)
    .not('postcode_outward', 'is', null)
    .limit(50);

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  const summary: Array<Record<string, unknown>> = [];

  for (const user of users ?? []) {
    try {
      const result = await scan({
        postcode: user.postcode_outward,
        trade: user.trade,
        tier: 'paid',
      });

      const leads = result.leads ?? [];
      await persistLeads(leads);

      const goldLeads = leads.filter((lead) => Number(lead.score ?? 0) >= GOLD_THRESHOLD);
      let alerted = 0;
      for (const lead of goldLeads) {
        try {
          // triggerGoldLeadWhatsApp dedupes via delivery_events (lead id + trade/area lock key),
          // so re-detected leads on later runs do not re-alert.
          const sent = await triggerGoldLeadWhatsApp({
            score: Number(lead.score ?? 0),
            jobType: String(lead.trade),
            area: lead.postcodeOutward || lead.location || user.postcode_outward,
            budget: lead.estimatedValue,
            phone: user.whatsapp_number ?? undefined,
            postcode: lead.postcodeOutward,
            leadId: lead.id,
            qualityLabel: lead.qualityLabel,
            recommendedAction: lead.recommendedAction,
            scoreReasons: lead.scoreReasons,
            sourceSystem: 'daily-scan',
          });
          if (sent.triggered) alerted += 1;
        } catch (err: any) {
          console.warn('[cron/daily-scan] WhatsApp failed for', user.id, err?.message);
        }
      }

      summary.push({ user: user.id, trade: user.trade, area: user.postcode_outward, leads: leads.length, gold: goldLeads.length, alerted });
    } catch (err: any) {
      console.warn('[cron/daily-scan] scan failed for', user.id, err?.message);
      summary.push({ user: user.id, error: String(err?.message ?? err) });
    }
  }

  return Response.json({ ok: true, users: summary.length, summary });
}
