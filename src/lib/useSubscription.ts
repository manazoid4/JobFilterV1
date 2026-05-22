import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthProvider';

export interface SubscriptionStatus {
  tier: 'free' | 'founding' | 'pro' | 'business';
  status: 'active' | 'inactive' | 'past_due' | 'cancelled';
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

    fetch(`/api/subscription-status?email=${encodeURIComponent(user.email)}`)
      .then(r => r.json())
      .then(data => setSub({ ...data, loading: false }))
      .catch(() => setSub({ ...DEFAULT, loading: false }));
  }, [user?.email]);

  return sub;
}
