---
layout: post
title: "React Tips for Future"
author: "Rahul Krishna"
date: 2023-06-07 09:16:44 +0530
categories: notes
---

### 1. Do not overuse useEffect

---

For developers, `useEffect` is often seen as a replacement for `componentDidMount`. However, strictly speaking, it is not. The name suggests that it is a place to manage side effects, but that is not entirely accurate.

`useEffect` is actually a way to synchronize local state with an external store. This means that `useEffect` is a purely asynchronous method with unpredictable performance implications. Think of `useEffect` as a reliable henchman who will eventually step in and complete your task, but not always on schedule.

Interestingly, updating state during rendering, which was once discouraged in the era of class components, is now preferred over `useEffect`.

### 2. Data fetching has too many hidden traps. Do not reinvent the wheel here

---

Data fetching may appear straightforward at first. You are asynchronously fetching data from the remote and setting it in state. However, there are numerous hidden traps that must be taken into account, including caching, deduping, and performance, to name a few.

Do not think of data fetching as simply "making an API call." Rather, think of it as syncing your local store with an external store. While `useEffect` may seem like a perfect solution for this, it is best to use libraries specifically designed for this purpose, such as `react-query`.

### 3. Use a framework

---

I must say with confidence that React is currently outdated. While using a library instead of committing to a framework used to be seen as an advantage, it is now a serious cause for confusion later on. It is recommended to use frameworks built on top of React, such as Next.js and Remix.

### 4. Think about styling

---

Use Tailwind. The biggest advantage is not only the extensive list of built-in classes, but also the exceptional quality of the `tailwind.config.js` file. By strictly adhering to the use of classes, you can significantly enhance the organization of the application.

### 5. Do not make accommodations for the product team’s inconsistencies in code

---

This task can be challenging; however, when a product decides to go with a new table design for a solution that is already in place, there are two options to consider. One is to conditionally render the new style in the existing table, while the other is to create two different solutions for the same scenario inside the code. It is imperative to avoid both scenarios and ensure the protection of your code by enforcing a single, unified solution for each problem.

### 6. Colors need names

---

When writing code, it is important to avoid using `#ffffff`. Instead, utilize the `text-white` class from Tailwind. This ensures that when new colors are introduced by the design/product, the responsibility lies with them to come up with a name. Rather than relying on `#ff2345`, it is recommended to use `text-primary-red` in the code.
