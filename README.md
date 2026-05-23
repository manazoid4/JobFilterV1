# JobFilter

REAL LEADS. NO CHASING. NO COMPETING. STAY IN CONTROL.

JobFilter is an intake system for UK tradesmen. The current production path uses live Contracts Finder public procurement notices for `/find-jobs`.

## Environment Variables

No API key is required for the live Contracts Finder search.

Optional:

```bash
PORT=3000
NODE_ENV=development
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Production data is moving to Supabase:

```text
Run supabase/migrations/20260522_vercel_supabase_saas.sql
Keep SUPABASE_SERVICE_ROLE_KEY server-only.
```

## Install

```bash
npm install
```

## Run Frontend + API Locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
http://localhost:3000/find-jobs
```

## Build + Test Commands

```bash
npm run lint
npm run build
```

## API

Live lead scanner endpoint:

```text
POST /api/leads/search
```

Request:

```json
{
  "postcode": "B14 7QH",
  "trade": "electrical",
  "radiusMiles": 25
}
```

Response shape:

```json
{
  "ok": true,
  "source": "contracts_finder",
  "count": 0,
  "region": "West Midlands",
  "outward": "B14",
  "leads": [],
  "errors": []
}
```

Waitlist endpoint:

```text
POST /api/waitlist
```

```json
{
  "name": "A Tradesman",
  "trade": "Electrician",
  "contact": "name@example.com",
  "source": "site"
}
```

Expected pattern:

```json
{ "ok": true }
```

Intake scoring endpoint:

```text
POST /api/intake/score
```

```json
{
  "jobType": "Plumbing",
  "urgency": "Emergency",
  "postcode": "B14 7QH",
  "phone": "07123456789",
  "details": "Leaking boiler",
  "hasPhotos": true
}
```

## Curl Examples

Success query:

```bash
curl -s -X POST http://localhost:3000/api/leads/search \
  -H "Content-Type: application/json" \
  -d "{\"postcode\":\"B14 7QH\",\"trade\":\"electrical\",\"radiusMiles\":25}"
```

Expected pattern:

```json
{
  "ok": true,
  "source": "contracts_finder",
  "count": 1,
  "region": "West Midlands",
  "outward": "B14",
  "leads": [{ "source": "Contracts Finder" }],
  "errors": []
}
```

Empty result query:

```bash
curl -s -X POST http://localhost:3000/api/leads/search \
  -H "Content-Type: application/json" \
  -d "{\"postcode\":\"BT1 5GS\",\"trade\":\"roofing\",\"radiusMiles\":10}"
```

Expected pattern:

```json
{
  "ok": true,
  "source": "contracts_finder",
  "count": 0,
  "region": "Northern Ireland",
  "outward": "BT1",
  "leads": [],
  "errors": []
}
```

Invalid postcode query:

```bash
curl -s -X POST http://localhost:3000/api/leads/search \
  -H "Content-Type: application/json" \
  -d "{\"postcode\":\"BAD\",\"trade\":\"electrical\",\"radiusMiles\":25}"
```

Expected pattern:

```json
{
  "ok": false,
  "source": "contracts_finder",
  "count": 0,
  "region": "",
  "outward": "",
  "leads": [],
  "errors": ["valid UK postcode required"]
}
```

Waitlist:

```bash
curl -s -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"A Tradesman\",\"trade\":\"Electrician\",\"contact\":\"name@example.com\",\"source\":\"readme\"}"
```

Intake score:

```bash
curl -s -X POST http://localhost:3000/api/intake/score \
  -H "Content-Type: application/json" \
  -d "{\"jobType\":\"Plumbing\",\"urgency\":\"Emergency\",\"postcode\":\"B14 7QH\",\"phone\":\"07123456789\",\"details\":\"Leaking boiler\",\"hasPhotos\":true}"
```

## Routes

```text
/              Home
/find-jobs     Live scanner
/pricing       Pricing
/codex         Technical editorial page
/free-tools    Free quote, job, and diesel tools
/tips          Tips for tradesmen
/vantage       Bid/presentation advantage
/vicinity      Past-work marketing advantage
/privacy       Privacy policy
/terms         Terms
/health        Frontend health page
/api/health    API health JSON
```

## Production Deploy

```bash
npm run lint
npm run build
```

Vercel requirements:

- Framework preset: Next.js
- Project root: `JobFilterV1`
- Build command: `npm run build`
- Environment variables from `.env.example`
- Supabase migration applied before production data writes

## Known Limitations

- Radius is currently an intake preference, not a true geospatial distance filter.
- Contracts Finder notices do not always include exact delivery postcodes or values.
- Only Contracts Finder is live right now.
- Next source to add: Planning Data from `planning.data.gov.uk`.
