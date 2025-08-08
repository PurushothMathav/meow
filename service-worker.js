const CACHE_NAME = 'kukufm-v0808251300';
const STATIC_CACHE = `${CACHE_NAME}-static`;
const DYNAMIC_CACHE = `${CACHE_NAME}-dynamic`;
const JSON_CACHE = `${CACHE_NAME}-json`;
const IMAGE_CACHE = `${CACHE_NAME}-images`;

// Cache TTL settings (in milliseconds)
const CACHE_TTL = {
  STATIC: 24 * 60 * 60 * 1000,    // 24 hours for static assets
  JSON: 6 * 60 * 60 * 1000,       // 6 hours for JSON files
  IMAGES: 7 * 24 * 60 * 60 * 1000, // 7 days for images
  DYNAMIC: 60 * 60 * 1000         // 1 hour for other dynamic content
};

// Files to cache immediately (core app files only)
const STATIC_ASSETS = [
  "/meow/",
  "/meow/index.html",
  "/meow/telugu.html",
  "/meow/malayalam.html",
  "/meow/kannada.html",
  "/meow/bengali.html",
  "/meow/hindi.html",
  "/meow/english.html",
  "/meow/tamilaudio.html",
  "/meow/manifest.json",
  "/meow/service-worker.js",
  "/meow/icons/favicon-48x48.png",
  "/meow/icons/favicon-72x72.png",
  "/meow/icons/favicon-96x96.png",
  "/meow/icons/favicon-144x144.png",
  "/meow/icons/favicon-192x192.png",
  "/meow/icons/favicon-512x512.png",
  "/meow/Meow_Watch_KUKU_TV_Free.png"
];

// Critical JSON files that should be cached immediately
const CRITICAL_JSON = [
  "/meow/master_tamil.json",
  "/meow/master_tamil_audio.json",
  "/meow/master_telugu.json",
  "/meow/master_malayalam.json",
  "/meow/master_kannada.json",
  "/meow/master_bengali.json",
  "/meow/master_hindi.json",
  "/meow/master_english.json"
];

// External resources to cache
const EXTERNAL_ASSETS = [
  'https://cdn.jsdelivr.net/npm/hls.js@latest',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Cache patterns
const CACHE_PATTERNS = {
  json: /\.json$/,
  images: /\.(jpg|jpeg|png|gif|webp|svg)$/,
  fonts: /\.(woff|woff2|ttf|eot)$/,
  videos: /\.(mp4|webm|m3u8|ts)$/,
  master: /master_\w+\.json$/,
  showData: /\/Tamil\/|\/Telugu\/|\/Malayalam\/|\/Kannada\/|\/Bengali\/|\/Hindi\/|\/English\//
};

// Install event
self.addEventListener('install', event => {
  console.log('[SW] Installing optimized service worker...');
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll([...STATIC_ASSETS, ...EXTERNAL_ASSETS]);
      }),
      // Pre-cache critical JSON files
      caches.open(JSON_CACHE).then(cache => {
        console.log('[SW] Pre-caching critical JSON files');
        return Promise.allSettled(
          CRITICAL_JSON.map(url => 
            fetch(url)
              .then(response => response.ok ? cache.put(url, response) : Promise.resolve())
              .catch(() => Promise.resolve()) // Don't fail install if JSON not found
          )
        );
      })
    ])
    .then(() => {
      console.log('[SW] Installation completed');
      return self.skipWaiting();
    })
    .catch(error => {
      console.error('[SW] Installation failed:', error);
    })
  );
});

// Activate event
self.addEventListener('activate', event => {
  console.log('[SW] Activating optimized service worker...');

  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return cacheName.startsWith('kukufm-') && 
                     ![STATIC_CACHE, DYNAMIC_CACHE, JSON_CACHE, IMAGE_CACHE].includes(cacheName);
            })
            .map(cacheName => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      // Take control immediately
      self.clients.claim()
    ])
    .then(() => {
      console.log('[SW] Service worker activated');
      // Notify clients about activation
      return self.clients.matchAll({ type: 'window' });
    })
    .then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'SW_ACTIVATED',
          message: 'Service worker ready'
        });
      });
    })
  );
});

// Fetch event with optimized caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  event.respondWith(handleOptimizedFetch(request));
});

// Optimized fetch handler
async function handleOptimizedFetch(request) {
  const url = new URL(request.url);
  
  try {
    // Strategy 1: Static assets - Cache First (long TTL)
    if (isStaticAsset(request) || isExternalAsset(request)) {
      return await cacheFirstWithTTL(request, STATIC_CACHE, CACHE_TTL.STATIC);
    }

    // Strategy 2: Master JSON files - Cache First with smart update
    if (CACHE_PATTERNS.master.test(url.pathname)) {
      return await smartJsonCache(request, JSON_CACHE, CACHE_TTL.JSON);
    }

    // Strategy 3: Show data JSON - Cache First with longer TTL
    if (CACHE_PATTERNS.json.test(url.pathname) && CACHE_PATTERNS.showData.test(url.pathname)) {
      return await cacheFirstWithTTL(request, JSON_CACHE, CACHE_TTL.JSON);
    }

    // Strategy 4: Other JSON files - Cache First
    if (CACHE_PATTERNS.json.test(url.pathname)) {
      return await cacheFirstWithTTL(request, DYNAMIC_CACHE, CACHE_TTL.DYNAMIC);
    }

    // Strategy 5: Images - Cache First with long TTL
    if (CACHE_PATTERNS.images.test(url.pathname)) {
      return await cacheFirstWithTTL(request, IMAGE_CACHE, CACHE_TTL.IMAGES);
    }

    // Strategy 6: Fonts - Cache First
    if (CACHE_PATTERNS.fonts.test(url.pathname) || 
        url.hostname.includes('googleapis') || 
        url.hostname.includes('gstatic')) {
      return await cacheFirstWithTTL(request, STATIC_CACHE, CACHE_TTL.STATIC);
    }

    // Strategy 7: Video streams - Network only (never cache)
    if (CACHE_PATTERNS.videos.test(url.pathname) || 
        url.pathname.includes('.m3u8') || 
        url.pathname.includes('.ts')) {
      return await networkOnly(request);
    }

    // Strategy 8: Same origin HTML - Network First with short cache
    if (url.origin === self.location.origin && url.pathname.endsWith('.html')) {
      return await networkFirstWithCache(request, DYNAMIC_CACHE, CACHE_TTL.DYNAMIC);
    }

    // Strategy 9: Everything else - Network First
    return await networkFirstWithCache(request, DYNAMIC_CACHE, CACHE_TTL.DYNAMIC);

  } catch (error) {
    console.error('[SW] Fetch error for', url.pathname, error);
    return await handleFetchError(request, error);
  }
}

// Cache First with TTL check
async function cacheFirstWithTTL(request, cacheName, ttl) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse && !isExpired(cachedResponse, ttl)) {
    // Valid cache hit - update in background for dynamic content
    if (cacheName !== STATIC_CACHE) {
      updateCacheInBackground(request, cache);
    }
    return cachedResponse;
  }
  
  // Cache miss or expired - fetch from network
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await putInCacheWithTimestamp(cache, request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Network failed - return stale cache if available
    if (cachedResponse) {
      console.log('[SW] Serving stale cache for', request.url);
      return cachedResponse;
    }
    throw error;
  }
}

// Smart JSON caching for master files
async function smartJsonCache(request, cacheName, ttl) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse && !isExpired(cachedResponse, ttl)) {
    // Check for updates in background
    checkForJsonUpdate(request, cache, cachedResponse);
    return cachedResponse;
  }
  
  // Fetch fresh data
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await putInCacheWithTimestamp(cache, request, networkResponse.clone());
      
      // Notify clients if this is an update
      if (cachedResponse) {
        notifyJsonUpdate(request.url);
      }
    }
    return networkResponse;
  } catch (error) {
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Network First with cache fallback
async function networkFirstWithCache(request, cacheName, ttl) {
  const cache = await caches.open(cacheName);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await putInCacheWithTimestamp(cache, request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse && !isExpired(cachedResponse, ttl * 2)) { // Allow stale for 2x TTL
      return cachedResponse;
    }
    throw error;
  }
}

// Network only strategy
async function networkOnly(request) {
  return await fetch(request);
}

// Helper functions
function isStaticAsset(request) {
  const url = new URL(request.url);
  return STATIC_ASSETS.some(asset => {
    return url.pathname === asset || url.href === asset;
  });
}

function isExternalAsset(request) {
  return EXTERNAL_ASSETS.includes(request.url);
}

function isExpired(response, ttl) {
  const cacheDate = response.headers.get('sw-cache-date');
  if (!cacheDate) return true; // No timestamp = expired
  
  const age = Date.now() - parseInt(cacheDate);
  return age > ttl;
}

async function putInCacheWithTimestamp(cache, request, response) {
  const headers = new Headers(response.headers);
  headers.set('sw-cache-date', Date.now().toString());
  
  const responseWithTimestamp = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers
  });
  
  return cache.put(request, responseWithTimestamp);
}

// Background cache update
async function updateCacheInBackground(request, cache) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await putInCacheWithTimestamp(cache, request, networkResponse);
      console.log('[SW] Background cache update for', request.url);
    }
  } catch (error) {
    console.log('[SW] Background update failed for', request.url);
  }
}

// Check for JSON updates
async function checkForJsonUpdate(request, cache, cachedResponse) {
  try {
    // Use HEAD request to check if file changed
    const headResponse = await fetch(request.url, { method: 'HEAD' });
    
    if (headResponse.ok) {
      const networkETag = headResponse.headers.get('etag');
      const cachedETag = cachedResponse.headers.get('etag');
      
      // If ETags differ or no ETag available, fetch full content
      if (!networkETag || !cachedETag || networkETag !== cachedETag) {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
          await putInCacheWithTimestamp(cache, request, networkResponse);
          notifyJsonUpdate(request.url);
        }
      }
    }
  } catch (error) {
    console.log('[SW] JSON update check failed for', request.url);
  }
}

// Notify clients about JSON updates
function notifyJsonUpdate(url) {
  self.clients.matchAll({ type: 'window' }).then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'JSON_UPDATED',
        url: url,
        timestamp: Date.now()
      });
    });
  });
}

// Handle fetch errors
async function handleFetchError(request, error) {
  const url = new URL(request.url);
  
  // Try to serve from any available cache
  const cacheNames = [STATIC_CACHE, JSON_CACHE, IMAGE_CACHE, DYNAMIC_CACHE];
  
  for (const cacheName of cacheNames) {
    try {
      const cache = await caches.open(cacheName);
      const cachedResponse = await cache.match(request);
      if (cachedResponse) {
        console.log('[SW] Serving from fallback cache:', cacheName);
        return cachedResponse;
      }
    } catch (cacheError) {
      console.log('[SW] Cache fallback failed:', cacheError);
    }
  }
  
  // If it's a page request and we have the main page cached
  if (url.origin === self.location.origin && 
      (url.pathname.endsWith('.html') || url.pathname === '/meow/')) {
    try {
      const cache = await caches.open(STATIC_CACHE);
      const fallback = await cache.match('/meow/index.html');
      if (fallback) {
        return fallback;
      }
    } catch (fallbackError) {
      console.log('[SW] Fallback page failed:', fallbackError);
    }
  }
  
  // Return offline response
  return new Response(
    JSON.stringify({ 
      error: 'Offline', 
      message: 'Content not available offline',
      timestamp: Date.now()
    }), 
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

// Message handling
self.addEventListener('message', event => {
  const { type, data } = event.data || {};

  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'GET_CACHE_INFO':
      getCacheInfo().then(info => {
        event.ports[0]?.postMessage(info);
      });
      break;
      
    case 'CLEAR_CACHE':
      clearSpecificCache(data?.cacheName || data?.pattern);
      break;
      
    case 'PRELOAD_SECTION':
      preloadSectionData(data?.language, data?.sectionFiles);
      break;
      
    case 'PREFETCH_SHOWS':
      prefetchShows(data?.urls);
      break;
  }
});

// Get cache information
async function getCacheInfo() {
  const cacheNames = await caches.keys();
  const info = { totalSize: 0, caches: {} };
  
  for (const cacheName of cacheNames) {
    if (cacheName.startsWith('kukufm-')) {
      try {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        info.caches[cacheName] = {
          size: keys.length,
          urls: keys.map(req => req.url).slice(0, 10) // First 10 URLs only
        };
        info.totalSize += keys.length;
      } catch (error) {
        console.error('[SW] Error getting cache info for', cacheName, error);
      }
    }
  }
  
  return info;
}

// Clear specific cache
async function clearSpecificCache(pattern) {
  if (!pattern) {
    // Clear all kukufm caches
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames
        .filter(name => name.startsWith('kukufm-'))
        .map(name => caches.delete(name))
    );
    return;
  }
  
  // Clear specific cache by name
  if (typeof pattern === 'string') {
    await caches.delete(pattern);
  }
}

// Preload section data
async function preloadSectionData(language, sectionFiles) {
  if (!language || !sectionFiles?.length) return;
  
  const cache = await caches.open(JSON_CACHE);
  const preloadPromises = sectionFiles.slice(0, 20).map(async (url) => { // Limit to 20 files
    try {
      const response = await fetch(url);
      if (response.ok) {
        await putInCacheWithTimestamp(cache, new Request(url), response);
      }
    } catch (error) {
      console.log('[SW] Preload failed for', url);
    }
  });
  
  await Promise.allSettled(preloadPromises);
  console.log(`[SW] Preloaded ${sectionFiles.length} files for ${language}`);
}

// Prefetch popular shows
async function prefetchShows(urls) {
  if (!urls?.length) return;
  
  const cache = await caches.open(JSON_CACHE);
  const prefetchPromises = urls.slice(0, 10).map(async (url) => { // Limit to 10 shows
    try {
      if (!(await cache.match(url))) { // Only if not already cached
        const response = await fetch(url);
        if (response.ok) {
          await putInCacheWithTimestamp(cache, new Request(url), response);
        }
      }
    } catch (error) {
      console.log('[SW] Prefetch failed for', url);
    }
  });
  
  await Promise.allSettled(prefetchPromises);
}

// Periodic cleanup
setInterval(async () => {
  try {
    const cacheNames = await caches.keys();
    for (const cacheName of cacheNames) {
      if (cacheName.startsWith('kukufm-')) {
        await cleanExpiredEntries(cacheName);
      }
    }
  } catch (error) {
    console.error('[SW] Cleanup failed:', error);
  }
}, 6 * 60 * 60 * 1000); // Every 6 hours

// Clean expired entries from cache
async function cleanExpiredEntries(cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    let cleanedCount = 0;
    
    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const ttl = cacheName.includes('static') ? CACHE_TTL.STATIC :
                   cacheName.includes('json') ? CACHE_TTL.JSON :
                   cacheName.includes('images') ? CACHE_TTL.IMAGES :
                   CACHE_TTL.DYNAMIC;
        
        if (isExpired(response, ttl * 2)) { // Delete after 2x TTL
          await cache.delete(request);
          cleanedCount++;
        }
      }
    }
    
    if (cleanedCount > 0) {
      console.log(`[SW] Cleaned ${cleanedCount} expired entries from ${cacheName}`);
    }
  } catch (error) {
    console.error('[SW] Failed to clean expired entries from', cacheName, error);
  }
}

console.log('[SW] Optimized service worker loaded');