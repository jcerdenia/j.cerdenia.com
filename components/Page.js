import getFiles, {
  getSubfolders,
  getTemplate,
  unpackFile,
} from "../lib/files.js";
import toHtml from "../lib/markdown.js";
import render from "../lib/render.js";
import { compareBy, excerpt, formatDate } from "../lib/utils.js";
import { metadata } from "../siteConfig.js";
import Backlinks from "./Backlinks.js";
import ErrorPage from "./ErrorPage.js";
import NavButton from "./NavButton.js";
import Pages from "./Pages.js";
import PinnedPages from "./PinnedPages.js";

const Page = (slug) => {
  try {
    const subfolders = getSubfolders();
    const path = subfolders.includes(slug) ? `${slug}/index.md` : `${slug}.md`;
    const { data, content } = unpackFile(path);

    let pages = [];
    let nextButton = "";
    let prevButton = "";
    let homeButton = "";

    if (data.draft) {
      console.log(`Skipped draft: ${slug}`);
      return ErrorPage();
    }

    if (data.parent) {
      const { parent } = data;
      const siblings = getFiles()
        .map((file) => unpackFile(file).data)
        .filter(
          (item) =>
            !item.draft && item.parent && item.parent.slug === parent.slug
        )
        .sort(compareBy("date"));

      const siblingSlugs = siblings.map((sibling) => sibling.slug);
      const currentIndex = siblingSlugs.indexOf(data.slug);
      const nextSlug = siblingSlugs[currentIndex + 1];
      const prevSlug = siblingSlugs[currentIndex - 1];

      if (nextSlug) {
        const next = siblings.find((sibling) => sibling.slug === nextSlug);
        nextButton = NavButton(
          `Next: ${next.title}`,
          `/${nextSlug}`,
          "mt-5 mb-1",
          "right"
        );
      }

      if (prevSlug) {
        const prev = siblings.find((sibling) => sibling.slug === prevSlug);
        prevButton = NavButton(
          `Previous: ${prev.title}`,
          `/${prevSlug}`,
          nextSlug ? "my-1" : "mt-5 mb-1",
          "left"
        );
      }

      homeButton = NavButton(parent.title, `/${parent.slug}`, "my-1", "left");
    } else {
      pages = getFiles()
        .map((file) => unpackFile(file).data)
        .filter(
          (item) => !item.draft && item.parent && item.parent.slug === data.slug
        )
        .sort(compareBy("date"))
        .reverse();

      homeButton = NavButton("Home", "/", "mt-5", "left");
    }

    const template = getTemplate("page");
    const htmlContent = toHtml(content.trim());

    return render(template, {
      child: !!data.parent,
      content: [htmlContent, PinnedPages(pages), Pages(pages)].join(""),
      contentEnd: [Backlinks(slug), nextButton, prevButton, homeButton].join(
        ""
      ),
      date: formatDate(data.date),
      description: data.description || excerpt(htmlContent),
      headTitle: `${data.fullTitle()} - ${metadata.brand}`,
      image: metadata.siteUrl + (data.image || metadata.image),
      metaType: "article",
      slug,
      syntaxHighlighting:
        htmlContent.includes("<pre><code") &&
        htmlContent.includes("</code></pre>"),
      title: data.fullTitle(),
    });
  } catch (err) {
    console.error("\x1b[91m%s\x1b[0m", err.message);
    return ErrorPage();
  }
};

export default Page;
