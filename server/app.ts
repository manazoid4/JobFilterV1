import express from 'express';
import { randomUUID } from 'node:crypto';
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
import { registerSourceConfigRoute } from './routes/sourceConfig';
import { registerLeadEmailChaseRoute } from './routes/leadEmailChase';
import { registerReadinessRoute } from './routes/readiness';

export async function createApp() {
  const app = express();

  app.use('/api/stripe/webhook', express.raw({ type: 'application/json', limit: '64kb' }));
  app.use(express.json({ limit: '64kb' }));
  app.use((req, res, next) => {
    const requestId = String(req.headers['x-request-id'] ?? '').trim().slice(0, 100) || randomUUID();
    res.locals.requestId = requestId;
    res.setHeader('X-Request-Id', requestId);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    const startedAt = Date.now();
    res.once('finish', () => console.log(JSON.stringify({
      event: 'http_request', requestId, method: req.method, path: req.path,
      status: res.statusCode, durationMs: Date.now() - startedAt,
    })));
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
  registerSourceConfigRoute(app);
  registerLeadEmailChaseRoute(app);
  registerReadinessRoute(app);

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'jobfilter', source: 'lead_engine', ts: new Date().toISOString() });
  });

  // Bare /health for deployment health checks (Vercel, load balancers)
  app.get('/health', (_req, res) => {
    res.json({ ok: true, service: 'jobfilter', ts: new Date().toISOString() });
  });

  app.use((_req, res) => {
    res.status(404).json({ ok: false, error: 'Not found' });
  });

  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(JSON.stringify({ event: 'unhandled_error', requestId: res.locals.requestId, message: err?.message ?? String(err) }));
    res.status(500).json({
      ok: false,
      source: 'lead_engine',
      count: 0,
      region: '',
      outward: '',
      leads: [],
      errors: ['internal server error'],
      requestId: res.locals.requestId,
    });
  });

  return app;
}
