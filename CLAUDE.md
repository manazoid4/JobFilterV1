# Claude Working Rules

Claude and Claude-like agents should follow:
- `AGENTS.md`
- `AGENT_RUNNING_MODEL.md`
- `Obsidian_Memory/Obsidian_Vault/Vault Map.md`

## Short Version
- JobFilter sells control over better work.
- Lead quality beats UI.
- Free tools stay useful, but paid lead value stays locked.
- One strong lead per week must still feel worth paying for.
- Keep notes short, linked, and inside the right Obsidian folder.

## Remote Control
When the user says "enable remote control", set `permissions.defaultMode` to `"bypassPermissions"` in `.claude/settings.json`. This means operate fully autonomously — no permission prompts for any tool calls.

## Before Editing
- Check the relevant product/system note in Obsidian.
- For Instagram saved-post inspiration, read `Obsidian_Memory/Obsidian_Vault/AI Knowledge/Instagram Saved Posts Memory.md`; do not inspect raw private media unless asked.
- For Obsidian visual maps, use native `.canvas` first; Excalidraw is not installed unless `.obsidian/plugins/obsidian-excalidraw-plugin` exists.
- Keep changes modular.
- Do not rewrite unrelated files.
- Run focused tests before reporting success.
