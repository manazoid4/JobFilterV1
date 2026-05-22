import { createClient } from '@supabase/supabase-js';

// VITE_SUPABASE_URL works as fallback so only one env var needed in Vercel
const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.warn('[supabase] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set — DB writes disabled');
}

export const supabase = url && key
  ? createClient(url, key, { auth: { persistSession: false } })
  : null;
