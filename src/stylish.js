const indentSize = 4;
const indentChar = ' ';

const makeIndent = (depth, replacer = ' ') => `${indentChar.repeat(depth * indentSize - 2) + replacer} `;

const formatValue = (val, depth) => {
  if (val === null) return 'null';
  if (typeof val !== 'object') return String(val);

  const entries = Object.entries(val);
  const lines = entries.map(
    ([key, value]) => `${indentChar.repeat((depth + 1) * indentSize)}${key}: ${formatValue(
      value,
      depth + 1,
    )}`,
  );
  return ['{', ...lines, `${indentChar.repeat(depth * indentSize)}}`].join(
    '\n',
  );
};

const stylish = (diffTree) => {
  const iter = (tree, depth = 1) => {
    const lines = tree.flatMap((node) => {
      switch (node.type) {
        case 'added':
          return `${makeIndent(depth, '+')}${node.key}: ${formatValue(
            node.value,
            depth,
          )}`;
        case 'removed':
          return `${makeIndent(depth, '-')}${node.key}: ${formatValue(
            node.value,
            depth,
          )}`;
        case 'unchanged':
          return `${makeIndent(depth, ' ')}${node.key}: ${formatValue(
            node.value,
            depth,
          )}`;
        case 'changed':
          return [
            `${makeIndent(depth, '-')}${node.key}: ${formatValue(
              node.oldValue,
              depth,
            )}`,
            `${makeIndent(depth, '+')}${node.key}: ${formatValue(
              node.newValue,
              depth,
            )}`,
          ];
        case 'nested':
          return `${makeIndent(depth, ' ')}${node.key}: {\n${iter(
            node.children,
            depth + 1,
          )}\n${indentChar.repeat(depth * indentSize)}}`;
        default:
          throw new Error(`Unknown type: ${node.type}`);
      }
    });
    return lines.join('\n');
  };

  return `{\n${iter(diffTree)}\n}`;
};

export default stylish;
