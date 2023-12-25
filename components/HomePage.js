import getFiles, { getTemplate, unpackFile } from "../lib/files.js";
import HtmlBuilder from "../lib/HtmlBuilder.js";
import toHtml from "../lib/markdown.js";
import render from "../lib/render.js";
import { excerpt } from "../lib/utils.js";
import { metadata } from "../siteConfig.js";
import Pages from "./Pages.js";
import PinnedPages from "./PinnedPages.js";

const HOME_PAGE_FILE = "index.md";

const HomePage = () => {
  const template = getTemplate("page");
  const { data, content } = unpackFile(HOME_PAGE_FILE);

  // Create list of site pages
  const pages = getFiles()
    .map((file) => unpackFile(file).data)
    .filter((item) => !item.draft && !item.parent);

  const htmlContent = toHtml(content);

  return render(template, {
    className: "home",
    content: htmlContent,
    contentEnd: HtmlBuilder("div")
      .child(PinnedPages(pages))
      .child(Pages(pages)),
    description: data.description || excerpt(htmlContent),
    headTitle: data.title || `${metadata.brand} - ${metadata.description}`,
    image: metadata.siteUrl + (data.image || metadata.image),
    metaType: "website",
    slug: "/",
  });
};

export default HomePage;
