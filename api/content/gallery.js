import { verifyAdminToken } from '../../server/auth-helper.js'
import { writeRepoBinary } from '../../server/github-files.js'
import { convertBufferToWebp } from '../../server/convert-to-webp.js'
import { jsonResponse } from '../../server/json-response.js'
import { defineRoute } from '../../server/vercel-fetch.js'

const FOLDERS = new Set(['pool', 'camp', 'restaurant'])
const MAX_BYTES = 12 * 1024 * 1024

export default defineRoute(async function galleryUploadHandler(request) {
  if (request.method === 'OPTIONS') {
    return jsonResponse(request, 204, {})
  }

  if (request.method !== 'POST') {
    return jsonResponse(request, 405, { error: 'Method not allowed' })
  }

  try {
    const auth = verifyAdminToken(request.headers)
    if (!auth.ok) {
      return jsonResponse(request, 401, { error: 'Unauthorized' })
    }

    const body = await request.json()
    const folder = body?.folder
    const slot = Number(body?.slot)
    const rawBase64 = body?.imageBase64

    if (!FOLDERS.has(folder) || !Number.isInteger(slot) || slot < 1 || slot > 8) {
      return jsonResponse(request, 400, { error: 'Neplatná galerie nebo slot (1–8).' })
    }

    if (typeof rawBase64 !== 'string' || rawBase64.trim() === '') {
      return jsonResponse(request, 400, { error: 'Chybí obrázek.' })
    }

    const base64 = rawBase64.includes(',') ? rawBase64.split(',')[1] : rawBase64
    const input = Buffer.from(base64, 'base64')

    if (input.length === 0) {
      return jsonResponse(request, 400, { error: 'Prázdný soubor.' })
    }

    if (input.length > MAX_BYTES) {
      return jsonResponse(request, 400, { error: 'Soubor je příliš velký (max 12 MB).' })
    }

    const webp = await convertBufferToWebp(input)
    const filename = `${folder}-${slot}.webp`
    const repoPath = `public/img/galleries/${folder}/${filename}`

    await writeRepoBinary(repoPath, webp, `admin: fotka galerie ${folder} #${slot}`)

    return jsonResponse(request, 200, {
      ok: true,
      src: `/img/galleries/${folder}/${encodeURIComponent(filename)}`,
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Nahrání selhalo.'
    return jsonResponse(request, 500, { error: message })
  }
})
