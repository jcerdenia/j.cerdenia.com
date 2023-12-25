import fs from "fs";
import matter from "gray-matter";

import { reverseMarkdownSections, slugify, toCamelCase } from "./utils.js";

export const CONTENT_PATH = "./content";
const TEMPLATES_PATH = "./templates";
export const ENCODING = "utf-8";

let files;
let subfolders;

const getFiles = () => {
  if (!files) {
    const items = fs
      .readdirSync(CONTENT_PATH)
      .filter(
        (name) =>
          !name.startsWith(".") && !name.startsWith("_") && name !== "index.md"
      );

    const _files = [];
    const _subfolders = [];

    items.forEach((name) => {
      (name.endsWith(".md") ? _files : _subfolders).push(name);
    });

    _subfolders.forEach((folder) => {
      fs.readdirSync(`${CONTENT_PATH}/${folder}`)
        .filter((name) => name.endsWith(".md"))
        .map((name) => `${folder}/${name}`)
        .forEach((file) => _files.push(file));
    });

    files = _files;
    subfolders = _subfolders;
  }

  return files;
};

export const getSubfolders = () => {
  if (!subfolders) {
    return fs
      .readdirSync(CONTENT_PATH)
      .filter((name) => !name.startsWith(".") && !name.endsWith(".md"));
  }

  return subfolders;
};

export const unpackFile = (name) => {
  const markdown = fs.readFileSync(`${CONTENT_PATH}/${name}`, ENCODING);
  const { data: _data, content: _content } = matter(markdown);

  const data = toCamelCase(_data);
  data.slug = slugify(name);
  data.parent = null;
  data.fullTitle = () => data.title;

  if (name.includes("/") && !name.endsWith("index.md")) {
    const parentSlug = name.split("/")[0];
    const indexPath = `${CONTENT_PATH}/${parentSlug}/index.md`;
    const indexMarkdown = fs.readFileSync(indexPath);
    const { data: index } = matter(indexMarkdown);

    data.parent = { slug: parentSlug, title: index.title };
    data.fullTitle = () => `${data.parent.title}: ${data.title}`;
  }

  let content = data.reverseSections
    ? reverseMarkdownSections(_content)
    : _content;

  if (data.evaluateJs) {
    const pattern = /```js([\s\S]*?)```/g;
    content.match(pattern).forEach((match) => {
      const js = match.replace(/```(js)?/g, "");
      // eslint-disable-next-line no-eval
      content = content.replace(match, eval(js));
    });
  }

  return { content, data };
};

export const getTemplate = (name) =>
  fs.readFileSync(`${TEMPLATES_PATH}/${name}.html`, ENCODING);

export default getFiles;
