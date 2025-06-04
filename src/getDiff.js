const getDiff = (obj1, obj2) => {
  const keys = Array.from(
    new Set([...Object.keys(obj1), ...Object.keys(obj2)]),
  ).sort();

  const diffLines = keys.flatMap((key) => {
    const hasKey1 = Object.hasOwn(obj1, key);
    const hasKey2 = Object.hasOwn(obj2, key);
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (hasKey1 && !hasKey2) {
      return `  - ${key}: ${val1}`;
    }

    if (!hasKey1 && hasKey2) {
      return `  + ${key}: ${val2}`;
    }

    if (val1 !== val2) {
      return [`  - ${key}: ${val1}`, `  + ${key}: ${val2}`];
    }

    return `    ${key}: ${val1}`;
  });

  return `{\n${diffLines.join('\n')}\n}`;
};

export default getDiff;
