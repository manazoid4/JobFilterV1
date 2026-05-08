import type { Express, Request, Response } from 'express';

const outcomes: Record<string, { id: string; title: string; status: string; value?: string; createdAt: string; lostReason?: string }> = {};

export function registerOutcomeReportRoute(app: Express) {
  app.post('/api/leads/outcome', (req: Request, res: Response) => {
    try {
      const { leadId, status, title, value, lostReason } = req.body || {};
      if (!leadId || !status) {
        return res.status(422).json({ ok: false, error: 'leadId and status required.' });
      }
      outcomes[leadId] = {
        id: leadId,
        title: title || 'Unknown job',
        status,
        value: value || undefined,
        createdAt: outcomes[leadId]?.createdAt || new Date().toISOString(),
        lostReason: status === 'lost' ? lostReason : undefined,
      };
      return res.json({ ok: true });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Outcome failed.') });
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
          ? `${wonCount} jobs won. ~£${totalValue.toLocaleString()} total. £29 subscription.`
          : 'No won jobs tracked yet. Start tracking outcomes to see your ROI.',
      });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Summary failed.') });
    }
  });
}
