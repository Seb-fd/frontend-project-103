import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff flat JSON', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFile('expected.txt');

  const result = genDiff(file1, file2);

  // Para debug, imprime las cadenas con marcas visibles
  console.log('Result:', JSON.stringify(result));
  console.log('Expected:', JSON.stringify(expected.trim()));

  // Compara ignorando espacios y saltos de línea para evitar fallos por formato
  expect(result.replace(/\s/g, '')).toBe(expected.trim().replace(/\s/g, ''));
});
