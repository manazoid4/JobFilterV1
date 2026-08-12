"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { clearStoredLeads } from '../lib/leadStore';

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const prevUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      prevUserIdRef.current = data.session?.user?.id ?? null;
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const incomingUserId = session?.user?.id ?? null;
      setSession(session);
      setUser(session?.user ?? null);
      if (typeof window !== 'undefined') {
        if (event === 'SIGNED_OUT') {
          clearStoredLeads();
          localStorage.removeItem('jobfilter.find.tracked');
          localStorage.removeItem('jobfilter.paid_access');
        } else if (event === 'SIGNED_IN' && prevUserIdRef.current !== null && prevUserIdRef.current !== incomingUserId) {
          // Account switch without an intervening SIGNED_OUT — clear previous user's paid data.
          clearStoredLeads();
          localStorage.removeItem('jobfilter.find.tracked');
          localStorage.removeItem('jobfilter.paid_access');
        }
      }
      prevUserIdRef.current = incomingUserId;
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signUp(email: string, password: string) {
    if (!supabase) return { error: 'Auth not available' };
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return { error: error.message };
    // Notify backend — fires welcome email + n8n new_signup trigger
    fetch('/api/auth/signup-hook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }).catch(() => {});
    return { error: null };
  }

  async function signIn(email: string, password: string) {
    if (!supabase) return { error: 'Auth not available' };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  }

  async function signOut() {
    if (supabase) {
      await supabase.auth.signOut();
    }
    // Also clear the SSR cookie so server components stop seeing the session.
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore — client session is already cleared above
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
