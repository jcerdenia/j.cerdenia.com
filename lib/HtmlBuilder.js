class _HtmlBuilder {
  tag;
  props = {};
  classes = [];
  children = [];
  isVoid = false;

  constructor(tag = "div") {
    this.tag = tag;
  }

  id(id) {
    this.props.id = id;
    return this;
  }

  class(className, condition = true) {
    if (condition) {
      this.classes.push(className);
    }

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
    if (this.classes.length) {
      this.props.class = this.classes.join(" ");
    }

    const strProps = Object.keys(this.props)
      .map((key) => `${key}="${this.props[key]}"`)
      .join(" ");

    const openTag = `${`<${this.tag} ${strProps}`.trim()}>`;

    return !this.isVoid
      ? `${openTag}${this.children.join("")}</${this.tag}>`
      : openTag;
  }
}

const HtmlBuilder = (tag) => new _HtmlBuilder(tag);

export default HtmlBuilder;
