import { NextRequest } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

interface Outcome {
  postcode_outward: string;
  trade: string;
  value: number;
  wonAt: string;
}

function readOutcomes(): Outcome[] {
  try {
    const file = path.join(process.cwd(), 'data', 'outcomes.jsonl');
    if (!fs.existsSync(file)) return [];
    const lines = fs.readFileSync(file, 'utf8').split('\n').filter(Boolean);
    return lines
      .map((l) => { try { return JSON.parse(l) as Outcome; } catch { return null; } })
      .filter((o): o is Outcome => !!o);
  } catch {
    return [];
  }
}

function formatValue(total: number): string {
  if (total >= 1_000_000) return `£${(total / 1_000_000).toFixed(1)}m`;
  if (total >= 1_000) return `£${Math.round(total / 1_000)}k`;
  return `£${total.toLocaleString('en-GB')}`;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const postcode = searchParams.get('postcode')?.trim().toUpperCase() ?? '';

  const outcomes = readOutcomes();

  const nineDaysAgo = Date.now() - 90 * 24 * 60 * 60 * 1000;
  const recent = outcomes.filter((o) => {
    const t = Date.parse(o.wonAt);
    return !isNaN(t) && t >= nineDaysAgo;
  });

  const nearby = postcode
    ? recent.filter((o) => o.postcode_outward.startsWith(postcode.slice(0, 2)))
    : recent;

  const wonCount = nearby.length;
  if (wonCount === 0) {
    return Response.json({ ok: true, wonCount: 0 });
  }

  const totalValue = nearby.reduce((s, o) => s + (o.value || 0), 0);
  const totalFormatted = formatValue(totalValue);
  const area = postcode || 'your area';

  const message =
    wonCount === 1
      ? `1 trade won a job near ${area} in the last 90 days via JobFilter`
      : `${wonCount} trades won jobs near ${area} in the last 90 days — ${totalFormatted} in verified work`;

  return Response.json({ ok: true, wonCount, totalValueFormatted: totalFormatted, message });
}
