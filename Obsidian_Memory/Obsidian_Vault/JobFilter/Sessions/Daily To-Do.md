# Daily To-Do

## 2026-08-22 (NightlyBuildAgent)

### Done
- [x] Build verified clean (npm run build + tsc --noEmit)
- [x] Tier 1 feature audit — all 5 features confirmed built
- [x] FindJobsPage: Fixed hardcoded 'building' trade in empty-state secondary CTA
- [x] FindJobsPage: Improved exhausted-scan counter copy (names price + what's locked)
- [x] PricingPage: Unified all paid CTAs to "GET FULL ACCESS — £39/MO →"
- [x] PricingPage: Added "No credit card required" below Pilot plan checkout button
- [x] PR #498 opened: nightly/2026-08-22-copy-fix → main

### Discovered / Next Run

- [ ] Trade-specific scoring for free-tier users: free users see generic badge text.
  Consider showing 1-2 trade keywords from the title even when full backend reasons aren't available.
- [ ] HomePage competitor copy: product is now FTS-focused but homepage doesn't name
  procurement portal competitors (Atamis, Delta eSourcing, Proactis). Consider adding
  a competitor callout section.
- [ ] package-lock.json drift: 60 lines removed by npm install locally. Should either
  commit the updated lockfile or confirm it's excluded properly.
- [ ] PricingPage: priceNote for Pilot plan says "Paid activation follows coverage and
  delivery checks." — this could be clearer about what "delivery checks" means.
- [ ] WinStatsBanner only shows when wonCount > 0. If there are no wins in an area it's
  invisible. Consider a fallback "Be the first in your area" message that still shows.
