const isObject = (val) => val !== null && typeof val === 'object';

const formatValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (tree, parentPath = '') => {
  const lines = tree.flatMap((node) => {
    const property = parentPath ? `${parentPath}.${node.key}` : node.key;

    switch (node.type) {
      case 'added':
        return `Property '${property}' was added with value: ${formatValue(
          node.value,
        )}`;
      case 'removed':
        return `Property '${property}' was removed`;
      case 'changed':
        return `Property '${property}' was updated. From ${formatValue(
          node.oldValue,
        )} to ${formatValue(node.newValue)}`;
      case 'nested':
        return plain(node.children, property);
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });

  return lines.join('\n');
};

export default plain;
