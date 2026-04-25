import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Stripe from "stripe";
import { scan } from './leadEngine/scan.ts';

// Initialize Stripe (Requires STRIPE_SECRET_KEY in .env)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key', {
  apiVersion: '2023-10-16' as any,
});

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

type EmailPayload = {
  from: string;
  to: string;
  subject: string;
  html?: string;
  text?: string;
};

async function sendEmail(payload: EmailPayload) {
  const key = process.env.RESEND_API_KEY;
  if (!key || key === 're_mock_key') return;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Resend API ${res.status}: ${body.substring(0, 180)}`);
  }
}

const FROM_EMAIL = 'JobFilter <hello@jobfilter.uk>';
const ADMIN_EMAIL = 'manazoid4@gmail.com';
const DEFAULT_ORIGIN = process.env.APP_URL || 'http://localhost:3000';

type LeadScanInput = { postcode: string; trade: string; limit?: number };
type LeadResult = {
  title: string;
  trade: string;
  location: string;
  estimatedValue: number;
  urgency: 'today' | 'this_week' | 'planned';
  source: string;
  sourceConfidence: number;
  whyMatched: string;
};

const TRADE_KEYWORDS: Record<string, RegExp> = {
  electrical: /(electric|rewire|lighting|power|eicr|charger)/i,
  plumbing: /(plumb|boiler|heating|drain|water|pipe)/i,
  general: /(repair|maintenance|building|roof|carpentry|refurb)/i,
};

const REGION_HINTS: Record<string, string> = {
  B: 'Birmingham',
  M: 'Manchester',
  L: 'Liverpool',
  LS: 'Leeds',
  E: 'London',
  EC: 'London',
  N: 'London',
  NW: 'London',
  SE: 'London',
  SW: 'London',
  W: 'London',
};

function resolveRegionHint(postcode: string) {
  const cleaned = postcode.toUpperCase().replace(/\s+/g, '');
  const two = cleaned.match(/^[A-Z]{2}/)?.[0] ?? '';
  const one = cleaned.match(/^[A-Z]/)?.[0] ?? '';
  return REGION_HINTS[two] ?? REGION_HINTS[one] ?? 'UK';
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

      return {
        title,
        trade: input.trade,
        location,
        estimatedValue: value,
        urgency,
        source: 'Contracts Finder',
        sourceConfidence: 82,
        whyMatched: `Matched ${input.trade} with ${region} postcode area`,
      };
    })
    .filter(Boolean)
    .slice(0, input.limit ?? 8) as LeadResult[];
}

// Initialize Firebase Admin — uses GOOGLE_APPLICATION_CREDENTIALS env var in prod,
// falls back to no-op Firestore stub in dev when credentials aren't present
let adminDb: FirebaseFirestore.Firestore | null = null;
try {
  if (!getApps().length) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      initializeApp({ credential: cert(serviceAccount) });
    } else {
      initializeApp({ projectId: 'jobfilter-uk' });
    }
  }
  adminDb = getFirestore();
} catch (err: any) {
  console.warn('[Firebase Admin] Not initialised:', err.message);
}

async function startServer() {
  warnIfMissingReleaseEnv();
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // ==========================================
  // BLUEPRINT CRUD
  // ==========================================
  app.post("/api/blueprint", async (req, res) => {
    const { text, phase = 3 } = req.body;
    try {
      if (!adminDb) throw new Error('DB not available');
      const ref = await adminDb.collection('blueprint').add({ text, phase, createdAt: new Date() });
      res.json({ id: ref.id, text, phase });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/blueprint", async (req, res) => {
    try {
      if (!adminDb) throw new Error('DB not available');
      const snap = await adminDb.collection('blueprint').orderBy('createdAt', 'desc').get();
      res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/blueprint/:id", async (req, res) => {
    try {
      if (!adminDb) throw new Error('DB not available');
      await adminDb.collection('blueprint').doc(req.params.id).delete();
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ==========================================
  // I. THE CONVERSATIONAL ENGINE (Foreman AI)
  // ==========================================
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
          nextState = 4; // Skip straight to Priority Pass
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
        } else if (!hasPostcode) {
          reply = "I need your full postcode to check if you're in our service area.";
        } else {
          reply = "Please provide a bit more detail about the job.";
        }
        break;
      case 3: // State 3: Visual Proof
        const msgLower3 = incomingMessage.toLowerCase();
        if (req.body.has_media || msgLower3.includes('photo') || msgLower3.includes('pic') || msgLower3.includes('video') || msgLower3.includes('here')) {
          reply = "Got the photos. We offer a 'Priority Booking' to guarantee a slot. It's a fully deductible deposit against the final bill. Do you agree?";
          nextState = 4;
        } else {
          reply = "I still need those photos. Boss won't look at it without visual proof. (Tip: Type 'Here are the photos' to simulate an upload)";
        }
        break;
      case 4: // State 4: The Priority Pass
        const msgLower4 = incomingMessage.toLowerCase();
        if (msgLower4.includes("yes") || msgLower4.includes("ok") || msgLower4.includes("deposit") || msgLower4.includes("sure") || msgLower4.includes("pay")) {
          const paymentUrl = await buildPriorityPassUrl(sessionKey, 5000, origin);
          reply = `Great. Here is your Priority Pass link: ${paymentUrl}. Once paid, we'll lock in a time.`;
          nextState = 5;
        } else {
          reply = "We require the Priority Pass deposit to proceed. It filters out time-wasters and guarantees your slot. Let me know if you're ready to proceed.";
        }
        break;
      case 5: // State 5: The Lock-In
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

  // ==========================================
  // STRIPE PRIORITY PASS GENERATOR
  // ==========================================
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
      console.error("[STRIPE] Error creating session:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // ==========================================
  // LEAD SCAN (LIVE + FALLBACK)
  // ==========================================
  app.post("/api/leads/scan", async (req, res) => {
    const { postcode = '', trade = 'general', limit = 8 } = (req.body ?? {}) as LeadScanInput;
    const cleanPostcode = String(postcode).trim();
    if (cleanPostcode.length < 3) return res.status(400).json({ error: 'postcode_required' });

    try {
      const leads = await fetchContractsFinderLeads({ postcode: cleanPostcode, trade: String(trade), limit });
      if (leads.length > 0) return res.json({ source: 'live', leads });
    } catch (err: any) {
      console.warn('[LeadScan] Live source failed, using fallback:', err?.message ?? err);
    }

    const region = resolveRegionHint(cleanPostcode);
    const fallback: LeadResult[] = [
      { title: `${trade} callout near ${region}`, trade: String(trade), location: region, estimatedValue: 280, urgency: 'today' as const, source: 'JobFilter Fallback', sourceConfidence: 60, whyMatched: `Matched ${trade} + ${region}` },
      { title: `${trade} maintenance job in ${region}`, trade: String(trade), location: region, estimatedValue: 540, urgency: 'this_week' as const, source: 'JobFilter Fallback', sourceConfidence: 58, whyMatched: `Matched ${trade} + ${region}` },
      { title: `${trade} upgrade project in ${region}`, trade: String(trade), location: region, estimatedValue: 1250, urgency: 'planned' as const, source: 'JobFilter Fallback', sourceConfidence: 55, whyMatched: `Matched ${trade} + ${region}` },
    ].slice(0, Math.min(Math.max(Number(limit) || 6, 3), 10));

    return res.json({ source: 'fallback', leads: fallback });
  });

  // ==========================================
  // WAITLIST
  // ==========================================
  app.post("/api/waitlist", async (req, res) => {
    const { email, plan } = req.body;
    if (!email || !plan) return res.status(400).json({ error: 'Missing email or plan' });

    // Save to Firestore
    let stored = false;
    try {
      if (adminDb) {
        await adminDb.collection('waitlist').add({
          email: email.trim().toLowerCase(),
          plan,
          createdAt: new Date(),
        });
        stored = true;
      }
    } catch (err: any) {
      console.error('[Waitlist] Firestore write failed:', err.message);
    }

    res.json({ status: 'ok', stored });

    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_mock_key') return;

    (async () => {
      try {
        // Confirmation to the user
        await sendEmail({
          from: FROM_EMAIL,
          to: email,
          subject: "You're on the JobFilter early access list",
          html: `
            <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#0f172a;color:#f1f5f9;border-radius:4px">
              <div style="font-size:24px;font-weight:900;text-transform:uppercase;font-style:italic;color:#f97316;margin-bottom:8px">JobFilter</div>
              <h1 style="font-size:20px;font-weight:900;text-transform:uppercase;margin:0 0 16px">You're on the list.</h1>
              <p style="color:#94a3b8;font-size:14px;line-height:1.6">
                You've secured early access for <strong style="color:#f1f5f9">${plan}</strong>.
                We'll hit you up the moment we go live — no spam, no fluff.
              </p>
              <p style="color:#94a3b8;font-size:14px;line-height:1.6;margin-top:16px">
                Built in Birmingham. Built for the trade. Built to filter.
              </p>
              <div style="margin-top:32px;padding-top:16px;border-top:1px solid #1e293b;font-size:11px;color:#475569;text-transform:uppercase;letter-spacing:0.1em">
                JobFilter · jobfilter.uk
              </div>
            </div>
          `
        });

        // Admin notification
        await sendEmail({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: `New waitlist signup — ${plan}`,
          text: `Email: ${email}\nPlan: ${plan}\nTime: ${new Date().toISOString()}`,
        });

        console.log(`[Waitlist] Emails sent for plan=${plan}`);
      } catch (err: any) {
        console.error('[Waitlist] Email failed:', err.message);
      }
    })();
  });

  // ==========================================
  // ONBOARDING EMAIL
  // ==========================================
  app.post("/api/onboarding/submit", async (req, res) => {
    const { name, trade, phoneNumber, calloutFee, filterStrictness, pulseSchedule } = req.body;
    console.log(`[ONBOARDING] Received submission for trade=${trade}`);
    
    // Return immediately to the frontend so the UI doesn't hang
    res.json({ status: "success", message: "Onboarding received. Processing email in background." });

    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_mock_key') {
      console.warn("[RESEND] API Key is missing or default. Skipping email.");
      return;
    }

    // Process email in background
    (async () => {
      try {
        console.log(`[RESEND] Attempting onboarding admin email send...`);
        
        // Since the user verified their domain, we can try sending from their domain
        // Fallback to onboarding@resend.dev if they haven't set up the domain in Resend yet
        await sendEmail({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: `New Tradie Onboarding: ${name} (${trade})`,
          text: `
            New Tradie Activation:
            ----------------------
            Name: ${name}
            Trade: ${trade}
            Phone: ${phoneNumber}
            
            Settings:
            ---------
            Deposit Fee: £${calloutFee}
            Filter Level: ${filterStrictness}/5
            Pulse Schedule: ${pulseSchedule}

            Next Steps:
            -----------
            The user has been directed to the activation pending page to verify their email and select a subscription plan.
          `
        });
        
        console.log(`[RESEND] Onboarding email sent successfully to admin inbox`);
      } catch (error) {
        console.error("[RESEND] Background email sending failed:", error);
      }
    })();
  });

  // ==========================================
  // LEAD ENGINE SCAN
  // ==========================================
  app.get("/api/scan", async (req, res) => {
    const { postcode, trade = 'all', tier = 'free' } = req.query as Record<string, string>;
    if (!postcode) return res.status(400).json({ error: 'postcode required' });
    try {
      const result = await scan({ postcode, trade, tier: tier as 'free' | 'paid' });
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
