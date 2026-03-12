import { copyFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

mkdirSync(resolve(root, 'public/data'), { recursive: true });

copyFileSync(
  resolve(root, 'node_modules/world-atlas/countries-110m.json'),
  resolve(root, 'public/data/countries-110m.json')
);

console.log('Assets copied: public/data/countries-110m.json');
