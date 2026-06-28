import fs from 'node:fs/promises'
import path from 'node:path'

function repoConfig() {
  const token = process.env.GITHUB_TOKEN
  const repo = process.env.GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH ?? 'main'
  return { token, repo, branch, enabled: Boolean(token && repo) }
}

function localPath(repoRelativePath) {
  return path.join(process.cwd(), repoRelativePath)
}

async function readLocalFile(repoRelativePath) {
  const raw = await fs.readFile(localPath(repoRelativePath), 'utf8')
  return JSON.parse(raw)
}

async function writeLocalFile(repoRelativePath, content) {
  const full = localPath(repoRelativePath)
  await fs.mkdir(path.dirname(full), { recursive: true })
  await fs.writeFile(full, content, 'utf8')
}

async function githubRequest(url, options = {}) {
  const { token } = repoConfig()
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers ?? {}),
    },
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`GitHub API ${response.status}: ${text}`)
  }

  if (response.status === 204) return null
  return response.json()
}

export async function readRepoJson(repoRelativePath) {
  const { enabled, repo, branch } = repoConfig()

  if (!enabled) {
    return readLocalFile(repoRelativePath)
  }

  const url = `https://api.github.com/repos/${repo}/contents/${repoRelativePath}?ref=${encodeURIComponent(branch)}`
  const data = await githubRequest(url)

  if (!data || typeof data.content !== 'string') {
    throw new Error(`Soubor ${repoRelativePath} nenalezen na GitHubu.`)
  }

  const decoded = Buffer.from(data.content, 'base64').toString('utf8')
  return JSON.parse(decoded)
}

export async function writeRepoJson(repoRelativePath, object, commitMessage) {
  const content = `${JSON.stringify(object, null, 2)}\n`
  const { enabled, repo, branch } = repoConfig()

  if (!enabled) {
    await writeLocalFile(repoRelativePath, content)
    return { mode: 'local' }
  }

  const apiPath = repoRelativePath.split('/').map(encodeURIComponent).join('/')
  const url = `https://api.github.com/repos/${repo}/contents/${apiPath}`

  let sha
  try {
    const existing = await githubRequest(`${url}?ref=${encodeURIComponent(branch)}`)
    sha = existing?.sha
  } catch {
    sha = undefined
  }

  await githubRequest(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: commitMessage,
      content: Buffer.from(content, 'utf8').toString('base64'),
      branch,
      ...(sha ? { sha } : {}),
    }),
  })

  return { mode: 'github' }
}

export async function writeRepoBinary(repoRelativePath, buffer, commitMessage) {
  const { enabled, repo, branch } = repoConfig()

  if (!enabled) {
    const full = localPath(repoRelativePath)
    await fs.mkdir(path.dirname(full), { recursive: true })
    await fs.writeFile(full, buffer)
    return { mode: 'local' }
  }

  const apiPath = repoRelativePath.split('/').map(encodeURIComponent).join('/')
  const url = `https://api.github.com/repos/${repo}/contents/${apiPath}`

  let sha
  try {
    const existing = await githubRequest(`${url}?ref=${encodeURIComponent(branch)}`)
    sha = existing?.sha
  } catch {
    sha = undefined
  }

  await githubRequest(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: commitMessage,
      content: Buffer.from(buffer).toString('base64'),
      branch,
      ...(sha ? { sha } : {}),
    }),
  })

  return { mode: 'github' }
}
