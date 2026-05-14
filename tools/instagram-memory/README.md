# Instagram Saved Posts Memory

Private pipeline for turning your Instagram saved posts into agent-readable memory.

## Why this route

- Instaloader is the open-source base. It supports the logged-in user's `:saved` collection and saves captions plus metadata.
- Transcription is local with `faster-whisper`, so the archive can become useful text without sending private saved media to a SaaS scraper.
- Outputs go into `data/instagram-saved/` and Obsidian. `data/` is gitignored.

## Setup

```powershell
npm run instagram:install
```

## Download saved posts

Start small first:

```powershell
python tools/instagram-memory/download_saved.py --username YOUR_INSTAGRAM_USERNAME --count 25
```

Then scale it:

```powershell
python tools/instagram-memory/download_saved.py --username YOUR_INSTAGRAM_USERNAME --count 500 --fast-update
```

Instaloader will create a reusable login session. If Instagram blocks password login, log in through Firefox and import that browser session into Instaloader, then pass `--session-file`.

## Build agent memory

Without video transcription:

```powershell
npm run instagram:memory
```

With local video transcription:

```powershell
python tools/instagram-memory/build_memory.py --write-obsidian --transcribe --model tiny
```

Use `--model base` later if quality matters more than speed.

## Agent outputs

- Raw private archive: `data/instagram-saved/raw/`
- Processed JSONL: `data/instagram-saved/processed/instagram_saved_posts_memory.jsonl`
- Processed Markdown: `data/instagram-saved/processed/instagram_saved_posts_memory.md`
- Obsidian note: `Obsidian_Memory/Obsidian_Vault/AI Knowledge/Instagram Saved Posts Memory.md`

Agents should read the Obsidian note first and use the JSONL when they need structured source material.
