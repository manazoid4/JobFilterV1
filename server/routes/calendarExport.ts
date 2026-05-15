import type { Express, Request, Response } from 'express';

function fmt(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function buildIcs(params: {
  leadId: string;
  jobType: string;
  postcode: string;
  area: string;
  score?: string;
  urgency?: string;
  details?: string;
}): string {
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() + 1);
  start.setHours(9, 0, 0, 0);
  const end = new Date(start);
  end.setHours(10, 0, 0, 0);

  const descParts = [
    params.area ? `Area: ${params.area}` : '',
    params.score ? `Score: ${params.score}/100` : '',
    params.urgency ? `Urgency: ${params.urgency}` : '',
    params.details ? `Details: ${params.details}` : '',
    'Sent by JobFilter — jobfilter.co.uk',
  ].filter(Boolean);

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//JobFilter//Lead Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `DTSTAMP:${fmt(now)}`,
    `UID:jf-lead-${params.leadId}@jobfilter.co.uk`,
    `SUMMARY:Follow up: ${params.jobType} – ${params.postcode}`,
    `DESCRIPTION:${descParts.join('\\n')}`,
    `LOCATION:${params.postcode}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function registerCalendarExportRoute(app: Express) {
  app.get('/api/leads/calendar.ics', (req: Request, res: Response) => {
    const jobType = String(req.query.jobType ?? '').trim();
    const postcode = String(req.query.postcode ?? '').trim();
    const area = String(req.query.area ?? '').trim();
    const score = String(req.query.score ?? '').trim();
    const urgency = String(req.query.urgency ?? '').trim();
    const details = String(req.query.details ?? '').trim();
    const leadId = String(req.query.leadId ?? Date.now()).trim();

    if (!jobType || !postcode) {
      res.status(400).send('jobType and postcode are required');
      return;
    }

    const ics = buildIcs({ leadId, jobType, postcode, area, score, urgency, details });
    const filename = `jobfilter-lead-${postcode.replace(/\s+/g, '')}.ics`;

    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(ics);
  });
}
