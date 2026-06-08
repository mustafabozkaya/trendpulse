// Simple in-memory rate limiter
// No Redis needed — works per-Vercel-instance (sufficient for MVP)

const rateMap = new Map();
const WINDOW_MS = 60 * 1000; // 1 dakika
const MAX_REQUESTS = 10;     // 10 istek/dakika/IP

export function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    rateMap.set(ip, { windowStart: now, count: 1 });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (entry.count >= MAX_REQUESTS) {
    const resetIn = Math.ceil((WINDOW_MS - (now - entry.windowStart)) / 1000);
    return { allowed: false, remaining: 0, resetIn };
  }

  entry.count++;
  return { allowed: true, remaining: MAX_REQUESTS - entry.count };
}

// Cleanup stale entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of rateMap) {
      if (now - entry.windowStart > WINDOW_MS) rateMap.delete(ip);
    }
  }, 5 * 60 * 1000);
}
