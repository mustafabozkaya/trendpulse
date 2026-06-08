import { getSourceIcon, getSourceLabel, getSourceColor } from '@/lib/utils';

export default function StatsBar({ summary }) {
  if (!summary) return null;

  const sources = [
    { key: 'reddit', label: 'Reddit' },
    { key: 'hackernews', label: 'HN' },
    { key: 'youtube', label: 'YouTube' },
    { key: 'polymarket', label: 'Polymarket' },
    { key: 'github', label: 'GitHub' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {sources.map(({ key, label }) => {
        const count = summary[key] || 0;
        const icon = getSourceIcon(key);
        const color = getSourceColor(key);
        if (count === 0 && key !== 'web') return null;
        return (
          <div key={key}
               className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
            <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border ${color} mb-2`}>
              {icon} {label}
            </span>
            <div className="text-xl font-bold text-white">{count}</div>
            <div className="text-[11px] text-zinc-500">results</div>
          </div>
        );
      })}
    </div>
  );
}
