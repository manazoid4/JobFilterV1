import type { Express, Request, Response } from 'express';

export function registerSubscriptionStatusRoute(app: Express) {
  app.get('/api/subscription-status', async (req: Request, res: Response) => {
    const email = req.query.email as string;
    if (!email) return res.status(400).json({ error: 'email required' });

    try {
      const { supabase } = await import('../lib/supabase');
      if (!supabase) return res.json({ tier: 'free', status: 'inactive', active: false });

      const { data } = await supabase
        .from('subscriptions')
        .select('tier, status')
        .eq('email', email)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!data) return res.json({ tier: 'free', status: 'inactive', active: false });

      res.json({
        tier: data.tier || 'free',
        status: data.status || 'inactive',
        active: data.status === 'active',
      });
    } catch {
      res.json({ tier: 'free', status: 'inactive', active: false });
    }
  });
}
