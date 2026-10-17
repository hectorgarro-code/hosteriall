import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const pages = ['', 'verano-2027', 'habitaciones', 'habitaciones/doble-estandar', 'habitaciones/triple-estandar', 'habitaciones/triple-parque', 'habitaciones/triple-balcon', 'servicios', 'galeria', 'contacto', 'la-lucila-del-mar'];
const sources = JSON.parse(await fs.readFile('content-sources/photos.json', 'utf8'));
const importedPhotos = new Set(sources.map(photo => photo.localPath));
let photoReferences = 0;
for (const route of pages) {
  const html = await fs.readFile(path.join('out', route, 'index.html'), 'utf8');
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  assert.equal(canonical?.[1], 'https://www.hosterialalucila.com.ar/' + (route ? route + '/' : ''), 'Wrong canonical: ' + route);
  assert.ok(!html.includes('/_next/image?'), 'Server-only image optimizer in ' + route);
  assert.ok(!/\[TODO:|Vacaciones 2026|COVID|Mariana S\.|Carlos R\.|Lucía M\.|Esteban G\./.test(html), 'Sample/stale content in ' + route);
  for (const src of new Set([...html.matchAll(/(?:src|href)="(\/images\/[^"?]+)"/g)].map(match => match[1]))) {
    assert.ok(importedPhotos.has(src), 'Image without provenance: ' + src);
    await fs.access('out' + src);
    photoReferences++;
  }
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] || '{}');
  assert.equal(schema.checkinTime, '14:00');
  assert.equal(schema.checkoutTime, '10:00');
  assert.equal(schema.petsAllowed, true);
}
for (const filename of ['robots.txt', 'sitemap.xml', '.htaccess', '404.html', 'favicon.ico']) await fs.access('out/' + filename);
const home = await fs.readFile('out/index.html', 'utf8');
assert.ok(home.includes('Desayuno incluido'));
assert.ok(home.includes('Mascotas permitidas'));
const contact = await fs.readFile('out/contacto/index.html', 'utf8');
assert.ok(contact.includes('efectivo') || contact.includes('Efectivo'));
assert.ok(contact.includes('Reserva con seña'));
assert.ok(!home.includes('2027-01-10'), 'Fixed inquiry dates');

// Exercise the actual WhatsApp formatter with a family inquiry and a generic
// inquiry. Generic links must not invent a number of guests.
const configSource = await fs.readFile('src/data/config.ts', 'utf8');
const configModule = { exports: {} };
const evaluateModule = (source, module, require) => new Function('module', 'exports', 'require', ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText)(module, module.exports, require);
evaluateModule(configSource, configModule, () => { throw new Error('Unexpected config dependency'); });
const whatsappModule = { exports: {} };
evaluateModule(await fs.readFile('src/lib/whatsapp.ts', 'utf8'), whatsappModule, name => {
  assert.equal(name, '@/data/config');
  return configModule.exports;
});
const familyUrl = new URL(whatsappModule.exports.getWhatsAppUrl({ checkIn: '2027-01-10', checkOut: '2027-01-17', adults: 2, children: 2, childrenAges: '4 y 8', roomName: 'Triple Parque', notes: 'Consultar opciones para varias habitaciones.' }));
const message = familyUrl.searchParams.get('text');
assert.equal(familyUrl.pathname, '/5491150042443');
assert.ok(message.includes('10/01/2027') && message.includes('17/01/2027'));
assert.ok(message.includes('2 adultos y 2 niños'));
assert.ok(message.includes('4 y 8') && message.includes('Triple Parque'));
assert.ok(!whatsappModule.exports.buildWhatsAppMessage().includes('adultos'));
console.log(JSON.stringify({ result: 'passed', commercialPages: pages.length, photoReferences, importedAssets: sources.length, canonicalUrls: 'correct', staticExport: true, ownerConfirmedPolicies: 'present', whatsappMessages: 'passed' }, null, 2));
