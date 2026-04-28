import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { registerLeadSearchRoute } from './server/routes/leadsSearch';

async function startServer() {
  const app = express();

  app.use(express.json({ limit: '64kb' }));
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  });

  registerLeadSearchRoute(app);

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

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
  }

  const port = Number(process.env.PORT || 3000);
  app.listen(port, '0.0.0.0', () => {
    console.log(`JobFilter running on http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error('Server failed:', error);
  process.exit(1);
});
