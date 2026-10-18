import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const destination=path.join(root,'output/instagram-destacadas-2027');
const green='#155B38',cream='#F7F1E4';
// Original vector artwork; all visible strokes fit well inside Instagram's circular crop.
const icons=[
 {id:'01-promos',name:'Promos',meaning:'Etiqueta de promociones',paths:'<path d="M68 74h68l61 61-62 62-67-67Z"/><circle cx="98" cy="104" r="7"/><path d="m119 157 39-39"/><circle cx="124" cy="124" r="5"/><circle cx="154" cy="154" r="5"/>'},
 {id:'02-esperando',name:'Esperando…',meaning:'Sol y horizonte: la espera del verano',paths:'<path d="M65 151h126M72 169c14-13 28 13 42 0s28 13 42 0 24 9 31 4"/><path d="M92 140a39 39 0 0 1 72 0M128 65v17M76 87l12 12M180 87l-12 12M61 128h16M195 128h-16"/>'},
 {id:'03-la-hosteria',name:'La Hosteria',meaning:'Casa: la hostería',paths:'<path d="m62 123 66-57 66 57M78 113v77h100v-77M112 190v-50h32v50"/><path d="M167 96V74h17v36"/>'},
 {id:'04-lucila-del-mar',name:'Lucila del Mar',meaning:'Sol y olas: el destino',paths:'<circle cx="128" cy="90" r="21"/><path d="M128 50v-8M128 138v-8M88 90h-8M176 90h-8M100 62l-6-6M156 118l6 6M156 62l6-6M100 118l-6 6M62 160c16-17 32 17 48 0s32 17 48 0 28 10 36 3M62 187c16-17 32 17 48 0s32 17 48 0 28 10 36 3"/>'},
 {id:'05-habitaciones',name:'Habitaciones',meaning:'Cama: las habitaciones',paths:'<path d="M61 104v89M195 125v68M61 169h134M61 149h134v-22c0-11-9-20-20-20h-55v42"/><path d="M78 149v-29h26v29M61 183h134"/>'},
 {id:'06-destacada',name:'Destacada',meaning:'Estrella: momentos destacados',paths:'<path d="m128 60 21 43 48 7-35 34 8 48-42-23-42 23 8-48-35-34 48-7Z"/>'},
];
await fs.mkdir(destination,{recursive:true});
const stroke=`fill="none" stroke="${cream}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"`;
for(const icon of icons){
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 256 256"><rect width="256" height="256" fill="${green}"/><circle cx="128" cy="128" r="102" fill="none" stroke="${cream}" stroke-width="1.5" opacity=".4"/><g ${stroke} transform="translate(128 128) scale(.86) translate(-128 -128)">${icon.paths}</g></svg>`;
 await fs.writeFile(path.join(destination,icon.id+'.svg'),svg);
 await sharp(Buffer.from(svg)).png().toFile(path.join(destination,icon.id+'.png'));
 const meta=await sharp(path.join(destination,icon.id+'.png')).metadata();
 if(meta.width!==1080||meta.height!==1080)throw Error('Dimensiones de portada incorrectas.');
}
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;');
const tiles=[];
for(const [i,icon] of icons.entries()){
 const col=i%3,row=Math.floor(i/3),left=col*360,top=row*350;
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="360" height="350"><circle cx="180" cy="142" r="112" fill="${green}"/><circle cx="180" cy="142" r="90" fill="none" stroke="${cream}" opacity=".4"/><g ${stroke} transform="translate(67 29) scale(.88) translate(128 128) scale(.86) translate(-128 -128)">${icon.paths}</g><text x="180" y="291" text-anchor="middle" font-family="Arial" font-size="25" fill="${green}">${escape(icon.name)}</text></svg>`;
 tiles.push({input:await sharp(Buffer.from(svg)).png().toBuffer(),left,top});
}
await sharp({create:{width:1080,height:700,channels:4,background:cream}}).composite(tiles).png().toFile(path.join(destination,'vista-conjunto.png'));
await fs.writeFile(path.join(destination,'portadas.json'),JSON.stringify({account:'@hosterialalucila',status:'PREPARED_NOT_APPLIED',size:1080,colors:{green,cream},icons:icons.map(({paths,...icon})=>({...icon,png:icon.id+'.png',svg:icon.id+'.svg'}))},null,2));
await fs.writeFile(path.join(destination,'LEEME.md'),'# Portadas de historias destacadas\n\nSeis portadas originales 1080×1080 con iconos vectoriales, verde/marfil y centro compatible con recorte circular. Nombres conservados según la captura: «Esperando…» es el nombre visible truncado; no renombrar sin comprobar el nombre completo. No cambian ni eliminan historias.\n\nEstado: preparadas, NO aplicadas en Instagram. La edición de las portadas queda pendiente del acceso autorizado al navegador y de que Instagram ofrezca esa edición; si la versión web no la ofrece, debe comprobarse la alternativa oficial antes de prometer automatización. No subirlas como nuevas Stories sin autorización específica.\n\nRegenerar con node scripts/social/highlights.mjs.\n');
console.log('Seis portadas preparadas y verificadas a 1080×1080. No se modificó Instagram.');
