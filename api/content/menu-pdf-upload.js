import { verifyAdminToken } from '../../server/auth-helper.js'
import { writeRepoBinary, readRepoJson, writeRepoJson } from '../../server/github-files.js'
import { jsonResponse } from '../../server/json-response.js'

const TYPES = new Set(['stala', 'poledni', 'vikend', 'napoje'])
const MAX_BYTES = 15 * 1024 * 1024

const FILE_NAMES = {
  stala: 'stala-nabidka.pdf',
  poledni: 'poledni-menu.pdf',
  vikend: 'vikendove-menu.pdf',
  napoje: 'napojovy-listek.pdf',
}

export default async function handler(request) {
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
    const type = body?.type
    const rawBase64 = body?.pdfBase64

    if (!TYPES.has(type)) {
      return jsonResponse(request, 400, { error: 'Neplatný typ menu.' })
    }

    if (typeof rawBase64 !== 'string' || rawBase64.trim() === '') {
      return jsonResponse(request, 400, { error: 'Chybí PDF soubor.' })
    }

    const base64 = rawBase64.includes(',') ? rawBase64.split(',')[1] : rawBase64
    const pdfBuffer = Buffer.from(base64, 'base64')

    if (pdfBuffer.length === 0) {
      return jsonResponse(request, 400, { error: 'Prázdný soubor.' })
    }

    if (pdfBuffer.length > MAX_BYTES) {
      return jsonResponse(request, 400, { error: 'PDF je příliš velké (max 15 MB).' })
    }

    const header = pdfBuffer.subarray(0, 5).toString('utf8')
    if (!header.startsWith('%PDF-')) {
      return jsonResponse(request, 400, { error: 'Soubor není platné PDF.' })
    }

    const filename = FILE_NAMES[type]
    const publicPath = `/menu/${filename}`
    const repoPath = `public/menu/${filename}`

    await writeRepoBinary(repoPath, pdfBuffer, `admin: PDF menu ${type}`)

    const meta = await readRepoJson('public/data/menu-pdfs.json').catch(() => ({
      stala: null,
      poledni: null,
      vikend: null,
      napoje: null,
    }))

    const updated = {
      ...meta,
      [type]: publicPath,
      updatedAt: new Date().toISOString(),
    }

    await writeRepoJson('public/data/menu-pdfs.json', updated, `admin: metadata PDF menu ${type}`)

    return jsonResponse(request, 200, { ok: true, path: publicPath, type })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Nahrání PDF selhalo.'
    return jsonResponse(request, 500, { error: message })
  }
}
