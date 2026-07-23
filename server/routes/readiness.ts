import type { Express, Request, Response } from 'express';
import { resolveRequestAccess } from '../lib/requestAuth';
import { supabase } from '../lib/supabase';
import { getSourceHealthSummary, summarizeSourceHealth } from '../services/sourceBenchmark';

type Check = { ready: boolean; status: 'ready' | 'degraded' | 'disabled'; detail: string };

export function registerReadinessRoute(app: Express) {
  app.get('/api/readiness', async (req: Request, res: Response) => {
    const access = await resolveRequestAccess(req);
    if (!access) return res.status(401).json({ ok: false, error: 'Authentication required' });
    if (!access.isOwner) return res.status(403).json({ ok: false, error: 'Owner access required' });

    const checks: Record<string, Check> = {
      database: await databaseCheck(),
      sources: await sourceCheck(),
      stripe: configurationCheck(
        Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET),
        'Stripe secret and webhook configuration',
      ),
      email: configurationCheck(
        Boolean(process.env.RESEND_API_KEY && (process.env.RESEND_FROM_EMAIL || process.env.RESEND_SENDER_EMAIL)),
        'Resend API key and sender configuration',
      ),
      whatsapp: optionalConfigurationCheck(
        Boolean(process.env.WHATSAPP_PHONE_NUMBER_ID && process.env.WHATSAPP_ACCESS_TOKEN),
        'Meta WhatsApp delivery',
      ),
    };
    const required = ['database', 'sources', 'stripe', 'email'];
    const ready = required.every((key) => checks[key].ready);
    return res.status(ready ? 200 : 503).json({
      ok: ready,
      service: 'jobfilter',
      requestId: res.locals.requestId,
      checkedAt: new Date().toISOString(),
      checks,
    });
  });
}

async function databaseCheck(): Promise<Check> {
  if (!supabase) return { ready: false, status: 'degraded', detail: 'Supabase service client is not configured' };
  const { error } = await supabase.from('profiles').select('id').limit(1);
  return error
    ? { ready: false, status: 'degraded', detail: `Database query failed (${error.code})` }
    : { ready: true, status: 'ready', detail: 'Database query succeeded' };
}

async function sourceCheck(): Promise<Check> {
  const data = await getSourceHealthSummary();
  const summaries = summarizeSourceHealth(data.rows);
  const newestSuccess = summaries
    .map((source) => source.lastSuccessfulRunAt)
    .filter((value): value is string => Boolean(value))
    .map(Date.parse)
    .filter(Number.isFinite)
    .sort((a, b) => b - a)[0];
  const fresh = newestSuccess !== undefined && Date.now() - newestSuccess <= 24 * 60 * 60 * 1000;
  return fresh
    ? { ready: true, status: 'ready', detail: `${summaries.filter((source) => source.lastSuccessfulRunAt).length} source(s) have successful run evidence` }
    : { ready: false, status: 'degraded', detail: data.provider === 'none' ? 'Source benchmark store is unavailable' : 'No successful source run in the last 24 hours' };
}

function configurationCheck(configured: boolean, name: string): Check {
  return configured
    ? { ready: true, status: 'ready', detail: `${name} present` }
    : { ready: false, status: 'degraded', detail: `${name} missing` };
}

function optionalConfigurationCheck(configured: boolean, name: string): Check {
  return configured
    ? { ready: true, status: 'ready', detail: `${name} present` }
    : { ready: false, status: 'disabled', detail: `${name} disabled until configured and consented` };
}
