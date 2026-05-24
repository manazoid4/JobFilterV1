import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/src/lib/supabase';
import { sendWaitlistConfirmation } from '@/server/services/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const entry = {
      name: clean(body?.name, 80),
      trade: clean(body?.trade, 60),
      contact: clean(body?.contact, 120),
      contact_type: detectContactType(body?.contact),
      source: clean(body?.source, 80) || 'site',
    };

    if (!entry.name || !entry.trade || !entry.contact) {
      return NextResponse.json({ ok: false, error: 'Name, trade, and email or phone are required.' }, { status: 422 });
    }

    let storedId: any = null;
    if (supabase) {
      const { data, error } = await supabase
        .from('waitlist')
        .insert([entry])
        .select();
      
      if (error) {
        console.error('[api/waitlist] Supabase error:', error.message);
      } else {
        storedId = data?.[0]?.id;
      }
    }

    if (entry.contact_type === 'email') {
      sendWaitlistConfirmation(entry.name, entry.contact).catch(() => {});
    }

    return NextResponse.json({ ok: true, stored: { id: storedId, ...entry } });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: String(error?.message ?? 'Waitlist failed.') }, { status: 500 });
  }
}

function clean(input: unknown, max: number) {
  return String(input ?? '').replace(/[<>]/g, '').trim().slice(0, max);
}

function detectContactType(input: unknown) {
  const value = String(input ?? '').trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'email';
  if (/^\+?[\d\s().-]{8,}$/.test(value)) return 'phone';
  return 'unknown';
}
