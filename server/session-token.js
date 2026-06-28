import crypto from 'node:crypto'
import { timingSafeEqualString } from './auth-helper.js'

const TOKEN_TTL_MS = 8 * 60 * 60 * 1000

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_AUTH_TOKEN || ''
}

function sign(body) {
  const secret = sessionSecret()
  if (!secret) throw new Error('Chybí ADMIN_SESSION_SECRET.')
  return crypto.createHmac('sha256', secret).update(body).digest('base64url')
}

export function createSessionToken() {
  const payload = {
    exp: Date.now() + TOKEN_TTL_MS,
    nonce: crypto.randomBytes(16).toString('hex'),
  }
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  return `${body}.${sign(body)}`
}

export function verifySessionToken(token) {
  const secret = sessionSecret()
  if (!secret) {
    return { ok: false, reason: 'missing-env' }
  }

  if (!token || typeof token !== 'string') {
    return { ok: false, reason: 'missing' }
  }

  const dot = token.lastIndexOf('.')
  if (dot <= 0) {
    return { ok: false, reason: 'invalid' }
  }

  const body = token.slice(0, dot)
  const signature = token.slice(dot + 1)

  if (!timingSafeEqualString(signature, sign(body))) {
    return { ok: false, reason: 'invalid' }
  }

  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
    if (typeof payload.exp !== 'number' || Date.now() > payload.exp) {
      return { ok: false, reason: 'expired' }
    }
    return { ok: true }
  } catch {
    return { ok: false, reason: 'invalid' }
  }
}
