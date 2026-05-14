from __future__ import annotations

import argparse
from pathlib import Path

import instaloader


DEFAULT_OUTPUT = Path("data/instagram-saved/raw")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Download the logged-in user's Instagram saved posts into a private local archive."
    )
    parser.add_argument("--username", required=True, help="Instagram username to log in with.")
    parser.add_argument("--count", type=int, default=200, help="Maximum saved posts to download.")
    parser.add_argument(
        "--output",
        type=Path,
        default=DEFAULT_OUTPUT,
        help="Private output folder. The repo ignores data/ by default.",
    )
    parser.add_argument(
        "--session-file",
        type=Path,
        help="Optional Instaloader session file. If omitted, Instaloader uses its default session store.",
    )
    parser.add_argument(
        "--fast-update",
        action="store_true",
        help="Stop when previously downloaded posts are reached.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    args.output.mkdir(parents=True, exist_ok=True)

    loader = instaloader.Instaloader(
        dirname_pattern=str(args.output / "{target}"),
        filename_pattern="{date_utc}_UTC_{profile}_{shortcode}",
        download_pictures=True,
        download_videos=True,
        download_video_thumbnails=False,
        download_geotags=False,
        download_comments=False,
        save_metadata=True,
        compress_json=False,
        post_metadata_txt_pattern=(
            "{caption}\n\n"
            "URL: https://www.instagram.com/p/{shortcode}/\n"
            "Owner: @{owner_username}\n"
            "Type: {typename}\n"
            "Video: {is_video}"
        ),
        max_connection_attempts=3,
        request_timeout=120.0,
    )

    if args.session_file:
        loader.load_session_from_file(args.username, filename=str(args.session_file))
    else:
        try:
            loader.load_session_from_file(args.username)
        except FileNotFoundError:
            loader.interactive_login(args.username)
            loader.save_session_to_file()

    loader.download_saved_posts(max_count=args.count, fast_update=args.fast_update)


if __name__ == "__main__":
    main()
