import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { SocialEngine, ROOT } from '../../social/engine.mjs';
import { sanitize } from '../../social/catalog.mjs';

export function createSocialServer({root=ROOT,port=4178}={}) {
  const engine=new SocialEngine(root), csrf=crypto.randomBytes(24).toString('hex');
  const send=(res,status,body,type='application/json; charset=utf-8')=>{res.writeHead(status,{'Content-Type':type});res.end(type.startsWith('application/json')?JSON.stringify(body):body);};
  const server=http.createServer(async(req,res)=>{
    res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('X-Frame-Options','DENY');res.setHeader('Cross-Origin-Resource-Policy','same-origin');res.setHeader('Referrer-Policy','no-referrer');
    res.setHeader('Content-Security-Policy',"default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
    const actualPort=server.address()?.port||port;
    const hosts=[`127.0.0.1:${actualPort}`,`localhost:${actualPort}`];
    if(!hosts.includes(req.headers.host))return send(res,403,{error:'Acceso solo desde este equipo.'});
    const url=new URL(req.url,'http://127.0.0.1');
    try {
      if(req.method==='GET'&&url.pathname==='/social-preview') {
        const html=(await fs.readFile(path.join(root,'social/admin.html'),'utf8')).replace('__CSRF__',csrf);
        return send(res,200,html,'text/html; charset=utf-8');
      }
      if(req.method==='GET'&&url.pathname==='/api/social/calendar')return send(res,200,await engine.list());
      if(req.method==='GET'&&['/social/admin.js','/social/admin.css'].includes(url.pathname)) {
        return send(res,200,await fs.readFile(path.join(root,url.pathname.slice(1))),url.pathname.endsWith('.js')?'text/javascript; charset=utf-8':'text/css; charset=utf-8');
      }
      if(req.method==='GET'&&/^\/social\/generated\/[A-Za-z0-9-]+\.png$/.test(url.pathname))return send(res,200,await fs.readFile(path.join(engine.generated,path.basename(url.pathname))),'image/png');
      if(req.method==='POST'&&url.pathname==='/api/social/actions') {
        const allowedOrigins=hosts.map(h=>'http://'+h);
        if(req.headers['x-social-csrf']!==csrf||(req.headers.origin&&!allowedOrigins.includes(req.headers.origin)))return send(res,403,{error:'Origen o sesión local inválidos.'});
        if(!req.headers['content-type']?.startsWith('application/json'))return send(res,415,{error:'Se requiere JSON.'});
        let body='';for await(const chunk of req){body+=chunk;if(Buffer.byteLength(body)>32768)return send(res,413,{error:'Solicitud demasiado grande.'});}
        let input;try{input=JSON.parse(body);}catch{return send(res,400,{error:'JSON inválido.'});}
        return send(res,200,await engine.action(input.action,input.ids,{batchConfirmed:input.batchConfirmed===true}));
      }
      return send(res,404,{error:'Ruta inexistente.'});
    } catch(error) { return send(res,error.status||500,{error:error.status?sanitize(error.message):'La operación no terminó. El contenido se conserva; revisá el registro local.'}); }
  });
  return {server,engine,listen:()=>new Promise(resolve=>server.listen(port,'127.0.0.1',resolve))};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const app=createSocialServer({port:Number(process.env.SOCIAL_PORT||4178)});await app.listen();console.log(`Panel interno disponible en http://127.0.0.1:${app.server.address().port}/social-preview`);
}
