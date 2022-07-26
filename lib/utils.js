export const compareBy = (key) => {
  return (a, b) => {
    return a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0;
  };
};

export const formatDate = (date, options) => {
  return date
    ? new Date(date).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
        ...options,
      })
    : null;
};
