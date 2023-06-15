import { Feed } from "feed";
import fs from "fs";
import matter from "gray-matter";

import HtmlBuilder from "./lib/HtmlBuilder.js";
import md from "./lib/markdown.js";
import minified from "./lib/minified.js";
import { compareBy, excerpt, formatDate } from "./lib/utils.js";
import { links, metadata, redirects } from "./siteConfig.js";

const defaults = {
  ...metadata,
  links: links
    .map(([name, url]) =>
      new HtmlBuilder("a").class("me-3").href(url).child(name)
    )
    .join(""),
};

const homeButton = new HtmlBuilder("div")
  .class("mt-5")
  .child(new HtmlBuilder("i").class("bi bi-chevron-double-left me-1"))
  .child(new HtmlBuilder("a").href("/").child("Home"));

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
  return minified(html);
};

const getPageItems = () =>
  fs
    .readdirSync("./content")
    .filter((fn) => !fn.startsWith(".") && fn !== "index.md")
    .map((fn) => {
      const markdown = fs.readFileSync(`./content/${fn}`);
      const { data } = matter(markdown);
      data.slug = fn.replace(".md", "");
      return data;
    })
    .filter((page) => !page.draft)
    .sort(compareBy("title"));

const getBacklinks = (slug) =>
  fs
    .readdirSync("./content")
    .filter((fn) => !fn.startsWith(".") && fn !== "index.md")
    .map((fn) => {
      const markdown = fs.readFileSync(`./content/${fn}`);
      const { data, content } = matter(markdown);
      data.slug = fn.replace(".md", "");
      return { ...data, content };
    })
    .filter(({ draft, content }) => !draft && content.includes(`](/${slug})`))
    .map(({ title, slug: pageSlug }) => ({ slug: pageSlug, title }))
    .sort(compareBy("title"));

const getErrorPage = () => {
  const template = fs.readFileSync("./templates/page.html", "utf-8");

  return populate(template, {
    content: new HtmlBuilder("p").child(
      "Sorry! That page doesn't exist or may have moved."
    ),
    contentAfter: homeButton,
    headTitle: `Page Not Found - ${metadata.title}`,
    metaType: "website",
    slug: "#",
    title: "Page Not Found",
  });
};

export const getHomePage = () => {
  const template = fs.readFileSync("./templates/page.html", "utf-8");
  const markdown = fs.readFileSync("./content/index.md", "utf-8");
  const { data, content } = matter(markdown);

  // Create HTML lists of pages.
  const pageItems = getPageItems();

  const renderLink = (title, slug) =>
    new HtmlBuilder("a").href(`/${slug}`).child(title);

  const renderDate = (date) =>
    new HtmlBuilder("span")
      .class("small text-muted ms-2")
      .child(formatDate(date));

  const renderList = (listItems) =>
    new HtmlBuilder("ul").class("my-4").child(listItems);

  const pinnedPages = pageItems
    .filter((page) => page.pinned)
    .map(({ slug, title, date }) =>
      new HtmlBuilder("li").child(
        new HtmlBuilder("span")
          .child("Pinned: ")
          .child(renderLink(title, slug))
          .child(renderDate(date))
      )
    )
    .join("");

  const pages = pageItems
    .filter((page) => !page.pinned)
    .map(({ slug, title, date }) =>
      new HtmlBuilder("li")
        .child(renderLink(title, slug))
        .child(renderDate(date))
    )
    .sort(compareBy("date"))
    .reverse()
    .join("");

  const renderedContent = md.render(content);

  return populate(template, {
    className: "home",
    content: renderedContent,
    contentAfter: new HtmlBuilder("div")
      .child(new HtmlBuilder("h5").child("Pages"), false) // Hide for now
      .child(renderList(pinnedPages))
      .child(renderList(pages)),
    description: data.description || excerpt(renderedContent),
    headTitle: data.title || `${metadata.brand} - ${metadata.description}`,
    image: metadata.siteUrl + (data.image || metadata.image),
    metaType: "website",
    slug: "/",
  });
};

export const getPage = (slug) => {
  try {
    const markdown = fs.readFileSync(`./content/${slug}.md`, "utf-8");
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
          .child(new HtmlBuilder("hr").class("my-4").void())
          .child(new HtmlBuilder("h5").child("Pages that link here"))
          .child(new HtmlBuilder("ul").child(backlinkItems.join("")))
      : "";

    const renderedContent = md.render(content);

    return populate(template, {
      content: renderedContent,
      contentAfter: [backlinks, homeButton].join(""),
      date: formatDate(data.date),
      description: data.description || excerpt(renderedContent),
      headTitle: `${data.title} - ${metadata.brand}`,
      image: metadata.siteUrl + (data.image || metadata.image),
      metaType: "article",
      slug,
      title: data.title,
    });
  } catch {
    return getErrorPage();
  }
};

export const buildRssFeed = () => {
  const posts = fs
    .readdirSync("./content")
    .filter((fn) => !fn.startsWith(".") && fn !== "index.md")
    .map((fn) => {
      const markdown = fs.readFileSync(`./content/${fn}`);
      const { data, content } = matter(markdown);
      data.slug = fn.replace(".md", "");

      if (!Object.keys(data).includes("feed")) {
        data.feed = true;
      }

      return {
        content: md.render(content),
        ...data,
      };
    })
    .filter((post) => !post.draft && post.feed)
    .sort(compareBy("date"))
    .reverse()
    .slice(0, 20);

  const baseUrl = metadata.siteUrl;

  const author = {
    email: "joshua@cerdenia",
    link: baseUrl,
    name: "Joshua Cerdenia",
  };

  const feed = new Feed({
    author,
    copyright: metadata.copyright,
    description: metadata.description,
    favicon: baseUrl + metadata.icon,
    id: baseUrl,
    image: baseUrl + metadata.image,
    language: "en",
    link: `${baseUrl}/rss.xml`,
    title: "Joshua Cerdenia",
    updated: new Date(),
  });

  posts.forEach((post) => {
    feed.addItem({
      author: [author],
      content: post.content.replace(
        /<p><img src="\//g,
        `<p><img src="${baseUrl}/`
      ),
      contributor: [author],
      date: new Date(post.date || post._date),
      description: post.description,
      id: `${baseUrl}/${post.slug}`,
      image: baseUrl + metadata.image,
      link: `${baseUrl}/${post.slug}`,
      title: post.title,
    });
  });

  return feed.rss2();
};

const main = () => {
  // Clear existing HTML files.
  fs.readdirSync("./public")
    .filter((fn) => fn.endsWith(".html"))
    .forEach((fn) => fs.unlinkSync(`./public/${fn}`));

  // Write index page.
  fs.writeFileSync("./public/index.html", getHomePage());

  // Write HTML pages from markdown files.
  fs.readdirSync("./content")
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

  // Write RSS XML.
  fs.writeFileSync("public/rss.xml", buildRssFeed());

  console.log("Built.");
};

if (process.argv[2] === "main") {
  main();
}
