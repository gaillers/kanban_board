import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const packageJsonPath = resolve(__dirname, '../../package.json');
const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
const apiVersion = `v${pkg.version.split('.')[0]}`;

export { apiVersion };
export const fullVersion = pkg.version;
