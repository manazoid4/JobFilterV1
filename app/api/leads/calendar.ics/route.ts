import { NextRequest } from 'next/server';

function fmtUtc(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function escIcs(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r\n|\r|\n/g, '\\n');
}

function foldLine(line: string): string {
  // RFC 5545 §3.1: fold at 75 octets; continuation lines prefixed with a space
  const buf = Buffer.from(line, 'utf8');
  if (buf.length <= 75) return line;
  const chunks: string[] = [];
  let offset = 0;
  let first = true;
  while (offset < buf.length) {
    const limit = first ? 75 : 74; // leading space on continuation consumes 1 octet
    let end = Math.min(offset + limit, buf.length);
    // Walk back to a safe UTF-8 boundary (avoid splitting multi-byte sequences)
    while (end < buf.length && (buf[end] & 0xc0) === 0x80) end--;
    chunks.push((first ? '' : ' ') + buf.slice(offset, end).toString('utf8'));
    offset = end;
    first = false;
  }
  return chunks.join('\r\n');
}

function tomorrowLondonDate(): string {
  const londonFmt = (d: Date) =>
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(d);
  const today = londonFmt(new Date());
  const y = Number(today.find(x => x.type === 'year')!.value);
  const mo = Number(today.find(x => x.type === 'month')!.value);
  const d = Number(today.find(x => x.type === 'day')!.value);
  // Construct noon UTC on London's tomorrow to avoid DST edges in intermediate Date
  const next = new Date(Date.UTC(y, mo - 1, d + 1, 12, 0, 0));
  const tp = londonFmt(next);
  return (
    tp.find(x => x.type === 'year')!.value +
    tp.find(x => x.type === 'month')!.value +
    tp.find(x => x.type === 'day')!.value
  );
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
  const dateStr = tomorrowLondonDate();

  const descParts = [
    params.area ? `Area: ${escIcs(params.area)}` : '',
    params.score ? `Score: ${escIcs(params.score)}/100` : '',
    params.urgency ? `Urgency: ${escIcs(params.urgency)}` : '',
    params.details ? `Details: ${escIcs(params.details)}` : '',
    'Sent by JobFilter — jobfilter.co.uk',
  ].filter(Boolean);

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//JobFilter//Lead Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VTIMEZONE',
    'TZID:Europe/London',
    'BEGIN:STANDARD',
    'DTSTART:19701025T020000',
    'RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10',
    'TZNAME:GMT',
    'TZOFFSETFROM:+0100',
    'TZOFFSETTO:+0000',
    'END:STANDARD',
    'BEGIN:DAYLIGHT',
    'DTSTART:19700329T010000',
    'RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3',
    'TZNAME:BST',
    'TZOFFSETFROM:+0000',
    'TZOFFSETTO:+0100',
    'END:DAYLIGHT',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `DTSTART;TZID=Europe/London:${dateStr}T090000`,
    `DTEND;TZID=Europe/London:${dateStr}T100000`,
    `DTSTAMP:${fmtUtc(now)}`,
    `UID:jf-lead-${params.leadId}@jobfilter.co.uk`,
    `SUMMARY:${escIcs(`Follow up: ${params.jobType} – ${params.postcode}`)}`,
    `DESCRIPTION:${descParts.join('\\n')}`,
    `LOCATION:${escIcs(params.postcode)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].map(foldLine).join('\r\n');
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const jobType = searchParams.get('jobType')?.trim() ?? '';
  const postcode = searchParams.get('postcode')?.trim() ?? '';
  const area = searchParams.get('area')?.trim() ?? '';
  const score = searchParams.get('score')?.trim() ?? '';
  const urgency = searchParams.get('urgency')?.trim() ?? '';
  const details = searchParams.get('details')?.trim() ?? '';
  const leadId = (searchParams.get('leadId')?.trim() || String(Date.now())).replace(/[^\w-]/g, '');

  if (!jobType || !postcode) {
    return new Response('jobType and postcode are required', { status: 400 });
  }

  const ics = buildIcs({ leadId, jobType, postcode, area, score, urgency, details });
  const filename = `jobfilter-lead-${postcode.replace(/[^A-Za-z0-9]/g, '')}.ics`;

  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
