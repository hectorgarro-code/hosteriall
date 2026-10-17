import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

// Import only images explicitly referenced by the owner's existing public site.
const root = process.cwd();
const html = await fs.readFile(path.join(root, 'output/temporada-2027/web-publica-original.html'), 'utf8');
const urls = [...new Set((html.match(/https?:[^\s"'<>]+/g) || [])
  .map(url => url.replaceAll('&amp;', '&'))
  .filter(url => url.includes('/wp-content/uploads/') && /\.(jpg|jpeg)$/.test(url)))]
  .filter(url => /\/2020\/12\//.test(url) || !/-\d+x\d+\./.test(url));
const cached = JSON.parse(await fs.readFile(path.join(root, 'output/temporada-2027/referencias/manifest.json'), 'utf8'));
const cachedAssets = Array.isArray(cached) ? cached : cached.assets || [];
const extra = cachedAssets.filter(item => /cropped-Logo-Hosteria-1|resized_DSC_0013/.test(item.url));
for (const item of extra) if (!urls.includes(item.url)) urls.push(item.url);
const destinationHtml = await fs.readFile(path.join(root, 'output/temporada-2027/destino-original.html'), 'utf8').catch(() => '');
const destinationPhoto = (destinationHtml.match(/https?:[^\s"'<>]+/g) || []).find(url => url.endsWith('/tam_inst-34.jpg'));
if (destinationPhoto) urls.push(destinationPhoto);
const originals = path.join(root, 'output/importacion-fotos/originales');
const destination = path.join(root, 'public/images/real');
await fs.mkdir(originals, { recursive: true });
await fs.mkdir(destination, { recursive: true });
await fs.mkdir(path.join(root, 'content-sources'), { recursive: true });
const manifest = [];
let cursor = 0;
async function worker() {
  while (cursor < urls.length) {
    const url = urls[cursor++];
    const originalName = decodeURIComponent(new URL(url).pathname.split('/').at(-1));
    const stem = originalName.replace(/\.(jpg|jpeg|png)$/i, '').toLowerCase();
    const original = path.join(originals, originalName);
    let buffer;
    try { buffer = await fs.readFile(original); }
    catch {
      const response = await fetch(url, { signal: AbortSignal.timeout(45000) });
      if (!response.ok) throw new Error(`${response.status}: ${url}`);
      buffer = Buffer.from(await response.arrayBuffer());
      await fs.writeFile(original, buffer);
    }
    const metadata = await sharp(buffer).metadata();
    const filename = `${stem}.webp`;
    await sharp(buffer).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 85 }).toFile(path.join(destination, filename));
    manifest.push({ sourceUrl: url, sourcePage: originalName === 'tam_inst-34.jpg' ? 'https://www.hosterialalucila.com.ar/index.php/2019/05/17/muelle-la-lucila/' : 'https://www.hosterialalucila.com.ar/', importedOn: '2026-10-16', originalName, width: metadata.width, height: metadata.height, sha256Original: createHash('sha256').update(buffer).digest('hex'), localPath: `/images/real/${filename}` });
    console.log(`Imported ${originalName}`);
  }
}
await Promise.all([worker(), worker(), worker()]);
manifest.sort((a, b) => a.localPath.localeCompare(b.localPath));
await fs.writeFile(path.join(root, 'content-sources/photos.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`${manifest.length} photographs/logo imported. No retouching or generated images.`);
