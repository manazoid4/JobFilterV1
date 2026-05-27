---
type: changelog
date: 2026-05-26
run: 6
repo: JobFilterV1
branch: main (merged from claude/audit-agent-comprehensive-BksfQ)
source: AuditAgent
---

# JobFilter Changelog — 2026-05-26 Run 6

## Summary
CRITICAL production fix: site was 100% unstyled on jobfilter.uk. Root cause: wrong Tailwind v4 integration package for Next.js. Fixed by installing @tailwindcss/postcss and creating postcss.config.mjs. Merged to main → Vercel rebuild triggered.

---

## THE BUG

### Why jobfilter.uk was completely broken

Tailwind v4 uses a CSS-first approach: `@import "tailwindcss"` in `src/index.css`. This directive requires a PostCSS plugin to resolve it into actual CSS utilities.

The project had:
- `@tailwindcss/vite` — correct only for Vite projects (not Next.js)
- No `postcss.config.*` file anywhere
- No `@tailwindcss/postcss` package

Without PostCSS processing, Next.js passed `@import "tailwindcss"` straight through unresolved → the browser received `@import "tailwindcss"` as a literal CSS import, which resolves to nothing → zero utility classes in production bundle.

**Visible symptoms:**
- Union Jack logo: `h-8 w-8` class = no-op → SVG renders at full natural size (massive flag)
- `xl:hidden` / `hidden xl:flex` = no-op → all navigation items visible simultaneously on mobile
- Every colour, spacing, typography, border, layout class = no-op → blank/raw HTML

### Fix

```bash
npm install --save-dev @tailwindcss/postcss
```

```js
// postcss.config.mjs (new file)
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

Build: GREEN. Vercel now processes `@import "tailwindcss"` correctly via PostCSS → full CSS bundle generated.

---

## Build Status
- `npm run build`: GREEN (all routes)
- `npx tsc --noEmit`: CLEAN (0 errors)
- Merged to main: YES
- Vercel deploy: triggered

---

## Related
- [[Changelog 2026-05-26 Run 4]]
- [[RALPH_PLAN]]
