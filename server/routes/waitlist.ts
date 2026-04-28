import fs from 'fs/promises';
import path from 'path';
import type { Express, Request, Response } from 'express';
import { getApps, initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

export function registerWaitlistRoute(app: Express) {
  app.post('/api/waitlist', async (req: Request, res: Response) => {
    try {
      const entry = {
        name: clean(req.body?.name, 80),
        trade: clean(req.body?.trade, 60),
        contact: clean(req.body?.contact, 120),
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
  const firestore = getFirestoreIfAvailable();
  if (firestore) {
    await firestore.collection('waitlist').add(entry);
    return 'firestore';
  }

  const dataDir = path.join(process.cwd(), 'data');
  await fs.mkdir(dataDir, { recursive: true });
  await fs.appendFile(path.join(dataDir, 'waitlist.jsonl'), `${JSON.stringify(entry)}\n`, 'utf8');
  return 'local_jsonl';
}

function getFirestoreIfAvailable() {
  const projectId = process.env.GOOGLE_CLOUD_PROJECT || process.env.FIREBASE_PROJECT_ID;
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!projectId && !serviceAccountJson && process.env.NODE_ENV === 'development') return null;

  if (!getApps().length) {
    if (serviceAccountJson) {
      initializeApp({ credential: cert(JSON.parse(serviceAccountJson)) });
    } else {
      initializeApp({ credential: applicationDefault(), projectId });
    }
  }

  return getFirestore();
}

function clean(input: unknown, max: number) {
  return String(input ?? '').replace(/[<>]/g, '').trim().slice(0, max);
}
