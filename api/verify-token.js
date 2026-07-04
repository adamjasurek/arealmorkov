import { verifyAdminToken } from '../server/auth-helper.js'
import { jsonResponse } from '../server/json-response.js'
import { defineRoute } from '../server/vercel-fetch.js'

export default defineRoute(async function verifyTokenHandler(request) {
  if (request.method === 'OPTIONS') {
    return jsonResponse(request, 204, {})
  }

  if (request.method !== 'GET') {
    return jsonResponse(request, 405, { error: 'Method not allowed' })
  }

  const auth = verifyAdminToken(request.headers)
  if (!auth.ok) {
    return jsonResponse(request, 401, { error: 'Unauthorized' })
  }

  return jsonResponse(request, 200, { ok: true })
})
