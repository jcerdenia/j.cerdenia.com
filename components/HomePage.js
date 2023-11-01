import getFiles, { getTemplate, unpackFile } from "../lib/files.js";
import HtmlBuilder from "../lib/HtmlBuilder.js";
import toHtml from "../lib/markdown.js";
import render from "../lib/render.js";
import { compareBy, excerpt } from "../lib/utils.js";
import { metadata } from "../siteConfig.js";
import Date from "./Date.js";
import Link from "./Link.js";
import List from "./List.js";

const HOME_PAGE_FILE = "index.md";

const PinnedPages = (items) =>
  List(
    items.filter(({ data }) => data.pinned).sort(compareBy("title")),
    ({ data }) =>
      HtmlBuilder("span")
        .child("Pinned: ")
        .child(Link(data.title, data.slug))
        .child(Date(data.date))
  );

const Pages = (items) =>
  List(
    items
      .filter(({ data }) => !data.pinned)
      .sort(compareBy("date"))
      .reverse(),
    ({ data }) => [Link(data.title, data.slug), Date(data.date)].join("")
  );

const HomePage = () => {
  const template = getTemplate("page");
  const { data, content } = unpackFile(HOME_PAGE_FILE);

  // Create list of site pages
  const pages = getFiles()
    .map(unpackFile)
    .filter(({ data: item }) => !item.draft);

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
