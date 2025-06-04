const getDiff = (obj1, obj2) => {
  const keys = Array.from(
    new Set([...Object.keys(obj1), ...Object.keys(obj2)])
  ).sort();

  const diffLines = keys.map((key) => {
    if (!Object.hasOwn(obj2, key)) {
      return `- ${key}: ${obj1[key]}`;
    }
    if (!Object.hasOwn(obj1, key)) {
      return `+ ${key}: ${obj2[key]}`;
    }
    if (obj1[key] !== obj2[key]) {
      return `- ${key}: ${obj1[key]}\n+ ${key}: ${obj2[key]}`;
    }
    return `  ${key}: ${obj1[key]}`;
  });

  return `{\n${diffLines.map((line) => `  ${line}`).join("\n")}\n}`;
};

export default getDiff;
