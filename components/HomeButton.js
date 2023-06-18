import HtmlBuilder from "../lib/HtmlBuilder.js";

const HomeButton = () =>
  HtmlBuilder("div")
    .class("mt-5")
    .child(HtmlBuilder("i").class("bi bi-chevron-double-left me-1"))
    .child(HtmlBuilder("a").href("/").child("Home"));

export default HomeButton;
