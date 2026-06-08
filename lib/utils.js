// Utility functions

export function getSourceIcon(source) {
  const icons = {
    web: '🌐',
    reddit: '👽',
    hackernews: '⚡',
    youtube: '▶️',
  };
  return icons[source] || '🔗';
}

export function getSourceLabel(source) {
  const labels = {
    web: 'Web',
    reddit: 'Reddit',
    hackernews: 'Hacker News',
    youtube: 'YouTube',
  };
  return labels[source] || source;
}

export function getSourceColor(source) {
  const colors = {
    web: 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30',
    reddit: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    hackernews: 'bg-orange-600/20 text-orange-400 border-orange-600/30',
    youtube: 'bg-red-500/20 text-red-300 border-red-500/30',
  };
  return colors[source] || 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30';
}

export function truncate(text, maxLen = 80) {
  if (!text || text.length <= maxLen) return text;
  return text.slice(0, maxLen) + '...';
}

export function formatNumber(num) {
  if (!num && num !== 0) return '';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export function timeAgo(dateStr) {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diff = now - date;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}
