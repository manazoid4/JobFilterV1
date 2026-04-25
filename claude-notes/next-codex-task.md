# Next Codex Task — 2026-04-25

## PRIORITY: CRITICAL — App does not compile

### Task: Fix App.tsx merge conflicts and duplicate declarations

**File:** `src/App.tsx`

**Problems to fix (in order):**

1. **Resolve all git merge conflict markers**
   - Search for `<<<<<<< ours`, `=======`, `>>>>>>> theirs`
   - For each conflict block: keep the "ours" version (the more complete/recent one)
   - Delete all conflict markers

2. **Remove duplicate function declarations**
   - `resolveRegionFromPostcode` is declared 8+ times — keep ONE copy (lines ~250–255 region)
   - `toDisplayUrgency` is declared 8+ times — keep ONE copy
   - Both belong inside the App component, after state declarations, before `trackEvent`

3. **Verify after fix:**
   - No `const` redeclarations in same scope
   - No conflict markers remain
   - JSX is valid (no unclosed tags from conflict removal)

**Do NOT:**
- Change any logic or UI
- Rename any variables
- Restructure the component

**Output:** Confirm the file compiles clean. List what was removed.
