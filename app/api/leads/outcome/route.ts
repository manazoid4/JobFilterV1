import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/src/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { leadId, status, title, value, lostReason, postcode } = await req.json();
    
    if (!leadId || !status) {
      return NextResponse.json({ ok: false, error: 'leadId and status required.' }, { status: 422 });
    }

    if (supabase) {
      const { error } = await supabase
        .from('lead_outcomes')
        .insert([{
          lead_id: leadId,
          status,
          value: value ? parseFloat(String(value).replace(/[^0-9.]/g, '')) : null,
          lost_reason: lostReason,
          postcode
        }]);
      
      if (error) {
        console.error('[api/leads/outcome] Supabase error:', error.message);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: String(error?.message ?? 'Outcome failed.') }, { status: 500 });
  }
}
