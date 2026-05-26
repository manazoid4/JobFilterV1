import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let serviceClient: SupabaseClient | null = null;

export function getSupabaseServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  if (!serviceClient) {
    serviceClient = createClient(url, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return serviceClient;
}
