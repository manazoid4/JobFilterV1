// Legacy entry point — kept so existing imports continue to work.
// Now uses the SSR-cookie browser client so sessions are visible to server code.
import { createBrowserClient } from '@supabase/ssr';

const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || '') as string;
const anonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '') as string;

if (!url || !anonKey) {
  console.warn('[supabase] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY not set — Supabase unavailable');
}

export const supabase = url && anonKey
  ? createBrowserClient(url, anonKey)
  : null;
