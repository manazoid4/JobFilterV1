import type { Express, Request, Response } from 'express';
import { resolveRequestAccess } from '../lib/requestAuth';

const FREE_RESPONSE = { tier: 'free', plan: 'free', status: 'inactive', active: false } as const;
const OWNER_RESPONSE = { tier: 'business', plan: 'business', status: 'active', active: true, isOwner: true, currentPeriodEnd: null } as const;

export function registerSubscriptionStatusRoute(app: Express) {
  app.get('/api/subscription-status', async (req: Request, res: Response) => {
    try {
      const access = await resolveRequestAccess(req);
      if (!access) return res.status(401).json({ error: 'Authentication required' });
      if (access.isOwner) return res.json(OWNER_RESPONSE);

      const { supabase } = await import('../lib/supabase');
      if (!supabase) return res.json(FREE_RESPONSE);

      const { data } = await supabase
        .from('subscriptions')
        .select('plan, status, active, current_period_end')
        .eq('user_id', access.userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!data) return res.json(FREE_RESPONSE);

      const plan = data.plan || 'free';
      const status = data.status || 'inactive';
      const active = data.active ?? (status === 'active');

      return res.json({
        tier: plan,
        plan,
        status,
        active,
        currentPeriodEnd: data.current_period_end ?? null,
      });
    } catch {
      return res.json(FREE_RESPONSE);
    }
  });
}
