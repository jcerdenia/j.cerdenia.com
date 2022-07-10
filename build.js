import fs from "fs";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import siteConfig from "./siteConfig.js";
import { minify } from "html-minifier";
import HtmlStringBuilder from "./lib/HtmlStringBuilder.js";

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

export const getHomePage = (minified = false) => {
  const template = fs.readFileSync("./templates/page.html", "utf-8");
  const markdown = fs.readFileSync("./markdown/index.md", "utf-8");
  const { data, content } = matter(markdown);

  // Create HTML list of pages.
  const pagesHtml = fs
    .readdirSync("./markdown")
    .filter((fn) => fn !== "index.md")
    .map((fn) => {
      const markdown = fs.readFileSync(`./markdown/${fn}`);
      const { data } = matter(markdown);
      data.slug = fn.replace(".md", "");
      return data;
    })
    .filter((page) => !page.draft)
    .sort((a, b) => (a.title > b.title ? 1 : a.title < b.title ? -1 : 0))
    .map((page) => {
      return new HtmlStringBuilder("li")
        .addChild(
          new HtmlStringBuilder("a")
            .addProp("href", `/${page.slug}`)
            .addChild(page.title)
            .toString()
        )
        .toString();
    })
    .join("\n");

  return populate(
    template,
    {
      metaType: "website",
      headTitle: data.title,
      title: data.title,
      description: data.description || siteConfig.description,
      image: data.image || siteConfig.image,
      content: md.render(content),
      belowContent: new HtmlStringBuilder("ul")
        .addProp("class", "my-4")
        .addChild(pagesHtml)
        .toString(),
      slug: "/",
      ...footerData,
    },
    minified
  );
};

export const getPage = (slug, minified = false) => {
  try {
    const template = fs.readFileSync("./templates/page.html", "utf-8");
    const markdown = fs.readFileSync(`./markdown/${slug}.md`, "utf-8");
    const { data, content } = matter(markdown);

    if (data.draft) {
      return getErrorPage(minified);
    }

    return populate(
      template,
      {
        metaType: "article",
        headTitle: `${data.title} - ${siteConfig.title}`,
        title: data.title,
        description: data.description || siteConfig.description,
        image: data.image || siteConfig.image,
        content: md.render(content),
        belowContent: new HtmlStringBuilder("span")
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
          .toString(),
        copyright: siteConfig.copyright,
        slug,
        ...footerData,
      },
      minified
    );
  } catch {
    return getErrorPage(minified);
  }
};

const getErrorPage = (minified = false) => {
  const template = fs.readFileSync("./templates/page.html", "utf-8");

  return populate(
    template,
    {
      metaType: "website",
      headTitle: `Page Not Found - ${siteConfig.title}`,
      title: "Page Not Found",
      description: siteConfig.description,
      image: siteConfig.image,
      content: new HtmlStringBuilder("p").addChild("Sorry!").toString(),
      belowContent: new HtmlStringBuilder("a")
        .addProp("href", "/")
        .addChild("Take me home")
        .toString(),
      slug: "#",
      ...footerData,
    },
    minified
  );
};

const populate = (template, data, minified = false) => {
  Object.keys(data).forEach((key) => {
    const keyRegex = new RegExp(`{{ ${key} }}`, "g");
    template = template.replace(keyRegex, data[key]);
  });

  return minified
    ? minify(template, {
        collapseWhitespace: true,
        removeComments: true,
        collapseBooleanAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
      })
    : template;
};

const main = () => {
  // Clear existing HTML files.
  fs.readdirSync("./public")
    .filter((fn) => fn.endsWith(".html"))
    .forEach((fn) => fs.unlinkSync(`./public/${fn}`));

  // Write index page.
  fs.writeFileSync("./public/index.html", getHomePage(true));

  // Write HTML pages from markdown files.
  fs.readdirSync("./markdown")
    .filter((fn) => fn !== "index.md")
    .forEach((fn) => {
      const slug = fn.replace(".md", "");
      fs.writeFileSync(`./public/${slug}.html`, getPage(slug, true));
    });

  // Write 404 page.
  fs.writeFileSync(`./public/404.html`, getErrorPage(true));

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
