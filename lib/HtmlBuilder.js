class HtmlBuilder {
  tag;
  props = {};
  children = [];
  isVoid = false;

  constructor(tag = "div") {
    this.tag = tag;
  }

  class(className) {
    this.props.class = className;
    return this;
  }

  href(href) {
    this.props.href = href;
    return this;
  }

  child(child, condition = true) {
    if (condition) {
      this.children.push(child);
    }

    return this;
  }

  void() {
    this.isVoid = true;
    return this;
  }

  toString() {
    const strProps = Object.keys(this.props)
      .map((key) => `${key}="${this.props[key]}"`)
      .join(" ");

    const openTag = `${`<${this.tag} ${strProps}`.trim()}>`;

    return !this.isVoid
      ? `${openTag}${this.children.join("")}</${this.tag}>`
      : openTag;
  }
}

export default HtmlBuilder;
