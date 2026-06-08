import { NextResponse } from 'next/server';
import { researchTrend } from '@/lib/research';
import { getCached, setCache } from '@/lib/cache';
import { checkRateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs'; // required for fetch + cache

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get('q');

  // ─── Validasyon ───
  if (!topic || topic.trim().length < 2) {
    return NextResponse.json(
      { error: 'En az 2 karakter girin.' },
      { status: 400 }
    );
  }

  // ─── Rate Limiting ───
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'anonymous';
  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: `Çok fazla istek. ${rateCheck.resetIn}s bekleyin.` },
      { status: 429, headers: { 'Retry-After': rateCheck.resetIn.toString() } }
    );
  }

  const query = topic.trim();

  // ─── Cache ───
  const cacheKey = `research:${query.toLowerCase()}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return NextResponse.json({ ...cached, fromCache: true });
  }

  // ─── Araştırma ───
  try {
    const result = await researchTrend(query);
    setCache(cacheKey, result);
    return NextResponse.json({ ...result, fromCache: false });
  } catch (error) {
    console.error('Research error:', error);
    return NextResponse.json(
      { error: 'Araştırma yapılırken hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
