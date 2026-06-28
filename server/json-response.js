const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
}

export function jsonResponse(request, status, body, extraHeaders = {}) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    ...CORS_HEADERS,
    ...extraHeaders,
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers })
  }

  return new Response(JSON.stringify(body), { status, headers })
}
