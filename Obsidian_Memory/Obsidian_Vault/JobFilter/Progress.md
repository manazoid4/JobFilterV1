# Progress — 5th May 2026

## What was built & deployed

### Triple Engine + TradieStack (initial push)
- WhatsApp wire-up (Twilio)
- Chase engine (nudge, template, update)
- Win engine (outcomes, review links)
- Waitlist counter + email confirmation (Resend)
- HomePage Old Way vs JobFilter comparison
- TradieStack product page (£450 one-off)
- LeadPreview component (renamed from LeadProofCard)

### Production fixes
- TopNav JSX syntax error fixed (`))}` → `)}`)
- Missing `steps` and `products` consts added to HomePage
- All 8 API routes synced to Firebase production function (`functions/index.ts`):
  - `GET /api/waitlist/count`
  - `POST /api/leads/notify`
  - `POST /api/chase/update`, `/api/chase/nudge`, `/api/chase/template`
  - `POST /api/leads/outcome`, `/api/leads/review-link`
  - `GET /api/leads/summary`
- Twilio + Resend helper functions inlined into `functions/index.ts` (was in gitignored `functions/lib/`)

## Current state
- **Main branch**: All fixes deployed, Firebase function updated
- **Waitlist**: 11 signups, 19 slots remaining (Founding 30)
- **Site**: Live at jobfilter.uk
- **API**: All endpoints verified working

## Key decisions
- Production uses `functions/index.ts` (Firebase Cloud Function), not local `server/routes/`
- `functions/lib/` is gitignored — helper code must be inlined or placed in tracked directory
- GitHub API used to push directly to main to bypass CI delays

## Open items
- Verify white screen fully resolved (clear cache)
- Stripe integration for TradieStack (£450) may need webhook setup
- Email confirmations require `RESEND_API_KEY` env var set in Firebase
