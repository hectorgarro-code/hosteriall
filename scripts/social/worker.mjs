import fs from 'node:fs/promises';
import path from 'node:path';
import { SocialEngine } from '../../social/engine.mjs';
import { sanitize } from '../../social/catalog.mjs';
const engine=new SocialEngine();
const [command,arg,key]=process.argv.slice(2);
try {
  if(command==='claim') {const job=await engine.claim();console.log(JSON.stringify(job||{pending:false}));}
  else if(command==='inspect') {const data=await engine.list();console.log(JSON.stringify({rows:data.rows.map(r=>({id:r.id,date:r.date,time:r.time,status:r.status,dispatchStatus:r.dispatchStatus,result:r.result,error:r.error}))}));}
  else if(command==='attempt') {await engine.attempt(arg,key);console.log('Intento registrado. No repetir sin reconciliar.');}
  else if(command==='result') {
    const file=path.resolve(arg||'');
    if(!file.startsWith(engine.privateDir+path.sep))throw new Error('El recibo debe estar en el directorio privado local.');
    await engine.complete(JSON.parse(await fs.readFile(file,'utf8')));console.log('Resultado verificado y registrado.');
  } else if(command==='fail') {await engine.fail(arg,key||'Sin confirmación verificable de Meta.');console.log('Trabajo detenido, sin reintento automático.');}
  else {console.log('Uso: worker.mjs claim | attempt REFERENCIA PLATAFORMA:LAMINA | result ARCHIVO_PRIVADO | fail REFERENCIA MOTIVO');process.exitCode=1;}
} catch(error) {console.error(sanitize(error.message));process.exitCode=1;}
