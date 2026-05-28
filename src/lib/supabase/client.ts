import { createClient } from '@supabase/supabase-js';

export function createBrowserSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Login is temporarily unavailable. Please try again later.');
  }

  return createClient(url, anonKey);
}
