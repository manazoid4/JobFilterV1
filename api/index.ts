import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createApp } from '../server/app';

let appReady: Awaited<ReturnType<typeof createApp>> | null = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!appReady) appReady = await createApp();
  return new Promise<void>((resolve, reject) => {
    appReady!(req as any, res as any, (err: unknown) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
