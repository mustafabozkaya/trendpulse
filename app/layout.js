import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TrendPulse — Trend Analysis for the Last 30 Days",
  description:
    "Discover what's trending on Web, Reddit, Hacker News and YouTube in the last 30 days. AI-powered trend intelligence tool.",
  keywords: [
    "trend analysis",
    "last30days",
    "social listening",
    "trend intelligence",
    "AI research",
    "content research",
  ],
  openGraph: {
    title: "TrendPulse — Trend Analysis for the Last 30 Days",
    description:
      "Web, Reddit, HN, YouTube. Single query across all sources for the latest trends.",
    siteName: "TrendPulse",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrendPulse — Trend Analysis for the Last 30 Days",
    description:
      "Web, Reddit, HN, YouTube. Discover the latest trends.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-[#0a0a0f] text-white">
        <nav className="border-b border-white/5 backdrop-blur-xl bg-black/20 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-xs font-bold">
                TP
              </div>
              <span className="font-bold text-base">
                Trend<span className="text-indigo-400">Pulse</span>
              </span>
            </a>
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <span className="hidden sm:block">last30days · AI trend intelligence</span>
              <a
                href="https://github.com/mustafabozkaya/trendpulse"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-300 transition"
              >
                GitHub
              </a>
            </div>
          </div>
        </nav>

        <main className="flex-1 flex flex-col">{children}</main>

        <footer className="border-t border-white/5 py-6 text-center text-xs text-zinc-600">
          <div className="max-w-6xl mx-auto px-4">
            TrendPulse — AI-powered trend intelligence &middot; mustafabozkaya &copy; 2026
          </div>
        </footer>
      </body>
    </html>
  );
}
