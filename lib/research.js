// TrendPulse — Research Engine v4
// TDD-verified: each source tested individually
// English-only codebase — never translate code/docs

const TIMEOUT = 10000;

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeout || TIMEOUT);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timeout);
  }
}

// Exported for cross-module use (e.g. research-x.js fallback)
export async function webSearch(query, limit = 5) {
  try {
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const res = await fetchWithTimeout(url, { timeout: 8000 });
    const html = await res.text();
    const results = [];
    // Parse DDG result links
    const linkRegex = /<a[^>]*class="result__a"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
    let match;
    while ((match = linkRegex.exec(html)) !== null && results.length < limit) {
      const urlStr = match[1].replace(/\/\/duckduckgo\.com\/l\/\?uddg=([^&]+)/, (_, u) => decodeURIComponent(u));
      const title = match[2].replace(/<[^>]+>/g, '').trim();
      if (title && urlStr.startsWith('http')) {
        results.push({ title, url: urlStr, source: 'web' });
      }
    }
    return results;
  } catch (e) {
    return [];
  }
}

// ─── Reddit (Atom feed — no auth) ───────────────────────────
export async function searchReddit(query) {
  const results = [];
  try {
    const url = `https://www.reddit.com/r/all/search.rss?q=${encodeURIComponent(query)}&sort=new&t=month&limit=10`;
    const res = await fetchWithTimeout(url, {
      headers: { 'User-Agent': 'TrendPulse/1.0' },
      timeout: 10000,
    });
    const xml = await res.text();

    // Reddit uses Atom format: <entry> tags, not <item>
    const entryRegex = /<entry>[\s\S]*?<title>([^<]*)<\/title>[\s\S]*?<link[^>]*href="([^"]*)"[\s\S]*?<author>[\s\S]*?<name>([^<]*)<\/name>[\s\S]*?<\/entry>/gi;
    let match;
    while ((match = entryRegex.exec(xml)) !== null && results.length < 10) {
      const title = match[1].trim();
      const link = match[2].trim();
      const author = match[3].trim();
      const subMatch = link.match(/reddit\.com\/r\/([^/]+)/);
      const subreddit = subMatch ? `r/${subMatch[1]}` : 'r/all';
      if (title && link.startsWith('http')) {
        results.push({ title, url: link, source: 'reddit', subreddit, author });
      }
    }
  } catch (e) {
    // silent
  }
  return results;
}

// ─── Hacker News (Algolia API) ───────────────────────────────
export async function searchHN(query) {
  const results = [];
  try {
    const url = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&hitsPerPage=10&tags=story`;
    const res = await fetchWithTimeout(url, { timeout: 8000 });
    const data = await res.json();
    const hits = data?.hits || [];
    for (const hit of hits.slice(0, 10)) {
      results.push({
        title: hit.title,
        url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
        source: 'hackernews',
        score: hit.points,
        comments: hit.num_comments,
        author: hit.author,
      });
    }
  } catch (e) {
    // silent
  }
  return results;
}

// ─── YouTube (Invidious/Piped — no API key) ─────────────────
export async function searchYouTube(query) {
  const results = [];
  const instances = [
    'https://inv.thepixora.com',
    'https://pipedapi.kavin.rocks',
    'https://invidious.private.coffee',
    'https://youtube.076.ne.jp',
  ];
  for (const instance of instances) {
    try {
      const url = `${instance}/api/v1/search?q=${encodeURIComponent(query)}&type=video&sort=date&limit=5`;
      const res = await fetchWithTimeout(url, { timeout: 5000 });
      if (!res.ok) continue;
      const text = await res.text();
      if (!text.startsWith('[') && !text.startsWith('{')) continue;
      const data = JSON.parse(text);
      const videos = Array.isArray(data) ? data : (data.items || data.videos || []);
      for (const v of videos.slice(0, 5)) {
        const videoId = v.videoId || v.url?.match(/v=([^&]+)/)?.[1];
        if (!videoId) continue;
        results.push({
          title: v.title,
          url: `https://youtube.com/watch?v=${videoId}`,
          source: 'youtube',
          views: v.viewCount || 0,
          channel: v.author || v.channel || '',
        });
      }
      if (results.length > 0) break;
    } catch (e) {
      continue;
    }
  }
  return results;
}

// ─── Polymarket (CLOB API — no auth) ────────────────────────
export async function searchPolymarket(query) {
  const results = [];
  try {
    const url = `https://clob.polymarket.com/markets?tag=${encodeURIComponent(query.toLowerCase())}&limit=5`;
    const res = await fetchWithTimeout(url, { timeout: 8000 });
    const data = await res.json();
    const markets = Array.isArray(data) ? data.slice(0, 5) : (data?.data || []).slice(0, 5);
    for (const m of markets) {
      results.push({
        title: m.question || m.title || m.name || '',
        url: `https://polymarket.com/event/${m.conditionId || m.id || ''}`,
        source: 'polymarket',
        volume: m.volume || m.volume_24h || 0,
      });
    }
  } catch (e) {
    // silent
  }
  return results;
}

// ─── GitHub (Search API — unauthenticated) ──────────────────
export async function searchGitHub(query) {
  const results = [];
  try {
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=updated&per_page=5`;
    const res = await fetchWithTimeout(url, {
      headers: { 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'TrendPulse/1.0' },
      timeout: 8000,
    });
    const data = await res.json();
    const repos = data?.items || [];
    for (const repo of repos.slice(0, 5)) {
      results.push({
        title: repo.full_name,
        url: repo.html_url,
        source: 'github',
        stars: repo.stargazers_count,
        description: repo.description?.slice(0, 120) || '',
        language: repo.language || '',
      });
    }
  } catch (e) {
    // silent
  }
  return results;
}

// ─── Bluesky (AT Protocol — 403 in some regions) ───────────
export async function searchBluesky(query) {
  const results = [];
  const endpoints = [
    `https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts?q=${encodeURIComponent(query)}&limit=5`,
    `https://bsky.social/xrpc/app.bsky.feed.searchPosts?q=${encodeURIComponent(query)}&limit=5`,
  ];
  for (const url of endpoints) {
    try {
      const res = await fetchWithTimeout(url, { timeout: 6000 });
      if (!res.ok) continue;
      const data = await res.json();
      const posts = data?.posts || [];
      for (const p of posts.slice(0, 5)) {
        results.push({
          title: p.record?.text?.slice(0, 120) || '',
          url: `https://bsky.app/profile/${p.author?.did || ''}/post/${p.uri?.split('/').pop() || ''}`,
          source: 'bluesky',
          likes: p.likeCount || 0,
          author: p.author?.displayName || p.author?.handle || '',
        });
      }
      if (results.length > 0) break;
    } catch (e) {
      continue;
    }
  }
  return results;
}

// ─── Main Function ──────────────────────────────────────────
export async function researchTrend(topic, options = {}) {
  const {
    includeReddit = true,
    includeHN = true,
    includeYouTube = true,
    includePolymarket = true,
    includeGitHub = true,
    includeBluesky = false,
    includeX = false,
    xAccessToken = null,
  } = options;

  const startTime = Date.now();

  const [redditResults, hnResults, ytResults, polyResults, ghResults, bskyResults, xResults] =
    await Promise.all([
      includeReddit ? searchReddit(topic).catch(() => []) : [],
      includeHN ? searchHN(topic).catch(() => []) : [],
      includeYouTube ? searchYouTube(topic).catch(() => []) : [],
      includePolymarket ? searchPolymarket(topic).catch(() => []) : [],
      includeGitHub ? searchGitHub(topic).catch(() => []) : [],
      includeBluesky ? searchBluesky(topic).catch(() => []) : [],
      includeX ? (await import('./research-x.js')).searchX({ query: topic, accessToken: xAccessToken, limit: 10 }).catch(() => []) : [],
    ]);

  const elapsed = Date.now() - startTime;
  const totalResults =
    redditResults.length + hnResults.length + ytResults.length +
    polyResults.length + ghResults.length + bskyResults.length + xResults.length;

  return {
    topic,
    timestamp: new Date().toISOString(),
    duration: elapsed,
    summary: {
      total: totalResults,
      reddit: redditResults.length,
      hackernews: hnResults.length,
      youtube: ytResults.length,
      polymarket: polyResults.length,
      github: ghResults.length,
      bluesky: bskyResults.length,
      x: xResults.length,
    },
    sources: {
      reddit: redditResults,
      hackernews: hnResults,
      youtube: ytResults,
      polymarket: polyResults,
      github: ghResults,
      x: xResults,
    },
  };
}
