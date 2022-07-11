class HtmlStringBuilder {
  tag;
  props = {};
  children = [];
  void = false;

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

  void() {
    this.void = true;
    return this;
  }

  toString() {
    const strProps = Object.entries(this.props)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");

    if (this.void) {
      return `<${this.tag} ${strProps}/>`;
    } else {
      const strChildren = this.children.join("");
      return `<${this.tag} ${strProps}>${strChildren}</${this.tag}>`;
    }
  }
}

export default HtmlStringBuilder;
