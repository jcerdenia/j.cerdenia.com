import HtmlBuilder from "../lib/HtmlBuilder.js";
import { formatDate } from "../lib/utils.js";

const Date = (date) =>
  HtmlBuilder("span").class("small text-muted ms-2").child(formatDate(date));

export default Date;
