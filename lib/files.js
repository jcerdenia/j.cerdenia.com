import fs from "fs";
import matter from "gray-matter";

import { reverseMarkdownSections, toCamelCase } from "./utils.js";

export const CONTENT_PATH = "./content";
const TEMPLATES_PATH = "./templates";
export const ENCODING = "utf-8";

const EXCLUDED_FILES = ["index.md"];

const isValidFile = (name) =>
  !name.startsWith(".") && !EXCLUDED_FILES.includes(name);

const getFiles = () => fs.readdirSync(CONTENT_PATH).filter(isValidFile);

export const unpackFile = (name) => {
  const markdown = fs.readFileSync(`${CONTENT_PATH}/${name}`, ENCODING);
  const { data: _data, content: _content } = matter(markdown);
  const data = toCamelCase(_data);
  data.slug = name.replace(".md", "");

  const content = data.reverseSections
    ? reverseMarkdownSections(_content)
    : _content;

  return { content, data };
};

export const getTemplate = (name) =>
  fs.readFileSync(`${TEMPLATES_PATH}/${name}.html`, ENCODING);

export default getFiles;
