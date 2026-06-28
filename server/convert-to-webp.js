import sharp from 'sharp'

/**
 * Převod nahraného obrázku na WebP (admin upload, API).
 * @param {Buffer} input
 * @param {{ maxWidth?: number, quality?: number }} [options]
 * @returns {Promise<Buffer>}
 */
export async function convertBufferToWebp(input, options = {}) {
  const { maxWidth = 1920, quality = 82 } = options

  let pipeline = sharp(input, { failOn: 'none' }).rotate()
  const metadata = await pipeline.metadata()

  if (metadata.width && metadata.width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true })
  }

  return pipeline.webp({ quality, effort: 4 }).toBuffer()
}

/**
 * @param {string} repoRelativePath e.g. public/img/galleries/pool/photo.webp
 * @param {Buffer} webpBuffer
 */
export function webpFilename(originalName) {
  return originalName.replace(/\.(jpe?g|png)$/i, '.webp')
}
