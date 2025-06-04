import path from 'path';
import getDiff from './getDiff.js';
import parse from './parsers.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js'; // nuevo import

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

export default function genDiff(filepath1, filepath2, format = 'stylish') {
  const obj1 = parse(getFullPath(filepath1));
  const obj2 = parse(getFullPath(filepath2));
  const diff = getDiff(obj1, obj2);

  switch (format) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
}
