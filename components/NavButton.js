import HtmlBuilder from "../lib/HtmlBuilder.js";

const NavButton = (title, href, className, direction) =>
  HtmlBuilder("div")
    .class(className)
    .child(HtmlBuilder("i").class(`bi bi-chevron-double-${direction} me-1`))
    .child(HtmlBuilder("a").href(href).child(title));

export default NavButton;
