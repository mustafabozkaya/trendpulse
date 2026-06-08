'use client';

import { useState, useCallback } from 'react';
import SearchBar from '@/components/search-bar';
import ResultsDashboard from '@/components/results-dashboard';
import TrendingTopics from '@/components/trending-topics';

export default function HomePage() {
  const [topic, setTopic] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    setData(null);
    setSearched(true);
    setTopic(query);

    try {
      const res = await fetch(`/api/research?q=${encodeURIComponent(query)}`);
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || 'An error occurred.');
      } else {
        setData(json);
      }
    } catch (err) {
      setError('Could not connect. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero / Search Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-400/20 rounded-full px-4 py-1.5 text-xs text-indigo-300">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            last30days · AI Trend Intelligence
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Discover the Latest
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Trends of the Last 30 Days
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
            What's being discussed on Web, Reddit, Hacker News and YouTube in the last 30 days?
            Single query, all sources.
          </p>

          {/* Search */}
          <div className="pt-4">
            <SearchBar onSearch={handleSearch} loading={loading} />
          </div>

          {/* Trending Topics (only show before first search) */}
          {!searched && !loading && (
            <div className="pt-6">
              <TrendingTopics onSelect={handleSearch} loading={loading} />
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      {(loading || data || error) && (
        <section className="pb-16 md:pb-24">
          <div className="max-w-4xl mx-auto px-4">
            {loading && (
              <div className="space-y-4 animate-pulse">
                <div className="h-6 bg-white/5 rounded-lg w-48" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-20 bg-white/5 rounded-xl" />
                  ))}
                </div>
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-white/5 rounded-xl" />
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">⚠️</div>
                <p className="text-zinc-400">{error}</p>
                <button
                  onClick={() => handleSearch(topic)}
                  className="mt-4 text-sm text-indigo-400 hover:text-indigo-300 transition"
                >
                  Retry
                </button>
              </div>
            )}

            {data && <ResultsDashboard data={data} topic={topic} />}
          </div>
        </section>
      )}

      {/* How it works (before search) */}
      {!searched && !loading && (
        <section className="py-12 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="text-2xl mb-2">🔍</div>
                <h3 className="text-sm font-semibold mb-1">Enter Topic</h3>
                <p className="text-xs text-zinc-500">What do you want to research?</p>
              </div>
              <div className="p-4">
                <div className="text-2xl mb-2">🤖</div>
                <h3 className="text-sm font-semibold mb-1">AI Scans</h3>
                <p className="text-xs text-zinc-500">Web, Reddit, HN, YouTube scanned in parallel</p>
              </div>
              <div className="p-4">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="text-sm font-semibold mb-1">Get Report</h3>
                <p className="text-xs text-zinc-500">Source-grouped trend results</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
