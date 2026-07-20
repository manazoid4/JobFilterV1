import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// Server-side guard for member-only areas. The client-side guard in
// DashboardPage handles UX; this stops unauthenticated requests reaching
// protected routes at all (defense in depth).
const PROTECTED = ['/dashboard', '/leads', '/account', '/tradie-zone', '/dev-portal', '/test'];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });
  const { pathname } = request.nextUrl;
  const isInternalRoute = pathname === '/dev-portal' || pathname.startsWith('/dev-portal/') || pathname === '/test' || pathname.startsWith('/test/');

  if (process.env.NODE_ENV === 'production' && isInternalRoute) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
  // If auth isn't configured, let requests through rather than locking everyone out.
  if (!url || !anonKey) return response;

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();

  const isProtected = PROTECTED.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (!user && isProtected) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/leads/:path*', '/account/:path*', '/tradie-zone/:path*', '/dev-portal/:path*', '/test/:path*'],
};
