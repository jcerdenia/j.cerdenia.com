import HtmlBuilder from "../lib/HtmlBuilder.js";

const List = (arr, map = (item) => item) => {
  const items = [];

  arr.forEach((_item) => {
    const child = map(_item);
    const item = HtmlBuilder("li").class("my-1").child(child);
    items.push(item);
  });

  return HtmlBuilder("ul").class("my-4").child(items.join(""));
};

export default List;
