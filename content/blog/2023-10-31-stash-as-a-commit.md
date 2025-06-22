---
layout: post
title: "Stash as a Commit"
author: "Rahul Krishna"
date: 2023-10-31 17:35:44 +0530
categories: notes
---

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

### The Rationale Behind Preferring Commit Over Stash

---

For people accustomed to the command-line interface of Git, the concept of committing instead of stashing may seem unconventional. However, when your Git workflow is integrated into  Integrated Development Environment (IDE), particularly Visual Studio Code, this approach becomes beneficial.

#### The User Interface of Atom

The user interface of Atom was great, particularly its tri-pane design that always keeps the File Explorer, Code, and Git in view.

![The Atom UI with File Explorer, Code Area and Git/Github Panel](https://thisdot.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Feb53edbf-045d-426c-aa09-d626c2816f18%2F30eb89c7-3a26-44ee-b2f2-68ee6c0aa485%2FUntitled.png?table=block&id=d8d6eda7-64ee-407a-80bc-5008f3df3411&spaceId=eb53edbf-045d-426c-aa09-d626c2816f18&width=2000&userId=&cache=v2)

The Atom UI with File Explorer, Code Area and Git/Github Panel

The most useful part of this is that it continually updates a list of changes made to files on the right side of the screen, providing a general overview of the magnitude of your modifications. This visibility encourages experimental changes, which can be easily cherry-picked or discarded.

![Atom Git Pane](https://thisdot.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Feb53edbf-045d-426c-aa09-d626c2816f18%2Fa0cac6ea-b1a1-4188-88f2-bcd93e7ae264%2FUntitled.png?table=block&id=a43d04df-ecd0-4ece-bb34-c6249ef0ace4&spaceId=eb53edbf-045d-426c-aa09-d626c2816f18&width=2000&userId=&cache=v2)

Atom Git Pane

### The Workflow in Atom

---

Consider a scenario where you are working on `feature-branch-1` and need to switch to the `master` branch. Typically, you would stash your changes in `feature-branch-1`. However, Atom provides an alternative commit method.

<div style="position: relative; padding-bottom: 60.30150753768844%; height: 0;"><iframe src="https://www.loom.com/embed/3b5ae799bb104aa5891ed51a92d5f6ca?sid=55db5932-acf4-4c6f-89c3-b1eca8610ee7" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

### Visual Studio Code: A Comparison

---

By default, Visual Studio Code does not offer the same layout as Atom. However, this is arguably advantageous, and a similar workflow to Atom can be achieved in Visual Studio Code. This can be done by enabling a Secondary Side Bar and moving your "Source Control" and "Commits" to the second pane.

![Untitled](https://thisdot.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Feb53edbf-045d-426c-aa09-d626c2816f18%2F883485c0-262f-459b-ae7c-fb679142d8ff%2FUntitled.png?table=block&id=8c888b7c-77bb-4b97-89f1-3ebeb297a110&spaceId=eb53edbf-045d-426c-aa09-d626c2816f18&width=2000&userId=&cache=v2)

![A lot more cluttered than my Atom. But it also does a lot more than Atom!](https://thisdot.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Feb53edbf-045d-426c-aa09-d626c2816f18%2F842b7ef4-deb7-4304-8063-0af1ad02e19f%2FUntitled.png?table=block&id=99e468ec-9c5b-4861-9f49-0643fd5bb392&spaceId=eb53edbf-045d-426c-aa09-d626c2816f18&width=2000&userId=&cache=v2)

A lot more cluttered than my Atom. But it also does a lot more than Atom!

### The Workflow in Visual Studio Code

---

<div style="position: relative; padding-bottom: 58.91980360065466%; height: 0;"><iframe src="https://www.loom.com/embed/a1fa5c8bebd74fb889ae26dbbfcf63ee?sid=e00e01da-5fc6-4b6a-95eb-a9c3912e3e95" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

### Additional: Command Line Approach

---

<div style="position: relative; padding-bottom: 74.34052757793765%; height: 0;"><iframe src="https://www.loom.com/embed/70c3d90ac8a64c2aaae010394174a8bb?sid=5674d81a-c4e8-4438-aaea-ec7200ae4212" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

### The Merits of Stash Commit

---

The primary advantage of a stash commit is that it is local to a branch. This is particularly useful when working on multiple features and needing to stash changes to switch branches (often to master to create a new branch). Upon returning, the stash commit is visible, allowing you to resume where you left off. This is especially helpful when revisiting a branch after a significant period, as remembering that you stashed some code may not be evident.

### The Argument for Stash

---

- `git stash` effectively clears your branch of changes for later use, which is necessary if you do not have a branch to perform a stash commit.
- If you have a piece of code that is frequently needed but cannot be committed, `git stash` is the preferred method.

### References

---

Julia Evans’ Blog Article: [https://jvns.ca/blog/2023/10/20/some-miscellaneous-git-facts/](https://jvns.ca/blog/2023/10/20/some-miscellaneous-git-facts/)
