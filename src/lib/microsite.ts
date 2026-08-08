// Microsite growth-loop helpers (client-safe — no server-only import).
//
// The loop: a firm generates a shareable branded page at /pro/{slug}, shares it
// on quotes / WhatsApp / van QR / social. Every viewer sees a "Powered by JobFilter"
// mark linking back to the site with ?ref={slug}. RefCapture persists that ref so a
// later signup is attributed to the microsite that referred it.

export type MicrositeProfile = {
  name: string;
  trade: string;
  areas: string;
  phone: string;
  whatsapp: string;
  years: string;
  blurb: string;
};

// Short query keys keep the shareable link compact.
const KEYS: Record<keyof MicrositeProfile, string> = {
  name: 'n',
  trade: 't',
  areas: 'a',
  phone: 'p',
  whatsapp: 'w',
  years: 'y',
  blurb: 'b',
};

export const REF_STORAGE_KEY = 'jobfilter.ref';

// Top-level route names a microsite slug must not take (a static route would
// shadow the firm's page). Not exhaustive — the worst case for a missed name is
// a shadowed page, never a broken route.
export const RESERVED_SLUGS = new Set<string>([
  'api', 'auth', 'account', 'dashboard', 'leads', 'login', 'logout', 'signup',
  'find-jobs', 'pricing', 'trust', 'methodology', 'blueprint', 'free-tools', 'tips',
  'microsite', 'pro', 'signals', 'news', 'whats-new', 'faq', 'features', 'health',
  'intake', 'intelligence', 'epc', 'post-job', 'my-link', 'codex', 'vantage',
  'vicinity', 'trade', 'for-your-trade', 'vs', 'tradie-zone', 'tradiestack',
  'dev-portal', 'test', 'privacy', 'terms', 'claim', 'construction-leads',
  'forgot-password', 'reset-password', 'activation-pending',
]);

export function isReservedSlug(slug: string): boolean {
  return slug.length < 3 || RESERVED_SLUGS.has(slug);
}

export function slugify(input: string): string {
  return String(input ?? '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
}

export function titleFromSlug(slug: string): string {
  return String(slug ?? '')
    .replace(/-+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function encodeProfile(profile: Partial<MicrositeProfile>): string {
  const params = new URLSearchParams();
  (Object.keys(KEYS) as Array<keyof MicrositeProfile>).forEach((field) => {
    const value = String(profile[field] ?? '').trim();
    if (value) params.set(KEYS[field], value);
  });
  const query = params.toString();
  return query ? `?${query}` : '';
}

export function decodeProfile(search: string, slug: string): MicrositeProfile {
  const params = new URLSearchParams(search || '');
  const read = (field: keyof MicrositeProfile) => (params.get(KEYS[field]) ?? '').trim();
  return {
    name: read('name') || titleFromSlug(slug),
    trade: read('trade'),
    areas: read('areas'),
    phone: read('phone'),
    whatsapp: read('whatsapp') || read('phone'),
    years: read('years'),
    blurb: read('blurb'),
  };
}

// Build the shareable public link for a firm.
export function micrositeLink(origin: string, slug: string, profile: Partial<MicrositeProfile>): string {
  return `${origin}/pro/${slug}${encodeProfile(profile)}`;
}

// --- Attribution --------------------------------------------------------------

export function persistRef(ref: string): void {
  const clean = slugify(ref);
  if (!clean || typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(REF_STORAGE_KEY, clean);
  } catch {
    // storage unavailable — attribution is best-effort, never blocks the user.
  }
}

export function readStoredRef(): string {
  if (typeof window === 'undefined') return '';
  try {
    return window.localStorage.getItem(REF_STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}

// Combine a page's own source label with any stored microsite referral.
export function attributionSource(base: string): string {
  const ref = readStoredRef();
  return ref ? `${base}|ref:${ref}` : base;
}
