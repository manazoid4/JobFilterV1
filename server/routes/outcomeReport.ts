import type { Express, Request, Response } from 'express';
import { readFileSync, appendFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';

type OutcomeRecord = { id: string; title: string; status: string; value?: string; postcode?: string; createdAt: string; lostReason?: string };

const DATA_DIR = path.join(process.cwd(), 'data');
const OUTCOMES_FILE = path.join(DATA_DIR, 'outcomes.jsonl');

const outcomes: Record<string, OutcomeRecord> = {};

// Load persisted outcomes on startup
function loadOutcomes() {
  try {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
    if (!existsSync(OUTCOMES_FILE)) return;
    const lines = readFileSync(OUTCOMES_FILE, 'utf8').split('\n').filter(Boolean);
    for (const line of lines) {
      try {
        const record: OutcomeRecord = JSON.parse(line);
        if (record.id) outcomes[record.id] = record;
      } catch { /* skip malformed line */ }
    }
  } catch { /* non-fatal — fresh start */ }
}

function persistOutcome(record: OutcomeRecord) {
  try {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
    appendFileSync(OUTCOMES_FILE, JSON.stringify(record) + '\n', 'utf8');
  } catch { /* non-fatal */ }
}

loadOutcomes();


export function registerOutcomeReportRoute(app: Express) {
  app.post('/api/leads/outcome', (req: Request, res: Response) => {
    try {
      const { leadId, status, title, value, lostReason, postcode } = req.body || {};
      if (!leadId || !status) {
        return res.status(422).json({ ok: false, error: 'leadId and status required.' });
      }
      const record: OutcomeRecord = {
        id: leadId,
        title: title || 'Unknown job',
        status,
        value: value || undefined,
        postcode: postcode || undefined,
        createdAt: outcomes[leadId]?.createdAt || new Date().toISOString(),
        lostReason: status === 'lost' ? lostReason : undefined,
      };
      outcomes[leadId] = record;
      persistOutcome(record);
      return res.json({ ok: true });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Outcome failed.') });
    }
  });

  app.get('/api/wins/stats', (req: Request, res: Response) => {
    try {
      const postcodePrefix = String(req.query.postcode || '').toUpperCase().slice(0, 4).trim();
      const won = Object.values(outcomes).filter((o) => o.status === 'won');

      const liveWonCount = won.length;
      const liveTotal = won.reduce((sum, o) => {
        const v = parseFloat(o.value?.replace(/[^0-9.]/g, '') || '0');
        return sum + (isNaN(v) ? 0 : v);
      }, 0);

      const totalWonCount = liveWonCount;
      const totalValue = liveTotal;

      return res.json({
        ok: true,
        postcodeArea: postcodePrefix || 'UK',
        wonCount: totalWonCount,
        totalValue,
        totalValueFormatted: `£${totalValue.toLocaleString()}`,
        message: totalWonCount > 0
          ? `${totalWonCount} trade${totalWonCount === 1 ? '' : 's'} in your area won jobs worth £${totalValue.toLocaleString()} via JobFilter`
          : 'Be the first trade in your area to log a win.',
      });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Stats failed.') });
    }
  });

  app.post('/api/leads/review-link', (req: Request, res: Response) => {
    try {
      const { leadId, customerName, trade } = req.body || {};
      const message = `Hi ${customerName || 'there'}, thanks for choosing us for your ${trade || 'trade'} work. If you're happy with the job, a quick Google review would mean the world — just paste your review link here before sending: [YOUR GOOGLE REVIEW LINK]`;
      return res.json({ ok: true, message });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Review link failed.') });
    }
  });

  app.get('/api/leads/summary', (_req: Request, res: Response) => {
    try {
      const all = Object.values(outcomes);
      const won = all.filter((o) => o.status === 'won');
      const wonCount = won.length;
      const totalValue = won.reduce((sum, o) => {
        const v = parseFloat(o.value?.replace(/[^0-9.]/g, '') || '0');
        return sum + (isNaN(v) ? 0 : v);
      }, 0);
      return res.json({
        ok: true,
        wonCount,
        totalValue: totalValue > 0 ? `£${totalValue.toLocaleString()}` : 'N/A',
        monthlyCost: 29,
        summary: wonCount > 0
          ? `${wonCount} jobs won. ~£${totalValue.toLocaleString()} total. £39 founder subscription.`
          : 'No won jobs tracked yet. Start tracking outcomes to see your ROI.',
      });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Summary failed.') });
    }
  });
}
