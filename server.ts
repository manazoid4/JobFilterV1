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
    const { message, tradie_id, phone_number, current_state, filter_strength } = req.body;
    
    // 5-State Machine Logic
    let nextState = current_state;
    let reply = "";

    switch (current_state) {
      case 1: // State 1: Handshake
        if (filter_strength == 5) {
          reply = "Hi, I'm the automated assistant. The boss is extremely busy. To even look at your job, we require a fully deductible Priority Booking deposit upfront. Do you agree to pay this?";
          nextState = 4; // Skip straight to Priority Pass
        } else {
          reply = "Hi, I'm the automated assistant for this business. To get you a quote faster, I need a few details. What's the job and your postcode?";
          nextState = 2;
        }
        break;
      case 2: // State 2: The Vet
        const msgLower = message.toLowerCase();
        const hasPostcode = message.match(/[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}/i) || msgLower.includes('postcode') || msgLower.includes('b14');
        const hasDescription = message.length > 15;
        
        if (hasPostcode && hasDescription) {
          if (filter_strength <= 2) {
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
        const msgLower3 = message.toLowerCase();
        if (req.body.has_media || msgLower3.includes('photo') || msgLower3.includes('pic') || msgLower3.includes('video') || msgLower3.includes('here')) {
          reply = "Got the photos. We offer a 'Priority Booking' to guarantee a slot. It's a fully deductible deposit against the final bill. Do you agree?";
          nextState = 4;
        } else {
          reply = "I still need those photos. Boss won't look at it without visual proof. (Tip: Type 'Here are the photos' to simulate an upload)";
        }
        break;
      case 4: // State 4: The Priority Pass
        const msgLower4 = message.toLowerCase();
        if (msgLower4.includes("yes") || msgLower4.includes("ok") || msgLower4.includes("deposit") || msgLower4.includes("sure") || msgLower4.includes("pay")) {
          // Generate Stripe Link
          reply = "Great. Here is your Priority Pass link: https://buy.stripe.com/test_link. Once paid, we'll lock in a time.";
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

    // In a real app, we'd save the state to Supabase/PostgreSQL here keyed by tradie_id
    res.json({ reply, nextState });
  });

  // ==========================================
  // STRIPE PRIORITY PASS GENERATOR
  // ==========================================
  app.post("/api/stripe/priority-pass", async (req, res) => {
    try {
      const { tradie_id, amount = 5000 } = req.body; // Default £50.00
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'Priority Booking Deposit',
              description: 'Fully deductible against your final invoice.',
            },
            unit_amount: amount,
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${req.headers.origin || 'http://localhost:3000'}/dashboard?payment=success`,
        cancel_url: `${req.headers.origin || 'http://localhost:3000'}/dashboard?payment=cancelled`,
        metadata: { tradie_id },
      });

      res.json({ url: session.url });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==========================================
  // CALENDAR SYNC (Mock)
  // ==========================================
  app.post("/api/calendar/sync", (req, res) => {
    const { tradie_id, provider } = req.body;
    // Mock OAuth flow initiation
    res.json({ 
      status: "success", 
      authUrl: `https://accounts.google.com/o/oauth2/v2/auth?client_id=mock&redirect_uri=mock&response_type=code&scope=calendar` 
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
