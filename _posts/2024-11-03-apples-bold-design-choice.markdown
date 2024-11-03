---
layout: post
title: "Apple’s Bold Design Choice of Making Things Look Bad"
author: "Rahul Krishna"
date: 2024-11-03 09:50:44 +0530
categories: [blog]
tags: [apple, design]
---
### Introduction

---

Apple enjoys a unique position in the mobile business. It manages a platform that runs in an exclusive range of devices. For developers, this means that they can expect their app to run reasonably similar to how it runs on their own devices. 

This affords Apple to make design choices that make “things look bad”. And reasonably expect developers to make the necessary changes to make their app look good on Apple devices

### Case 1: The Notch

---

The notch is effectively a visual modification to the already existing status bar. And the status bar is part of the system interface, not the app interface.

<img src="/images/apples-bold-design/notch.png" alt="Notch on an iPhone X" />

Android’s solution to optimising the app interfaces to the notched displays was exactly this. They treated the notch area as the status bar. The app didn’t have to be bothered by it. It continued to work as before

iOS, on the other hand, added huge black areas on the top and bottom for apps that didn’t claim to be optimized. Effectively reducing the app interfaces real estate to 4.7” on a 5.8” screen. 

<img src="/images/apples-bold-design/unoptimised-app-with-notch.png" alt="apps not optimised for notch" />

In hindsight, this paid off. Nearly all iOS apps started working well on screens with display cutouts very soon

### Case 2: Tinted Icons

---

This is again something both iOS and Android did. But Android is far more lenient with its approach, using the default icon as a fallback icon if tinted icon doesn’t exist in the manifest

<img src="/images/apples-bold-design/android-tinted-icons.png" alt="Tinted Icons on Android" />
<img src="/images/apples-bold-design/android-tinted-icons-unoptimised.png" alt="Unoptimised apps on Tinted Icons mode in Android" />



iOS again doesn’t use a fallback, instead choosing to make the icon look potentially bad by applying a tint over it. 

<img src="/images/apples-bold-design/apple-tinted-icons.png" alt="Tinted Icons on Apple" />

This attracted a lot of initial criticism but is very much in line with how Apple does things. The onus falls on the app developers to make their app fit into this system