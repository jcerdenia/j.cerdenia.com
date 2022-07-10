import fs from "fs";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import siteConfig from "./siteConfig.js";
import { minify } from "html-minifier";
import HtmlStringBuilder from "./lib/HtmlStringBuilder.js";

const md = new MarkdownIt({ html: true });

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
  const contentHtml = md.render(content);

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
      content: contentHtml,
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
  const template = fs.readFileSync("./templates/page.html", "utf-8");
  const markdown = fs.readFileSync(`./markdown/${slug}.md`, "utf-8");

  const { data, content } = matter(markdown);
  const contentHtml = md.render(content);

  return populate(
    template,
    {
      metaType: "article",
      headTitle: `${data.title} - ${siteConfig.title}`,
      title: data.title,
      description: data.description || siteConfig.description,
      image: data.image || siteConfig.image,
      content: contentHtml,
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

  // Create redirects.
  const redirects = siteConfig.redirects;
  const template = fs.readFileSync("./templates/redirect.html", "utf-8");

  Object.keys(redirects).forEach((key) => {
    fs.writeFileSync(
      `./public/${key}.html`,
      populate(template, { url: redirects[key] })
    );
  });
};

if (process.argv[2] === "main") {
  main();
}
