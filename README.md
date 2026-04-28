# JobFilter

REAL LEADS. NO CHASING. NO COMPETING. STAY IN CONTROL.

JobFilter is an intake system for UK tradesmen. The current production path uses live Contracts Finder public procurement notices for `/find-jobs`.

## Environment Variables

No API key is required for the live Contracts Finder search.

Optional:

```bash
PORT=3000
NODE_ENV=development
```

## Install

```bash
npm install
```

## Run Frontend + API Locally

```bash
npm run dev
```

If Vite reports a websocket port conflict:

```bash
set DISABLE_HMR=true&& npm run dev
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

Endpoint:

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

## Routes

```text
/              Home
/find-jobs     Live scanner
/pricing       Pricing
/codex         Technical editorial page
/health        Frontend health page
/api/health    API health JSON
```

## Known Limitations

- Radius is currently an intake preference, not a true geospatial distance filter.
- Contracts Finder notices do not always include exact delivery postcodes or values.
- Only Contracts Finder is live right now.
- Next source to add: Planning Data from `planning.data.gov.uk`.
