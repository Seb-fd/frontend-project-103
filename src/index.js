import path from "path";
import fs from "fs";
import yaml from "js-yaml";
import getDiff from "./getDiff.js";

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const parseFile = (filepath) => {
  const fullPath = getFullPath(filepath);
  const content = fs.readFileSync(fullPath, "utf-8");
  const ext = path.extname(fullPath);

  if (ext === ".json") {
    return JSON.parse(content);
  }

  if (ext === ".yaml" || ext === ".yml") {
    return yaml.load(content);
  }

  throw new Error(`Unsupported file format: ${ext}`);
};

export default function genDiff(filepath1, filepath2) {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);
  return getDiff(obj1, obj2);
}
