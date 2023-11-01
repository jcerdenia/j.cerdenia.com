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
    .replace(/<h[1-6]>(.*?)<\/h[1-6]>/g, "") // Remove headings
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
