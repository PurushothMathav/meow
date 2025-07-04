const CACHE_NAME = 'kukufm-v0407251800';
const STATIC_CACHE = `${CACHE_NAME}-static`;
const DYNAMIC_CACHE = `${CACHE_NAME}-dynamic`;
const UPDATE_CHECK_INTERVAL = 30000;

// Files to cache immediately
const STATIC_ASSETS = [
  "/meow/",
  "/meow/index.html",
  "/meow/telugu.html",
  "/meow/malayalam.html",
  "/meow/kannada.html",
  "/meow/bengali.html",
  "/meow/hindi.html",
  "/meow/english.html",
  "/meow/audio.html",
  "/meow/manifest.json",
  "/meow/service-worker.js",
  "/meow/icons/favicon-48x48.png",
  "/meow/icons/favicon-72x72.png",
  "/meow/icons/favicon-96x96.png",
  "/meow/icons/favicon-144x144.png",
  "/meow/icons/favicon-192x192.png",
  "/meow/icons/favicon-512x512.png",
  'https://cdn.jsdelivr.net/npm/hls.js@latest',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Dynamic cache patterns
const CACHE_PATTERNS = {
  json: /\.json$/,
  images: /\.(jpg|jpeg|png|gif|webp|svg)$/,
  fonts: /\.(woff|woff2|ttf|eot)$/,
  videos: /\.(mp4|webm|m3u8|ts)$/
};

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully');
        // Force activation immediately
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
});

// Activate event - clean up old caches and claim clients
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...');

  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return cacheName.startsWith('kukufm-') && 
                     cacheName !== STATIC_CACHE && 
                     cacheName !== DYNAMIC_CACHE;
            })
            .map(cacheName => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      // Take control of all clients immediately
      self.clients.claim()
    ])
    .then(() => {
      console.log('[SW] Service worker activated and ready');
      // Force reload of all clients to ensure they use the new service worker
      return self.clients.matchAll({ type: 'window' });
    })
    .then(clients => {
      clients.forEach(client => {
        // Send update message to client
        client.postMessage({
          type: 'SW_UPDATED',
          message: 'Service worker updated - reloading content'
        });
        
        // Force reload the client to ensure new service worker takes control
        client.navigate(client.url);
      });
    })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  event.respondWith(handleFetch(request));
});

// Handle fetch requests with appropriate caching strategy
async function handleFetch(request) {
  const url = new URL(request.url);
  
  try {
    // Strategy 1: Static assets - Cache First
    if (isStaticAsset(request)) {
      return await cacheFirst(request, STATIC_CACHE);
    }
	
    // Strategy 2: JSON files - Network First (CHANGED from cacheFirst)
    if (CACHE_PATTERNS.json.test(url.pathname)) {
      return await networkFirstWithUpdate(request, DYNAMIC_CACHE); 
    }

    // Strategy 3: Images - Cache First with network fallback
    if (CACHE_PATTERNS.images.test(url.pathname)) {
      return await cacheFirst(request, DYNAMIC_CACHE);
    }

    // Strategy 4: Fonts - Cache First
    if (CACHE_PATTERNS.fonts.test(url.pathname) || url.hostname.includes('googleapis') || url.hostname.includes('gstatic')) {
      return await cacheFirst(request, STATIC_CACHE);
    }

    // Strategy 5: Video streams - Network only (don't cache)
    if (CACHE_PATTERNS.videos.test(url.pathname) || url.pathname.includes('.m3u8') || url.pathname.includes('.ts')) {
      return await networkOnly(request);
    }

    // Strategy 6: Same origin - Network First
    if (url.origin === self.location.origin) {
      return await networkFirstWithUpdate(request, DYNAMIC_CACHE);
    }

    // Strategy 7: External resources - Network First
    return await networkFirst(request, DYNAMIC_CACHE);

  } catch (error) {
    console.error('[SW] Fetch error:', error);
    
    // Return offline fallback if available
    if (url.origin === self.location.origin) {
      const cache = await caches.open(STATIC_CACHE);
      const cachedResponse = await cache.match('/meow/index.html'); // Fixed path
      return cachedResponse || new Response('Offline', { status: 503 });
    }
    
    throw error;
  }
}

// Check if request is for static assets
function isStaticAsset(request) {
  const url = new URL(request.url);
  return STATIC_ASSETS.some(asset => {
    if (typeof asset === 'string') {
      return url.pathname === asset || url.href === asset;
    }
    return false;
  });
}

// Cache First Strategy with TTL check
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Check if cache is stale (older than 1 hour for dynamic content)
    const cacheDate = cachedResponse.headers.get('sw-cache-date');
    const isStale = cacheDate && (Date.now() - parseInt(cacheDate)) > 3600000; // 1 hour
    
    if (!isStale || cacheName === STATIC_CACHE) {
      // Update cache in background for dynamic content
      if (cacheName === DYNAMIC_CACHE) {
        updateCacheInBackground(request, cache);
      }
      return cachedResponse;
    }
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Add cache timestamp
      const responseToCache = networkResponse.clone();
      const headers = new Headers(responseToCache.headers);
      headers.set('sw-cache-date', Date.now().toString());
      
      const cachedResponse = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers
      });
      
      cache.put(request, cachedResponse);
    }
    return networkResponse;
  } catch (error) {
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Network First Strategy
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      const responseToCache = networkResponse.clone();
      const headers = new Headers(responseToCache.headers);
      headers.set('sw-cache-date', Date.now().toString());
      
      const cachedResponse = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers
      });
      
      cache.put(request, cachedResponse);
    }
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Network First with Update Strategy
async function networkFirstWithUpdate(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone();
      const headers = new Headers(responseToCache.headers);
      headers.set('sw-cache-date', Date.now().toString());
      
      const cachedResponse = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers
      });
      
      cache.put(request, cachedResponse);
      
      // Notify clients about updated content
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach(client => {
        client.postMessage({
          type: 'CONTENT_UPDATED',
          url: request.url
        });
      });
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Network Only Strategy
async function networkOnly(request) {
  return await fetch(request);
}

// Update cache in background
async function updateCacheInBackground(request, cache) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone();
      const headers = new Headers(responseToCache.headers);
      headers.set('sw-cache-date', Date.now().toString());
      
      const cachedResponse = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers
      });
      
      await cache.put(request, cachedResponse);
      
      // Notify clients about background update
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach(client => {
        client.postMessage({
          type: 'CACHE_UPDATED',
          url: request.url
        });
      });
    }
  } catch (error) {
    console.log('[SW] Background update failed:', error);
  }
}

// Handle messages from clients
self.addEventListener('message', event => {
  const { type, data } = event.data;

  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'CHECK_UPDATE':
      checkForUpdates();
      break;
      
    case 'CLEAR_CACHE':
      clearCache(data?.cacheName);
      break;
      
    case 'FORCE_UPDATE':
      // Force update and reload
      self.skipWaiting();
      break;
      
    case 'GET_CACHE_INFO':
      getCacheInfo().then(info => {
        event.ports[0].postMessage(info);
      });
      break;
  }
});

// Enhanced update checking
let updateCheckInterval;

function startUpdateCheck() {
  updateCheckInterval = setInterval(async () => {
    await checkForUpdates();
  }, UPDATE_CHECK_INTERVAL);
}

function stopUpdateCheck() {
  if (updateCheckInterval) {
    clearInterval(updateCheckInterval);
    updateCheckInterval = null;
  }
}

async function checkForUpdates() {
  try {
    const registration = await self.registration;
    await registration.update();
    
    // If there's a waiting service worker, notify clients
    if (registration.waiting) {
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach(client => {
        client.postMessage({
          type: 'SW_UPDATE_AVAILABLE',
          message: 'New version available'
        });
      });
    }
  } catch (error) {
    console.log('[SW] Update check failed:', error);
  }
}

// Clear specific cache
async function clearCache(cacheName) {
  if (cacheName) {
    await caches.delete(cacheName);
  } else {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames
        .filter(name => name.startsWith('kukufm-'))
        .map(name => caches.delete(name))
    );
  }
}

// Get cache information
async function getCacheInfo() {
  const cacheNames = await caches.keys();
  const info = {};
  
  for (const cacheName of cacheNames) {
    if (cacheName.startsWith('kukufm-')) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      info[cacheName] = {
        size: keys.length,
        urls: keys.map(req => req.url)
      };
    }
  }
  
  return info;
}

// Start periodic update checks
startUpdateCheck();

// Background sync for failed requests (if supported)
if ('sync' in self.registration) {
  self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
      event.waitUntil(doBackgroundSync());
    }
  });
}

async function doBackgroundSync() {
  console.log('[SW] Background sync triggered');
}

// Push notifications
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/meow/icons/favicon-192x192.png', // Fixed path
      badge: '/meow/icons/favicon-72x72.png',  // Fixed path
      actions: data.actions,
      data: data.data
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then(clients => {
      if (clients.length > 0) {
        return clients[0].focus();
      }
      return self.clients.openWindow('/meow/');
    })
  );
});

console.log('[SW] Service worker script loaded');