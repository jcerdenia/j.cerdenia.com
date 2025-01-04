import getFiles, { unpackFile } from "../lib/files.js";
import HtmlBuilder from "../lib/HtmlBuilder.js";
import { compareBy } from "../lib/utils.js";
import Date from "./Date.js";
import Link from "./Link.js";
import List from "./List.js";

const Backlinks = (slug, showDates = false) => {
  const backlinks = getFiles()
    .map(unpackFile)
    .filter(
      ({ data, content }) =>
        !data.draft &&
        (content.includes(`](/${slug})`) ||
          content.includes(`](/${slug}#`) ||
          content.includes(`href="/${slug}`)),
    )
    .sort(compareBy("title"));

  return backlinks.length
    ? HtmlBuilder("div")
        .child(HtmlBuilder("hr").class("my-4").void())
        .child(HtmlBuilder("h5").child("Pages That Link Here"))
        .child(
          List(backlinks, ({ data }) =>
            [
              Link(data.fullTitle, `/${data.slug}`),
              showDates ? Date(data.date) : "",
            ].join(""),
          ),
        )
    : "";
};

export default Backlinks;
