import {test,after,before} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { SocialEngine,ROOT } from '../../social/engine.mjs';
import { deliveryInstant } from '../../social/catalog.mjs';
import { createSocialServer } from '../../scripts/social/server.mjs';
import { renderSlide } from '../../social/renderer.mjs';
import { TEMPLATES } from '../../social/catalog.mjs';
let root,engine,ids;
before(async()=>{
 await fs.mkdir(path.join(ROOT,'output/social-tests'),{recursive:true});
 root=await fs.mkdtemp(path.join(ROOT,'output/social-tests/hosteria-social-test-'));engine=new SocialEngine(root);
 for(const dir of ['social','content','src/data','content-sources','public/images/real'])await fs.mkdir(path.join(root,dir),{recursive:true});
 for(const file of ['social/renderer.mjs','social/catalog.mjs','social/admin.html','src/data/policies.ts','content-sources/photos.json'])await fs.copyFile(path.join(ROOT,file),path.join(root,file));
 const rows=JSON.parse(await fs.readFile(path.join(ROOT,'content/stories-calendar.json'),'utf8'));
 const photos=new Set(rows.flatMap(r=>r.slides.map(s=>s.photo)).filter(Boolean));photos.add('/images/real/cropped-logo-hosteria-1.webp');
 for(const photo of photos)await fs.copyFile(path.join(ROOT,'public',photo),path.join(root,'public',photo));
 const day=new Date(Date.now()+3*86400000).toISOString().slice(0,10);
 rows.forEach(r=>{r.date=day;r.time='12:30';});ids=rows.map(r=>r.id);
 await fs.writeFile(path.join(root,'content/stories-calendar.json'),JSON.stringify(rows));await engine.generate(ids);
});
after(async()=>{if(!root)return;const resolved=path.resolve(root);assert.ok(resolved.startsWith(path.resolve(ROOT,'output/social-tests')+path.sep)&&path.basename(resolved).startsWith('hosteria-social-test-'));await fs.rm(resolved,{recursive:true,force:true,maxRetries:3,retryDelay:150});});
test('generación: ocho archivos reales, todas sin aprobación ni cola',async()=>{
 const data=await engine.list();assert.equal(data.rows.length,4);assert.ok(data.rows.every(r=>r.status==='READY_FOR_APPROVAL'&&!r.approval));
 assert.equal((await engine.state()).jobs.length,0);assert.equal((await fs.readdir(engine.generated)).length,8);
});
test('no se puede programar sin aprobar; aprobar dos requiere confirmación',async()=>{
 await assert.rejects(engine.action('schedule',[ids[0]]),/aprob/);await assert.rejects(engine.action('approve',ids.slice(0,2)),/Confirm/);assert.equal((await engine.state()).jobs.length,0);
});
test('aprobación encola, es idempotente y se invalida al regenerar',async()=>{
 await engine.action('approve',[ids[0]]);await engine.action('schedule',[ids[0]]);
 assert.equal((await engine.state()).jobs.filter(j=>j.sequenceId===ids[0]&&j.status==='PENDING').length,1);
 assert.equal((await engine.list()).rows[0].status,'APPROVED');await engine.generate([ids[0]]);
 assert.equal((await engine.list()).rows[0].status,'READY_FOR_APPROVAL');assert.equal(await engine.claim(),null);
});
test('cambio de una pieza aprobada bloquea el despacho',async()=>{
 await engine.action('approve',[ids[0]]);const row=(await engine.list()).rows[0];await fs.appendFile(path.join(engine.generated,row.assets[0].file),'tampered');await assert.rejects(engine.claim(),/cambió/);await engine.generate([ids[0]]);
});
test('un resultado parcial no puede marcar SCHEDULED; fallo incierto no reintenta',async()=>{
 await engine.action('approve',[ids[1]]);const job=await engine.claim();assert.equal(job.sequence.id,ids[1]);
 await engine.attempt(job.reference,job.deliveries[0].platform+':'+job.deliveries[0].slideId);
 await assert.rejects(engine.complete({reference:job.reference,deliveries:[]}),/Faltan/);
 await engine.fail(job.reference,'access_token=secret https://example.com/private?token=x 1234567890123');
 assert.equal(await engine.claim(),null);const publicData=await engine.list();assert.ok(!JSON.stringify(publicData).includes('secret'));assert.ok(!JSON.stringify(publicData).includes('1234567890123'));
 await assert.rejects(engine.action('approve',[ids[1]]),/reconciliación/);
});
test('confirmación completa, cancelación real y no exponer Meta IDs',async()=>{
 await engine.action('approve',[ids[2]]);const job=await engine.claim();
 await fs.mkdir(path.join(root,'output/social-evidence'),{recursive:true});const file=path.join('output/social-evidence','proof.png');await fs.copyFile(job.files[0],path.join(root,file));
 const deliveries=[];for(const [index,d] of job.deliveries.entries()){await engine.attempt(job.reference,d.platform+':'+d.slideId);deliveries.push({...d,metaPostId:String(7000000000000+index),evidencePath:file,confirmed:true,accountVerified:true});}
 await engine.complete({reference:job.reference,deliveries});const row=(await engine.list()).rows[2];assert.equal(row.status,'SCHEDULED');assert.ok(!JSON.stringify(row).includes('7000000000000'));
 await assert.rejects(engine.action('schedule',[ids[2]]),/duplica/);await engine.action('cancel',[ids[2]]);assert.equal((await engine.list()).rows[2].status,'SCHEDULED');
 const cancel=await engine.claim();assert.equal(cancel.type,'CANCEL');for(const d of cancel.deliveries)await engine.attempt(cancel.reference,d.platform+':'+d.slideId);
 await engine.complete({reference:cancel.reference,deliveries:cancel.deliveries.map(d=>({...d,confirmed:true,accountVerified:true,evidencePath:file}))});
 assert.equal((await engine.list()).rows[2].status,'READY_FOR_APPROVAL');await engine.generate([ids[2]]);
});
test('la fecha habilita solo verificación; PUBLISHED exige evidencia real',async()=>{
 await engine.action('approve',[ids[3]]);const job=await engine.claim();const evidencePath='output/social-evidence/proof.png';
 for(const d of job.deliveries)await engine.attempt(job.reference,d.platform+':'+d.slideId);
 const deliveries=job.deliveries.map(d=>({...d,confirmed:true,accountVerified:true,evidencePath}));
 await engine.complete({reference:job.reference,deliveries});assert.equal(await engine.claim(),null);
 const originalNow=Date.now;Date.now=()=>Date.parse(job.deliveries.at(-1).scheduledAt)+1000;
 try{const verify=await engine.claim();assert.equal(verify.type,'VERIFY');assert.deepEqual(verify.files,[]);
 await assert.rejects(engine.complete({reference:verify.reference,deliveries}),/publicación real/);
 await engine.complete({reference:verify.reference,published:true,deliveries:deliveries.map(d=>({...d,published:true}))});
 assert.equal((await engine.list()).rows[3].status,'PUBLISHED');assert.equal(await engine.claim(),null);
 }finally{Date.now=originalNow;}
});

test('la API local exige origen y CSRF, no sirve el directorio privado',async()=>{
 // HTTP contract is tested on an isolated server; it never reaches Meta.
 const app=createSocialServer({root,port:0});await app.listen();const port=app.server.address().port,base='http://127.0.0.1:'+port;
 try{
  const page=await fetch(base+'/social-preview',{signal:AbortSignal.timeout(5000)});assert.equal(page.status,200);const token=(await page.text()).match(/name="social-csrf" content="([^"]+)"/)[1];
  assert.equal((await fetch(base+'/.social-private/state.json')).status,404);
  assert.equal((await fetch(base+'/api/social/actions',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'})).status,403);
  assert.equal((await fetch(base+'/api/social/actions',{method:'POST',headers:{'Content-Type':'application/json','X-Social-CSRF':token,Origin:'https://evil.invalid'},body:'{}'})).status,403);
  const response=await fetch(base+'/api/social/actions',{method:'POST',headers:{'Content-Type':'application/json','X-Social-CSRF':token,Origin:base},body:JSON.stringify({action:'complete',ids:[ids[3]],metaPostId:'fake'})});assert.equal(response.status,400);
 }finally{await new Promise(resolve=>app.server.close(resolve));}
});
test('los doce templates renderizan a 1080×1920, sin stickers falsos',async()=>{
 for(const template of Object.keys(TEMPLATES)){
  const slide={id:'TEST-SLIDE',template,title:'Tu verano.',body:'Tiempo para descansar.',cta:'Consultanos por mensaje.',...(TEMPLATES[template].theme==='photo'?{photo:'/images/real/resized_dsc_0013-scaled.webp'}:{})};
  const asset=await renderSlide(root,slide,'TEST-'+template.toUpperCase(),0,path.join(root,'output/template-tests'));assert.equal(asset.width,1080);assert.equal(asset.height,1920);assert.equal(asset.qa.nativeSticker,false);
 }
});
