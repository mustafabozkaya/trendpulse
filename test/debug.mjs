import { searchWeb, searchReddit, searchGitHub } from '../lib/research.js';

// Debug web
console.log("=== WEB DEBUG ===");
const webResults = await searchWeb('AI agents 2026');
console.log(`Web results: ${webResults.length}`);
if (webResults.length === 0) {
  // Fetch raw HTML and test regex manually
  const res = await fetch('https://html.duckduckgo.com/html/?q=AI+agents+2026+after%3A2026-05-09', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  const html = await res.text();
  const match = html.match(/<a[^>]*class="result__a"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/i);
  console.log(`Regex match: ${match ? 'YES' : 'NO'}`);
  console.log(`HTML length: ${html.length}`);
  const resultACount = (html.match(/result__a/g) || []).length;
  console.log(`"result__a" occurrences: ${resultACount}`);
  // Show first 2000 chars
  console.log(`HTML preview (first 2000 chars):`);
  console.log(html.slice(0, 2000));
}

// Debug reddit
console.log("\n=== REDDIT DEBUG ===");
const redditResults = await searchReddit('AI agents 2026');
console.log(`Reddit results: ${redditResults.length}`);
if (redditResults.length === 0) {
  const r = await fetch('https://www.reddit.com/r/all/search.rss?q=AI+agents+2026&sort=new&t=month&limit=3', {
    headers: { 'User-Agent': 'TrendPulse/1.0' }
  });
  const xml = await r.text();
  console.log(`XML length: ${xml.length}`);
  console.log(`XML preview (first 1500 chars):`);
  console.log(xml.slice(0, 1500));
  // Check if item exists
  console.log(`<item> count: ${(xml.match(/<item>/g) || []).length}`);
}

// Debug github
console.log("\n=== GITHUB DEBUG ===");
const ghResults = await searchGitHub('AI agents 2026');
console.log(`GitHub results: ${ghResults.length}`);
if (ghResults.length === 0) {
  try {
    const g = await fetch('https://api.github.com/search/repositories?q=AI+agents+2026+updated:%3E%3D2026-05-01&sort=updated&per_page=3', {
      headers: { 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'TrendPulse/1.0' }
    });
    console.log(`GitHub status: ${g.status}`);
    const body = await g.text();
    console.log(`GitHub response: ${body.slice(0, 500)}`);
  } catch(e) {
    console.log(`GitHub error: ${e.message}`);
  }
}

process.exit(0);
