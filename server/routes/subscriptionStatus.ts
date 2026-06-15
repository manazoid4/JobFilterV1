import type { Express, Request, Response } from 'express';
import { isOwnerEmail } from '../lib/ownerAccess';

const FREE_RESPONSE = { tier: 'free', plan: 'free', status: 'inactive', active: false } as const;
const OWNER_RESPONSE = { tier: 'business', plan: 'business', status: 'active', active: true, isOwner: true, currentPeriodEnd: null } as const;

export function registerSubscriptionStatusRoute(app: Express) {
  app.get('/api/subscription-status', async (req: Request, res: Response) => {
    const userId = req.query.user_id as string | undefined;
    const email = req.query.email as string | undefined;

    if (!userId && !email) {
      return res.status(400).json({ error: 'user_id or email required' });
    }

    // Owner bypass — server-side only, returns full business access
    if (isOwnerEmail(email)) {
      return res.json(OWNER_RESPONSE);
    }

    try {
      const { supabase } = await import('../lib/supabase');
      if (!supabase) return res.json(FREE_RESPONSE);

      let lookupUserId = userId;

      // Email fallback: resolve email → user_id via the profiles table
      if (!lookupUserId && email) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', email)
          .limit(1)
          .single();
        if (profile?.id) lookupUserId = profile.id;
      }

      if (!lookupUserId) return res.json(FREE_RESPONSE);

      const { data } = await supabase
        .from('subscriptions')
        .select('plan, status, active, current_period_end')
        .eq('user_id', lookupUserId)
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
