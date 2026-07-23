import { createServerClient } from '@supabase/ssr';
import type { User } from '@supabase/supabase-js';
import type { Request } from 'express';
import { isOwnerEmail } from './ownerAccess';
import { supabase } from './supabase';

export type RequestAccess = {
  userId: string;
  email: string;
  isOwner: boolean;
  isPaid: boolean;
};

/** Resolve the authenticated Supabase user from a bearer token or SSR auth cookies. */
export async function resolveRequestAccess(req: Request): Promise<RequestAccess | null> {
  const user = await resolveUser(req);
  if (!user) return null;

  const email = user.email?.trim().toLowerCase() ?? '';
  const isOwner = isOwnerEmail(email);
  let isPaid = isOwner;

  if (!isPaid && supabase) {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('active, status')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    isPaid = !!(subscription?.active || subscription?.status === 'active');
  }

  return { userId: user.id, email, isOwner, isPaid };
}

async function resolveUser(req: Request): Promise<User | null> {
  const authorization = req.headers.authorization;
  if (authorization?.startsWith('Bearer ')) {
    const token = authorization.slice(7).trim();
    if (!token || !supabase) return null;
    const { data, error } = await supabase.auth.getUser(token);
    return error ? null : data.user;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !anonKey || !req.headers.cookie) return null;

  try {
    const authClient = createServerClient(url, anonKey, {
      cookies: {
        getAll: () => parseCookieHeader(req.headers.cookie ?? ''),
        setAll: () => undefined,
      },
    });
    const { data, error } = await authClient.auth.getUser();
    return error ? null : data.user;
  } catch {
    return null;
  }
}

function parseCookieHeader(header: string) {
  return header
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const separator = part.indexOf('=');
      const name = separator === -1 ? part : part.slice(0, separator);
      const rawValue = separator === -1 ? '' : part.slice(separator + 1);
      try {
        return { name, value: decodeURIComponent(rawValue) };
      } catch {
        return { name, value: rawValue };
      }
    });
}
