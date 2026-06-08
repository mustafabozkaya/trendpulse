// TrendPulse — Research Engine
// last30days konseptinin web versiyonu: çoklu kaynaktan trend verisi toplar

const TIMEOUT = 8000;
const MAX_RETRIES = 2;

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timeout);
  }
}

// ─── Web Search (DuckDuckGo HTML scrape) ───
async function searchWeb(query) {
  const results = [];
  try {
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query + ' after:2026-05-09')}`;
    const res = await fetchWithTimeout(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    const html = await res.text();

    // Parse DDG results
    const linkMatches = html.match(/<a[^>]*class="result__a"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi) || [];
    for (const match of linkMatches.slice(0, 8)) {
      const hrefMatch = match.match(/href="([^"]*)"/);
      const titleMatch = match.match(/>([\s\S]*)<\/a>/);
      if (hrefMatch && titleMatch) {
        let url = hrefMatch[1];
        // DDG redirect URLs
        if (url.startsWith('//')) url = 'https:' + url;
        const title = titleMatch[1].replace(/<[^>]*>/g, '').trim();
        if (title && url.startsWith('http')) {
          results.push({ title, url, source: 'web' });
        }
      }
    }
  } catch (e) {
    // silent fail
  }
  return results;
}

// ─── Reddit Search ───
async function searchReddit(query) {
  const results = [];
  try {
    const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=new&t=month&limit=10`;
    const res = await fetchWithTimeout(url, {
      headers: { 'User-Agent': 'TrendPulse/1.0' }
    });
    const data = await res.json();
    const posts = data?.data?.children || [];
    for (const post of posts.slice(0, 10)) {
      const d = post.data;
      if (d.title) {
        results.push({
          title: d.title,
          url: `https://reddit.com${d.permalink}`,
          source: 'reddit',
          score: d.score,
          comments: d.num_comments,
          subreddit: d.subreddit_name_prefixed,
        });
      }
    }
  } catch (e) {
    // silent
  }
  return results;
}

// ─── Hacker News Search ───
async function searchHN(query) {
  const results = [];
  try {
    const url = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&hitsPerPage=10&tags=story`;
    const res = await fetchWithTimeout(url);
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

// ─── YouTube Search (via Invidious public instance - no API key needed) ───
async function searchYouTube(query) {
  const results = [];
  // Try multiple public invidious instances
  const instances = [
    'https://inv.vern.cc',
    'https://yewtu.be',
    'https://inv.nadeko.net',
  ];
  for (const instance of instances) {
    try {
      const url = `${instance}/api/v1/search?q=${encodeURIComponent(query)}&type=video&sort=date&limit=8`;
      const res = await fetchWithTimeout(url);
      if (!res.ok) continue;
      const data = await res.json();
      const videos = Array.isArray(data) ? data : [];
      for (const v of videos.slice(0, 8)) {
        results.push({
          title: v.title,
          url: `https://youtube.com/watch?v=${v.videoId}`,
          source: 'youtube',
          views: v.viewCount,
          length: v.lengthSeconds,
          channel: v.author,
        });
      }
      if (results.length > 0) break; // first working instance wins
    } catch (e) {
      continue;
    }
  }
  return results;
}

// ─── Ana research fonksiyonu ───
export async function researchTrend(topic, options = {}) {
  const { includeWeb = true, includeReddit = true, includeHN = true, includeYouTube = true } = options;

  const startTime = Date.now();

  // Tüm kaynakları paralel çek
  const [webResults, redditResults, hnResults, ytResults] = await Promise.all([
    includeWeb ? searchWeb(topic).catch(() => []) : [],
    includeReddit ? searchReddit(topic).catch(() => []) : [],
    includeHN ? searchHN(topic).catch(() => []) : [],
    includeYouTube ? searchYouTube(topic).catch(() => []) : [],
  ]);

  const elapsed = Date.now() - startTime;

  // Özet istatistikler
  const totalResults = webResults.length + redditResults.length + hnResults.length + ytResults.length;

  return {
    topic,
    timestamp: new Date().toISOString(),
    duration: elapsed,
    summary: {
      total: totalResults,
      web: webResults.length,
      reddit: redditResults.length,
      hackernews: hnResults.length,
      youtube: ytResults.length,
    },
    sources: {
      web: webResults,
      reddit: redditResults,
      hackernews: hnResults,
      youtube: ytResults,
    },
  };
}
