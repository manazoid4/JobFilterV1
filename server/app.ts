import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { registerIntakeScoreRoute } from './routes/intakeScore';
import { registerLeadSearchRoute } from './routes/leadsSearch';
import { registerWaitlistRoute } from './routes/waitlist';

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

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'jobfilter', source: 'contracts_finder' });
  });

  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('[server]', err?.message ?? err);
    res.status(500).json({
      ok: false,
      source: 'contracts_finder',
      count: 0,
      region: '',
      outward: '',
      leads: [],
      errors: ['internal server error'],
    });
  });

  if (process.env.NODE_ENV !== 'production' && process.env.VERCEL !== '1') {
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
  return createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
}
