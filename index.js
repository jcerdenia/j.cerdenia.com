function main() {
  const fs = require("fs");
  const matter = require("gray-matter");
  const md = require("markdown-it")({ html: true });
  const { minify } = require("html-minifier");

  const minifyOptions = {
    collapseWhitespace: true,
    removeComments: true,
    collapseBooleanAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeOptionalTags: true,
  };

  const entryTemplate = fs.readFileSync("./templates/entry.html", "utf-8");
  const entriesEl = [];

  // Clear existing HTML files.
  fs.readdirSync("./docs")
    .filter((fn) => fn.endsWith(".html") && fn !== "coding.html")
    .forEach((fn) => {
      fs.unlinkSync(`./docs/${fn}`);
    });

  // Convert markdown files to HTML pages.
  fs.readdirSync("./entries").forEach((fn) => {
    const markdown = fs.readFileSync(`./entries/${fn}`, "utf-8");
    const { data, content } = matter(markdown);
    const html = md.render(content);
    const slug = fn.replace(".md", "");

    fs.writeFileSync(
      `./docs/${slug}.html`,
      minify(
        entryTemplate
          .replace(/KEY_TITLE/g, data.title)
          .replace("KEY_CONTENT", html),
        minifyOptions
      )
    );

    // Save entry as HTML list item.
    entriesEl.push(`<li><a href="./${slug}">${data.title}</a></li>`);
  });

  const listEl = entriesEl.join("\n");
  const indexTemplate = fs.readFileSync("./templates/index.html", "utf-8");

  fs.writeFileSync(
    "./docs/index.html",
    minify(indexTemplate.replace("KEY_ENTRIES", listEl), minifyOptions)
  );
}

main();
