#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync, readFileSync } from 'node:fs';
import { SwiteServer } from '@kibologic/swite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = parseInt(process.env.PORT || '5000', 10);

const server = new SwiteServer({
  root: path.resolve(__dirname, 'app'),
  publicDir: 'public',
  port: PORT,
  host: '0.0.0.0',
  open: false,
});

server.app.use('/node_modules', (req, res, next) => {
  const url = req.url.split('?')[0];
  if (url.endsWith('.ui') || url.endsWith('.uix') || url.endsWith('.ts')) return next();
  const filePath = path.join(path.resolve(__dirname, 'node_modules'), url);
  if (!existsSync(filePath)) return next();
  try {
    const content = readFileSync(filePath, 'utf-8');
    if (url.endsWith('.css')) res.setHeader('Content-Type', 'text/css');
    else if (url.endsWith('.js') || url.endsWith('.mjs')) res.setHeader('Content-Type', 'application/javascript');
    else return next();
    res.end(content);
  } catch { next(); }
});

server.app.use((req, res, next) => {
  if (req.method === 'GET' && req.headers.accept?.includes('text/html')) {
    res.setHeader('Content-Type', 'text/html');
    res.end(readFileSync(path.join(__dirname, 'app/public/index.html'), 'utf-8'));
    return;
  }
  next();
});

await server.start();
console.log(`[${process.env.npm_package_name || 'app'}] running on http://localhost:${PORT}`);
