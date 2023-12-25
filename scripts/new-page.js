import fs from "fs";
import matter from "gray-matter";

import { CONTENT_PATH, ENCODING } from "../lib/files.js";
import { formatDate } from "../lib/utils.js";

const createNewPage = (_slug, multi) => {
  let slug = _slug;
  const path = `${CONTENT_PATH}/${slug}`;

  // Check for .md file
  if (fs.existsSync(`${path}.md`)) {
    throw Error(`A file named "${slug}" already exists.`);
  }

  // Check for folder
  if (fs.existsSync(path)) {
    if (multi) {
      const identifiers = fs
        .readdirSync(path)
        .filter((name) => name !== "index.md")
        .map((name) => parseInt(name.replace(".md", ""), 10))
        .sort((a, b) => a - b)
        .reverse();

      const identifier = (identifiers[0] || 0) + 1;
      slug += `/${identifier}`;
    } else {
      throw Error(`A folder named "${slug}" already exists.`);
    }
  } else {
    fs.mkdirSync(path);
    slug += "/index";
  }

  const templatePath = `${CONTENT_PATH}/_template.md`;
  let markdown = fs.readFileSync(templatePath, ENCODING);
  const { data } = matter(markdown);
  const date = formatDate(new Date(), { locale: "sv-SE" });
  markdown = markdown.replace(`date: "${data.date}"`, `date: "${date}"`);

  fs.writeFileSync(`${CONTENT_PATH}/${slug}.md`, markdown);
  console.log("\x1b[32m%s\x1b[0m", `Created new file: ${slug}.md`);
};

const { argv } = process;

if (
  (argv.length !== 3 && argv.length !== 4) ||
  (argv.length === 4 && argv[3] !== "-")
) {
  console.log("Usage: npm run new <slug> (-)");
} else {
  try {
    const slug = argv[2];
    const multi = !!argv[3];
    createNewPage(slug, multi);
  } catch (err) {
    console.error("\x1b[91m%s\x1b[0m", `Error: ${err.message}`);
  }
}
