---
type: reference
source: meta-whatsapp-docs
updated: 2026-05-30
tags: [whatsapp, meta, api, reference]
---

# WhatsApp Cloud API — Reference

Source pages:
- https://developers.facebook.com/docs/whatsapp/cloud-api/overview
- https://developers.facebook.com/docs/whatsapp/cloud-api/get-started
- https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages
- https://developers.facebook.com/docs/whatsapp/cloud-api/reference/phone-numbers
- https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/components
- https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages

---

## Overview

The **WhatsApp Cloud API** is Meta's hosted version of the WhatsApp Business API (previously called "On-Premises"). It runs on Meta's infrastructure — no server setup, no Docker containers to manage. Businesses send and receive WhatsApp messages via standard HTTPS calls to the Meta Graph API.

**Key capabilities:**
- Send text, media, template, interactive, location, contacts, reaction messages
- Receive inbound messages and delivery status updates via webhooks
- Manage phone numbers and business profiles
- Template management (marketing, utility, authentication categories)
- Support for calling features via SIP integration (newer platform capability)

**Base Graph API URL:**
```
https://graph.facebook.com/{version}/{Phone-Number-ID}/messages
```

Current production version used in JobFilter: **v17.0**

---

## Prerequisites and Account Setup

To use the API you need:

1. **Meta Developer account** — developers.facebook.com
2. **Meta App** — create a new App of type "Business" in the Developer Dashboard
3. **WhatsApp Business Account (WABA)** — linked to your Meta App
4. **Business Phone Number** — registered and verified inside the WABA
5. **Phone Number ID** — the numeric ID of your business phone number (not the phone number itself)
6. **Access Token** — either a temporary token (24h) from the dashboard, or a permanent System User token

**Setup flow:**
1. Create Meta App → add WhatsApp product
2. A test phone number and WABA are provisioned automatically for development
3. Note the **Phone Number ID** and **WhatsApp Business Account ID** from the App dashboard
4. Generate a temporary access token from the dashboard (valid 24h) for testing
5. For production: create a System User in Meta Business Manager → generate a permanent access token → assign the token the `whatsapp_business_messaging` permission

---

## Authentication

All requests require a Bearer token in the `Authorization` header.

```
Authorization: Bearer {WHATSAPP_ACCESS_TOKEN}
```

**Token types:**

| Type | Lifetime | Use case |
|------|----------|----------|
| Temporary User Token | 24 hours | Development / testing |
| System User Token | Non-expiring (until revoked) | Production server use |

**Required permission:** `whatsapp_business_messaging`

**Environment variables (JobFilter pattern):**
```
WHATSAPP_PHONE_NUMBER_ID=  # numeric ID from Meta App dashboard
WHATSAPP_ACCESS_TOKEN=     # Bearer token (system user token in production)
WHATSAPP_TO=               # fallback recipient number (E.164 format, e.g. +447XXXXXXXXX)
```

---

## Send Message Endpoint

### POST `/{version}/{Phone-Number-ID}/messages`

Full URL:
```
https://graph.facebook.com/v17.0/{WHATSAPP_PHONE_NUMBER_ID}/messages
```

**Headers:**
```
Authorization: Bearer {WHATSAPP_ACCESS_TOKEN}
Content-Type: application/json
```

### Base Request Properties (all message types)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `messaging_product` | string | Yes | Always `"whatsapp"` |
| `to` | string | Yes | Recipient phone in E.164 format (`+447...`) or group ID |
| `type` | string | Yes | Message type (see below) |
| `recipient_type` | string | No | `"individual"` (default) or `"group"` |
| `context` | object | No | `{ "message_id": "wamid.XXX" }` — makes this a reply |

### Message Types

| `type` value | Object field | Description |
|---|---|---|
| `text` | `text` | Plain text message |
| `image` | `image` | Image (JPEG/PNG) by URL or media ID |
| `audio` | `audio` | Audio file by URL or media ID |
| `video` | `video` | Video by URL or media ID |
| `document` | `document` | PDF/document by URL or media ID |
| `sticker` | `sticker` | WhatsApp sticker |
| `location` | `location` | Latitude/longitude with optional name/address |
| `contacts` | `contacts` | vCard contact array |
| `template` | `template` | Pre-approved message template |
| `interactive` | `interactive` | Buttons, lists, catalog, flows |
| `reaction` | `reaction` | React to an existing message (emoji + message_id) |

---

### Text Message Payload

```json
{
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "+447XXXXXXXXX",
  "type": "text",
  "text": {
    "preview_url": false,
    "body": "Your message text here (max 4096 characters)"
  }
}
```

`text.preview_url` — set `true` to render link previews for URLs in the body.

---

### Template Message Payload

Templates must be pre-approved by Meta. They are required for the first outbound message to a user (outside of a 24-hour customer service window).

```json
{
  "messaging_product": "whatsapp",
  "to": "+447XXXXXXXXX",
  "type": "template",
  "template": {
    "name": "your_template_name",
    "language": {
      "code": "en_GB"
    },
    "components": [
      {
        "type": "header",
        "parameters": [
          { "type": "image", "image": { "link": "https://..." } }
        ]
      },
      {
        "type": "body",
        "parameters": [
          { "type": "text", "text": "John" },
          { "type": "text", "text": "Plumber" }
        ]
      },
      {
        "type": "button",
        "sub_type": "quick_reply",
        "index": "0",
        "parameters": [
          { "type": "payload", "payload": "YES_INTERESTED" }
        ]
      }
    ]
  }
}
```

**Template categories:** `MARKETING`, `UTILITY`, `AUTHENTICATION`

---

### Media Message Payload

Media can be referenced by `id` (upload to Meta first) or by `link` (public URL).

```json
{
  "messaging_product": "whatsapp",
  "to": "+447XXXXXXXXX",
  "type": "image",
  "image": {
    "link": "https://example.com/photo.jpg",
    "caption": "Optional caption text"
  }
}
```

For `document` type, `filename` field sets the display name in chat.

**Supported media types:**

| Type | Formats | Max Size |
|------|---------|---------|
| image | JPEG, PNG | 5 MB |
| audio | AAC, MP4, MPEG, AMR, OGG | 16 MB |
| video | MP4, 3GPP | 16 MB |
| document | PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT | 100 MB |
| sticker | WEBP | 100 KB (static), 500 KB (animated) |

---

### Interactive Message Payload

```json
{
  "messaging_product": "whatsapp",
  "to": "+447XXXXXXXXX",
  "type": "interactive",
  "interactive": {
    "type": "button",
    "header": { "type": "text", "text": "Header text" },
    "body": { "text": "Choose an option:" },
    "footer": { "text": "Optional footer" },
    "action": {
      "buttons": [
        { "type": "reply", "reply": { "id": "btn_1", "title": "Yes" } },
        { "type": "reply", "reply": { "id": "btn_2", "title": "No" } }
      ]
    }
  }
}
```

Interactive `type` values: `button`, `list`, `product`, `product_list`, `catalog_message`, `flow`

---

### Send Message Response (200 OK)

```json
{
  "messaging_product": "whatsapp",
  "contacts": [
    {
      "input": "+447XXXXXXXXX",
      "wa_id": "447XXXXXXXXX"
    }
  ],
  "messages": [
    {
      "id": "wamid.HBgLNDQ3...",
      "message_status": "accepted"
    }
  ]
}
```

**`message_status` values:**
- `accepted` — Message accepted, processing started
- `held_for_quality_assessment` — Under quality review before delivery
- `paused` — Delivery halted (rate limit or policy issue)

---

## JobFilter Fetch Pattern

Exact implementation from `/home/user/JobFilterV1/server/services/sms.ts`:

```typescript
const url = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`;

const metaResponse = await fetch(url, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    messaging_product: 'whatsapp',
    to: recipientPhone,         // E.164 format: +447XXXXXXXXX
    type: 'text',
    text: { body: message },    // string, max 4096 chars
  }),
});

if (!metaResponse.ok) {
  const body = await metaResponse.text().catch(() => '');
  // handle error: metaResponse.status + body
} else {
  // success: result.triggered = true, provider = 'meta-whatsapp'
}
```

**Env vars consumed:**
- `WHATSAPP_PHONE_NUMBER_ID` — numeric ID of the sending phone number
- `WHATSAPP_ACCESS_TOKEN` — Bearer token
- `WHATSAPP_TO` — optional fallback recipient (overridden by `payload.phone` when present)

---

## Phone Number Management

**Endpoint:** `GET /{version}/{WABA-ID}/phone_numbers`

Returns all phone numbers registered to a WhatsApp Business Account.

**Key phone number fields:**

| Field | Description |
|---|---|
| `id` | Phone Number ID (used in all message API calls) |
| `display_phone_number` | Human-readable number (e.g. "+44 7XXX XXXXXX") |
| `verified_name` | Business display name shown to recipients |
| `quality_rating` | `GREEN`, `YELLOW`, `RED` — impacts messaging limits |
| `messaging_limit_tier` | `TIER_1K`, `TIER_10K`, `TIER_100K`, `UNLIMITED` |
| `account_mode` | `SANDBOX` or `LIVE` |
| `status` | `CONNECTED`, `FLAGGED`, `RESTRICTED`, `UNKNOWN` |

**Messaging tiers (conversations per 24h rolling window):**
- Tier 1: 1,000 unique customers
- Tier 2: 10,000 unique customers
- Tier 3: 100,000 unique customers
- Unlimited: no cap

Tier upgrades happen automatically when usage thresholds are met and quality rating is `GREEN` or `YELLOW`.

---

## Webhooks

Webhooks deliver real-time notifications to your server for inbound messages, delivery status changes, and account events.

### Setup

1. In Meta App Dashboard → WhatsApp → Configuration
2. Set **Callback URL** — must be HTTPS, publicly accessible
3. Set **Verify Token** — any string you define; Meta sends it during verification
4. Meta sends a `GET` request with `hub.mode=subscribe&hub.verify_token=YOUR_TOKEN&hub.challenge=NONCE`
5. Your server must respond `200` with the `hub.challenge` value to verify
6. Subscribe to the **messages** webhook field

### Webhook Notification Structure

```json
{
  "object": "whatsapp_business_account",
  "entry": [
    {
      "id": "{WABA-ID}",
      "changes": [
        {
          "value": {
            "messaging_product": "whatsapp",
            "metadata": {
              "display_phone_number": "+44 7XXX XXXXXX",
              "phone_number_id": "{Phone-Number-ID}"
            },
            "contacts": [
              {
                "profile": { "name": "User Name" },
                "wa_id": "447XXXXXXXXX"
              }
            ],
            "messages": [
              {
                "id": "wamid.XXX",
                "from": "447XXXXXXXXX",
                "timestamp": "1700000000",
                "type": "text",
                "text": { "body": "Hello" }
              }
            ],
            "statuses": [
              {
                "id": "wamid.XXX",
                "status": "delivered",
                "timestamp": "1700000001",
                "recipient_id": "447XXXXXXXXX",
                "conversation": {
                  "id": "CONVERSATION_ID",
                  "origin": { "type": "service" }
                },
                "pricing": {
                  "billable": true,
                  "pricing_model": "CBP",
                  "category": "service"
                }
              }
            ]
          },
          "field": "messages"
        }
      ]
    }
  ]
}
```

### Status Notification Values

| `status` | Meaning |
|---|---|
| `sent` | Delivered to WhatsApp servers |
| `delivered` | Delivered to recipient's device |
| `read` | Read by recipient |
| `failed` | Failed — check `errors` array for codes |

### Inbound Message Types (webhook `messages[].type`)

`text`, `image`, `audio`, `video`, `document`, `sticker`, `location`, `contacts`, `button` (quick reply), `interactive` (button/list reply), `order`, `system`, `unsupported`

### Error Object (in `statuses` when `status: "failed"`)

```json
{
  "errors": [
    {
      "code": 131047,
      "title": "Re-engagement message",
      "message": "Message failed to send because more than 24 hours have passed since the customer last replied to this number.",
      "error_data": { "details": "..." }
    }
  ]
}
```

**Common error codes:**

| Code | Description |
|------|-------------|
| 0 | AuthException — invalid token |
| 4 | Application request limit hit |
| 10 | Permission denied |
| 100 | Invalid parameter |
| 130429 | Rate limit hit |
| 131000 | Something went wrong |
| 131005 | Permission denied — phone number not verified |
| 131008 | Required parameter missing |
| 131009 | Invalid parameter value |
| 131016 | Service unavailable |
| 131021 | Recipient not in allowed list (sandbox mode) |
| 131026 | Message undeliverable — recipient unreachable |
| 131047 | Re-engagement window expired (>24h) |
| 131051 | Unsupported message type |
| 131052 | Media download error |
| 131053 | Media upload error |

---

## Rate Limits

Rate limits apply at multiple levels:

**API-level (per token):**
- No publicly documented per-minute cap; Meta enforces via 429/error code 130429
- On error 130429, back off and retry with exponential backoff

**Messaging tier limits (per 24h rolling window):**
- Tier 1: 1,000 unique recipient conversations
- Tier 2: 10,000 unique recipient conversations
- Tier 3: 100,000 unique recipient conversations
- Unlimited: no cap

**Template message limits:**
- Per-template: 250 messages/second at Unlimited tier
- Marketing templates: subject to additional quality-based throttling

**Recommendations:**
- Monitor `quality_rating` on the phone number
- Implement delivery event deduplication (JobFilter uses `delivery_lock_key` in Supabase)
- On `held_for_quality_assessment`, reduce send rate and review template content

---

## Conversation-Based Pricing (CBP)

Pricing is based on **conversation categories** initiated in a 24-hour window:

| Category | Initiated by | Description |
|---|---|---|
| Marketing | Business | Promotional, product, offer messages |
| Utility | Business | Transactional updates, order confirmations |
| Authentication | Business | OTPs, verification codes |
| Service | User | Any message in response to user-initiated contact |

Each phone number gets **1,000 free service conversations per month**. Business-initiated conversations (marketing, utility, authentication) are charged per conversation, rates vary by country.

**Note:** As of July 2025 pricing update — see `WhatsApp PDF Notes — Pricing on the WhatsApp Business Platform.md` for the latest rate tables.

---

## Key Limits and Constraints

| Constraint | Value |
|---|---|
| Text message max length | 4,096 characters |
| Template name | lowercase letters, numbers, underscores only |
| Button title max | 20 characters |
| Button payload max | 256 bytes |
| List section max items | 10 |
| List sections max | 10 |
| Reply buttons max per message | 3 |
| Media caption max | 1,024 characters |
| Contact messages max per message | 255 contacts |
| Sticker animated max size | 500 KB |
| Sticker static max size | 100 KB |

---

## Delivery Lock Pattern (JobFilter-specific)

To prevent duplicate notifications, JobFilter uses a `delivery_lock_key` in Supabase:

```
delivery_lock_key = "{jobType}:{postcodeOutward}:{sourceSystem}"
```

Example: `"plumber:B14:rated_people"`

Before sending, the service checks `delivery_events` table for existing `sent` or `stubbed` records with this key. Also deduplicates by `lead_id`. This prevents cold-start serverless race conditions from sending the same lead twice.

---

## Related Files

- Implementation: `/home/user/JobFilterV1/server/services/sms.ts`
- Status check: `/home/user/JobFilterV1/server/routes/status.ts`
- Trigger point: `/home/user/JobFilterV1/server/routes/intakeScore.ts`
- Env template: `/home/user/JobFilterV1/.env.example`
- Contact path logic: `/home/user/JobFilterV1/leadEngine/contactPath.ts`
