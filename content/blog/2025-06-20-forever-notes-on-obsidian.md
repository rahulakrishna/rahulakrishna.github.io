---
layout: post
title: Forever Notes on Obsidian
author: Rahul Krishna
date: 2025-06-20 12:17:44 +0530
categories: blog
tags:
  - productivity
draft: false
---
> WIP. Architecture is still not finalised
## Forever Notes
---
[Forever Notes](https://www.myforevernotes.com/) is a framework for Apple Notes. It introduces a concept that is very similar to [Periodic Notes](https://github.com/liamcain/obsidian-periodic-notes) in Obsidian. However, one major difference is how Daily Notes are organised. Forever Notes takes inspiration from the concept of [Multi Year Diaries](https://www.midori-japan.co.jp/english/products/multi-year-diary-gate/) where a page for a date has sections for multiple years.

![A Multi Year Diary](/images/forever-notes-on-obsidian/multi-year-diary.png)


![A Day entry in Forever Notes](/images/forever-notes-on-obsidian/Pasted%20image%2020250620223855.png)
I tried to bring this feature to Obsidian

## Plugins
---
These are the plugins necessary to implement this in Obsidian
- [Templater](https://github.com/SilentVoid13/Templater)
- [Periodic Notes](https://github.com/liamcain/obsidian-periodic-notes)
## The Notes
---
### Daily
#### Title
By default, the title of a Daily Note in Obsidian contains a year. You just need to drop the year part of the name to make a single day work across multiple years. I went with `MMMM Do`(June 21st) for the format.
![](/images/forever-notes-on-obsidian/Pasted%20image%2020250621092050.png)
#### Template
![Daily Entry on Obsidian](/images/forever-notes-on-obsidian/Pasted%20image%2020250621092604.png)
The links at the beginning, the quote and section headers can be generated in a Templater template.
![](/images/forever-notes-on-obsidian/Pasted%20image%2020250621092705.png)
However, the current year is not part of this template. So before starting the entry, you must invoke another template or manually type the current year and day of the week in `h2` format (`YYYY dddd`).

![Invoking the template to fill in the Year title in Daily Notes](/images/forever-notes-on-obsidian/Pasted%20image%2020250621092845.png)![](/images/forever-notes-on-obsidian/Pasted%20image%2020250621092912.png) ![](/images/forever-notes-on-obsidian/Pasted%20image%2020250621093059.png)

> Find all the templates and scripts at https://github.com/rahulakrishna/forever-notes-on-obsidian/
### Weekly
![](/images/forever-notes-on-obsidian/Pasted%20image%2020250621092141.png)
#### Title
The title for the weekly note will be **25th week**. The main section title will simply have the year name in an `h2` format.
#### Template
![](/images/forever-notes-on-obsidian/Pasted%20image%2020250621093716.png)
Notice the header links and the section called 'Days,' which links to individual days in the week. Template to be found here: https://github.com/rahulakrishna/forever-notes-on-obsidian/blob/main/scripts/weeklyHeader.js
### Monthly
![](/images/forever-notes-on-obsidian/Pasted%20image%2020250621092156.png)
#### Title
Title for a monthly note is simply `MMMM` which expands to the proper name of the month. 
#### Template
![](/images/forever-notes-on-obsidian/Pasted%20image%2020250622124854.png)
Add as many sections as you need.
### Quarterly
#### Title
![](/images/forever-notes-on-obsidian/Pasted%20image%2020250621092212.png)
The title for a quarterly note is simply the letter 'Q' followed by the quarter number (e.g., Q2).
#### Template
![](/images/forever-notes-on-obsidian/Pasted%20image%2020250622125155.png)

### Yearly
#### Title
![](/images/forever-notes-on-obsidian/Pasted%20image%2020250621092226.png)
The title is simply the year in the YYYY format.
#### Template
![](/images/forever-notes-on-obsidian/Pasted%20image%2020250622125256.png)
Contains a list of months and quarters of the year.

## Resources
---
https://github.com/rahulakrishna/forever-notes-on-obsidian