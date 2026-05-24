---
type: implementation-plan
project: JobFilter
area: WhatsApp delivery
updated: 2026-05-24
source:
  - https://github.com/open-wa/wa-automate-nodejs
  - Context7: /open-wa/wa-automate-nodejs
---

# OpenWA WhatsApp Delivery Plan

## Decision
Use OpenWA only as a controlled pilot/fallback delivery worker, not the primary production delivery path.

Primary production path should stay official WhatsApp Business/Twilio/Meta where possible. OpenWA automates WhatsApp Web through a browser session, so it is useful for fast testing and low-volume internal delivery, but it carries account/session stability and policy risk.

## Why It Matters For JobFilter
JobFilter wins through fast GOLD lead delivery. The delivery layer must be reliable, auditable, and tied to stored scored leads.

OpenWA should never bypass:
- lead quality scoring
- territory delivery locks
- paid access checks
- delivery event logging
- opt-in/consent checks

## Recommended Architecture

```text
SCHEDULED SCAN
  -> store scored lead
  -> select paid user + trade + postcode lock
  -> create delivery_events row
  -> delivery worker sends WhatsApp
  -> update delivery_events with provider result
```

OpenWA worker:
- separate long-running Node service, not a Next.js route
- runs on a VPS/VM/container with persistent disk
- owns the WhatsApp Web browser session
- exposes a tiny authenticated internal HTTP endpoint
- receives only already-approved delivery jobs

Do not run OpenWA inside Vercel serverless functions. It needs a persistent browser/session and can hang during QR/session recovery.

## OpenWA Shape

Package:
```bash
npm install @open-wa/wa-automate
```

Minimal worker:
```ts
import express from 'express';
import { create } from '@open-wa/wa-automate';

const app = express();
app.use(express.json());

const client = await create({
  sessionId: 'jobfilter-delivery',
  multiDevice: true,
  headless: true,
  authTimeout: 60,
  qrTimeout: 0,
  blockCrashLogs: true,
  disableSpins: true,
  logConsole: false,
});

app.post('/send', async (req, res) => {
  const { to, message, deliveryId } = req.body;
  if (!to || !message || !deliveryId) {
    return res.status(422).json({ ok: false, error: 'to, message and deliveryId required' });
  }

  const chatId = to.includes('@c.us') ? to : `${to.replace(/\D/g, '')}@c.us`;
  const result = await client.sendText(chatId, message);
  res.json({ ok: true, provider: 'openwa', result });
});

client.onMessage(async (message) => {
  // Forward inbound replies into JobFilter for outcome tracking.
});

app.listen(process.env.PORT || 8787);
```

Useful OpenWA APIs:
- `create(...)` starts the WhatsApp Web client.
- `client.sendText(chatId, content)` sends text.
- `client.onMessage(fn)` receives inbound messages.
- `client.onAck(fn)` tracks delivery/read acknowledgement.
- `client.registerWebhook(url, events, requestConfig, concurrency)` can push events to JobFilter/n8n.

## JobFilter Integration Steps

1. Add provider abstraction:
   - `server/services/whatsapp/provider.ts`
   - providers: `twilio`, `openwa`, `stub`
   - env: `WHATSAPP_PROVIDER=twilio|openwa|stub`

2. Add OpenWA client adapter:
   - `OPENWA_API_URL`
   - `OPENWA_API_TOKEN`
   - POST delivery jobs to `OPENWA_API_URL/send`
   - never expose this endpoint publicly without a bearer token.

3. Tighten `/api/leads/notify`:
   - accept `leadId`, not full caller-supplied `leadData`
   - reload lead from storage
   - verify paid access and territory lock
   - format message server-side
   - create/update `delivery_events`

4. Add webhook endpoint:
   - `POST /api/whatsapp/openwa/webhook`
   - verify shared secret
   - store inbound replies and `ack` events
   - update lead chase stage.

5. Add daily health checks:
   - worker online
   - session authenticated
   - queue depth
   - last successful send
   - last inbound/ack event

6. Add fallback:
   - if OpenWA fails, mark event `failed_openwa`
   - retry once
   - fallback to Twilio/official provider or email alert.

## Data Rules

Delivery event fields:
- `id`
- `leadId`
- `userId`
- `trade`
- `postcodeOutward`
- `provider`
- `recipient`
- `messageBody`
- `status`
- `providerMessageId`
- `sentAt`
- `failedAt`
- `error`

Never send:
- WASTE leads
- unverified internal fallback leads as GOLD
- DirectorySignal leads as GOLD unless explicitly allowed
- free-preview locked data

## Deployment Plan

Phase 1: local pilot
- run worker on local Windows or small VPS
- scan QR once
- send to one controlled internal number
- log every delivery event

Phase 2: paid-user beta
- one JobFilter-owned WhatsApp number
- one paid test user
- low volume only
- daily session health report

Phase 3: production decision
- keep OpenWA only if reconnect/session stability is acceptable
- otherwise keep it as backup and move primary sends to official WhatsApp Business API.

## Risk Register

High:
- WhatsApp Web automation may break or trigger account restrictions.
- Browser/session persistence is fragile on serverless platforms.
- Sending to unknown numbers may require licensing/support and carries spam risk.

Medium:
- QR re-auth can block delivery until manually fixed.
- Multi-tenant use from one WhatsApp account can confuse replies.
- Delivery status may not map cleanly to product outcomes.

Mitigation:
- keep volume low
- require opt-in
- use one controlled business number
- keep Twilio/official provider fallback
- store all delivery attempts
- alert when OpenWA session disconnects.

## Recommendation
Build the adapter, not a deep dependency. The JobFilter core should call a generic delivery provider. OpenWA can sit behind that provider for testing and backup without contaminating lead scoring, paid gating, or the storage model.
