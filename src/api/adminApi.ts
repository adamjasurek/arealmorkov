import type { MenuPdfType } from '@/types/content'

const ADMIN_TOKEN_KEY = 'adminToken'

function apiBase() {
  return '/api'
}

export function getAdminToken(): string | null {
  if (typeof sessionStorage === 'undefined') return null
  return sessionStorage.getItem(ADMIN_TOKEN_KEY)
}

export function setAdminToken(token: string) {
  sessionStorage.setItem(ADMIN_TOKEN_KEY, token)
}

export function clearAdminSession() {
  sessionStorage.removeItem(ADMIN_TOKEN_KEY)
  sessionStorage.removeItem('adminLoggedIn')
}

export async function loginUser(password: string): Promise<void> {
  const response = await fetch(`${apiBase()}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })

  const raw = await response.text()
  let data: { adminToken?: string; error?: string }
  try {
    data = JSON.parse(raw) as { adminToken?: string; error?: string }
  } catch {
    throw new Error(
      response.status >= 500
        ? 'Chyba API na serveru — zkontrolujte env proměnné na Vercelu (ADMIN_PASSWORD, ADMIN_SESSION_SECRET).'
        : 'Neočekávaná odpověď serveru.',
    )
  }

  if (!response.ok) {
    throw new Error(data.error ?? 'Přihlášení se nezdařilo.')
  }
  if (!data.adminToken) {
    throw new Error('Chybí admin token.')
  }

  setAdminToken(data.adminToken)
  sessionStorage.setItem('adminLoggedIn', '1')
}

export async function verifyToken(): Promise<void> {
  const response = await adminFetch('verify-token')
  if (!response.ok) {
    throw new Error('Neplatný token')
  }
}

export async function adminFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers)
  const token = getAdminToken()
  if (token) {
    headers.set('X-Admin-Token', token)
  }
  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  return fetch(`${apiBase()}/${path}`, { ...init, headers })
}

export async function fetchAdminContent<T>(key: string): Promise<T> {
  const response = await adminFetch(`content/${key}`)
  const data = (await response.json()) as T & { error?: string }
  if (!response.ok) {
    throw new Error(data.error ?? 'Načtení dat selhalo.')
  }
  return data
}

export async function saveAdminContent<T extends object>(key: string, payload: T): Promise<void> {
  const response = await adminFetch(`content/${key}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  const data = (await response.json()) as { error?: string }
  if (!response.ok) {
    throw new Error(data.error ?? 'Uložení selhalo.')
  }
}

export async function uploadGalleryImage(
  folder: 'pool' | 'camp' | 'restaurant',
  slot: number,
  imageBase64: string,
): Promise<{ src: string; updatedAt: string }> {
  const response = await adminFetch('content/gallery', {
    method: 'POST',
    body: JSON.stringify({ folder, slot, imageBase64 }),
  })
  const data = (await response.json()) as { src?: string; updatedAt?: string; error?: string }
  if (!response.ok || !data.src) {
    throw new Error(data.error ?? 'Nahrání fotky selhalo.')
  }
  return { src: data.src, updatedAt: data.updatedAt ?? new Date().toISOString() }
}

export async function uploadMenuPdf(
  type: MenuPdfType,
  pdfBase64: string,
): Promise<{ path: string }> {
  const response = await adminFetch('content/menu-pdf-upload', {
    method: 'POST',
    body: JSON.stringify({ type, pdfBase64 }),
  })
  const data = (await response.json()) as { path?: string; error?: string }
  if (!response.ok || !data.path) {
    throw new Error(data.error ?? 'Nahrání PDF selhalo.')
  }
  return { path: data.path }
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Soubor se nepodařilo načíst.'))
      }
    }
    reader.onerror = () => reject(new Error('Soubor se nepodařilo načíst.'))
    reader.readAsDataURL(file)
  })
}
