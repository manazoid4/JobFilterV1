/**
 * GET /api/leads/calendar.ics
 * Returns a .ics calendar file for a lead follow-up reminder.
 * Params: leadId, jobType, postcode, area, score, urgency, details (optional)
 *
 * Used by CalendarCopyLink in LeadDetailPage to generate a shareable URL.
 * The client-side downloadIcs() covers direct download; this covers sharing.
 */

import { NextRequest, NextResponse } from 'next/server';

function fmt(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function buildIcs(params: {
  leadId: string;
  jobType: string;
  postcode: string;
  area: string;
  score: string;
  urgency: string;
  details?: string;
}): string {
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() + 1);
  start.setHours(9, 0, 0, 0);
  const end = new Date(start);
  end.setHours(10, 0, 0, 0);

  const descParts = [
    `Area: ${params.area || params.postcode}`,
    `Urgency: ${params.urgency}`,
    `Score: ${params.score}/100`,
    params.details ? `Details: ${params.details}` : '',
  ].filter(Boolean);

  const description = descParts.join('\\n');
  const summary = `Follow up: ${params.jobType} – ${params.postcode}`;
  const uid = `jf-lead-${params.leadId}@jobfilter.co.uk`;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//JobFilter//Lead Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `DTSTAMP:${fmt(now)}`,
    `UID:${uid}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${params.postcode}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.join('\r\n');
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const leadId = searchParams.get('leadId') || 'unknown';
  const jobType = searchParams.get('jobType') || 'Trade job';
  const postcode = searchParams.get('postcode') || '';
  const area = searchParams.get('area') || postcode;
  const score = searchParams.get('score') || '0';
  const urgency = searchParams.get('urgency') || 'This week';
  const details = searchParams.get('details') || undefined;

  if (!postcode) {
    return new NextResponse('postcode required', { status: 400 });
  }

  const ics = buildIcs({ leadId, jobType, postcode, area, score, urgency, details });
  const filename = `jobfilter-lead-${postcode.replace(/\s+/g, '')}.ics`;

  return new NextResponse(ics, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
