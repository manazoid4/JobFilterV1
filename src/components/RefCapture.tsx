'use client';

import { useEffect } from 'react';

import { persistRef } from '../lib/microsite';

// Reads ?ref={slug} on any landing and stores it so a later signup can be
// attributed to the microsite that referred the visitor. Reads window.location
// directly (not useSearchParams) to avoid a Suspense boundary requirement.
export function RefCapture() {
  useEffect(() => {
    try {
      const ref = new URLSearchParams(window.location.search).get('ref');
      if (ref) persistRef(ref);
    } catch {
      // best-effort only
    }
  }, []);

  return null;
}
