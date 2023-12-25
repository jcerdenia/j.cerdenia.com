import { compareBy } from "../lib/utils.js";
import Date from "./Date.js";
import Link from "./Link.js";
import List from "./List.js";

const Pages = (items, showDate = false) =>
  List(
    items
      .filter((data) => !data.pinned)
      .sort(compareBy("date"))
      .reverse(),
    (data) => {
      const title = data.parent ? data.title : data.fullTitle();
      return [
        Link(title, `/${data.slug}`),
        showDate ? Date(data.date) : "",
      ].join("");
    }
  );

export default Pages;
