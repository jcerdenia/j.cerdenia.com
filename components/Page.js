import getFiles, { getTemplate, unpackFile } from "../lib/files.js";
import HtmlBuilder from "../lib/HtmlBuilder.js";
import toHtml from "../lib/markdown.js";
import render from "../lib/render.js";
import { compareBy, excerpt, formatDate } from "../lib/utils.js";
import { metadata } from "../siteConfig.js";
import ErrorPage from "./ErrorPage.js";
import HomeButton from "./HomeButton.js";

const Backlinks = (slug) => {
  const items = getFiles()
    .map(unpackFile)
    .filter(
      ({ data, content }) => !data.draft && content.includes(`](/${slug})`)
    )
    .sort(compareBy("title"))
    .map(({ data }) =>
      HtmlBuilder("li").child(
        HtmlBuilder("a").href(data.slug).child(data.title)
      )
    );

  return items.length
    ? HtmlBuilder("div")
        .child(HtmlBuilder("hr").class("my-4").void())
        .child(HtmlBuilder("h5").child("Backlinks"))
        .child(HtmlBuilder("ul").child(items.join("")))
    : "";
};

const Page = (slug) => {
  try {
    const { data, content } = unpackFile(`${slug}.md`);

    if (data.draft) {
      throw Error();
    }

    const template = getTemplate("page");
    const htmlContent = toHtml(content);

    return render(template, {
      content: htmlContent,
      contentAfter: [Backlinks(slug), HomeButton()].join(""),
      date: formatDate(data.date),
      description: data.description || excerpt(htmlContent),
      headTitle: `${data.title} - ${metadata.brand}`,
      image: metadata.siteUrl + (data.image || metadata.image),
      metaType: "article",
      slug,
      title: data.title,
    });
  } catch {
    return ErrorPage();
  }
};

export default Page;
