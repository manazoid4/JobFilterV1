import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';

const FOUNDING_MAX = 30;

export async function GET() {
  try {
    let count = 0;
    const supabase = getSupabaseServiceClient();
    if (supabase) {
      const { count: dbCount, error } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true });
      if (!error && dbCount !== null) count = dbCount;
    }
    const remaining = Math.max(0, FOUNDING_MAX - count);
    return Response.json({ ok: true, count, remaining, foundingMax: FOUNDING_MAX });
  } catch (error: any) {
    return Response.json({ ok: false, error: String(error?.message ?? 'Count failed.') }, { status: 500 });
  }
}
