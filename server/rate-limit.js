const buckets = new Map()

export function checkRateLimit(key, { max = 15, windowMs = 10 * 60 * 1000 } = {}) {
  const now = Date.now()
  const entry = buckets.get(key)

  if (!entry || now - entry.startedAt > windowMs) {
    buckets.set(key, { startedAt: now, count: 1 })
    return { ok: true }
  }

  entry.count += 1
  if (entry.count > max) {
    return { ok: false }
  }

  return { ok: true }
}

export function clientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}
