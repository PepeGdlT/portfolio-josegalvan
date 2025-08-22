import { execSync } from 'node:child_process';
import { existsSync, rmSync, mkdirSync, readdirSync, copyFileSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const outDir = join(root, 'out');
const docsDir = join(root, 'docs');

console.log('> Building Next.js (static export)...');
execSync('npm run build', { stdio: 'inherit' });

if (!existsSync(outDir)) {
  console.error('✗ No se encontró carpeta out después del build (revisa output: export en next.config.ts)');
  process.exit(1);
}

console.log('> Limpiando docs (manteniendo CNAME si existe)...');
let cnameContent = null;
if (existsSync(join(docsDir, 'CNAME'))) {
  cnameContent = readFileSync(join(docsDir, 'CNAME'));
}
if (existsSync(docsDir)) rmSync(docsDir, { recursive: true, force: true });
mkdirSync(docsDir);

if (cnameContent) {
  writeFileSync(join(docsDir, 'CNAME'), cnameContent);
} else if (existsSync(join(root, 'CNAME'))) {
  copyFileSync(join(root, 'CNAME'), join(docsDir, 'CNAME'));
}

writeFileSync(join(docsDir, '.nojekyll'), '');

function copyRecursive(src, dest) {
  const entries = readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    if (entry.isDirectory()) {
      mkdirSync(destPath, { recursive: true });
      copyRecursive(srcPath, destPath);
    } else if (entry.isFile()) {
      copyFileSync(srcPath, destPath);
    }
  }
}

console.log('> Copiando contenido estático a docs ...');
copyRecursive(outDir, docsDir);

console.log('✓ Export estático listo en /docs');
console.log('Recuerda:');
console.log(' - Usa GITHUB_PAGES=true solo si el sitio se sirve bajo /<repo>/');
console.log(' - De lo contrario deja la variable sin definir para dominio personalizado.');
