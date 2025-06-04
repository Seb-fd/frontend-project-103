import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import genDiff from "../src/index.js";
import parse from "../src/parsers.js";
import stylish from "../src/stylish.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, "__fixtures__", filename);
const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), "utf-8");

test("gendiff flat JSON", () => {
  const file1 = getFixturePath("file1.json");
  const file2 = getFixturePath("file2.json");
  const expected = readFile("expected.txt");

  const result = genDiff(file1, file2);

  expect(result.replace(/\s/g, "")).toBe(expected.trim().replace(/\s/g, ""));
});

test("gendiff flat YAML", () => {
  const file1 = getFixturePath("file1.yml");
  const file2 = getFixturePath("file2.yml");
  const expected = readFile("expected.txt");

  const result = genDiff(file1, file2);

  expect(result.replace(/\s/g, "")).toBe(expected.trim().replace(/\s/g, ""));
});

test("gendiff nested YAML (stylish formatter)", () => {
  const file1 = getFixturePath("file1.yaml");
  const file2 = getFixturePath("file2.yaml");
  const expected = readFile("expectedStylish.txt");

  const result = genDiff(file1, file2);

  expect(result.trim()).toBe(expected.trim());
});

test("genDiff throws error on unknown format", () => {
  const file1 = getFixturePath("file1.json");
  const file2 = getFixturePath("file2.json");

  expect(() => genDiff(file1, file2, "unknown-format")).toThrow(
    "Unknown format: unknown-format"
  );
});

describe("parse function", () => {
  const originalReadFileSync = fs.readFileSync;
  const originalResolve = path.resolve;

  afterEach(() => {
    fs.readFileSync = originalReadFileSync;
    path.resolve = originalResolve;
  });

  test("throws error on unsupported file extension", () => {
    path.resolve = () => "/some/path/file.unsupported";
    fs.readFileSync = () => "some content";

    expect(() => parse("/some/path/file.unsupported")).toThrow(
      "Unsupported file format: .unsupported"
    );
  });
});

test("stylish throws error on unknown node type", () => {
  const badTree = [{ type: "invalid_type", key: "key1", value: "value1" }];

  expect(() => stylish(badTree)).toThrowError("Unknown type: invalid_type");
});
