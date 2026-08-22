import { NextRequest } from 'next/server';

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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const jobType = searchParams.get('jobType')?.trim() ?? '';
  const postcode = searchParams.get('postcode')?.trim() ?? '';
  const area = searchParams.get('area')?.trim() ?? '';
  const score = searchParams.get('score')?.trim() ?? '';
  const urgency = searchParams.get('urgency')?.trim() ?? '';
  const details = searchParams.get('details')?.trim() ?? '';
  const leadId = searchParams.get('leadId')?.trim() || String(Date.now());

  if (!jobType || !postcode) {
    return new Response('jobType and postcode are required', { status: 400 });
  }

  const ics = buildIcs({ leadId, jobType, postcode, area, score, urgency, details });
  const filename = `jobfilter-lead-${postcode.replace(/\s+/g, '')}.ics`;

  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
