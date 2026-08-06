# Daily To-Do

Last updated: 2026-08-06 (NightlyBuildAgent)

---

## Completed This Run

- [x] Remove internal source labels ("FTS", "Source mix") from Patch Pulse strip
- [x] Trade-specific scan loading messages per trade
- [x] Hero copy: name Bark + Checkatrade explicitly, add competitor callout
- [x] Upgrade nudge: "BUYER DETAILS" → "WHO TO CALL", add no-shared-leads framing
- [x] PR #443 opened: https://github.com/manazoid4/JobFilterV1/pull/443

---

## Next Run — Top 3 Priorities

1. **LeadDetailPage copy polish** — the "BUYER DETAILS" language appears there too; replace with tradesman-first copy ("who to call", "contact details"). Also check if the ADD TO CALENDAR link is visible enough — it may be buried below the fold on mobile.

2. **Empty scan state improvement** — EmptyScanReport currently shows a generic SVG illustration and "NO LIVE MATCHES. NO FAKE LEADS." For an electrician who got no results, it should say something like "No EV charger or rewire jobs in B14 this week — try widening to 25 miles or check back Monday." Trade-specific empty state by trade + area.

3. **PricingPage copy polish** — The pricing page is oriented toward FTS/public procurement ("5-25 person contractors") which doesn't match the domestic trades audience on FindJobsPage. The compare pages name competitors but the pricing page doesn't. Add a comparison snippet naming Bark/Checkatrade/MyBuilder with the £39 fixed vs their per-lead model.

---

## Discovered Issues

- The `getBestSource` and `getSourceMix` functions in FindJobsPage are now dead code (no JSX consumers after removing Patch Pulse source labels). Consider removing them in a future clean-up pass.
- `WinStatsBanner` fetches on every postcode change — including empty string on first load. This is fine since it hides when `wonCount === 0`, but adds an unnecessary API call on page load if no data.
