import { minify } from "html-minifier";

import { linkMode, links, metadata } from "../siteConfig.js";
import HtmlBuilder from "./HtmlBuilder.js";

const minifyOptions = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  removeComments: true,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
  useShortDoctype: true,
};

const defaults = {
  ...metadata,
  links: links
    .map(([name, url, icon]) =>
      HtmlBuilder("a")
        .class("ms-3 small", linkMode === "text")
        .class("ms-4", linkMode === "icon")
        .href(url)
        .child(name, linkMode === "text")
        .child(HtmlBuilder("i").class(icon), linkMode === "icon")
    )
    .join(""),
};

const render = (template, args) => {
  const data = { ...defaults, ...args };
  let html = template;

  Object.keys(data).forEach((key) => {
    if (data[key]) {
      const keyRegex = new RegExp(`{{ ${key} }}`, "g");
      html = html.replace(keyRegex, data[key]);
    }
  });

  // Clear remaining template stubs
  html = html.replace(/{{ [A-Za-z0-9_]+ }}/g, "");

  return minify(html, minifyOptions);
};

export default render;
