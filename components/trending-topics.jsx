// Toplanacak trending topic'ler
const TRENDING_TOPICS = [
  { label: 'AI agents', icon: '🤖' },
  { label: 'Claude Code', icon: '🔵' },
  { label: 'GPT-5', icon: '🧠' },
  { label: 'LLM fine-tuning', icon: '⚙️' },
  { label: 'RAG patterns', icon: '📚' },
  { label: 'Edge AI', icon: '📱' },
  { label: 'Vector databases', icon: '🗄️' },
  { label: 'Open source', icon: '🔓' },
];

export default function TrendingTopics({ onSelect, loading }) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <p className="text-xs text-zinc-500 text-center mb-3">Try trending topics:</p>
      <div className="flex flex-wrap justify-center gap-2">
        {TRENDING_TOPICS.map(({ label, icon }) => (
          <button
            key={label}
            onClick={() => !loading && onSelect(label)}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                       border border-white/[0.06] bg-white/[0.02]
                       hover:bg-white/[0.06] hover:border-white/10
                       text-xs text-zinc-400 hover:text-zinc-200
                       disabled:opacity-30 disabled:cursor-not-allowed
                       transition-all duration-200"
          >
            {icon} {label}
          </button>
        ))}
      </div>
    </div>
  );
}
