import { createSessionToken, timingSafeEqualString } from '../server/auth-helper.js'
import { checkRateLimit, clientIp } from '../server/rate-limit.js'
import { jsonResponse } from '../server/json-response.js'

export default async function handler(request) {
  if (request.method === 'OPTIONS') {
    return jsonResponse(request, 204, {})
  }

  if (request.method !== 'POST') {
    return jsonResponse(request, 405, { error: 'Method not allowed' })
  }

  const rate = checkRateLimit(`login:${clientIp(request)}`)
  if (!rate.ok) {
    return jsonResponse(request, 429, { error: 'Příliš mnoho pokusů. Zkuste to později.' })
  }

  const expected = process.env.ADMIN_PASSWORD

  if (!expected || !sessionSecretConfigured()) {
    return jsonResponse(request, 500, { error: 'Chybí konfigurace adminu.' })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return jsonResponse(request, 400, { error: 'Neplatný JSON.' })
  }

  const password = body && typeof body.password === 'string' ? body.password : ''

  if (!timingSafeEqualString(password, expected)) {
    return jsonResponse(request, 401, { error: 'Nesprávné heslo.' })
  }

  return jsonResponse(request, 200, { adminToken: createSessionToken() })
}

function sessionSecretConfigured() {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_AUTH_TOKEN
  return Boolean(secret && secret.trim())
}
