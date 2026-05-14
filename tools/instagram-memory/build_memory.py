from __future__ import annotations

import argparse
import json
import lzma
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterable


DEFAULT_RAW = Path("data/instagram-saved/raw")
DEFAULT_PROCESSED = Path("data/instagram-saved/processed")
DEFAULT_OBSIDIAN = Path(
    "Obsidian_Memory/Obsidian_Vault/AI Knowledge/Instagram Saved Posts Memory.md"
)


@dataclass
class SavedPost:
    shortcode: str
    url: str
    owner: str
    typename: str
    caption: str
    taken_at: str
    is_video: bool
    media_files: list[str]
    transcript: str


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Turn downloaded Instagram saved posts into agent-readable JSONL and Obsidian notes."
    )
    parser.add_argument("--raw", type=Path, default=DEFAULT_RAW)
    parser.add_argument("--out", type=Path, default=DEFAULT_PROCESSED)
    parser.add_argument("--limit", type=int, default=0, help="Optional post limit for a small first run.")
    parser.add_argument("--transcribe", action="store_true", help="Transcribe downloaded .mp4 files locally.")
    parser.add_argument("--model", default="tiny", help="faster-whisper model size. Start with tiny or base.")
    parser.add_argument("--write-obsidian", action="store_true")
    parser.add_argument("--obsidian-note", type=Path, default=DEFAULT_OBSIDIAN)
    return parser.parse_args()


def load_json(path: Path) -> dict[str, Any]:
    if path.suffix == ".xz":
        with lzma.open(path, "rt", encoding="utf-8") as file:
            return json.load(file)
    with path.open("r", encoding="utf-8") as file:
        return json.load(file)


def deep_get(data: dict[str, Any], *keys: str, default: Any = "") -> Any:
    current: Any = data
    for key in keys:
        if not isinstance(current, dict) or key not in current:
            return default
        current = current[key]
    return current


def extract_caption(node: dict[str, Any]) -> str:
    direct = node.get("caption") or node.get("edge_media_to_caption")
    if isinstance(direct, str):
        return direct.strip()
    edges = deep_get(node, "edge_media_to_caption", "edges", default=[])
    if edges:
        text = deep_get(edges[0], "node", "text", default="")
        return str(text).strip()
    return ""


def find_media_files(json_path: Path, shortcode: str) -> list[str]:
    folder = json_path.parent
    stem = json_path.name
    for suffix in (".json.xz", ".json"):
        if stem.endswith(suffix):
            stem = stem[: -len(suffix)]
    candidates = []
    for pattern in (f"{stem}*", f"*{shortcode}*"):
        candidates.extend(folder.glob(pattern))
    media = sorted(
        {
            str(path)
            for path in candidates
            if path.suffix.lower() in {".mp4", ".jpg", ".jpeg", ".png", ".webp"}
        }
    )
    return media


def transcript_for(media_files: Iterable[str], model_name: str) -> str:
    videos = [path for path in media_files if Path(path).suffix.lower() == ".mp4"]
    if not videos:
        return ""
    try:
        from faster_whisper import WhisperModel
    except ImportError as exc:
        raise SystemExit(
            "faster-whisper is not installed. Run npm run instagram:install first."
        ) from exc

    model = WhisperModel(model_name, device="cpu", compute_type="int8")
    chunks: list[str] = []
    for video in videos:
        segments, _info = model.transcribe(video, vad_filter=True)
        for segment in segments:
            text = segment.text.strip()
            if text:
                chunks.append(f"[{segment.start:.1f}s] {text}")
    return "\n".join(chunks)


def post_from_json(path: Path, transcribe: bool, model_name: str) -> SavedPost | None:
    data = load_json(path)
    node = data.get("node", data)
    shortcode = str(node.get("shortcode") or node.get("code") or "").strip()
    if not shortcode:
        return None

    owner = deep_get(node, "owner", "username", default="")
    media_files = find_media_files(path, shortcode)
    transcript = transcript_for(media_files, model_name) if transcribe else ""
    taken_at = str(node.get("taken_at_timestamp") or node.get("date_utc") or "")
    typename = str(node.get("__typename") or node.get("typename") or "")
    caption = extract_caption(node)
    is_video = bool(node.get("is_video")) or any(file.endswith(".mp4") for file in media_files)

    return SavedPost(
        shortcode=shortcode,
        url=f"https://www.instagram.com/p/{shortcode}/",
        owner=str(owner),
        typename=typename,
        caption=caption,
        taken_at=taken_at,
        is_video=is_video,
        media_files=media_files,
        transcript=transcript,
    )


def angle_for(post: SavedPost) -> str:
    text = f"{post.caption}\n{post.transcript}".lower()
    if any(word in text for word in ("pricing", "offer", "sales", "client", "lead")):
        return "sales_angle"
    if any(word in text for word in ("hook", "copy", "ad", "content", "brand")):
        return "creative_angle"
    if any(word in text for word in ("system", "workflow", "automation", "process")):
        return "operator_angle"
    return "raw_inspiration"


def compact_text(value: str, limit: int = 900) -> str:
    cleaned = re.sub(r"\s+", " ", value).strip()
    if len(cleaned) <= limit:
        return cleaned
    return cleaned[: limit - 3].rstrip() + "..."


def write_outputs(posts: list[SavedPost], out_dir: Path, obsidian_note: Path | None) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    jsonl_path = out_dir / "instagram_saved_posts_memory.jsonl"
    md_path = out_dir / "instagram_saved_posts_memory.md"

    with jsonl_path.open("w", encoding="utf-8") as file:
        for post in posts:
            payload = {
                "id": post.shortcode,
                "url": post.url,
                "owner": post.owner,
                "type": post.typename,
                "takenAt": post.taken_at,
                "isVideo": post.is_video,
                "angle": angle_for(post),
                "caption": post.caption,
                "transcript": post.transcript,
                "agentUse": compact_text(f"{post.caption}\n{post.transcript}"),
            }
            file.write(json.dumps(payload, ensure_ascii=False) + "\n")

    markdown = render_markdown(posts, jsonl_path)
    md_path.write_text(markdown, encoding="utf-8")
    if obsidian_note:
        obsidian_note.parent.mkdir(parents=True, exist_ok=True)
        obsidian_note.write_text(markdown, encoding="utf-8")


def render_markdown(posts: list[SavedPost], jsonl_path: Path) -> str:
    lines = [
        "# Instagram Saved Posts Memory",
        "",
        "Use this as an agent-readable inspiration bank. It is private source material, not public JobFilter copy.",
        "",
        f"Structured JSONL: `{jsonl_path}`",
        "",
        "## Agent Rules",
        "- Mine patterns, hooks, positioning, objections, and product ideas.",
        "- Do not copy creator content verbatim into public work.",
        "- Use this to sharpen JobFilter, AgentDock, and other product thinking.",
        "- Keep raw downloads private under `data/instagram-saved/`.",
        "",
        "## Saved Signals",
    ]
    for post in posts:
        source_text = post.transcript or post.caption
        lines.extend(
            [
                "",
                f"### {post.shortcode}",
                f"- URL: {post.url}",
                f"- Owner: @{post.owner}" if post.owner else "- Owner: unknown",
                f"- Type: {post.typename or 'unknown'}",
                f"- Angle: {angle_for(post)}",
                f"- Agent use: {compact_text(source_text)}",
            ]
        )
    lines.append("")
    return "\n".join(lines)


def main() -> None:
    args = parse_args()
    patterns = ["**/*.json", "**/*.json.xz"]
    paths: list[Path] = []
    for pattern in patterns:
        paths.extend(args.raw.glob(pattern))
    paths = sorted(set(paths))
    if args.limit:
        paths = paths[: args.limit]

    posts = [
        post
        for path in paths
        if (post := post_from_json(path, args.transcribe, args.model)) is not None
    ]
    if not posts:
        raise SystemExit(
            f"No Instaloader metadata found under {args.raw}. Run download_saved.py first."
        )

    write_outputs(posts, args.out, args.obsidian_note if args.write_obsidian else None)
    print(f"Wrote {len(posts)} saved posts to {args.out}")


if __name__ == "__main__":
    main()
