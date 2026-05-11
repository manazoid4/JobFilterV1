---
tags: [forgeos, design, ui, system]
created: 2026-05-11
project: ForgeOS
---

# ForgeOS — Design System

← [[ForgeOS Map]] | Related: [[Product Overview]] · [[MVP Scope]]

## Philosophy

Industrial · Brutalist · Dark · AI-native · Tactical

> Every pixel earns its place. No gradients. No corporate softness.

Inspired by: Linear · Warp · Raycast · Discord · Jarvis interfaces

## Color Palette

```
Background:   #0a0a0a
Surface:      #111111
Elevated:     #1a1a1a
Text:         #f0f0f0
Muted:        #888888

ACTIVE:       #00ff88
WAITING:      #ffaa00
FAILED:       #ff3333

Claude:       #8833ff
Codex:        #00ddff
Gemini:       #4488ff
Ollama:       #00aa55
```

## Typography

- Headers: Barlow Condensed / Archivo Black — uppercase, condensed
- Body: Inter / IBM Plex Sans
- Terminal: JetBrains Mono — 13px mobile, 14px desktop

## Mobile Rules

- Touch targets ≥ 44×44px
- Primary actions ≥ 52px height
- Terminal font ≥ 13px
- Bottom tabs on mobile (not sidebar)
- No horizontal scroll

## Workspace Card Pattern

```
┌─────────────────────────────────────┐
│  ● ACTIVE              ◆ Claude     │  ← left border = status color
│  JOBFILTER BUILD                    │
│  Node: Home Server                  │
│  Current: Fixing auth               │
│  [    RESUME    ]   [  VIEW  ]      │
└─────────────────────────────────────┘
```

## Anti-Patterns

No gradients · no border-radius > 4px · no white backgrounds · no animations > 300ms

## Connected Notes

[[ForgeOS Map]] · [[Product Overview]] · [[Agent Index]]
