---
layout: post
title: "Memory Leak in Google Maps"
date: 2023-10-21 00:48:44 +0530
categories: blog
---

# Memory Leak in Google Maps

Date: October 21, 2023

### Premise

---

![Untitled](https://thisdot.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Feb53edbf-045d-426c-aa09-d626c2816f18%2F0a0376ef-1fed-43b9-b795-a0838c2dc18a%2FUntitled.png?table=block&id=5dbb1e64-43ed-4918-8607-981ca6a374a1&spaceId=eb53edbf-045d-426c-aa09-d626c2816f18&width=2000&userId=&cache=v2)

We need to render a map like this using `google-map-react` . But rendering large data points makes the page unresponsive for a while and subsequent actions become slower indicating a memory leak occuring.

![Untitled](https://thisdot.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Feb53edbf-045d-426c-aa09-d626c2816f18%2F0e323202-b790-4d19-9f30-e80445bcea0f%2FUntitled.png?table=block&id=30bf63d9-45c4-4bbe-b5d0-b6d31ee4bff2&spaceId=eb53edbf-045d-426c-aa09-d626c2816f18&width=770&userId=&cache=v2)

This is the code used. The only cleanup happening was setting `data` to `null`.

### The issue

---

There are three issues present here.

1. **Destroying Google Maps instance never frees up memory.** This is a long standing issue within the Google Maps Javascript Library. This meant that after visiting the page, around 600MB of memory was never freed. The issue was first reported in Google’s Bug Tracker in 2011 and the latest comment in that was in February 2023! A 12 year old bug!
2. **A line consists of three drawings.** A “trip line” should ideally be one stroke, but here we were making three drawings. One `Polyline`, and two `Markers`. Somehow, drawing the marker seems to be slower and hogs up the resources.
3. **The `Polylines` could be made into an Overlay.** Instead of creating the classes inside the Google Maps, we can make a separate `Polyline` component and handle all it’s memory issues there.

### The fix for Google Maps memory leak

---

![Untitled](https://thisdot.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Feb53edbf-045d-426c-aa09-d626c2816f18%2Ff108918c-c184-41f9-b6a7-2af7273ea800%2FUntitled.png?table=block&id=80c8accc-556f-495f-813f-82e5ae28c497&spaceId=eb53edbf-045d-426c-aa09-d626c2816f18&width=2000&userId=&cache=v2)

But we can try to Introduce a function to manually delete all of Google Map’s event listeners.

```jsx
// Helper function: Removes all event listeners registered with Google's addDomListener function,
// including from __e3_ properties on target objects.
function removeAllGoogleListeners(target, event) {
  var listeners = target["__e3_"];
  if (!listeners) {
    console.warn(
      "Couldn't find property __e3_ containing Google Maps listeners. Perhaps Google updated the Maps SDK?"
    );
    return;
  }
  var evListeners = listeners[event];
  if (evListeners) {
    for (var key in evListeners) {
      if (evListeners.hasOwnProperty(key)) {
        google.maps.event.removeListener(evListeners[key]);
      }
    }
  }
}

// Removes all DOM listeners for the given target and event.
function removeAllDOMListeners(target, event) {
  var listeners = target["__listeners_"];
  if (!listeners || !listeners.length) {
    return;
  }

  // Copy to avoid iterating over array that we mutate via removeEventListener
  var copy = listeners.slice(0);
  for (var i = 0; i < copy.length; i++) {
    target.removeEventListener(event, copy[i]);
  }
}

// Shim addEventListener to capture and store registered event listeners.
var addEventListener = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function () {
  var eventName = arguments[0];
  var listener = arguments[1];
  if (!this["__listeners_"]) {
    this.__listeners_ = {};
  }
  var listeners = this.__listeners_;
  if (!listeners[eventName]) {
    listeners[eventName] = [];
  }
  listeners[eventName].push(listener);
  return addEventListener.apply(this, arguments);
};
var removeEventListener = EventTarget.prototype.removeEventListener;
EventTarget.prototype.removeEventListener = function () {
  var eventName = arguments[0];
  var listener = arguments[1];
  if (this["__listeners_"] && this.__listeners_[eventName]) {
    // Loop because the same listener may be added twice with different
    // options, and because our simple addEventListener shim doesn't
    // check for duplicates.
    while (true) {
      var i = this.__listeners_[eventName].indexOf(listener);
      if (i === -1) {
        break;
      }
      this.__listeners_[eventName].splice(i, 1);
    }
  }
  return removeEventListener.apply(this, arguments);
};

// After you remove the Google Map from the DOM, call this function to completely free the object.
export default function destroyGoogleMaps(window) {
  removeAllGoogleListeners(window, "blur");
  removeAllGoogleListeners(window, "resize");
  removeAllGoogleListeners(document, "click");
  removeAllGoogleListeners(document, "keydown");
  removeAllGoogleListeners(document, "keypress");
  removeAllGoogleListeners(document, "keyup");
  removeAllGoogleListeners(document, "MSFullscreenChange");
  removeAllGoogleListeners(document, "fullscreenchange");
  removeAllGoogleListeners(document, "mozfullscreenchange");
  removeAllGoogleListeners(document, "webkitfullscreenchange");
  // ASSUMPTION: No other library registers global resize and scroll event listeners! If this is not true, then you'll need to add logic to avoid removing these.
  removeAllDOMListeners(window, "resize");
  removeAllDOMListeners(window, "scroll");
}
```

Credit to this commenter: [https://issuetracker.google.com/issues/35821412#comment53](https://issuetracker.google.com/issues/35821412#comment53)

This resolves the memory issue to an extent.

![The flow observed is. Landing page → Page with Trips View → Page with another Google Map → Page without Google Map](https://thisdot.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Feb53edbf-045d-426c-aa09-d626c2816f18%2Ffe42a452-2cc2-427c-968f-82db2d143156%2FUntitled.png?table=block&id=0d8af477-8bce-4572-aab4-45dd1c0d31e0&spaceId=eb53edbf-045d-426c-aa09-d626c2816f18&width=1150&userId=&cache=v2)

The flow observed is. Landing page → Page with Trips View → Page with another Google Map → Page without Google Map

In Prod and Staging, the Page without Google Maps hogs up memory while introducing the memory cleanup in dev shows us that it requires way less memory!

### The fix for three drawings

---

This one happens to be very simple. While creating a `Polyline`, just specify an icon and set the `repeat` value as `100%`.

```jsx
new google.maps.Polyline({
  strokeColor: props.color,
  geodesic: true,
  strokeWeight: 3,
  icons: [
    {
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
      },
      repeat: "100%",
    },
  ],
});
```

We can even make the `icon` a `SymbolPath.FORWARD_PATH` (Reference: [https://developers.google.com/maps/documentation/javascript/reference/marker#SymbolPath](https://developers.google.com/maps/documentation/javascript/reference/marker#SymbolPath)) indicating the trip direction as well!

### Making the Polylines an Overlay

---

Now all of the computations happen inside the `onGoogleApiLoaded` method of `google-map-react`.

![Untitled](https://thisdot.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Feb53edbf-045d-426c-aa09-d626c2816f18%2Fc21921e8-55ab-43f5-988b-7b687e7d6640%2FUntitled.png?table=block&id=adc3f881-36c7-434c-8519-eefa45454bcc&spaceId=eb53edbf-045d-426c-aa09-d626c2816f18&width=2000&userId=&cache=v2)

First thing, we make this function do nothing but set a state called `map`. This is for us to later set the `PolyLine` on to the map.

`Polyline.js`

```jsx
import { useState } from "react";

import useDeepCompareEffect from "use-deep-compare-effect";

function pathsDiffer(path1, path2) {
  if (path1.getLength() != path2.length) return true;
  for (const [i, val] of path2.entries())
    if (path1.getAt(i).toJSON() != val) return true;
  return false;
}

export default function PolyLine(props) {
  const [polyline, setPolyline] = useState(null);

  useDeepCompareEffect(() => {
    // Create polyline after map initialized.
    if (!polyline && props.map) {
      setPolyline(
        new google.maps.Polyline({
          strokeColor: props.color,
          geodesic: true,
          strokeWeight: 3,
          icons: [
            {
              icon: {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
              },
              repeat: "100%",
            },
          ],
        })
      );
    }

    // Synchronize map polyline with component props.
    if (polyline && polyline.getMap() != props.map) polyline.setMap(props.map);
    if (polyline && pathsDiffer(polyline.getPath(), props.path))
      polyline.setPath(props.path);

    return () => {
      // Cleanup: remove line from map
      if (polyline) polyline.setMap(null);
    };
  }, [props, polyline]);

  return null;
}
```

Now inside the component,

![Untitled](https://thisdot.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Feb53edbf-045d-426c-aa09-d626c2816f18%2F06f2f061-7282-4b42-b7bf-05a516c6948a%2FUntitled.png?table=block&id=fb0f015d-24d0-4dda-b856-b0f1071b8920&spaceId=eb53edbf-045d-426c-aa09-d626c2816f18&width=2000&userId=&cache=v2)

Finally, as a sibling to `GoogleMapReact` we introduce the `Polyline` component.

![Untitled](https://thisdot.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Feb53edbf-045d-426c-aa09-d626c2816f18%2F1b6f3ecc-80c9-4b1e-8d59-243dc478a655%2FUntitled.png?table=block&id=fd6242dd-8dd0-4275-9be4-3c536257d5e6&spaceId=eb53edbf-045d-426c-aa09-d626c2816f18&width=770&userId=&cache=v2)

### Final Result

---

Maps look way more meaningful

![Untitled](https://thisdot.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Feb53edbf-045d-426c-aa09-d626c2816f18%2F31bb1d16-a928-4993-940d-dba7f906cfe8%2FUntitled.png?table=block&id=2614941e-393c-448d-b6cc-87fa477d10e6&spaceId=eb53edbf-045d-426c-aa09-d626c2816f18&width=2000&userId=&cache=v2)

The memory consumption which went from `500MB` to `367MB` after memory cleanup, went down to `140MB` after removing the marker drawings!
