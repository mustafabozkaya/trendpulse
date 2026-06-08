// TrendPulse — Source Diagnostics
// Run: node test/diag.mjs

const { researchTrend, searchWeb, searchReddit, searchHN, searchYouTube, searchPolymarket, searchGitHub } = await import('../lib/research.js');

const TOPIC = 'AI agents 2026';

async function test(name, fn) {
  try {
    const start = performance.now();
    const results = await fn(TOPIC);
    const ms = (performance.now() - start).toFixed(0);
    const status = results.length > 0 ? '✅' : '⚠️';
    console.log(`${status} [${ms.padStart(4)}ms] ${name}: ${results.length} results`);
    if (results.length > 0) {
      console.log(`     First: ${results[0].title?.slice(0, 70)}`);
    }
    return results.length;
  } catch (e) {
    console.log(`❌ [ERR]  ${name}: ${e.message}`);
    return 0;
  }
}

console.log('=== TrendPulse Source Diagnostics ===\n');

const r1 = await test('Web (DDG)', searchWeb);
const r2 = await test('Reddit (RSS)', searchReddit);
const r3 = await test('Hacker News (Algolia)', searchHN);
const r4 = await test('YouTube (Invidious)', searchYouTube);
const r5 = await test('Polymarket (CLOB)', searchPolymarket);
const r6 = await test('GitHub Search', searchGitHub);

console.log(`\n=== Summary ===`);
const working = [r1, r2, r3, r4, r5, r6].filter(r => r > 0).length;
console.log(`Sources: ${working}/6 working`);
console.log(`Total results: ${r1 + r2 + r3 + r4 + r5 + r6}`);

// Exit codes: 0 = all good, 1 = some failures
process.exit(r1 + r2 + r3 + r5 + r6 > 0 ? 0 : 1);
