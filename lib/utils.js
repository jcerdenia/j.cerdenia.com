export const compareBy = (key) => (a, b) => {
  switch (true) {
    case a[key] > b[key]:
      return 1;
    case a[key] < b[key]:
      return -1;
    default:
      return 0;
  }
};

export const formatDate = (date, options = {}) =>
  date
    ? new Date(date).toLocaleDateString(options.locale || "ja-JP", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        ...options,
      })
    : null;

// Remove HTML tags and get truncated first paragraph
export const excerpt = (text, wordLimit = 30) => {
  const paragraphs = text
    .replace(/<h[1-6]>(.*?)<\/h[1-6]>/g, "") // Remove headers
    .replace(/<[^>]+>/g, "") // Remove all other html tags
    .split(/\n/) // Split into list of paragraphs
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);

  let output = paragraphs[0];
  let words = output.split(" ");

  if (words.length > wordLimit) {
    words = words.slice(0, wordLimit);
    output = `${words.join(" ")} ...`;
  }

  if (!output.endsWith(".")) {
    output += " ...";
  }

  return output;
};

// Change object keys from snake_case to camelCase
export const toCamelCase = (obj) => {
  const output = {};

  Object.keys(obj).forEach((key) => {
    const newKey = key.startsWith("_")
      ? key
      : key
          .split("_")
          .map((word, i) =>
            i > 0 ? word[0].toUpperCase() + word.slice(1) : word
          )
          .join("");

    output[newKey] = obj[key];
  });

  return output;
};

export const reverseMarkdownSections = (content) =>
  content
    .split("\n# ")
    .map((section) => section.trim())
    .filter((section) => section.length)
    .map((section) => `# ${section}`)
    .reverse()
    .join("\n\n");
