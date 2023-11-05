import getFiles, { getTemplate, unpackFile } from "../lib/files.js";
import HtmlBuilder from "../lib/HtmlBuilder.js";
import toHtml from "../lib/markdown.js";
import render from "../lib/render.js";
import { compareBy, excerpt, formatDate } from "../lib/utils.js";
import { metadata } from "../siteConfig.js";
import Date from "./Date.js";
import ErrorPage from "./ErrorPage.js";
import HomeButton from "./HomeButton.js";
import Link from "./Link.js";
import List from "./List.js";

const Backlinks = (slug) => {
  const backlinks = getFiles()
    .map(unpackFile)
    .filter(
      ({ data, content }) => !data.draft && content.includes(`](/${slug})`)
    )
    .sort(compareBy("title"));

  return backlinks.length
    ? HtmlBuilder("div")
        .child(HtmlBuilder("hr").class("my-4").void())
        .child(HtmlBuilder("h5").child("Backlinks"))
        .child(
          List(backlinks, ({ data }) =>
            [Link(data.title, data.slug), Date(data.date)].join("")
          )
        )
    : "";
};

const Page = (slug) => {
  try {
    const { data, content } = unpackFile(`${slug}.md`);

    if (data.draft) {
      throw Error();
    }

    const template = getTemplate("page");
    const htmlContent = toHtml(content.trim());

    return render(template, {
      content: htmlContent,
      contentEnd: [Backlinks(slug), HomeButton()].join(""),
      date: formatDate(data.date),
      description: data.description || excerpt(htmlContent),
      headTitle: `${data.title} - ${metadata.brand}`,
      image: metadata.siteUrl + (data.image || metadata.image),
      metaType: "article",
      slug,
      title: data.title,
    });
  } catch (err) {
    console.error(err);
    return ErrorPage();
  }
};

export default Page;
