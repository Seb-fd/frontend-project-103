import path from 'path';
import getDiff from './getDiff.js';
import parse from './parsers.js';
import format from './formatters/index.js';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

export default function genDiff(
  filepath1,
  filepath2,
  formatterName = 'stylish',
) {
  const obj1 = parse(getFullPath(filepath1));
  const obj2 = parse(getFullPath(filepath2));
  const diff = getDiff(obj1, obj2);
  return format(diff, formatterName);
}
