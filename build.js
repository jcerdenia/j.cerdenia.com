import fs from "fs";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import siteConfig from "./siteConfig.js";
import { minify } from "html-minifier";
import HtmlBuilder from "./lib/HtmlBuilder.js";
import { compareBy } from "./lib/utils.js";

const md = new MarkdownIt({ html: true });

const footerData = {
  copyright: siteConfig.copyright,
  links: Object.entries(siteConfig.links)
    .map(([name, url], i) => {
      return (
        (i ? " | " : "") +
        new HtmlBuilder("a").prop("href", url).child(name).toString()
      );
    })
    .join("\n"),
};

export const getHomePage = () => {
  const template = fs.readFileSync("./templates/page.html", "utf-8");
  const markdown = fs.readFileSync("./markdown/index.md", "utf-8");
  const { data, content } = matter(markdown);

  // Create HTML lists of pages.
  const { pinnedPages, pages } = getPageLists();

  const toHtmlLink = (metadata) => {
    return new HtmlBuilder("a")
      .prop("href", `/${metadata.slug}`)
      .child(metadata.title)
      .toString();
  };

  const pinnedPagesHtml = pinnedPages
    .map((page) => {
      return new HtmlBuilder("li")
        .child(
          new HtmlBuilder("span")
            .child("Pinned: ")
            .child(toHtmlLink(page))
            .toString()
        )
        .toString();
    })
    .join("");

  const pagesHtml = pages
    .map((page) => {
      return new HtmlBuilder("li").child(toHtmlLink(page)).toString();
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
    belowContent: new HtmlBuilder("div")
      .child(
        new HtmlBuilder("ul")
          .prop("class", "my-4")
          .child(pinnedPagesHtml)
          .toString()
      )
      .child(
        new HtmlBuilder("ul").prop("class", "my-4").child(pagesHtml).toString()
      )
      .toString(),
    slug: "/",
    ...footerData,
  });
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
      ? new HtmlBuilder("div")
          .prop("class", "mt-5")
          .child(new HtmlBuilder("h5").child("Pages that link here").toString())
          .child(
            new HtmlBuilder("ul")
              .child(
                backlinks
                  .map((item) => {
                    return new HtmlBuilder("li").child(
                      new HtmlBuilder("a")
                        .prop("href", item.slug)
                        .child(item.title)
                    );
                  })
                  .join("\n")
              )
              .toString()
          )
          .toString()
      : "";

    const backButtonHtml = new HtmlBuilder("span")
      .child(
        new HtmlBuilder("i").prop("class", "bi bi-arrow-left me-1").toString()
      )
      .child(
        new HtmlBuilder("a").prop("href", "../").child("Go back").toString()
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
    content: new HtmlBuilder("p")
      .child("Sorry! That page doesn't exist or may have moved.")
      .toString(),
    belowContent: new HtmlBuilder("a")
      .prop("href", "/")
      .child("Take me home")
      .toString(),
    slug: "#",
    ...footerData,
  });
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
