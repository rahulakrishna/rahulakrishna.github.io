---
layout: post
title: "Recursion in React"
author: "Rahul Krishna"
date: 2024-02-21 11:15:00 +0530
categories: [notes]
tags: [javascript, react]
---

### TLDR;

---

TIL that you can have recursive components in React!

<aside>
💡 React uses one-way data flow, passing data down the component hierarchy from parent to child component
</aside>
<br/>
So while thinking in React, it may not immediately occur that you can call a **parent** inside the **child!** But it is possible

### Consider a Data Structure like this:

---

```jsx
const comments = [
  {
    content: "Comment 1",
    level: 0,
    comments: [
      {
        content: "Comment 1 > 1",
        level: 1,
        comments: [
          {
            content: "Comment 1 > 1 > 1",
            level: 2,
            comments: [],
          },
        ],
      },
      {
        content: "Comment 1 > 2",
        level: 1,
        comments: [],
      },
    ],
  },
  {
    content: "Comment 2",
    level: 0,
    comments: [],
  },
];
```

### Doing this in Javascript

---

```jsx
function displayComments(comments) {
  return comments.reduce((acc, comment) => {
    const prefix = Array(comment.level)
      .fill("|")
      .reduce((acc, item) => `${acc} ${item}`, "");

    const moreComments = displayComments(comment.comments);

    const stringToReturn = `${prefix} ${comment.content} \n ${moreComments}`;
    return `${acc} ${stringToReturn}`;
  }, "");
}
```

Result:

![Javascript Result](/images/recursion-in-react/javascript-result.png)

### Doing this in React

---

```jsx
function Comment({ comment }) {
  const prefix = Array(comment.level)
    .fill("|")
    .reduce((acc, item) => `${acc} ${item}`, "");
  return (
    <div>
      {prefix} {comment.content}
      <Comments comments={comment.comments} />
    </div>
  );
}

export default function Comments({ comments }) {
  return comments.map((comment) => {
    return <Comment comment={comment} />;
  });
}
```

Result:

![React Result](/images/recursion-in-react/react-result.png)

### Actual example of rendering a comment tree

---

It’s unlikely we’ll be using `|` prefixes when actually building a comment tree. We’ll more likely be playing around with `padding` and `margin`.

Here’s a code example of actual comment tree rendering in React with TailwindCSS: [https://github.com/rahulakrishna/hackrmn/blob/master/src/app/[storylist]/comments/[commentid]/comment-block.js](https://github.com/rahulakrishna/hackrmn/blob/master/src/app/%5Bstorylist%5D/comments/%5Bcommentid%5D/comment-block.js)

![Untitled](/images/recursion-in-react/real-life-example.png)

### References

---

- Thinking in React: [https://react.dev/learn/thinking-in-react](https://react.dev/learn/thinking-in-react)
- hackrmn repo: [https://github.com/rahulakrishna/hackrmn/tree/master](https://github.com/rahulakrishna/hackrmn/tree/master)
