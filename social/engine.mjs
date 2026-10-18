import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { CAPABILITIES, PLATFORMS, TIMEZONE, scheduledInstant, deliveryInstant, scheduleWindow, sanitize } from './catalog.mjs';
import { renderSlide } from './renderer.mjs';

const hash = data => crypto.createHash('sha256').update(data).digest('hex');
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export class SocialError extends Error { constructor(message, status=409) { super(message); this.status=status; } }
export class SocialEngine {
  constructor(root=ROOT) { this.root=root; this.privateDir=path.join(root,'.social-private'); this.generated=path.join(root,'output/social-stories'); }
  async source() { return JSON.parse(await fs.readFile(path.join(this.root,'content/stories-calendar.json'),'utf8')); }
  async state() { try { return JSON.parse(await fs.readFile(path.join(this.privateDir,'state.json'),'utf8')); } catch(e) { if(e.code!=='ENOENT')throw e; return {rows:{}, jobs:[], events:[]}; } }
  async locked(fn) {
    await fs.mkdir(this.privateDir,{recursive:true}); let lock;
    try { lock=await fs.open(path.join(this.privateDir,'write.lock'),'wx',0o600); }
    catch(e) { if(e.code==='EEXIST')throw new SocialError('Hay otra operación en curso. Esperá a que termine.'); throw e; }
    try { const state=await this.state(); const result=await fn(state); const temp=path.join(this.privateDir,'state.tmp'); await fs.writeFile(temp,JSON.stringify(state,null,2),{mode:0o600}); await fs.rename(temp,path.join(this.privateDir,'state.json')); return result; }
    finally { await lock.close(); await fs.unlink(path.join(this.privateDir,'write.lock')); }
  }
  async fingerprint(row) {
    const parts=[JSON.stringify({date:row.date,time:row.time,timezone:row.timezone,platforms:row.platforms,slides:row.slides,interaction:row.interaction,publishMode:row.publishMode}), await fs.readFile(path.join(this.root,'social/renderer.mjs')),await fs.readFile(path.join(this.root,'social/catalog.mjs')),await fs.readFile(path.join(this.root,'src/data/policies.ts')),await fs.readFile(path.join(this.root,'public/images/real/cropped-logo-hosteria-1.webp'))];
    for(const slide of row.slides) if(slide.photo) {
      const photo=path.resolve(this.root,'public','.'+slide.photo);
      if(!photo.startsWith(path.resolve(this.root,'public/images/real')+path.sep))throw new SocialError('Foto no autorizada.',400);
      parts.push(await fs.readFile(photo));
    }
    return hash(Buffer.concat(parts.map(p=>Buffer.from(p))));
  }
  event(state,id,action,result,error='') { state.events.push({date:new Date().toISOString(),publication:id,action,result,reference:crypto.randomUUID().slice(0,8),error:sanitize(error)}); }
  async row(state,id) {
    const base=(await this.source()).find(r=>r.id===id); if(!base)throw new SocialError('Secuencia inexistente.',404);
    return {...base,...state.rows[id]};
  }
  async assertAssets(row) {
    if(!row.assets?.length || row.assets.length!==row.slides.length)throw new SocialError('Primero generá todas las láminas.');
    for(const asset of row.assets) {
      const file=path.resolve(this.generated,asset.file);
      if(!file.startsWith(this.generated+path.sep)||hash(await fs.readFile(file))!==asset.sha256)throw new SocialError('La pieza cambió o falta. Regenerala y revisala antes de aprobar.');
    }
  }
  publicRow(row) {
    return {...row,metaPostId:row.metaPostId?'[recibo protegido]':null,approval:row.approval?{date:row.approval.date}:null,
      assets:(row.assets||[]).map(a=>({slideId:a.slideId,file:a.file,width:a.width,height:a.height,qa:a.qa})),
      error:sanitize(row.error),result:row.result||'Sin confirmación de Meta'};
  }
  async list() {
    const state=await this.state(), rows=[];
    for(const base of await this.source()) {
      const row={...base,...state.rows[base.id]};
      row.approvalStale=!!row.approval && row.approval.hash!==await this.fingerprint(row);
      rows.push(this.publicRow(row));
    }
    return {rows,capabilities:CAPABILITIES,timezone:TIMEZONE,events:state.events.slice(-100).map(e=>({...e,error:sanitize(e.error)}))};
  }
  validate(row) {
    if(!/^[A-Z0-9-]{4,80}$/.test(row.id)||row.slides.some(s=>!/^[A-Za-z0-9-]{4,100}$/.test(s.id)))throw new SocialError('Identificador editorial inválido.',400);
    if(!/^\d{4}-\d{2}-\d{2}$/.test(row.date)||!/^([01]\d|2[0-3]):[0-5]\d$/.test(row.time)||!Number.isFinite(+scheduledInstant(row))||new Date(row.date+'T00:00:00Z').toISOString().slice(0,10)!==row.date)throw new SocialError('Fecha inválida.',400);
    if(row.timezone!==TIMEZONE||row.slides.length<1||row.slides.length>3)throw new SocialError('Zona horaria o cantidad de láminas inválida.',400);
    if(!row.platforms.length || new Set(row.platforms).size!==row.platforms.length || row.platforms.some(p=>!PLATFORMS.includes(p)))throw new SocialError('Plataforma inválida.',400);
    if(row.interaction?.nativeRequired)throw new SocialError('El piloto usa contenido sin stickers nativos. Requiere revisión técnica.',400);
  }
  async generate(ids) {
    return this.locked(async state=>{
      for(const id of ids) {
        const row=await this.row(state,id);this.validate(row);
        if(row.metaPostId || row.externalConfirmed || state.jobs.some(j=>j.sequenceId===id&&j.status!=='RETIRED'&&j.attempts?.length))throw new SocialError('Hay una entrega o intento externo. Reconciliar antes de regenerar.');
        state.jobs.filter(j=>j.sequenceId===id&&j.status!=='CANCELLED').forEach(j=>j.status='CANCELLED');
        state.rows[id]={...state.rows[id],status:'GENERATED',approval:null,dispatchStatus:null,error:null,metaPostId:null};
        const assets=[];
        for(let i=0;i<row.slides.length;i++)assets.push(await renderSlide(this.root,row.slides[i],id,i,this.generated));
        state.rows[id]={...state.rows[id],assets,status:'READY_FOR_APPROVAL',generatedHash:await this.fingerprint(row),reviewDecision:null,result:'Piezas generadas. Falta tu aprobación.'};
        this.event(state,id,'GENERATE','READY_FOR_APPROVAL');
      }
      return {ok:true};
    });
  }
  async action(action,ids,{batchConfirmed=false}={}) {
    if(!Array.isArray(ids)||!ids.length||new Set(ids).size!==ids.length)throw new SocialError('Selección inválida.',400);
    if(ids.length>1&&!batchConfirmed)throw new SocialError('Confirmá la operación múltiple antes de encolar.');
    if(action==='regenerate')return this.generate(ids);
    if(!['approve','reject','schedule','cancel'].includes(action))throw new SocialError('Acción no permitida.',400);
    return this.locked(async state=>{
      // Validate the whole batch before changing any sequence.
      const rows=[];
      for(const id of ids){const row=await this.row(state,id);this.validate(row);const digest=await this.fingerprint(row);
        const jobs=state.jobs.filter(j=>j.sequenceId===id&&!['CANCELLED','RETIRED'].includes(j.status));
        if(['approve','schedule'].includes(action)) {
          if(row.metaPostId||['SCHEDULED','PUBLISHED'].includes(row.status))throw new SocialError('Ya existe confirmación de Meta. No se duplica.');
          if(jobs.some(j=>j.attempts?.length))throw new SocialError('Un intento externo requiere reconciliación; no se reintenta automáticamente.');
          if(scheduleWindow(row)==='PAST_OR_TOO_SOON')throw new SocialError('La fecha ya pasó o falta menos de 20 minutos.');
          await this.assertAssets(row);
          if(row.generatedHash!==digest)throw new SocialError('Los datos cambiaron. Regenerá y revisá las imágenes.');
          if(action==='approve'&&!['READY_FOR_APPROVAL','APPROVED'].includes(row.status))throw new SocialError('La secuencia no está lista para aprobación.');
          if(action==='schedule'&&(row.status!=='APPROVED'||row.approval?.hash!==digest))throw new SocialError('Primero aprobá la versión actual.');
        }
        if(['reject','cancel'].includes(action)&&jobs.some(j=>j.status==='IN_PROGRESS'))throw new SocialError('El operador está trabajando. Hay que reconciliar antes de cancelar.');
        if(action==='reject'&&(row.metaPostId||row.externalConfirmed))throw new SocialError('Cancelá la programación antes de rechazar.');
        rows.push({row,digest,jobs});
      }
      for(const {row,digest,jobs} of rows){const id=row.id;
        if(action==='approve'||action==='schedule') {
          const approval=action==='approve'?{date:new Date().toISOString(),hash:digest}:row.approval;
          const active=jobs.find(j=>j.contentHash===digest&&['PENDING','WAITING_WINDOW','IN_PROGRESS'].includes(j.status));
          if(!active)state.jobs.push({reference:crypto.randomUUID(),sequenceId:id,type:'SCHEDULE',contentHash:digest,status:scheduleWindow(row)==='WAITING_WINDOW'?'WAITING_WINDOW':'PENDING',attempts:[],deliveries:[],createdAt:new Date().toISOString()});
          state.rows[id]={...state.rows[id],approval,status:'APPROVED',dispatchStatus:scheduleWindow(row)==='WAITING_WINDOW'?'WAITING_WINDOW':'PENDING',error:null,result:'Aprobada y en cola del operador. Todavía no está confirmada en Meta.'};
          this.event(state,id,action.toUpperCase(),'QUEUED');
        } else if(action==='cancel'&&(row.metaPostId||row.externalConfirmed)) {
          if(!jobs.some(j=>j.type==='CANCEL'&&['PENDING','IN_PROGRESS'].includes(j.status)))state.jobs.push({reference:crypto.randomUUID(),sequenceId:id,type:'CANCEL',contentHash:digest,status:'PENDING',attempts:[],deliveries:[],createdAt:new Date().toISOString()});
          state.rows[id]={...state.rows[id],dispatchStatus:'CANCEL_PENDING',result:'Cancelación solicitada. Continúa programada hasta que Meta confirme la retirada.'};
          this.event(state,id,'CANCEL_REQUEST','PENDING');
        } else {
          jobs.forEach(j=>j.status='CANCELLED');
          state.rows[id]={...state.rows[id],approval:null,status:'READY_FOR_APPROVAL',dispatchStatus:null,reviewDecision:action==='reject'?'REJECTED':null,result:action==='reject'?'Rechazada. Podés regenerarla.':'Cola local cancelada; no se había enviado a Meta.'};
          this.event(state,id,action.toUpperCase(),'LOCAL_ONLY');
        }
      }
      return {ok:true};
    });
  }
  async claim() {
    return this.locked(async state=>{
      for(const job of state.jobs) if(job.status==='IN_PROGRESS'&&Date.now()-Date.parse(job.claimedAt)>15*60000) {
        job.status='UNCERTAIN';state.rows[job.sequenceId]={...state.rows[job.sequenceId],status:'FAILED',dispatchStatus:'UNCERTAIN',error:'El operador se interrumpió. Reconciliar el destino antes de repetir.'};
        this.event(state,job.sequenceId,'LEASE_EXPIRED','UNCERTAIN');
      }
      for(const job of state.jobs) {
        if(job.status==='CONFIRMED'&&job.type==='SCHEDULE') {
          const confirmedRow=await this.row(state,job.sequenceId);
          if(confirmedRow.status==='SCHEDULED'&&Date.now()>=+deliveryInstant(confirmedRow,confirmedRow.slides.at(-1).id)) {
            job.status='IN_PROGRESS';job.verifying=true;job.claimedAt=new Date().toISOString();
            this.event(state,confirmedRow.id,'VERIFY_PUBLICATION','IN_PROGRESS');
            return {reference:job.reference,type:'VERIFY',sequence:this.publicRow(confirmedRow),files:[],deliveries:job.deliveries.map(d=>({platform:d.platform,slideId:d.slideId,scheduledAt:d.scheduledAt}))};
          }
        }
        if(!['PENDING','WAITING_WINDOW'].includes(job.status))continue;
        const row=await this.row(state,job.sequenceId);
        if(job.type==='SCHEDULE') {
          if(row.status!=='APPROVED'||!row.approval||row.approval.hash!==await this.fingerprint(row)||job.contentHash!==row.approval.hash)continue;
          const window=scheduleWindow(row);
          if(window==='WAITING_WINDOW'){job.status='WAITING_WINDOW';continue;}
          if(window==='PAST_OR_TOO_SOON'){job.status='FAILED';state.rows[row.id]={...state.rows[row.id],status:'FAILED',error:'La fecha venció antes del despacho.'};continue;}
          await this.assertAssets(row);
        }
        job.status='IN_PROGRESS';job.claimedAt=new Date().toISOString();
        state.rows[row.id]={...state.rows[row.id],dispatchStatus:'IN_PROGRESS'};
        this.event(state,row.id,'CLAIM','IN_PROGRESS');
        return {reference:job.reference,type:job.type,sequence:this.publicRow(row),files:(row.assets||[]).map(a=>path.join(this.generated,a.file)),deliveries:row.platforms.flatMap(platform=>row.slides.map(slide=>({platform,slideId:slide.id,scheduledAt:deliveryInstant(row,slide.id).toISOString()})))};
      }
      return null;
    });
  }
  async attempt(reference,key) {
    return this.locked(async state=>{
      const job=state.jobs.find(j=>j.reference===reference&&j.status==='IN_PROGRESS');if(!job)throw new SocialError('Trabajo no reclamado.');
      if(job.attempts.includes(key))throw new SocialError('La entrega ya tiene un intento; reconciliar antes de repetir.');
      const row=await this.row(state,job.sequenceId);
      const keys=row.platforms.flatMap(p=>row.slides.map(s=>p+':'+s.id));
      if(!keys.includes(key))throw new SocialError('Destino o lámina inválidos.');
      if(job.type==='SCHEDULE'&&(row.status!=='APPROVED'||row.approval?.hash!==await this.fingerprint(row)))throw new SocialError('La aprobación ya no es válida.');
      if(job.type==='SCHEDULE')await this.assertAssets(row);
      job.attempts.push(key);this.event(state,row.id,'EXTERNAL_ATTEMPT','RECORDED');return {ok:true};
    });
  }
  async complete(receipt) {
    return this.locked(async state=>{
      const job=state.jobs.find(j=>j.reference===receipt.reference&&(j.status==='IN_PROGRESS'||(receipt.published===true&&j.status==='CONFIRMED'&&j.type==='SCHEDULE')));if(!job)throw new SocialError('Trabajo no reclamado o ya completado.');
      const row=await this.row(state,job.sequenceId);
      if(job.verifying&&!receipt.published)throw new SocialError('Falta la comprobación de publicación real.');
      if(job.type==='SCHEDULE'&&row.approval?.hash!==await this.fingerprint(row))throw new SocialError('La versión cambió durante la entrega; hay que reconciliar.');
      if(receipt.published&&Date.now()<+scheduledInstant(row))throw new SocialError('Todavía no llegó la fecha de publicación.');
      const expected=row.platforms.flatMap(p=>row.slides.map(s=>p+':'+s.id));
      const deliveries=receipt.deliveries||[], keys=deliveries.map(d=>d.platform+':'+d.slideId);
      if(keys.length!==expected.length||new Set(keys).size!==keys.length||expected.some(k=>!keys.includes(k)))throw new SocialError('Faltan recibos únicos de plataformas o láminas.');
      const suppliedIds=deliveries.map(d=>d.metaPostId).filter(Boolean);
      if(new Set(suppliedIds).size!==suppliedIds.length)throw new SocialError('Un mismo recibo no sirve para dos entregas.');
      for(const d of deliveries) {
        const key=d.platform+':'+d.slideId;
        if(!job.attempts.includes(key)||!d.confirmed||!d.accountVerified)throw new SocialError('Falta intento registrado o confirmación verificada del destino.');
        if(job.type==='SCHEDULE'&&d.scheduledAt!==deliveryInstant(row,d.slideId).toISOString())throw new SocialError('La fecha confirmada no coincide.');
        if(receipt.published&&!d.published)throw new SocialError('Falta verificación de publicación real.');
        const evidence=path.resolve(this.root,d.evidencePath||'');
        if(!evidence.startsWith(path.join(this.root,'output/social-evidence')+path.sep)||!['.png','.jpg','.jpeg'].includes(path.extname(evidence)))throw new SocialError('Falta evidencia local protegida.');
        const bytes=await fs.readFile(evidence);if(bytes.length<100)throw new SocialError('Evidencia vacía.');
        d.evidenceHash=hash(bytes);
        if(d.metaPostId&&state.jobs.some(j=>j.reference!==job.reference&&j.deliveries?.some(x=>x.metaPostId===d.metaPostId)))throw new SocialError('Ese recibo de Meta ya pertenece a otra entrega.');
      }
      job.deliveries=deliveries;job.status='CONFIRMED';
      const metaIds=deliveries.map(d=>d.metaPostId).filter(Boolean);
      state.rows[row.id]=job.type==='CANCEL'?{...state.rows[row.id],status:'READY_FOR_APPROVAL',approval:null,metaPostId:null,externalConfirmed:false,dispatchStatus:null,result:'Retirada confirmada en Meta. El contenido local se conserva.'}:{...state.rows[row.id],status:receipt.published?'PUBLISHED':'SCHEDULED',metaPostId:metaIds.length?metaIds:null,externalConfirmed:true,dispatchStatus:'CONFIRMED',result:receipt.published?'Publicación real verificada en todas las plataformas y láminas.':'Programación confirmada en todas las plataformas y láminas.'};
      if(job.type==='CANCEL')state.jobs.filter(j=>j.sequenceId===row.id).forEach(j=>j.status='RETIRED');
      this.event(state,row.id,job.type,'CONFIRMED');return {ok:true};
    });
  }
  async fail(reference,reason) {
    return this.locked(async state=>{
      const job=state.jobs.find(j=>j.reference===reference&&j.status==='IN_PROGRESS');if(!job)throw new SocialError('Trabajo no reclamado.');
      job.status=job.attempts.length?'UNCERTAIN':'FAILED';
      state.rows[job.sequenceId]={...state.rows[job.sequenceId],status:'FAILED',dispatchStatus:job.status,error:sanitize(reason),result:'No hay confirmación completa. No se reintentará automáticamente.'};
      this.event(state,job.sequenceId,'FAIL',job.status,reason);return {ok:true};
    });
  }
}
