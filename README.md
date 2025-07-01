# Meow - Stream Anywhere 🎬

**Meow** is a lightweight, PWA-enabled multilingual streaming UI designed to deliver an optimized, offline-ready experience for users who want to enjoy shows in different Indian languages.

## 🌐 Demo Pages

Each page corresponds to a different language and presents its own list of shows:
- [index.html](./index.html) – Home (Tamil Shows) / Root
- [english.html](./english.html) – English Shows
- [hindi.html](./hindi.html) – Hindi Shows
- [bengali.html](./bengali.html) – Bengali Shows
- [kannada.html](./kannada.html) – Kannada Shows
- [malayalam.html](./malayalam.html) – Malayalam Shows
- [telugu.html](./telugu.html) – Telugu Shows

## 📦 Features

- ⚡️ Fast load times with service-worker-based caching
- 📱 Fully responsive and mobile-first layout
- 🔎 Integrated search
- 📂 “Continue Watching” feature per language
- 🗂 JSON-based content loading
- 🌙 Dark-themed UI
- 📲 PWA-ready via `manifest.json` and `service-worker.js`
- ✋ Swipe-only episode navigation (single-tap no longer changes episode)
- 🆕 Auto-update prompt when new service worker is available
- 🧠 Intelligent caching strategies (network-first JSON, cache-first static)

## 📁 Project Structure

```
.
├── index.html
├── english.html
├── hindi.html
├── bengali.html
├── kannada.html
├── malayalam.html
├── telugu.html
├── manifest.json
├── service-worker.js
└── /meow/icons/
```

## ⚙️ How It Works

- All static pages share a consistent layout and style.
- Content is loaded dynamically from language-specific JSON files.
- A service worker (`service-worker.js`) caches:
  - HTML pages
  - Fonts, icons, and HLS.js script
  - Manifest and images
- Manifest enables installability on mobile and desktop.
- Auto-update logic notifies the user and reloads the app in place.
- Background cache updates notify clients silently or visually.

## 🚀 How to Run Locally

```bash
# 1. Serve files using any static server
python -m http.server 8080
```

> ⚠️ Make sure your paths are correct (`/meow/...`) or update them if serving from root (`./`).

## 📄 manifest.json Highlights

- Name: `Meow - Stream Anywhere`
- Categories: `entertainment`, `multimedia`
- PWA shortcuts: Continue Watching, Browse Shows
- Offline screenshots and install support

## 🔧 Service Worker Strategies

- `Cache First` for:
  - Static HTML
  - Fonts
  - Icons
  - Images
- `Network First` for:
  - JSON show data (with background updates)
- `Network Only` for:
  - HLS and video stream files
- Periodic update check every 30 seconds
- Push notification & sync support included
- Auto-prompts user when a new version is available

## 📌 To-Do / Improvements

- ✅ Unified language menu across all pages
- ✅ Service worker with auto-update and messaging
- ✅ Swipe-only episode switching (disable single tap change)
- ⏳ Offline playback support
- ⏳ UI improvements and animations
- ⏳ Analytics & error reporting

## 📝 Changelog

### [v1.1.1] – 2025-07-01

- ✋ Disabled single-tap episode switching to avoid accidental changes
- 🚀 Added advanced service worker update logic with:
  - Update prompts
  - Background cache refresh
  - Periodic update polling
- ✅ `FORCE_UPDATE`, `CLEAR_CACHE`, and `GET_CACHE_INFO` message handlers added
- ✅ New toast and notification UI for update status
- 📦 Improved caching logic for dynamic and static assets

---

## 📃 License

MIT © [Purushoth Mathav](https://github.com/PurushothMathav/meow)