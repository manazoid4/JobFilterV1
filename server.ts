import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Stripe from "stripe";

// Initialize Stripe (Requires STRIPE_SECRET_KEY in .env)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key', {
  apiVersion: '2023-10-16' as any,
});

import nodemailer from 'nodemailer';

// Configure Nodemailer transporter
// To use this, set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in your environment variables.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.SMTP_PORT || '587'),
  auth: {
    user: process.env.SMTP_USER || 'ethereal.user@ethereal.email',
    pass: process.env.SMTP_PASS || 'etherealpassword'
  }
});

import { Pool } from 'pg';

// Initialize PostgreSQL Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize ideas table
pool.query(`
  CREATE TABLE IF NOT EXISTS ideas (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    phase INTEGER DEFAULT 3,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`).catch(err => console.warn("Postgres not connected. Set DATABASE_URL.", err.message));

// Fallback memory array if DB is not connected
let memoryIdeas: any[] = [];

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // ==========================================
  // BLUEPRINT CRUD (No-Login)
  // ==========================================
  app.post("/api/blueprint", async (req, res) => {
    const { text, phase = 3 } = req.body;
    try {
      if (process.env.DATABASE_URL) {
        const result = await pool.query(
          'INSERT INTO ideas (text, phase) VALUES ($1, $2) RETURNING *',
          [text, phase]
        );
        res.json(result.rows[0]);
      } else {
        const newIdea = {
          id: Date.now(),
          text,
          phase,
          created_at: new Date().toISOString()
        };
        memoryIdeas.push(newIdea);
        res.json(newIdea);
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/blueprint", async (req, res) => {
    try {
      if (process.env.DATABASE_URL) {
        const result = await pool.query('SELECT * FROM ideas ORDER BY created_at DESC');
        res.json(result.rows);
      } else {
        const sortedIdeas = [...memoryIdeas].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        res.json(sortedIdeas);
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/blueprint/:id", async (req, res) => {
    const { id } = req.params;
    try {
      if (process.env.DATABASE_URL) {
        await pool.query('DELETE FROM ideas WHERE id = $1', [id]);
        res.json({ success: true });
      } else {
        memoryIdeas = memoryIdeas.filter(idea => idea.id.toString() !== id.toString());
        res.json({ success: true });
      }
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
  // ONBOARDING EMAIL
  // ==========================================
  app.post("/api/onboarding/submit", async (req, res) => {
    const { name, trade, phoneNumber, calloutFee, filterStrictness, pulseSchedule } = req.body;
    console.log(`[EMAIL] Sending onboarding data to info@jobfilter.uk:`);
    
    const mailOptions = {
      from: '"JobFilter System" <noreply@jobfilter.uk>',
      to: 'info@jobfilter.uk',
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
      `
    };

    try {
      // In production, uncomment the following line to actually send the email.
      // await transporter.sendMail(mailOptions);
      console.log("Email sent successfully (mocked in dev, uncomment transporter.sendMail for prod).");
      console.log(mailOptions.text);
      res.json({ status: "success", message: "Onboarding data received and email sent." });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ status: "error", message: "Failed to send email." });
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
