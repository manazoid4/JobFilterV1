/**
 * GET /api/leads/calendar.ics
 * Returns a .ics calendar file for a lead follow-up reminder.
 * Params: leadId, jobType, postcode, area, score, urgency, details (optional)
 *
 * Used by CalendarCopyLink in LeadDetailPage to generate a shareable URL.
 * The client-side downloadIcs() covers direct download; this covers sharing.
 */

import { NextRequest, NextResponse } from 'next/server';

/** RFC 5545 §3.3.11 text escaping for TEXT property values. */
function escapeIcsText(raw: string): string {
  return raw
    .replace(/\\/g, '\\\\')   // \ → \\  (must be first)
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/** Format a Date as a DATE-only value (YYYYMMDD) — timezone-agnostic. */
function fmtDate(d: Date): string {
  return d.toISOString().slice(0, 10).replace(/-/g, '');
}

/** Format a Date as DTSTAMP / UTC datetime. */
function fmtDtstamp(d: Date): string {
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
  clientDate?: string; // YYYYMMDD from client — avoids UTC-vs-local midnight skew
}): string {
  const now = new Date();
  // Derive "tomorrow" from the client's local date when supplied so a UK user
  // at 00:30 BST (23:30 UTC) gets the correct next-day event, not today's date.
  const baseDate = params.clientDate?.match(/^\d{8}$/)
    ? new Date(`${params.clientDate.slice(0, 4)}-${params.clientDate.slice(4, 6)}-${params.clientDate.slice(6, 8)}`)
    : new Date();
  const startDate = new Date(baseDate);
  startDate.setDate(startDate.getDate() + 1);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 1); // DTEND exclusive for DATE events

  const descParts = [
    `Area: ${escapeIcsText(params.area || params.postcode)}`,
    `Urgency: ${escapeIcsText(params.urgency)}`,
    `Score: ${escapeIcsText(params.score)}/100`,
    params.details ? `Details: ${escapeIcsText(params.details)}` : '',
  ].filter(Boolean);

  const description = descParts.join('\\n');
  const summary = escapeIcsText(`Follow up: ${params.jobType} – ${params.postcode}`);
  const location = escapeIcsText(params.postcode);
  const uid = `jf-lead-${escapeIcsText(params.leadId)}@jobfilter.co.uk`;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//JobFilter//Lead Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART;VALUE=DATE:${fmtDate(startDate)}`,
    `DTEND;VALUE=DATE:${fmtDate(endDate)}`,
    `DTSTAMP:${fmtDtstamp(now)}`,
    `UID:${uid}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
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
  const clientDate = searchParams.get('date') || undefined;

  if (!postcode) {
    return new NextResponse('postcode required', { status: 400 });
  }

  const ics = buildIcs({ leadId, jobType, postcode, area, score, urgency, details, clientDate });
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
