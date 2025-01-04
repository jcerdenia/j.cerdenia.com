import MarkdownIt from "markdown-it";

import HtmlBuilder from "./HtmlBuilder.js";

const config = { html: true };

const md = new MarkdownIt(config);

const toHtml = (markdown) => {
  let html = md.render(markdown);
  const headers = html.match(/<h\d>.*?<\/h\d>/gi) || [];
  const links = html.match(/<a href=".*?">.*?<\/a>/gi) || [];

  // Add id attribute to headers
  headers.forEach((_header) => {
    const [_tag, text] = _header.split(/(<\/?h[1-6]>)/g).filter((i) => i);
    const tag = _tag.replace(/[<>]/g, "");
    let slug = text.toLowerCase().replace(/[ |–]/g, "-");

    if (!/[a-zA-Z]/.test(slug)) {
      slug = slug.replace(/\//g, "");
    }

    const header = HtmlBuilder(tag).id(slug).child(text);
    html = html.replace(_header, header);
  });

  // Add ↗ indicator to external links
  links.forEach((link) => {
    const [url, text] = link.match(/"(.*?)">(.+?)<\/a>/).slice(1);
    const isExternal = !url.startsWith("/");
    if (isExternal) {
      const indicator = HtmlBuilder("i").class("bi bi-arrow-up-right");
      const newLink = HtmlBuilder("a").href(url).child(text).child(indicator);
      html = html.replace(link, newLink);
    }
  });

  return html;
};

export default toHtml;
