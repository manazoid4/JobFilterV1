# Mobile Audit — 8th May 2026

## OVERVIEW

JobFilter uses a brutalist yellow design with thick borders, hard shadows, and condensed headlines. The design is inherently mobile-friendly (boxy, high-contrast, no delicate hover states). However, several pages have responsiveness issues that hurt conversion on mobile — where 60%+ of tradesmen will access the site.

---

## CRITICAL FIXES (Ship This Week)

### 1. TopNav Mobile Menu — Missing Hamburger Button
**File**: `src/components/TopNav.tsx:15`
**Issue**: `menuOpen` state exists but there's NO hamburger button to toggle it on mobile. The desktop nav hides at `lg:` breakpoint but no mobile toggle appears.
**Impact**: Mobile users see NO navigation links. They can't access Find Jobs, Pricing, Signals, EPC, etc.
**Fix**: Add a hamburger button visible below `lg:` breakpoint that toggles `menuOpen`.
```tsx
// Add after line 27 (after the SCAN FREE button):
<button
  className="lg:hidden jf-button bg-[var(--yellow)] p-2"
  onClick={() => setMenuOpen(!menuOpen)}
  aria-label="Toggle menu"
>
  {menuOpen ? '✕' : '☰'}
</button>
```

### 2. HomePage Hero — Headline Overflows on Small Screens
**File**: `src/pages/HomePage.tsx:32`
**Issue**: `text-[clamp(4.5rem,12vw,12rem)]` is massive. On a 320px iPhone SE, 12vw = 38.4px which is fine, but on 360-375px screens, "CONTROL THE JOBS." wraps awkwardly with the tight line-height of 0.85.
**Impact**: Headline looks broken, not bold.
**Fix**: Add `text-5xl` as floor: `text-[clamp(3rem,12vw,12rem)]` or add `break-words` class.

### 3. FindJobsPage Form — Stacked Inputs Too Tall
**File**: `src/pages/FindJobsPage.tsx:116`
**Issue**: Form uses `lg:grid-cols-[1fr_1fr_1fr_auto]` but on mobile all 4 inputs stack vertically. Each input is 52px min-height + label = ~80px. Four inputs = 320px of form before the button.
**Impact**: User scrolls past the fold before seeing the scan button.
**Fix**: Use 2x2 grid on mobile: `grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]`. Reduce mobile input height to 44px.

### 4. PricingPage — Feature Table Overflows Horizontally
**File**: `src/pages/PricingPage.tsx:86-99`
**Issue**: 4-column grid (`grid-cols-4`) with feature names like "Official source link + buyer" overflows on screens < 480px. No `overflow-x-auto` wrapper.
**Impact**: Table cuts off, user can't see all plan details.
**Fix**: Wrap in `<div className="overflow-x-auto">` or switch to stacked cards on mobile.

### 5. PricingPage — Plan Cards Stack Without Visual Hierarchy
**File**: `src/pages/PricingPage.tsx:52`
**Issue**: `lg:grid-cols-3` stacks to single column on mobile. All three plans look equal — no visual emphasis on Founding 30 (the conversion target).
**Impact**: Users scroll past without understanding which plan to pick.
**Fix**: Add `order-first` to Founding 30 card on mobile, add a "MOST POPULAR" badge that's visible on mobile.

---

## HIGH PRIORITY FIXES (Ship This Sprint)

### 6. SignalsPage — Hero Headline Too Large for Mobile
**File**: `src/pages/SignalsPage.tsx:72`
**Issue**: `text-[clamp(3rem,8vw,7rem)]` with `leading-[0.88]` creates tight, hard-to-read text on 360px screens.
**Fix**: Floor at `text-4xl`: `text-[clamp(2.25rem,8vw,7rem)]`.

### 7. LeadCard — Status Pills Wrap Poorly
**File**: `src/components/LeadCard.tsx:66`
**Issue**: `flex flex-wrap gap-2` with 5 status pills creates awkward wrapping on narrow screens.
**Fix**: Use `flex-wrap` with `gap-1` on mobile, or horizontal scroll container.

### 8. LaunchWaitlistModal — Modal Too Wide on Small Screens
**File**: `src/components/LaunchWaitlistModal.tsx:30`
**Issue**: `max-w-lg` (32rem = 512px) is wider than many mobile screens. Combined with `px-4` padding, content gets cramped.
**Fix**: Change to `max-w-sm` on mobile, `max-w-lg` on larger screens: `w-full max-w-sm md:max-w-lg`.

### 9. EpcPage — 5-Column Grid Breaks on Mobile
**File**: `src/pages/EpcPage.tsx:43`
**Issue**: `md:grid-cols-5` for trade cards stacks to single column on mobile. Five cards in a vertical stack is a lot of scrolling.
**Fix**: Use `grid-cols-2 md:grid-cols-5` for a 2-column layout on mobile.

### 10. Footer — Link Wrap Creates Tall Footer on Mobile
**File**: `src/components/Footer.tsx:12`
**Issue**: `flex flex-wrap gap-4` with 11 links creates 3-4 rows on mobile, making the footer taller than some page sections.
**Fix**: Reduce to `gap-2` on mobile, or use a collapsible footer with "More links" toggle.

---

## MEDIUM PRIORITY FIXES

### 11. TradieStackPage — Comparison Table Not Scrollable
**File**: `src/pages/TradieStackPage.tsx:73`
**Issue**: Table has `overflow-x-auto` wrapper (good) but column content with long descriptions like "✓ 4 templates, 5-min" still wraps badly on mobile.
**Fix**: Add `whitespace-nowrap` to table cells or use abbreviated text on mobile.

### 12. IntakePage — Choice Buttons Too Large for Mobile
**File**: `src/pages/IntakePage.tsx:62`
**Issue**: `.choice-button` has `min-height: 64px` and `font-size: 1.25rem`. On a 360px screen, 4 buttons = 256px minimum. With headline and spacing, this pushes content below the fold.
**Fix**: Reduce to `min-height: 52px` and `text-sm` on mobile via responsive class.

### 13. WaitlistForm — Emoji in Scarcity Text
**File**: `src/components/WaitlistForm.tsx:63`
**Issue**: 🔒 emoji may not render consistently on all Android devices.
**Fix**: Replace with a CSS lock icon or remove emoji entirely.

### 14. HomePage — WhatsApp Preview `<pre>` Tag Overflows
**File**: `src/pages/HomePage.tsx:305`
**Issue**: `<pre>` with `whitespace-pre-wrap` can still overflow on very narrow screens if lines are long.
**Fix**: Add `text-xs` on mobile, `text-sm` on larger screens.

### 15. FindJobsPage — LeadResultCard 3-Column Layout Breaks
**File**: `src/pages/FindJobsPage.tsx:212`
**Issue**: `md:grid-cols-[auto_1fr_260px]` — the 260px right column (action buttons) is too wide on 375px screens when combined with score badge + content.
**Fix**: Stack to single column on mobile: `grid-cols-1 md:grid-cols-[auto_1fr_260px]`. Make buttons full-width on mobile.

---

## LOW PRIORITY FIXES

### 16. Missing Viewport Meta Tag
**Check**: `public/index.html` or `index.html`
**Issue**: Ensure `<meta name="viewport" content="width=device-width, initial-scale=1">` exists. Vite should handle this but verify.

### 17. Touch Target Sizes
**Issue**: Some nav-link padding (`0.65rem 0.85rem`) creates touch targets slightly below the recommended 44x44px minimum.
**Fix**: Ensure all interactive elements have `min-height: 44px` and `min-width: 44px`.

### 18. Font Loading Flash
**Issue**: Archivo Black and Barlow Condensed are loaded from Google Fonts. On slow mobile connections, users see FOUT (flash of unstyled text).
**Fix**: Add `font-display: swap` to Google Fonts URL (already present in import) and consider preloading critical fonts.

### 19. Scroll Performance
**Issue**: `mobile-nav` uses `-webkit-overflow-scrolling: touch` (good) but the horizontal scroll nav may conflict with page scroll on some Android browsers.
**Fix**: Test on Android Chrome. If issues, add `overscroll-behavior-x: contain`.

### 20. Image Optimization
**Issue**: `/union-flag.svg` in TopNav is small but verify all images are optimized for mobile bandwidth.
**Fix**: Run through SVG optimizer, ensure no raster images are unoptimized.

---

## MOBILE CONVERSION PRIORITIES

The three changes that will move the needle most:

1. **Fix the missing hamburger menu** (#1) — currently mobile users are blind to navigation
2. **Optimize the Find Jobs form for mobile** (#3) — this is the primary conversion action
3. **Make the Founding 30 plan visually dominant on mobile** (#5) — this is the pricing target

---

## TESTING CHECKLIST

- [ ] iPhone SE (375x667)
- [ ] iPhone 14 (390x844)
- [ ] Samsung Galaxy S21 (360x800)
- [ ] iPad Mini (768x1024)
- [ ] Chrome DevTools responsive mode (320px - 1440px)
- [ ] Real device test on Android (Chrome)
- [ ] Real device test on iOS (Safari)

---

*Audited: 8th May 2026*
*Next audit: After critical fixes are shipped*
