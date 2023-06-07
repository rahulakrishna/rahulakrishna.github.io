---
layout: post
title: "Build an accessible dropdown in React"
date: 2020-08-09 00:13:44 +0530
categories: jekyll update
---

### The problem with Dropdowns

- Accessibility
  - A dropdown needs to be selected via keyboard and mouse. On top of that it should support any accessibility devices
- Appearance
  - The plain dropdown might not go with the rest of the design system

### The default HTML way of creating a dropdown

<section id="code" markdown="1">
  <p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="mdMZpow" data-user="rahulakrishna" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/rahulakrishna/pen/mdMZpow">
  Untitled</a> by Rahul Krishna (<a href="https://codepen.io/rahulakrishna">@rahulakrishna</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
  <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
</section>

### The straight-forward React way of creating a dropdown

##### We need to create a codepen/codesandbox where all the mouse events are captured and logged
