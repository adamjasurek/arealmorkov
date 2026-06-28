import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const TARGET_DIRS = [
  path.join(ROOT, 'public', 'img'),
  path.join(ROOT, 'src', 'assets'),
]

const SOURCE_EXT = new Set(['.jpg', '.jpeg', '.png'])
const QUALITY = 82

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(full)))
    } else if (entry.isFile()) {
      files.push(full)
    }
  }

  return files
}

async function shouldConvert(sourcePath, webpPath) {
  try {
    const [sourceStat, webpStat] = await Promise.all([
      fs.stat(sourcePath),
      fs.stat(webpPath),
    ])
    // Přeskočit, pokud WebP už existuje a není starší než zdroj
    return sourceStat.mtimeMs > webpStat.mtimeMs
  } catch {
    return true
  }
}

async function removeSourceIfConverted(sourcePath, webpPath) {
  if (process.env.KEEP_IMAGE_SOURCES === '1') return
  try {
    const [sourceStat, webpStat] = await Promise.all([
      fs.stat(sourcePath),
      fs.stat(webpPath),
    ])
    if (webpStat.size > 0 && webpStat.mtimeMs >= sourceStat.mtimeMs - 2000) {
      await fs.unlink(sourcePath)
    }
  } catch {
    /* ponechat zdroj */
  }
}

async function convertFile(sourcePath) {
  const ext = path.extname(sourcePath).toLowerCase()
  if (!SOURCE_EXT.has(ext)) return null

  const webpPath = `${sourcePath.slice(0, -ext.length)}.webp`
  if (!(await shouldConvert(sourcePath, webpPath))) {
    return { sourcePath, webpPath, skipped: true }
  }

  try {
    await sharp(sourcePath, { failOn: 'none' })
      .rotate()
      .webp({ quality: QUALITY, effort: 4 })
      .toFile(webpPath)

    const [before, after] = await Promise.all([fs.stat(sourcePath), fs.stat(webpPath)])
    await removeSourceIfConverted(sourcePath, webpPath)
    return {
      sourcePath,
      webpPath,
      skipped: false,
      savedBytes: before.size - after.size,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return { sourcePath, webpPath, skipped: true, error: message }
  }
}

async function main() {
  let converted = 0
  let skipped = 0
  let failed = 0
  let savedBytes = 0

  for (const dir of TARGET_DIRS) {
    try {
      await fs.access(dir)
    } catch {
      continue
    }

    const files = await walk(dir)
    for (const file of files) {
      const result = await convertFile(file)
      if (!result) continue
      if (result.skipped) {
        if (result.error) {
          failed += 1
          console.warn(`⚠ ${path.relative(ROOT, result.sourcePath)}: ${result.error}`)
        } else {
          skipped += 1
        }
        continue
      }
      converted += 1
      savedBytes += result.savedBytes
      const rel = path.relative(ROOT, result.webpPath)
      console.log(`✓ ${rel}`)
    }
  }

  console.log(
    `Hotovo: ${converted} nových WebP, ${skipped} beze změny, ${failed} chyb, ušetřeno ${Math.round(savedBytes / 1024)} KB`,
  )

  if (process.env.KEEP_IMAGE_SOURCES !== '1') {
    await cleanupConvertedSources()
  }
}

async function cleanupConvertedSources() {
  let removed = 0

  for (const dir of TARGET_DIRS) {
    try {
      await fs.access(dir)
    } catch {
      continue
    }

    const files = await walk(dir)
    for (const file of files) {
      const ext = path.extname(file).toLowerCase()
      if (!SOURCE_EXT.has(ext)) continue

      const webpPath = `${file.slice(0, -ext.length)}.webp`
      try {
        await fs.access(webpPath)
        await fs.unlink(file)
        removed += 1
      } catch {
        /* webp neexistuje – zdroj ponechat */
      }
    }
  }

  if (removed > 0) {
    console.log(`Odstraněno ${removed} původních JPG/PNG (WebP verze zůstávají).`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
