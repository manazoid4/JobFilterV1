# PROJECT_STATUS — JobFilter

## What Was Fixed

### API Reliability
- `/api/leads/scan` now ALWAYS returns JSON — never HTML
- `try/catch` wraps entire route handler
- Error catch block returns `{ error, leads: SCAN_FALLBACK, ... }` with 7 real fallback jobs
- Server-side `SCAN_FALLBACK` constant injects when live scan returns 0 results

### Critical Bug: Region Mismatch
- `postcodes.io` returns broad ONS region names ("North West", "London")
- `DirectorySignal` keyed on specific names ("Greater Manchester", "East London")
- When postcodes.io was UP, directory returned 0 leads — fallback always triggered
- **Fixed**: `lookupPostcode` now prefers local outward-code map when it returns a specific region

### Demo Page
- Loading state, error state, fallback state all implemented
- Input: postcode + trade selector
- Button: "Run Live Scan"
- Cards: title, location, value, urgency, source
- On any API failure → shows sample leads (never blank)
- Frontend validates `Content-Type: application/json` before parsing

### Navbar
- Updated: HOME / DEMO / CODEX / VANTAGE / VICINITY / PRICING
- All routes exist and render pages

### Visual Style
- Header: black background, yellow border, yellow UK badge
- Nav: white links, yellow hover, yellow GET STARTED button
- Pages: yellow (#facc15) + black dominant, thick borders, boxy, bold

### New Data Source: Companies House
- File: `leadEngine/fetchers/companiesHouseFetcher.ts`
- Implements strategic arbitrage signals from the Intelligence Report:
  - Signal 1: Recently incorporated companies (0–12 months) in growth SIC codes
  - Signal 2: Growth sector SIC pivots → premises fit-out signals
  - Signal 3: Construction/property/hospitality/tech companies → direct trade need
- 25 SIC code mappings → trade type + value estimate + urgency
- Wired into `scan.ts` pipeline alongside ContractsFinder, FTS, PlanningData

### Planning Data Fetcher
- Removed broken `geometry_relation: within` (requires polygon, not a point)
- Fixed to use point-based lat/lon lookup
- Improved field mapping to handle `json_data` nested structure

### Config
- `freeTierLimit` raised from 3 → 5 (shows more on demo without subscription)
- `SOURCE_CH` env flag added for Companies House toggle

## What Works Now

| Feature | Status |
|---------|--------|
| `npm run dev` | ✓ Starts on localhost:3000 |
| `/api/leads/scan` returns JSON | ✓ Always |
| Demo scan button | ✓ Works, shows results |
| Fallback leads on failure | ✓ 7 jobs shown |
| DirectorySignal data | ✓ Fixed region matching |
| ContractsFinder | ✓ Live (public API, no key) |
| FTS (Find a Tender) | ✓ Live (public API, no key) |
| PlanningData | ✓ Live (public API, no key) |
| Companies House signals | ✓ With API key |
| All 6 nav routes | ✓ Working |
| Build (`npm run build`) | ✓ Clean |
| TypeScript (`tsc --noEmit`) | ✓ Zero errors |

## Remaining Risks

1. **ContractsFinder/FTS latency**: These APIs can take 5–10 seconds per call. The 9s timeout in config may cause them to fail silently on slow connections.

2. **Planning Data API schema**: `planning.data.gov.uk` has changed their API schema multiple times. If they change field names again, the fetcher returns 0 planning leads (fallback covers this).

3. **Companies House** requires API key for live data. Without key, this source is silently skipped.

4. **No auth on `/api/leads/scan`**: Anyone can call it. Rate limiting is not implemented.

## Manual Steps Required

### To enable Companies House signals (free):
1. Register at https://developer.company-information.service.gov.uk/get-started
2. Create a live application, get API key
3. Add to `.env`:
```
COMPANIES_HOUSE_API_KEY=your_key_here
```

### To configure Stripe (payments):
```
STRIPE_SECRET_KEY=sk_live_...
APP_URL=https://yourdomain.com
```

### To run:
```bash
npm run dev        # development (localhost:3000)
npm run build      # production build
```

### Environment file:
Create `.env` in project root with required keys (see above).

## Architecture Summary

```
POST /api/leads/scan
  └── scan(postcode, trade, tier)
        ├── ContractsFinder (public, no key)
        ├── FTS / Find a Tender (public, no key)
        ├── PlanningData (public, no key)
        ├── CompaniesHouse (free key required)
        └── DirectorySignal (internal, always works)
```

All sources run in parallel. Any failure → that source returns empty, others continue.
If all sources return 0 leads → server injects SCAN_FALLBACK (7 real UK trade jobs).
Frontend ALSO has FALLBACK_LEADS as secondary safety net.
