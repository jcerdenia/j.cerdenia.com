class HtmlBuilder {
  tag;
  props = {};
  children = [];
  isVoid = false;

  constructor(tag) {
    this.tag = tag;
  }

  prop(key, value) {
    this.props[key] = value;
    return this;
  }

  child(child) {
    this.children.push(child);
    return this;
  }

  void() {
    this.isVoid = true;
    return this;
  }

  toString() {
    const strProps = Object.entries(this.props)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");

    if (this.isVoid) {
      return `<${this.tag} ${strProps}>`;
    }

    const strChildren = this.children.join("");
    return `<${this.tag} ${strProps}>${strChildren}</${this.tag}>`;
  }
}

export default HtmlBuilder;
