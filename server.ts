import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Stripe from "stripe";
import { scan } from "./leadEngine/scan.ts";

const DEFAULT_ORIGIN = process.env.APP_URL || "http://localhost:3000";
const stripeSecret = process.env.STRIPE_SECRET_KEY || "";
const stripe = stripeSecret
  ? new Stripe(stripeSecret, { apiVersion: "2023-10-16" as any })
  : null;

function warnIfMissingReleaseEnv() {
  const required = ["STRIPE_SECRET_KEY", "APP_URL"];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) console.warn(`[Release] Missing env vars: ${missing.join(", ")}`);
}

function validUkPostcodeInput(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const cleaned = value.trim().toUpperCase();
  return /^[A-Z]{1,2}\d[A-Z\d]?\s*\d?[A-Z]{0,2}$/.test(cleaned) && cleaned.length >= 2;
}

async function buildPriorityPassUrl(tradieId: string, amount: number, origin?: string) {
  if (!stripe) {
    throw new Error("Stripe is not configured");
  }

  const safeAmount = Math.min(Math.max(Math.round(amount), 1000), 20000);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price_data: {
        currency: "gbp",
        product_data: {
          name: "Priority Booking Deposit",
          description: "Fully deductible against the final invoice.",
        },
        unit_amount: safeAmount,
      },
      quantity: 1,
    }],
    mode: "payment",
    success_url: `${origin || DEFAULT_ORIGIN}/dashboard?payment=success`,
    cancel_url: `${origin || DEFAULT_ORIGIN}/dashboard?payment=cancelled`,
    metadata: { tradie_id: tradieId },
  });

  return session.url;
}

function registerApi(app: express.Express) {
  app.post("/api/leads/scan", async (req, res) => {
    try {
      const { postcode, trade = "all", tier = "free" } = req.body ?? {};
      if (!validUkPostcodeInput(postcode)) {
        return res.status(400).json({ error: "Valid UK postcode required" });
      }

      const safeTrade = String(trade || "all") === "general" ? "all" : String(trade || "all");
      const safeTier = tier === "paid" ? "paid" : "free";
      const result = await scan({ postcode: postcode.trim(), trade: safeTrade, tier: safeTier });

      res.json({
        ...result,
        leads: result.leads.map((lead) => ({
          ...lead,
          contactInfo: {
            name: lead.buyerName || undefined,
            phone: safeTier === "paid" && lead.contactSignal === "strong" ? "Available in source" : undefined,
            email: safeTier === "paid" && lead.contactSignal !== "none" ? "Available in source" : undefined,
          },
        })),
      });
    } catch (error: any) {
      console.error("[LeadScan]", error?.message ?? error);
      res.status(500).json({ error: "Lead scan failed" });
    }
  });

  app.post("/api/waitlist", (req, res) => {
    const email = String(req.body?.email ?? "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Valid email required" });
    }
    console.log("[Waitlist]", { email, plan: req.body?.plan ?? "unknown", createdAt: new Date().toISOString() });
    res.json({ ok: true });
  });

  app.post("/api/onboarding/submit", (req, res) => {
    console.log("[Onboarding]", { ...req.body, createdAt: new Date().toISOString() });
    res.json({ ok: true });
  });

  app.post("/api/whatsapp/webhook", async (req, res) => {
    const {
      message = "",
      tradie_id = "unknown_tradie",
      phone_number = "",
      current_state,
      filter_strength = 3,
    } = req.body ?? {};

    const incomingMessage = String(message);
    const sessionKey = String(tradie_id || phone_number || "unknown").trim();
    const origin = String(req.headers.origin || DEFAULT_ORIGIN);
    const resolvedState = Number(current_state) || 1;

    let nextState = resolvedState;
    let reply = "";

    switch (resolvedState) {
      case 1:
        if (Number(filter_strength) === 5) {
          reply = "We are busy. To look at this properly, we need a fully deductible Priority Booking deposit upfront. Do you agree to pay it?";
          nextState = 4;
        } else {
          reply = "Send the job and postcode. We will filter it fast and tell you if it is worth booking.";
          nextState = 2;
        }
        break;
      case 2: {
        const lower = incomingMessage.toLowerCase();
        const hasPostcode = /[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}/i.test(incomingMessage) || lower.includes("postcode");
        const hasDescription = incomingMessage.trim().length > 15;
        if (hasPostcode && hasDescription) {
          reply = Number(filter_strength) <= 2
            ? "Good. Priority Booking locks the slot and comes off the final bill. Do you want it?"
            : "Good. Send 1-3 photos or a quick video. No photos, no quote.";
          nextState = Number(filter_strength) <= 2 ? 4 : 3;
        } else {
          reply = "Need the job details and full postcode before we quote.";
        }
        break;
      }
      case 3: {
        const lower = incomingMessage.toLowerCase();
        if (req.body?.has_media || /photo|pic|video|here/.test(lower)) {
          reply = "Got it. Priority Booking locks the slot and comes off the final bill. Do you want it?";
          nextState = 4;
        } else {
          reply = "Still need photos or video. That keeps time-wasters out.";
        }
        break;
      }
      case 4: {
        const lower = incomingMessage.toLowerCase();
        if (/yes|ok|deposit|sure|pay/.test(lower)) {
          const paymentUrl = await buildPriorityPassUrl(sessionKey, 5000, origin);
          reply = `Priority Pass link: ${paymentUrl}. Once paid, we lock the slot.`;
          nextState = 5;
        } else {
          reply = "No problem. You stay on the standard list, but no slot is guaranteed.";
        }
        break;
      }
      case 5:
        reply = "Deposit noted. Reply with your preferred slot for next week.";
        break;
      default:
        reply = "Send the job and postcode.";
        nextState = 1;
    }

    res.json({ reply, nextState, sessionStored: false });
  });

  app.post("/api/stripe/priority-pass", async (req, res) => {
    try {
      const tradieId = String(req.body?.tradie_id ?? "").trim() || "unknown_tradie";
      const url = await buildPriorityPassUrl(tradieId, Number(req.body?.amount ?? 5000), String(req.headers.origin || DEFAULT_ORIGIN));
      res.json({ url });
    } catch (error: any) {
      res.status(503).json({ error: error.message });
    }
  });

  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      if (!stripe) throw new Error("Stripe is not configured");
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{
          price_data: {
            currency: "gbp",
            product_data: {
              name: "JobFilter Intake Engine",
              description: "REAL LEADS. NO CHASING. NO CONTRACTS.",
            },
            unit_amount: 2900,
            recurring: { interval: "month" },
          },
          quantity: 1,
        }],
        mode: "subscription",
        success_url: `${req.headers.origin || DEFAULT_ORIGIN}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin || DEFAULT_ORIGIN}/#pricing`,
        customer_email: req.body?.email,
        metadata: { uid: String(req.body?.uid ?? "") },
      });
      res.json({ url: session.url });
    } catch (error: any) {
      res.status(503).json({ error: error.message });
    }
  });

  app.post("/api/calendar/sync", (_req, res) => {
    res.status(501).json({
      status: "not_implemented",
      message: "Calendar sync is not live yet. Keep bookings manual until OAuth is wired.",
    });
  });

  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
}

async function startServer() {
  warnIfMissingReleaseEnv();

  const app = express();
  app.use(express.json());
  registerApi(app);

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => res.sendFile(path.join(distPath, "index.html")));
  }

  const port = Number(process.env.PORT || 3000);
  app.listen(port, "0.0.0.0", () => console.log(`JobFilter running on http://localhost:${port}`));
}

startServer().catch((error) => {
  console.error("Server failed:", error);
  process.exit(1);
});
