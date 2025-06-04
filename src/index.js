import path from 'path';
import getDiff from './getDiff.js';
import parse from './parsers.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

export default function genDiff(filepath1, filepath2) {
  const obj1 = parse(getFullPath(filepath1));
  const obj2 = parse(getFullPath(filepath2));
  return getDiff(obj1, obj2);
}
