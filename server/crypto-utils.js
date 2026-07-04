import crypto from 'node:crypto'

export function timingSafeEqualString(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false
  const digestA = crypto.createHash('sha256').update(a, 'utf8').digest()
  const digestB = crypto.createHash('sha256').update(b, 'utf8').digest()
  if (digestA.length !== digestB.length) return false
  return crypto.timingSafeEqual(digestA, digestB)
}
