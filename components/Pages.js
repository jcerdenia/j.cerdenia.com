import HtmlBuilder from "../lib/HtmlBuilder.js";
import Date from "./Date.js";
import Link from "./Link.js";
import List from "./List.js";

const Pages = (items, showDates = false) =>
  List(
    items.filter((data) => !data.pinned),
    (data) => {
      const title = data.parent ? data.title : data.fullTitle;

      return [
        Link(title, `/${data.slug}`),
        HtmlBuilder("span")
          .class("ms-2 small")
          .child(data.subtitle, data.subtitle),
        showDates ? Date(data.date) : "",
      ].join("");
    },
  );

export default Pages;
