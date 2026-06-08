<div align="center">
  <h1 align="center">🚀 TrendPulse</h1>
  <p align="center"><strong>Discover the Latest Trends — Web, Reddit, HN, YouTube</strong></p>

  <p align="center">
    <a href="https://trendpulse-green.vercel.app" target="_blank">
      <img src="https://img.shields.io/badge/Live-Demo-7C3AED?style=for-the-badge&logo=vercel" alt="Demo" />
    </a>
    <a href="https://github.com/mustafabozkaya/trendpulse/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge" alt="License" />
    </a>
    <a href="https://github.com/mustafabozkaya/trendpulse/stargazers">
      <img src="https://img.shields.io/github/stars/mustafabozkaya/trendpulse?style=for-the-badge&logo=github" alt="Stars" />
    </a>
  </p>

  <br />

  <!-- Demo GIF -->
  <img src="public/assets/trendpulse-demo.gif" alt="TrendPulse Demo" width="100%" />

  <br/><br/>

  <!-- Screenshots -->
  <table>
    <tr>
      <td align="center"><strong>🏠 Home</strong></td>
      <td align="center"><strong>📊 Search Results</strong></td>
    </tr>
    <tr>
      <td><img src="public/assets/trendpulse-home.png" alt="Homepage" width="100%"/></td>
      <td><img src="public/assets/trendpulse-results.png" alt="Results" width="100%"/></td>
    </tr>
  </table>
</div>

---

## ✨ Features

- **🌐 Multi-Source** — Web, Reddit, Hacker News, YouTube — single query
- **⚡ Fast** — ~1-2 second results
- **🔒 Zero API Keys** — DuckDuckGo + Reddit JSON + HN Algolia + Invidious
- **📦 Zero Setup** — Open in browser, start searching
- **🆓 Completely Free** — For now
- **📱 Responsive** — Mobile, tablet, desktop
- **🔄 Cache + Rate Limit** — 5min TTL, 10req/min/IP
- **📜 Open Source (MIT)** — Fork, build, contribute

## 🚀 Live Demo

👉 **https://trendpulse-green.vercel.app**

No installation required. Type a topic and get Web + Reddit + HN + YouTube results in 1-2 seconds.

## 🛠️ How It Works

```
User → Search query → API Gateway
                       ├── Cache check (return if exists)
                       ├── Rate limit check
                       └── Parallel queries:
                           ├── DuckDuckGo (Web)
                           ├── Reddit JSON
                           ├── HN Algolia
                           └── Invidious (YouTube)
                       → JSON → React UI
```

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **UI** | Tailwind CSS v4 |
| **Deploy** | Vercel (Serverless Functions) |
| **Cache** | In-memory TTL cache (5min, max 200 entries) |
| **Rate Limit** | IP-based (10 req/min) |
| **Search** | DuckDuckGo, Reddit JSON, HN Algolia, Invidious |

## 🏗️ Project Structure

```
trendpulse/
├── app/
│   ├── api/research/route.js   # API endpoint (cache + rate-limit + parallel)
│   ├── page.js                 # Main page
│   ├── layout.js               # SEO, OG, metadata
│   ├── not-found.js            # 404 page
│   └── robots.js               # SEO robots
├── components/
│   ├── search-bar.jsx
│   ├── source-card.jsx
│   ├── stats-bar.jsx
│   ├── results-dashboard.jsx
│   └── trending-topics.jsx
├── lib/
│   ├── cache.js                # In-memory cache
│   ├── rate-limit.js           # Rate limiter
│   ├── research.js             # Multi-source search engine
│   └── utils.js
├── public/
│   └── assets/                 # Screenshots + demo GIF
└── package.json
```

## ⚙️ Development

```bash
git clone https://github.com/mustafabozkaya/trendpulse.git
cd trendpulse
npm install
npm run dev       # http://localhost:3000
```

### Build

```bash
npm run build
npm start
```

## 🗺️ Roadmap

- [x] MVP — Web + Reddit + HN + YouTube
- [ ] 🐦 X/Twitter integration
- [ ] 🔮 Polymarket (prediction markets)
- [ ] 📱 TikTok support
- [ ] 📄 PDF report export
- [ ] 🤖 AI summary report
- [ ] 👤 User auth + subscriptions
- [ ] 🔗 API access

## 🤝 Contributing

1. Fork it
2. Branch: `git checkout -b my-feature`
3. Commit: `git commit -m 'Add my feature'`
4. Push: `git push origin my-feature`
5. Open a PR

Issues & suggestions: [GitHub Issues](https://github.com/mustafabozkaya/trendpulse/issues)

## 📬 Contact

- **LinkedIn:** [Mustafa Bozkaya](https://linkedin.com/in/mustafa-bozkaya)
- **GitHub:** [@mustafabozkaya](https://github.com/mustafabozkaya)
- **X:** [@ainsighthubs](https://x.com/ainsighthubs)
- **Portfolio:** [mustafabozkaya.github.io](https://mustafabozkaya.github.io)

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/mustafabozkaya">@mustafabozkaya</a></sub>
  <br/>
  <sub>🚀 <a href="https://trendpulse-green.vercel.app">trendpulse.vercel.app</a></sub>
</div>
