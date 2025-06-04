import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js'; // lo agregarás en breve

const formatters = {
  stylish,
  plain,
  json,
};

export default (diffTree, format = 'stylish') => {
  if (!formatters[format]) {
    throw new Error(`Unknown format: ${format}`);
  }
  return formatters[format](diffTree);
};
