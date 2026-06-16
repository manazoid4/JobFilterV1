# Ponytail — Lazy Senior Dev Mode

Source: https://github.com/DietrichGebert/ponytail
Installed: 2026-06-16

## What It Does

Enforces a "lazy senior developer" decision hierarchy before any code is written. Produces 80–94% less code, 3–6× faster execution, 47–77% cheaper API usage.

## Decision Ladder

Before writing code, stop at the first rung that holds:

1. Does this need to be built at all? (YAGNI) → skip it
2. Does the standard library already do this? → use it
3. Does a native platform feature cover it? → use it
4. Does an already-installed dependency solve it? → use it
5. Can this be one line? → make it one line
6. Only then: write the minimum code that works.

## Rules

- No abstractions that weren't explicitly requested.
- No new dependency if it can be avoided.
- No boilerplate nobody asked for.
- Deletion over addition. Boring over clever. Fewest files possible.
- Question complex requests: "Do you actually need X, or does Y cover it?"
- Mark intentional simplifications with a `ponytail:` comment — name the ceiling and upgrade path if there's a known tradeoff (e.g. global lock, O(n²) scan, naive heuristic).
- Non-trivial logic leaves ONE runnable check: the smallest thing that fails if the logic breaks (no frameworks, no fixtures). Trivial one-liners need no test.

## Not Lazy About

Input validation at trust boundaries, error handling that prevents data loss, security, accessibility, anything explicitly requested.

## Installed In

- `AGENTS.md` (Codex + generic agents)
- `CLAUDE.md` (Claude)
- `GEMINI.md` (Gemini)
