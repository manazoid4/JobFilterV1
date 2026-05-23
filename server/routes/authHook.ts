import type { Express, Request, Response } from 'express';
import { triggerN8n } from '../lib/n8n.js';
import { sendWelcomeEmail } from '../lib/resend.js';

export function registerAuthHookRoute(app: Express) {
  app.post('/api/auth/signup-hook', async (req: Request, res: Response) => {
    const { email } = req.body ?? {};
    if (!email) return res.status(400).json({ error: 'email required' });

    try {
      await Promise.all([
        sendWelcomeEmail(email),
        triggerN8n('new_signup', { email }),
      ]);
      res.json({ ok: true });
    } catch (err: any) {
      console.error('[auth-hook] signup-hook failed:', err?.message);
      res.status(500).json({ error: 'hook failed' });
    }
  });
}
