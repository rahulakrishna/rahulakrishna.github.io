#!/usr/bin/env python3
"""Rewrite Obsidian-style [[wikilinks]] into Markdown links to Wikipedia.

Run against a throwaway copy of content/ at build time, never against the
Obsidian vault itself, so [[...]] stays intact for Obsidian's own linking.

Supports:
  [[Term]]          -> [Term](https://en.wikipedia.org/wiki/Term)
  [[Term|Display]]  -> [Display](https://en.wikipedia.org/wiki/Term)

Skips ![[Embed]] (Obsidian embeds, e.g. images), which don't take the "!".
"""
import re
import sys
import urllib.parse
from pathlib import Path

WIKILINK = re.compile(r"(?<!!)\[\[([^\[\]|]+)(?:\|([^\[\]]+))?\]\]")


def wikipedia_url(target: str) -> str:
    slug = target.strip().replace(" ", "_")
    return "https://en.wikipedia.org/wiki/" + urllib.parse.quote(slug)


def replace(match: "re.Match[str]") -> str:
    target, alias = match.group(1), match.group(2)
    label = (alias or target).strip()
    return f"[{label}]({wikipedia_url(target)})"


def main(root: str) -> None:
    for path in Path(root).rglob("*.md"):
        text = path.read_text(encoding="utf-8")
        new_text = WIKILINK.sub(replace, text)
        if new_text != text:
            path.write_text(new_text, encoding="utf-8")


if __name__ == "__main__":
    main(sys.argv[1])
