import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import { TEMPLATES } from './catalog.mjs';

export const SAFE = { x: 90, y: 260, right: 990, bottom: 1590 };
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&apos;'}[c]));
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
function lines(text, max) {
  const result = []; let line = '';
  for (const word of String(text || '').split(/\s+/)) {
    if (word.length > max) throw new Error('Una palabra excede el ancho legible. Acortá el texto.');
    if (line && (line + ' ' + word).length > max) { result.push(line); line = word; }
    else line += (line ? ' ' : '') + word;
  }
  if (line) result.push(line);
  return result;
}
export async function renderSlide(root, slide, id, index, destination) {
  const template = TEMPLATES[slide.template];
  if (!template) throw new Error('Plantilla desconocida.');
  if (slide.interaction && slide.interaction !== 'NONE') throw new Error('El piloto no admite stickers nativos sin soporte verificado.');
  const photo = template.theme === 'photo';
  if (photo && !slide.photo) throw new Error('La plantilla fotográfica requiere una foto real.');
  const color = template.theme === 'cream' ? '#155B38' : '#FFFDF4';
  let image = '';
  if (slide.photo) {
    const asset = path.resolve(root, 'public', '.' + slide.photo);
    const allowed = path.resolve(root, 'public/images/real') + path.sep;
    if (!asset.startsWith(allowed)) throw new Error('Foto fuera del catálogo real autorizado.');
    const provenance = JSON.parse(await fs.readFile(path.join(root, 'content-sources/photos.json'), 'utf8'));
    if (!provenance.some(p => p.localPath === slide.photo)) throw new Error('La foto no tiene procedencia documentada.');
    const bytes = await sharp(await fs.readFile(asset)).resize(1080, 1920, {fit:'cover'}).jpeg({quality:90}).toBuffer();
    image = `<image x="0" y="0" width="1080" height="1920" href="data:image/jpeg;base64,${bytes.toString('base64')}"/><rect width="1080" height="1920" fill="url(#shade)"/>`;
  }
  const logo = await sharp(await fs.readFile(path.join(root, 'public/images/real/cropped-logo-hosteria-1.webp'))).resize(110, 110, {fit:'contain'}).png().toBuffer();
  const title = lines(slide.title, 19), body = lines(slide.body, 31), cta = lines(slide.cta, 31);
  if (title.length > 4 || body.length > 5 || cta.length > 2) throw new Error('Demasiado texto para una Story legible.');
  const titleY = photo ? 955 : 680;
  const bodyY = titleY + title.length * 100 + 45;
  if (bodyY + body.length * 57 > 1450) throw new Error('El texto invade el área de CTA.');
  const text = (ls, y, size, gap, font) => `<text x="90" y="${y}" fill="${color}" font-family="${font}" font-size="${size}">${ls.map((l,i)=>`<tspan x="90" dy="${i?gap:0}">${esc(l)}</tspan>`).join('')}</text>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920"><defs><linearGradient id="shade" x2="0" y2="1"><stop stop-color="#082718" stop-opacity=".64"/><stop offset=".4" stop-color="#082718" stop-opacity=".28"/><stop offset="1" stop-color="#082718" stop-opacity=".98"/></linearGradient></defs><rect width="1080" height="1920" fill="${template.theme==='cream'?'#F7F1E4':'#155B38'}"/>${photo?image:'<circle cx="960" cy="640" r="370" fill="none" stroke="#A8BC9850" stroke-width="3"/><circle cx="960" cy="640" r="290" fill="none" stroke="#A8BC9830" stroke-width="3"/>'}<circle cx="150" cy="320" r="63" fill="#F7F1E4"/><image x="95" y="265" width="110" height="110" href="data:image/png;base64,${logo.toString('base64')}"/><text x="235" y="310" fill="${color}" font-family="Arial" font-size="29" letter-spacing="4">HOSTERÍA</text><text x="235" y="354" fill="${color}" font-family="Georgia" font-size="38">LA LUCILA</text><text x="90" y="${titleY-100}" fill="${color}" font-family="Arial" font-size="27" letter-spacing="3">${esc(slide.eyebrow || template.label).toLocaleUpperCase('es-AR')}</text>${text(title,titleY,88,100,'Georgia')}${text(body,bodyY,43,57,'Arial')}<line x1="90" x2="990" y1="1470" y2="1470" stroke="${color}" opacity=".35"/>${text(cta,1530,42,50,'Arial')}</svg>`;
  const filename = `${id}-${index + 1}.png`;
  await fs.mkdir(destination, {recursive:true});
  const bytes = await sharp(Buffer.from(svg)).png().toBuffer();
  await fs.writeFile(path.join(destination, filename), bytes);
  return { slideId: slide.id, file: filename, sha256: sha(bytes), width:1080, height:1920,
    qa: { safeArea:true, realPhotoVerified:true, textFits:true, nativeSticker:false, contrast:'white on forest / forest on cream; photo overlay', visualReviewRequired:true } };
}
