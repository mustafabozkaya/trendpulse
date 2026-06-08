'use client';

import { useSession } from 'next-auth/react';

export default function XSourceToggle({ includeX, onToggle }) {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const hasToken = !!session?.user?.accessToken;

  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          checked={includeX}
          onChange={onToggle}
          className="sr-only peer"
        />
        <div className="w-9 h-5 bg-white/10 rounded-full peer-checked:bg-indigo-500/50 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
      </div>
      <div className="flex items-center gap-1.5 text-xs text-zinc-400 group-hover:text-zinc-300 transition">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        X/Twitter
        {includeX && !isLoggedIn && (
          <span className="text-amber-400/80 font-medium ml-1">
            (no auth — limited results)
          </span>
        )}
        {includeX && isLoggedIn && hasToken && (
          <span className="text-green-400/80 font-medium ml-1">
            (API)
          </span>
        )}
        {includeX && isLoggedIn && !hasToken && (
          <span className="text-amber-400/80 font-medium ml-1">
            (reconnect for API)
          </span>
        )}
      </div>
    </label>
  );
}
