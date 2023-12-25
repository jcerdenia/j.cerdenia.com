import HtmlBuilder from "../lib/HtmlBuilder.js";
import { compareBy } from "../lib/utils.js";
import Date from "./Date.js";
import Link from "./Link.js";
import List from "./List.js";

const PinnedPages = (items, showDate = false) =>
  List(items.filter((data) => data.pinned).sort(compareBy("title")), (data) => {
    const title = data.parent ? data.title : data.fullTitle();

    return HtmlBuilder("span")
      .child("Pinned: ")
      .child(Link(title, `/${data.slug}`))
      .child(Date(data.date), showDate);
  });

export default PinnedPages;
