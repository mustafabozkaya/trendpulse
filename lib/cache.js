// Production-ready in-memory cache with TTL
// No Redis needed — keeps it simple for MVP, fast for Vercel

const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 dakika
const MAX_CACHE_SIZE = 200;

function evictIfNeeded() {
  if (cache.size >= MAX_CACHE_SIZE) {
    const oldest = [...cache.entries()].sort(
      ([, a], [, b]) => a.timestamp - b.timestamp
    )[0];
    if (oldest) cache.delete(oldest[0]);
  }
}

export function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

export function setCache(key, data) {
  evictIfNeeded();
  cache.set(key, { data, timestamp: Date.now() });
}

export function clearCache() {
  cache.clear();
}
