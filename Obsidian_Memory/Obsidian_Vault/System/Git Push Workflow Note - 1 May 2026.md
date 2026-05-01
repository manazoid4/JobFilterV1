# Git Push Workflow Note - 1 May 2026

## Remember

- Current JobFilter work branch: `codex/decision-engine-flow`.
- GitHub default branch is `main`, so new Codex commits may not appear unless viewing `codex/decision-engine-flow`.
- Verify remote branch with:
  - `git ls-remote origin refs/heads/codex/decision-engine-flow`
  - `git log --oneline --decorate -5`
- If push auth fails, run:
  - `gh auth login -h github.com`
  - choose HTTPS and authenticate Git with GitHub credentials.

## Latest Confirmed Push

- Branch: `codex/decision-engine-flow`
- Commit visible on remote: `1c0a998 Harden lead engine repeated scans`
