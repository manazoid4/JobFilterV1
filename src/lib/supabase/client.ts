import { createBrowserClient } from '@supabase/ssr';

export function createBrowserSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Login is temporarily unavailable. Please try again later.');
  }

  // Uses @supabase/ssr so the PKCE code verifier is stored in cookies,
  // not localStorage — this lets the server-side /auth/callback route
  // exchange the code without needing localStorage access.
  return createBrowserClient(url, anonKey);
}
