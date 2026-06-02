/**
 * GET /api/leads/roi-stats
 * Returns aggregate outcome stats for the authenticated paid user.
 * Reads from lead_outcomes table in Supabase.
 * Requires: paid subscription or owner access.
 */

import { createAuthServerClient } from '../../../../src/lib/supabase/auth-server';
import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';
import { isOwnerEmail } from '../../../../server/lib/ownerAccess';

const FULL_ACCESS_TEST_MODE = process.env.FULL_ACCESS_TEST_MODE === 'true';

export async function GET() {
  if (!FULL_ACCESS_TEST_MODE) {
    try {
      const authClient = await createAuthServerClient();
      const { data, error } = await authClient.auth.getUser();
      if (error || !data.user) {
        return Response.json({ ok: false, error: 'Unauthenticated' }, { status: 401 });
      }

      const email = data.user.email ?? '';
      if (!isOwnerEmail(email)) {
        const admin = getSupabaseServiceClient();
        if (!admin) {
          return Response.json({ ok: false, error: 'Supabase service not configured' }, { status: 503 });
        }
        const { data: sub } = await admin
          .from('subscriptions')
          .select('active, status')
          .eq('user_id', data.user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (!sub?.active && sub?.status !== 'active') {
          return Response.json({ ok: false, error: 'Paid subscription required' }, { status: 403 });
        }
      }
    } catch {
      return Response.json({ ok: false, error: 'Auth check failed' }, { status: 500 });
    }
  }

  const admin = getSupabaseServiceClient();
  if (!admin) {
    return Response.json({ ok: false, error: 'Supabase not configured' }, { status: 503 });
  }

  const { data: rows, error: dbError } = await admin
    .from('lead_outcomes')
    .select('status, won_value, quote_value, contacted_at, quoted_at, won_at, created_at')
    .order('created_at', { ascending: false })
    .limit(500);

  if (dbError) {
    return Response.json({ ok: false, error: dbError.message }, { status: 500 });
  }

  const outcomes = (rows ?? []) as {
    status: string;
    won_value: number | null;
    quote_value: number | null;
    contacted_at: string | null;
    quoted_at: string | null;
    won_at: string | null;
    created_at: string;
  }[];

  const CONTACTED_STATUSES = new Set(['contacted', 'answered', 'quoted', 'won', 'lost', 'no_answer']);
  const contacted = outcomes.filter((r) => CONTACTED_STATUSES.has(r.status));
  const quoted = outcomes.filter((r) => r.status === 'quoted' || r.status === 'won');
  const won = outcomes.filter((r) => r.status === 'won');

  const totalQuotedValue = quoted.reduce((s, r) => s + Number(r.quote_value ?? 0), 0);
  const totalWonValue = won.reduce((s, r) => s + Number(r.won_value ?? r.quote_value ?? 0), 0);
  const winRate = quoted.length > 0 ? (won.length / quoted.length) * 100 : 0;

  const leadToQuoteTimes = quoted
    .filter((r) => r.created_at && r.quoted_at)
    .map((r) => {
      const ms = new Date(r.quoted_at!).getTime() - new Date(r.created_at).getTime();
      return ms / (1000 * 60 * 60);
    })
    .filter((h) => h > 0 && h < 8760);

  const avgLeadToQuoteHours =
    leadToQuoteTimes.length > 0
      ? leadToQuoteTimes.reduce((s, h) => s + h, 0) / leadToQuoteTimes.length
      : null;

  return Response.json({
    ok: true,
    stats: {
      totalContacted: contacted.length,
      totalQuoted: quoted.length,
      totalQuotedValue,
      totalWon: won.length,
      totalWonValue,
      winRate,
      avgLeadToQuoteHours,
    },
  });
}
