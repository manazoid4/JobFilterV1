# Instagram Saved Posts Memory

This note is the shared agent entry point for Instagram saved-post inspiration.

## Pipeline

- Install: `npm run instagram:install`
- Download: `python tools/instagram-memory/download_saved.py --username YOUR_INSTAGRAM_USERNAME --count 25`
- Build memory: `npm run instagram:memory`
- Build with transcript: `python tools/instagram-memory/build_memory.py --write-obsidian --transcribe --model tiny`

## Agent Rules

- Use this as private source material for product taste, hooks, positioning, objections, and creative direction.
- Do not copy creator content verbatim into public work.
- Raw downloads stay in `data/instagram-saved/`, which is ignored by git.
- Structured agent data is written to `data/instagram-saved/processed/instagram_saved_posts_memory.jsonl`.

## Current Status

Pipeline installed. No Instagram posts have been downloaded in this session because login requires the account owner.

## Links

- [[AI Knowledge Index]]
- [[JobFilter Map]]
