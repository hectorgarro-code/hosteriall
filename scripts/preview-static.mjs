import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('out');
const port = Number(process.env.PORT || 4178);
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.txt': 'text/plain', '.xml': 'application/xml', '.webp': 'image/webp', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };

http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname);
    let filename = path.resolve(root, '.' + pathname);
    if (filename !== root && !filename.startsWith(root + path.sep)) {
      res.writeHead(403); res.end(); return;
    }
    const stat = await fs.stat(filename).catch(() => null);
    if (stat?.isDirectory()) {
      if (!pathname.endsWith('/')) { res.writeHead(308, { Location: pathname + '/' }); res.end(); return; }
      filename = path.join(filename, 'index.html');
    }
    const data = await fs.readFile(filename).catch(() => null);
    if (!data) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(await fs.readFile(path.join(root, '404.html'))); return;
    }
    res.writeHead(200, { 'Content-Type': mime[path.extname(filename)] || 'application/octet-stream' });
    res.end(data);
  } catch { res.writeHead(400); res.end(); }
}).listen(port, '127.0.0.1', () => console.log('Static site preview: http://127.0.0.1:' + port));
