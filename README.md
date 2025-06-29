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

## 🚀 How to Run Locally

```bash
# 1. Serve files using any static server
python -m http.server { [Port_Number] = Optional }
```

Make sure your paths are correct (`/meow/...`) or update them if serving from the root.

## 📄 manifest.json Highlights

- Name: `Meow - Stream Anywhere`
- Categories: `entertainment`, `multimedia`
- PWA shortcuts: Continue Watching, Browse Shows
- Offline screenshots and install support

## 🔧 Service Worker Strategies

- `Cache First` for static assets (HTML, CSS, fonts)
- `Cache First` for JSON files
- `Network Only` for video streams
- Auto update check every 30 seconds

## 📌 To-Do / Improvements

- ✅ Unified language menu across all pages
- ⏳ Add language-based filtering of JSON dynamically
- ⏳ Offline playback support
- ⏳ UI improvements and animations
- ⏳ Analytics & error reporting

## 📃 License

MIT © [Purushoth Mathav](https://github.com/PurushothMathav/meow)
