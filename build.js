import fs from "fs";
import matter from "gray-matter";
import { minify } from "html-minifier";
import MarkdownIt from "markdown-it";

import HtmlBuilder from "./lib/HtmlBuilder.js";
import { compareBy, formatDate } from "./lib/utils.js";
import siteConfig from "./siteConfig.js";

const md = new MarkdownIt({ html: true });

const { metadata, links, redirects } = siteConfig;

const defaults = {
  ...metadata,
  links: links
    .map(([name, url], i) => {
      const link = new HtmlBuilder("a").href(url).child(name).toString();
      return (i ? " | " : "") + link;
    })
    .join(""),
};

const populate = (template, args) => {
  const data = { ...defaults, ...args };
  let html = template;

  Object.keys(data).forEach((key) => {
    if (data[key]) {
      const keyRegex = new RegExp(`{{ ${key} }}`, "g");
      html = html.replace(keyRegex, data[key]);
    }
  });

  // Clear any remaining template stubs.
  html = html.replace(/{{ [A-Za-z0-9_]+ }}/g, "");

  return minify(html, {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeOptionalTags: true,
    useShortDoctype: true,
  });
};

const getPageItems = () =>
  fs
    .readdirSync("./markdown")
    .filter((fn) => fn !== "index.md")
    .map((fn) => {
      const markdown = fs.readFileSync(`./markdown/${fn}`);
      const { data } = matter(markdown);
      data.slug = fn.replace(".md", "");
      return data;
    })
    .filter((page) => !page.draft)
    .sort(compareBy("title"));

const getBacklinks = (slug) =>
  fs
    .readdirSync("./markdown")
    .filter((fn) => fn !== "index.md")
    .map((fn) => {
      const markdown = fs.readFileSync(`./markdown/${fn}`);
      const { data, content } = matter(markdown);
      data.slug = fn.replace(".md", "");
      return { ...data, content };
    })
    .filter(({ draft, content }) => !draft && content.includes(`](/${slug})`))
    .map(({ title, slug: pageSlug }) => ({ slug: pageSlug, title }))
    .sort(compareBy("title"));

const homeButton = new HtmlBuilder("div")
  .class("mt-5")
  .child(new HtmlBuilder("i").class("bi bi-chevron-left me-1").toString())
  .child(new HtmlBuilder("a").href("/").child("Go home").toString())
  .toString();

const getErrorPage = () => {
  const template = fs.readFileSync("./templates/page.html", "utf-8");

  return populate(template, {
    content: new HtmlBuilder("p")
      .child("Sorry! That page doesn't exist or may have moved.")
      .toString(),
    contentAfter: homeButton,
    headTitle: `Page Not Found - ${metadata.title}`,
    metaType: "website",
    slug: "#",
    title: "Page Not Found",
  });
};

export const getHomePage = () => {
  const template = fs.readFileSync("./templates/page.html", "utf-8");
  const markdown = fs.readFileSync("./markdown/index.md", "utf-8");
  const { data, content } = matter(markdown);

  // Create HTML lists of pages.
  const pageItems = getPageItems();

  const renderLink = (title, slug) =>
    new HtmlBuilder("a").href(`/${slug}`).child(title).toString();

  const renderDate = (date) =>
    new HtmlBuilder("span")
      .class("small text-muted ms-2")
      .child(formatDate(date, { day: undefined, month: "short" }))
      .toString();

  const renderList = (listItems) =>
    new HtmlBuilder("ul").class("my-4").child(listItems).toString();

  const pinnedPages = pageItems
    .filter((page) => page.pinned)
    .map(({ slug, title, date }) =>
      new HtmlBuilder("li")
        .child(
          new HtmlBuilder("span")
            .child("Pinned: ")
            .child(renderLink(title, slug))
            .child(renderDate(date))
            .toString()
        )
        .toString()
    )
    .join("");

  const pages = pageItems
    .filter((page) => !page.pinned)
    .map(({ slug, title, date }) =>
      new HtmlBuilder("li")
        .child(renderLink(title, slug))
        .child(renderDate(date))
        .toString()
    )
    .join("");

  return populate(template, {
    content: md.render(content),
    contentAfter: new HtmlBuilder("div")
      .child(renderList(pinnedPages))
      .child(renderList(pages))
      .toString(),
    headTitle: data.title || metadata.brand,
    metaType: "website",
    slug: "/",
  });
};

export const getPage = (slug) => {
  try {
    const markdown = fs.readFileSync(`./markdown/${slug}.md`, "utf-8");
    const { data, content } = matter(markdown);

    if (data.draft) {
      return getErrorPage();
    }

    const template = fs.readFileSync("./templates/page.html", "utf-8");

    const backlinkItems = getBacklinks(slug).map((item) =>
      new HtmlBuilder("li").child(
        new HtmlBuilder("a").href(item.slug).child(item.title)
      )
    );

    const backlinks = backlinkItems.length
      ? new HtmlBuilder("div")
          .child(new HtmlBuilder("hr").class("my-4").void().toString())
          .child(new HtmlBuilder("h5").child("Pages that link here").toString())
          .child(new HtmlBuilder("ul").child(backlinkItems.join("")).toString())
          .toString()
      : "";

    return populate(template, {
      content: md.render(content),
      contentAfter: [backlinks, homeButton].join(""),
      date: formatDate(data.date),
      description: data.description || metadata.description,
      headTitle: `${data.title} - ${metadata.brand}`,
      image: data.image || metadata.image,
      metaType: "article",
      slug,
      title: data.title,
    });
  } catch {
    return getErrorPage();
  }
};

const main = () => {
  // Clear existing HTML files.
  fs.readdirSync("./public")
    .filter((fn) => fn.endsWith(".html"))
    .forEach((fn) => fs.unlinkSync(`./public/${fn}`));

  // Write index page.
  fs.writeFileSync("./public/index.html", getHomePage());

  // Write HTML pages from markdown files.
  fs.readdirSync("./markdown")
    .filter((fn) => fn !== "index.md")
    .forEach((fn) => {
      const slug = fn.replace(".md", "");
      fs.writeFileSync(`./public/${slug}.html`, getPage(slug));
    });

  // Write 404 page.
  fs.writeFileSync("./public/404.html", getErrorPage());

  // Create redirects.
  const template = fs.readFileSync("./templates/redirect.html", "utf-8");

  Object.keys(redirects).forEach((key) => {
    fs.writeFileSync(
      `./public/${key}.html`,
      populate(template, { url: redirects[key] })
    );
  });

  console.log("Built.");
};

if (process.argv[2] === "main") {
  main();
}
