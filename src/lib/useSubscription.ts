import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthProvider';

export interface SubscriptionStatus {
  tier: 'free' | 'founding' | 'pro' | 'business';
  status: 'active' | 'trialing' | 'inactive' | 'past_due' | 'canceled' | 'cancelled' | 'unpaid' | 'incomplete' | 'incomplete_expired' | 'paused';
  active: boolean;
  loading: boolean;
}

const DEFAULT: SubscriptionStatus = { tier: 'free', status: 'inactive', active: false, loading: true };

export function useSubscription(): SubscriptionStatus {
  const { user } = useAuth();
  const [sub, setSub] = useState<SubscriptionStatus>(DEFAULT);

  useEffect(() => {
    if (!user?.email) {
      setSub({ ...DEFAULT, loading: false });
      return;
    }

    // Reset immediately so a prior user's active subscription doesn't linger
    // while the new user's fetch is in-flight.
    setSub(DEFAULT);
    let cancelled = false;
    fetch(`/api/subscription-status?user_id=${encodeURIComponent(user.id)}&email=${encodeURIComponent(user.email)}`)
      .then(r => r.json())
      .then(data => { if (!cancelled) setSub({ ...data, loading: false }); })
      .catch(() => { if (!cancelled) setSub({ ...DEFAULT, loading: false }); });
    return () => { cancelled = true; };
  }, [user?.email]);

  return sub;
}
