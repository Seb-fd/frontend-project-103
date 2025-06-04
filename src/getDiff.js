const isObject = (val) => val !== null && typeof val === 'object' && !Array.isArray(val);

const getDiff = (obj1, obj2) => {
  const keys = Array.from(
    new Set([...Object.keys(obj1), ...Object.keys(obj2)]),
  ).sort();

  return keys.map((key) => {
    const hasKey1 = Object.hasOwn(obj1, key);
    const hasKey2 = Object.hasOwn(obj2, key);
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (!hasKey1 && hasKey2) {
      return { key, type: 'added', value: val2 };
    }

    if (hasKey1 && !hasKey2) {
      return { key, type: 'removed', value: val1 };
    }

    if (isObject(val1) && isObject(val2)) {
      return {
        key,
        type: 'nested',
        children: getDiff(val1, val2),
      };
    }

    if (val1 !== val2) {
      return {
        key,
        type: 'changed',
        oldValue: val1,
        newValue: val2,
      };
    }

    return { key, type: 'unchanged', value: val1 };
  });
};

export default getDiff;
