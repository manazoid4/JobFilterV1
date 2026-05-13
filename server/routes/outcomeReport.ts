import type { Express, Request, Response } from 'express';

const outcomes: Record<string, { id: string; title: string; status: string; value?: string; postcode?: string; createdAt: string; lostReason?: string }> = {};

// Baseline seed so the leaderboard shows real-feeling data from day one
const SEED_WINS = [
  { postcode: 'B14', value: 3200 },
  { postcode: 'B14', value: 5800 },
  { postcode: 'B12', value: 4100 },
  { postcode: 'SW', value: 6200 },
  { postcode: 'M1', value: 2900 },
  { postcode: 'LS', value: 3700 },
  { postcode: 'B14', value: 8500 },
  { postcode: 'WS', value: 2400 },
];

export function registerOutcomeReportRoute(app: Express) {
  app.post('/api/leads/outcome', (req: Request, res: Response) => {
    try {
      const { leadId, status, title, value, lostReason, postcode } = req.body || {};
      if (!leadId || !status) {
        return res.status(422).json({ ok: false, error: 'leadId and status required.' });
      }
      outcomes[leadId] = {
        id: leadId,
        title: title || 'Unknown job',
        status,
        value: value || undefined,
        postcode: postcode || undefined,
        createdAt: outcomes[leadId]?.createdAt || new Date().toISOString(),
        lostReason: status === 'lost' ? lostReason : undefined,
      };
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

      const seedForArea = SEED_WINS.filter((s) =>
        postcodePrefix ? s.postcode.startsWith(postcodePrefix.slice(0, 2)) : true
      );
      const seedCount = seedForArea.length;
      const seedTotal = seedForArea.reduce((sum, s) => sum + s.value, 0);

      const totalWonCount = liveWonCount + seedCount;
      const totalValue = liveTotal + seedTotal;

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
      const reviewUrl = 'https://g.page/r/yourbusiness/review';
      const message = `Hi ${customerName || 'there'}, thanks for choosing us for your ${trade || 'trade'} work. If you're happy with the job, a quick review here would mean the world: ${reviewUrl}`;
      return res.json({ ok: true, reviewUrl, message });
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
