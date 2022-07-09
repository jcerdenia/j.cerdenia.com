const fs = require("fs");
const matter = require("gray-matter");
const md = require("markdown-it")({ html: true });
const siteConfig = require("./siteConfig");
const { minify } = require("html-minifier");

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

const footerData = {
  copyright: siteConfig.copyright,
  links: Object.entries(siteConfig.links)
    .map(([name, url], i) => (i ? " | " : "") + `<a href="${url}">${name}</a>`)
    .join("\n"),
};

const getHomePage = () => {
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
    .map((data) => `<li><a href="./${data.slug}">${data.title}</a></li>`)
    .join("\n");

  return populate(template, {
    metaType: "website",
    headTitle: data.title,
    title: data.title,
    description: data.description || siteConfig.description,
    image: data.image || siteConfig.image,
    content: contentHtml,
    belowContent: `<ul class="my-4">${pagesHtml}</ul>`,
    slug: "/",
    ...footerData,
  });
};

const getPage = (slug) => {
  const template = fs.readFileSync("./templates/page.html", "utf-8");
  const markdown = fs.readFileSync(`./markdown/${slug}.md`, "utf-8");

  const { data, content } = matter(markdown);
  const contentHtml = md.render(content);

  return populate(template, {
    metaType: "article",
    headTitle: `${data.title} - ${siteConfig.title}`,
    title: data.title,
    description: data.description || siteConfig.description,
    image: data.image || siteConfig.image,
    content: contentHtml,
    belowContent: `← <a href="../">Go back</a>`,
    copyright: siteConfig.copyright,
    slug,
    ...footerData,
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

module.exports = {
  getHomePage,
  getPage,
  main,
};
