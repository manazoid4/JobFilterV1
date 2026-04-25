import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key', {
  apiVersion: '2023-10-16' as any,
});

// ==========================================
// LEAD ENGINE TYPES
// ==========================================

const FROM_EMAIL = 'JobFilter <hello@jobfilter.uk>';
const ADMIN_EMAIL = 'manazoid4@gmail.com';
const DEFAULT_ORIGIN = process.env.APP_URL || 'http://localhost:3000';

type LeadScanInput = { postcode: string; trade: string; limit?: number };
type LeadResult = {
  title: string;
  trade: string;
  location: string;
  postcodeOutward: string;
  estimatedValue: string;
  urgency: 'low' | 'medium' | 'high';
  source: string;
  sourceConfidence: number;
  contactInfo?: { name?: string; phone?: string; email?: string };
  status: 'open';
  score: number;
  postedDate: string;
  description: string;
}

function warnIfMissingReleaseEnv() {
  const required = ['STRIPE_SECRET_KEY', 'RESEND_API_KEY', 'APP_URL'];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    console.warn(`[Release] Missing env vars: ${missing.join(', ')}`);
  }
}

async function buildPriorityPassUrl(tradieId: string, amount: number, origin?: string) {
  const safeAmount = Math.min(Math.max(Math.round(amount), 1000), 20000);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'gbp',
        product_data: {
          name: 'Priority Booking Deposit',
          description: 'Fully deductible against your final invoice.',
        },
        unit_amount: safeAmount,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${origin || DEFAULT_ORIGIN}/dashboard?payment=success`,
    cancel_url: `${origin || DEFAULT_ORIGIN}/dashboard?payment=cancelled`,
    metadata: { tradie_id: tradieId },
  });
  return session.url;
}

async function fetchContractsFinderLeads(input: LeadScanInput): Promise<LeadResult[]> {
  const since = new Date(Date.now() - 14 * 86400000).toISOString().slice(0, 19).replace('T', ' ');
  const params = new URLSearchParams({ stages: 'tender', limit: String(Math.min(Math.max(input.limit ?? 8, 4), 20)), publishedFrom: since });
  const url = `https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search?${params.toString()}`;

  const response = await fetch(url, { headers: { Accept: 'application/json', 'User-Agent': 'JobFilter/1.0' } });
  if (!response.ok) throw new Error(`ContractsFinder ${response.status}`);
  const payload = await response.json() as any;
  const releases: any[] = payload?.releases ?? payload?.data ?? [];
  const tradePattern = TRADE_KEYWORDS[input.trade] ?? TRADE_KEYWORDS.general;
  const region = resolveRegionHint(input.postcode);

  return releases
    .map((rel): LeadResult | null => {
      const tender = rel?.tender ?? {};
      const buyer = rel?.buyer ?? rel?.parties?.find((p: any) => p.roles?.includes('buyer')) ?? {};
      const title = String(tender?.title ?? '').trim();
      const desc = String(tender?.description ?? '').trim();
      if (!title || !tradePattern.test(`${title} ${desc}`)) return null;

      const value = Number(tender?.value?.amount ?? tender?.minValue?.amount ?? 0) || 250;
      const endDate = String(tender?.tenderPeriod?.endDate ?? '');
      const deadline = endDate ? new Date(endDate).getTime() : Date.now() + 7 * 86400000;
      const dayDelta = (deadline - Date.now()) / 86400000;
      const urgency: LeadResult['urgency'] = dayDelta < 3 ? 'today' : dayDelta < 10 ? 'this_week' : 'planned';
      const location = String(tender?.deliveryAddress?.region ?? buyer?.address?.region ?? region).trim() || region;

async function fetchContractsFinder(trade: string, outward: string): Promise<Lead[]> {
  const keywords: Record<string, string> = {
    plumbing: 'plumbing heating boiler',
    electrical: 'electrical installation wiring',
    roofing: 'roofing flat roof tiles',
    building: 'refurbishment construction building works',
    carpentry: 'carpentry joinery timber',
    painting: 'decorating painting redecoration',
    landscaping: 'grounds maintenance landscaping',
    hvac: 'HVAC ventilation air conditioning',
    all: 'maintenance repair building works',
  };
  const keyword = keywords[trade] || keywords.all;
  try {
    const url = `https://www.contractsfinder.service.gov.uk/Published/Notices/PublicSearch/Search?NoticeType=0&Keyword=${encodeURIComponent(keyword)}&Page=1&PageSize=15&SortBy=0`;
    const r = await fetch(url, {
      headers: { 'Accept': 'application/json', 'User-Agent': 'JobFilter/1.0' },
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) return [];
    const data = await r.json() as any;
    const notices: any[] = data?.results || data?.Results || [];
    return notices.slice(0, 8).map((n: any, i: number) => {
      const rawVal = Number(n.valueLow || n.ValueLow || n.value || n.Value || 50000);
      const urgency: Lead['urgency'] = rawVal > 100000 ? 'high' : rawVal > 20000 ? 'medium' : 'low';
      return {
        id: `cf-${n.id || n.Id || i}`,
        title: (n.title || n.Title || 'Commercial Contract').substring(0, 80),
        trade: trade === 'all' ? 'building' : trade,
        location: n.organisationAddress?.town || n.Location || 'United Kingdom',
        postcodeOutward: outward,
        estimatedValue: formatValue(rawVal),
        urgency,
        source: 'Contracts Finder (Gov.uk)',
        sourceConfidence: 85,
        contactInfo: { name: n.organisationName || n.OrganisationName },
        status: 'open' as const,
        score: 0,
        postedDate: n.publishedDate || n.PublishedDate || new Date().toISOString(),
        description: (n.description || n.Description || 'Government/public sector procurement opportunity.').substring(0, 200),
      };
    });
  } catch {
    return [];
  }
}

function formatValue(v: number): string {
  if (v >= 1000000) return `£${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `£${(v / 1000).toFixed(0)}k`;
  return `£${v}`;
}

function getDomesticLeads(region: string, trade: string, outward: string): Lead[] {
  const filtered = DOMESTIC_LEADS.filter(l => {
    const regionMatch = l.region === region || l.region === 'United Kingdom';
    const tradeMatch = trade === 'all' || l.trade === trade;
    return regionMatch && tradeMatch;
  });

  const results = filtered.length >= 4 ? filtered : [
    ...filtered,
    ...DOMESTIC_LEADS.filter(l => l.region === 'United Kingdom' && (trade === 'all' || l.trade === trade)),
    ...DOMESTIC_LEADS.filter(l => trade === 'all' || l.trade === trade).slice(0, 6),
  ].slice(0, 12);

  return results.map(({ region: _r, ...l }) => ({
    ...l,
    postcodeOutward: outward,
    id: `${l.id}-${outward}`,
  }));
}

function scoreLead(l: Lead): number {
  let s = l.sourceConfidence;
  if (l.urgency === 'high') s += 30;
  else if (l.urgency === 'medium') s += 15;
  if (l.contactInfo?.phone) s += 20;
  if (l.contactInfo?.email) s += 15;
  if (l.contactInfo?.name && !l.contactInfo.name.includes('Unlock')) s += 10;
  if (l.description.length > 120) s += 5;
  const valStr = l.estimatedValue.replace(/£|,/g, '');
  if (valStr.includes('M')) s += 40;
  else if (valStr.includes('k')) s += Math.min(parseInt(valStr) || 0, 30);
  return s;
}

// ==========================================
// LEAD SCAN ENDPOINT
// ==========================================

async function buildLeadEngine(app: express.Express) {
  app.post("/api/leads/scan", async (req, res) => {
    const { postcode, trade = 'all', tier = 'free' } = req.body;
    if (!postcode || postcode.trim().length < 2) {
      return res.status(400).json({ error: 'Valid UK postcode required' });
    }

    const outward = getOutward(postcode);
    const [postcodeInfo, contractLeads] = await Promise.all([
      lookupPostcode(postcode),
      fetchContractsFinder(trade, outward),
    ]);

    const region = postcodeInfo?.region || regionFromPostcode(postcode);
    const domesticLeads = getDomesticLeads(region, trade, outward);

    let allLeads: Lead[] = [...contractLeads, ...domesticLeads];
    allLeads = allLeads.map(l => ({ ...l, score: scoreLead(l) }));
    allLeads = allLeads
      .filter(l => l.sourceConfidence >= 60)
      .sort((a, b) => b.score - a.score);

    const total = allLeads.length;
    const lockedCount = tier === 'free' ? Math.max(0, total - 3) : 0;

    const output = (tier === 'free' ? allLeads.slice(0, 3) : allLeads).map(l => ({
      ...l,
      contactInfo: tier === 'free' && l.contactInfo
        ? {
            name: l.contactInfo.name,
            phone: l.contactInfo.phone ? '*** Upgrade to unlock ***' : undefined,
            email: l.contactInfo.email ? '*** Upgrade to unlock ***' : undefined,
          }
        : l.contactInfo,
    }));

    res.json({ leads: output, total, region, outward, lockedCount });
  });
}

// ==========================================
// SERVER STARTUP
// ==========================================

async function startServer() {
  warnIfMissingReleaseEnv();
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  await buildLeadEngine(app);

  // WhatsApp Conversational Engine
  app.post("/api/whatsapp/webhook", async (req, res) => {
    const {
      message = '',
      tradie_id = 'unknown_tradie',
      phone_number = '',
      current_state,
      filter_strength = 3,
    } = req.body ?? {};

    const incomingMessage = String(message);
    const sessionKey = String(tradie_id || phone_number || 'unknown').trim();
    const origin = String(req.headers.origin || DEFAULT_ORIGIN);
    let resolvedState = Number(current_state) || 1;

    if (!Number(current_state) && adminDb && sessionKey !== 'unknown') {
      try {
        const sessionDoc = await adminDb.collection('whatsapp_sessions').doc(sessionKey).get();
        const dbState = Number(sessionDoc.data()?.current_state);
        if (dbState >= 1 && dbState <= 5) resolvedState = dbState;
      } catch (err: any) {
        console.warn('[WhatsApp] Session read failed:', err.message);
      }
    }
    
    // 5-State Machine Logic
    let nextState = resolvedState;
    let reply = "";

    switch (resolvedState) {
      case 1: // State 1: Handshake
        if (Number(filter_strength) === 5) {
          reply = "Hi, I'm the automated assistant. The boss is extremely busy. To even look at your job, we require a fully deductible Priority Booking deposit upfront. Do you agree to pay this?";
          nextState = 4;
        } else {
          reply = "Hi, I'm the automated assistant for this business. To get you a quote faster, I need a few details. What's the job and your postcode?";
          nextState = 2;
        }
        break;
      case 2: // State 2: The Vet
        const msgLower = incomingMessage.toLowerCase();
        const hasPostcode = incomingMessage.match(/[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}/i) || msgLower.includes('postcode') || msgLower.includes('b14');
        const hasDescription = incomingMessage.length > 15;
        
        if (hasPostcode && hasDescription) {
          if (Number(filter_strength) <= 2) {
             reply = "Thanks. We offer a 'Priority Booking' to guarantee a slot. It's a fully deductible deposit against the final bill. Do you agree?";
             nextState = 4; // Skip photos for low strictness
          } else {
            reply = "Thanks. Boss's orders: I need 1-3 photos or a quick video of the issue before we can proceed. No photos, no quote.";
            nextState = 3;
          }
        } else {
          reply = "Please provide a detailed description of the job AND your full postcode.";
        }
        break;
      case 3: // State 3: Visual Proof
        const msgLower3 = incomingMessage.toLowerCase();
        if (req.body.has_media || msgLower3.includes('photo') || msgLower3.includes('pic') || msgLower3.includes('video') || msgLower3.includes('here')) {
          reply = "Got the photos. We offer a 'Priority Booking' to guarantee a slot. It's a fully deductible deposit against the final bill. Do you agree?";
          nextState = 4;
        } else {
          reply = "I still need those photos. Boss won't look at it without visual proof.";
        }
        break;
      case 4: // State 4: The Priority Pass
        const msgLower4 = incomingMessage.toLowerCase();
        if (msgLower4.includes("yes") || msgLower4.includes("ok") || msgLower4.includes("deposit") || msgLower4.includes("sure") || msgLower4.includes("pay")) {
          const paymentUrl = await buildPriorityPassUrl(sessionKey, 5000, origin);
          reply = `Great. Here is your Priority Pass link: ${paymentUrl}. Once paid, we'll lock in a time.`;
          nextState = 5;
        } else {
          reply = "No problem. We'll add you to the standard waitlist, but we can't guarantee a timeframe.";
        }
        break;
      case 5:
        reply = "Deposit confirmed. Here are the available slots for next week. Reply with your preferred time.";
        break;
      default:
        reply = "How can we help you today?";
        nextState = 1;
    }

    let sessionStored = false;
    if (adminDb && sessionKey !== 'unknown') {
      try {
        await adminDb.collection('whatsapp_sessions').doc(sessionKey).set({
          tradie_id: String(tradie_id || ''),
          phone_number: String(phone_number || ''),
          current_state: nextState,
          filter_strength: Number(filter_strength) || 3,
          last_message: incomingMessage,
          updatedAt: new Date(),
        }, { merge: true });
        sessionStored = true;
      } catch (err: any) {
        console.error('[WhatsApp] Session write failed:', err.message);
      }
    }

    res.json({ reply, nextState, sessionStored });
  });

  // Stripe Priority Pass
  app.post("/api/stripe/priority-pass", async (req, res) => {
    try {
      const { tradie_id = '', amount = 5000 } = req.body; // Default £50.00
      const safeTradieId = String(tradie_id).trim() || 'unknown_tradie';
      const url = await buildPriorityPassUrl(safeTradieId, Number(amount), String(req.headers.origin || DEFAULT_ORIGIN));
      res.json({ url });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==========================================
  // CALENDAR SYNC (Mock)
  // ==========================================
  app.post("/api/calendar/sync", (_req, res) => {
    res.status(501).json({
      status: "not_implemented",
      message: "Calendar sync is not live yet. Keep bookings manual until OAuth is wired.",
    });
  });

  // ==========================================
  // STRIPE CHECKOUT
  // ==========================================
  app.post("/api/create-checkout-session", async (req, res) => {
    const { email, uid } = req.body;
    
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'gbp',
              product_data: {
                name: 'JobFilter Pro Tradie Subscription',
                description: 'Unlimited leads, WhatsApp Pulse, and Van Sticker QR.',
              },
              unit_amount: 2900, // £29.00
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${req.headers.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/activation-pending`,
        customer_email: email,
        metadata: {
          uid: uid
        }
      });

      res.json({ url: session.url });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
  }

  app.listen(PORT, "0.0.0.0", () => console.log(`JobFilter running on http://localhost:${PORT}`));
}

startServer();
