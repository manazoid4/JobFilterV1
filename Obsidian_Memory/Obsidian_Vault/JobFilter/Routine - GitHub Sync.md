---
type: routine
title: "GitHub Sync — JobFilter"
updated: 2026-05-12
---

# Routine: GitHub Sync

## Purpose
Track every commit, PR, and code change across the JobFilter repo. GitHub (local git) is the **source of truth**. This vault reflects reality — never the other way around.

## How to Run

```powershell
cd "$env:USERPROFILE\Desktop\JobFilter\JobFilterV1"
git pull
git log --all --since="24 hours ago" --pretty=format:"%H|%ci|%s|%an"
```

## What to Capture

1. **Commits** — hash, time, message, author
2. **File changes** — new components, modified pages, deleted routes
3. **Themes** — trust, pricing, nav, content, API
4. **Risk flags** — removed routes, tier changes, domain switches
5. **Next actions** — verify, test, check backlinks

## Where to Write

| Data | Target |
|------|--------|
| Daily commit log | `JobFilter/Changelog YYYY-MM-DD.md` |
| Current state | `JobFilter/Progress.md` |
| Quick highlights | `Recent.md` |
| Entity details | `JobFilter/System/*` |

## Remember
- Update `Progress.md` date header on every sync
- Append to `Recent.md`, never overwrite
- Cross-link new changelog from `Recent.md`
- Flag risks immediately — do not bury them
