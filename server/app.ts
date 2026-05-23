import express from 'express';
import path from 'path';
import { registerIntakeScoreRoute } from './routes/intakeScore.js';
import { registerLeadSearchRoute } from './routes/leadsSearch.js';
import { registerWaitlistRoute } from './routes/waitlist.js';
import { registerLeadNotifyRoute } from './routes/leadNotify.js';
import { registerWaitlistCountRoute } from './routes/waitlistCount.js';
import { registerChaseCheckRoute } from './routes/chaseCheck.js';
import { registerOutcomeReportRoute } from './routes/outcomeReport.js';
import { registerStripeRoutes } from './routes/stripe.js';
import { registerSubscriptionStatusRoute } from './routes/subscriptionStatus.js';
import { registerAuthHookRoute } from './routes/authHook.js';
import { registerCalendarExportRoute } from './routes/calendarExport.js';
import { registerTerritorySummaryRoute } from './routes/territorySummary.js';
import { registerStatusRoute } from './routes/status.js';
import { registerMaterialPricesRoute } from './routes/materialPrices.js';
import { registerStartSignalsRoute } from './routes/startSignals.js';
import { registerSourceHealthSummaryRoute } from './routes/sourceHealthSummary.js';
import { registerCustomerPortalRoute } from './routes/customerPortal.js';
import { registerSourceConfigRoute } from './routes/sourceConfig.js';

export async function createApp() {
  const app = express();

  app.use(express.json({ limit: '64kb' }));
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  });

  registerIntakeScoreRoute(app);
  registerLeadSearchRoute(app);
  registerWaitlistRoute(app);
  registerLeadNotifyRoute(app);
  registerWaitlistCountRoute(app);
  registerChaseCheckRoute(app);
  registerOutcomeReportRoute(app);
  registerStripeRoutes(app);
  registerSubscriptionStatusRoute(app);
  registerAuthHookRoute(app);
  registerCalendarExportRoute(app);
  registerTerritorySummaryRoute(app);
  registerStatusRoute(app);
  registerMaterialPricesRoute(app);
  registerStartSignalsRoute(app);
  registerSourceHealthSummaryRoute(app);
  registerCustomerPortalRoute(app);
  registerSourceConfigRoute(app);

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'jobfilter', source: 'lead_engine' });
  });

  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('[server]', err?.message ?? err);
    res.status(500).json({
      ok: false,
      source: 'lead_engine',
      count: 0,
      region: '',
      outward: '',
      leads: [],
      errors: ['internal server error'],
    });
  });

  if (process.env.VERCEL === '1') {
    // Vercel serves static files itself — no static middleware needed here
  } else if (process.env.NODE_ENV !== 'production') {
    const vite = await createServerVite();
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
  }

  return app;
}

async function createServerVite() {
  const { createServer: createViteServer } = await import('vite');
  return createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
}
