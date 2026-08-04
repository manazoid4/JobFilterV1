'use client';

import { useEffect } from 'react';

import { persistRef } from '../lib/microsite';

// Reads ?ref={slug} on any landing, stores it so a later signup can be
// attributed to the referring microsite, and logs a best-effort click event.
// Reads window.location directly (not useSearchParams) to avoid a Suspense
// boundary requirement.
export function RefCapture() {
  useEffect(() => {
    try {
      const ref = new URLSearchParams(window.location.search).get('ref');
      if (!ref) return;
      persistRef(ref);
      // Best-effort server-side click log; never blocks or throws to the user.
      void fetch('/api/microsites/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: ref, event: 'click' }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // best-effort only
    }
  }, []);

  return null;
}
