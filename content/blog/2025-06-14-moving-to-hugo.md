---
layout: post
title: Moving to Hugo
author:
  - Rahul Krishna
date: 2023-06-14
categories: blog
tags:
  - programming
draft: false
---

>	I moved my Blog from Jekyll to Hugo!

### Why?
---
Jekyll’s tooling often broke. I found myself upgrading and spending weekends trying to fix something that should’ve felt automatic. 

### Markdowns
---
Authors in the book [[The Pragmatic Programmer]] tells us to store as much data as possible in Markdown. And Markdown seems to have won the markup war. (See relevant [Hacker News Discussion](https://news.ycombinator.com/item?id=44183923))

All of my content in the Jekyll site was stored in plaintext markdown. Moving them over was a simple matter of copying the files over

### Obsidian
---
The idea of building a knowledge base on plaintext with powerful features like linking and graph view excites me. Naturally extending the idea on to blogs (the public facing department of my knowledge base) sounds interesting.

Currently, I have [Obsidian Git](https://github.com/Vinzent03/obsidian-git) as a git service inside Obsidian. Which might not work that well on mobile. The dream is to have everything working so effortlessly that I can have full ownership of my blogging approach yet have it working perfectly on all my devices with something like Obsidian as the frontend.

### Deployment
---
Deployment currently works via a simple classic GitHub pages experience. I might move this to Cloudfare in the future