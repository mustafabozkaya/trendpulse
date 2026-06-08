import SourceCard from './source-card';
import StatsBar from './stats-bar';

export default function ResultsDashboard({ data, topic }) {
  if (!data) return null;
  if (data.error) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-3">⚠️</div>
        <p className="text-zinc-400">{data.error}</p>
      </div>
    );
  }

  const { summary, sources, duration, fromCache } = data;

  // Filter out empty source arrays
  const activeSources = Object.entries(sources || {})
    .filter(([, items]) => items?.length > 0);

  if (activeSources.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-3">🔍</div>
        <h3 className="text-lg font-semibold mb-1">Sonuç bulunamadı</h3>
        <p className="text-sm text-zinc-500">
          &ldquo;{topic}&rdquo; için son 30 günde kayda değer bir şey bulunamadı. Farklı bir konu deneyin.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span>📊</span> &ldquo;{topic}&rdquo; Sonuçları
        </h2>
        <p className="text-xs text-zinc-500 mt-1">
          {summary?.total} sonuç · {duration}ms
          {fromCache && ' · (önbellekten)'}
        </p>
      </div>

      {/* Stats */}
      <StatsBar summary={summary} />

      {/* Sources */}
      <div className="space-y-6">
        {activeSources.map(([source, items]) => {
          const sourceIcons = {
            web: '🌐 Web',
            reddit: '👽 Reddit',
            hackernews: '⚡ Hacker News',
            youtube: '▶️ YouTube',
          };
          return (
            <section key={source}>
              <h3 className="text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wider">
                {sourceIcons[source] || source}
                <span className="text-zinc-600 ml-1">({items.length})</span>
              </h3>
              <div className="space-y-2">
                {items.map((item, i) => (
                  <SourceCard key={`${source}-${i}`} result={item} source={source} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Footer */}
      <div className="text-center pt-4 pb-2">
        <p className="text-[11px] text-zinc-600">
          TrendPulse · Son 30 gün verisi · Kaynaklara tıklayarak detayları görebilirsiniz
        </p>
      </div>
    </div>
  );
}
