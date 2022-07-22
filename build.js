import fs from "fs";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import siteConfig from "./siteConfig.js";
import { minify } from "html-minifier";
import HtmlStringBuilder from "./lib/HtmlStringBuilder.js";
import { compareBy } from "./lib/utils.js";

const md = new MarkdownIt({ html: true });

const footerData = {
  copyright: siteConfig.copyright,
  links: Object.entries(siteConfig.links)
    .map(([name, url], i) => {
      return (
        (i ? " | " : "") +
        new HtmlStringBuilder("a")
          .addProp("href", url)
          .addChild(name)
          .toString()
      );
    })
    .join("\n"),
};

const getPageLists = () => {
  const pinnedPages = [];
  const pages = [];

  fs.readdirSync("./markdown")
    .filter((fn) => fn !== "index.md")
    .map((fn) => {
      const markdown = fs.readFileSync(`./markdown/${fn}`);
      const { data } = matter(markdown);
      data.slug = fn.replace(".md", "");
      return data;
    })
    .filter((page) => !page.draft)
    .sort(compareBy("title"))
    .forEach((page) => {
      if (page.pinned) {
        pinnedPages.push(page);
      } else {
        pages.push(page);
      }
    });

  return { pinnedPages, pages };
};

export const getHomePage = () => {
  const template = fs.readFileSync("./templates/page.html", "utf-8");
  const markdown = fs.readFileSync("./markdown/index.md", "utf-8");
  const { data, content } = matter(markdown);

  // Create HTML lists of pages.
  const { pinnedPages, pages } = getPageLists();

  const toHtmlLinkElement = (metadata) => {
    return new HtmlStringBuilder("a")
      .addProp("href", `/${metadata.slug}`)
      .addChild(metadata.title)
      .toString();
  };

  const pinnedPagesHtml = pinnedPages
    .map((page) => {
      return new HtmlStringBuilder("li")
        .addChild(
          new HtmlStringBuilder("span")
            .addChild("Pinned: ")
            .addChild(toHtmlLinkElement(page))
            .toString()
        )
        .toString();
    })
    .join("");

  const pagesHtml = pages
    .map((page) => {
      return new HtmlStringBuilder("li")
        .addChild(toHtmlLinkElement(page))
        .toString();
    })
    .join("");

  return populate(template, {
    metaType: "website",
    headTitle: data.title || siteConfig.title,
    brand: siteConfig.title,
    title: "",
    description: siteConfig.description,
    image: siteConfig.image,
    content: md.render(content),
    belowContent: new HtmlStringBuilder("div")
      .addChild(
        new HtmlStringBuilder("ul")
          .addProp("class", "my-4")
          .addChild(pinnedPagesHtml)
          .toString()
      )
      .addChild(
        new HtmlStringBuilder("ul")
          .addProp("class", "my-4")
          .addChild(pagesHtml)
          .toString()
      )
      .toString(),
    slug: "/",
    ...footerData,
  });
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

export const getPage = (slug) => {
  try {
    const template = fs.readFileSync("./templates/page.html", "utf-8");
    const markdown = fs.readFileSync(`./markdown/${slug}.md`, "utf-8");
    const { data, content } = matter(markdown);

    if (data.draft) {
      throw Error("The requested page is a draft.");
    }

    const backlinks = getBacklinks(slug);

    const backlinksHtml = backlinks.length
      ? new HtmlStringBuilder("div")
          .addProp("class", "mt-5")
          .addChild(
            new HtmlStringBuilder("h5")
              .addChild("Pages that link here")
              .toString()
          )
          .addChild(
            new HtmlStringBuilder("ul")
              .addChild(
                backlinks
                  .map((item) => {
                    return new HtmlStringBuilder("li").addChild(
                      new HtmlStringBuilder("a")
                        .addProp("href", item.slug)
                        .addChild(item.title)
                    );
                  })
                  .join("\n")
              )
              .toString()
          )
          .toString()
      : "";

    const backButtonHtml = new HtmlStringBuilder("span")
      .addChild(
        new HtmlStringBuilder("i")
          .addProp("class", "bi bi-arrow-left me-1")
          .toString()
      )
      .addChild(
        new HtmlStringBuilder("a")
          .addProp("href", "../")
          .addChild("Go back")
          .toString()
      )
      .toString();

    return populate(template, {
      metaType: "article",
      headTitle: `${data.title} - ${siteConfig.title}`,
      brand: siteConfig.title,
      title: data.title,
      description: data.description || siteConfig.description,
      image: data.image || siteConfig.image,
      content: md.render(content),
      belowContent: [backlinksHtml, backButtonHtml].join("\n"),
      slug,
      ...footerData,
    });
  } catch {
    return getErrorPage();
  }
};

const getErrorPage = () => {
  const template = fs.readFileSync("./templates/page.html", "utf-8");

  return populate(template, {
    metaType: "website",
    headTitle: `Page Not Found - ${siteConfig.title}`,
    brand: siteConfig.title,
    title: "Page Not Found",
    description: siteConfig.description,
    image: siteConfig.image,
    content: new HtmlStringBuilder("p")
      .addChild("Sorry! That page doesn't exist or may have moved.")
      .toString(),
    belowContent: new HtmlStringBuilder("a")
      .addProp("href", "/")
      .addChild("Take me home")
      .toString(),
    slug: "#",
    ...footerData,
  });
};

const populate = (template, data) => {
  Object.keys(data).forEach((key) => {
    const keyRegex = new RegExp(`{{ ${key} }}`, "g");
    template = template.replace(keyRegex, data[key]);
  });

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
  const redirects = siteConfig.redirects;
  const template = fs.readFileSync("./templates/redirect.html", "utf-8");

  Object.keys(redirects).forEach((key) => {
    fs.writeFileSync(
      `./public/${key}.html`,
      populate(template, { url: redirects[key] }, true)
    );
  });
};

if (process.argv[2] === "main") {
  main();
}
