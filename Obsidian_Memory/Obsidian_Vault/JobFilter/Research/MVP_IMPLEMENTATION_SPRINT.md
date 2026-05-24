# MVP Implementation Sprint

## Sprint Goal
Deploy a trust-first, conversion-optimised JobFilter in 7 days.

---

## Day 1: Critical UI Fixes

### Tasks
1. **FreeToolsPage.tsx**
   - [x] Remove `isPaywalled` from ToolCard
   - [x] Remove scan recording from `handleToolUse`
   - [x] Verify tools render at full opacity

2. **WaitlistForm.tsx**
   - [x] Change "CLAIM PATCHLOCK" → "EARLY ACCESS"
   - [x] Change "Get leads plus letters" → "Lock in founder pricing"
   - [x] Change "CLAIM MY PATCH" → "GET EARLY ACCESS"

3. **TopNav.tsx**
   - [x] Change "PatchLock" → "Territories"

4. **TerritoriesPage.tsx**
   - [x] Replace all "PatchLock" strings
   - [x] Simplify claim copy

5. **HomePage.tsx**
   - [x] Add 15 cities to coverage strip
   - [ ] Tighten "TRY IT RISK-FREE" copy
   - [ ] Fix any mobile hidden sections

### Deliverables
- All PatchLock references removed or changed.
- Free tools fully interactive.
- Build passes.

---

## Day 2: Content Security + Signals

### Tasks
1. **BlueprintPage.tsx**
   - [x] Remove specific API names from pipeline steps
   - [x] Keep pipeline story, remove technical detail

2. **SignalsPage.tsx**
   - [x] Remove all `setupNote` fields
   - [x] Delete setupNote rendering JSX
   - [x] Change status strip text

3. **DevPortalPage.tsx**
   - [ ] Fix or remove broken links
   - [ ] Simplify to pure testing surface

4. **PricingPage.tsx**
   - [ ] Replace "PatchLock" with "Territory"
   - [ ] Update feature lists

### Deliverables
- No exposed data sources.
- No setup notes on signals.
- Clean, non-technical copy.

---

## Day 3: New Pages

### Tasks
1. **TradieZonePage.tsx** (NEW)
   - Member welcome header
   - Quick action grid
   - Weekly signals preview
   - Member tools grid
   - Territory status card

2. **TrustCenterPage.tsx** (NEW)
   - Our Promise
   - How Scoring Works
   - Data Sources (category only)
   - Anti-Ghost Philosophy
   - Privacy / GDPR
   - Fair Use & Refunds
   - Contact

3. **App.tsx**
   - Add `/tradie-zone` route
   - Add `/trust-center` route

4. **TopNav.tsx**
   - Add "Tradie Zone" link
   - Add "Trust" link

### Deliverables
- Tradie Zone accessible.
- Trust Center live.
- New routes working.

---

## Day 4: Trust Badges + Scoring UI

### Tasks
1. **ScoreBadge.tsx** (enhance)
   - Add new badge types
   - Colour coding
   - Tooltips

2. **GhostRiskBadge.tsx** (NEW)
   - Three-state badge
   - Simple logic

3. **SeriousBuyerScore.tsx** (NEW)
   - 0-100 display
   - Visual bar

4. **LeadCard.tsx** (update)
   - Integrate badges
   - Show on lead cards

### Deliverables
- Badges visible on lead cards.
- Ghost Risk shown.
- Score displayed prominently.

---

## Day 5: Content + Copy

### Tasks
1. **SampleLeadCard.tsx** (NEW)
   - Static component for homepage
   - Realistic data
   - Desktop + mobile layouts

2. **HomePage.tsx**
   - Add sample lead card above fold
   - Tighten all copy by 30%

3. **Field Notes** (3 articles)
   - "The Real Cost Of Ghost Quotes"
   - "Why Shared Leads Destroy Margins"
   - "Birmingham Extension Activity Is Quietly Exploding"

4. **Comparison Pages**
   - Tighten Checkatrade comparison
   - Add Bark comparison

### Deliverables
- Sample lead on homepage.
- 3 field notes published.
- Comparison pages updated.

---

## Day 6: Polish + QA

### Tasks
1. **Methodology Page**
   - How signals are detected (high level)
   - How scoring works (simplified)
   - Data sources (category list)
   - No API details

2. **Mobile QA**
   - Test every page on 375px width
   - Fix any hidden sections
   - Ensure all CTAs are tappable
   - Check text readability

3. **Copy Pass**
   - No startup jargon
   - No "AI-powered"
   - Tradesman language throughout
   - One idea per sentence

4. **Build Verification**
   - `npm run build` — zero errors
   - `npm run lint` — zero warnings
   - TypeScript check — zero errors

### Deliverables
- Methodology page live.
- Mobile experience smooth.
- Build clean.

---

## Day 7: Deploy

### Tasks
1. **Git**
   - Stage all changes
   - Commit: "Trust-first MVP: UI fixes, new pages, content"
   - Push to `main`

2. **Deploy**
   - Verify build on production
   - Smoke test all routes
   - Check mobile rendering
   - Test free tools
   - Test sample lead card

3. **Post-Deploy**
   - Verify WhatsApp integration still works
   - Check Stripe checkout
   - Confirm Firebase functions
   - Monitor for 24 hours

### Deliverables
- Live site updated.
- All routes working.
- Zero critical bugs.

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Build fails | Low | High | Run build after every file change. |
| Mobile layout breaks | Medium | High | Test on 375px width. |
| Stripe checkout breaks | Low | Very High | Test in Stripe test mode. |
| Firebase auth issues | Low | High | Verify auth rules. |
| Copy not tight enough | Medium | Medium | Copy review checklist. |
| Missing PatchLock references | Medium | Low | Global search before commit. |

---

## Definition of Done

- [ ] All PatchLock references removed
- [ ] Free tools fully interactive
- [ ] No exposed API details
- [ ] No setup notes on signals
- [ ] Mobile renders all sections
- [ ] Build passes with zero errors
- [ ] Tradie Zone live
- [ ] Trust Center live
- [ ] Sample lead card on homepage
- [ ] 3 field notes published
- [ ] Comparison pages updated
- [ ] Methodology page live
- [ ] Git commit clean
- [ ] Deploy successful
- [ ] Smoke test passed

---

## Success Metrics (Post-Launch)

| Metric | Baseline | Target | Measurement |
|--------|----------|--------|-------------|
| Homepage bounce rate | — | <50% | Analytics |
| Free tool usage | — | 100+/week | Internal tracking |
| Sign-up rate | — | 5%+ | Conversion tracking |
| Mobile traffic | — | 60%+ | Analytics |
| Support tickets | — | <5/week | Ticket system |
| Build errors | — | 0 | CI/CD |

---

## Key Insight

> An MVP is not a half-finished product.
> It is a **complete product** with the minimum features needed to prove value.
> 
> This sprint delivers a trust-first JobFilter that:
> - Feels serious and premium
> - Protects tradesmen from waste
> - Demonstrates value before payment
> - Builds authority through intelligence
> 
> Everything else is an enhancement.
