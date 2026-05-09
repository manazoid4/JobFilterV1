# Conversion Improvements - 2026-05-09

## Scope

Sidecar inspection only. No app files edited.

Focus: builder psychology, territory acquisition, CTA/copy, scarcity, and growth systems.

## Main Read

JobFilter already has the right enemy: shared lead platforms, wasted evenings, weak enquiries, and postcode competition.

The strongest conversion move is to turn the site from "scan my area" into "claim my patch before someone else gets the Gold alerts". Builders and trades do not buy software because it is clever. They buy control, timing, and less wasted driving.

## Priority Recommendations

1. Make territory ownership the primary conversion path.

Current CTAs say "Scan my area free" and "Get started". Better:

- "Check my patch"
- "Claim Gold alerts in my postcode"
- "Lock my trade + patch"
- "Watch this postcode"
- "Send Gold leads to WhatsApp"

This keeps the free scan useful but points the paid upgrade at control, not curiosity.

Likely targets:
- `src/pages/HomePage.tsx`
- `src/components/TopNav.tsx`
- `src/pages/PricingPage.tsx`
- `src/components/WaitlistForm.tsx`

2. Add a dedicated territory acquisition page.

Recommended route:

- `/territory`
- Optional SEO aliases later: `/claim-your-patch`, `/postcode-leads`

Page job:

- Let a trade enter postcode, trade, radius, and WhatsApp/email.
- Show "patch status" without exposing source mechanics.
- Convert to Founding 30 or watchlist.

Suggested copy:

Headline:
`CLAIM YOUR PATCH BEFORE THE GOOD JOBS GET NOISY.`

Sub:
`Pick your trade. Pick your postcode. JobFilter watches the signals and sends Gold jobs to WhatsApp before they turn into shared lead auctions.`

CTA:
`CHECK MY PATCH`

Paid CTA:
`LOCK MY TRADE + PATCH`

Trust line:
`Gold leads are controlled by trade, patch, and timing. If a signal looks crowded, it gets marked down or blocked.`

Likely targets:
- new `src/pages/TerritoryPage.tsx`
- `src/App.tsx` route
- `src/components/TopNav.tsx`
- `src/components/WaitlistForm.tsx`
- server route later for real patch availability, probably `server/routes/waitlist.ts` or a new `server/routes/territory.ts`

3. Fix city page scan handoff before spending on territory traffic.

Observed likely bug:

- `src/components/CityPage.tsx` navigates to `/find-jobs?postcode=${city.postcode}&trade=building`
- `src/pages/FindJobsPage.tsx` reads `area`, not `postcode`

Result: city CTA may not prefill the city postcode and may fall back to saved/default postcode.

Recommended fix later:

- either change CityPage to `?area=${city.postcode}`
- or make FindJobsPage accept both `area` and `postcode`

Likely targets:
- `src/components/CityPage.tsx`
- `src/pages/FindJobsPage.tsx`

4. Tighten scarcity so it feels real, not decorative.

Current scarcity is "Founding 30 slots left". Good start, but it should become territory scarcity:

- `Founding 30: price locked`
- `Patch lock: trade + postcode window`
- `Gold alert control: no shared auction`

Suggested copy:

`Founding 30 locks the price. Patch control locks the value.`

`Once a trade + patch is active, Gold alerts are controlled before WhatsApp delivery.`

Avoid:

- "exclusive forever"
- "nobody else can ever see this"
- public source-stack explanations

Likely targets:
- `src/pages/PricingPage.tsx`
- `src/components/WaitlistForm.tsx`
- `src/pages/HomePage.tsx`

5. Remove or soften risky overclaims.

Some copy says:

- `Every signal is exclusive`
- `Before anyone else sees it`
- source names/details shown in public examples

Safer stronger wording:

- `Gold leads are controlled before WhatsApp delivery`
- `No shared auction`
- `No five-trade blast`
- `Private filter, clear action`
- `Official signal, scored for your trade`

This matches the product memory and protects trust.

Likely targets:
- `src/pages/HomePage.tsx`
- `src/components/CityPage.tsx`
- `src/components/TradePage.tsx`
- `src/pages/ForYourTradePage.tsx`

6. Replace generic social proof with outcome proof.

The homepage testimonials read like forum quotes and may create trust risk if not sourced/verified. Better builder psychology:

- show one anonymised outcome pattern
- keep it factual and structured
- avoid pretending to have public named case studies unless verified

Suggested block:

`What a win looks like`

- `Gold lead found in B14`
- `Trade: electrical`
- `Reason: deadline soon + buyer named + strong local match`
- `Action: WhatsApp alert sent`
- `Outcome: quoted / won / lost tracked`

Likely targets:
- `src/pages/HomePage.tsx`
- `src/components/WinSummary.tsx`
- `src/pages/DashboardPage.tsx`

7. Make the scanner empty state a conversion system.

Current "No matches right now" is honest, which is good. It should convert into a watch action:

Suggested copy:

`No Gold matches right now. Good. No fake leads.`

`Watch this patch and we will WhatsApp you when one appears.`

CTA:
`WATCH THIS PATCH`

Secondary:
`WIDEN TO 50 MILES`

Likely targets:
- `src/pages/FindJobsPage.tsx`
- possible API route later for territory/watch intent

8. Use WhatsApp as the sales channel, not only delivery.

Add a low-friction CTA for trades who would rather message than fill a form:

- `Message JobFilter on WhatsApp`
- `Ask if my patch is covered`
- `Send my postcode`

Likely targets:
- `src/components/TopNav.tsx`
- `src/pages/HomePage.tsx`
- `src/pages/PricingPage.tsx`
- `src/components/WaitlistForm.tsx`

## Recommended Navigation

Desktop nav should prioritise buying intent:

1. `Find Jobs`
2. `Claim Patch`
3. `Pricing`
4. `For Trades`
5. `Proof`

Secondary/footer:

- `Signals`
- `Free Tools`
- `Compare`
- `Cities`

Current nav exposes "Pipeline" before the user has bought. That is useful for product users, but weaker for acquisition.

Likely target:
- `src/components/TopNav.tsx`

## Territory Page Structure

1. Hero

`CLAIM YOUR PATCH BEFORE THE GOOD JOBS GET NOISY.`

`Pick your trade and postcode. JobFilter watches official signals and sends Gold jobs to WhatsApp when they are worth chasing.`

CTA: `CHECK MY PATCH`

2. Patch Checker

Fields:

- trade
- postcode
- radius
- phone/email

Output:

- `Patch checked`
- `Trade match`
- `Gold alert control available`
- `Founding price available`

No fake lead output.

3. Control Explanation

`Gold leads are controlled by trade, patch, and timing before WhatsApp delivery. If a signal looks crowded, it gets marked down or blocked.`

4. Scarcity

`Founding 30 locks price. Patch control protects lead quality.`

5. CTA

`LOCK MY TRADE + PATCH`

## Growth Systems

1. Partner landing pages for trade bodies.

Start with electrical:

- `/partners/napit`
- `/partners/niceic`
- `/partners/eca`

Offer:

- member-only rate
- co-branded webinar
- WhatsApp-first onboarding

Likely targets:
- new partner page template
- `src/App.tsx`
- waitlist source tracking

2. City + trade territory matrix.

Use existing city and trade pages but connect them to territory acquisition:

- `/construction-leads/birmingham` -> "Claim Birmingham patch"
- `/trade/electricians` -> "Claim electrical alerts in your postcode"
- later: `/trade/electricians/birmingham`

Likely targets:
- `src/components/CityPage.tsx`
- `src/components/TradePage.tsx`
- route generation later

3. Outcome loop.

Every lead should eventually capture:

- sent
- opened
- contacted
- quoted
- won/lost
- value

This turns scarcity from marketing into real conversion proof.

Likely targets:
- `src/pages/DashboardPage.tsx`
- `server/routes/outcomeReport.ts`
- `server/services/leadScoring.ts`

## Copy Swaps

Current:
`GET STARTED`

Better:
`CHECK MY PATCH`

Current:
`SCAN FIRST`

Better:
`SEE WHAT IS LIVE`

Current:
`Founding 30 slots filling fast`

Better:
`30 trades lock the first price. After that, the patch still works but the deal is gone.`

Current:
`Every signal is exclusive`

Better:
`Gold leads are controlled before WhatsApp delivery. No shared auction.`

Current:
`Before anyone else sees it`

Better:
`Before it turns into directory noise.`

Current:
`Source link + buyer`

Better:
`Proof + buyer detail`

## Highest Impact Next Build

Build a real `/territory` page and route every high-intent CTA to it.

Do not make it a generic landing page. Make it a patch checker with a paid conversion path:

`trade + postcode + radius -> patch status -> watch/lock -> WhatsApp delivery`

This fits builder psychology better than broad SaaS copy because it feels local, scarce, and directly tied to money.

