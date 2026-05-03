# Database Rollback - 2 May 2026

## Decision
- Removed the external database migration from JobFilter.
- Removed related migration files, docs, env examples, package dependency, and regression check.
- Waitlist writes now use local JSONL storage only.

## Reason
- User requested rollback before continuing from phone over SSH.
- Keep the app simple until the backend direction is settled.

## Verification
- Remote `waitlist` and `leads` tables dropped.
- Remote migration `20260502013730` marked reverted.
- `npm run lint` passed.
- `npm run build` passed.
- Active code/docs grep found no removed database provider mentions.
