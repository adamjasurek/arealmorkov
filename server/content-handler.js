import { verifyAdminToken } from './auth-helper.js'
import { readRepoJson, writeRepoJson } from './github-files.js'
import { jsonResponse } from './json-response.js'
import { defineRoute } from './vercel-fetch.js'

export function createContentHandler(repoRelativePath, commitLabel) {
  return defineRoute(async function handler(request) {
    if (request.method === 'OPTIONS') {
      return jsonResponse(request, 204, {})
    }

    try {
      if (request.method === 'GET') {
        const data = await readRepoJson(repoRelativePath)
        return jsonResponse(request, 200, data)
      }

      if (request.method === 'POST') {
        const auth = verifyAdminToken(request.headers)
        if (!auth.ok) {
          return jsonResponse(request, 401, { error: 'Unauthorized' })
        }

        const body = await request.json()
        if (!body || typeof body !== 'object' || Array.isArray(body)) {
          return jsonResponse(request, 400, { error: 'Očekáván JSON objekt.' })
        }

        await writeRepoJson(repoRelativePath, body, `admin: ${commitLabel}`)
        return jsonResponse(request, 200, { ok: true })
      }

      return jsonResponse(request, 405, { error: 'Method not allowed' })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Chyba serveru'
      return jsonResponse(request, 500, { error: message })
    }
  })
}
