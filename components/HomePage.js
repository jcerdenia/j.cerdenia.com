import getFiles, { getTemplate, unpackFile } from "../lib/files.js";
import HtmlBuilder from "../lib/HtmlBuilder.js";
import toHtml from "../lib/markdown.js";
import render from "../lib/render.js";
import { compareBy, excerpt, formatDate } from "../lib/utils.js";
import { metadata } from "../siteConfig.js";

const HOME_PAGE_FILE = "index.md";

const Link = (title, slug) => HtmlBuilder("a").href(`/${slug}`).child(title);

const Date = (date) =>
  HtmlBuilder("span").class("small text-muted ms-2").child(formatDate(date));

const List = (listItems) => HtmlBuilder("ul").class("my-4").child(listItems);

const PinnedPages = (pages) =>
  pages
    .filter(({ data }) => data.pinned)
    .map(({ data }) =>
      HtmlBuilder("li")
        .class("my-1")
        .child(
          HtmlBuilder("span")
            .child("Pinned: ")
            .child(Link(data.title, data.slug))
            .child(Date(data.date))
        )
    )
    .join("");

const Pages = (pages) =>
  pages
    .filter(({ data }) => !data.pinned)
    .map(({ data }) =>
      HtmlBuilder("li")
        .class("my-1")
        .child(Link(data.title, data.slug))
        .child(Date(data.date))
    )
    .sort(compareBy("date"))
    .reverse()
    .join("");

const HomePage = () => {
  const template = getTemplate("page");
  const { data, content } = unpackFile(HOME_PAGE_FILE);

  // Create list of site pages
  const pages = getFiles()
    .map(unpackFile)
    .filter(({ data: item }) => !item.draft)
    .sort(compareBy("title"));

  const htmlContent = toHtml(content);

  return render(template, {
    className: "home",
    content: htmlContent,
    contentAfter: HtmlBuilder("div")
      .child(List(PinnedPages(pages)))
      .child(List(Pages(pages))),
    description: data.description || excerpt(htmlContent),
    headTitle: data.title || `${metadata.brand} - ${metadata.description}`,
    image: metadata.siteUrl + (data.image || metadata.image),
    metaType: "website",
    slug: "/",
  });
};

export default HomePage;
