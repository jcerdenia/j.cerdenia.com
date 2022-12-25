import { minify } from "html-minifier";

const minified = (htmlString) =>
  minify(htmlString, {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeOptionalTags: true,
    useShortDoctype: true,
  });

export default minified;
