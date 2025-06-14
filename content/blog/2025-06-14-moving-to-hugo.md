---
layout: post
title: Moving to Hugo
author: Rahul Krishna
date: 2023-06-14
categories: blog
tags:
  - programming
---
	I moved my Blog from Jekyll to Hugo!

### Why?
---
Jekyll’s tooling often broke. I found myself upgrading and spending weekends trying to fix something that should’ve felt automatic. 

### Markdowns
---
Authors in the book [[The Pragmatic Programmer]] tells us to store as much data as possible in Markdown. And Markdown seems to have won the markup war. (See relevant discussion here: (link to apple notes getting markdown export hn thread))

All of my content in the Jekyll site was stored in plaintext markdown. Moving them over was a simple matter of copying the files over

### Obsidian
---
I’m interested in the idea of writing blogs from the comfort of Obsidian. Unlike my clumsy previous workflow of writing in Notion and then copying stuff over to code.  Markdown is native to both Obsidian and Hugo. Might look into ways to publish from my phone

I’m thinking
1. Move the entire directory to my iCloud
2. Pay for Obsidian sync
3. Set up a git push action I can trigger from my phone

### Deployment
---
Deployment currently works via a simple classic GitHub pages experience. I might move this to Cloudfare in the future