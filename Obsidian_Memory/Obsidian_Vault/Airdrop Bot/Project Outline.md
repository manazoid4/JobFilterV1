# Project Outline

## Headline
Discord airdrop source in. Clean alert out.

## What It Does
Reads airdrop posts from a private Discord inbox, cleans them up, scores basic risk, and prepares a short alert for Twitter/X or Discord.

## Simple Flow
1. Forward useful airdrop posts into `#airdrop-inbox`.
2. Bot reads the message and extracts the key details.
3. Bot posts a clean draft into `#airdrop-review`.
4. You approve it.
5. Bot sends it to Twitter/X or your alert channel.

## Minimum Fields
- project
- chain
- deadline
- task
- link
- source
- risk level
- status

## First Version
- Discord inbox channel only.
- No automatic public posting.
- Basic duplicate check.
- Simple risk labels: low, medium, high.
- Clean summary format.

## Alert Format
```txt
AIRDROP WATCH

Project:
Chain:
Deadline:
Task:
Why it matters:
Risk:
Link:

Do your own checks.
```

## Bot Permissions
- View Channel
- Read Message History
- Send Messages
- Message Content Intent

## Avoid
- Self-bots
- Scraping Discord accounts
- Blind autoposting
- Posting seed phrases, private keys, or wallet secrets
- Promoting anything that looks like wallet-drainer bait

## Next Actions
- Create Discord channels: `#airdrop-inbox`, `#airdrop-review`, `#airdrop-alerts`.
- Build message parser.
- Add duplicate detection.
- Add approve/reject buttons.

