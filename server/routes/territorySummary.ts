import type { Express, Request, Response } from 'express';
import { supabase } from '../lib/supabase';
import { regionFromOutward } from '../utils/postcode';

export function registerTerritorySummaryRoute(app: Express) {
  app.get('/api/territories/summary', async (req: Request, res: Response) => {
    const postcode = (req.query.postcode as string || '').toUpperCase().trim().split(' ')[0];
    const trade = (req.query.trade as string || '').toLowerCase().trim();
    if (!postcode || !trade) {
      return res.status(400).json({ ok: false, error: 'postcode and trade required' });
    }
    try {
      if (supabase) {
        const { data } = await supabase
          .from('territory_metrics')
          .select('*')
          .eq('postcode_outward', postcode)
          .eq('trade', trade)
          .maybeSingle();
        if (data) {
          return res.json({ ok: true, postcode, trade, region: regionFromOutward(postcode), label: data.label ?? 'STEADY', signalsThisWeek: data.signals_this_week ?? 0, planningCount: data.planning_count ?? 0, epcCount: data.epc_count ?? 0, contractCount: data.contract_count ?? 0, avgEstimatedValue: Number(data.avg_estimated_value ?? 0), lockStatus: data.lock_status ?? 'open', readiness: 'live' });
        }
      }
      return res.json({ ok: true, postcode, trade, region: regionFromOutward(postcode), label: 'STEADY', signalsThisWeek: 0, planningCount: 0, epcCount: 0, contractCount: 0, avgEstimatedValue: 0, lockStatus: 'open', readiness: 'pending-scan' });
    } catch {
      return res.json({ ok: true, postcode, trade, label: 'STEADY', signalsThisWeek: 0, planningCount: 0, epcCount: 0, contractCount: 0, avgEstimatedValue: 0, lockStatus: 'open', readiness: 'pending-scan' });
    }
  });
}
