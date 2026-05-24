import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/src/lib/supabase';

export async function GET() {
  try {
    let count = 0;
    if (supabase) {
      const { count: dbCount, error } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true });
      
      if (!error) {
        count = dbCount || 0;
      }
    }

    const foundingMax = 30;
    const remaining = Math.max(0, foundingMax - count);
    
    return NextResponse.json({ ok: true, count, remaining, foundingMax });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: String(error?.message ?? 'Count failed.') }, { status: 500 });
  }
}
