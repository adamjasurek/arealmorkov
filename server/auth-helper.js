import crypto from 'node:crypto'
import { timingSafeEqualString } from './crypto-utils.js'
import { createSessionToken, verifySessionToken } from './session-token.js'

export { createSessionToken } from './session-token.js'
export { timingSafeEqualString } from './crypto-utils.js'

function verifyStaticAdminToken(raw) {
  const expected = process.env.ADMIN_AUTH_TOKEN
  if (!expected || expected.trim() === '') {
    return { ok: false, reason: 'missing-env' }
  }

  const bufE = Buffer.from(expected, 'utf8')
  const bufT = Buffer.from(raw, 'utf8')
  if (bufE.length !== bufT.length) {
    return { ok: false, reason: 'invalid' }
  }

  if (!crypto.timingSafeEqual(bufE, bufT)) {
    return { ok: false, reason: 'invalid' }
  }

  return { ok: true }
}

export function verifyAdminToken(headers) {
  const raw = headers.get('x-admin-token')
  if (!raw || raw.trim() === '') {
    return { ok: false, reason: 'missing' }
  }

  const token = raw.trim()

  if (token.includes('.')) {
    const session = verifySessionToken(token)
    if (session.ok) return session
    if (session.reason === 'expired' || session.reason === 'invalid') {
      return session
    }
  }

  return verifyStaticAdminToken(token)
}
