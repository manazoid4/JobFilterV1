import express from 'express';
import path from 'path';
import { registerIntakeScoreRoute } from './routes/intakeScore';
import { registerLeadSearchRoute } from './routes/leadsSearch';
import { registerWaitlistRoute } from './routes/waitlist';
import { registerLeadNotifyRoute } from './routes/leadNotify';
import { registerWaitlistCountRoute } from './routes/waitlistCount';
import { registerChaseCheckRoute } from './routes/chaseCheck';
import { registerOutcomeReportRoute } from './routes/outcomeReport';
import { registerStripeRoutes } from './routes/stripe';
import { registerCalendarExportRoute } from './routes/calendarExport';
import { registerTerritorySummaryRoute } from './routes/territorySummary';
import { registerStatusRoute } from './routes/status';
import { registerMaterialPricesRoute } from './routes/materialPrices';
import { registerStartSignalsRoute } from './routes/startSignals';
import { registerSourceHealthSummaryRoute } from './routes/sourceHealthSummary';
import { registerSubscriptionStatusRoute } from './routes/subscriptionStatus';

export async function createApp() {
  const app = express();

  app.use('/api/stripe/webhook', express.raw({ type: 'application/json', limit: '64kb' }));
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
  registerCalendarExportRoute(app);
  registerTerritorySummaryRoute(app);
  registerStatusRoute(app);
  registerMaterialPricesRoute(app);
  registerStartSignalsRoute(app);
  registerSourceHealthSummaryRoute(app);
  registerSubscriptionStatusRoute(app);

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'jobfilter', source: 'lead_engine', ts: new Date().toISOString() });
  });

  // Bare /health for deployment health checks (Vercel, load balancers)
  app.get('/health', (_req, res) => {
    res.json({ ok: true, service: 'jobfilter', ts: new Date().toISOString() });
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
