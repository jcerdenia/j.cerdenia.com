import fs from "fs";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import { minify } from "html-minifier";
import HtmlBuilder from "./lib/HtmlBuilder.js";
import { compareBy, formatDate } from "./lib/utils.js";
import siteConfig from "./siteConfig.js";

const md = new MarkdownIt({ html: true });

const { metadata, links, redirects } = siteConfig;

const defaults = {
  ...metadata,
  links: Object.entries(links)
    .map(([name, url], i) => {
      const link = new HtmlBuilder("a")
        .prop("href", url)
        .child(name)
        .toString();

      return (i ? " | " : "") + link;
    })
    .join(""),
};

const getPageItems = () => {
  return fs
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
};

const getBacklinks = (slug) => {
  return fs
    .readdirSync("./markdown")
    .filter((fn) => fn !== "index.md")
    .map((fn) => {
      const markdown = fs.readFileSync(`./markdown/${fn}`);
      const { data, content } = matter(markdown);
      data.slug = fn.replace(".md", "");
      return { ...data, content };
    })
    .filter(({ draft, content }) => !draft && content.includes(`](/${slug})`))
    .map(({ title, slug }) => ({ title, slug }))
    .sort(compareBy("title"));
};

export const getHomePage = () => {
  const template = fs.readFileSync("./templates/page.html", "utf-8");
  const markdown = fs.readFileSync("./markdown/index.md", "utf-8");
  const { data, content } = matter(markdown);

  // Create HTML lists of pages.
  const pageItems = getPageItems();

  const renderLink = (title, slug) => {
    return new HtmlBuilder("a")
      .prop("href", `/${slug}`)
      .child(title)
      .toString();
  };

  const renderDate = (date) => {
    return new HtmlBuilder("span")
      .prop("class", "small text-muted ms-2")
      .child(formatDate(date, { month: "short", day: undefined }))
      .toString();
  };

  const renderList = (listItems) => {
    return new HtmlBuilder("ul")
      .prop("class", "my-4")
      .child(listItems)
      .toString();
  };

  const pinnedPages = pageItems
    .filter((page) => page.pinned)
    .map(({ slug, title, date }) => {
      return new HtmlBuilder("li")
        .child(
          new HtmlBuilder("span")
            .child("Pinned: ")
            .child(renderLink(title, slug))
            .child(renderDate(date))
            .toString()
        )
        .toString();
    })
    .join("");

  const pages = pageItems
    .filter((page) => !page.pinned)
    .map(({ slug, title, date }) => {
      return new HtmlBuilder("li")
        .child(renderLink(title, slug))
        .child(renderDate(date))
        .toString();
    })
    .join("");

  return populate(template, {
    metaType: "website",
    headTitle: data.title || metadata.brand,
    content: md.render(content),
    belowContent: new HtmlBuilder("div")
      .child(renderList(pinnedPages))
      .child(renderList(pages))
      .toString(),
    slug: "/",
  });
};

export const getPage = (slug) => {
  try {
    const markdown = fs.readFileSync(`./markdown/${slug}.md`, "utf-8");
    const { data, content } = matter(markdown);

    if (data.draft) {
      console.log("Found draft, returning error page instead.");
      return getErrorPage();
    }

    const template = fs.readFileSync("./templates/page.html", "utf-8");

    const backlinkItems = getBacklinks(slug).map((item) => {
      return new HtmlBuilder("li").child(
        new HtmlBuilder("a").prop("href", item.slug).child(item.title)
      );
    });

    const backlinks = backlinkItems.length
      ? new HtmlBuilder("div")
          .child(new HtmlBuilder("hr").prop("class", "my-4").void().toString())
          .child(new HtmlBuilder("h5").child("Pages that link here").toString())
          .child(new HtmlBuilder("ul").child(backlinkItems.join("")).toString())
          .toString()
      : "";

    const homeButton = new HtmlBuilder("div")
      .prop("class", "mt-5")
      .child(
        new HtmlBuilder("i")
          .prop("class", "bi bi-chevron-double-left me-1")
          .toString()
      )
      .child(
        new HtmlBuilder("a").prop("href", "../").child("Go home").toString()
      )
      .toString();

    return populate(template, {
      metaType: "article",
      headTitle: `${data.title} - ${metadata.brand}`,
      title: data.title,
      date: formatDate(data.date),
      description: data.description || metadata.description,
      image: data.image || metadata.image,
      content: md.render(content),
      belowContent: [backlinks, homeButton].join(""),
      slug,
    });
  } catch (error) {
    console.log(error);
    return getErrorPage();
  }
};

const getErrorPage = () => {
  const template = fs.readFileSync("./templates/page.html", "utf-8");

  return populate(template, {
    metaType: "website",
    headTitle: `Page Not Found - ${metadata.title}`,
    title: "Page Not Found",
    content: new HtmlBuilder("p")
      .child("Sorry! That page doesn't exist or may have moved.")
      .toString(),
    belowContent: new HtmlBuilder("a")
      .prop("href", "/")
      .child("Take me home")
      .toString(),
    slug: "#",
  });
};

const populate = (template, data) => {
  data = { ...defaults, ...data };

  Object.keys(data).forEach((key) => {
    if (data[key]) {
      const keyRegex = new RegExp(`{{ ${key} }}`, "g");
      template = template.replace(keyRegex, data[key]);
    }
  });

  // Clear any remaining template stubs.
  template = template.replace(/{{ [A-Za-z0-9_]+ }}/g, "");

  return minify(template, {
    collapseWhitespace: true,
    removeComments: true,
    collapseBooleanAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeOptionalTags: true,
  });
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
  fs.writeFileSync(`./public/404.html`, getErrorPage());

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
