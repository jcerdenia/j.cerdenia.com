import HtmlBuilder from "../lib/HtmlBuilder.js";
import Date from "./Date.js";
import Link from "./Link.js";
import List from "./List.js";

const PinnedPages = (items, showDates = false) =>
  List(
    items.filter((data) => data.pinned),
    (data) => {
      const title = data.parent ? data.title : data.fullTitle;

      return HtmlBuilder("span")
        .child("Pinned: ")
        .child(Link(title, `/${data.slug}`))
        .child(
          HtmlBuilder("span")
            .class("ms-2 small")
            .child(data.subtitle, data.subtitle),
        )
        .child(Date(data.date), showDates);
    },
  );

export default PinnedPages;
