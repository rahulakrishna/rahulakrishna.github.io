---
layout: post
title: "Arc Browser"
author: "Rahul Krishna"
date: 2024-02-06 11:15:00 +0530
categories: [notes]
tags: [browsers, ux]
---

### Web Browser

---

A Web Browser, ultimately, is an application that lets you send a request to a URL and displays the HTML response on your screen. Apart from displaying simple markup, it also has the ability to run JavaScript and style using CSS.

### Web Page

---

Web Pages have been relying on the “running JavaScript” part more and more. When Angular 1 came out, you were supposed to run the JS bundle inside your HTML. But most frameworks now expect you to render the markup inside JS. Even static websites now have a largely JS based codebase.

We’re seeing more and more “web-apps” instead of “web-sites”. This change makes a browser more akin to an Operating System running apps. Instead of the original concept of an application that renders markup.

In other words, we’re “doing more things” with our browsers than “reading things” with them. Arc Browser tries to bring some of those OS type UX into the browser world.

### Launcher

---

Every Operating Systems have some kind of “Launcher”.

<img src='/images/arc-browser/Untitled%202.png' alt="Spotlight on Mac" style="width: 50%;" />

<img src="/images/arc-browser/Untitled%204.png" alt="Start Menu on Windows" style="width: 50%;"/>

Probably the biggest upgrade in Browser terms is when Google made the URL bar of Chrome work more like a “Launcher”. You weren’t any more expected to precisely type in the URL of the page you had to go to. Google would actually prefer it if you first went to [google.com](http://google.com) and clicked on a link from there.

![Untitled](/images/arc-browser/Untitled%205.png)

![Untitled](/images/arc-browser/Untitled%206.png)

![Untitled](/images/arc-browser/Untitled%207.png)

Arc changes this by opening a Spotlight-like Command Palette every time you hit Cmd+T.

![Untitled](/images/arc-browser/Untitled%208.png)

This lets you do much more than just start a search or open a URL. For instance:

![Untitled](/images/arc-browser/Untitled%209.png)

This may seem like a radical change, but the fact is many applications have already mapped `Cmd+T` to such an action.

VS Code shows this:

![Untitled](/images/arc-browser/Untitled%2010.png)

Slack shows this:

![Untitled](/images/arc-browser/Untitled%2011.png)

### Tab Management

---

Window Management in Operating Systems and Tab Management in Browsers have a lot in common. But all major browsers still rely on the same `Ctrl-Tab` shortcut to switch to the next tab. Arc changes this.

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/cf92ac0bd7034f46b74da932a76696ee?sid=e25f5206-5ff8-483e-95f8-8dc682bce4a4" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

### Space Management

---

Spaces is another cool general OS feature that Browsers have tried to implement, but it hasn’t fared well.

![Spaces on macOS](/images/arc-browser/Untitled%2012.png)

Spaces on macOS

![Untitled](/images/arc-browser/Untitled%2013.png)

Safari’s Space Management is called Tab Groupings. And while this gets synced across devices and is pretty useful if you’re into organising things, it’s almost always hidden away from view. No keyboard shortcuts exist. It’s almost like a way to stash away a group of tabs rather than an intuitive way to organise tabs.

![Untitled](/images/arc-browser/Untitled%2014.png)

Chrome has an even simpler Tab Grouping that essentially lets you put a label next to tabs.

![Untitled](/images/arc-browser/Untitled%2015.png)

Arc simply lets you have this small icons at the bottom of your tabs list. Where you can do a Horizontal scroll to switch between tabs. Also you can find tabs open in other tab groups from the “Spotlight-like” search thingie.

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/da81b54218db46bbb14766baf4fbef0a?sid=b4541dfd-4fdc-4358-9435-29cca03b8432" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

### Vertical Tabs

---

Horizontal Tabs are hard to work with if you have a lot of tabs open.

![Untitled](/images/arc-browser/Untitled%2016.png)

Vertical Tabs offer a better view of the page title. It’s also essential for the scroll to switch space feature

![Untitled](/images/arc-browser/Untitled%2017.png)

### Renaming Tabs

---

Arc lets you rename tabs. Ridiculously simple. But really useful!

![Untitled](/images/arc-browser/Untitled%2018.png)

### Theming

---

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/8b744c9075ce44d8a0f415a329011201?sid=6a954096-5835-4f17-a16a-26625f39171c" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

### AI Features and Split View

---

Arc clearly has an idea of how you browse the web and actively tries to enhance it. One day into trying out Arc, it completely changed how I use HN

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/6c19c4099d334a278ed71e1c9928dc7e?sid=9dee27e8-32fa-41ab-bb01-d0357f7fe95d" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Hover over links to get a summary. Open in split view so I never lose context of the HN link that took me there.
