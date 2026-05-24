import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/src/lib/supabase';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postcode = searchParams.get('postcode') || '';
  const area = postcode.slice(0, 2).toUpperCase();

  return NextResponse.json({
    ok: true,
    area,
    status: area ? 'Locked' : 'Open',
    slots: area ? 1 : 30,
    message: area ? `One trade partner active in ${area}` : 'Founding slots open'
  });
}
