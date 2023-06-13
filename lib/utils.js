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
    ? new Date(date).toLocaleDateString("ja-JP", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        ...options,
      })
    : null;

// Remove HTML tags and get truncated first paragraph.
export const excerpt = (text, wordLimit = 30) => {
  const withoutTags = text.replace(/<[^>]+>/g, "");
  let paragraphs = withoutTags.split(/\n/);
  paragraphs = paragraphs.map((paragraph) => paragraph.trim());
  let firstParagraph = paragraphs.find((paragraph) => paragraph.length > 0);
  let words = firstParagraph.split(" ");

  if (words.length > wordLimit) {
    words = words.slice(0, wordLimit);
    firstParagraph = `${words.join(" ")} ...`;
  }

  if (!firstParagraph.endsWith(".")) {
    firstParagraph += " ...";
  }

  return firstParagraph;
};
