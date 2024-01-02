---
layout: post
title: "Loading vs Fetching"
author: "Rahul Krishna"
date: 2024-01-01 11:15:00 +0530
categories: [notes]
tags: [programming, ux]
---

### The Basics

---

- No Data + Fetching Data = LOADING
- Yes Data + Fetching Data = FETCHING

### Why?

---

As long as the data we have is not invalid. We have no reason to hide it away from the user.

### Examples from around the world

---

Loading | Fetching
![YouTube Loading State](/images/loading-vs-fetching/Untitled%206.png) YouTube Loading State |![YouTube Fetching State](/images/loading-vs-fetching/Untitled%207.png) YouTube Fetching State
![Apollo App Loading State](/images/loading-vs-fetching/Untitled%208.png) Apollo App Loading State | ![Apollo App Fetching State](/images/loading-vs-fetching/Untitled%209.png) Apollo App Fetching State
![Fotmob Loading State](/images/loading-vs-fetching/Untitled%2010.png) Fotmob Loading State | ![Fotmob Fetching State](/images/loading-vs-fetching/Untitled%2011.png) Fotmob Fetching State

### Important Exception

---

We must be careful not to trigger the fetching state when the _data is invalid_

![Facebook Messenger Concept](/images/loading-vs-fetching/facebook-messenger.jpeg) Facebook Messenger Concept (Credit: Christoffer O. Jensen)

In this example. Moving between chats should always render the data on the screen invalid.

### References

---

- Christoffer O. Jensen on Dribble - <b>Facebook Messenger App</b> - https://dribbble.com/shots/800893-Facebook-Messenger-App/attachments/81487
