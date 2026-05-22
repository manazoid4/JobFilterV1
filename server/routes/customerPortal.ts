import type { Express, Request, Response } from 'express';
import Stripe from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: '2023-10-16' as any }) : null;
const DEFAULT_ORIGIN = process.env.VITE_SITE_URL || process.env.APP_URL || 'http://localhost:3000';

export function registerCustomerPortalRoute(app: Express) {
  app.post('/api/customer-portal', async (req: Request, res: Response) => {
    try {
      if (!stripe) return res.status(503).json({ error: 'Billing not configured' });

      const { email } = req.body ?? {};
      if (!email) return res.status(400).json({ error: 'email required' });

      // Find customer by email in Stripe
      const customers = await stripe.customers.list({ email, limit: 1 });
      if (!customers.data.length) {
        return res.status(404).json({ error: 'No billing account found for this email' });
      }

      const session = await stripe.billingPortal.sessions.create({
        customer: customers.data[0].id,
        return_url: `${req.headers.origin || DEFAULT_ORIGIN}/account`,
      });

      res.json({ url: session.url });
    } catch (err: any) {
      console.error('[customer-portal]', err?.message);
      res.status(500).json({ error: err.message || 'Failed to open billing portal' });
    }
  });
}
