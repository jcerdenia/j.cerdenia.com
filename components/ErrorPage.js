import { getTemplate } from "../lib/files.js";
import HtmlBuilder from "../lib/HtmlBuilder.js";
import render from "../lib/render.js";
import { metadata } from "../siteConfig.js";
import NavButton from "./NavButton.js";

const ErrorPage = () => {
  const template = getTemplate("page");

  return render(template, {
    content: HtmlBuilder("p").child(
      "Sorry! That page doesn't exist or may have moved.",
    ),
    contentEnd: NavButton("Home", "/", "mt-5", "left"),
    headTitle: `Page Not Found - ${metadata.brand}`,
    metaType: "website",
    slug: "#",
    title: "Page Not Found",
  });
};

export default ErrorPage;
