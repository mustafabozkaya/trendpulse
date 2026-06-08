/**
 * X/Twitter search source for TrendPulse.
 *
 * Two modes:
 *   1. Authenticated — uses X API v2 (tweet search) via OAuth 2.0 Bearer token
 *   2. Fallback — searches X/Twitter via DuckDuckGo (site:twitter.com)
 */

const X_API_BASE = 'https://api.twitter.com/2';

/**
 * Search X/Twitter using the official API v2 (requires auth tokens).
 */
async function searchWithApi({ query, accessToken, limit = 10 }) {
  if (!accessToken) return null;

  try {
    const params = new URLSearchParams({
      query: `${query} lang:en -is:retweet`,
      'tweet.fields': 'created_at,public_metrics,author_id',
      'user.fields': 'username,name,profile_image_url',
      expansions: 'author_id',
      max_results: Math.min(limit, 10),
    });

    const res = await fetch(`${X_API_BASE}/tweets/search/recent?${params}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      console.warn(`X API error: ${res.status} ${res.statusText}`);
      return null;
    }

    const json = await res.json();
    if (!json.data || !json.data.length) return [];

    // Build a user lookup map
    const users = {};
    if (json.includes?.users) {
      for (const u of json.includes.users) {
        users[u.id] = u;
      }
    }

    return json.data.map((tweet) => {
      const author = users[tweet.author_id] || {};
      const metrics = tweet.public_metrics || {};
      return {
        id: tweet.id,
        title: `${author.name || 'Unknown'} (@${author.username || '?'})`,
        description: tweet.text,
        url: `https://x.com/${author.username || '?'}/status/${tweet.id}`,
        source: 'X (API)',
        platform: 'x',
        score: (metrics.like_count || 0) + (metrics.retweet_count || 0) * 2,
        metrics: {
          likes: metrics.like_count || 0,
          retweets: metrics.retweet_count || 0,
          replies: metrics.reply_count || 0,
        },
        author: {
          name: author.name,
          handle: author.username,
          avatar: author.profile_image_url,
        },
        createdAt: tweet.created_at,
        _xApi: true,
      };
    });
  } catch (err) {
    console.warn('X API search failed:', err.message);
    return null;
  }
}

/**
 * Fallback: search X/Twitter via DuckDuckGo (no auth needed).
 * Returns mock tweet-like entries from web search results.
 */
async function searchFallback(query, limit = 8) {
  try {
    const { webSearch } = await import('./research.js');
    // Filter to x.com / twitter.com results
    const siteQuery = `site:twitter.com ${query} (after:2026-05-08)`;
    
    const results = await webSearch(siteQuery, limit);
    if (!results || !results.length) return [];

    return results
      .filter((r) => {
        const url = (r.url || '').toLowerCase();
        return url.includes('twitter.com') || url.includes('x.com');
      })
      .map((r, i) => {
        // Try to extract handle from URL
        const urlParts = (r.url || '').split('/');
        const handle = urlParts.find((p) => p.startsWith('@')) || 'x_user';
        return {
          id: `x-fb-${i}-${Date.now()}`,
          title: `${r.title || 'X Post'}`,
          description: r.description || r.content || '',
          url: r.url,
          source: 'X (Web)',
          platform: 'x',
          score: 0,
          metrics: { likes: 0, retweets: 0, replies: 0 },
          author: {
            name: handle.replace('@', ''),
            handle,
            avatar: null,
          },
          createdAt: null,
          _xApi: false,
          _fallback: true,
        };
      });
  } catch (err) {
    console.warn('X fallback search failed:', err.message);
    return [];
  }
}

/**
 * Main search function: tries API first, falls back to web search.
 */
export async function searchX({ query, accessToken, limit = 10 }) {
  // 1. Try authenticated API
  if (accessToken) {
    const apiResults = await searchWithApi({ query, accessToken, limit });
    if (apiResults && apiResults.length > 0) {
      return apiResults;
    }
  }

  // 2. Fallback to web search
  return searchFallback(query, limit);
}
