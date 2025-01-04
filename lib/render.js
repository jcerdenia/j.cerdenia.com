import { minify } from "html-minifier";

import { assets as _assets, linkMode, links, metadata } from "../siteConfig.js";
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
        .child(HtmlBuilder("i").class(icon), linkMode === "icon"),
    )
    .join("\n"),
};

const prepare = (args) => {
  const data = { ...defaults, ...args };
  const assets = JSON.parse(JSON.stringify(_assets));

  if (args.syntaxHighlighting) {
    assets.stylesheets.push("prism.css");
    assets.postscripts.push("prism.js");
  }

  data.stylesheets = assets.stylesheets
    .map((name) =>
      HtmlBuilder("link")
        .href(`${args.child ? "./.." : "."}/styles/${name}`)
        .type("text/css")
        .rel("stylesheet"),
    )
    .join("\n");

  ["prescripts", "postscripts"].forEach((asset) => {
    data[asset] = assets[asset]
      .map((name) =>
        HtmlBuilder("script").src(
          `${args.child ? "./.." : "."}/scripts/${name}`,
        ),
      )
      .join("\n");
  });

  return data;
};

const render = (template, args) => {
  const data = prepare(args);
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
