import { NextRequest, NextResponse } from 'next/server';
import { triggerGoldLeadWhatsApp } from '@/server/services/sms';

// This is a simplified in-memory store for nudges. In production, use Supabase.
const nudgeCache = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    const { leadId, phoneNumber, trade, area } = await req.json();
    
    if (!leadId || !phoneNumber) {
      return NextResponse.json({ ok: false, error: 'leadId and phoneNumber required.' }, { status: 422 });
    }

    if (nudgeCache.has(leadId)) {
      return NextResponse.json({ ok: true, nudged: false, reason: 'already_nudged' });
    }

    nudgeCache.add(leadId);
    
    const result = await triggerGoldLeadWhatsApp({
      leadId,
      score: 75,
      jobType: trade || 'Trade',
      area: area || 'your area',
      budget: undefined,
      phone: phoneNumber,
      postcode: undefined,
      ghostRisk: 'MAYBE',
      qualityLabel: 'SILVER',
    });

    return NextResponse.json({ ok: true, nudged: true, result });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: String(error?.message ?? 'Nudge failed.') }, { status: 500 });
  }
}
