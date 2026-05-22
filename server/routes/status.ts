import type { Express, Request, Response } from 'express';

export function registerStatusRoute(app: Express) {
  app.get('/api/status', (_req: Request, res: Response) => {
    const env = process.env;
    const has = (k: string) => Boolean(env[k] && String(env[k]).trim() !== '');

    res.json({
      ok: true,
      service: 'jobfilter',
      generatedAt: new Date().toISOString(),
      integrations: {
        stripe: {
          configured: has('STRIPE_SECRET_KEY') && has('STRIPE_PUBLISHABLE_KEY'),
          priceIds: {
            foundingMonthly: has('STRIPE_PRICE_FOUNDING_MONTHLY'),
            foundingAnnual: has('STRIPE_PRICE_FOUNDING_ANNUAL'),
            proMonthly: has('STRIPE_PRICE_PRO_MONTHLY'),
            proAnnual: has('STRIPE_PRICE_PRO_ANNUAL'),
          },
          webhookSecret: has('STRIPE_WEBHOOK_SECRET'),
        },
        supabase: {
          configured: has('SUPABASE_URL') && has('SUPABASE_SERVICE_ROLE_KEY'),
        },
        resend: {
          configured: has('RESEND_API_KEY'),
        },
        twilio: {
          // Runtime in server/services/sms.ts requires TWILIO_WHATSAPP_TO and
          // defaults TWILIO_WHATSAPP_FROM, so match that contract here.
          configured:
            has('TWILIO_ACCOUNT_SID') &&
            has('TWILIO_AUTH_TOKEN') &&
            has('TWILIO_WHATSAPP_TO'),
          fromOverride: has('TWILIO_WHATSAPP_FROM'),
        },
        companiesHouse: {
          configured: has('COMPANIES_HOUSE_API_KEY'),
        },
        epc: {
          configured: has('EPC_BEARER_TOKEN'),
        },
      },
      flags: {
        nodeEnv: env.NODE_ENV ?? 'development',
        vercel: env.VERCEL === '1',
        fullAccessTestMode: env.FULL_ACCESS_TEST_MODE === 'true',
      },
    });
  });
}
