---
tags: [forgeos, mvp, scope, phase1]
created: 2026-05-11
project: ForgeOS
---

# ForgeOS — MVP Scope

← [[ForgeOS Map]] · [[Product Overview]] | Next: [[Session Architecture]]

## Success Condition

A user can:
1. Start an AI coding session on PC
2. Leave the desk
3. Open phone
4. Instantly continue supervising
5. Return to desktop, resume seamlessly

WITHOUT: manual SSH · tmux confusion · workflow interruption

## 8 Phase 1 Features

### 1. Session Dashboard
Visual workspace cards: name · node · AI provider · current task · status · last active · actions

### 2. Persistent Sessions
tmux under the hood — user sees "Resume" not `tmux attach-session`

### 3. Mobile-First UI
Touch targets ≥ 44px · bottom nav · no pinch-zoom · terminal readable at thumb distance

### 4. Live Terminal Streaming
WebSocket + xterm.js · < 100ms latency · 2000-line scrollback · reconnect replay

### 5. Session Metadata
`id · name · nodeId · aiProvider · currentTask · status · tags · createdAt · lastActiveAt`

### 6. AI Activity Feed
```
11:02  Claude     Modified src/pages/Pricing.tsx
11:05  System     Build PASSED (14.2s)
11:11  Claude     WAITING — needs input
```

### 7. Notifications
In-app + browser push: build.failed · task.complete · agent.waiting · deploy.success

### 8. Resume Anywhere
Tap RESUME → connected in < 2s → scrollback replay → live feed continues

## Out of Phase 1

Auth · multi-user · Supabase · Tailscale · voice control · native app

## Definition of Done

- [ ] Dashboard on desktop + mobile
- [ ] tmux session persists after disconnect
- [ ] Resume reconnects < 2s
- [ ] Mobile layout passes 375px test
- [ ] Notifications fire for build.failed

## Connected Notes

[[Session Architecture]] · [[Design System]] · [[Build Log - 11 May 2026]]
