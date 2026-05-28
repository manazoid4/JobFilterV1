---
type: reference
tags: [skills, claude-code, meta-skill, installed]
date: 2026-05-28
source: https://github.com/rebelytics/one-skill-to-rule-them-all
author: Eoghan Henn / rebelytics.com
---

# Meta-Skill - Task Observer (One Skill to Rule Them All)

## What It Is

A meta-skill that monitors task execution and automatically identifies skill improvement opportunities. Observes work sessions, captures user corrections, and feeds the skill-creator to improve your skill library over time.

**Status: INSTALLED**

- Skill file: C:\Users\manaz\.claude\skills\task-observer\SKILL.md
- Activation added to: JobFilterV1-main-direct/CLAUDE.md
- Invoke with: /task-observer

## How It Works

1. Invoke at start of every task session
2. Monitors tool use, patterns, corrections throughout session
3. Identifies skill improvement opportunities in real-time
4. Feeds skill-creator with observations for new/improved skills
5. Closes the feedback loop on skill quality automatically

## Activation (CLAUDE.md)

Added to CLAUDE.md: "At the start of every task-oriented session, invoke the task-observer skill."

## Integration with Ultrawork

task-observer is implicitly part of every /ultrawork session. It runs as the background observational layer that catches patterns across all activated skills.

## Related

- [[Session-2026-05-28-Skills-Install]] - session where this was found and installed
- /ultrawork - the skill chain this observes
- GitHub: https://github.com/rebelytics/one-skill-to-rule-them-all
