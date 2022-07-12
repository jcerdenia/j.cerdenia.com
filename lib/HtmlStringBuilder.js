class HtmlStringBuilder {
  tag;
  props = {};
  children = [];
  isVoid = false;

  constructor(tag) {
    this.tag = tag;
    return this;
  }

  addProp(key, value) {
    this.props[key] = value;
    return this;
  }

  addChild(child) {
    this.children.push(child);
    return this;
  }

  isVoid() {
    this.isVoid = true;
    return this;
  }

  toString() {
    const strProps = Object.entries(this.props)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");

    if (this.isVoid) {
      return `<${this.tag} ${strProps}>`;
    } else {
      const strChildren = this.children.join("");
      return `<${this.tag} ${strProps}>${strChildren}</${this.tag}>`;
    }
  }
}

export default HtmlStringBuilder;
