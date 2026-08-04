---
name: feature-launch
description: >
  Use whenever a user-facing feature ships or is about to ship (a new page, tool,
  route, or capability) — to guarantee the feature is actually SURFACED and
  LAUNCHED, not just merged. Ensures every shipped feature gets a changelog entry,
  is featured across the whole site (nav + footer + a home/relevant promo), has
  discovery links, and has launch assets drafted. Triggers on "ship", "launch",
  "feature it", "put it live", "make sure people can find it", "announce", or after
  merging a feature PR. Portable across JobFilter, Agent Nudge and MazOS.
---

# Feature Launch Assurance

A merged feature that nobody can find is a wasted build. This skill makes "shipped"
mean "discoverable + announced", not just "in the codebase". Run it every time a
user-facing feature lands.

## The rule
**No feature is done until it is (1) in the changelog, (2) featured across the site,
and (3) has launch assets drafted.** Treat these as a gate, like tests.

## Checklist (work top to bottom; don't skip)

### 1. Changelog / What's New — always
- JobFilter: add an entry to `src/data/releases.json` (validated by
  `scripts/validate-releases.mjs`; newest-first; needs id, ISO date ≤ today,
  `status:"live"`, NEW/BETTER/FIXED sections, and real `evidence.commits` +
  `pullRequests`). Surfaces at `/whats-new`.
- Agent Nudge / MazOS: append to that repo's changelog page. If the repo has **no**
  changelog, ADD a lightweight "What's New" page on its live site — same spirit as
  JobFilter's, but a distinct layout/name so the sites aren't confusingly identical.

### 2. Feature it across the WHOLE site — not one hidden page
- **Nav** (appears on every page): add a link in the primary nav arrays
  (JobFilter: `src/components/TopNav.tsx` `publicLinks` + `memberLinks` — this also
  covers the mobile menu, which iterates the same arrays).
- **Footer** (every page): add a link in the relevant footer column
  (JobFilter: `src/components/Footer.tsx`).
- **A prominent promo**: a home-page (or most-relevant page) section with a NEW
  badge, one-line value prop, and a single CTA to the feature.
- **Cross-link** from adjacent features (e.g. related tools/pages) where natural.
- Keep brand voice and tokens (JobFilter = DeWalt: `--yellow/--navy/--ink/--line`,
  `jf-button`, `headline`, `micro-label`; blunt, no AI buzzwords).

### 3. Draft launch assets (so distribution actually happens)
- One build-in-public post for the personal-brand hub (MazOS): what shipped + why.
- Channel-specific blurbs per the growth plan (`docs/growth/`): JobFilter →
  Facebook/Reels/Weekly-Notice; Agent Nudge → X/Show HN/dev.to; MazOS → LinkedIn/X.
- A one-line announcement-bar / email mention where the site supports it.

### 4. Verify before calling it done
- Run the repo's gates: JobFilter `npx tsc --noEmit`, `npm run build`
  (runs `releases:check` + `next build`), `npm run test:fts`.
- Confirm the new links resolve and the promo renders on desktop + mobile.
- Confirm the changelog validates and shows the entry.
- Open a PR mirroring `.github/PULL_REQUEST_TEMPLATE.md`; drive CI green.

## Definition of done
- [ ] Changelog entry live
- [ ] Nav + footer link present (every page)
- [ ] A prominent promo section with a single CTA
- [ ] Launch-asset drafts handed to the content session
- [ ] Gates green, PR opened

## Notes
- This skill pairs with Agent Nudge's assurance/receipts philosophy: it is a
  *launch receipt* for a feature. If you build a "did this feature get surfaced?"
  check into Agent Nudge, this checklist is the spec.
- Full channel strategy and voice per brand live in `docs/growth/`.
