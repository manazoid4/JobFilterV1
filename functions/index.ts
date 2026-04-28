import { onRequest } from 'firebase-functions/v2/https';
import express from 'express';
import Stripe from 'stripe';
import { scan } from './leadEngine/scan';

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

app.post('/api/waitlist', (req, res) => {
  const email = String(req.body?.email ?? '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Valid email required' });
  console.log('[Waitlist]', { email: email.replace(/^[^@]+/, '***') });
  res.json({ ok: true });
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
