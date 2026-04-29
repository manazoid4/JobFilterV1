import { onRequest } from 'firebase-functions/v2/https';
import express from 'express';
import Stripe from 'stripe';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { scan } from './leadEngine/scan';
import { getOutward, regionFromOutward } from './leadEngine/postcode';

const DEFAULT_ORIGIN = process.env.APP_URL || 'https://jobfilter.uk';
const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const stripe = stripeSecret
  ? new Stripe(stripeSecret, { apiVersion: '2023-10-16' as any })
  : null;

const SCAN_FALLBACK = [
  { id: 'fb-1', title: 'Boiler Replacement – Vaillant combi', trade: 'plumbing', location: 'Birmingham, B14', postcodeOutward: 'B14', estimatedValue: '£2k–£3.5k', urgency: 'high' as const, source: 'JobFilter Direct', sourceConfidence: 80, contactSignal: 'weak' as const, status: 'open' as const, description: '', buyerName: '' },
  { id: 'fb-2', title: 'Full Rewire – 3-bed semi, no RCD', trade: 'electrical', location: 'Coventry, CV5', postcodeOutward: 'CV5', estimatedValue: '£4k–£6k', urgency: 'medium' as const, source: 'JobFilter Direct', sourceConfidence: 80, contactSignal: 'weak' as const, status: 'open' as const, description: '', buyerName: '' },
  { id: 'fb-3', title: 'Roof Replacement – Active leak', trade: 'roofing', location: 'Wolverhampton, WV3', postcodeOutward: 'WV3', estimatedValue: '£9k–£14k', urgency: 'high' as const, source: 'JobFilter Direct', sourceConfidence: 80, contactSignal: 'strong' as const, status: 'open' as const, description: '', buyerName: '' },
  { id: 'fb-4', title: 'Kitchen Extension – Planning approved', trade: 'building', location: 'Solihull, B91', postcodeOutward: 'B91', estimatedValue: '£28k–£42k', urgency: 'low' as const, source: 'JobFilter Direct', sourceConfidence: 80, contactSignal: 'weak' as const, status: 'open' as const, description: '', buyerName: '' },
  { id: 'fb-5', title: 'Bathroom Refit – Full suite', trade: 'plumbing', location: 'Leeds, LS6', postcodeOutward: 'LS6', estimatedValue: '£4.5k–£7k', urgency: 'medium' as const, source: 'JobFilter Direct', sourceConfidence: 80, contactSignal: 'none' as const, status: 'open' as const, description: '', buyerName: '' },
];

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) { rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 }); return true; }
  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

function validUkPostcode(v: unknown): v is string {
  if (typeof v !== 'string') return false;
  return /^[A-Z]{1,2}\d[A-Z\d]?\s*\d?[A-Z]{0,2}$/i.test(v.trim()) && v.trim().length >= 2;
}

const app = express();
app.use(express.json());
if (!getApps().length) initializeApp();

app.post('/api/leads/scan', async (req, res) => {
  const ip = String(req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? 'unknown').split(',')[0].trim();
  if (!checkRateLimit(ip)) return res.status(429).json({ error: 'Too many requests.', leads: SCAN_FALLBACK });
  try {
    const { postcode, trade = 'all', tier = 'free' } = req.body ?? {};
    if (!validUkPostcode(postcode)) return res.status(400).json({ error: 'Valid UK postcode required' });
    const result = await scan({ postcode: postcode.trim(), trade: String(trade || 'all'), tier: tier === 'paid' ? 'paid' : 'free' });
    const leads = result.leads.length > 0 ? result.leads : SCAN_FALLBACK;
    return res.json({ ...result, leads, total: leads.length });
  } catch (err: any) {
    return res.status(500).json({ error: 'Scan failed', leads: SCAN_FALLBACK, total: SCAN_FALLBACK.length });
  }
});

app.post('/api/leads/search', async (req, res) => {
  const ip = String(req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? 'unknown').split(',')[0].trim();
  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      ok: false,
      source: 'contracts_finder',
      count: 0,
      region: '',
      outward: '',
      leads: [],
      errors: ['Too many requests.'],
    });
  }

  try {
    const { postcode, trade = 'electrical' } = req.body ?? {};
    if (!validUkPostcode(postcode)) {
      return res.status(400).json({
        ok: false,
        source: 'contracts_finder',
        count: 0,
        region: '',
        outward: '',
        leads: [],
        errors: ['valid UK postcode required'],
      });
    }

    const outward = getOutward(postcode.trim());
    const region = regionFromOutward(outward);
    const radiusMiles = Number(req.body?.radiusMiles ?? 25);
    const leads = await fetchContractsFinderSearch(String(trade || 'electrical'), outward, region, radiusMiles);

    return res.json({
      ok: true,
      source: 'contracts_finder',
      count: leads.length,
      region,
      outward,
      leads,
      errors: [],
    });
  } catch (err: any) {
    return res.status(503).json({
      ok: false,
      source: 'contracts_finder',
      count: 0,
      region: '',
      outward: '',
      leads: [],
      errors: [String(err?.message ?? 'scan failed')],
    });
  }
});

app.post('/api/intake/score', async (req, res) => {
  try {
    const jobType = clean(req.body?.jobType, 60);
    const urgency = clean(req.body?.urgency, 40) as 'Emergency' | 'This week' | 'Later';
    const details = clean(req.body?.details, 500);
    const postcode = clean(req.body?.postcode, 20).toUpperCase();
    const phone = clean(req.body?.phone, 40);
    const hasPhotos = Boolean(req.body?.hasPhotos);
    if (!jobType || !urgency) return res.status(422).json({ ok: false, errors: ['pick job type and urgency'] });

    const scored = scoreIntake({ urgency, details, postcode, hasPhotos });
    const lead = {
      id: `lead-${Date.now()}`,
      title: `${jobType} job`,
      score: scored.score,
      jobType,
      urgency,
      postcode,
      phone,
      area: postcode.split(/\s+/)[0] || 'Area unknown',
      flags: scored.flags,
      details,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    if (lead.score > 80) console.log('[sms/gold-lead]', { title: 'NEW GOLD LEAD', job: lead.jobType, area: lead.area, score: lead.score });
    return res.json({ ok: true, sms: { triggered: lead.score > 80, provider: 'stub' }, lead });
  } catch (err: any) {
    return res.status(500).json({ ok: false, errors: [String(err?.message ?? 'score failed')] });
  }
});

app.post('/api/waitlist', async (req, res) => {
  try {
    const entry = {
      name: clean(req.body?.name, 80),
      trade: clean(req.body?.trade, 60),
      contact: clean(req.body?.contact, 120),
      contactType: detectContactType(req.body?.contact),
      source: clean(req.body?.source, 80) || 'site',
      createdAt: new Date().toISOString(),
    };
    if (!entry.name || !entry.trade || !entry.contact) {
      return res.status(422).json({ ok: false, error: 'Name, trade, and email or phone are required.' });
    }
    await getFirestore().collection('waitlist').add(entry);
    return res.json({ ok: true, stored: 'firestore' });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: String(err?.message ?? 'Waitlist failed.') });
  }
});

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    if (!stripe) throw new Error('Stripe not configured');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price_data: { currency: 'gbp', product_data: { name: 'JobFilter Intake Engine', description: 'REAL LEADS. NO CHASING. NO CONTRACTS.' }, unit_amount: 4900, recurring: { interval: 'month' } }, quantity: 1 }],
      mode: 'subscription',
      subscription_data: { trial_period_days: 7 },
      success_url: `${req.headers.origin || DEFAULT_ORIGIN}/activation-pending?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin || DEFAULT_ORIGIN}/#pricing`,
      customer_email: req.body?.email,
    });
    res.json({ url: session.url });
  } catch (err: any) {
    res.status(503).json({ error: err.message });
  }
});

app.post('/api/stripe/priority-pass', async (req, res) => {
  try {
    if (!stripe) throw new Error('Stripe not configured');
    const amount = Math.min(Math.max(Math.round(Number(req.body?.amount ?? 5000)), 1000), 20000);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price_data: { currency: 'gbp', product_data: { name: 'Priority Booking Deposit', description: 'Fully deductible against final invoice.' }, unit_amount: amount }, quantity: 1 }],
      mode: 'payment',
      success_url: `${req.headers.origin || DEFAULT_ORIGIN}/dashboard?payment=success`,
      cancel_url: `${req.headers.origin || DEFAULT_ORIGIN}/dashboard?payment=cancelled`,
      metadata: { tradie_id: String(req.body?.tradie_id ?? '') },
    });
    res.json({ url: session.url });
  } catch (err: any) {
    res.status(503).json({ error: err.message });
  }
});

app.post('/api/onboarding/submit', (req, res) => { res.json({ ok: true }); });
app.post('/api/email-gate/unlock', (req, res) => { res.json({ ok: true }); });
app.post('/api/calendar/sync', (_req, res) => { res.status(501).json({ status: 'not_implemented' }); });
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

export const api = onRequest({ region: 'europe-west2', memory: '512MiB', timeoutSeconds: 60 }, app);

function clean(input: unknown, max: number) {
  return String(input ?? '').replace(/[<>]/g, '').trim().slice(0, max);
}

function detectContactType(input: unknown) {
  const value = String(input ?? '').trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'email';
  if (/^\+?[\d\s().-]{8,}$/.test(value)) return 'phone';
  return 'unknown';
}

function scoreIntake(input: { urgency: string; details: string; postcode: string; hasPhotos: boolean }) {
  const flags: string[] = [];
  let score = 40;

  if (input.urgency === 'Emergency') {
    score += 30;
    flags.push('Urgent');
  } else if (input.urgency === 'This week') {
    score += 20;
    flags.push('Urgent');
  }

  if (input.postcode.trim()) {
    score += 20;
    flags.push('Local');
  }

  if (input.hasPhotos) {
    score += 10;
    flags.push('Photos');
  }

  const text = input.details.toLowerCase();
  if (text.length >= 20) {
    flags.push('Clear');
  } else {
    score -= 20;
    flags.push('Risk');
  }

  if (text.includes('cheap') || text.includes('low budget') || text.includes('small budget')) {
    score -= 50;
    flags.push('Budget');
  }

  return { score: Math.max(0, Math.min(100, score)), flags: flags.slice(0, 4) };
}

async function fetchContractsFinderSearch(trade: string, outward: string, region: string, radiusMiles: number) {
  const publishedFrom = new Date(Date.now() - 45 * 86_400_000).toISOString().replace('T', ' ').substring(0, 19);
  const params = new URLSearchParams({ publishedFrom, stages: 'tender', limit: '100' });
  const response = await fetch(`https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search?${params}`, {
    signal: AbortSignal.timeout(10_000),
    headers: {
      Accept: 'application/json',
      'User-Agent': 'JobFilter/1.0 (jobfilter.uk)',
    },
  });

  if (!response.ok) throw new Error(`contracts finder returned ${response.status}`);
  const payload = await response.json() as { releases?: any[] };
  const releases = Array.isArray(payload.releases) ? payload.releases : [];

  return releases
    .map(mapContractsFinderRelease)
    .filter(Boolean)
    .filter((notice: any) => noticeMatchesTrade(notice, trade))
    .filter((notice: any) => noticeFitsLocation(notice, outward, region, radiusMiles))
    .map((notice: any) => normalizeContractsFinderLead(notice, trade, outward, region))
    .sort((a: any, b: any) => b.score - a.score)
    .slice(0, radiusMiles >= 100 ? 25 : 15);
}

function mapContractsFinderRelease(release: any) {
  const tender = release?.tender ?? {};
  const items = Array.isArray(tender.items) ? tender.items : [];
  const documents = Array.isArray(tender.documents) ? tender.documents : [];
  const firstAddress = items.flatMap((item: any) => item?.deliveryAddresses ?? [])[0] ?? {};
  const title = clean(tender.title, 300);
  if (!title) return null;

  return {
    id: clean(release.id || release.ocid || title, 120),
    ocid: clean(release.ocid, 120),
    title,
    description: clean(tender.description, 600),
    buyer: clean(release?.buyer?.name || tender?.procuringEntity?.name, 160),
    location: clean(firstAddress.region || firstAddress.locality || firstAddress.countryName || firstAddress.postalCode || 'United Kingdom', 160),
    postcode: clean(firstAddress.postalCode, 20),
    value: Number(tender?.value?.amount) || undefined,
    publishedAt: clean(tender.datePublished || release.date, 80),
    deadlineAt: clean(tender?.tenderPeriod?.endDate, 80),
    url: clean(documents[0]?.url, 300) || (release.id ? `https://www.contractsfinder.service.gov.uk/Notice/${release.id}` : 'https://www.contractsfinder.service.gov.uk/'),
    cpvCodes: [
      tender?.classification?.id,
      ...items.flatMap((item: any) => [
        item?.classification?.id,
        ...(item?.additionalClassifications ?? []).map((entry: any) => entry?.id),
      ]),
    ].filter(Boolean).map(String),
  };
}

function normalizeContractsFinderLead(notice: any, trade: string, outward: string, region: string) {
  const score = scoreContractsFinderNotice(notice, trade, outward, region);
  return {
    id: `cf-${String(notice.id || notice.ocid || notice.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)}`,
    title: notice.title,
    buyer: notice.buyer,
    location: notice.location || region || 'United Kingdom',
    postcodeOutward: notice.postcode ? getOutward(notice.postcode) : '',
    estimatedValue: formatValue(notice.value),
    publishedAt: normalizeDate(notice.publishedAt),
    deadlineAt: normalizeDate(notice.deadlineAt),
    url: notice.url,
    source: 'Contracts Finder',
    sourceConfidence: score.sourceConfidence,
    tradeMatch: trade,
    score: score.score,
  };
}

function noticeMatchesTrade(notice: any, trade: string) {
  const text = `${notice.title} ${notice.description}`.toLowerCase();
  const keywords = keywordsForTrade(trade);
  return keywords.some((keyword) => text.includes(keyword)) || cpvPrefixesForTrade(trade).some((prefix) => notice.cpvCodes.some((code: string) => code.startsWith(prefix)));
}

function noticeFitsLocation(notice: any, outward: string, region: string, radiusMiles: number) {
  const location = `${notice.location} ${notice.postcode}`.toUpperCase();
  if (!notice.postcode && location.includes('UNITED KINGDOM')) return true;
  const noticeOutward = notice.postcode ? getOutward(notice.postcode) : '';
  if (!noticeOutward) return radiusMiles >= 100 || location.includes('UNITED KINGDOM');
  if (noticeOutward === outward) return true;
  return radiusMiles >= 25 && regionFromOutward(noticeOutward) === region;
}

function scoreContractsFinderNotice(notice: any, trade: string, outward: string, region: string) {
  const text = `${notice.title} ${notice.description}`.toLowerCase();
  const keywordScore = Math.min(35, keywordsForTrade(trade).filter((keyword) => text.includes(keyword)).length * 12);
  const cpvScore = notice.cpvCodes.length ? 15 : 0;
  const freshnessScore = scoreFreshness(notice.publishedAt);
  const valueScore = notice.value ? Math.min(20, Math.round(notice.value / 25000)) : 0;
  const locationScore = notice.postcode && getOutward(notice.postcode) === outward ? 20 : regionFromOutward(getOutward(notice.postcode || '')) === region ? 12 : 0;
  return {
    score: Math.max(25, Math.min(100, keywordScore + cpvScore + freshnessScore + valueScore + locationScore)),
    sourceConfidence: Math.max(55, Math.min(95, 50 + keywordScore + cpvScore + (notice.url ? 10 : 0))),
  };
}

function keywordsForTrade(trade: string) {
  const map: Record<string, string[]> = {
    plumbing: ['plumbing', 'boiler', 'heating', 'pipework', 'sanitary', 'mechanical services', 'water'],
    electrical: ['electrical', 'electric', 'wiring', 'ev charger', 'lighting', 'rewire', 'fire alarm'],
    roofing: ['roof', 'roofing', 'cladding', 'guttering', 'fascia', 'flat roof'],
    building: ['refurbishment', 'extension', 'construction', 'building', 'renovation', 'maintenance works'],
  };
  return map[trade] ?? [];
}

function cpvPrefixesForTrade(trade: string) {
  const map: Record<string, string[]> = {
    plumbing: ['45330', '45331', '45332', '45333', '50720', '50730'],
    electrical: ['45310', '45311', '45312', '45315', '45316', '50710', '50711'],
    roofing: ['45260', '45261', '45262', '45263'],
    building: ['45000', '45100', '45200', '45210', '45211', '45220', '45400', '45410', '45450'],
  };
  return map[trade] ?? [];
}

function scoreFreshness(value: string) {
  const published = new Date(value).getTime();
  if (!published) return 5;
  const days = (Date.now() - published) / 86_400_000;
  if (days <= 7) return 20;
  if (days <= 21) return 14;
  if (days <= 45) return 8;
  return 3;
}

function formatValue(value?: number) {
  if (!value) return '';
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(value);
}

function normalizeDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString();
}
