import type { Express, Request, Response } from 'express';
import { supabase } from '../lib/supabase';

export function registerTerritorySummaryRoute(app: Express) {
  app.get('/api/territories/summary', async (req: Request, res: Response) => {
    const postcode = String(req.query.postcode ?? '').trim().toUpperCase();
    const trade = String(req.query.trade ?? '').trim().toLowerCase();

    try {
      if (supabase && postcode && trade) {
        const { data, error } = await supabase
          .from('territory_metrics')
          .select('*')
          .eq('postcode_outward', postcode)
          .eq('trade', trade)
          .maybeSingle();

        if (!error && data) {
          return res.json({
            ok: true,
            postcode,
            trade,
            label: data.label ?? 'STEADY',
            signalsThisWeek: data.signals_this_week ?? 0,
            planningCount: data.planning_count ?? 0,
            epcCount: data.epc_count ?? 0,
            contractCount: data.contract_count ?? 0,
            avgEstimatedValue: Number(data.avg_estimated_value ?? 0),
            lockStatus: data.lock_status ?? 'open',
            readiness: 'ready',
          });
        }
      }

      return res.json(defaultTerritorySummary(postcode, trade));
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Territory summary failed.') });
    }
  });
}

function defaultTerritorySummary(postcode: string, trade: string) {
  return {
    ok: true,
    postcode,
    trade,
    label: 'STEADY',
    signalsThisWeek: 0,
    planningCount: 0,
    epcCount: 0,
    contractCount: 0,
    avgEstimatedValue: 0,
    lockStatus: 'open',
    readiness: 'pending-scan',
  };
}
