import { getSourceIcon, getSourceLabel, getSourceColor, formatNumber } from '@/lib/utils';

export default function SourceCard({ result, source }) {
  const icon = getSourceIcon(source);
  const label = getSourceLabel(source);
  const color = getSourceColor(source);

  return (
    <a
      href={result.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group rounded-xl border border-white/[0.06] bg-white/[0.02]
                 hover:bg-white/[0.05] hover:border-white/10
                 transition-all duration-200 p-4"
    >
      <div className="flex items-start gap-3">
        {/* Source badge */}
        <div className="flex-shrink-0 mt-0.5">
          <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border ${color}`}>
            {icon} {label}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-zinc-200 group-hover:text-white
                         transition-colors line-clamp-2 leading-snug">
            {result.title}
          </h3>

          {/* Meta info */}
          <div className="flex items-center gap-3 mt-1.5 text-xs text-zinc-500">
            {result.score != null && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M5 15l7-7 7 7" />
                </svg>
                {formatNumber(result.score)}
              </span>
            )}
            {result.comments != null && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {formatNumber(result.comments)}
              </span>
            )}
            {result.channel && (
              <span className="truncate max-w-[120px]">{result.channel}</span>
            )}
            {result.subreddit && (
              <span>{result.subreddit}</span>
            )}
            {result.author && (
              <span>@{result.author}</span>
            )}
          </div>
        </div>

        {/* External link arrow */}
        <svg className="w-4 h-4 flex-shrink-0 text-zinc-600 group-hover:text-zinc-400 transition-colors mt-1"
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
    </a>
  );
}
