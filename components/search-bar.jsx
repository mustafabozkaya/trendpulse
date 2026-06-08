'use client';

import { useState, useRef } from 'react';

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length >= 2 && !loading) {
      onSearch(trimmed);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a topic: AI agents, GPT-5, Claude..."
            disabled={loading}
            className="w-full h-12 pl-12 pr-4 rounded-xl border border-white/10 bg-white/[0.05]
                       text-white placeholder-zinc-500 text-base
                       focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200"
            aria-label="Search topic"
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          disabled={loading || query.trim().length < 2}
          className="h-12 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500
                     disabled:bg-indigo-600/30 disabled:cursor-not-allowed
                     text-white font-semibold text-sm
                     transition-all duration-200
                     flex items-center gap-2 whitespace-nowrap
                     shadow-lg shadow-indigo-600/20"
          aria-label="Search"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Search
            </>
          )}
        </button>
      </div>
    </form>
  );
}
