import { readRepoJson } from '../../server/github-files.js'
import { jsonResponse } from '../../server/json-response.js'

export default async function handler(request) {
  if (request.method === 'OPTIONS') {
    return jsonResponse(request, 204, {})
  }

  if (request.method !== 'GET') {
    return jsonResponse(request, 405, { error: 'Method not allowed' })
  }

  try {
    const data = await readRepoJson('public/data/water-temp.json')
    return jsonResponse(request, 200, data, {
      'Cache-Control': 'public, max-age=30, stale-while-revalidate=60',
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Chyba serveru'
    return jsonResponse(request, 500, { error: message })
  }
}
