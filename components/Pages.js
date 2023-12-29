import Date from "./Date.js";
import Link from "./Link.js";
import List from "./List.js";

const Pages = (items, showDates = false) =>
  List(
    items.filter((data) => !data.pinned),
    (data) => {
      const title = data.parent ? data.title : data.fullTitle();
      return [
        Link(title, `/${data.slug}`),
        showDates ? Date(data.date) : "",
      ].join("");
    }
  );

export default Pages;
