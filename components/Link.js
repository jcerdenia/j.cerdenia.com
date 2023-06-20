import HtmlBuilder from "../lib/HtmlBuilder.js";

const Link = (title, slug) => HtmlBuilder("a").href(slug).child(title);

export default Link;
