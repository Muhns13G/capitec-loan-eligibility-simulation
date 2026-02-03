import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/utils/rate-limit';

export function withRateLimit(request: NextRequest) {
  const identifier = request.headers.get('x-forwarded-for') || 'unknown';

  if (!checkRateLimit(identifier)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  return null;
}
