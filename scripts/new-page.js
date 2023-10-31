import fs from "fs";
import matter from "gray-matter";

import { CONTENT_PATH, ENCODING } from "../lib/files.js";
import { formatDate } from "../lib/utils.js";

const newPage = (slug) => {
  const path = `${CONTENT_PATH}/${slug}.md`;
  if (fs.existsSync(path)) {
    throw Error(`A file named "${slug}" already exists.`);
  }

  const templatePath = `${CONTENT_PATH}/_template.md`;
  let markdown = fs.readFileSync(templatePath, ENCODING);
  const { data } = matter(markdown);
  const date = formatDate(new Date(), { locale: "sv-SE" });
  markdown = markdown.replace(`date: "${data.date}"`, `date: "${date}"`);

  fs.writeFileSync(path, markdown);
  console.log("\x1b[32m%s\x1b[0m", `Created new file: ${slug}.md`);
};

if (process.argv.length !== 3) {
  console.log("Usage: node scripts/new-page.js <slug>");
} else {
  try {
    newPage(process.argv[2]);
  } catch (err) {
    console.error("\x1b[91m%s\x1b[0m", `Error: ${err.message}`);
  }
}
