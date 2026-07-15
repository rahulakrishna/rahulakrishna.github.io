#!/bin/bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD_CONTENT_DIR="$ROOT_DIR/.hugo-build-content"

rm -rf "$BUILD_CONTENT_DIR"
cp -a "$ROOT_DIR/content" "$BUILD_CONTENT_DIR"

python3 "$ROOT_DIR/scripts/wikilinks_to_markdown.py" "$BUILD_CONTENT_DIR"

cd "$ROOT_DIR"
hugo --contentDir .hugo-build-content --minify --gc --cleanDestinationDir "$@"

rm -rf "$BUILD_CONTENT_DIR"
