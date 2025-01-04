import HtmlBuilder from "../lib/HtmlBuilder.js";

const List = (_items, transform = (item) => item) => {
  const items = _items.map((item) =>
    HtmlBuilder("li").class("my-2").child(transform(item)),
  );

  return HtmlBuilder("ul").class("my-4").child(items.join(""));
};

export default List;
