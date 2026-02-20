# CLAUDE.md — AI Assistant Guide for rahulakrishna.github.io

This file provides context for AI assistants working in this repository.

## Project Overview

Personal website and blog for Rahul Krrishna (rahulkrrishna.xyz), built with [Hugo](https://gohugo.io/) and the [hugo-coder](https://github.com/luizdepra/hugo-coder) theme. Content is managed using Obsidian and published to GitHub Pages.

**Live site:** https://rahulkrrishna.xyz
**Stack:** Hugo + hugo-coder theme + GitHub Pages + Obsidian

---

## Repository Structure

```
rahulakrishna.github.io/
├── hugo.toml              # Main Hugo configuration (site settings, menus, social links)
├── CNAME                  # Custom domain: rahulkrrishna.xyz
├── autopush.sh            # Script: build + git commit + push to master
├── archetypes/
│   └── default.md         # Template for new content files (hugo new)
├── content/               # All site content (Markdown)
│   ├── about.md           # About page
│   ├── resume.md          # Resume page (embeds Google Drive PDF)
│   └── blog/              # Blog posts (also an Obsidian vault)
│       ├── _index.md      # Blog section index
│       └── YYYY-MM-DD-kebab-case-title.md
├── layouts/
│   └── partials/docs/inject/
│       └── head.html      # Custom <head> injection (Mastodon rel=me link)
├── static/
│   └── images/            # Static images, organized per post slug
├── assets/
│   └── images/            # Duplicate of static/images (both dirs exist)
├── docs/                  # Hugo build output — served by GitHub Pages
├── themes/
│   └── hugo-coder/        # Theme (do not modify theme files directly)
└── resources/             # Hugo resource cache (auto-generated)
```

---

## Hugo Configuration (`hugo.toml`)

Key settings:

| Setting | Value |
|---|---|
| `baseURL` | `https://rahulkrrishna.xyz/` |
| `theme` | `hugo-coder` |
| `publishDir` | `docs` (not the default `public/`) |
| `markup.goldmark.renderer.unsafe` | `true` (allows raw HTML in Markdown) |
| `markup.highlight.style` | `github-dark` |
| `params.colorScheme` | `auto` (light/dark mode toggle) |
| `pagination.pagerSize` | `20` |

Navigation menus: Blog (`/blog/`), About (`/about/`), Resume (`/resume/`)

Social links configured: GitHub, Twitter/X, Mastodon, LinkedIn, Threads, Bluesky, RSS

---

## Content Conventions

### Blog Post Front Matter

Posts use YAML front matter (preferred) or TOML (`+++`):

```yaml
---
layout: post
title: "Post Title"
author: "Rahul Krishna"
date: 2025-06-14 12:17:44 +0530
categories: blog
tags: [programming]
draft: false
---
```

- `tags` can be a YAML list (`[tag1, tag2]`) or block style (`\n  - tag1`)
- `draft: true` hides the post from the built site
- `categories` is almost always `blog`

### Blog Post Filename Convention

```
YYYY-MM-DD-kebab-case-title.md
```

Examples:
- `2025-06-14-moving-to-hugo.md`
- `2024-11-03-apples-bold-design-choice.md`
- `2023-10-21-memory-leak-in-google-maps.md`

### Images

- Store images under `static/images/<post-slug>/`
- Reference in Markdown as `/images/<post-slug>/filename.png`
- Example: `![Alt text](/images/apples-bold-design/notch.png)`
- HTML `<img>` tags are also used directly (raw HTML is enabled)

### Creating a New Blog Post

```bash
hugo new blog/YYYY-MM-DD-my-post-title.md
```

This uses `archetypes/default.md` which sets `draft = true` and auto-fills the date and title. Remember to change `draft` to `false` when ready to publish.

---

## Development Workflow

### Prerequisites

- [Hugo](https://gohugo.io/installation/) (extended version recommended)

### Local Development

```bash
# Start local dev server with drafts visible
hugo server -D

# Start local dev server (published posts only)
hugo server
```

Site available at http://localhost:1313

### Building for Production

```bash
hugo --minify --gc --cleanDestinationDir
```

Output goes to `docs/` (configured via `publishDir = "docs"` in hugo.toml).

The `--cleanDestinationDir` flag removes stale files from `docs/` before rebuilding.

### Deployment

**GitHub Pages** serves the `docs/` directory from the `master` branch.

The `autopush.sh` script automates the full build+deploy cycle:

```bash
./autopush.sh
```

It checks for uncommitted changes, runs `hugo --minify --gc --cleanDestinationDir`, commits with a timestamp, and pushes to `master`.

---

## Theme Customization

The `hugo-coder` theme lives in `themes/hugo-coder/`. **Do not modify theme files directly** — use Hugo's override system instead.

To override a theme file, copy it to the matching path in the project root:

- Theme: `themes/hugo-coder/layouts/partials/foo.html`
- Override: `layouts/partials/foo.html`

Current custom override:
- `layouts/partials/docs/inject/head.html` — adds a Mastodon `rel="me"` link tag

---

## Obsidian Integration

The `content/blog/` directory doubles as an Obsidian vault (`.obsidian/` config is present inside it). This enables writing posts directly in Obsidian with features like:

- Wiki-style internal links (`[[link]]`)
- Graph view
- Periodic notes / daily notes
- Plugin ecosystem (Obsidian Git, Templater, Periodic Notes)

When writing in Obsidian, Hugo ignores the `.obsidian/` config directory during builds. Image paths pasted from Obsidian may need adjustment to match Hugo's `/images/...` convention.

---

## Key Files to Know

| File | Purpose |
|---|---|
| `hugo.toml` | Site configuration — menus, theme params, social links |
| `content/about.md` | About page with Goodreads widget |
| `content/resume.md` | Resume page (Google Drive PDF embed) |
| `archetypes/default.md` | Template for `hugo new` |
| `autopush.sh` | One-shot build + commit + push script |
| `layouts/partials/docs/inject/head.html` | Custom `<head>` content (Mastodon verification) |
| `docs/` | Built site — committed to repo for GitHub Pages |

---

## What NOT to Do

- Do not edit files inside `docs/` directly — they are generated by Hugo and will be overwritten on the next build.
- Do not modify files inside `themes/hugo-coder/` — use layout overrides instead.
- Do not push to `master` directly if working on experimental changes — use a feature branch.
- Do not set `draft: true` on posts intended to be live.
