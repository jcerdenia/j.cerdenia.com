class HtmlElement {
  tag = null;
  props = {};
  children = null;

  static Builder = class {
    tag = "div";
    props = {};
    children = [];

    constructor(tag) {
      this.tag = tag;
      return this;
    }

    prop(key, value) {
      this.props[key] = value;
      return this;
    }

    child(child) {
      this.children.push(child);
      return this;
    }

    build() {
      return new HtmlElement(this.tag, this.props, this.children);
    }
  };

  constructor(tag, props, children) {
    this.tag = tag;
    this.props = props;
    this.children = children;
  }

  toString() {
    const propsStr = Object.entries(this.props)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");

    const childrenStr = this.children.join("");

    return `<${this.tag} ${propsStr}>${childrenStr}</${this.tag}>`;
  }
}

export default HtmlElement;
