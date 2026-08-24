# V2 route migration matrix

No route is deleted during the foundation slice. `KEEP` means the URL remains stable until analytics and customer state are verified. `REDIRECT` is a planned change that must ship with a tested permanent redirect. `RETIRE` routes are already intended to be unavailable in production.

| Decision | Routes | Notes |
|---|---|---|
| KEEP | `/`, `/pricing`, `/trust`, `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/auth/callback`, `/account`, `/activation-pending`, `/dashboard`, `/leads`, `/leads/[id]` | Core public/authenticated journeys; copy and ownership change only in later slices |
| KEEP | `/find-jobs`, `/signals`, `/signals/weekly`, `/territories`, `/territory`, `/intelligence/[city]` | Retained Opportunities module |
| KEEP | `/microsite`, `/pro/[slug]`, `/[slug]`, `/my-link` | Public URL commitments; never break without an explicit slug-level 301 map |
| KEEP | `/methodology`, `/whats-new`, `/privacy`, `/terms`, `/faq`, `/news`, `/tips`, `/for-your-trade`, `/free-tools` | Public trust/content routes |
| KEEP | `/smart-quote`, `/post-job`, `/tradie-zone`, `/tradiestack`, `/vantage`, `/vicinity`, `/trade-map`, `/uk-grid`, `/epc` | Existing tools remain until usage is known |
| KEEP | `/2builduk-alternative`, `/vs/bark`, `/vs/buildalert`, `/vs/checkatrade`, `/vs/mybuilder`, `/vs/rated-people`, `/vs/trustatrader` | Existing comparison SEO routes |
| KEEP | `/construction-leads/birmingham`, `/construction-leads/bristol`, `/construction-leads/glasgow`, `/construction-leads/leeds`, `/construction-leads/london`, `/construction-leads/manchester` | Existing location SEO routes |
| KEEP | `/trade/asbestos-surveyors`, `/trade/builders`, `/trade/cctv-security`, `/trade/damp-proofers`, `/trade/data-cabling`, `/trade/decorators`, `/trade/electricians`, `/trade/ev-charger-installers`, `/trade/fibre-installers`, `/trade/fire-safety`, `/trade/gas-engineers`, `/trade/groundworkers`, `/trade/heat-pump-installers`, `/trade/hvac-engineers`, `/trade/plumbers`, `/trade/quantity-surveyors`, `/trade/roofers`, `/trade/scaffolders`, `/trade/smart-home-installers`, `/trade/solar-pv-installers`, `/trade/structural-engineers` | Existing trade SEO routes; replacement claims remain restricted for regulated trades |
| KEEP | `/acm-report-pack`, `/calc-pack`, `/cctv-compliance-pack`, `/dno-brief`, `/fra-template`, `/gas-safe-kit`, `/material-price-engine`, `/nasc-pack`, `/om-builder`, `/ozev-grant-pack`, `/swmp-template`, `/wayleave-pack` | Existing tool/content commitments; reassess with analytics before any redirect |
| KEEP | `/claim`, `/features/admin-guard`, `/dashboard/admin-guard` | Existing acquisition/product surfaces |
| REDIRECT | `/blueprint` → `/methodology` | Both are labelled “How It Works”; redirect only after content-parity review |
| RETIRE | `/test`, `/test/intake`, `/dev-portal`, `/codex` | Must remain unavailable in production; remove source only in a separate verified change |
| ADD | `/demo/revenue-rescue` | Synthetic, no-send sales walkthrough; `noindex` until the product gate passes |

All existing API paths remain `KEEP` during the foundation slice. The App Router and legacy `/api/[[...path]]` Express catch-all require endpoint-by-endpoint ownership before consolidation.
