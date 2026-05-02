import fs from 'fs/promises';
import path from 'path';
import type { Express, Request, Response } from 'express';

export function registerWaitlistRoute(app: Express) {
  app.post('/api/waitlist', async (req: Request, res: Response) => {
    try {
      const entry = {
        name: clean(req.body?.name, 80),
        trade: clean(req.body?.trade, 60),
        contact: clean(req.body?.contact, 120),
        contactType: detectContactType(req.body?.contact),
        source: clean(req.body?.source, 80) || 'site',
        createdAt: new Date().toISOString(),
      };

      if (!entry.name || !entry.trade || !entry.contact) {
        return res.status(422).json({ ok: false, error: 'Name, trade, and email or phone are required.' });
      }

      const stored = await storeWaitlistEntry(entry);
      return res.json({ ok: true, stored });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Waitlist failed.') });
    }
  });
}

async function storeWaitlistEntry(entry: Record<string, string>) {
  const dataDir = path.join(process.cwd(), 'data');
  await fs.mkdir(dataDir, { recursive: true });
  await fs.appendFile(path.join(dataDir, 'waitlist.jsonl'), `${JSON.stringify(entry)}\n`, 'utf8');
  return 'local_jsonl';
}

function clean(input: unknown, max: number) {
  return String(input ?? '').replace(/[<>]/g, '').trim().slice(0, max);
}

function detectContactType(input: unknown) {
  const value = String(input ?? '').trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'email';
  if (/^\+?[\d\s().-]{8,}$/.test(value)) return 'phone';
  return 'unknown';
}
