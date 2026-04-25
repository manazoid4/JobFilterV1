# JobFilter V1

Built in Birmingham.  
Built for trades.  
One job: **filter real work from noise**.

## What this app does

- Intake + lead scan.
- Lead scoring with reason codes.
- Waitlist capture + onboarding email alerts.
- Stripe checkout (subscription + priority pass).
- WhatsApp intake state machine.

## Run local

1) Install deps

```bash
npm install
```

2) Create env file

```bash
cp .env.example .env.local
```

3) Add required envs

- `APP_URL`
- `STRIPE_SECRET_KEY`
- `RESEND_API_KEY`
- `FIREBASE_SERVICE_ACCOUNT`

4) Start dev server

```bash
npm run dev
```

Server runs on `http://localhost:3000`.

## Release checks

```bash
npm run lint
npm run build
```

## Core API routes

- `GET /api/health`
- `GET /api/scan?postcode=B15+1AA&trade=plumbing&tier=free`
- `POST /api/waitlist`
- `POST /api/whatsapp/webhook`
- `POST /api/stripe/priority-pass`
- `POST /api/create-checkout-session`

## Notes

- Calendar sync endpoint is intentionally `501 not_implemented` until OAuth is wired.
- WhatsApp session state persists in Firestore collection: `whatsapp_sessions`.
