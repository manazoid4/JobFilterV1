# Free Tools Strategy

## Purpose
Free Tools are the front door to JobFilter. They prove value without giving away the [[Intake Engine]]. Every interaction pushes toward paid conversion.

## Core Principle
**Tools are free. Leads are not.**

Free tools must feel genuinely useful but leave users wanting the full system. They are a taste — not the meal.

---

## Tool Architecture

### Daily Tools (Built — Live on /free-tools)
| Tool | What It Does | Conversion Hook |
|------|-------------|-----------------|
| **Quote Floor** | Minimum sensible quote calculator | "Build full quote" → Smart Quote → Founding 30 |
| **Profit Check** | Shows real profit after labour + materials | Colour-coded verdict (red/green) creates action urge |
| **Tyre-Kicker Check** | Lead scoring (0-100) with verdict | "Scan for real leads" → Intake Engine |
| **Travel Cost** | Fuel cost per trip | Shows hidden cost → "Stop the bleed" CTA |
| **Time-Waster Cost** | Annualised cost of weak enquiries | Big scary number → £29/mo looks trivial |
| **Smart Quote Starter** | Professional quote opening paragraphs | Preview free → full version behind paywall |

### Premium Tools (Coming Soon — /vantage, /vicinity, /codex)
| Tool | What It Does | Status |
|------|-------------|--------|
| **Vantage** | Tender PDFs → professional bid decks | Waitlist only |
| **Vicinity** | Job photos → local proof assets | Waitlist only |
| **Codex** | Technical specs → client-ready copy | Waitlist only |

These stay behind Founding 30 access. Free tier gets previews only.

---

## Conversion Funnel

```
Visitor → Free Tool → Useful Result → "Want more?" → Email Capture → Founding 30 CTA
```

### Step 1: Use Tool (Frictionless)
- No login required
- No email upfront
- Instant useful output

### Step 2: Scan Limit Creates Urgency
- **3 free scans** per user (tracked via localStorage)
- Counter visible in hero: "X free scans remaining"
- Each tool activation = 1 scan used

### Step 3: Limit Hit → Email Gate
- Modal appears: "Enter email for 3 more free scans"
- Captures: name, trade, email
- Resets scan counter on submit

### Step 4: Email Captured → Founding 30 Push
- Success banner: "3 more scans added"
- Dual CTA: continue using free tools OR go to Founding 30
- Every tool result card shows "Unlock Full Tools" button

### Step 5: Paywall (Email Already Captured)
- If limit hit again after email capture
- Full paywall section: "You have used your free scans"
- Direct link to /pricing with Founding 30 pricing

---

## Design Rules

1. **Brutalist yellow** — consistent with JobFilter brand
2. **No fake leads** — tools give real output, just limited
3. **No over-explaining** — short, punchy copy
4. **Every tool result has a CTA** — never a dead end
5. **Pain-first copy** — speak to the problem, then the tool solves it
6. **Mobile-first** — single column on small screens, grid on desktop

---

## What Stays Free vs Paid

### Free (Preview)
- Quote floor number
- Profit check number
- Tyre-kicker verdict + score
- Travel cost number
- Time-waster annual cost
- Smart Quote starter paragraph (first 2 lines)

### Paid (Founding 30+)
- Full lead scanner with source links
- Buyer name, deadline, contact depth
- WhatsApp alerts
- Saved leads
- Full Smart Quote (all sections)
- Vantage bid deck generation
- Vicinity proof generation
- Codex copy generation
- Letterhead Pack

---

## Metrics That Matter
- Free tool activations per session
- Email capture rate (scans used → email submitted)
- Conversion rate from free tools → /pricing page views
- Conversion rate from /pricing → Founding 30 signup

---

## Future Improvements
- Server-side scan tracking (prevent localStorage reset)
- Trade-specific tool recommendations
- "Your area has X active leads" teaser on tool results
- WhatsApp share button on tool results ("Share this quote floor")
- Comparison: "Tradesmen using JobFilter save £X/year on wasted visits"

---

## Links
- [[Product Index]]
- [[Intake Engine]]
- [[Free Tools]]
