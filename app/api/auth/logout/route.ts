import { NextResponse, type NextRequest } from 'next/server';
import { createAuthServerClient } from '../../../../src/lib/supabase/auth-server';

async function signOutAndRedirect(request: NextRequest) {
  const url = new URL(request.url);

  try {
    const supabase = await createAuthServerClient();
    await supabase.auth.signOut();
  } catch {
    // If env vars are missing or session is already gone, still redirect home.
  }

  return NextResponse.redirect(new URL('/', url.origin), { status: 303 });
}

export async function GET(request: NextRequest) {
  return signOutAndRedirect(request);
}

export async function POST(request: NextRequest) {
  return signOutAndRedirect(request);
}
