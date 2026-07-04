import { jsonResponse } from './json-response.js'

export function defineRoute(handler) {
  return {
    async fetch(request) {
      try {
        return await handler(request)
      } catch (error) {
        console.error(error)
        const message = error instanceof Error ? error.message : 'Chyba serveru'
        return jsonResponse(request, 500, { error: message })
      }
    },
  }
}
