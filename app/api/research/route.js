import { NextResponse } from 'next/server';
import { researchTrend } from '@/lib/research';
import { getCached, setCache } from '@/lib/cache';
import { checkRateLimit } from '@/lib/rate-limit';
import { auth } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get('q');
  const includeX = searchParams.get('x') === 'true';

  // ─── Validation ───
  if (!topic || topic.trim().length < 2) {
    return NextResponse.json(
      { error: 'Enter at least 2 characters.' },
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
      { error: `Too many requests. Wait ${rateCheck.resetIn}s.` },
      { status: 429, headers: { 'Retry-After': rateCheck.resetIn.toString() } }
    );
  }

  const query = topic.trim();

  // ─── Auth check for X source ───
  let xAccessToken = null;
  if (includeX) {
    const session = await auth();
    if (session?.user?.accessToken) {
      xAccessToken = session.user.accessToken;
    }
    // includeX stays true even without token — research-x.js handles fallback
  }

  // ─── Cache (different key if X is enabled) ───
  const cacheKey = `research:${query.toLowerCase()}:x=${includeX}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return NextResponse.json({ ...cached, fromCache: true });
  }

  // ─── Research ───
  try {
    const result = await researchTrend(query, {
      includeX,
      xAccessToken,
    });
    setCache(cacheKey, result);
    return NextResponse.json({ ...result, fromCache: false });
  } catch (error) {
    console.error('Research error:', error);
    return NextResponse.json(
      { error: 'Research failed. Please try again.' },
      { status: 500 }
    );
  }
}
