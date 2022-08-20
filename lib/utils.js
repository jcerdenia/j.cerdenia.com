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

export const formatDate = (date, options) =>
  date
    ? new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        ...options,
      })
    : null;
