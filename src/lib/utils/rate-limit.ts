// Simple in-memory rate limiter for prototype
// TODO: Replace with Redis-based rate limiting for production

const requestCounts = new Map<string, { count: number; resetTime: number }>();
const MAX_REQUESTS_PER_MINUTE = 60;
const WINDOW_MS = 60 * 1000; // 1 minute

export function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(identifier);

  if (!record || now > record.resetTime) {
    // First request or window expired
    requestCounts.set(identifier, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_MINUTE) {
    return false;
  }

  record.count++;
  return true;
}

export function getRateLimitResetTime(identifier: string): number | null {
  const record = requestCounts.get(identifier);
  return record?.resetTime || null;
}
