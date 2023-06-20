import fs from "fs";
import matter from "gray-matter";

const CONTENT_PATH = "./content";
const TEMPLATES_PATH = "./templates";
const ENCODING = "utf-8";

const EXCLUDED_FILES = ["index.md"];

const isValidFile = (name) =>
  !name.startsWith(".") && !EXCLUDED_FILES.includes(name);

const getFiles = () => fs.readdirSync(CONTENT_PATH).filter(isValidFile);

export const unpackFile = (name) => {
  const markdown = fs.readFileSync(`${CONTENT_PATH}/${name}`, ENCODING);
  const { data, content } = matter(markdown);
  data.slug = name.replace(".md", "");
  return { content, data };
};

export const getTemplate = (name) =>
  fs.readFileSync(`${TEMPLATES_PATH}/${name}.html`, ENCODING);

export default getFiles;
