import HtmlBuilder from "../lib/HtmlBuilder.js";

const Link = (title, href) => HtmlBuilder("a").href(href).child(title);

export default Link;
