const fs = require("fs");
const matter = require("gray-matter");
const md = require("markdown-it")({ html: true });
const { minify } = require("html-minifier");

const template = fs.readFileSync("./templates/page.html", "utf-8");

const minifyOptions = {
  collapseWhitespace: true,
  removeComments: true,
  collapseBooleanAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
};

const buildIndex = () => {
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
      const slug = fn.replace(".md", "");
      return `<li><a href="./${slug}">${data.title}</a></li>`;
    })
    .join("\n");

  return minify(
    template
      .replace("$KEY_TITLE_HEAD", data.title)
      .replace("$KEY_TITLE_BODY", data.title)
      .replace("$KEY_SLUG", "/")
      .replace("$KEY_CONTENT", contentHtml)
      .replace("$KEY_OTHER", `<ul class="my-4">${pagesHtml}</ul>`),
    minifyOptions
  );
};

const buildPage = (slug) => {
  const markdown = fs.readFileSync(`./markdown/${slug}.md`, "utf-8");
  const { data, content } = matter(markdown);
  const contentHtml = md.render(content);

  return minify(
    template
      .replace("$KEY_TITLE_HEAD", `${data.title} - Joshua Cerdenia`)
      .replace("$KEY_TITLE_BODY", data.title)
      .replace("$KEY_SLUG", slug)
      .replace("$KEY_CONTENT", contentHtml)
      .replace("$KEY_OTHER", `← <a href="../">Go back</a>`),
    minifyOptions
  );
};

const build = () => {
  // Clear existing HTML files.
  fs.readdirSync("./public")
    .filter((fn) => fn.endsWith(".html"))
    .forEach((fn) => fs.unlinkSync(`./public/${fn}`));

  // Write index page.
  fs.writeFileSync("./public/index.html", buildIndex());

  // Write HTML pages from markdown files.
  fs.readdirSync("./markdown")
    .filter((fn) => fn !== "index.md")
    .forEach((fn) => {
      const slug = fn.replace(".md", "");
      fs.writeFileSync(`./public/${slug}.html`, buildPage(slug));
    });

  // Create redirects.
  const rd = require("./redirects.json");
  const rdTemplate = fs.readFileSync("./templates/redirect.html", "utf-8");

  Object.keys(rd).forEach((key) => {
    fs.writeFileSync(
      `./public/${key}.html`,
      minify(rdTemplate.replace("$KEY_URL", rd[key]), minifyOptions)
    );
  });
};

module.exports = {
  buildIndex,
  buildPage,
  build,
};
