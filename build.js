import fs from "fs";

import ErrorPage from "./components/ErrorPage.js";
import HomePage from "./components/HomePage.js";
import Page from "./components/Page.js";
import RSSFeed from "./components/RSSFeed.js";
import getFiles, { getTemplate } from "./lib/files.js";
import render from "./lib/render.js";
import { slugify } from "./lib/utils.js";
import { redirects } from "./siteConfig.js";

const OUT_PATH = "./public";

const pathify = (name) => `${OUT_PATH}/${name}`;

const build = () => {
  // Clear existing HTML files
  fs.readdirSync(OUT_PATH)
    .filter((name) => name.endsWith(".html"))
    .forEach((name) => fs.unlinkSync(pathify(name)));

  // Write home page
  fs.writeFileSync(pathify("index.html"), HomePage());

  // Write content pages
  getFiles().forEach((name) => {
    const slug = slugify(name);
    const path = pathify(`${slug}.html`);
    fs.writeFileSync(path, Page(slug));
  });

  // Write RSS feed
  fs.writeFileSync(pathify("rss.xml"), RSSFeed());

  // Write 404 page
  fs.writeFileSync(pathify("404.html"), ErrorPage());

  // Create redirects
  Object.keys(redirects).forEach((key) => {
    fs.writeFileSync(
      pathify(`${key}.html`),
      render(getTemplate("redirect"), {
        url: redirects[key],
      })
    );
  });

  console.log("Built.");
};

if (process.argv[2] === "build") {
  build();
}
