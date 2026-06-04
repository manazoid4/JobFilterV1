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
          configured: has('STRIPE_SECRET_KEY') && (has('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY') || has('STRIPE_PUBLISHABLE_KEY')),
          priceIds: {
            foundingMonthly: has('STRIPE_PRICE_FOUNDING_MONTHLY'),
            foundingAnnual: has('STRIPE_PRICE_FOUNDING_ANNUAL'),
            proMonthly: has('STRIPE_PRICE_PRO_MONTHLY'),
            proAnnual: has('STRIPE_PRICE_PRO_ANNUAL'),
            epcMonthly: has('STRIPE_PRICE_EPC_MONTHLY'),
          },
          webhookSecret: has('STRIPE_WEBHOOK_SECRET'),
        },
        supabase: {
          configured: (has('NEXT_PUBLIC_SUPABASE_URL') || has('SUPABASE_URL')) && has('SUPABASE_SERVICE_ROLE_KEY'),
          anonKey: has('NEXT_PUBLIC_SUPABASE_ANON_KEY') || has('SUPABASE_ANON_KEY'),
        },
        resend: {
          configured: has('RESEND_API_KEY'),
          senderEmail: has('RESEND_FROM_EMAIL') || has('RESEND_SENDER_EMAIL'),
        },
        n8n: {
          webhookUrl: has('N8N_WEBHOOK_URL'),
          api: has('N8N_API_URL') && has('N8N_API_KEY'),
        },
        whatsapp: {
          // Runtime in server/services/sms.ts uses Meta WhatsApp Cloud API.
          configured:
            has('WHATSAPP_PHONE_NUMBER_ID') &&
            has('WHATSAPP_ACCESS_TOKEN'),
          recipientOverride: has('WHATSAPP_TO'),
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
