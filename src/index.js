#!/usr/bin/env node
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectName = process.argv[2] || 'my-swissjs-app';
const targetDir = path.resolve(process.cwd(), projectName);
const templateDir = path.resolve(__dirname, '../templates/default');

function copyDir(src, dest, replacements) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, replacements);
    } else {
      let content = fs.readFileSync(srcPath, 'utf-8');
      for (const [from, to] of Object.entries(replacements)) {
        content = content.split(from).join(to);
      }
      fs.writeFileSync(destPath, content, 'utf-8');
    }
  }
}

if (fs.existsSync(targetDir)) {
  console.error(`Error: directory "${projectName}" already exists.`);
  process.exit(1);
}

copyDir(templateDir, targetDir, {
  PROJECT_NAME: projectName,
});

console.log(`✓ Created ${projectName}/`);
console.log('');
console.log('Next steps:');
console.log(`  cd ${projectName}`);
console.log('  pnpm install');
console.log('  pnpm dev');
console.log('');
console.log('Open http://localhost:5000');
console.log('Docs: https://swissjs.org/docs');
