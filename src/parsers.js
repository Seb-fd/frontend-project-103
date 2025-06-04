import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parse = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(fullPath, 'utf-8');
  const ext = path.extname(fullPath);

  switch (ext) {
    case '.json':
      return JSON.parse(content);
    case '.yml':
    case '.yaml':
      return yaml.load(content);
    default:
      throw new Error(`Unsupported file format: ${ext}`);
  }
};

export default parse;
