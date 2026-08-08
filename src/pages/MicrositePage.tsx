'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { decodeProfile, titleFromSlug, type MicrositeProfile } from '../lib/microsite';
import { MicrositeView } from './MicrositeView';

// URL-param fallback page at /pro/{slug}: firm details ride in the link. Kept so
// links shared before DB persistence still work. The primary page is the
// DB-backed root route jobfilter.uk/{slug} (app/[slug]).
export function MicrositePage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'your-firm';
  const [profile, setProfile] = useState<MicrositeProfile | null>(null);

  useEffect(() => {
    setProfile(decodeProfile(window.location.search, slug));
  }, [slug]);

  const firm = profile ?? {
    name: titleFromSlug(slug),
    trade: '',
    areas: '',
    phone: '',
    whatsapp: '',
    years: '',
    blurb: '',
  };

  return <MicrositeView slug={slug} profile={firm} />;
}
