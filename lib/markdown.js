import MarkdownIt from "markdown-it";

const config = { html: true };

const md = new MarkdownIt(config);

const toHtml = (markdown) => md.render(markdown);

export default toHtml;
