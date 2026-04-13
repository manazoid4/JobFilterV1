import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Stripe from "stripe";

// Initialize Stripe (Requires STRIPE_SECRET_KEY in .env)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key', {
  apiVersion: '2023-10-16' as any,
});

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

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
        if (message.length > 20 && message.match(/[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}/i)) {
          if (filter_strength <= 2) {
             reply = "Thanks. We offer a 'Priority Booking' to guarantee a slot. It's a fully deductible deposit against the final bill.";
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
        if (req.body.has_media) {
          reply = "Got the photos. We offer a 'Priority Booking' to guarantee a slot. It's a fully deductible deposit against the final bill. Do you agree?";
          nextState = 4;
        } else {
          reply = "I still need those photos. Boss won't look at it without visual proof.";
        }
        break;
      case 4: // State 4: The Priority Pass
        if (message.toLowerCase().includes("yes") || message.toLowerCase().includes("ok") || message.toLowerCase().includes("deposit")) {
          // Generate Stripe Link
          reply = "Great. Here is your Priority Pass link: [STRIPE_LINK]. Once paid, we'll lock in a time.";
          nextState = 5;
        } else {
          reply = "No problem. We'll add you to the standard waitlist, but we can't guarantee a timeframe.";
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
  // ONBOARDING EMAIL (Mock)
  // ==========================================
  app.post("/api/onboarding/submit", (req, res) => {
    const { name, trade, phoneNumber, calloutFee, filterStrictness } = req.body;
    console.log(`[EMAIL MOCK] Sending onboarding data to info@jobfilter.uk:`);
    console.log(`Name: ${name}, Trade: ${trade}, Phone: ${phoneNumber}, Fee: £${calloutFee}, Strictness: ${filterStrictness}`);
    res.json({ status: "success", message: "Onboarding data received and email sent." });
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
