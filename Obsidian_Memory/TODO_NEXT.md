---
type: meta
status: active
created: 2026-04-28
updated: 2026-04-28
links:
  - "[[design-system]]"
  - "[[DeWalt Design Language]]"
  - "[[Lead Source — Contracts Finder API]]"
  - "[[messaging-rewrite]]"
---
# TODO Next — Execution Queue

## P0 — This Week (revenue-blocking)
1. ~~**Real lead source**~~: ✅ SHIPPED `ca2876c` — leadEngine copied into `functions/leadEngine/`, gitignore updated. Real Contracts Finder + FTS data now flowing on `/api/leads/scan`. See [[Lead Source — Contracts Finder API]].
2. ~~**Homepage rewrite**~~: ✅ SHIPPED — hero already had "land in your WhatsApp" copy from [[messaging-rewrite]]. React entry, not Alpine.
3. **Demo trust signals**: Add skeleton loaders, live counter (~847 incrementing), pulse dot on HOT badges. Spec in [[design-system]]. **DEFERRED — polish, not revenue-blocking**.
4. ~~**Stripe trial flow**~~: ✅ SHIPPED `7cb18bd` — `subscription_data.trial_period_days = 7` on checkout session. End-to-end test still required.
5. ~~**Brand phrases**~~: ✅ SHIPPED `7cb18bd` — all 9 phrases on hero strip (was 4 of 9).

## P1 — Next Week
5. **WhatsApp delivery MVP**: Twilio or Whapi.cloud. One tradesman, one trade, one postcode, daily 7am message.
6. **Codex page split**: Move Codex content to `/codex` standalone. Footer link only on main site.
7. **Brand phrases coverage**: Land remaining 8 of 9 phrases in nav/cards/hero.
8. **React migration plan**: Don't flip yet — but plan the cutover (post-conversion sprint).

## P2 — Defer
- Multi-trade support
- Postcode targeting beyond MVP radius
- Analytics dashboard
- Email onboarding sequences

## Killed (do not build)
- Fake testimonials with stock photos
- All-caps marketing screaming
- Generic CTAs ("Get Started", "Find Jobs")
- Pill-shaped buttons
- Black/yellow [[DeWalt Design Language]]
