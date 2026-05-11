# Build Agent Action Plan

## Objective
Implement trust-first changes across JobFilter codebase and deploy to production.

---

## Sprint Breakdown

### Sprint 1: Critical UI Fixes (Days 1-2)

**Components:**
1. **FreeToolsPage.tsx**
   - Remove `isPaywalled` from ToolCard (line 354)
   - Remove scan recording from `handleToolUse`
   - Delete paywall banner section
   - Verify all tools render at full opacity

2. **HomePage.tsx**
   - Add 10+ cities to `trustedCities` array
   - Tighten "TRY IT RISK-FREE" copy (reduce by 30%)
   - Add sample lead card component above fold
   - Fix any `hidden` classes that hide content on mobile

3. **WaitlistForm.tsx**
   - Change "CLAIM PATCHLOCK" → "EARLY ACCESS"
   - Change "Get leads plus letters" → "Lock in founder pricing"
   - Change "CLAIM MY PATCH" → "GET EARLY ACCESS"
   - Update form copy to remove PatchLock references

4. **TopNav.tsx**
   - Change "PatchLock" → "Territories"
   - Ensure mobile menu reflects changes

5. **TerritoriesPage.tsx**
   - Replace all "PatchLock" strings
   - Simplify table layout
   - Add visual territory map placeholder

**Testing:**
- Run `npm run build`
- Verify no TypeScript errors
- Test mobile responsiveness
- Verify tools are clickable and interactive

---

### Sprint 2: Content Security + Signals (Days 2-3)

**Components:**
1. **BlueprintPage.tsx**
   - Remove specific API names from pipeline steps
   - Keep pipeline story, remove technical detail
   - Replace "PatchLock" with "territory lock"

2. **SignalsPage.tsx**
   - Remove all `setupNote` fields from signal objects
   - Delete setupNote rendering JSX
   - Change status strip: remove "NEED API/MANUAL SETUP"
   - Simplify descriptions where overly technical

3. **DevPortalPage.tsx**
   - Fix or remove broken links
   - Add Tradie Zone link
   - Simplify to pure testing surface

**Testing:**
- Verify no exposed data sources
- Check signals render without setup notes
- Build passes

---

### Sprint 3: New Pages (Days 3-5)

**New Files:**
1. **TradieZonePage.tsx**
   - Member welcome header with stats
   - Quick action grid (Scan, Tools, Pipeline, Territory)
   - Weekly signals preview
   - Member tools grid (Codex, Vantage, Vicinity)
   - Recent leads table
   - Territory status card

2. **TrustCenterPage.tsx**
   - Our Promise section
   - How Scoring Works (simplified)
   - Data Sources (category only)
   - Anti-Ghost Philosophy
   - Privacy / GDPR
   - Fair Use & Refunds
   - Changelog placeholder
   - Contact

3. **SampleLeadCard.tsx** (component)
   - Reusable lead card for homepage
   - Shows: project, badges, score, ghost risk, timing, value
   - Static data with realistic example

**Routing:**
- Add `/tradie-zone` to App.tsx
- Add `/trust-center` to App.tsx
- Add links to TopNav

---

### Sprint 4: Trust Badges + Scoring (Days 5-6)

**Components:**
1. **ScoreBadge.tsx** (enhance existing)
   - Add new badge types: Planning Verified, Fresh Purchase, Retrofit Trigger, Tender Verified
   - Color coding per badge type
   - Tooltip on hover explaining meaning

2. **GhostRiskBadge.tsx** (new component)
   - Three states: READY (green), MAYBE (yellow), WASTE (red)
   - Simple logic based on available data signals
   - Show on lead cards and detail pages

3. **SeriousBuyerScore.tsx** (new component)
   - 0-100 score display
   - Visual bar or dial
   - Show on lead cards

**Integration:**
- Add badges to LeadCard component
- Add badges to LeadDetailPage
- Update FindJobsPage to show badges in results

---

### Sprint 5: Content + Copy (Days 6-7)

**Pages:**
1. **Field Notes section** (new page or blog-like)
   - "The Real Cost Of Ghost Quotes"
   - "Why Shared Leads Destroy Margins"
   - "Birmingham Extension Activity Is Quietly Exploding"
   - Writing style: foreman/analyst tone

2. **Comparison Pages** (enhance existing)
   - Tighten Checkatrade comparison
   - Add Bark comparison
   - Add Rated People comparison
   - Focus on "what they do vs what we do"

3. **Methodology Page**
   - How signals are detected
   - How scoring works (high level)
   - Data sources (category list)
   - No API details

**Copy Guidelines:**
- No startup jargon.
- No "AI-powered" or "machine learning" unless necessary.
- Use tradesman language: "job", "quote", "site", "waste".
- Every sentence must answer: "So what? How does this save me time?"

---

## Build Order

```
Day 1:
  1. Fix FreeToolsPage (remove paywall)
  2. Fix WaitlistForm (PatchLock → Early Access)
  3. Fix TopNav (PatchLock → Territories)
  4. Fix TerritoriesPage (PatchLock → Territories)
  
Day 2:
  5. Fix HomePage (cities, copy, mobile)
  6. Fix BlueprintPage (remove data sources)
  7. Fix SignalsPage (remove setup notes)
  8. Fix DevPortal (broken links)

Day 3:
  9. Create TradieZonePage
  10. Create TrustCenterPage
  11. Update App.tsx routing
  12. Update TopNav links

Day 4:
  13. Enhance ScoreBadge
  14. Create GhostRiskBadge
  15. Create SeriousBuyerScore
  16. Integrate into LeadCard

Day 5:
  17. Create SampleLeadCard component
  18. Add to HomePage
  19. Write Field Notes (3 articles)
  20. Tighten comparison pages

Day 6:
  21. Methodology page
  22. Final copy pass across all pages
  23. Mobile QA
  24. Build verification

Day 7:
  25. Git commit
  26. Git push
  27. Deploy verification
  28. Post-deploy smoke test
```

---

## Verification Checklist

- [ ] All PatchLock references removed or changed
- [ ] Free tools fully interactive
- [ ] No exposed API details
- [ ] No setup notes on signals
- [ ] Mobile renders all sections
- [ ] Build passes with zero errors
- [ ] All new routes work
- [ ] Nav links correct
- [ ] Git commit clean
- [ ] Deploy successful

---

## Files Modified / Created

### Modified
- `src/pages/FreeToolsPage.tsx`
- `src/pages/HomePage.tsx`
- `src/components/WaitlistForm.tsx`
- `src/components/TopNav.tsx`
- `src/pages/TerritoriesPage.tsx`
- `src/pages/BlueprintPage.tsx`
- `src/pages/SignalsPage.tsx`
- `src/pages/DevPortalPage.tsx`
- `src/App.tsx`

### Created
- `src/pages/TradieZonePage.tsx`
- `src/pages/TrustCenterPage.tsx`
- `src/components/SampleLeadCard.tsx`
- `src/components/GhostRiskBadge.tsx`
- `src/components/SeriousBuyerScore.tsx`
- `src/pages/FieldNotesPage.tsx` (or section)
- `src/pages/MethodologyPage.tsx`

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Breaking existing routes | Add routes, don't remove. Lazy load new pages. |
| Mobile layout issues | Test every change on 375px width. |
| TypeScript errors | Run `tsc --noEmit` after every file change. |
| Git conflicts | Commit frequently. Small atomic commits. |
| Deploy failure | Keep `fix/main-build` branch as fallback. |
