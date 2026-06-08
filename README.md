<div align="center">
  <h1>🚀 TrendPulse</h1>
  <p><strong>Son 30 Günün Trendlerini Keşfet — Web, Reddit, HN, YouTube</strong></p>

  <p>
    <a href="https://trendpulse-green.vercel.app" target="_blank">
      <img src="https://img.shields.io/badge/Canlı-Demo-7C3AED?style=for-the-badge&logo=vercel" alt="Demo" />
    </a>
    <a href="https://github.com/mustafabozkaya/trendpulse/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/Lisans-MIT-10B981?style=for-the-badge" alt="License" />
    </a>
    <a href="https://github.com/mustafabozkaya/trendpulse/stargazers">
      <img src="https://img.shields.io/github/stars/mustafabozkaya/trendpulse?style=for-the-badge&logo=github" alt="Stars" />
    </a>
  </p>

  <br />

  <!-- Demo Videos -->
  <table>
    <tr>
      <td align="center" width="50%">
        <strong>🖥 Landscape (YouTube/X)</strong><br/><br/>
        <video src="public/assets/trendpulse-intro.mp4" controls width="100%">
          <a href="public/assets/trendpulse-intro.mp4">▶️ Videoyu İzle</a>
        </video>
      </td>
      <td align="center" width="50%">
        <strong>📱 Portrait (Shorts/Reels)</strong><br/><br/>
        <video src="public/assets/trendpulse-intro-mobile.mp4" controls width="50%">
          <a href="public/assets/trendpulse-intro-mobile.mp4">▶️ Videoyu İzle</a>
        </video>
      </td>
    </tr>
  </table>

  <br/>

  <!-- Screenshots -->
  <table>
    <tr>
      <td align="center"><strong>🏠 Ana Sayfa</strong></td>
      <td align="center"><strong>📊 Arama Sonuçları</strong></td>
    </tr>
    <tr>
      <td><img src="public/assets/trendpulse-home.png" alt="Ana Sayfa" width="100%"/></td>
      <td><img src="public/assets/trendpulse-results.png" alt="Sonuçlar" width="100%"/></td>
    </tr>
  </table>
</div>

---

## ✨ Özellikler

| | Özellik | Detay |
|---|---------|-------|
| 🌐 | **Çoklu Kaynak** | Web, Reddit, Hacker News, YouTube — tek sorguda |
| ⚡ | **Hızlı** | ~1-2 saniyede sonuçlar |
| 🔒 | **Sıfır API Key** | DuckDuckGo + Reddit JSON + HN Algolia + Invidious |
| 📦 | **Sıfır Kurulum** | Browser'da aç, kullanmaya başla |
| 🆓 | **Tamamen Ücretsiz** | Şimdilik — roadmap'te ücretli tier'lar var |
| 📱 | **Responsive** | Mobil, tablet, desktop hepsinde çalışır |
| 🔄 | **Cache + Rate Limit** | Akıllı cache (5dk TTL), IP bazlı rate limiting (10req/dk) |
| 📜 | **Açık Kaynak (MIT)** | Kopyala, fork'la, geliştir |

## 🚀 Canlı Demo

👉 **https://trendpulse-green.vercel.app**

Hiçbir şey kurmadan hemen kullanmaya başlayabilirsin. Bir konu yaz, 1-2 saniye içinde Web + Reddit + HN + YouTube sonuçlarını gör.

## 🛠️ Nasıl Çalışır?

```
Kullanıcı → Arama sorgusu → API Gateway
                              ├── Cache kontrolü (varsa direkt dön)
                              ├── Rate limit kontrolü
                              └── Paralel sorgular:
                                  ├── DuckDuckGo (Web)
                                  ├── Reddit JSON
                                  ├── HN Algolia
                                  └── Invidious (YouTube)
                              → JSON → React UI
```

## 📦 Teknoloji Stack

| Katman | Teknoloji |
|--------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **UI** | Tailwind CSS v4 |
| **Deploy** | Vercel (Serverless Functions) |
| **Cache** | In-memory TTL cache (5dk, max 200 entry) |
| **Rate Limit** | IP-based (10 istek/dk) |
| **Arama Motorları** | DuckDuckGo, Reddit JSON, HN Algolia, Invidious |
| **Video (Remotion)** | [Remotion](https://remotion.dev) — React ile video |

## 🏗️ Proje Yapısı

```
trendpulse/
├── app/
│   ├── api/research/route.js   # API endpoint (cache + rate-limit + paralel arama)
│   ├── page.js                 # Ana sayfa
│   ├── layout.js               # SEO, OG, metadata
│   ├── not-found.js            # 404 sayfası
│   └── robots.js               # SEO robots
├── components/
│   ├── search-bar.jsx          # Arama çubuğu
│   ├── source-card.jsx         # Kaynak kartı
│   ├── stats-bar.jsx           # İstatistik paneli
│   ├── results-dashboard.jsx   # Sonuç gösterimi
│   └── trending-topics.jsx     # Popüler konu butonları
├── lib/
│   ├── cache.js                # In-memory cache
│   ├── rate-limit.js           # Rate limiter
│   ├── research.js             # Çoklu kaynak arama motoru
│   └── utils.js                # Yardımcı fonksiyonlar
├── public/
│   ├── assets/                 # Screenshots + Remotion videoları
│   └── favicon.svg             # Favicon
└── package.json
```

## ⚙️ Geliştirme

```bash
# 1. Repoyu klonla
git clone https://github.com/mustafabozkaya/trendpulse.git
cd trendpulse

# 2. Bağımlılıkları yükle
npm install

# 3. Geliştirme sunucusunu başlat
npm run dev

# 4. Tarayıcıda aç
open http://localhost:3000
```

### Build

```bash
npm run build
npm start
```

## 🎬 Remotion Videoları

TrendPulse için Remotion ile hazırlanmış animasyonlu intro videoları:

- **Landscape (16:9):** `public/assets/trendpulse-intro.mp4` — YouTube/X için
- **Portrait (9:16):** `public/assets/trendpulse-intro-mobile.mp4` — Shorts/Reels için

Proje: [`/home/kurtar/projects/trendpulse-remotion/`](https://github.com/mustafabozkaya/trendpulse-remotion) (ayrı repo)

## 🗺️ Roadmap

- [x] MVP — Web + Reddit + HN + YouTube
- [ ] 🐦 X/Twitter entegrasyonu
- [ ] 🔮 Polymarket (tahmin piyasaları)
- [ ] 📱 TikTok desteği
- [ ] 📄 PDF rapor export
- [ ] 🤖 AI sentez raporu (özet çıkarsın)
- [ ] 👤 Kullanıcı girişi + abonelik
- [ ] 🌙 Karanlık tema (zaten koyu)
- [ ] 🔗 API erişimi (ücretli)

## 💰 Planlanan Fiyatlandırma

| Tier | Fiyat | Özellikler |
|------|-------|------------|
| 🆓 Free | $0 | 10 araştırma/ay |
| ⭐ Starter | $19/ay | 50 araştırma/ay |
| 🚀 Growth | $49/ay | Sınırsız, öncelikli destek |
| 🏢 Pro | $99/ay | Takım, API erişimi, özel entegrasyon |

> **Not:** Şu an her şey ücretsiz. Roadmap tamamlandıkça tier'lar aktif olacak.

## 🤝 Katkıda Bulunma

1. Fork'la
2. Feature branch aç: `git checkout -b yeni-ozellik`
3. Değişiklikleri commit et: `git commit -m 'Yeni özellik: ...'`
4. Branch'i push et: `git push origin yeni-ozellik`
5. PR aç

Issue'ler ve öneriler için [GitHub Issues](https://github.com/mustafabozkaya/trendpulse/issues).

## 📬 İletişim

- **LinkedIn:** [Mustafa Bozkaya](https://linkedin.com/in/mustafa-bozkaya)
- **GitHub:** [@mustafabozkaya](https://github.com/mustafabozkaya)
- **X:** [@ainsighthubs](https://x.com/ainsighthubs)
- **Portfolio:** [mustafabozkaya.github.io](https://mustafabozkaya.github.io)

## 📄 Lisans

MIT License — detaylar için [LICENSE](LICENSE) dosyasına bak.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/mustafabozkaya">@mustafabozkaya</a></sub>
  <br/>
  <sub>🚀 <a href="https://trendpulse-green.vercel.app">trendpulse.vercel.app</a></sub>
</div>
