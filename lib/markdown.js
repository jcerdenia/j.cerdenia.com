import MarkdownIt from "markdown-it";

import HtmlBuilder from "./HtmlBuilder.js";

const config = { html: true };

const md = new MarkdownIt(config);

const toHtml = (markdown) => {
  let html = md.render(markdown);
  const headers = html.match(/<h\d>.*?<\/h\d>/gi) || [];

  headers.forEach((_header) => {
    const [_tag, text] = _header.split(/(<\/?h[1-6]>)/g).filter((i) => i);
    const tag = _tag.replace(/[<>]/g, "");
    const slug = text.toLowerCase().replace(/\//g, "").replace(/ /g, "-");
    const header = HtmlBuilder(tag).id(slug).child(text);
    html = html.replace(_header, header);
  });

  return html;
};

export default toHtml;
