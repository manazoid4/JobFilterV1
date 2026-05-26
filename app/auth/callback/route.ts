import { NextResponse, type NextRequest } from 'next/server';
import { createAuthServerClient } from '../../../src/lib/supabase/auth-server';
import { getSupabaseServiceClient } from '../../../src/lib/supabase/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const next = safeNext(url.searchParams.get('next'));

  if (!code) {
    return NextResponse.redirect(new URL('/signup?error=missing-code', url.origin));
  }

  const supabase = await createAuthServerClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(new URL('/signup?error=auth-code', url.origin));
  }

  const user = data.user;
  const admin = getSupabaseServiceClient();
  if (admin && user) {
    const metadata = user.user_metadata ?? {};
    await admin.from('profiles').upsert({
      id: user.id,
      email: user.email,
      company_name: text(metadata.company_name),
      phone: text(metadata.phone),
      trade: text(metadata.trade),
      postcode_outward: text(metadata.postcode_outward),
      plan: text(metadata.intended_plan) || 'free',
      onboarding_status: 'confirmed',
      updated_at: new Date().toISOString(),
    }, { onConflict: 'id' });
  }

  return NextResponse.redirect(new URL(next, url.origin));
}

function safeNext(next: string | null) {
  if (!next || !next.startsWith('/') || next.startsWith('//')) return '/activation-pending';
  return next;
}

function text(value: unknown) {
  return typeof value === 'string' ? value : '';
}
