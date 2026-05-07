import type { Express, Request, Response } from 'express';
import { supabase } from '../lib/supabase';

export function registerOutcomeReportRoute(app: Express) {
  app.post('/api/leads/outcome', async (req: Request, res: Response) => {
    try {
      const { leadId, status, title, value, lostReason } = req.body || {};
      if (!leadId || !status) {
        return res.status(422).json({ ok: false, error: 'leadId and status required.' });
      }

      if (supabase) {
        const { error } = await supabase.from('outcomes').upsert(
          {
            lead_id: leadId,
            title: title || 'Unknown job',
            status,
            value: value || null,
            lost_reason: status === 'lost' ? (lostReason || null) : null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'lead_id', ignoreDuplicates: false },
        );
        if (error) throw error;
      }

      return res.json({ ok: true });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Outcome failed.') });
    }
  });

  app.post('/api/leads/review-link', (req: Request, res: Response) => {
    try {
      const { customerName, trade } = req.body || {};
      const reviewUrl = 'https://g.page/r/yourbusiness/review';
      const message = `Hi ${customerName || 'there'}, thanks for choosing us for your ${trade || 'trade'} work. If you're happy with the job, a quick review here would mean the world: ${reviewUrl}`;
      return res.json({ ok: true, reviewUrl, message });
    } catch (error: any) {
      return res.status(500).json({ ok: false, error: String(error?.message ?? 'Review link failed.') });
    }
  });

  app.get('/api/leads/summary', async (_req: Request, res: Response) => {
    try {
      if (!supabase) {
        return res.json({ ok: true, wonCount: 0, totalValue: 'N/A', monthlyCost: 29, summary: 'No won jobs tracked yet.' });
      }

      const { data, error } = await supabase
        .from('outcomes')
        .select('status, value')
        .eq('status', 'won');
      if (error) throw error;

      const won = data ?? [];
      const wonCount = won.length;
      const totalValue = won.reduce((sum, o) => {
        const v = parseFloat((o.value || '0').replace(/[^0-9.]/g, ''));
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
