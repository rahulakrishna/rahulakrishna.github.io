---
layout: post
title: "Off by 100% Bias"
author: "Rahul Krishna"
date: 2024-02-21 11:15:00 +0530
categories: [notes]
tags: [TIL]
---

Today I learnt about **Off by 100% bias.**

> When a consumer sees “130% more”, they likely do not put much thought or effort into actually computing what it means,” she adds. Instead, the consumer’s mind “jumps” to the first thing that makes sense, the straight “30% more” calculation.

```jsx
const number = 50;
const delta = 25;

const final = number + delta; // 75;

const percentage_increase = delta / number; // 25 / 50 = 0.5; i.e 50%;
const x_times = final / number; // 75/50 = 1.5; i.e, 1.5x
```

This is even more evident in increases of more than 100%;

```jsx
const number = 50;
const increase = 75;

const final_number = number + delta; // 125;

const percentage_increase = delta / number; // 75 / 50 = 1.5; i.e 150%
const x_times = final / number; // 125 / 50 = 2.5; i.e 2.5x
```

The true reason is that the factors in `percentage` are the `previous number` and the `delta`. Whereas, when you calculate `x times` value, you factor the `final number` and the `previous number`.

The `final number` and the `previous number` will have a higher difference. Therefore, showing `x times` value will **_appear_** to have a higher magnitude.

### Sources

---

https://coxtoday.smu.edu/2022/02/28/consumer-marketing-math-even-the-numerate-are-off-by-100/
