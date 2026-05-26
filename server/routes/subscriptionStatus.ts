import type { Express, Request, Response } from 'express';

const FREE_RESPONSE = { tier: 'free', plan: 'free', status: 'inactive', active: false } as const;

export function registerSubscriptionStatusRoute(app: Express) {
  app.get('/api/subscription-status', async (req: Request, res: Response) => {
    const userId = req.query.user_id as string | undefined;
    const email = req.query.email as string | undefined;

    if (!userId && !email) {
      return res.status(400).json({ error: 'user_id or email required' });
    }

    try {
      const { supabase } = await import('../lib/supabase');
      if (!supabase) return res.json(FREE_RESPONSE);

      let lookupUserId = userId;

      // Email fallback: resolve email → user_id via auth admin API
      if (!lookupUserId && email) {
        const { data: { users } } = await supabase.auth.admin.listUsers({ perPage: 1 });
        // listUsers doesn't filter by email — use a direct admin lookup instead
        const { data: adminUser, error: adminErr } = await (supabase.auth.admin as any).getUserByEmail
          ? (supabase.auth.admin as any).getUserByEmail(email)
          : { data: null, error: null };

        if (!adminErr && adminUser?.user?.id) {
          lookupUserId = adminUser.user.id;
        }

        // If admin lookup unavailable, fall back to profiles table if it exists
        if (!lookupUserId) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('email', email)
            .limit(1)
            .single();
          if (profile?.id) lookupUserId = profile.id;
        }
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
