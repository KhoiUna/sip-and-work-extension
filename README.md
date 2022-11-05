# Sip & Work

#### Video Demo: [YouTube Video Demo](https://youtu.be/bzH3qinnkpk)

#### Description:

- A Chrome extension that helps you stay hydrated while working by reminding you to take a sip of water every 15 minutes
- The extension has a timer for users to know how long they have been working.

- **Details:**

  `manifest.json` contains the metadata of the Chrome extension, like the icon of the extension, permissions declaration, what background script to run, etc. It uses [**Manifest V3**](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/), which focuses on the three pillars of that vision: privacy, security, and performance, while preserving and improving our foundation of capability and webbiness. There are a number of new features and functional changes for extensions using Manifest V3: service workers replace background pages; Network request modification is now handled with the new declarativeNetRequest API; Remotely hosted code is no longer allowed, an extension can only execute JavaScript that is included within its package; Promise support has been added to many methods, though callbacks are still supported as an alternative. (We will eventually support promises on all appropriate methods).

  `/popup` folder is the user interface of the extension. `/popup/popup.html` is the HTML for the popup. `/popup/popup.css` is the styling for the popup. `/popup/popup.js` adds interactivity to the popup, also communicates with `background.js` through [`chrome.*` API](https://developer.chrome.com/docs/extensions/reference/).

  `/images` holds different sizes of icon's image for displaying on various location (like the Extension Manager, etc.). _One or more icons that represent the extension, app, or theme. You should always provide a 128x128 icon; it's used during installation and by the Chrome Web Store. Extensions should also provide a 48x48 icon, which is used in the extensions management page (chrome://extensions). You can also specify a 16x16 icon to be used as the favicon for an extension's pages_ ([Source here](https://developer.chrome.com/docs/extensions/mv2/manifest/icons/)).

  `background.js` is a service worker or a script running in the background that communicates with `/popup/popup.js` so that when user clicks out of the extension the timer still runs. _Service worker is a script that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page or user interaction_ ([Source here](https://developer.chrome.com/docs/extensions/mv3/migrating_to_service_workers/)). A background service worker is loaded when it is needed, and unloaded when it goes idle. Some examples include: the extension is first installed or updated to a new version; the background page was listening for an event, and the event is dispatched; a content script or other extension sends a message; another view in the extension, such as a popup, calls `runtime.getBackgroundPage`.
