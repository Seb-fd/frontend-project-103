import fs from "fs";
import path from "path";

const parse = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(fullPath, "utf-8");
  const ext = path.extname(fullPath);

  if (ext === ".json") {
    return JSON.parse(content);
  }

  throw new Error(`Unsupported file format: ${ext}`);
};

export default parse;
