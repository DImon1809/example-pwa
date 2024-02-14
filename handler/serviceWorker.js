const nameCache = "cache-v1";
const nameCacheTwo = "cache-v2";

const assesCache = [
  "/",
  "/offline.html",
  "./style.css",
  "./manifest.json",
  "./serviceWorker.js",
  "./icon192.png",
  "./icon512.png",
  "./script.js",
];

self.addEventListener("install", async (event) => {
  try {
    const cache = await caches.open(nameCache);
    await cache.addAll(assesCache);
  } catch (err) {
    console.error(err);
  }
});

self.addEventListener("activate", async (event) => {
  try {
    const cacheKeys = await caches.keys();

    await Promise.all(
      cacheKeys
        .filter((name) => name !== nameCache)
        .map((name) => caches.delete(name))
    );
  } catch (err) {
    console.error(err);
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  const url = new URL(request.url);

  if (url.origin === location.origin) {
    return event.respondWith(cacheFirst(event.request));
  }

  return event.respondWith(networkFirst(request));
});

const cacheFirst = async (request) => {
  try {
    const cached = await caches.match(request);

    return cached ?? (await fetch(request));
  } catch (err) {
    console.error(err);
  }
};

const networkFirst = async (request) => {
  const cache = await caches.open(nameCacheTwo);

  try {
    const response = await fetch(request);

    await cache.put(response, response);

    return response;
  } catch (err) {
    const cached = await cache.match(request);

    return cached ?? (await cache.match("/offline.html"));
  }
};
