import 'server-only';

/**
 * Sliding-window limiter keyed by IP. In-memory, so it is per server instance:
 * sufficient for a single Node deployment. On multi-instance/serverless hosting,
 * swap `hit` for a shared store (e.g. Upstash Redis) — see docs/DEPLOYMENT.md.
 */
const buckets = new Map<string, number[]>();

export function rateLimit(key: string, { limit = 5, windowMs = 10 * 60 * 1000 } = {}) {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    buckets.set(key, recent);
    return { ok: false as const, retryAfter: Math.ceil((windowMs - (now - recent[0])) / 1000) };
  }
  recent.push(now);
  buckets.set(key, recent);
  if (buckets.size > 5000) buckets.clear(); // crude memory guard
  return { ok: true as const };
}

export function clientIp(req: Request) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
}

/** Honeypot + minimum fill time. Returns true when the submission looks automated. */
export function looksLikeSpam(website: unknown, startedAt: unknown) {
  if (typeof website === 'string' && website.length > 0) return true;
  const t = Number(startedAt);
  if (!t || Date.now() - t < 3000) return true;
  return false;
}
