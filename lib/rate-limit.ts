// Simple in-memory rate limiting for the contact route
// Note: In a serverless environment (like Vercel), this state resets per edge function instance.
// For robust prod rate limiting, use Redis (e.g., Upstash) or Vercel KV.

const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

export function checkRateLimit(ip: string, limit: number = 5, windowMs: number = 60000) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (record) {
    if (now > record.expiresAt) {
      // Expired, reset
      rateLimitMap.set(ip, { count: 1, expiresAt: now + windowMs });
      return true;
    }
    if (record.count >= limit) {
      return false; // Rate limited
    }
    // Increment
    record.count += 1;
    rateLimitMap.set(ip, record);
    return true;
  }

  // New record
  rateLimitMap.set(ip, { count: 1, expiresAt: now + windowMs });
  return true;
}
