# 04 — Unified Execution: Calendar, Engine, Tooling, Metrics, Budget, Risks

Three plans, **one operator**. This file makes them runnable without burning out.

---

## 1. The hard constraint: you are one person

You cannot run three launches at once. The sequencing rule:

- **One big launch per month, max.** Everything else stays on evergreen cadence.
- **Recommended order:** (1) MazOS foundation first (it's the hub + Agent Nudge's
  distribution), (2) Agent Nudge launch (discrete, high-energy, benefits from the hub), (3)
  JobFilter microsite + content compounding (longer game, SEO takes time anyway).
- **Batch, don't scatter.** Produce content in weekly blocks; schedule ahead.

---

## 2. The shared content engine (write once, distribute many)

All three brands run the **same production loop**, only the payload changes:

```
BUILD (ship real work)  →  DOCUMENT (a build log / teardown)  →  DISTRIBUTE (per-audience)
```

One artifact per week per active project becomes:
- **JobFilter** → blog post + Facebook clip + YouTube Short + "Weekly Notice" email item
- **Agent Nudge** → dev.to post + X thread + demo clip + Discord update
- **MazOS (hub)** → LinkedIn post + X thread + newsletter section

The *teardown* format (a real thing, honestly walked through) is the reusable signature across
all three: bid/no-bid notice (JobFilter), agent collision + receipt (Agent Nudge), technical
decision (MazOS). Learn it once, apply everywhere.

---

## 3. Unified 90-day calendar

| Week | MazOS (hub) | Agent Nudge | JobFilter |
| --- | --- | --- | --- |
| 1 | Truth-align portfolio (#2/#3); lock handles/bio | Ship verified release + onboarding (#8) | `/win-public-work` pillar + 2 teardowns |
| 2 | GitHub README; start posting cadence | Record demo; stand up landing + email capture | Facebook + YouTube live; 4 Shorts |
| 3 | First 2 build logs | Build-in-public teasers; line up 5–10 testers | "Weekly Notice" email launches |
| 4 | Sustain cadence | **Pre-launch polish**; prep Show HN + PH copy | Microsite MVP spec + `?ref=` plumbing |
| 5 | Ride the launch (biggest BIP moment) | **LAUNCH: Show HN + X + PH** | 2 articles/wk + 3 Shorts/wk |
| 6 | Launch newsletter | Post-launch: Reddit value posts; nurture Discord | Ship microsite MVP to first users |
| 7 | Long teardown/opinion piece | Weekly dogfood log cadence | Onboard 10–20 firms; publish `/stories` |
| 8 | Track inbound | Convert launch issues into public roadmap | Seed 3–5 Facebook trade groups |
| 9–10 | Double down on best 2 formats | Sustained content; plan v0.6 re-launch | Turn on referral incentive |
| 11–12 | "How I ship solo with agents" long-form | Community growth; first external contributors | Programmatic `/trades/{trade}`; review SEO |

Month boundaries: **M1 = foundations**, **M2 = launch (Agent Nudge) + microsite ship**,
**M3 = compound + referral loop + measure.**

---

## 4. Tooling stack (bootstrap-friendly)

| Need | Suggested (low/no cost) |
| --- | --- |
| Social scheduling | Buffer / Typefully (X threads) / native schedulers |
| Email/newsletter | Beehiiv or Substack (free tiers) — one list per brand |
| Analytics | Plausible or GA4 + GitHub insights (stars/traffic) + UTM/`?ref=` params |
| Design assets | Canva + a locked brand kit per brand (DeWalt palette for JobFilter) |
| Demo capture | asciinema / ScreenStudio / OBS for Agent Nudge demo |
| Link/QR | Owned short links per brand; QR for JobFilter microsites (van/card) |
| Content ops | One Kanban (Notion/GitHub Projects) with a "content" lane per brand |

Keep each brand's list and analytics **separate** — different audiences, different messaging.

---

## 5. Metrics dashboard (one view, three columns)

Track weekly; the leading indicator per brand is bolded:

- **JobFilter:** free scans, signups, **microsites created**, microsite CTR, referred
  signups, organic sessions, email list.
- **Agent Nudge:** **GitHub stars**, installs/downloads, HN/PH performance, Discord actives,
  email list, external contributors.
- **MazOS:** **engaged followers (LinkedIn+X)**, newsletter subs, inbound (recruiter/client/
  collab), portfolio sessions, name-search ranking.

Cross-brand health metric: **total owned audience** (sum of email + newsletter subscribers) —
the reusable asset that de-risks every future launch.

---

## 6. Budget (bootstrap)

The dominant cost is **your time**, not money. Cash spend is small:
- Domains/hosting: JobFilter live already; Agent Nudge + MazOS on Vercel free/low tiers.
- Tooling: start on free tiers; upgrade only when a channel proves out.
- Optional paid: a little Facebook/Google spend for JobFilter *after* organic + microsite
  loop show conversion (don't pay for reach before the funnel converts). PH/HN/Reddit are free.
- Design: Canva free + templates; commission a logo/brand polish only if it's a bottleneck.

Rule: **prove the loop organically before spending on ads.** The microsite loop and OSS
launches are designed to grow without paid acquisition.

---

## 7. Risks & anti-patterns

| Risk | Mitigation |
| --- | --- |
| Solo operator overload / burnout | One launch/month; batch content; evergreen the rest |
| Launching Agent Nudge with a broken install | Ship #8 first; test first-run before Show HN |
| Thin programmatic SEO pages (Google penalty) | Real data per page; quality gate; no doorway pages |
| Over-promising on any brand (trust damage) | Keep the honest/evidence voice everywhere — it's the shared brand asset |
| Posting without shipping (hollow brand) | Shipping is the fuel; if there's nothing real to show, build, don't fake |
| Spreading thin across all channels | Per brand: pick the top 2 channels, ignore the rest until they're winning |
| Microsite loop with no attribution | `?ref=` + "Powered by JobFilter" mark from day one, or the loop is invisible |
| Mismatched identity (MazOS) | Consistent handle/bio/UVP across LinkedIn/X/GitHub |

---

## 8. Definition of done for this planning cycle
- [ ] These docs reviewed and adjusted with real targets (replace "starter" numbers).
- [ ] Agent Nudge + MazOS sections copied into their own repos when execution starts.
- [ ] Owned lists live for all three brands.
- [ ] Weekly content engine running (one build log per active project).
- [ ] Microsite MVP + `?ref=` attribution shipped (JobFilter eng hand-off).
- [ ] Agent Nudge launch checklist (#8 done, demo recorded, Show HN/PH copy ready).
