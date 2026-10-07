/**
 * Lightweight in-memory rate limiting for authentication endpoints.
 *
 * IMPORTANT: This is an in-process store — it does not persist across
 * server restarts and does not work correctly in multi-instance deployments.
 * For production, replace with a Redis-backed solution (e.g. Upstash).
 *
 * Server-side only — never import in client components.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes to prevent memory growth
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (entry.resetAt < now) store.delete(key);
    }
  }, 5 * 60 * 1000);
}

/**
 * Checks whether a given identifier (e.g. IP address) has exceeded
 * the rate limit for an action.
 *
 * @param key      Unique identifier (e.g. `login:${ip}`)
 * @param limit    Maximum number of requests allowed
 * @param windowMs Time window in milliseconds
 * @returns        `{ allowed: true }` or `{ allowed: false, retryAfterMs }`
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (entry.count >= limit) {
    return { allowed: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count += 1;
  return { allowed: true };
}

// ---------------------------------------------------------------------------
// Pre-configured limits for auth endpoints
// ---------------------------------------------------------------------------

/** 5 attempts per 15 minutes per IP */
export function checkLoginRateLimit(ip: string): ReturnType<typeof checkRateLimit> {
  return checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000);
}

/** 3 registrations per hour per IP */
export function checkRegisterRateLimit(ip: string): ReturnType<typeof checkRateLimit> {
  return checkRateLimit(`register:${ip}`, 3, 60 * 60 * 1000);
}

/** 3 reset requests per hour per IP */
export function checkForgotPasswordRateLimit(ip: string): ReturnType<typeof checkRateLimit> {
  return checkRateLimit(`forgot:${ip}`, 3, 60 * 60 * 1000);
}
