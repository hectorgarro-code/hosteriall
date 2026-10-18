import { SocialEngine } from '../../social/engine.mjs';
const engine=new SocialEngine();
const ids=process.argv.slice(2);
await engine.generate(ids.length?ids:(await engine.source()).map(r=>r.id));
console.log('Piezas generadas y listas para revisión. Ninguna fue aprobada ni enviada a Meta.');
