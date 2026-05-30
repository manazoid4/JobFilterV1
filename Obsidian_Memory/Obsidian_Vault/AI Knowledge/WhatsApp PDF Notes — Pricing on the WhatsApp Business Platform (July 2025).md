---
type: reference
source: meta-whatsapp-docs
updated: 2026-05-30
tags: [whatsapp, meta, api, reference, pricing]
---

# WhatsApp PDF Notes — Pricing on the WhatsApp Business Platform (July 2025)

**Source:** Meta/Facebook CDN PDF — `[External] Reference guide - Pricing on the WhatsApp Business Platform, effective July 1, 2025`

**PDF URL:** `https://scontent.flhr9-1.fna.fbcdn.net/v/t39.2365-6/506409115_515804291560768_5477144239594007982_n.pdf` (time-limited CDN link)

**Effective date:** July 1, 2025

---

## Document Summary

This is Meta's external reference guide for the conversation-based pricing (CBP) model on the WhatsApp Business Platform. It covers how businesses are charged for WhatsApp conversations, broken down by message category and destination country/region.

---

## Pricing Model Overview

WhatsApp Business Platform uses **Conversation-Based Pricing (CBP)**. You are charged per **conversation**, not per message. A conversation is a 24-hour window opened by the first message exchanged between a business and a user.

### Conversation Categories

| Category | Who Opens It | Typical Use |
|---|---|---|
| **Marketing** | Business | Promotions, offers, newsletters, product announcements |
| **Utility** | Business | Transactional — order confirmations, shipping updates, appointment reminders |
| **Authentication** | Business | OTPs, login verification codes, account alerts |
| **Service** | User | Any business reply within 24h of a user-initiated message |

### Free Tier

- **1,000 free Service conversations per calendar month** per phone number
- Free conversations do NOT carry over to the next month
- Marketing, Utility, and Authentication conversations are NOT free (except during promotional periods)

### Key Pricing Rule: One Conversation Window at a Time

If a business sends a **Marketing** message and a **Utility** message to the same user within 24 hours, and no conversation was previously open:
- Only ONE conversation is opened (the first one)
- The second message rides the existing window — no extra charge
- Exception: if the messages are in different categories and the window from the first has already expired

### Conversation Opening Rules

| Scenario | Conversation Opened |
|---|---|
| Business sends first message (template) | Business-initiated conversation (Marketing/Utility/Authentication) |
| User sends first message | Service conversation |
| Business replies within user's 24h window | No new conversation opened — extends or uses existing Service window |
| Business sends template after user's 24h window closes | New business-initiated conversation |

---

## What Changed Effective July 1, 2025

As of July 1, 2025, Meta updated the pricing structure. The key documented changes:

1. **Service conversations remain cheapest** — user-initiated windows are the most cost-effective category
2. **Marketing templates face tighter quality enforcement** — low-quality templates may be throttled before incurring cost
3. **Utility conversations** cover post-sale transactional messages; using marketing templates for transactional content is a policy violation
4. **Authentication conversations** are purpose-built for OTP flows and are priced separately from utility

> Note: The PDF contained compressed image streams with pricing tables per country. The narrative text confirmed the category model above. For exact per-country rates, access the live pricing page at: https://developers.facebook.com/docs/whatsapp/pricing

---

## Pricing by Region (Structure)

The PDF includes multi-page tables with per-country rates across all four categories. Prices are quoted in **USD** and vary significantly by market. Key market groupings referenced:

- **North America** (US, Canada)
- **Latin America** (Brazil, Mexico, Argentina, Colombia, etc.)
- **Europe** (UK, Germany, France, Spain, Italy, Netherlands, etc.)
- **Middle East and Africa** (UAE, Saudi Arabia, Egypt, Nigeria, Kenya, South Africa, etc.)
- **Asia Pacific** (India, Indonesia, Malaysia, Philippines, Singapore, Thailand, Vietnam, etc.)

**Note for JobFilter:** UK-based leads → charged at the Europe/UK rate for business-initiated conversations.

---

## Billing and Invoicing

- Billing is in the currency configured on the Meta Business account (can be changed via API once per billing period)
- Invoices issued monthly
- Charges apply only after the free tier (1,000 service conversations/month) is exhausted
- Overage billing threshold: charges accumulate until the billing threshold is met, then invoiced

---

## Templates and Pricing Category Assignment

Template category is set at template creation time and cannot be changed after approval. Meta enforces category rules:

| Template Type | Must Use | Cannot Use |
|---|---|---|
| Promotional content | Marketing | Utility / Authentication |
| OTP / verification | Authentication | Marketing / Utility |
| Order confirmation / shipping | Utility | Marketing |
| Customer service reply | Service (no template needed) | N/A |

Misusing a category (e.g. sending a promotional message as Utility) violates Meta policy and can result in template suspension.

---

## Free Entry Points

Certain entry points open **free Service conversations** that don't count against the paid tier:

- **Click-to-WhatsApp ads** — user clicks a Meta ad that opens WhatsApp
- **WhatsApp Business website button** — user clicks a contact button
- **QR codes** — user scans a WhatsApp QR code

These free-entry-point conversations last **72 hours** (extended from the standard 24h) and are not charged.

---

## Implications for JobFilter

1. **Current use case:** JobFilter sends a single text notification to a tradesman when a gold lead arrives. This is a **business-initiated Utility conversation** (transactional alert to a registered subscriber).

2. **Cost:** Charged at UK Utility rate per conversation opened. With low volume (one strong lead per week), cost is negligible.

3. **Free tier:** If JobFilter sends fewer than 1,000 service conversations per month, those are free. Business-initiated (utility) conversations are not covered by the free tier.

4. **Recommendation:** If JobFilter ever moves to user-opt-in (tradesman texts back to opt in), those would become cheaper Service conversations.

5. **Template requirement:** If contacting a tradesman who hasn't messaged in the last 24h, a pre-approved Utility template is required — cannot send free-form text as the opening message.

---

## Related Notes

- [[WhatsApp Cloud API — Reference]] — full technical API reference
- API pricing page: https://developers.facebook.com/docs/whatsapp/pricing
