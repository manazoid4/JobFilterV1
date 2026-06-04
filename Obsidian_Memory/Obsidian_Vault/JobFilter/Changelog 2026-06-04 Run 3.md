# Changelog 2026-06-04 — NightlyBuildAgent Run 3

## Build Status
- **Build:** GREEN (106 pages)
- **TypeScript:** CLEAN

## Phase 1 — Fixes

### Stripe webhook TypeScript errors fixed (`app/api/stripe/webhook/route.ts`)
- `isEventProcessed` and `markEventProcessed` function parameter types: `ReturnType<typeof getSupabaseServiceClient>` → `NonNullable<ReturnType<...>>` to match existing pattern on lines 266/313
- `Subscription.current_period_end`: Stripe v22 removed this from the top-level TypeScript type; cast via `(subscription as unknown as { current_period_end?: number })` to maintain runtime behaviour
- `Invoice.subscription`: Stripe v22 removed this from `Stripe.Invoice` TypeScript type; introduced `LegacyInvoice = Stripe.Invoice & { subscription?: string | { id: string } }` type alias used in both `handleInvoicePaymentSucceeded` and `handleInvoicePaymentFailed`

## Phase 3 — Copy Polish

### DashboardPage (`src/pages/DashboardPage.tsx`)
Pipeline jargon removed from the page paying users land on most:
- Micro-label: `PIPELINE` → `JOB TRACKER`
- Empty state micro-label: `NO PIPELINE YET` → `NO JOBS TRACKED YET`
- TRACKING box sub-text: `'leads in your pipeline'` → `'jobs you are tracking'`
- TRACKING box link: `View chase list →` → `View your jobs →`
- YOUR INTAKE section headline: `YOUR PIPELINE` → `YOUR ACTIVE JOBS`

### HomePage (`src/pages/HomePage.tsx`)
- WHAT YOU GET item: `Pipeline tracking` → `Job tracking` with specific body copy: "Track every lead from first contact to won job — see who to call, when to follow up, and what you have won."

### TerritoriesPage (`src/pages/TerritoriesPage.tsx`)
- Problem card body: "An empty pipeline forces price cuts..." → "No steady work forces price cuts to win jobs. A locked territory keeps leads coming so you price to margin, not to panic."
- Included features bullet: `Pipeline tracking for every opportunity` → `Job tracking — every lead from first contact to won job`

### TrustCenterPage (`src/pages/TrustCenterPage.tsx`)
- Features list: `Pipeline tracking for every opportunity` → `Job tracking — every lead from first call to won job`

### ForYourTradePage (`src/pages/ForYourTradePage.tsx`)
- Reason card: `until your pipeline is light` → `until your diary has space for them` (tradesman language)

### AdminGuardTeaserPage (`src/pages/AdminGuardTeaserPage.tsx`)
- Comparison table: `Connected to your lead pipeline` → `Connected to your JobFilter lead feed`
- CTA body: `Admin sorted. Pipeline moving.` → `Admin sorted. Jobs moving.`

## Phase 4 — Site Health Check

### NEEDLE: Top 3 issues found
1. **PIPELINE terminology in DashboardPage** (line 68) — jargon visible immediately to paying users → FIXED this session
2. **FILL MY WEEK vague benefit** (FindJobsPage line 756) — only shown after first scan; existing micro-label "QUIET WEEK? FIX IT." already provides the why; deferred
3. **PATCH PULSE unexplained labels** (FindJobsPage line 709) — GOLD/SILVER/LOCKED visible without explanation

### BUILDER: DashboardPage PIPELINE → JOB TRACKER
**CRITIC:** Yes, clearer in <3 seconds. "JOB TRACKER" is instantly understood by any UK tradesman.
**REVENUE:** Yes. Paying users understand their dashboard immediately; no friction at the point where they should feel in control.

## Next Run Priorities

1. **PATCH PULSE labels** — add plain-English tooltip or inline explanation: "GOLD = worth quoting, SILVER = watch, locked = need to upgrade"
2. **"pipeline" sweep** — remaining instances in TradeBuilders, TradePlumbers (describing the TRADE's problem, not JobFilter's UI) — check if they're user-facing or marketing-only; most are fine as they describe the problem rather than the product
3. **Stripe live test** — 4242 4242 4242 4242, confirm /dashboard?welcome=1 and profiles.plan flip (blocked on test keys in Vercel)
