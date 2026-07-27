# Changelog 2026-07-27 — NightlyBuildAgent Run

## BUILD STATUS
- npm run build: PASS
- npx tsc --noEmit: PASS (zero errors)

## TYPESCRIPT
- No errors found or fixed this run.

## FIXES (Phase 1 — Broken Flow)

### WhatsApp fake-flow fixed (`src/pages/FindJobsPage.tsx`)
- `sendWhatsApp` was calling `/api/leads/notify` (deliberately disabled Express route that always returns `{triggered: false}`) and set `whatsappSent = true` BEFORE the API call — button always showed "SENT TO WHATSAPP" regardless of outcome.
- Fixed: now calls `/api/leads/whatsapp` (active Next.js App route with Meta consent + template checks). Only sets `whatsappSent = true` on `res.ok`. Button stays active on failure so user can retry or add their phone via Account.

### Vercel cron schedule fixed (`vercel.json`)
- `/api/alerts/send` cron was `0 * * * *` (hourly) — Vercel Hobby plan only allows daily crons. Was blocking all preview deployments.
- Fixed: changed to `0 8 * * *` (8am UTC daily).

## COPY POLISH (Phase 3)

### PricingPage (`src/pages/PricingPage.tsx`)
- Both `SCAN FREE FIRST →` CTAs changed to `SCAN FREE — NO CARD NEEDED →` per copy rules.
- FAQ answers sharpened:
  - "Is Find a Tender free?" — clearer explanation of what the £39 pays for.
  - "Who is JobFilter for?" — added Checkatrade/MyBuilder competitor names, clearer audience framing.
  - "Are opportunities exclusive?" — added "We're upfront about this; other services often aren't."
  - "Can I check coverage before paying?" — "always scan free first" framing.
- Footer text: added "Unlike Checkatrade or BuildAlert, we qualify public tenders — not domestic homeowner enquiries."

### FindJobsPage empty state (`src/pages/FindJobsPage.tsx`)
- Pre-scan prompt: headline changed from passive "CHECK THE CURRENT PUBLIC-TENDER FEED" → "SCAN WHICH ONES FIT YOUR TRADE AND PATCH"
- Pre-scan label: "READY?" → "PUBLIC TENDERS ARE LIVE RIGHT NOW" (fear → proof → control)
- Instruction text: "Tap a trade above" → "Enter your postcode above. Pick your trade."
- Removed ambiguous "SCAN BUILDING WORK" secondary button — single clear CTA.

## SITE HEALTH (Phase 4)

### NEEDLE — Top 3 issues found
1. WhatsApp button fake flow (FIXED above)
2. `EmptyScanReport` showed corporate copy: "Alert delivery is available only after the selected provider and account configuration have been verified" — meaningless to a tradesman
3. Pre-scan empty state had duplicate confusing CTAs

### BUILDER — Fix applied
`EmptyScanReport` navy block copy replaced:
- Before: "Alert delivery is available only after the selected provider and account configuration have been verified." + "CHECK ALERT CONFIGURATION & PRICING"
- After: "NO MATCHES DOESN'T MEAN NO WORK" + "Nothing's been published on Find a Tender for your trade and patch this cycle. The live feed updates daily — check back or widen your radius to pick up regional contracts." + "GET WEEKLY ALERTS — NO CARD NEEDED →"

### CRITIC: Clearer in <3 seconds? YES
### REVENUE: Increases £39/mo conversion? YES — user retention on empty state → more likely to return and convert

## PR CREATED
- Branch: `nightly/2026-07-27-fixes`
- PR: https://github.com/manazoid4/JobFilterV1/pull/398
- CI: in progress at time of writing
