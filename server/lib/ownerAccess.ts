/**
 * Owner / superuser access.
 * JOBFILTER_SUPERUSER_EMAILS env var (comma-separated) grants full business-tier access.
 * manazoid4@gmail.com is always included.
 * This is server-side only — never export to client bundles.
 */

const DEFAULT_OWNER_EMAILS = ['manazoid4@gmail.com'];

function buildOwnerSet(): Set<string> {
  const envList = process.env.JOBFILTER_SUPERUSER_EMAILS ?? '';
  const fromEnv = envList
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean);
  return new Set([...DEFAULT_OWNER_EMAILS.map(e => e.toLowerCase()), ...fromEnv]);
}

// Evaluated once at startup — safe for long-lived server processes.
const OWNER_EMAILS = buildOwnerSet();

export function isOwnerEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return OWNER_EMAILS.has(email.trim().toLowerCase());
}

/**
 * Resolve whether a Supabase user token belongs to an owner.
 * Returns the owner email if matched, null otherwise.
 */
export async function resolveOwnerFromToken(token: string): Promise<string | null> {
  try {
    const { supabase } = await import('./supabase');
    if (!supabase) return null;
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user?.email) return null;
    return isOwnerEmail(user.email) ? user.email : null;
  } catch {
    return null;
  }
}

/**
 * Resolve whether a user_id belongs to an owner by looking up the profiles table.
 */
export async function resolveOwnerFromUserId(userId: string): Promise<boolean> {
  try {
    const { supabase } = await import('./supabase');
    if (!supabase) return false;
    const { data } = await supabase.from('profiles').select('email').eq('id', userId).limit(1).single();
    return isOwnerEmail(data?.email);
  } catch {
    return false;
  }
}
