'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function LoginButton() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
    );
  }

  if (session?.user) {
    const handle = session.user.xHandle
      ? `@${session.user.xHandle}`
      : session.user.name?.split(' ')[0] || 'User';

    return (
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1.5 text-xs">
          {session.user.image && (
            <img
              src={session.user.image}
              alt=""
              className="w-5 h-5 rounded-full"
            />
          )}
          <span className="text-zinc-300">{handle}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('twitter', { redirect: false })}
      className="flex items-center gap-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 text-zinc-300 hover:text-white transition"
    >
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
      Login with X
    </button>
  );
}
