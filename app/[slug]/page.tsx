import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getSupabaseServiceClient } from '../../src/lib/supabase/server';
import { MicrositeView } from '../../src/pages/MicrositeView';
import { titleFromSlug, type MicrositeProfile } from '../../src/lib/microsite';

type Params = { params: Promise<{ slug: string }> };

async function loadMicrosite(slug: string): Promise<MicrositeProfile | null> {
  const supabase = getSupabaseServiceClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('microsites')
    .select('firm_name, trade, areas, phone, whatsapp, years, blurb')
    .eq('slug', slug)
    .maybeSingle();
  if (error || !data) return null;
  return {
    name: data.firm_name || titleFromSlug(slug),
    trade: data.trade ?? '',
    areas: data.areas ?? '',
    phone: data.phone ?? '',
    whatsapp: data.whatsapp ?? '',
    years: data.years ?? '',
    blurb: data.blurb ?? '',
  };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const profile = await loadMicrosite(slug);
  if (!profile) return {};
  const title = `${profile.name}${profile.trade ? ` — ${profile.trade}` : ''} | JobFilter`;
  return {
    title,
    description: profile.blurb || `${profile.name}: ${profile.trade || 'trade'} work${profile.areas ? ` across ${profile.areas}` : ''}.`,
    alternates: { canonical: `https://jobfilter.uk/${slug}` },
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const profile = await loadMicrosite(slug);
  if (!profile) notFound();
  return <MicrositeView slug={slug} profile={profile} />;
}
