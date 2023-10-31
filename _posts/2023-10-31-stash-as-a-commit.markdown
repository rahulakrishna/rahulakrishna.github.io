---
layout: post
title: "Stash as a Commit"
date: 2023-10-31 17:35:44 +0530
categories: blog
---

# Stash as a Commit

Date: October 31, 2023

### What is a Stash?

---

From Julia Evans’ blog article titled **Some miscellaneous git facts**

> 👉🏽 \***\*the stash is a bunch of commits\*\***
>
> When I run `git stash` to stash my changes, I’ve always been a bit confused about where those changes actually went. It turns out that when you run `git stash`, git makes some commits with your changes and labels them with a reference called `stash` (in `.git/refs/stash`).
>
> Let’s stash this blog post and look at the log of the `stash` reference:
>
> ```
> $ git log stash --oneline
> 6cb983fe (refs/stash) WIP on main: c6ee55ed wip
> 2ff2c273 index on main: c6ee55ed wip
> ... some more stuff
>
> ```
>
> Now we can look at the commit `2ff2c273` to see what it contains:
>
> ```
> $ git show 2ff2c273  --stat
> commit 2ff2c273357c94a0087104f776a8dd28ee467769
> Author: Julia Evans <julia@jvns.ca>
> Date:   Fri Oct 20 14:49:20 2023 -0400
>
>    index on main: c6ee55ed wip
>
> content/post/2023-10-20-some-miscellaneous-git-facts.markdown | 40 ++++++++++++++++++++++++++++++++++++++++
>
> ```
>
> Unsurprisingly, it contains this blog post. Makes sense!
>
> `git stash` actually creates 2 separate commits: one for the index, and one for your changes that you haven’t staged yet. I found this kind of heartening because I’ve been working on a tool to snapshot and restore the state of a git repository (that I may or may not ever release) and I came up with a very similar design, so that made me feel better about my choices.
>
> Apparently older commits in the stash are stored in the reflog.

### Why can’t we just commit instead of stashing?

---

For those used to the idea of git from command line, this may seem like a strange idea. But if your git workflow is well integrated into your IDE (I must admit, I have only VS Code in mind here), then this is such a good idea.

#### The Atom UI

I absolutely adored the Atom UI. The best part to me was the three pane design that put File Explorer, Code and Git in view always.

![The Atom UI with File Explorer, Code Area and Git/Github Panel](https://thisdot.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Feb53edbf-045d-426c-aa09-d626c2816f18%2F30eb89c7-3a26-44ee-b2f2-68ee6c0aa485%2FUntitled.png?table=block&id=d8d6eda7-64ee-407a-80bc-5008f3df3411&spaceId=eb53edbf-045d-426c-aa09-d626c2816f18&width=2000&userId=&cache=v2)

The Atom UI with File Explorer, Code Area and Git/Github Panel

This is good because as you went making changes in files, it kept adding a list item in the right side of the screen and you had a general idea how big your changes were becoming. Putting this upfront meant a little extra motivation to go and make experimental changes anywhere which never left your view and you could just go and cherry-pick or discard everything!

![Atom Git Pane](https://thisdot.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Feb53edbf-045d-426c-aa09-d626c2816f18%2Fa0cac6ea-b1a1-4188-88f2-bcd93e7ae264%2FUntitled.png?table=block&id=a43d04df-ecd0-4ece-bb34-c6249ef0ace4&spaceId=eb53edbf-045d-426c-aa09-d626c2816f18&width=2000&userId=&cache=v2)

Atom Git Pane

### The Flow in Atom

---

Let’s say you’re in `feature-branch-1` and you need to switch branches to `master`. Naturally, you’ll stash your changes in `feature-branch-1`

Here’s the alternative commit method in Atom.

[https://www.loom.com/share/3b5ae799bb104aa5891ed51a92d5f6ca?sid=22e04793-241b-4213-aacd-a82d668dce49](https://www.loom.com/share/3b5ae799bb104aa5891ed51a92d5f6ca?sid=22e04793-241b-4213-aacd-a82d668dce49)

### What about VS Code?

---

VS Code doesn’t come with the same layout by default. It’s for the better and you can have the same Atom-like workflow in VS Code. Just enable a Secondary Side Bar and drag your “Source Control” and “Commits” to the second pane.

![Untitled](https://thisdot.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Feb53edbf-045d-426c-aa09-d626c2816f18%2F883485c0-262f-459b-ae7c-fb679142d8ff%2FUntitled.png?table=block&id=8c888b7c-77bb-4b97-89f1-3ebeb297a110&spaceId=eb53edbf-045d-426c-aa09-d626c2816f18&width=2000&userId=&cache=v2)

![A lot more cluttered than my Atom. But it also does a lot more than Atom!](https://thisdot.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Feb53edbf-045d-426c-aa09-d626c2816f18%2F842b7ef4-deb7-4304-8063-0af1ad02e19f%2FUntitled.png?table=block&id=99e468ec-9c5b-4861-9f49-0643fd5bb392&spaceId=eb53edbf-045d-426c-aa09-d626c2816f18&width=2000&userId=&cache=v2)

A lot more cluttered than my Atom. But it also does a lot more than Atom!

### The Same Flow in VS Code

---

[https://www.loom.com/share/a1fa5c8bebd74fb889ae26dbbfcf63ee?sid=386b9b4e-44e3-4eec-80ab-1e5987b35dad](https://www.loom.com/share/a1fa5c8bebd74fb889ae26dbbfcf63ee?sid=386b9b4e-44e3-4eec-80ab-1e5987b35dad)

### The Advantage

---

The real advantage is that a stash commit is local to a branch. This is ideal if you’re often working on multiple features and need to stash something to switch branches (often to master to create a new branch). So when you come back you see the stash commit and you’re back where you left it. Sometimes, when a week later when you revisit a branch, remembering that you stashed some code is not clear.

### The case for stash

---

- `git stash` actually frees your branch of changes for use at a later time. Which is necessary if you don’t have a branch to do a `stash commit`.
- If you have a piece of code that you often need, but can’t commit. `git stash` is the way to go.

### References

---

Julia Evans’ Blog Article: [https://jvns.ca/blog/2023/10/20/some-miscellaneous-git-facts/](https://jvns.ca/blog/2023/10/20/some-miscellaneous-git-facts/)
